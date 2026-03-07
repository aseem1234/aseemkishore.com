# aseemkishore.com

Personal showcase website for Aseem Kishore.

## Architecture

- **Frontend:** Next.js (App Router) with TypeScript and Tailwind CSS, hosted on Vercel
- **CMS Backend:** Headless WordPress on Rocket.net, content served via WP REST API
- **Domain:** `aseemkishore.com` (Vercel) / `wp.aseemkishore.com` (WordPress admin)

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
