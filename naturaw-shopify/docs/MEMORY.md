# Naturaw Shopify — Memory

## Project context

- Incremental **visual revamp** of live Naturaw Shopify theme; functionality and merchant settings stay.
- Work in **1–2 sections per step** with token-based CSS.

## Decisions

- **2026-03-23:** Typography tokens switched to **px** after header nav/announcement rendered too small (Dawn 62.5% html font-size).
- **2026-03-23:** Dark mode on `html.dark`; storage key `naturaw-theme`.
- **2026-03-24:** Revamp CSS naming: flat `assets/NR-*.css` (see `docs/CSS.md`).
- **2026-03-24:** Revamp isolation: `naturaw-header-responsive.css`, `NR-typography.css`, etc.
- **2026-03-23:** Header CSS split: `naturaw-header-announce.css`, `naturaw-header-main.css`.
- Announcement bar stays **dark** in both modes (per design reference).

## Constraints

- Do not rename or remove Shopify section setting IDs.
- Avoid editing `header-group.json` unless necessary (auto-generated in admin).
- Keep mega menu, cart notification, and localization markup intact.

## Lessons

- Header country/language picker lives **once**, after cart (`naturaw-header-localization` snippet). **Doubly** (Beast Currency Converter app embed) duplicated the UI in `header__icons` — hidden via CSS; Shopify native picker kept.
- Header logo reverted to theme **`settings.logo`** (green Naturaw PNG); custom token SVG/wordmark removed.
- Override Dawn `.h5` on announcement messages explicitly (`font-family`, `font-size`).
- Theme toggle needs `path { fill: currentColor }` because Dawn sets `.header__icon .icon { fill: none }`.

## References

- Design PNGs at repo root: `naturaw-light.png`, `naturaw-dark.png`
- Token source also at repo root: `naturaw-tokens.css` (sync with theme copy when changing globals)
