import Link from "next/link";
import { getPostsByCategorySlug } from "@/lib/wordpress";
import ProjectCard from "@/components/ProjectCard";
import ThoughtCard from "@/components/ThoughtCard";

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
