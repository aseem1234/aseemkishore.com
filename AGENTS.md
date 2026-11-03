# AGENTS.md — aseemkishore.com

Ground rules for every coding agent. `CLAUDE.md` is the operating manual.

## Ground rules

- `main` auto-deploys to production on Vercel. Use a fresh worktree, branch and PR. Follow the global review and merge policy.
- Portfolio pages render from static data in `src/data/`. Thoughts pages use server-side Blob reads through `src/lib/thoughts.ts`, with `src/data/published-thoughts.ts` as a fallback.
- No client-side data fetching or state management outside `src/app/tools/**`. Thoughts pagination uses server-rendered links.
- Thoughts writes require `THOUGHTS_API_KEY` in `x-api-key`. Validate input and sanitize HTML before persistence. Keep API keys and `BLOB_READ_WRITE_TOKEN` server-only.
- Use separate production and preview Blob stores and keys. Preserve conditional writes, deleted-post tombstones, the 60-second cache and write invalidation for pages and sitemap.
- Never log or commit credentials or `.env*` values. Only `.env.example` is tracked.
- Do not run `npm run gateway:canary` or add a static AI Gateway key. The Gateway leg is attended and default-off (`README.md`, AI continuity).

## Working in this repo

- Next.js 16 App Router, React 19, TypeScript and Tailwind v4 (CSS-first, no Tailwind config file).
- Validate with `npm run build` (includes typechecking), `npm run lint` and `npm test` (hermetic Node tests).
- New public routes belong in `src/app/sitemap.ts`. Include all published Thoughts, including older pagination pages' posts.
- `/tools/flip`, `/tools/flip/press`, `/flip-privacy` and `/c` must agree with StoreKit pricing and `CoinShareLink.swift` via `src/lib/flip-link.ts`.
- The existing Vercel project is `aseemkishore.com`. Never create a replacement project.

See `docs/THOUGHTS-API.md` for publishing, upload limits, credentials and verification.
