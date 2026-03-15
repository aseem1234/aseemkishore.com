# Frontend Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the full frontend for aseemkishore.com — a bold, dark-first personal showcase with blue accents, single-page scroll homepage, and dedicated subpages.

**Architecture:** Next.js App Router with server components fetching from headless WordPress REST API at `wp.aseemkishore.com`. All pages use ISR (revalidate: 60). Shared layout with sticky nav. No client-side state management needed — all data is server-fetched.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Geist fonts (already configured)

**Design doc:** `docs/plans/2026-03-13-frontend-design.md`

**Security note:** WordPress content is rendered with `dangerouslySetInnerHTML` since it comes from our own trusted CMS backend (not user-submitted content). This is standard practice for headless WordPress. If untrusted content is ever introduced, add DOMPurify sanitization.

---

### Task 1: Update WordPress API client

**Files:**
- Modify: `src/lib/wordpress.ts`

**Step 1: Update the WordPress client**

Update the WPPost interface to include meta fields, add category-slug-based fetching, and fix the fallback URL:

```typescript
const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://wp.aseemkishore.com/wp-json/wp/v2';

export interface WPPostMeta {
  project_url: string;
  project_description: string;
  project_tech_stack: string;
  project_role: string;
  project_status: string;
  project_founded: string;
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  meta: WPPostMeta;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

async function fetchAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getPosts(perPage = 10, page = 1): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>('/posts', {
    per_page: String(perPage),
    page: String(page),
    _embed: 'true',
  });
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>('/posts', {
    slug,
    _embed: 'true',
  });
  return posts[0] || null;
}

export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>('/categories', {
    per_page: '100',
  });
}

export async function getPostsByCategory(categoryId: number, perPage = 10): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>('/posts', {
    categories: String(categoryId),
    per_page: String(perPage),
    _embed: 'true',
  });
}

export async function getPostsByCategorySlug(slug: string, perPage = 10): Promise<WPPost[]> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return [];
  return getPostsByCategory(category.id, perPage);
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (no pages use the client yet, but types should compile)

**Step 3: Commit**

```bash
git add src/lib/wordpress.ts
git commit -m "feat: update WordPress client with meta fields and category-slug helper"
```

---

### Task 2: Global styles and layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/components/Nav.tsx`
- Create: `src/components/Footer.tsx`

**Step 1: Update global styles**

Replace `src/app/globals.css` with dark-first theme:

```css
@import "tailwindcss";

:root {
  --background: #0a0a0f;
  --foreground: #f4f4f5;
  --blue-accent: #1e40af;
  --blue-highlight: #3b82f6;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}
```

**Step 2: Create Nav component**

Create `src/components/Nav.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-wide text-zinc-100 hover:text-blue-400 transition-colors"
        >
          AK
        </Link>
        <div className="flex gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith(href)
                  ? "text-blue-400 underline underline-offset-8 decoration-2"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

**Step 3: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-[#0a0a0f]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Aseem Kishore
        </p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <a
            href="https://akinternetconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            AKIC
          </a>
        </div>
      </div>
    </footer>
  );
}
```

**Step 4: Update layout.tsx**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aseem Kishore",
    template: "%s — Aseem Kishore",
  },
  description:
    "Founder, writer, and tech enthusiast building digital media brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/Nav.tsx src/components/Footer.tsx
git commit -m "feat: add dark theme, sticky nav, and footer"
```

---

### Task 3: Homepage — Hero section

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Build the hero section**

Replace `src/app/page.tsx` with the hero and placeholders for other sections:

```tsx
import Link from "next/link";

function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
      {/* Gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
          Aseem Kishore
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Founder, writer, and tech enthusiast building digital media brands.
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            See my work
          </a>
          <Link
            href="/about"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            About me
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  return (
    <>
      <Hero />
      {/* Projects and Thoughts sections added in next tasks */}
    </>
  );
}
```

**Step 2: Run dev server and visually verify**

Run: `npm run dev`
Check: `http://localhost:3000` — should show dark background, name, tagline, gradient glow, two buttons.

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage hero section with gradient glow"
```

---

### Task 4: Project card component

**Files:**
- Create: `src/components/ProjectCard.tsx`

**Step 1: Build the ProjectCard component**

This is shared between the homepage and `/projects` page.

Create `src/components/ProjectCard.tsx`:

```tsx
import Link from "next/link";
import type { WPPost } from "@/lib/wordpress";

