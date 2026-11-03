# aseemkishore.com

Personal site for Aseem Kishore: consulting in content/search strategy, editorial operations and AI automation, plus work, writing, career and apps. Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4 on the existing Vercel project `aseemkishore.com`. Portfolio content is static TypeScript in `src/data/`. Thoughts posts and media use Vercel Blob through a protected publishing API. Public DNS uses Cloudflare nameservers and points to Vercel. No user accounts. `main` auto-deploys; tools spend Together/OpenAI credit.

## Do NOT

- Push directly to `main`. Use a fresh worktree, branch and PR, then follow global checks, review and merge policy.
- Run `npm run gateway:canary` unprompted. It invokes `vercel crons run /api/gateway-canary` for an attended one-shot procedure (`README.md`, AI continuity). Gateway uses runtime Vercel OIDC, never a static key.
- Add client-side data fetching or state management outside `src/app/tools/**`. Thoughts pagination uses server-rendered links.
- Let client fields select Gateway routing, models or authentication in `/api/tools/tweet-score`. The server sets `gatewayTrustedServerContext`.
- Commit credentials or `.env*` values. Only `.env.example` is tracked. Keep all publishing and storage credentials server-only.
- Reuse production Blob credentials or publishing keys for preview tests, or create a replacement Vercel project.

## Commands

```bash
npm run dev             # Next development server
npm run build           # production build and typecheck
npm run lint            # ESLint v9 flat config
npm test                # hermetic tsx/Node test runner, no live network
npm run thoughts:media -- <file>  # publishing-key upload, up to 50 MiB
npm run gateway:canary  # ATTENDED ONLY
```

`scripts/generate-resume-pdf.mjs` is stale. Regenerate `public/resume/Aseem-Kishore-Resume.pdf` by printing `scripts/resume.html`.

## Architecture

- Public routes: `/`, `/consulting`, `/consulting/[slug]` (three offers), `/experience`, `/career`, `/work`, `/work/[slug]`, `/writing`, `/about`, `/contact`, `/resume`, `/projects`, `/projects/[slug]`, `/thoughts`, `/thoughts/[slug]`, `/tools`, `/tools/tweet-score`, `/tools/flip`, `/tools/flip/press`, `/flip-privacy` and `/c`. New public routes go in `src/app/sitemap.ts` and top-level routes in `src/components/Nav.tsx` when appropriate.
- Thoughts API: `GET /api/thoughts` lists posts with pagination, `POST /api/thoughts` creates/replaces, `POST /api/thoughts/media` uploads and `DELETE /api/thoughts/[slug]` unpublishes. All require `x-api-key`. Schema, curl examples and upload constraints: `docs/THOUGHTS-API.md`.
- `src/lib/thoughts-model.ts` owns validation, sanitizing and pagination. `thoughts-service.ts` owns publishing policy and static fallback merging. `thoughts-store.ts` adapts private Vercel Blob for posts, uses uncached origin reads and conditional ETag writes, reserves duplicate slugs and retains deletion tombstones. `thoughts-api.ts` and `thoughts-media.ts` implement authenticated request handling. `thoughts-revalidate.ts` invalidates the Thoughts data tag, index, post and sitemap after a write.
- `src/lib/thoughts.ts` caches public reads for 60 seconds and deduplicates within a render. The verification API reads fresh storage. `src/data/published-thoughts.ts` preserves the original essay and URL; a stored post or tombstone takes precedence. Public listing uses 12 posts per page; the sitemap includes every published post. Article pages provide OG/Twitter metadata, Article JSON-LD and a markets disclaimer.
- Media: multipart requests capped at 4 MiB; larger uploads use the same route to issue a short-lived Blob client token restricted to a media path/type and 50 MiB. `scripts/upload-thoughts-media.mjs` selects the flow. Uploaded media is public and retained when a post is unpublished.
- Tools APIs: `POST /api/tools/tweet-score` (Together writer, 20 requests/hour/IP), `POST /api/tools/share-card` (OpenAI image background and Sharp overlay, 10/hour/IP), `GET /api/tools/flip-og` (1200×630 `next/og` shared-coin card). In-memory rate limits in `src/lib/rate-limit.ts` are cost controls.
- `GET /api/gateway-canary` is Vercel Cron `17 11 * * *` UTC, inert unless armed. `src/lib/together.ts` routes `Qwen/Qwen3.7-Max` → `zai-org/GLM-5.2` → optional Vercel Gateway `alibaba/qwen3.7-max` with OIDC, zero retention, no training, Alibaba-only routing and hash-only telemetry. `src/lib/gateway-canary.ts` owns the fixed-input canary. Preserve the default-off rollout (`README.md`).
- `src/data/*.ts` owns portfolio facts, essays and the Flip coin catalog. `src/data/index.ts` re-exports data. `src/lib/site.ts` owns URLs and date helpers; `jsonld.ts` owns structured data with script-safe serialization; `analytics.ts` provides `trackEvent` via optional `window.va`. Public contact: `hello@aseemkishore.com`.
- `next.config.ts` redirects `/projects/positiontracker` to `/projects/position-tracker`. `public/.well-known/apple-app-site-association` maps `/c?p=*` and `/c/*` to `6SV2AL44X4.com.akinternetconsulting.flip` and its `.Clip` App Clip. Keep `src/lib/flip-link.ts` consistent with `CoinShareLink.swift` in `iphone-app-pipeline`.

## Conventions

- Dark-only HTML. Tailwind v4 CSS-first styling in `globals.css`, with the typography plugin. `.thought-prose` styles sanitized HTML, captioned images, tables and video. Author HTML cannot supply styles or event handlers.
- Portfolio facts belong in `src/data/`; run the profile invariants after changes. Do not rewrite career claims as part of site infrastructure work.
- Flip marketing, press, privacy and shared-link pages must agree with StoreKit: yearly $0.99 with a one-month intro, lifetime $4.99, no trial. Pro iCloud Backup syncs settings and custom/AI faces. Update marketing/privacy together and bump `lastUpdated` in the privacy page when those claims change.
- Primary navigation: Consulting, Work, Apps & Tools, Writing, About and Contact. Experience, Career, Thoughts and Résumé remain secondary.

## Environment

Template: `.env.example`. Thoughts requires `THOUGHTS_API_KEY`, public-media `BLOB_READ_WRITE_TOKEN` and private-post `THOUGHTS_POSTS_READ_WRITE_TOKEN`, scoped separately for Production and Preview. The upload helper reads `THOUGHTS_API_KEY` and optional `THOUGHTS_SITE_URL` (default `https://aseemkishore.com`).

Tools use `TOGETHER_API_KEY` (503 without it), `OPENAI_API_KEY`, optional `TOGETHER_TIMEOUT_MS` (75000 default), `WRITER_MODEL`, `WRITER_FALLBACK_MODEL` and `IMAGE_QUALITY` (`medium` default or `low`). Gateway uses `TWEET_SCORE_GATEWAY_TEXT_QUALIFIED`, `TWEET_SCORE_GATEWAY_FALLBACK_MODE` (`off`, `shadow`, `live`), temporary `TWEET_SCORE_GATEWAY_CANARY_ARMED` and `CRON_SECRET`. `VERCEL_DEPLOYMENT_ID` is platform-provided. Preserve exact qualification, privacy and rollout gates.

## Docs

- `README.md`: setup, hosting and AI continuity.
- `AGENTS.md`: compact cross-tool guardrails.
- `docs/THOUGHTS-API.md`: publishing, storage, media, schema and verification.
- `docs/consulting-and-work.md`: consulting routes, migrated narratives and compatibility checks.
