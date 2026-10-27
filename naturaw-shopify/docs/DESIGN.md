# Naturaw — Design system

Reference: `naturaw-light.png`, `naturaw-dark.png` (repo root). Tokens: `assets/NR-tokens.css`.

## Colors

| Token | Light | Usage |
|-------|-------|--------|
| `--color-bg` | `#faf9f6` | Page / hero / about section background |
| `--color-surface` | `#ffffff` | Cards, panels, inputs |
| `--color-card` | `#f0efeb` | Soft bands (newsletter, page title banners) |
| `--color-text` | `#22221f` | Primary text |
| `--color-text-muted` | `#77766f` | Secondary text |
| `--color-primary` | `#1e1f1c` | Announcement bar, primary buttons |
| `--color-primary-text` | `#ffffff` | Text on primary |
| `--color-border` | `#e5e3dd` | Dividers |
| `--color-inverse-bg` | `#161614` | Three Ways cards 1 & 3 only (light mode) |
| `--color-inverse-surface` | `#242422` | Nested surfaces inside inverse cards |
| `--color-inverse-text` | `#f4f3ef` | Text on inverse cards |
| `--color-inverse-muted` | `#a9a8a1` | Secondary text on inverse cards |
| `--color-inverse-border` | translucent light | Dividers on inverse cards |

Light mode uses white shades for section backgrounds — no full-width black bands except the two Three Ways inverse cards. Do not add pink, orange, green, or yellow; legacy colors are overridden in `NR-global.css` and `NR-judgeme.css`.

Dark mode overrides live under `html.dark` in the same token file.

## Typography

| Role | Font | Size token | Notes |
|------|------|------------|--------|
| Logo / display | Cormorant Garamond | `--text-2xl` (28px) | Serif, shop name fallback |
| Nav primary | Manrope | `--text-base` (15px) | Uppercase, `--tracking-wide` |
| Announcement | Manrope | `--text-sm` (13px) | Sentence case, centered |
| UI small | Manrope | `--text-xs` (11px) | Badges, meta |

**Rule:** Use **px token values only** in this theme. Do not use rem for `--text-*` (Dawn root font size breaks rem semantics).

## Spacing & layout

- `--header-height`: 72px
- `--announce-height`: 36px
- `--content-max`: 1200px
- Section horizontal padding: `--space-6` (24px) minimum on header

## Header patterns

- **Announcement:** full-width `--color-primary`, `--color-primary-text`.
- **Header:** `--color-bg`, logo left, nav centered (desktop `middle-left`), icons right.
- **Header logo:** Theme settings image (`settings.logo`) — merchant green Naturaw asset; unchanged during header revamp.
- **Icons:** `currentColor`, 44px hit target (Dawn default).
- **Theme toggle:** moon when light (switch to dark), sun when dark (switch to light).

## Motion

- `--transition-theme` on surfaces and text that change with mode.
- `--ease-premium` with `--duration-fast/base/slow` for hover and reveal motion.
- Add `data-nr-reveal` to a section wrapper to fade it up on scroll (`NR-motion.css` + `NR-reveal.js`).
- Respect `prefers-reduced-motion` when adding new animations.

## Responsiveness

- Mobile-first; match Dawn breakpoints (750px, 990px).
- Do not remove drawer menu on small screens.
