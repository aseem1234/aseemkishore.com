# aseemkishore.com

Personal site for Aseem Kishore — a content-strategy / editorial-operations portfolio with a small set of web tools. Live at [aseemkishore.com](https://aseemkishore.com); `main` auto-deploys to Vercel.

Agent operating manual: `CLAUDE.md`. Cross-tool ground rules: `AGENTS.md`.

## What is here (2026-09-03)

- **Portfolio** — `/`, `/experience`, `/career`, `/work` (case studies), `/writing` (verified bylines), `/projects` (the publications), `/about`, `/contact`, `/resume` (HTML + PDF). Rebuilt 2026-08-15; all content is static TypeScript in `src/data/` with invariants in `test/profile-data.test.ts`.
- **Thoughts** — `/thoughts`, `/thoughts/[slug]`. The only pages still served from headless WordPress (Rocket.net, WP REST API, ISR 60s, bounded fetches with fallbacks). Original essays are drafted for review before they are published there.
- **Tools** — `/tools`:
  - **Tweet Flops-o-Meter** (`/tools/tweet-score`): client UI + `POST /api/tools/tweet-score` (Together.ai writer) + `POST /api/tools/share-card` (OpenAI `gpt-image-2` background, `sharp` overlay). Per-IP rate limits, 20/h and 10/h.
  - **Flip** (`/tools/flip`, privacy policy at `/flip-privacy`): pages for the Flip iPhone coin-flip app from AK Internet Consulting. Pricing copy mirrors StoreKit (yearly $0.99 with a 1-month intro, lifetime $4.99).

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, hosted on Vercel. No database, no user accounts.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in WORDPRESS_API_URL (Rocket.net CDN URL) and, for the tools, TOGETHER_API_KEY / OPENAI_API_KEY
npm run dev                  # http://localhost:3000
```

Checks: `npm run build` (also the typecheck), `npm run lint`, `npm test` (hermetic, no network). WordPress backend details: `docs/wordpress-backend.md`. Do not point `WORDPRESS_API_URL` at `wp.aseemkishore.com` — that DNS record no longer exists.

## Deployment

Vercel auto-deploys from `main` on every push, so all work goes through a branch and a PR. `vercel.json` schedules one cron, `GET /api/gateway-canary` at 11:17 UTC daily; it is a no-op unless armed (below).

## AI continuity

Tweet scoring normally calls Together directly: `Qwen/Qwen3.7-Max`, then
`zai-org/GLM-5.2`. The optional Vercel AI Gateway leg is a final fallback after
both direct attempts fail with an eligible provider, quota, rate-limit, 5xx, or
transport failure. It maps the current writer exactly to
`alibaba/qwen3.7-max`; ordinary validation failures do not fail over.

The Gateway path is inert unless both controls are exact:

- `TWEET_SCORE_GATEWAY_TEXT_QUALIFIED=true`
- `TWEET_SCORE_GATEWAY_FALLBACK_MODE=shadow|live`

An absent, `off`, or invalid mode preserves the existing Together-only request
sequence. Gateway authentication is retrieved at request time with Vercel OIDC;
do not add an AI Gateway static key. Every Gateway request requires zero data
retention and no training, disables model reasoning, permits only the Alibaba
provider, and emits model/usage/classification plus an output hash—never prompt,
completion, token, or Together error text.

### Synthetic qualification canary

`/api/gateway-canary` is a fixed-input Vercel Cron route. It accepts no request
body or query, sends no system message or tools, produces at most 16 tokens,
and has no access to tweet drafts, WordPress, image generation, or persistence.
The daily scheduled request is an unmetered no-op unless qualification and the
temporary `TWEET_SCORE_GATEWAY_CANARY_ARMED=true` flag are both present. Vercel
must also have `CRON_SECRET` configured so Cron supplies the exact bearer; the
handler additionally requires Vercel's exact `vercel-cron/1.0` user agent.

Attended rollout order:

1. Keep `TWEET_SCORE_GATEWAY_FALLBACK_MODE=off` or absent.
2. Confirm AI Gateway is enabled for this existing Vercel project and OIDC is
   available. Configure `CRON_SECRET` if the project does not already have it.
3. Set `TWEET_SCORE_GATEWAY_TEXT_QUALIFIED=true`, then temporarily set
   `TWEET_SCORE_GATEWAY_CANARY_ARMED=true`.
4. Run exactly one `npm run gateway:canary` (it invokes `vercel crons run
   /api/gateway-canary`) and verify the bounded, hash-only telemetry. Remove the
   arm immediately, even if the canary fails.
5. Separately approve `shadow`, observe a forced eligible failure without using
   its discarded output, and only then separately approve `live`.

Rollback begins by setting `TWEET_SCORE_GATEWAY_FALLBACK_MODE=off`. Remove the
temporary arm next. Qualification and `CRON_SECRET` may then be removed after
the off deployment is confirmed. Direct Together behavior remains available
throughout.
