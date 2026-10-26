# Naturaw Shopify — Architecture

## Stack

- **Shopify Online Store 2.0** (Dawn-derived Liquid theme)
- **Shopify CLI** — local dev (`shopify theme dev`)
- **CSS custom properties** — `assets/NR-tokens.css`
- **Vanilla JS** — theme toggle (`NR-theme-toggle.js`), section data (`NR-data.js`), shop tabs (`NR-shop.js`)

No app server or database in this repo; cart/checkout remain Shopify-hosted.

## Theme layout

```
layout/theme.liquid          → fonts, tokens, global scripts
sections/header-group.json   → announcement-bar + header order
sections/announcement-bar.liquid
sections/header.liquid
snippets/nr-theme-toggle.liquid
assets/NR-*.css, assets/NR-theme-toggle.js
```

## Design token flow

1. `NR-tokens.css` defines `:root` and `.dark` variables.
2. Section-specific CSS (e.g. `NR-header-main.css`) maps tokens to Dawn class names.
3. Dawn `base.css` still provides grid/behavior; Naturaw CSS loads **after** and overrides visuals only.

## Theme mode

- **Light is the default.** Early inline script in `theme.liquid` forces light (`naturaw-theme=light`, removes `html.dark`).
- Header dark-mode toggle is **hidden** (`show_theme_toggle: false` in `header-group.json`).
- Cookie banner: `NR-cookie-consent.css` + `NR-cookie-consent.js` (slide in/out + NR tokens).

## Integrations

- Shopify cart (Ajax API + cart drawer), customer accounts, predictive search (theme settings). See `docs/CART.md`.
- Third-party apps via `@app` blocks in header — do not remove.

## Decisions

- Type scale uses **px** because Dawn sets `html { font-size: 62.5% }`.
- Revamp is **section-by-section** (1–2 at a time) to limit risk.
