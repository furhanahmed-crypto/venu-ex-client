# Cart — how it works in this theme

## Summary

The storefront cart is **not** stored in `localStorage`. It lives on **Shopify’s servers** and is tied to the visitor’s **cart cookie** (`cart`). The theme uses Dawn’s **Ajax Cart API** and section re-rendering so the UI stays in sync without a full page reload.

## Add to cart (NR Shop + product pages)

1. User submits a `<product-form>` (Dawn custom element in `assets/product-form.js`).
2. JS `POST`s to `routes.cart_add_url` (`/cart/add.js`) with variant id and requested **section HTML** (`cart-drawer`, `cart-icon-bubble`).
3. Shopify returns JSON including updated cart lines and rendered section markup.
4. `cart-drawer.js` → `renderContents()` swaps drawer + header bubble HTML and **opens the drawer**.
5. `pubsub.js` publishes `PUB_SUB_EVENTS.cartUpdate` so other components (cart line quantities, etc.) can react.

NR Shop reuses this path exactly — no parallel cart logic.

## Update quantity / remove (drawer & cart page)

`assets/cart.js` handles line changes via:

- `routes.cart_change_url` — change quantity or remove a line
- Section re-fetch for `cart-drawer` / `main-cart-items`

Same behavior on the full cart page and in the drawer.

## What is stored locally?

| Data | Storage | Purpose |
|------|---------|---------|
| Cart lines, totals | Shopify (cookie + server) | Checkout source of truth |
| Light/dark preference | `localStorage` (`naturaw-theme`) | UI only |
| — | — | Cart is **never** mirrored to `localStorage` |

## NR additions

- **`NR-toast.js`** — brief “Item added to cart” when add succeeds from **NR Shop** (drawer still opens via Dawn).
- **`NR-cart-drawer.css`** — token-based styling on top of Dawn’s cart drawer markup.

## Best practice for new sections

- Prefer `<product-form>` + hidden `name="id"` variant field for single-variant products.
- Do not write custom `/cart/add` handlers unless you also request sections and call `cart-drawer.renderContents()`.
- Filter products in Liquid when building catalog JSON; use JS `.filter()` only for tab UX (NR Shop).

## NR Shop product source

Section setting **Product source collection** (fallback: `collections.products`, then `collections.all`). Only products whose **Product type** is `chips` or `Millet Mixtures` (case-insensitive) are included. Gift boxes and other types are excluded automatically.
