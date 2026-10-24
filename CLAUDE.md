# aseemkishore.com

Personal site for Aseem Kishore, rebuilt 2026-08-15 as a content-leadership portfolio (experience, case studies, verified writing, résumé, contact) plus a `/tools` section (Tweet Flops-o-Meter, Flip iPhone-app pages). Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 on Vercel (project name unset in this repo). **Portfolio content is static TypeScript in `src/data/`**; headless WordPress (Rocket.net, WP REST) now serves the Thoughts pages (with repo-published essays in `src/data/published-thoughts.ts` as a fallback) — that CMS is not public DNS. Public DNS (2026-09-12): registrar GoDaddy; NS Cloudflare (DNS-only); apex A Vercel; `wp.aseemkishore.com` is NXDOMAIN. No DB, no user auth. Risk: `main` auto-deploys to production; the tools spend Together/OpenAI credit.

## Do NOT

- **Do NOT merge or push to `main` casually — Vercel auto-deploys `main` to production** (this repo is an exception to the folder-wide "no auto-deploy" default). Branch + PR.
- **Do NOT run `npm run gateway:canary` unprompted** — it runs `vercel crons run /api/gateway-canary` against the deployed project and is part of an attended, one-shot qualification procedure (`README.md` § AI continuity). Never add a static AI Gateway key; Gateway auth is runtime Vercel OIDC.
- **Do NOT use `wp.aseemkishore.com`** — NXDOMAIN (verified 2026-06-10, reconfirmed 2026-09-12). Public site DNS is Cloudflare NS + Vercel A, not Rocket. Use the Rocket.net CDN URL in `.env.example` for Thoughts REST (`docs/wordpress-backend.md`).
- **Do NOT add client-side data fetching or state management outside `src/app/tools/**`** — everything else is server-rendered from `src/data/` or `src/lib/thoughts.ts` (`src/data/published-thoughts.ts` + `src/lib/wordpress.ts`).
- Do NOT let a client field select the Gateway path, model, or auth in `/api/tools/tweet-score` — `test/tweet-score-route.test.ts` pins this; the server sets `gatewayTrustedServerContext`.
- Do NOT commit `.env*` (only `.env.example` is tracked) or the secrets listed under Env.

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # production build — also the only typecheck gate (no typecheck script)
npm run lint     # eslint (v9 flat config, eslint-config-next)
npm test         # tsx --test test/*.test.ts test/*.test.mjs — hermetic: Gateway/canary policy, tweet-score route, share-card, flip-link, thoughts merge, WordPress fetch bounds, profile-data invariants
npm run gateway:canary   # ATTENDED ONLY — see Do NOT
```

`scripts/generate-resume-pdf.mjs` is a stale generator: the shipped `public/resume/Aseem-Kishore-Resume.pdf` is a browser print of `scripts/resume.html` (2026-08-16), so regenerate by printing that HTML, not by running the script.

## Architecture

- Routes (`src/app/`): `/`, `/experience`, `/career`, `/work`, `/work/[slug]` (case studies), `/writing`, `/about`, `/contact`, `/resume`, `/projects`, `/projects/[slug]` (publications), `/thoughts`, `/thoughts/[slug]`, `/tools`, `/tools/tweet-score`, `/tools/flip`, `/tools/flip/press` (Fast Coin Flip press kit), `/flip-privacy`, `/c` (`src/app/c/page.tsx` — shared-coin Universal Link / App Clip web landing page), plus `sitemap.ts`, `robots.ts`, `icon.tsx`/`apple-icon.tsx`, `opengraph-image.tsx`/`twitter-image.tsx`, `not-found.tsx`. `public/.well-known/apple-app-site-association` configures Universal Links (`/c?p=*`, `/c/*` → `6SV2AL44X4.com.akinternetconsulting.flip`) and the App Clip (`6SV2AL44X4.com.akinternetconsulting.flip.Clip`). `next.config.ts` redirects `/projects/positiontracker` → `/projects/position-tracker`. New public routes go into `sitemap.ts` and (if top-level) `src/components/Nav.tsx`.
- API routes: `POST /api/tools/tweet-score` (Together writer, 20 req/h/IP), `POST /api/tools/share-card` (OpenAI GPT Image 2.5 Flare → GPT Image 2 background + `sharp` overlay, 10 req/h/IP, dark-gradient fallback without `OPENAI_API_KEY`), `GET /api/tools/flip-og` (`src/app/api/tools/flip-og/route.tsx` — `next/og` `ImageResponse` 1200×630 Open Graph card for `/tools/flip` and `/c?p=...` shared coins), `GET /api/gateway-canary` (Vercel Cron `17 11 * * *` UTC; inert unless armed). Rate limits are `src/lib/rate-limit.ts`, in-memory per warm instance — cost control, not security.
- `src/data/*.ts` — `profile.ts`, `experience.ts`, `skills.ts`, `metrics.ts`, `publications.ts`, `case-studies.ts`, `digital-marketing.ts`, `writing.ts`, `writing-roles.ts`, `thoughts.ts` (thought outlines), `published-thoughts.ts` (repo-authored full essays), `flipCoins.ts` (built-in Flip coin catalog for `/tools/flip` and `/c`), `types.ts`; `src/data/index.ts` re-exports. Tests in `test/` (`profile-data.test.ts`, `thoughts.test.ts`, `wordpress.test.ts`, `tweet-score-route.test.ts`, `together-gateway.test.ts`, `gateway-canary.test.ts`, `gateway-canary-invoker.test.mjs`, `share-card.test.ts`, `flip-link.test.ts`) guard data invariants, routes, and link encoding. Public contact address is `hello@aseemkishore.com` (`src/data/profile.ts`).
- `src/lib/thoughts.ts` merges WP Thoughts posts (`src/lib/wordpress.ts`) with `src/data/published-thoughts.ts` (repo-authored essays); a WP post with the same slug wins. Primary nav (2026-10-06): Work · Experience · Writing · Career · About · Contact; Thoughts and Tools live in the footer.
- `src/lib/wordpress.ts` — the only WP REST client, used by `src/lib/thoughts.ts` for `/thoughts` and `/thoughts/[slug]` (`getPostsByCategorySlug`, `getPostByCategorySlug`). Every fetch goes through `fetchAPI()` with `next: { revalidate: 60 }`, an `AbortController` deadline (`WORDPRESS_FETCH_TIMEOUT_MS`, default 10s, cap 30s) and a fallback arg so builds survive WP outages. WP details: `docs/wordpress-backend.md`.
- `src/lib/together.ts` — Together chat client: `Qwen/Qwen3.7-Max` → `zai-org/GLM-5.2` → optional Vercel AI Gateway final leg (`alibaba/qwen3.7-max`, OIDC, ZDR/no-training/`only: ["alibaba"]`, reasoning off, hash-only telemetry). `src/lib/gateway-canary.ts` — the fixed-input canary handler. `src/lib/share-card.ts`, `src/lib/tweet-score.ts` (prompt, `MAX_DRAFT_CHARS = 500`, parser), `src/lib/flip-link.ts` (`decodeSharedCoin` base64url `?p=` decoder + validation for `/c` and `/api/tools/flip-og`). `src/lib/jsonld.ts`, `src/lib/site.ts` (`siteUrl`, date formatters), `src/lib/analytics.ts` (`trackEvent` → `window.va`; a no-op unless a Vercel Web Analytics script defines `va`).

## Conventions

- Styling: Tailwind v4 CSS-first — `globals.css` has `@import "tailwindcss"` + `@plugin "@tailwindcss/typography"`. There is no `tailwind.config`. Dark-only (`<html class="dark">`).
- Data: portfolio facts are edited in `src/data/`, then `npm test` (profile-data invariants). WP fetchers go in `src/lib/wordpress.ts`, always pass a fallback; decode WP titles/excerpts with `decodeHtmlEntities()`.
- WP HTML is rendered with `dangerouslySetInnerHTML` — accepted because the CMS is our own; add sanitization if untrusted content ever enters.
- **Tools exception:** `"use client"` and `src/app/api/tools/**` are allowed under `src/app/tools/**` only.
- **Flip pages** (`/tools/flip`, `/tools/flip/press`, `/flip-privacy`, `/c`): marketing, press kit, privacy copy, and shared-coin Universal Link / App Clip landing for the Flip iPhone app (AK Internet Consulting). Pricing and data claims must match StoreKit and the app: yearly $0.99 with a 1-month intro, lifetime $4.99, no trial; Pro iCloud Backup syncs settings and custom/AI faces (#13/#14, 2026-09-02). Change marketing/privacy pages together and bump `lastUpdated` in `flip-privacy/page.tsx`. Keep `src/lib/flip-link.ts` in lockstep with `CoinShareLink.swift` in `iphone-app-pipeline`.
- Env (verified 2026-09-03; template in `.env.example`): `WORDPRESS_API_URL` (code falls back to the Rocket.net CDN URL), optional `WORDPRESS_FETCH_TIMEOUT_MS`; tools: `TOGETHER_API_KEY` (503 without it), `OPENAI_API_KEY`, optional `TOGETHER_TIMEOUT_MS` (default 75000), `WRITER_MODEL`, `WRITER_FALLBACK_MODEL`, `IMAGE_QUALITY` (`medium` default | `low`); Gateway continuity: `TWEET_SCORE_GATEWAY_TEXT_QUALIFIED`, `TWEET_SCORE_GATEWAY_FALLBACK_MODE` (`off`|`shadow`|`live`), `TWEET_SCORE_GATEWAY_CANARY_ARMED` (temporary), `CRON_SECRET` (Vercel Cron bearer). `VERCEL_DEPLOYMENT_ID` is Vercel-provided. Modes and rollout order: `README.md` § AI continuity.

## AMBIGUOUS-KEPT

- `.env.local` may still include `NODE_TLS_REJECT_UNAUTHORIZED` from the old `wp.aseemkishore.com` SSL attempt. That hostname is NXDOMAIN (2026-09-12); the flag is leftover, not a pending DNS/SSL step.

## Model Routing (this repo)

Base policy: `~/.claude/CLAUDE.md` § Model routing. Small site; `sonnet` is the default tier.

- **Lead (Fable):** anything in `src/lib/together.ts` / `src/lib/gateway-canary.ts` / the tools API routes (metered providers, Gateway privacy controls), portfolio positioning copy in `src/data/profile.ts`, merge decisions (merge = production deploy), review of delegated diffs.
- **`sonnet` subagents (default):** page/component work, `src/data/` edits from a brief, tests, WP fetcher changes, lint/build verification.
- **`haiku` subagents:** summarizing build/test output, doc updates.

## Docs

- `README.md` — human overview, local setup, deployment, AI continuity (Gateway modes, canary, rollout/rollback).
- `docs/wordpress-backend.md` — public DNS vs Thoughts CMS, WP server/SSH details, mu-plugins, content IDs, endpoint status (WP now backs only `/thoughts`).
- `docs/plans/2026-03-13-frontend-design.md`, `docs/plans/2026-03-13-frontend-implementation.md` — original WP-driven frontend plans; superseded for everything except Thoughts by the 2026-08-15 rebuild (status notes at the top of each).
- `AGENTS.md` — cross-tool ground rules (Codex/Copilot/Cursor). Next 16.1.6 has not auto-written one here; if a later Next appends its "This is NOT the Next.js you know" block, keep it and commit it.
