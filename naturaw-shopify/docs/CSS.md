# Revamp stylesheets

All new-site CSS lives as **flat files** in `assets/` with the prefix **`naturaw-revamp-`** (Shopify does not allow `assets/` subfolders).

| File | Scope |
|------|--------|
| `naturaw-revamp-tokens.css` | Design tokens (`:root`, `html.dark`) |
| `naturaw-revamp-header-announce.css` | Announcement bar (header-top) |
| `naturaw-revamp-header-main.css` | Main header, mega menu tokens |
| `naturaw-revamp-header-localization.css` | Country/currency picker |
| `naturaw-revamp-header-responsive.css` | Header breakpoints vs legacy `base.css` |
| `naturaw-revamp-typography.css` | Token fonts for header + hero |
| `naturaw-revamp-hero.css` | Hero section (desktop/base) |
| `naturaw-revamp-hero-responsive.css` | Hero breakpoints |
| `naturaw-revamp-logo-light.png` | Header logo light (`--color-text` #22221f) |
| `naturaw-revamp-logo-dark.png` | Header logo dark (`--color-text` #f4f3ef) |

**Load order:** `base.css` → revamp bundle in `layout/theme.liquid` → hero files in `sections/hero-banner.liquid`.

**Legacy:** Matching rules remain in `base.css` for revert; revamp wins because it loads later.

**Find in assets:** sort by name — all revamp sheets appear together under `naturaw-revamp-*`.
