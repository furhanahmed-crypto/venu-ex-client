# Naturaw Shopify — Architecture

## Stack

- **Shopify Online Store 2.0** (Dawn-derived Liquid theme)
- **Shopify CLI** — local dev (`shopify theme dev`)
- **CSS custom properties** — `assets/naturaw-revamp-tokens.css`
- **Vanilla JS** — theme toggle (`naturaw-theme-toggle.js`)

No app server or database in this repo; cart/checkout remain Shopify-hosted.

## Theme layout

```
layout/theme.liquid          → fonts, tokens, global scripts
sections/header-group.json   → announcement-bar + header order
sections/announcement-bar.liquid
sections/header.liquid
snippets/naturaw-theme-toggle.liquid
assets/naturaw-revamp-*.css, assets/naturaw-theme-toggle.js
```

## Design token flow

1. `naturaw-revamp-tokens.css` defines `:root` and `.dark` variables.
2. Section-specific CSS (e.g. `naturaw-revamp-header-main.css`) maps tokens to Dawn class names.
3. Dawn `base.css` still provides grid/behavior; Naturaw CSS loads **after** and overrides visuals only.

## Theme mode

- Early inline script in `theme.liquid` sets `html.dark` before paint.
- Toggle updates class + `localStorage`; JS syncs icon visibility and `aria-*`.

## Integrations

- Shopify cart, customer accounts, predictive search (theme settings).
- Third-party apps via `@app` blocks in header — do not remove.

## Decisions

- Type scale uses **px** because Dawn sets `html { font-size: 62.5% }`.
- Revamp is **section-by-section** (1–2 at a time) to limit risk.
