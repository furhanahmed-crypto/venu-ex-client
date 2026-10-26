# Checkout branding (Shopify-hosted)

Checkout runs on **Shopify’s checkout** (not theme Liquid). You cannot restyle checkout from `theme.liquid` without **Shopify Plus** (`checkout.liquid`).

## Match NR revamp in Admin

**Settings → Checkout → Customize** (or **Checkout branding**), set:

| Role | Light mode hex | Notes |
|------|----------------|--------|
| Background | `#faf9f6` | `--color-bg` |
| Text | `#22221f` | `--color-text` |
| Buttons | `#1e1f1c` | `--color-primary` |
| Button labels | `#ffffff` | `--color-primary-text` |
| Accents / links | `#22221f` | keep readable contrast |

Fonts (if available in branding editor):

- **Headings:** Cormorant Garamond  
- **Body:** Manrope  

Upload the same logo as the header (light version on light checkout background).

## What stays untouched

- Checkout steps, payment, shipping, and apps — only **colors, logo, and fonts** change.
- Cart drawer and `/cart` are themed in the Online Store theme (`NR-cart-drawer.css`, `NR-cart-page.css`).

**This repo cannot replace Shopify’s checkout HTML** on a standard plan. After you apply branding in Admin, checkout will visually match the storefront tokens above while behavior stays Shopify-default.

## Cart drawer vs checkout

- **Cart icon / Add to cart** → opens **cart drawer** (Ajax), does not redirect to `/cart`.
- **Checkout** button in the drawer → Shopify checkout URL (expected).
