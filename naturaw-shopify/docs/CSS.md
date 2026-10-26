# Revamp stylesheets (NR-*)

All new-site CSS lives as **flat files** in `assets/` with the prefix **`NR-`** (shorthand for naturaw-revamp). Shopify does not allow `assets/` subfolders.

| File | Scope |
|------|--------|
| `NR-tokens.css` | Design tokens (`:root`, `html.dark`) |
| `NR-global.css` | Sitewide overrides for legacy green/orange/purple in `base.css` |
| `NR-header-announce.css` | Announcement bar (header-top) |
| `NR-header-main.css` | Main header, mega menu tokens |
| `NR-header-localization.css` | Country/currency picker |
| `NR-header-responsive.css` | Header breakpoints vs legacy `base.css` |
| `NR-header-products.css` / `NR-header-products.js` | Products mega menu: Chips + Millet Mixtures |
| `NR-product.css` | Product details page tokens |
| `NR-typography.css` | Token fonts (Cormorant + Manrope) for header, hero, Three Ways, Shop |
| `NR-hero.css` | Hero section (desktop/base) |
| `NR-hero-responsive.css` | Hero breakpoints |
| `NR-home-1.css` | Homepage: icon features, moringa, ranges, naturally crunchy |
| `NR-home-2.css` | Homepage: playlist, about, why, empower, testimonials, blogs |
| `NR-three-ways-buy.css` | “Three Ways to Buy” section |
| `NR-shop.css` | Homepage shop tabs + product cards |
| `NR-cart-drawer.css` | Cart drawer token overrides |
| `NR-cart-drawer.js` | Cart icon → open drawer (delegated) |
| `NR-cart-page.css` | Full cart page tokens |
| `NR-byob.css` / `NR-byob.js` | Build your own box card + modal (`snippets/nr-byob-card.liquid`, `snippets/nr-byob-modal.liquid`) |
| `NR-about.css` | About Naturaw section / about page |
| `NR-page.css` | Generic page template (main-page) |
| `NR-blog.css` | Blog + article templates |
| `NR-contact.css` | Contact page form + layout |
| `NR-toast.css` | Add-to-cart toast (global) |
| `NR-ingredients.css` | Real Ingredients / Real Nutrition section |
| `NR-newsletter.css` | Newsletter CTA section |
| `NR-footer.css` | Revamp footer + bottom bar |
| `NR-data.js` | Shared revamp content (e.g. buying options) |
| `NR-three-ways-buy.js` | Renders buying-option cards from data |
| `NR-shop.js` | Shop tabs, product grid, ties into Dawn `product-form` |
| `NR-toast.js` | Toast UI used after NR Shop add to cart |
| `NR-theme-toggle.js` | Light/dark toggle |
| `NR-logo-light.png` | Header logo light (`--color-text` #22221f) |
| `NR-logo-dark.png` | Header logo dark (`--color-text` #f4f3ef) |

**Sections / snippets:** `sections/nr-three-ways-buy.liquid` (Shopify requires lowercase section filenames), `snippets/nr-header-logo.liquid`, `snippets/nr-theme-toggle.liquid`, `snippets/nr-header-localization.liquid`.

**Load order:** `base.css` → NR bundle in `layout/theme.liquid` (homepage adds `NR-home-*.css` when `template.name == 'index'`) → hero files in `sections/hero-banner.liquid`.

**Legacy:** Matching rules remain in `base.css` for revert; NR wins because it loads later.

**Find in assets:** sort by name — all revamp sheets appear together under `NR-*`.
