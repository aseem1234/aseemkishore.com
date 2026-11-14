# AGENTS.md — aseemkishore.com

Read [CLAUDE.md](CLAUDE.md) for commands, architecture, and invariants.

## Non-Negotiables

- **No client fetching outside `src/app/tools/**`:** Portfolio pages read static `src/data/`; Thoughts pages read server-side Blob via `src/lib/thoughts.ts` with `src/data/published-thoughts.ts` fallback and server-rendered pagination.
- **Thoughts & Blob isolation:** Require `THOUGHTS_API_KEY` (`x-api-key`), sanitize HTML before persistence, keep private post (`THOUGHTS_POSTS_READ_WRITE_TOKEN`) and public media (`BLOB_READ_WRITE_TOKEN`) stores server-only with separate Prod/Preview credentials, and preserve ETag conditional writes, deletion tombstones, 60s cache, and sitemap/page revalidation.
- **Gateway & Flip invariants:** Never run `npm run gateway:canary` unprompted, add static AI Gateway keys, or let client fields control Gateway routing/auth. Keep `/tools/flip*`, `/flip-privacy`, and `/c` (`src/lib/flip-link.ts`) synced with StoreKit pricing and `CoinShareLink.swift`.
- **Cloud/Cursor/Codex:** branch -> PR (never push `main` or create a replacement Vercel project); after `npm run build && npm run lint && npm test` pass, merge PR and report deploy status (`aseemkishore.com` auto-deploys `main`).
