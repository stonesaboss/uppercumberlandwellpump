import { SITE } from "../data/site";
import type { Faq } from "../data/faqs";

const abs = (path: string) => new URL(path, SITE.url).href;

/** Organization — described accurately as an independent referral resource. */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: SITE.name,
    url: SITE.url + "/",
    logo: abs("/logos/ucwp-shield-800.png"),
    description:
      "Independent referral resource that helps property owners in the Upper Cumberland region of Tennessee request well pump repair, replacement, pressure tank service and water-well services from independent local providers.",
    areaServed: "Upper Cumberland, Tennessee",
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: SITE.url + "/",
    name: SITE.name,
    publisher: { "@id": abs("/#organization") },
  };
}

export function webPageSchema(opts: { path: string; title: string; description: string }) {
  return {
    "@type": "WebPage",
    "@id": abs(opts.path) + "#webpage",
    url: abs(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": abs("/#website") },
  };
}

export function serviceSchema(opts: { path: string; name: string; description: string }) {
  return {
    "@type": "Service",
    "@id": abs(opts.path) + "#service",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { "@id": abs("/#organization") },
    areaServed: "Upper Cumberland, Tennessee",
    serviceType: "Referral to independent local well-service providers",
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function contactPageSchema(opts: { path: string; title: string; description: string }) {
  return {
    ...webPageSchema(opts),
    "@type": "ContactPage",
  };
}

/** Wrap schema nodes in a single @graph JSON-LD document. */
export function jsonLd(nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
