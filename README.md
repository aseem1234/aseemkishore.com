# aseemkishore.com

Personal showcase website for Aseem Kishore.

## Architecture

- **Frontend:** Next.js (App Router) with TypeScript and Tailwind CSS, hosted on Vercel
- **CMS Backend:** Headless WordPress on Rocket.net, content served via WP REST API
- **Tools:** Interactive routes under `/tools` (client UI + `/api/tools/*`). Scoring uses Together.ai; share cards use OpenAI gpt-image-2 (`IMAGE_QUALITY=medium` by default).
- **Domain:** `aseemkishore.com` (Vercel); WP admin via Rocket.net CDN URL (see `.env.example`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Content is managed in WordPress and fetched via the REST API. Categories:

- **Projects** — portfolio of sites and ventures
- **Thoughts** — posts, updates, musings
- **Personal** — family, interests, hobbies

## Deployment

Vercel auto-deploys from `main` on every push.

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
4. Run exactly one `npm run gateway:canary` and verify the bounded, hash-only
   telemetry. Remove the arm immediately, even if the canary fails.
5. Separately approve `shadow`, observe a forced eligible failure without using
   its discarded output, and only then separately approve `live`.

Rollback begins by setting `TWEET_SCORE_GATEWAY_FALLBACK_MODE=off`. Remove the
temporary arm next. Qualification and `CRON_SECRET` may then be removed after
the off deployment is confirmed. Direct Together behavior remains available
throughout.
