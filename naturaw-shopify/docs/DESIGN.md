# Naturaw — Design system

Reference: `naturaw-light.png`, `naturaw-dark.png` (repo root). Tokens: `assets/naturaw-revamp-tokens.css`.

## Colors

| Token | Light | Usage |
|-------|-------|--------|
| `--color-bg` | `#faf9f6` | Page background |
| `--color-surface` | `#ffffff` | Cards, panels |
| `--color-text` | `#22221f` | Primary text |
| `--color-text-muted` | `#77766f` | Secondary text |
| `--color-primary` | `#1e1f1c` | Announcement bar, primary buttons |
| `--color-primary-text` | `#ffffff` | Text on primary |
| `--color-border` | `#e5e3dd` | Dividers |
| `--color-accent` | `#e8c547` | Cart badge, highlights |

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
- Respect `prefers-reduced-motion` when adding new animations.

## Responsiveness

- Mobile-first; match Dawn breakpoints (750px, 990px).
- Do not remove drawer menu on small screens.
