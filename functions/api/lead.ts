/**
 * POST /api/lead — server-side lead intake for Upper Cumberland Well Pump.
 *
 * - Validates required fields, consent, email/phone formats and lengths.
 * - Verifies Cloudflare Turnstile server-side (required in production).
 * - Generates a unique lead reference number.
 * - Delivers the lead to a configurable webhook and/or email service.
 * - Optionally persists metadata to D1 (ENABLE_D1_STORAGE=true + LEADS_DB).
 * - Optionally stores photos in a private R2 bucket (ENABLE_R2_UPLOADS=true + LEAD_UPLOADS).
 * - Returns structured JSON. Never returns secrets or stack traces.
 */

interface Env {
  /** Turnstile secret — set as a Pages environment SECRET named TURNSTILE_SECRET. */
  TURNSTILE_SECRET?: string;
  /** Legacy name; supported as a fallback. */
  TURNSTILE_SECRET_KEY?: string;
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
  FORM_RECIPIENT_EMAIL?: string;
  EMAIL_API_KEY?: string;
  ENABLE_D1_STORAGE?: string;
  ENABLE_R2_UPLOADS?: string;
  LEADS_DB?: D1Database;
  LEAD_UPLOADS?: R2Bucket;
}

const PRODUCTION_HOSTS = new Set([
  "uppercumberlandwellpump.com",
  "www.uppercumberlandwellpump.com",
]);

const REQUIRED_FIELDS = [
  "full_name",
  "phone",
  "email",
  "city_or_county",
  "service_needed",
  "water_situation",
  "additional_details",
] as const;

/** Optional text fields accepted (anything else is ignored). */
const OPTIONAL_FIELDS = [
  "property_type",
  "problem_started",
  "urgency",
  "preferred_contact_time",
  "property_location",
  "pump_type",
  "well_type",
  "well_depth",
  "pressure_reading",
  "pump_running",
  "breaker_status",
  "tank_symptoms",
  "water_quality_changes",
  "system_records",
  "source_page",
] as const;

const MAX_LENGTHS: Record<string, number> = {
  full_name: 120,
  phone: 30,
  email: 200,
  city_or_county: 120,
  service_needed: 60,
  water_situation: 60,
  additional_details: 4000,
  property_type: 60,
  problem_started: 60,
  urgency: 60,
  preferred_contact_time: 40,
  property_location: 200,
  pump_type: 60,
  well_type: 120,
  well_depth: 60,
  pressure_reading: 60,
  pump_running: 30,
  breaker_status: 60,
  tank_symptoms: 300,
  water_quality_changes: 300,
  system_records: 300,
  source_page: 200,
};

const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/heic", "image/heif"]);
const ALLOWED_PHOTO_EXT = /\.(jpe?g|png|heic)$/i;

/**
 * Sanitize an env-provided value: strip BOM/zero-width characters and
 * surrounding whitespace. Secrets pasted through editors or shells can pick
 * up invisible bytes (a UTF-8 BOM once made the webhook URL "invalid").
 * Built via RegExp constructor so this source file stays pure ASCII.
 */
