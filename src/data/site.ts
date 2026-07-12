/**
 * Central site configuration.
 * Everything a site owner is likely to edit lives here.
 */

export const SITE = {
  name: "Upper Cumberland Well Pump",
  descriptor: "Well Pump Repair, Replacement & Water Well Services",
  url: import.meta.env.PUBLIC_SITE_URL || "https://uppercumberlandwellpump.com",
  region: "Upper Cumberland, Tennessee",

  /**
   * TRACKING PHONE NUMBER — replace `display` and `tel` once a real
   * tracking number exists. While `tel` is empty the site renders the
   * placeholder text and does NOT create a broken tel: link.
   * Example: display: "(931) 555-0100", tel: "+19315550100"
   */
  phone: {
    display: "[TRACKING PHONE NUMBER]",
    tel: "",
  },

  /**
   * Public contact email — leave empty until a real inbox exists.
   * While empty, contact surfaces point to the request form instead.
   */
  email: "",

  /** Analytics — loaded only when an ID is present. */
  analyticsId: import.meta.env.PUBLIC_ANALYTICS_ID || "",
  tagManagerId: import.meta.env.PUBLIC_TAG_MANAGER_ID || "",

  /** Cloudflare Turnstile site key (public). Empty = dev fallback mode. */
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "",
} as const;

/** Referral disclosure used across the site. Keep wording consistent. */
export const REFERRAL_DISCLOSURE =
  "Upper Cumberland Well Pump is an independent referral service that helps connect property owners with local water-well and pump-service providers. Upper Cumberland Well Pump does not directly perform regulated well drilling, pump installation, pump repair or water-treatment work unless expressly stated. Provider licensing, qualifications, insurance, availability, pricing, scheduling and service terms must be confirmed directly with the provider.";

export const FORM_DISCLAIMER =
  "Submission does not guarantee provider availability, response time, pricing, licensing status or acceptance. Confirm the provider's current applicable Tennessee license and service terms directly.";

export const CONSENT_TEXT =
  "I agree that Upper Cumberland Well Pump may contact me regarding this request and may share the submitted information with an independent local well-service provider for the purpose of responding to my inquiry.";
