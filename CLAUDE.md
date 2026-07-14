# aseemkishore.com

Personal showcase site. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 on Vercel; content from headless WordPress (Rocket.net) via the WP REST API. No tests, no DB, no auth.

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # production build — also the only typecheck gate (no typecheck script)
npm run lint     # eslint (v9 flat config)
```

## Architecture

- `src/app/` — routes: `/`, `/projects`, `/projects/[slug]`, `/thoughts`, `/thoughts/[slug]`, `/about`, `/tools`, `/tools/tweet-score`. Portfolio/thoughts are server components; tools may use client components + API routes (see below).
- `src/lib/wordpress.ts` — the only WP REST client. Every fetch goes through `fetchAPI()` with `next: { revalidate: 60 }` (ISR) and a fallback arg so builds survive WP outages.
- `src/lib/together.ts`, `src/lib/rate-limit.ts`, `src/lib/share-card.ts` — viral tools (Together writing + OpenAI images).
- `src/components/` — Nav, Footer, ProjectCard, ThoughtCard.
- WP content model: categories Projects/Thoughts/Personal; project posts carry native post meta (`project_url`, `project_tech_stack`, …) exposed by a mu-plugin. Details: `docs/wordpress-backend.md`.

## Conventions

- Styling: Tailwind v4 CSS-first — `globals.css` has `@import "tailwindcss"` + `@plugin "@tailwindcss/typography"`. There is no `tailwind.config`.
- Data: add fetchers to `src/lib/wordpress.ts`, always pass a fallback; decode WP titles/excerpts with `decodeHtmlEntities()`.
- WP HTML is rendered with `dangerouslySetInnerHTML` — accepted because the CMS is our own; add sanitization if untrusted content ever enters.
- Env: `WORDPRESS_API_URL` (WP). Tools also need `TOGETHER_API_KEY`, `OPENAI_API_KEY`; optional `WRITER_MODEL`, `WRITER_FALLBACK_MODEL`, `IMAGE_QUALITY` (`medium`|`low`).
- **Tools exception:** `"use client"` and `src/app/api/tools/**` are allowed under `src/app/tools/**` only. Portfolio and thoughts stay server-fetched from WP — no client data fetching there.

## Do NOT

- Do NOT use `wp.aseemkishore.com` — its DNS record no longer exists (verified 2026-06-10). Use the CDN URL above until the subdomain is re-created (`docs/wordpress-backend.md`).
- Do NOT merge or push to `main` casually — Vercel auto-deploys `main` to production (this repo is an exception to the folder-wide "no auto-deploy" default).
- Do NOT add client-side data fetching or state management outside `src/app/tools/**` — keep portfolio/thoughts server-fetched.

## AMBIGUOUS-KEPT

- The entire frontend (including `/tools`) sits on the unmerged branch `feat/frontend-design`. `main` — and therefore production — still serves the original placeholder homepage. Confirm with the user before merging to `main` (Vercel auto-deploys).
- `.env.local` may still include `NODE_TLS_REJECT_UNAUTHORIZED` from the old wp-subdomain SSL era; removable once that story is settled.

## Docs

- `docs/wordpress-backend.md` — WP server/SSH details, mu-plugins, content IDs, endpoint status, roadmap pointer
- `docs/plans/` — 2026-03-13 frontend design + implementation plans (built against these)
