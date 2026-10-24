# Naturaw Shopify — PRD

## Goal

Revamp the existing Naturaw Shopify storefront to match the approved light/dark design templates, using shared CSS tokens, without breaking merchant-configured behavior (menus, cart, checkout, apps).

## Scope (phased)

| Phase | Sections | Status |
|-------|----------|--------|
| 1 | Header-top (announcement), header, theme toggle | In progress |
| 2+ | Hero, categories, product rows, footer, etc. | Planned |

## Requirements

- Use `assets/NR-tokens.css` as the single source for colors, type, spacing, and motion.
- Preserve Dawn section settings, menu links, search, account, cart, localization, and mega menu behavior.
- Light/dark mode via `html.dark`, persisted in `localStorage` (`naturaw-theme`).
- Typography must stay readable on Dawn (type tokens in **px**, not rem).
- Fonts: **Cormorant Garamond** (headings/logo), **Manrope** (UI/body).

## User stories

- As a shopper, I see a clear announcement bar and navigation at comfortable type sizes.
- As a shopper, I can switch light/dark mode from the header (moon → dark, sun → light).
- As a merchant, I can still edit announcement text and menus in the theme editor.

## Acceptance criteria (phase 1)

- [ ] Announcement bar uses token colors and `--text-sm` (13px) body font.
- [ ] Nav links use `--text-base` (15px), uppercase, Manrope.
- [ ] Theme toggle visible in header icon row; correct icon per mode.
- [ ] No regression to cart, search, or mobile drawer.
