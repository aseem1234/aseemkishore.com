# aseemkishore.com

Personal showcase site. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 on Vercel; content from headless WordPress (Rocket.net) via the WP REST API. No tests, no DB, no auth.

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # production build — also the only typecheck gate (no typecheck script)
npm run lint     # eslint (v9 flat config)
```

## Architecture

- `src/app/` — routes: `/`, `/projects`, `/projects/[slug]`, `/thoughts`, `/thoughts/[slug]`, `/about`. All server components; no client-side state or data fetching.
- `src/lib/wordpress.ts` — the only WP REST client. Every fetch goes through `fetchAPI()` with `next: { revalidate: 60 }` (ISR) and a fallback arg so builds survive WP outages.
- `src/components/` — Nav, Footer, ProjectCard, ThoughtCard.
- WP content model: categories Projects/Thoughts/Personal; project posts carry native post meta (`project_url`, `project_tech_stack`, …) exposed by a mu-plugin. Details: `docs/wordpress-backend.md`.

## Conventions

- Styling: Tailwind v4 CSS-first — `globals.css` has `@import "tailwindcss"` + `@plugin "@tailwindcss/typography"`. There is no `tailwind.config`.
- Data: add fetchers to `src/lib/wordpress.ts`, always pass a fallback; decode WP titles/excerpts with `decodeHtmlEntities()`.
- WP HTML is rendered with `dangerouslySetInnerHTML` — accepted because the CMS is our own; add sanitization if untrusted content ever enters.
- Env: `WORDPRESS_API_URL` (only env var the app reads). The working value is the Rocket.net CDN URL `https://cbj27jbfj4.onrocket.site/wp-json/wp/v2`.

## Do NOT

- Do NOT use `wp.aseemkishore.com` — its DNS record no longer exists (verified 2026-06-10). Use the CDN URL above until the subdomain is re-created (`docs/wordpress-backend.md`).
- Do NOT merge or push to `main` casually — Vercel auto-deploys `main` to production (this repo is an exception to the folder-wide "no auto-deploy" default).
- Do NOT add client-side data fetching or state management — keep everything server-fetched.

## AMBIGUOUS-KEPT

- The entire frontend (all routes above) sits on the unmerged branch `feat/frontend-design` (the current checkout, last commit 2026-03-15). `main` — and therefore production — still serves the original placeholder homepage. Confirm with the user before merging or building on top.
- `.env.local` contains only `NODE_TLS_REJECT_UNAUTHORIZED` — a leftover from the wp-subdomain SSL-pending era; likely removable once the endpoint story is settled.

## Docs

- `docs/wordpress-backend.md` — WP server/SSH details, mu-plugins, content IDs, endpoint status, roadmap pointer
- `docs/plans/` — 2026-03-13 frontend design + implementation plans (built against these)