const INVISIBLE_CHARS = new RegExp("[\\uFEFF\\u200B\\u200E\\u200F]", "g");
function cleanEnv(value: string | undefined): string {
  return (value ?? "").replace(INVISIBLE_CHARS, "").trim();
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

/** Collapse whitespace and strip control characters. */
function normalize(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeReference(): string {
  const now = new Date();
  const ymd = now.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = crypto
    .getRandomValues(new Uint32Array(1))[0]
    .toString(36)
    .toUpperCase()
    .slice(0, 5);
  return `UCWP-${ymd}-${rand.padStart(5, "0")}`;
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const isProduction = PRODUCTION_HOSTS.has(url.hostname.toLowerCase());

  // ---- Parse ----
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { ok: false, error: "The request could not be read. Please try again." });
  }

  // Honeypot: return a success-looking response but record nothing.
  const honeypot = form.get("company_website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.log("[lead] honeypot triggered — submission discarded");
    return json(200, { ok: true, reference: makeReference() });
  }

  // ---- Validate fields ----
  const lead: Record<string, string> = {};
  for (const field of REQUIRED_FIELDS) {
    const raw = form.get(field);
    const value = typeof raw === "string" ? normalize(raw) : "";
    if (!value) {
      return json(422, { ok: false, error: "Please complete all required fields." });
    }
    if (value.length > (MAX_LENGTHS[field] ?? 200)) {
      return json(422, { ok: false, error: "One of the fields is too long." });
    }
    lead[field] = value;
  }

  for (const field of OPTIONAL_FIELDS) {
    const raw = form.get(field);
    if (typeof raw === "string" && raw.trim() !== "") {
      lead[field] = normalize(raw).slice(0, MAX_LENGTHS[field] ?? 200);
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return json(422, { ok: false, error: "Please enter a valid email address." });
  }
  if (!/^[\d\s().+-]{7,30}$/.test(lead.phone)) {
    return json(422, { ok: false, error: "Please enter a valid phone number." });
  }
  if (form.get("consent") !== "yes") {
    return json(422, { ok: false, error: "Consent is required to send your request." });
  }

  // ---- Turnstile ----
  // Verification is enforced whenever a secret is configured, regardless of
  // any client-supplied fields (turnstile_dev_mode or similar is never
  // trusted). Production with no secret refuses submissions outright.
  const turnstileSecret = cleanEnv(env.TURNSTILE_SECRET) || cleanEnv(env.TURNSTILE_SECRET_KEY);
  const turnstileToken = form.get("cf-turnstile-response");
  if (turnstileSecret) {
    if (typeof turnstileToken !== "string" || turnstileToken.length === 0) {
      return json(400, {
        ok: false,
        error: "The anti-spam check did not complete. Please wait a moment and try again.",
      });
    }
    const passed = await verifyTurnstile(
      turnstileSecret,
      turnstileToken,
      request.headers.get("CF-Connecting-IP"),
    );
    if (!passed) {
      return json(400, {
        ok: false,
        error: "The anti-spam check failed or expired. Please try again.",
      });
    }
  } else if (isProduction) {
    // Never accept unverified production submissions.
    return json(503, {
      ok: false,
      error:
        "The request service is not fully configured yet. Please call the number at the top of the page.",
    });
  }

  // ---- Reference & metadata ----
  const reference = makeReference();
  const submittedAt = new Date().toISOString();
  const isTest = !isProduction;

  // ---- Optional R2 photo storage ----
  const uploadRefs: string[] = [];
  const r2Enabled = env.ENABLE_R2_UPLOADS === "true" && !!env.LEAD_UPLOADS;
  const photoEntries = form.getAll("photos") as unknown as (string | File)[];
  const photos = photoEntries.filter(
    (p): p is File => typeof p !== "string" && !!p && p.size > 0,
  );

  if (photos.length > 0) {
    if (photos.length > MAX_PHOTOS) {
      return json(422, { ok: false, error: `Please attach no more than ${MAX_PHOTOS} photos.` });
    }
    let total = 0;
    for (const photo of photos) {
      total += photo.size;
      const typeOk = ALLOWED_PHOTO_TYPES.has(photo.type) || photo.type === "";
      if (!typeOk || !ALLOWED_PHOTO_EXT.test(photo.name) || photo.size > MAX_PHOTO_BYTES) {
        return json(422, {
          ok: false,
          error: "Photos must be JPG, PNG or HEIC files up to 8 MB each.",
        });
      }
    }
    if (total > MAX_TOTAL_BYTES) {
      return json(422, { ok: false, error: "Combined photo size must stay under 20 MB." });
    }

    if (r2Enabled && env.LEAD_UPLOADS) {
      for (const photo of photos) {
        const ext = (photo.name.match(ALLOWED_PHOTO_EXT)?.[0] ?? ".jpg").toLowerCase();
        // Randomized object name — never trust the original filename.
        const key = `${isTest ? "test/" : ""}${reference}/${crypto.randomUUID()}${ext}`;
        try {
          await env.LEAD_UPLOADS.put(key, photo.stream(), {
            httpMetadata: { contentType: photo.type || "application/octet-stream" },
          });
          uploadRefs.push(key);
        } catch {
          // Photo storage failure must not lose the lead itself.
        }
      }
    }
  }

  // ---- Optional D1 storage ----
  // d1Stored is only true after a CONFIRMED insert — an enabled-but-failing
  // database must never count as a captured lead.
  const d1Enabled = env.ENABLE_D1_STORAGE === "true" && !!env.LEADS_DB;
  let d1Stored = false;
  if (d1Enabled && env.LEADS_DB) {
    try {
      await env.LEADS_DB.prepare(
        `INSERT INTO leads (
          id, created_at, full_name, phone, email, city_or_county, property_location,
          property_type, service_needed, water_situation, problem_started, urgency,
          pump_type, pump_running, breaker_status, pressure_reading, tank_symptoms,
          water_quality_changes, preferred_contact_time, additional_details,
          upload_references, source_page, consent_recorded_at, lead_status
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      )
        .bind(
          reference,
          submittedAt,
          lead.full_name,
          lead.phone,
          lead.email,
          lead.city_or_county,
          lead.property_location ?? null,
          lead.property_type ?? null,
          lead.service_needed,
          lead.water_situation,
          lead.problem_started ?? null,
          lead.urgency ?? null,
          lead.pump_type ?? null,
          lead.pump_running ?? null,
          lead.breaker_status ?? null,
          lead.pressure_reading ?? null,
          lead.tank_symptoms ?? null,
          lead.water_quality_changes ?? null,
          lead.preferred_contact_time ?? null,
          lead.additional_details,
          uploadRefs.length > 0 ? JSON.stringify(uploadRefs) : null,
          lead.source_page ?? null,
          submittedAt,
          isTest ? "test" : "new",
        )
        .run();
      d1Stored = true;
    } catch (err) {
      // Storage failure must not block webhook/email delivery, but it must
      // be visible in the Pages logs. No personal data in the log line.
      console.error(
        `[lead] D1 insert failed for ${reference}: ${err instanceof Error ? err.message : "unknown error"}`,
      );
    }
  }

  // ---- Delivery ----
  const payload = {
    kind: isTest ? "TEST_SUBMISSION" : "lead",
    reference,
    submitted_at: submittedAt,
    ...lead,
    upload_references: uploadRefs,
  };

  let delivered = false;

  // Webhook delivery. Preview/dev submissions only go to localhost webhooks
  // and are clearly marked via kind: TEST_SUBMISSION.
  const webhookUrl = cleanEnv(env.LEAD_WEBHOOK_URL);
  const webhookSecret = cleanEnv(env.LEAD_WEBHOOK_SECRET);
  if (webhookUrl && (isProduction || webhookUrl.includes("localhost"))) {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (webhookSecret) headers["X-Webhook-Secret"] = webhookSecret;
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      delivered = res.ok;
      if (!res.ok) {
        console.error(`[lead] webhook rejected ${reference}: HTTP ${res.status}`);
      } else {
        // Google Apps Script (and some other receivers) always return HTTP
        // 200 — inspect the response to catch failures a status can't show.
        if (res.url.includes("accounts.google.com")) {
          // Redirected to a login page: the Apps Script deployment is not
          // set to "Anyone" access, so nothing was recorded.
          delivered = false;
          console.error(
            `[lead] webhook auth wall for ${reference}: receiver requires login (check Apps Script "Who has access: Anyone")`,
          );
        } else {
          const bodyText = await res.text().catch(() => "");
          try {
            const body = JSON.parse(bodyText) as { ok?: boolean };
            if (body.ok === false) {
              delivered = false;
              console.error(`[lead] webhook script error for ${reference}: receiver returned ok=false`);
            }
          } catch {
            // Non-JSON body with a 2xx status — accept (not all webhooks return JSON).
          }
        }
      }
    } catch (err) {
      console.error(
        `[lead] webhook unreachable for ${reference}: ${err instanceof Error ? err.message : "unknown error"}`,
      );
    }
  }

  // Email delivery via MailChannels-compatible API when configured (production only).
  const recipientEmail = cleanEnv(env.FORM_RECIPIENT_EMAIL);
  const emailApiKey = cleanEnv(env.EMAIL_API_KEY);
  if (recipientEmail && isProduction) {
    try {
      const summaryLines = Object.entries(lead)
        .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
        .join("\n");
      const emailRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(emailApiKey ? { "X-Api-Key": emailApiKey } : {}),
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: recipientEmail }] }],
          from: {
            email: "leads@uppercumberlandwellpump.com",
            name: "Upper Cumberland Well Pump",
          },
          subject: `New well-service request ${reference} — ${lead.service_needed}`,
          content: [
            {
              type: "text/plain",
              value: `Lead reference: ${reference}\nSubmitted: ${submittedAt}\n\n${summaryLines}\n\nPhotos stored: ${uploadRefs.length}`,
            },
          ],
        }),
      });
      delivered = delivered || emailRes.ok;
      if (!emailRes.ok) {
        console.error(`[lead] email send failed for ${reference}: HTTP ${emailRes.status}`);
      }
    } catch (err) {
      console.error(
        `[lead] email service unreachable for ${reference}: ${err instanceof Error ? err.message : "unknown error"}`,
      );
    }
  }

  // In local development with no delivery configured, log a minimal,
  // non-identifying line so the flow can be tested end to end.
  if (!isProduction && !webhookUrl && !recipientEmail) {
    console.log(
      `[TEST LEAD] ${reference} service=${lead.service_needed} situation=${lead.water_situation} photos=${photos.length}`,
    );
    delivered = true;
  }

  if (!delivered && !d1Stored) {
    // Nothing accepted the lead anywhere — fail loudly, never silently drop.
    console.error(
      `[lead] DELIVERY FAILED for ${reference}: no delivery channel accepted the lead ` +
        `(webhook configured: ${!!webhookUrl}, email configured: ${!!recipientEmail}, ` +
        `d1 enabled: ${d1Enabled}). Configure LEAD_WEBHOOK_URL, FORM_RECIPIENT_EMAIL or D1 storage.`,
    );
    return json(502, {
      ok: false,
      error:
        "Your request could not be delivered right now. Please try again shortly or call the number at the top of the page.",
    });
  }

  return json(200, { ok: true, reference });
};

/** Any non-POST method → 405 (method-specific handlers take precedence). */
export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "POST") {
    return onRequestPost(context as Parameters<PagesFunction<Env>>[0]);
  }
  return json(405, { ok: false, error: "Method not allowed." });
};
