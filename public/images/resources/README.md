# Resource Center Image Assets — INSTALLED

All 90 featured images (8 hub + 82 guide) are installed here as 1600×900
WebP (16:9), status `"available"` in the manifests. The machine-readable
manifests live in `src/data/resources.ts` (hubs) and `src/data/guides.ts`
(guides). All imagery is representative generated imagery — it does not
depict completed local projects, employees, or company-owned equipment.

If an asset is ever removed, flip its manifest `status` back to
`"pending"` and the page falls back to a site photo or branded band —
never a broken image.

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
