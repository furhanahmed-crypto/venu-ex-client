# Agent rules — Naturaw Shopify theme

Read `PRD.md`, `DESIGN.md`, and `MEMORY.md` before changing established UI or tokens.

## Core

- **Do not disturb any existing functionality throughout the revamp.** Visual and token updates only unless a task explicitly requires behavior change.
- **Preserve behavior:** menus, cart, search, accounts, localization, apps, theme editor settings.
- **Tokens first:** no hard-coded colors/fonts in section CSS when a token exists.
- **Small steps:** 1–2 sections per task; keep `shopify theme dev` runnable.
- Prefer clarity over clever abstractions.

## Shopify / Liquid

- Dawn conventions: sections, snippets, `{% schema %}`, Online Store 2.0.
- Do not break `section.settings` IDs or block types merchants rely on.
- New UI in **snippets** when reused; keep sections readable.
- Load new CSS from `layout/theme.liquid` after `base.css`.

## CSS

- Use variables from `naturaw-tokens.css`.
- Type sizes: **px tokens only** for `--text-*`.
- Scope overrides under clear selectors (e.g. `.shopify-section-group-header-group`).
- Split new stylesheets before ~120 lines when practical.

## JavaScript

- Defer non-critical scripts; avoid blocking theme editor.
- Theme toggle: no external dependency; sync `aria-pressed` and labels.

## Typography & theme

- Heading font: Cormorant Garamond; UI/body: Manrope (Google Fonts in `theme.liquid`).
- Light mode: default `:root`; dark: `html.dark`.
- Toggle icons: **moon** in light, **sun** in dark.

## Forbidden

- Removing cart, checkout, or payment flows.
- Committing secrets (API keys, `.env` with real credentials).
- Large unrelated refactors while revamping a section.
- Claiming done without checking in dev preview.

## Definition of done (per section)

- Matches `DESIGN.md` for that section.
- Light and dark both acceptable.
- Merchant-configurable content still editable in theme admin.
- `TASKS.md` updated.
