/**
 * Lead form controller: client-side validation, Turnstile handling,
 * multipart submission to /api/lead and accessible status reporting.
 * Success is only reported after server confirmation.
 */
import { ucwpEvent } from "./analytics";

const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8 MB each
const MAX_TOTAL_BYTES = 20 * 1024 * 1024; // 20 MB combined
const ALLOWED_EXT = /\.(jpe?g|png|heic)$/i;

declare global {
  interface Window {
    turnstile?: {
      reset: (widget?: string | HTMLElement) => void;
    };
  }
}

function setFieldError(field: HTMLElement, hasError: boolean): void {
  const wrapper = field.closest(".form-field");
  wrapper?.classList.toggle("has-error", hasError);
  field.setAttribute("aria-invalid", hasError ? "true" : "false");
}

function showStatus(form: HTMLFormElement, kind: "error" | "success", message: string): void {
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  if (!status) return;
  status.className = `form-status ${kind === "error" ? "is-error" : "is-success"}`;
  status.textContent = message;
  status.scrollIntoView({ block: "center", behavior: "smooth" });
}

function validate(form: HTMLFormElement): boolean {
  let ok = true;
  let firstBad: HTMLElement | null = null;

  form
    .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input[required], select[required], textarea[required]",
    )
    .forEach((field) => {
      let valid = true;
      if (field.type === "checkbox") {
        valid = (field as HTMLInputElement).checked;
        const consentErr = form.querySelector("[data-consent-error]");
        consentErr?.classList.toggle("is-visible", !valid);
      } else if (field.type === "email") {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value.trim());
      } else if (field.type === "tel") {
        valid = /^[\d\s().+-]{7,30}$/.test(field.value.trim());
      } else {
        valid = field.value.trim().length > 0;
      }
      if (field.type !== "checkbox") setFieldError(field, !valid);
      if (!valid) {
        ok = false;
        firstBad = firstBad ?? field;
      }
    });

  // Photo constraints
  const photos = form.querySelector<HTMLInputElement>('input[type="file"]');
  if (photos?.files && photos.files.length > 0) {
    let total = 0;
    let filesOk = photos.files.length <= MAX_PHOTOS;
    for (const f of Array.from(photos.files)) {
      total += f.size;
      if (!ALLOWED_EXT.test(f.name) || f.size > MAX_PHOTO_BYTES) filesOk = false;
    }
    if (total > MAX_TOTAL_BYTES) filesOk = false;
    setFieldError(photos, !filesOk);
    if (!filesOk) {
      ok = false;
      showStatus(
        form,
        "error",
        `Photos must be JPG, PNG or HEIC — up to ${MAX_PHOTOS} files, 8 MB each, 20 MB combined.`,
      );
    }
  }

  if (!ok && firstBad) {
    (firstBad as HTMLElement).focus();
    ucwpEvent("form_validation_error");
  }
  return ok;
}

function initForm(form: HTMLFormElement): void {
  let started = false;
  form.addEventListener(
    "input",
    () => {
      if (!started) {
        started = true;
        ucwpEvent("form_start", { form_id: form.id });
      }
    },
    { once: false },
  );

  // Enumerated-selection events (option labels only — never free text).
  form.querySelectorAll<HTMLSelectElement>("select[data-event-select]").forEach((sel) => {
    sel.addEventListener("change", () => {
      if (sel.value) ucwpEvent(sel.dataset.eventSelect!, { value: sel.value });
    });
  });

  // City/county: report that it was provided, never the value itself.
  const city = form.querySelector<HTMLInputElement>('input[name="city_or_county"]');
  city?.addEventListener("blur", () => {
    if (city.value.trim()) ucwpEvent("city_or_county_selected");
  });

  form.querySelectorAll<HTMLInputElement>("[data-event-change]").forEach((el) => {
    el.addEventListener("change", () => {
      if (el.files && el.files.length > 0) ucwpEvent(el.dataset.eventChange!);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(form)) return;

    const btn = form.querySelector<HTMLButtonElement>("[data-submit-btn]");
    const originalLabel = btn?.textContent ?? "";
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending…";
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        reference?: string;
        error?: string;
      } | null;

      if (res.ok && data?.ok) {
        ucwpEvent("form_success", { form_id: form.id });
        try {
          sessionStorage.setItem("ucwp_lead_reference", data.reference ?? "");
        } catch {
          /* storage unavailable — thank-you page copes */
        }
        window.location.assign("/thank-you/");
        return;
      }

      const message =
        data?.error ??
        "Something went wrong sending your request. Please try again, or call the number at the top of the page.";
      showStatus(form, "error", message);

      // Reset Turnstile so the visitor can retry with a fresh token.
      const widget = form.querySelector<HTMLElement>("[data-turnstile]");
      if (widget && window.turnstile) window.turnstile.reset(widget);
    } catch {
      showStatus(
        form,
        "error",
        "We could not reach the server. Please check your connection and try again.",
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalLabel;
      }
    }
  });
}

document.querySelectorAll<HTMLFormElement>("form[data-lead-form]").forEach(initForm);

export {};
