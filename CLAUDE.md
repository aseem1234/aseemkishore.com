# CLAUDE.md

Project-level instructions for AI assistants working in this repository.

## Project Overview

Personal showcase website for Aseem Kishore — built with **Next.js** (App Router) on **Vercel**, using **headless WordPress** as the CMS backend.

## Architecture

```
┌─────────────────────┐         ┌──────────────────────────┐
│   Vercel (Frontend)  │  REST   │  Rocket.net (WordPress)  │
│   Next.js / React    │◄───────►│  Headless CMS Backend    │
│   aseemkishore.com   │  API    │  wp.aseemkishore.com     │
└─────────────────────┘         └──────────────────────────┘
```

- **Frontend:** Next.js with TypeScript, Tailwind CSS, App Router (`/src/app`)
- **CMS:** WordPress on Rocket.net, accessed via WP REST API
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Domain:** aseemkishore.com points to Vercel; WordPress moves to `wp.aseemkishore.com`

## Server Details (WordPress CMS Backend)

| Setting | Value |
|---------|-------|
| Host | Rocket.net |
| SSH Alias | `rocket-aseem` |
| SSH/SFTP Address | 131.153.238.181 |
| SSH Username | `cbj2nas` |
| WP Path | `/home/cbj2nas/public_html` |
| CDN URL | `cbj27jbfj4.onrocket.site` |
| SSH Key | `~/.ssh/codex_rocketnet` |
| Current WP URL | `https://www.aseemkishore.com` |

## Content Structure

The site showcases:
- **Projects/Portfolio** — blogs (OTT, TBRT, HDG, STM, Xbox Advisor), AKIC corporate site, other ventures
- **Thoughts/Posts** — quick updates, musings, articles
- **Personal** — family life, stock & options interests, hobbies

These map to WordPress categories. Content is authored in WordPress and fetched by Next.js at build time (ISR) or on request.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** WordPress REST API (headless)
- **Hosting:** Vercel
- **Package Manager:** npm

## Development

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Git Workflow

- All changes via PR to `main`
- Vercel auto-deploys `main` to production
- One logical change per commit

## Key Rules

1. All changes via PR to `main` — no direct pushes
2. Run `npm run lint` and `npm run build` before committing
3. Use TypeScript strict mode
4. Follow existing code patterns and conventions
