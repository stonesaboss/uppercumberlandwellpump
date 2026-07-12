/**
 * Privacy-conscious analytics event helper.
 * Fires only when GA4 / GTM is configured; silently no-ops otherwise.
 * NEVER pass names, phone numbers, emails, addresses or problem
 * descriptions to this function.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ucwpEvent?: (name: string, params?: Record<string, string>) => void;
  }
}

export function ucwpEvent(name: string, params: Record<string, string> = {}): void {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }
  } catch {
    /* analytics must never break the page */
  }
}

window.ucwpEvent = ucwpEvent;

// Click events for elements tagged with data-event (phone links, CTAs).
document.addEventListener("click", (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>("[data-event]");
  if (el?.dataset.event) {
    ucwpEvent(el.dataset.event);
  }
});

export {};
