# Naturaw Shopify theme

Online Store 2.0 Liquid theme for **Naturaw**, being revamped section-by-section to match light/dark design templates using shared CSS tokens.

## Features

- Dawn-based header, cart, search, and mega menu (behavior preserved)
- **Naturaw design tokens** (`assets/naturaw-tokens.css`)
- **Light / dark mode** with header toggle (moon / sun)
- **Cormorant Garamond** + **Manrope** typography

## Stack

| Layer | Technology |
|-------|------------|
| Storefront | Shopify Liquid theme |
| Styling | CSS custom properties + Dawn `base.css` |
| Local dev | Shopify CLI |
| Optional tooling | Bun (for scripts in monorepo if added later) |

There is no application database in this theme; product and order data live in Shopify.

## Prerequisites

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- Store access (staff or collaborator)
- Node.js or [Bun](https://bun.sh) if you run package scripts from the parent repo

## Setup

```bash
cd naturaw-shopify
shopify theme dev --store=YOUR_STORE.myshopify.com
```

Open the preview URL from the CLI. Changes to Liquid/CSS/JS sync to the development theme.

## Environment

Shopify CLI manages authentication interactively (`shopify auth login`). No `.env` is required for basic theme development.

If the parent monorepo uses Bun:

```bash
bun install   # from repo root, when package.json exists
```

## Useful commands

| Command | Purpose |
|---------|---------|
| `shopify theme dev` | Live preview + hot reload |
| `shopify theme push` | Deploy to a theme (use `--unpublished` for safety) |
| `shopify theme check` | Liquid/theme lint |

## Project structure

```
naturaw-shopify/
├── assets/           # CSS, JS, SVG (naturaw-tokens.css, header styles, toggle)
├── config/           # Theme settings
├── docs/             # PRD, design, architecture, tasks, rules
├── layout/           # theme.liquid
├── sections/         # Header, homepage sections, footer
├── snippets/         # Includes (e.g. naturaw-theme-toggle)
└── templates/        # JSON templates
```

## Documentation

| File | Contents |
|------|----------|
| [docs/PRD.md](docs/PRD.md) | Goals and acceptance criteria |
| [docs/DESIGN.md](docs/DESIGN.md) | Tokens, typography, header patterns |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Theme structure and data flow |
| [docs/TASKS.md](docs/TASKS.md) | Progress tracker |
| [docs/RULES.md](docs/RULES.md) | Agent/developer conventions |
| [docs/MEMORY.md](docs/MEMORY.md) | Decisions and constraints |
| [docs/SECURITY.md](docs/SECURITY.md) | Secrets and storefront safety |

## Design reference

Full-page mockups (repo root, outside this folder):

- `../naturaw-light.png`
- `../naturaw-dark.png`

Source token file (keep in sync with theme): `../naturaw-tokens.css`

## Revamp workflow

1. Read `docs/DESIGN.md` and `docs/TASKS.md`.
2. Implement **1–2 sections** using tokens only for new styling.
3. Verify light/dark and mobile.
4. Update `docs/TASKS.md` and `docs/MEMORY.md` when decisions change.
