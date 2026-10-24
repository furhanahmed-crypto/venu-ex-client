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

## CSS — assets layout (Shopify constraint)

- **One place only:** revamp styles are flat files `assets/NR-*.css`. Do **not** create `assets/css/` or other subfolders — `shopify theme dev` fails with *Theme files may not be stored in subfolders*.
- File list and roles: see **`docs/CSS.md`**.
- In Liquid use `'NR-tokens.css' | asset_url` (never `css/…`).
- Load order: **`base.css` first**, then `NR-*.css` in `layout/theme.liquid` or section files so revamp rules win.
- Dawn **`component-*.css`** stays for structure/behavior; token look-and-feel for revamped sections belongs in `NR-*.css`.

## CSS — revamp vs legacy (`base.css`)

- **Source of truth for revamp UI:** `assets/NR-*.css` with scoped selectors (e.g. `.shopify-section-group-header-group`, `.naturaw-hero--revamp`).
- **Do not delete legacy blocks in `base.css`** that match header-top, header, or hero (desktop header layout, mobile `.header` padding, `.naturaw-*` breakpoint overrides, site-wide Carlito/Inter rules). Those blocks stay so you can **revert to main-era styling** by removing or not loading revamp stylesheets.
- When revamp needs to override legacy `base.css`, **copy the intent into the appropriate `NR-*.css`** (do not rely on editing `base.css` for new revamp work). Mark restored legacy sections in `base.css` with `/* LEGACY (main) — keep for revert */` when touching them.
- Do **not** add new revamp-only rules to `base.css`; add them to `NR-*.css` instead.
- Type sizes: **px tokens only** for `--text-*` (see `NR-tokens.css`). Dawn uses 62.5% root; rem-based type tokens render too small.
- Split new stylesheets before ~120 lines when practical.

## JavaScript

- Defer non-critical scripts; avoid blocking theme editor.
- Theme toggle: `assets/NR-theme-toggle.js`; no external dependency; sync `aria-pressed` and labels.

## Typography & theme

- Heading font: Cormorant Garamond; UI/body: Manrope (Google Fonts in `theme.liquid`).
- Light mode: default `:root`; dark: `html.dark`.
- Toggle icons: **moon** in light, **sun** in dark.

## Forbidden

- Removing cart, checkout, or payment flows.
- Committing secrets (API keys, `.env` with real credentials).
- Large unrelated refactors while revamping a section.
- Storing theme CSS/JS under nested `assets/` paths.
- Claiming done without checking in dev preview.

## Definition of done (per section)

- Matches `DESIGN.md` for that section.
- Light and dark both acceptable.
- Merchant-configurable content still editable in theme admin.
- Revamp styles live in `assets/NR-*.css`; legacy `base.css` blocks preserved where applicable.
- `TASKS.md` updated.
