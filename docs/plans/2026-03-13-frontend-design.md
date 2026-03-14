# Frontend Design — aseemkishore.com

**Date:** 2026-03-13
**Status:** Approved

## Summary

Personal showcase site for Aseem Kishore. Bold & expressive design, personal-brand-first, dark-first with blue accents. Single-page scroll homepage with dedicated subpages for deeper content.

## Design Decisions

- **Vibe:** Bold & expressive — strong typography, accent colors, visual energy
- **Primary purpose:** Personal brand first, projects as supporting evidence
- **Layout:** Single-page scroll homepage (Hero → Projects → Thoughts → About teaser)
- **Color:** Blue tones anchoring the design
- **About page:** Professional + personal (family, hobbies, interests)
- **Thoughts format:** Card grid with excerpts
- **Approach:** Single-page scroll with sections (Approach A)

## Visual Identity

- **Font:** Geist Sans (bold usage, 4xl-6xl headings, tight tracking). Geist Mono for accents (dates, tech stacks, labels).
- **Primary blue:** `#1e40af` (blue-800) for accents, links, CTAs
- **Background:** `#0a0a0f` (near-black) — dark-first design
- **Text:** white/zinc-100 headings, zinc-400 body
- **Accent highlight:** `#3b82f6` (blue-500) for hover states
- **Cards:** zinc-900 backgrounds, blue-tinted borders on hover
- **Light mode:** Deferred to Phase 4

## Homepage Layout

### Hero (full viewport)
- Name in 5xl-6xl bold type
- Tagline: "Founder, writer, and tech enthusiast building digital media brands"
- Subtle animated gradient/glow behind the name
- Two CTAs: "See my work" (scroll) and "About me" (link)

### Projects Section
- 3-column grid (desktop), 2-col (tablet), 1-col (mobile)
- Card: name, short description, tech stack tags, status badge, link arrow
- Hover: blue border glow, slight lift
- "View all projects" link to `/projects`

### Thoughts Section
- 2-column card grid (desktop), 1-col (mobile)
- Card: title, date, excerpt, "Read more" link
- Empty state: "Thoughts coming soon"
- "View all thoughts" link to `/thoughts`

### About Teaser
- 2-3 line bio
- "Learn more about me" link to `/about`

### Footer
- Name, copyright, links to AKIC and social profiles

## Subpages

### `/projects` — Full Project Listing
- Same card grid as homepage, all 6 projects
- Each card links to `/projects/[slug]`

### `/projects/[slug]` — Individual Project
- Hero: project name, status badge, role
- Full WordPress content
- Metadata: URL (linked), tech stack tags, year founded
- "Visit site" CTA button
- Back link to `/projects`

### `/thoughts` — Blog Listing
- Card grid, paginated or "load more"

### `/thoughts/[slug]` — Individual Post
- Clean reading layout, max-width prose
- Title, date, content
- Back link to `/thoughts`

### `/about` — Full Bio
- Two sections: Professional and Personal
- Hard-coded initially (no WordPress dependency)

## Navigation

- Sticky top nav: logo/name (left), links (right): Projects, Thoughts, About
- Mobile: hamburger or simple link row
- Current page: blue underline indicator

## Technical Details

### WordPress API Client Updates
- Add `meta` fields to `WPPost` interface (project_url, project_description, project_tech_stack, project_role, project_status, project_founded)
- Add helper to fetch posts by category slug
- Update fallback URL to `wp.aseemkishore.com`

### ISR Strategy
- `revalidate: 60` on all data fetches
- `generateStaticParams` for `/projects/[slug]` and `/thoughts/[slug]`

### About Page
- Hard-coded content, wire to WordPress later

### Empty States
- Thoughts section: "Thoughts coming soon" when no posts

### Dependencies
- No new packages. Built with Next.js, React, and Tailwind only.

## Pages & Routes

| Route | Description | Data Source |
|-------|-------------|-------------|
| `/` | Homepage scroll | WP: Projects category, Thoughts category |
| `/projects` | Project grid | WP: Projects category |
| `/projects/[slug]` | Project detail | WP: single post by slug |
| `/thoughts` | Blog card grid | WP: Thoughts category |
| `/thoughts/[slug]` | Blog post | WP: single post by slug |
| `/about` | Full bio | Hard-coded |
