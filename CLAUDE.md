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

## Current State

- Vercel deployment is live at: `https://aseemkishore.com` (custom domain configured)
- GitHub repo connected to Vercel — pushes to `main` auto-deploy
- Homepage has a basic placeholder with site links
- WordPress API client exists at `src/lib/wordpress.ts` but isn't wired up to pages yet
- WordPress is running at `https://wp.aseemkishore.com` (headless, no Elementor)
- CORS mu-plugin installed at `wp-content/mu-plugins/headless-cors.php`
- `WORDPRESS_API_URL` env var set in Vercel production

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
| WP URL | `https://wp.aseemkishore.com` |
| WP API URL | `https://wp.aseemkishore.com/wp-json/wp/v2` |
| Current WP Theme | twentyseventeen |
| Active Plugins | None (headless mode) |
| MU-Plugins | cdn-cache-management (Rocket.net), headless-cors.php |

## Content Structure

The site showcases:
- **Projects/Portfolio** — blogs (OTT, TBRT, HDG, STM, Xbox Advisor), AKIC corporate site, other ventures
- **Thoughts/Posts** — quick updates, musings, articles
- **Personal** — family life, stock & options interests, hobbies

These map to WordPress categories. Content is authored in WordPress and fetched by Next.js at build time (ISR) or on request.

## Roadmap / Next Steps

### Phase 1: Domain and WordPress Setup ✅
1. ~~**Point aseemkishore.com to Vercel**~~ — done (A record → 76.76.21.21)
2. ~~**Move WordPress to subdomain**~~ — done (wp.aseemkishore.com, SSL provisioning by Rocket.net)
3. ~~**Clean up WordPress plugins**~~ — done (removed Elementor, Elementor Pro, Akismet)
4. ~~**Configure CORS**~~ — done (headless-cors.php mu-plugin)
5. ~~**Update `WORDPRESS_API_URL`**~~ — done (set in Vercel production env)

### Phase 2: WordPress Content Setup
1. **Create categories** in WordPress: Projects, Thoughts, Personal
2. **Add initial content** — portfolio entries for each site (OTT, HDG, TBRT, STM, Xbox Advisor, AKIC)
3. **Set up custom fields** (ACF or native) for project metadata (URL, description, tech stack, screenshot)

### Phase 3: Frontend Design and Build
1. **Design the site** — modern, clean personal showcase (not a blog template)
2. **Build page routes:**
   - `/` — homepage with hero, featured projects, recent thoughts
   - `/projects` — portfolio grid
   - `/projects/[slug]` — individual project page
   - `/thoughts` — blog/post listing
   - `/thoughts/[slug]` — individual post
   - `/about` — personal bio, interests
3. **Wire up WordPress API** — connect the existing `src/lib/wordpress.ts` client to pages
4. **Add ISR (Incremental Static Regeneration)** — so content updates appear without full redeploys

### Phase 4: Polish
1. **SEO** — meta tags, Open Graph, structured data
2. **Dark mode** — respect system preference with toggle
3. **Performance** — image optimization, font loading
4. **Analytics** — lightweight analytics (Vercel Analytics or similar)

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
