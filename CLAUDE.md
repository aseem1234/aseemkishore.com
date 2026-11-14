# aseemkishore.com

Personal site for Aseem Kishore (consulting in content/search strategy, editorial operations, and AI automation, plus work, writing, career, and apps). Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4 (CSS-first in `globals.css`, no Tailwind config) on Vercel project `aseemkishore.com` (`main` auto-deploys; Cloudflare DNS; no user accounts).

Risk class: LIGHT (Lead-only paths: `/api/gateway-canary`, AI Gateway OIDC/routing, and Thoughts auth/Blob storage invariants).

## Do NOT

- Run `npm run gateway:canary` unprompted (invokes `vercel crons run /api/gateway-canary` for an attended one-shot procedure; see `README.md`). Gateway uses runtime Vercel OIDC, never a static key.
- Add client-side data fetching or state management outside `src/app/tools/**`. Thoughts pagination uses server-rendered links.
- Let client fields select Gateway routing, models, or authentication in `/api/tools/tweet-score` (server sets `gatewayTrustedServerContext`).
- Expose publishing/storage credentials (`THOUGHTS_API_KEY`, `BLOB_READ_WRITE_TOKEN`, `THOUGHTS_POSTS_READ_WRITE_TOKEN`) to the client, reuse production Blob/publishing keys for preview tests, or create a replacement Vercel project.
- Rewrite career claims in `src/data/` during infrastructure work, or run stale `scripts/generate-resume-pdf.mjs` (regenerate `public/resume/Aseem-Kishore-Resume.pdf` by printing `scripts/resume.html`).

## Commands

```bash
npm run dev                       # Next dev server
npm run build                     # production build + typecheck
npm run lint                      # ESLint v9 flat config
npm test                          # hermetic tsx/Node tests (no live network)
npm run thoughts:media -- <file>  # publishing-key media upload (up to 50 MiB)
npm run gateway:canary            # ATTENDED ONLY
```

## Architecture & Invariants

- **Public routes:** `/`, `/consulting`, `/consulting/[slug]` (3 offers), `/experience`, `/career`, `/work`, `/work/[slug]`, `/writing`, `/about`, `/contact`, `/resume`, `/projects`, `/projects/[slug]`, `/thoughts`, `/thoughts/[slug]`, `/tools`, `/tools/tweet-score`, `/tools/flip`, `/tools/flip/press`, `/flip-privacy`, `/c`. Register new public routes in `src/app/sitemap.ts` (including all published Thoughts across pagination pages) and top-level routes in `src/components/Nav.tsx` (Primary: Consulting, Work, Apps & Tools, Writing, Thoughts, About, Contact; Secondary: Experience, Career, Résumé).
- **Thoughts API (`x-api-key: THOUGHTS_API_KEY`):** `GET /api/thoughts` (paginated list), `POST /api/thoughts` (create/replace), `POST /api/thoughts/media` (upload), `DELETE /api/thoughts/[slug]` (unpublish). `src/lib/thoughts-model.ts` validates/sanitizes HTML (`.thought-prose`; no author styles or event handlers); `thoughts-service.ts` merges static fallback (`src/data/published-thoughts.ts`); `thoughts-store.ts` adapts private Vercel Blob with uncached origin reads, conditional ETag writes, duplicate-slug reservation, and deletion tombstones; `thoughts-revalidate.ts` invalidates the data tag, index, post, and sitemap. `src/lib/thoughts.ts` caches public reads for 60s (12 posts/page; verification API reads uncached); articles emit OG/Twitter metadata, Article JSON-LD, and a markets disclaimer.
- **Media:** Multipart uploads capped at 4 MiB; larger files up to 50 MiB obtain a short-lived path/type-restricted Blob client token via the same route (`scripts/upload-thoughts-media.mjs`). Uploaded media is public and retained on unpublish.
- **Tools & Gateway:** `POST /api/tools/tweet-score` (Together writer, 20 req/hr/IP), `POST /api/tools/share-card` (OpenAI image + Sharp overlay, 10/hr/IP), `GET /api/tools/flip-og` (1200×630 `next/og` card); in-memory rate limits in `src/lib/rate-limit.ts`. `GET /api/gateway-canary` (`17 11 * * *` UTC cron) is inert unless armed. `src/lib/together.ts` routes `Qwen/Qwen3.7-Max` → `zai-org/GLM-5.2` → optional Vercel Gateway `alibaba/qwen3.7-max` (OIDC, zero retention, no training, Alibaba-only routing, hash-only telemetry; `src/lib/gateway-canary.ts`).
- **Data, Flip & Redirects:** `src/data/*.ts` (`src/data/index.ts`) holds portfolio facts, essays, and the Flip coin catalog; `src/lib/site.ts` (URLs/dates, `hello@aseemkishore.com`), `jsonld.ts` (script-safe JSON-LD), `analytics.ts` (`window.va`). `next.config.ts` redirects `/projects/positiontracker` → `/projects/position-tracker`. `public/.well-known/apple-app-site-association` maps `/c?p=*` and `/c/*` to `6SV2AL44X4.com.akinternetconsulting.flip` and `.Clip`. Keep `src/lib/flip-link.ts` synced with `CoinShareLink.swift` (`iphone-app-pipeline`), and keep `/tools/flip*`, `/flip-privacy` (bump `lastUpdated` on changes), and `/c` aligned with StoreKit ($0.99/yr with 1-month intro, $4.99 lifetime, no trial; Pro iCloud Backup syncs settings and custom/AI faces).

## Environment & Docs

- **Env (`.env.example`):** `THOUGHTS_API_KEY`, `BLOB_READ_WRITE_TOKEN` (public media), `THOUGHTS_POSTS_READ_WRITE_TOKEN` (private posts; separate Prod/Preview tokens), optional `THOUGHTS_SITE_URL`; `TOGETHER_API_KEY` (503 if unset), `OPENAI_API_KEY`, `TOGETHER_TIMEOUT_MS` (75000), `WRITER_MODEL`, `WRITER_FALLBACK_MODEL`, `IMAGE_QUALITY` (`medium`|`low`); `TWEET_SCORE_GATEWAY_TEXT_QUALIFIED`, `TWEET_SCORE_GATEWAY_FALLBACK_MODE` (`off`|`shadow`|`live`), `TWEET_SCORE_GATEWAY_CANARY_ARMED`, `CRON_SECRET`, `VERCEL_DEPLOYMENT_ID`.
- **Docs:** [`README.md`](README.md), [`docs/THOUGHTS-API.md`](docs/THOUGHTS-API.md), [`docs/consulting-and-work.md`](docs/consulting-and-work.md).
