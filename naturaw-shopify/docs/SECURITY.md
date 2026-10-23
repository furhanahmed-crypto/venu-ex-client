# Security — Naturaw Shopify theme

## Secrets

- Never commit Shopify Admin API tokens, Theme Access passwords, or private app credentials.
- Use Shopify CLI login and environment-specific config locally; do not store in git.

## Storefront

- Cart and checkout stay on Shopify; do not embed third-party payment scripts without review.
- Customer PII only via Shopify forms and official customer account flows.

## Theme code

- Avoid `eval`, inline untrusted Liquid from metafields without escape/filter.
- Use `| escape` for user-facing text in new Liquid.
- Third-party scripts: prefer Shopify app blocks or documented snippets only.

## Theme toggle

- `localStorage` key `naturaw-theme` stores only `light` or `dark` — not auth data.

## Dependencies

- Google Fonts loaded from `fonts.googleapis.com`; CDN scripts (e.g. Splide) should use pinned versions already in `theme.liquid`.

## Reporting

- Shopify platform vulnerabilities: follow Shopify security disclosure.
- Theme issues: fix in repo and deploy via theme push/dev.