export default function ProjectCard({ post }: { post: WPPost }) {
  const { meta } = post;
  const title = post.title.rendered;
  const techStack = meta.project_tech_stack
    ? meta.project_tech_stack.split(",").map((t) => t.trim())
    : [];

  return (
    <Link
      href={`/projects/${post.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {meta.project_status === "active" && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              Active
            </span>
          )}
          <span className="text-zinc-600 group-hover:text-blue-400 transition-colors">&rarr;</span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-zinc-400">
        {meta.project_description}
      </p>

      <div className="mt-auto flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-zinc-800 px-2 py-1 font-mono text-xs text-zinc-500"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard component"
```

---

### Task 5: Homepage — Projects section

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add Projects section to homepage**

Update `page.tsx` to import and use ProjectCard with WordPress data:

```tsx
import Link from "next/link";
import { getPostsByCategorySlug } from "@/lib/wordpress";
import ProjectCard from "@/components/ProjectCard";

function Hero() {
  // ... (unchanged from Task 3)
}

async function ProjectsSection() {
  const projects = await getPostsByCategorySlug("projects", 6);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Projects
        </h2>
        <p className="mt-3 text-zinc-400">
          Sites and ventures I&apos;ve built and grown.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((post) => (
          <ProjectCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/projects"
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          View all projects &rarr;
        </Link>
      </div>
    </section>
  );
}

export default async function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
    </>
  );
}
```

**Step 2: Run dev server and verify**

Run: `npm run dev`
Check: Projects section appears below hero with 6 cards in a 3-col grid.

**Note:** If SSL on `wp.aseemkishore.com` is still not working, temporarily set `NODE_TLS_REJECT_UNAUTHORIZED=0` in `.env.local` for development. In production on Vercel, SSL should be resolved by then.

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage projects section with WordPress data"
```

---

### Task 6: Homepage — Thoughts section and About teaser

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/ThoughtCard.tsx`

**Step 1: Create ThoughtCard component**

Create `src/components/ThoughtCard.tsx`:

```tsx
import Link from "next/link";
import type { WPPost } from "@/lib/wordpress";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ThoughtCard({ post }: { post: WPPost }) {
  const title = post.title.rendered;
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 150);

  return (
    <Link
      href={`/thoughts/${post.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5"
    >
      <time className="font-mono text-xs text-zinc-600">
        {formatDate(post.date)}
      </time>
      <h3 className="text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      {excerpt && (
        <p className="text-sm leading-relaxed text-zinc-400">
          {excerpt}
          {excerpt.length >= 150 ? "..." : ""}
        </p>
      )}
      <span className="mt-auto text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
        Read more &rarr;
      </span>
    </Link>
  );
}
```

**Step 2: Add Thoughts and About teaser sections to homepage**

Update `src/app/page.tsx` — add ThoughtsSection, AboutTeaser, and update the default export:

```tsx
import ThoughtCard from "@/components/ThoughtCard";

// ... Hero and ProjectsSection unchanged ...

