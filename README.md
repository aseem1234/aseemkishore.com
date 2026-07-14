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
