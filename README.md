# Upper Cumberland Well Pump — uppercumberlandwellpump.com

Local SEO lead-generation website for well pump repair, replacement and water-well service
requests across Cookeville and the Upper Cumberland region of Tennessee.

**The site operates as an independent referral resource.** It does not itself perform regulated
well drilling, pump installation/repair or water-treatment work; requests may be connected with
independent local providers. Referral disclosures appear site-wide and must remain intact.

---

## 1. Technology Stack

- [Astro 5](https://astro.build) + TypeScript, fully static output for all SEO pages
- Plain CSS design tokens (`src/styles/global.css`) — no CSS framework
- Cloudflare Pages hosting with GitHub integration
- Cloudflare Pages Functions for the lead endpoint (`functions/api/lead.ts`)
- Cloudflare Turnstile spam protection
- Optional Cloudflare D1 (lead storage) and R2 (private photo uploads)

## 2. Repository Structure

```
public/            static assets (_headers, _redirects, robots.txt, favicon, images, logos, icons)
src/
  components/      Header, Footer, LeadForm, StickyBar, FaqList, Icon, etc.
  layouts/         BaseLayout (head/meta/schema), ServicePage (service & info pages)
  pages/           one .astro file per route
  data/            site config, nav, FAQ content, form option lists
  scripts/         client-side TS (lead form controller, analytics events)
  styles/          global.css design tokens
  utils/           schema.org JSON-LD builders
functions/
  _middleware.ts   noindex header for preview hosts
  api/lead.ts      POST /api/lead — validation, Turnstile, delivery, optional D1/R2
migrations/        0001_create_leads.sql (optional D1)
wrangler.jsonc     Pages config (no placeholder resource IDs)
wrangler.bindings.example.jsonc  example D1/R2 bindings
```

## 3. Local Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build -> dist/
npm run preview    # serve the built site
npm run check      # astro check + tsc for functions/
npm run typecheck  # same as check
npm run lint       # prettier --check
npm run format     # prettier --write
```

To exercise the lead **function** locally use Wrangler against the built site:

```bash
npm run build
npx wrangler pages dev dist
```

Local development safety: with no `TURNSTILE_SECRET`, `LEAD_WEBHOOK_URL` or
`FORM_RECIPIENT_EMAIL` set, submissions on non-production hosts are accepted in a mocked mode —
logged as `[TEST LEAD] <reference> …` (no personal details) and marked `TEST_SUBMISSION`.
Production hosts **reject** submissions when Turnstile is not configured, so a misconfigured
deploy fails safe instead of accepting unverified leads.

## 4. GitHub Workflow

- Repository: `https://github.com/stonesaboss/uppercumberlandwellpump.git`
- Production branch: `main`. Pushes to `main` deploy to production.
- Branches / PRs get Cloudflare preview deployments (automatically noindexed).
- Never commit `dist/`, `.env*` (except `.env.example`) or `.dev.vars` — `.gitignore` enforces this.
- Do not configure GitHub Pages or a `gh-pages` branch.

## 5. Cloudflare Pages Setup

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Select `stonesaboss/uppercumberlandwellpump`.
3. Settings:
   - Production branch: **main**
   - Framework preset: **Astro**
   - Build command: **npm run build**
   - Build output directory: **dist**
   - Root directory: **/** (repository root)
4. Add environment variables (section 6) for Production and Preview.
5. Deploy. Build failures block deployment; previews never replace production.

### Custom Domain

1. Pages project → **Custom domains** → add `uppercumberlandwellpump.com`.
2. Also add `www.uppercumberlandwellpump.com`; `public/_redirects` 301s www → apex.
3. The apex domain is the canonical host everywhere (canonicals, sitemap, OG, schema) via
   `PUBLIC_SITE_URL`. Never submit a `*.pages.dev` sitemap to Search Console.

### Preview Protection

`functions/_middleware.ts` adds `X-Robots-Tag: noindex, nofollow` on any host that is not the
production domain, so `*.pages.dev` and branch previews cannot be indexed. Preview submissions
are marked `TEST_SUBMISSION` and are not delivered to production webhooks/email.

## 6. Environment Variables

Copy `.env.example` → `.env` locally; set the same names in Cloudflare Pages → Settings →
Environment variables. **Never commit real values.**

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SITE_URL` | Canonical origin, `https://uppercumberlandwellpump.com` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key override (a default is baked into `src/data/site.ts`) |
| `TURNSTILE_SECRET` | Turnstile secret (server-side verification) — **secret** (`TURNSTILE_SECRET_KEY` accepted as legacy alias) |
| `LEAD_WEBHOOK_URL` | Webhook that receives lead JSON (Zapier/Make/custom) |
| `LEAD_WEBHOOK_SECRET` | Sent as `X-Webhook-Secret` header — **secret** |
| `FORM_RECIPIENT_EMAIL` | Email address for lead notifications |
| `EMAIL_API_KEY` | API key for the email provider — **secret** |
| `ANALYTICS_ID` / `PUBLIC_ANALYTICS_ID` | GA4 ID; analytics loads only when set |
| `TAG_MANAGER_ID` | Optional GTM ID |
| `ENABLE_D1_STORAGE` | `"true"` to persist leads to D1 (requires `LEADS_DB` binding) |
| `ENABLE_R2_UPLOADS` | `"true"` to store photos in R2 (requires `LEAD_UPLOADS` binding) |

## 7. Turnstile Setup

1. Cloudflare dashboard → **Turnstile** → Add site → domain `uppercumberlandwellpump.com`
   (managed or visible mode).
2. The public site key is baked into `src/data/site.ts` (override with
   `PUBLIC_TURNSTILE_SITE_KEY` if rotated). Store the secret as a Pages environment
   **secret** named `TURNSTILE_SECRET` — never commit it.
3. Behavior: the client blocks submission until the widget issues a token; the token is
   verified server-side (with client IP) on every submission and failures return 400;
   expired/failed tokens reset the widget with an accessible error; production without a
   configured secret **rejects** submissions (fail-safe). No client-supplied field can
   bypass verification.

## 8. Lead Delivery (Webhook / Email)

Configure at least one for production:

- **Webhook**: set `LEAD_WEBHOOK_URL` (+ optional `LEAD_WEBHOOK_SECRET`). Payload is JSON with
  `kind` (`lead` or `TEST_SUBMISSION`), `reference`, `submitted_at` and all validated fields.
- **Email**: set `FORM_RECIPIENT_EMAIL` (+ `EMAIL_API_KEY` if your MailChannels-compatible
  sender requires one). Sender identity is `leads@uppercumberlandwellpump.com` — configure the
  matching DNS (SPF/DKIM) per your email provider's docs.

If neither is configured and D1 is disabled, production submissions return an honest failure
message instead of silently dropping leads.

### Form testing checklist

1. `npm run build && npx wrangler pages dev dist`
2. Submit with missing fields → inline errors, no network call.
3. Submit valid → JSON `{ ok: true, reference: "UCWP-…" }`, redirect to `/thank-you/`, reference shown.
4. Submit with >4 photos or a `.svg` → rejected client- and server-side.
5. `GET /api/lead` → 405.

## 9. Optional D1 Lead Storage

```bash
npx wrangler d1 create ucwp-leads
# copy the printed database_id into wrangler.jsonc using wrangler.bindings.example.jsonc as the template
npx wrangler d1 migrations apply ucwp-leads
```

Set `ENABLE_D1_STORAGE=true`. Schema: `migrations/0001_create_leads.sql`. Photos are never
stored in D1 — only R2 object references.

**Retention / deletion**: delete a lead with
`npx wrangler d1 execute ucwp-leads --command "DELETE FROM leads WHERE id='UCWP-…'"`. Adopt a
retention window (e.g. 12 months) and purge on schedule. Disable at any time by setting
`ENABLE_D1_STORAGE` to empty — the site builds and runs fine without D1.

## 10. Optional R2 Photo Uploads

```bash
npx wrangler r2 bucket create ucwp-lead-uploads
# add the LEAD_UPLOADS binding to wrangler.jsonc (see wrangler.bindings.example.jsonc)
```

Set `ENABLE_R2_UPLOADS=true`. The bucket must stay **private**. Objects use randomized names
under the lead reference; test uploads land under `test/`. Uploads are validated (JPG/PNG/HEIC
only, 4 files, 8 MB each, 20 MB combined; no SVG/HTML/scripts/archives). Retention is manual or
via R2 lifecycle rules — align it with your D1 retention.

## 11. Replacing Placeholders

| Placeholder | Where | Action |
| --- | --- | --- |
| `[TRACKING PHONE NUMBER]` | `src/data/site.ts` → `SITE.phone` | Set `display` ("(931) 555-0100") and `tel` ("+19315550100"). Empty `tel` renders text, not a broken link. |
| Contact email | `src/data/site.ts` → `SITE.email` | Set when a real inbox exists; contact page updates automatically. |
| GA4 / GTM | env vars | Set `PUBLIC_ANALYTICS_ID`; nothing loads while empty. |
| Hero/section imagery | `public/images/*.svg` | Replace the illustrated SVGs with real regional photos when available (keep dimensions/alt text honest — no fake branded trucks or crews). |

## 12. Updating the Logo

Source file: `public/logos/ucwp-shield-original.png` (do not redraw or alter the artwork).
Derived sizes: `ucwp-shield-800/400/200.png`, `icons/apple-touch-icon.png`,
`icons/social-profile-512.png`, `images/og-default.png`. If the logo ever changes, regenerate
the derivatives at the same paths. `public/favicon.svg` is a simplified shield icon.

## 13. Updating Service Content

- Service pages live in `src/pages/*.astro` using the `ServicePage` layout.
- Homepage cards/signs/steps: arrays at the top of `src/pages/index.astro`.
- FAQs: homepage set in `src/data/faqs.ts`; per-page FAQs in each page's frontmatter. FAQ
  structured data is generated **only** from FAQs visibly rendered on that page.
- Form options: `src/data/formOptions.ts` — keep in sync with the validation lists in
  `functions/api/lead.ts`.
- Nav/footer links: `src/data/nav.ts`.

## 14. Adding a Legitimate Location Page

Only add a city/county page when provider coverage is verified and you can write substantially
unique content (no doorway pages — this is why Baxter/Monterey/Algood/Smithville have no
standalone pages yet). Copy the pattern from `well-pump-repair-crossville-tn.astro`:

1. Unique title, meta description, H1 and an original local introduction.
2. Distinct service emphasis and verified local context; unique FAQs where appropriate.
3. Service-area disclaimer + referral disclosure (ServicePage adds these).
4. Internal links: 2–3 related services, `/service-area/`, `/request-service/`.
5. Add the page to `src/data/nav.ts` (Service Areas dropdown + footer) and mention it on
   `/service-area/`.

## 15. Editing Metadata

Each page passes `title`, `description` and `path` to its layout. Canonicals, OG URLs, sitemap
and schema URLs all derive from `PUBLIC_SITE_URL` — never hardcode `pages.dev` anywhere.
`/thank-you/` and `/404` are noindexed and excluded from the sitemap
(`astro.config.mjs` sitemap filter).

## 16. Referral Disclosures & Licensing Content

The canonical disclosure strings live in `src/data/site.ts` (`REFERRAL_DISCLOSURE`,
`FORM_DISCLAIMER`, `CONSENT_TEXT`). They appear in the footer, forms, service pages,
`/referral-disclosure/`, `/how-referrals-work/` and the homepage. Do not remove or weaken them.
Review `/licensing-information/` against current State of Tennessee water-well program rules
periodically — it intentionally paraphrases and links conceptually rather than copying
government text.

## 17. Accessibility & SEO Checks (before major releases)

- `npm run check` passes; build completes with zero errors.
- Tab through header nav, dropdowns, form and FAQ accordions; focus visible everywhere.
- One H1 per page; unique titles/descriptions (`grep -r "<title>" dist/` to audit).
- Validate structured data with Google's Rich Results test on the deployed production URL.
- Lighthouse mobile pass on `/` and one service page (aim: no CLS from images, fast LCP).
- Confirm `/thank-you/` and previews respond with noindex headers/meta.

## 18. Lead-Data Retention Summary

Leads exist in up to three places: the delivery webhook/inbox (your retention policy), optional
D1 (section 9) and optional R2 photos (section 10). Personal data is never sent to analytics.
Honor deletion requests received via the contact page across all three.

## 19. Deployment Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| Build fails on Pages but works locally | Node version — set `NODE_VERSION=20` (or current LTS) in Pages env vars. |
| Form returns 503 in production | `TURNSTILE_SECRET` missing — intentional fail-safe. Configure Turnstile. |
| Form returns 502 | No delivery channel configured (webhook/email/D1). Configure one. |
| Preview shows in Google | Middleware missing/modified — restore `functions/_middleware.ts`. |
| www not redirecting | Add `www` as a custom domain so Cloudflare serves the redirect rule. |
| Turnstile widget absent locally | Expected without `PUBLIC_TURNSTILE_SITE_KEY`; dev fallback mode is active. |
| D1/R2 errors on deploy | Bindings referenced but resources missing — remove bindings or create resources (never commit placeholder IDs). |

## 20. Content & Claim Rules (do not break these)

No fabricated reviews, ratings, awards, employees, trucks, offices, licenses, insurance,
pricing, response times, "24/7", "#1", "most trusted", or years-in-business claims. No fake
LocalBusiness/address/geo/review schema. All urgency language stays qualified ("subject to
provider coverage and availability"). See the referral disclosure before adding any new
marketing copy.