async function ThoughtsSection() {
  const thoughts = await getPostsByCategorySlug("thoughts", 4);

  if (thoughts.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Thoughts
          </h2>
          <p className="mt-3 text-zinc-400">
            Quick updates, musings, and articles.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <p className="text-zinc-500">Thoughts coming soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Thoughts
        </h2>
        <p className="mt-3 text-zinc-400">
          Quick updates, musings, and articles.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {thoughts.map((post) => (
          <ThoughtCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/thoughts"
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          View all thoughts &rarr;
        </Link>
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
          Tech entrepreneur with 15+ years building and growing digital media
          brands. Writer, investor, and lifelong tinkerer.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          Learn more about me &rarr;
        </Link>
      </div>
    </section>
  );
}

export default async function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <ThoughtsSection />
      <AboutTeaser />
    </>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/app/page.tsx src/components/ThoughtCard.tsx
git commit -m "feat: homepage thoughts section, about teaser, and ThoughtCard component"
```

---

### Task 7: `/projects` listing page

**Files:**
- Create: `src/app/projects/page.tsx`

**Step 1: Build the projects listing page**

Create `src/app/projects/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getPostsByCategorySlug } from "@/lib/wordpress";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Sites and ventures built by Aseem Kishore.",
};

export default async function ProjectsPage() {
  const projects = await getPostsByCategorySlug("projects", 20);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Sites and ventures I&apos;ve built and grown.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((post) => (
          <ProjectCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: /projects listing page"
```

---

### Task 8: `/projects/[slug]` detail page and typography plugin

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `package.json` (via npm install)

**Step 1: Install Tailwind Typography plugin**

Run: `npm install @tailwindcss/typography`

Then update `src/app/globals.css` — add the plugin import after the tailwindcss import:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

(Keep the rest of globals.css unchanged.)

**Step 2: Build the project detail page**

Create `src/app/projects/[slug]/page.tsx`:

WordPress content is rendered from our own trusted CMS backend — not user-submitted input.

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPostsByCategorySlug } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPostsByCategorySlug("projects", 50);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title.rendered,
    description: post.meta.project_description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { meta } = post;
  const techStack = meta.project_tech_stack
    ? meta.project_tech_stack.split(",").map((t) => t.trim())
    : [];

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <Link
        href="/projects"
        className="text-sm text-zinc-500 hover:text-blue-400 transition-colors"
      >
        &larr; All projects
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          {post.title.rendered}
        </h1>
        {meta.project_status === "active" && (
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Active
          </span>
        )}
      </div>

      {meta.project_role && (
        <p className="mt-3 text-lg text-zinc-400">{meta.project_role}</p>
      )}

      <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-400">
        {meta.project_founded && (
          <div>
            <span className="font-mono text-xs text-zinc-600">Founded</span>
            <p className="mt-1 text-zinc-300">{meta.project_founded}</p>
          </div>
        )}
        {meta.project_url && (
          <div>
            <span className="font-mono text-xs text-zinc-600">Website</span>
            <p className="mt-1">
              <a
                href={meta.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {meta.project_url.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </p>
          </div>
        )}
      </div>

      {techStack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-zinc-800 px-2.5 py-1 font-mono text-xs text-zinc-500"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <article
        className="prose prose-invert prose-zinc mt-12 max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-a:text-blue-400 prose-strong:text-zinc-200"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {meta.project_url && (
        <div className="mt-12">
          <a
            href={meta.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Visit site &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/app/projects/[slug]/page.tsx src/app/globals.css package.json package-lock.json
git commit -m "feat: /projects/[slug] detail page with typography plugin"
```

---

### Task 9: `/thoughts` listing page

**Files:**
- Create: `src/app/thoughts/page.tsx`

**Step 1: Build the thoughts listing page**

Create `src/app/thoughts/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getPostsByCategorySlug } from "@/lib/wordpress";
import ThoughtCard from "@/components/ThoughtCard";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Quick updates, musings, and articles by Aseem Kishore.",
};

export default async function ThoughtsPage() {
  const thoughts = await getPostsByCategorySlug("thoughts", 20);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Thoughts
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Quick updates, musings, and articles.
        </p>
      </div>
      {thoughts.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <p className="text-zinc-500">Thoughts coming soon.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {thoughts.map((post) => (
            <ThoughtCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/app/thoughts/page.tsx
git commit -m "feat: /thoughts listing page with empty state"
```

---

### Task 10: `/thoughts/[slug]` detail page

**Files:**
- Create: `src/app/thoughts/[slug]/page.tsx`

**Step 1: Build the thought detail page**

Create `src/app/thoughts/[slug]/page.tsx`.

WordPress content is rendered from our own trusted CMS backend — not user-submitted input.

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPostsByCategorySlug } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const thoughts = await getPostsByCategorySlug("thoughts", 50);
  return thoughts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title.rendered };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/thoughts"
        className="text-sm text-zinc-500 hover:text-blue-400 transition-colors"
      >
        &larr; All thoughts
      </Link>

      <h1 className="mt-8 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
        {post.title.rendered}
      </h1>
      <time className="mt-4 block font-mono text-sm text-zinc-600">
        {formatDate(post.date)}
      </time>

      <article
        className="prose prose-invert prose-zinc mt-12 max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-a:text-blue-400 prose-strong:text-zinc-200"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/app/thoughts/[slug]/page.tsx
git commit -m "feat: /thoughts/[slug] detail page"
```

---

### Task 11: `/about` page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Build the about page with hard-coded content**

Create `src/app/about/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Aseem Kishore — founder, writer, tech enthusiast, and investor.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
        About
      </h1>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-100">Professional</h2>
        <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
          <p>
            I&apos;m a tech entrepreneur with over 15 years of experience
            building and growing digital media brands. I founded{" "}
            <a
              href="https://akinternetconsulting.com"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              AK Internet Consulting
            </a>
            , where I help businesses with WordPress maintenance, workflow
            automation, and AI-powered software development.
          </p>
          <p>
            I&apos;ve built a portfolio of technology publications that reach
            millions of readers each month, including{" "}
            <a href="https://www.online-tech-tips.com" className="text-blue-400 hover:text-blue-300 transition-colors">Online Tech Tips</a>,{" "}
            <a href="https://helpdeskgeek.com" className="text-blue-400 hover:text-blue-300 transition-colors">Help Desk Geek</a>,{" "}
            <a href="https://www.thebackroomtech.com" className="text-blue-400 hover:text-blue-300 transition-colors">The Back Room Tech</a>,{" "}
            <a href="https://www.switchingtomac.com" className="text-blue-400 hover:text-blue-300 transition-colors">Switching to Mac</a>, and{" "}
            <a href="https://xboxadvisor.com" className="text-blue-400 hover:text-blue-300 transition-colors">Xbox Advisor</a>.
          </p>
          <p>
            My work sits at the intersection of content, technology, and
            entrepreneurship. I write about tech, build tools with AI, and
            manage the infrastructure that keeps everything running.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-100">Personal</h2>
        <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
          <p>
            Outside of work, I&apos;m a family man, a stock and options
            enthusiast, and a lifelong tinkerer. I enjoy digging into new
            technologies, following the markets, and spending time with my
            family.
          </p>
          <p>
            I&apos;m based in the US and have been working remotely in the
            tech space since long before it was mainstream.
          </p>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: /about page with professional and personal sections"
```

---

### Task 12: Final lint, build, and verification

**Files:**
- All files created/modified above

**Step 1: Run lint**

Run: `npm run lint`
Fix any issues.

**Step 2: Run production build**

Run: `npm run build`
Expected: All pages build successfully, static params generated for project and thought slugs.

**Step 3: Visual review**

Run: `npm run dev`
Check all routes:
- `/` — hero, projects grid, thoughts empty state, about teaser, footer
- `/projects` — full grid
- `/projects/online-tech-tips` — detail page with meta, content, CTA
- `/thoughts` — empty state
- `/about` — professional + personal sections
- Nav highlights correct page
- Mobile responsive (resize browser)

**Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "chore: lint fixes and final adjustments"
```

---

## File Summary

| Action | Path |
|--------|------|
| Modify | `src/lib/wordpress.ts` |
| Modify | `src/app/globals.css` |
| Modify | `src/app/layout.tsx` |
| Modify | `src/app/page.tsx` |
| Create | `src/components/Nav.tsx` |
| Create | `src/components/Footer.tsx` |
| Create | `src/components/ProjectCard.tsx` |
| Create | `src/components/ThoughtCard.tsx` |
| Create | `src/app/projects/page.tsx` |
| Create | `src/app/projects/[slug]/page.tsx` |
| Create | `src/app/thoughts/page.tsx` |
| Create | `src/app/thoughts/[slug]/page.tsx` |
| Create | `src/app/about/page.tsx` |
| Install | `@tailwindcss/typography` |
