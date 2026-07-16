/**
 * GET /api/health — runtime configuration visibility.
 *
 * Reports which environment variables and bindings the DEPLOYED function
 * can actually see, as booleans only. Never returns values. Use this to
 * confirm that secrets added in the dashboard (or via
 * `wrangler pages secret put`) are bound to the current deployment —
 * secrets only attach to deployments created AFTER they were set.
 */

interface Env {
  TURNSTILE_SECRET?: string;
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

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const host = new URL(request.url).hostname.toLowerCase();
  const isProduction = PRODUCTION_HOSTS.has(host);

  const turnstileConfigured = !!(env.TURNSTILE_SECRET || env.TURNSTILE_SECRET_KEY);
  const webhookConfigured = !!env.LEAD_WEBHOOK_URL;
  const emailConfigured = !!env.FORM_RECIPIENT_EMAIL;
  const d1Ready = env.ENABLE_D1_STORAGE === "true" && !!env.LEADS_DB;
  const r2Ready = env.ENABLE_R2_UPLOADS === "true" && !!env.LEAD_UPLOADS;
  const deliveryReady = webhookConfigured || emailConfigured || d1Ready;

  return new Response(
    JSON.stringify(
      {
        ok: turnstileConfigured && deliveryReady,
        environment: isProduction ? "production" : "preview-or-dev",
        turnstile_secret: turnstileConfigured,
        delivery: {
          ready: deliveryReady,
          lead_webhook_url: webhookConfigured,
          lead_webhook_secret: !!env.LEAD_WEBHOOK_SECRET,
          form_recipient_email: emailConfigured,
          email_api_key: !!env.EMAIL_API_KEY,
          d1_storage: d1Ready,
          r2_uploads: r2Ready,
        },
        note: !deliveryReady
          ? "No delivery channel visible to this deployment. If you set secrets after the last deployment, trigger a new deployment - secrets bind at deploy time."
          : undefined,
      },
      null,
      2,
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex",
      },
    },
  );
};

/** Any non-GET method → 405. */
export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method === "GET") {
    return onRequestGet(context as Parameters<PagesFunction<Env>>[0]);
  }
  return new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), {
    status: 405,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
