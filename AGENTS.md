# AGENTS.md — aseemkishore.com

Ground rules for every coding agent (Codex, Copilot, Cursor, Claude). `CLAUDE.md` is the full operating manual; this file must never contradict it.

## Ground rules

- **`main` auto-deploys to production on Vercel.** Never push or merge to `main` casually — work on a branch and open a PR.
- **No client-side data fetching or state management outside `src/app/tools/**`.** Portfolio pages render from static data in `src/data/`; Thoughts pages are server-fetched from WordPress via `src/lib/wordpress.ts`.
- **Do not use `wp.aseemkishore.com`** — the DNS record does not exist (verified 2026-06-10). The WP REST base is the Rocket.net CDN URL in `.env.example`.
- **Do not run `npm run gateway:canary`** or add a static AI Gateway key. The Gateway leg is an attended, default-off rollout (`README.md` § AI continuity).
- Never commit `.env*` files or API keys (`TOGETHER_API_KEY`, `OPENAI_API_KEY`, `CRON_SECRET`).

## Working in this repo

- Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (CSS-first, no `tailwind.config`).
- Verify with `npm run build` (the only typecheck gate), `npm run lint`, and `npm test` (hermetic Node test runner; no network).
- New public routes must be added to `src/app/sitemap.ts`.
- Flip app pages (`/tools/flip`, `/flip-privacy`) must stay consistent with each other and with StoreKit pricing.

See `CLAUDE.md` for routes, env vars, and conventions.
