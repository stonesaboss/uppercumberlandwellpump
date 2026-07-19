# Resource Center Image Assets — PENDING

This directory is reserved for the Well Pump Resources featured images.
**None of these assets exist yet.** The machine-readable manifest (paths,
alt text, aspect ratios, recommended subjects, fallbacks, status) lives in
`src/data/resources.ts` — when an asset is produced, place the file here and
flip that entry's `status` from `"pending"` to `"available"`.

Until then, pages render either an existing relevant site photo (fallback)
or a branded gradient band — never a broken image or gray placeholder.

| Filename | Route | Aspect | Temporary fallback |
| --- | --- | --- | --- |
| `resources-well-pump-knowledge-center.webp` | `/resources/` | 16:9 (1600×900) | `/images/hero/well-pump-rural-service-desktop.webp` |
| `resources-well-pump-costs.webp` | `/resources/well-pump-costs/` | 16:9 (1600×900) | branded band (clipboard icon) |
| `resources-well-pump-problems.webp` | `/resources/well-pump-problems/` | 16:9 (1600×900) | branded band (alert icon) |
| `resources-water-pressure.webp` | `/resources/water-pressure/` | 16:9 (1600×900) | branded band (gauge icon) |
| `resources-well-system-components.webp` | `/resources/well-system-components/` | 16:9 (1600×900) | branded band (tank icon) |
| `resources-maintenance-planning.webp` | `/resources/maintenance-and-planning/` | 16:9 (1600×900) | branded band (check icon) |
| `resources-rural-well-projects.webp` | `/resources/rural-well-projects/` | 16:9 (1600×900) | `/images/hero/well-pump-rural-service-mobile.webp` |
| `resources-upper-cumberland-well-guide.webp` | `/resources/upper-cumberland-well-guide/` | 16:9 (1600×900) | `/images/other/well-service-ridge-background.webp` |

Image content rules (from the build spec): photorealistic rural-Tennessee
well-service scenes; no branding, no text overlays, no posed fake workers,
no unsafe electrical exposure, no people in well pits, no open casings
without service context, no graphic damage.
