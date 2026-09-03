# WordPress backend reference (headless CMS on Rocket.net)

Public endpoints verified 2026-06-10; server-install state last verified 2026-03-15.

> **Scope (2026-09-03):** Since the 2026-08-15 portfolio rebuild, WordPress backs only `/thoughts` and `/thoughts/[slug]`. Projects, case studies, writing samples and profile data are static TypeScript in `src/data/`; the Projects post IDs and `project_*` meta below remain in WP but are no longer read by the site.

## REST endpoints

- **Working REST base:** `https://cbj27jbfj4.onrocket.site/wp-json/wp/v2` (Rocket.net CDN URL) — returned 200 on 2026-06-10. This is the code fallback in `src/lib/wordpress.ts` and the value `WORDPRESS_API_URL` should carry.
- **`wp.aseemkishore.com` is DEAD:** no DNS record exists as of 2026-06-10 (checked 1.1.1.1 and 8.8.8.8). The 2026-03-13 setup created a GoDaddy A record → 131.153.238.181, but it is gone and SSL was never confirmed. To revive: re-create the A record, confirm the Rocket.net domain alias (domain ID 13241), wait for SSL, then update `WORDPRESS_API_URL` and the code fallback.

## Server details

SSH via the `rocket-aseem` alias (key `~/.ssh/codex_rocketnet` — see folder CLAUDE.md).

| Setting | Value |
|---|---|
| SSH/SFTP address | 131.153.238.181 |
| SSH user | `cbj2nas` |
| WP path | `/home/cbj2nas/public_html` |
| CDN URL | `cbj27jbfj4.onrocket.site` |
| Rocket.net site ID | 155651 |
| Rocket.net API | `https://api.rocket.net/v1` (JWT via POST `/login`; login akishore@akinternetconsulting.com) |

## WP install state (as of 2026-03-15 — re-verify before relying on it)

- Theme: twentyseventeen; active plugins: none (headless mode, Elementor/Akismet removed)
- mu-plugins: `cdn-cache-management` (Rocket.net stock), `headless-cors.php` (CORS for the Vercel frontend), `headless-project-meta.php` (registers `project_*` post meta in REST)
- Basic auth was removed from `.htaccess` (it blocked the REST API)

## Content model

- Categories: Projects (ID 3), Thoughts (ID 4), Personal (ID 5)
- Project posts: OTT 59, HDG 60, TBRT 61, STM 62, Xbox Advisor 63, AKIC 64
- Project post meta fields: `project_url`, `project_description`, `project_tech_stack`, `project_role`, `project_status`, `project_founded`
- Screenshots/featured images were never added (open Phase 2 leftover)

## Roadmap / progress

Phase-by-phase progress tracking lives in the repo's Claude memory dir:
`~/.claude/projects/-Users-akishore-Coding-Claude-aseemkishore-com/memory/roadmap.md`
(Phases 1–2 complete 2026-03-13; Phase 3 frontend built but parked on `feat/frontend-design`; Phase 4 polish not started.)
