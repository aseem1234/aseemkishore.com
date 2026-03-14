import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostByCategorySlug, getPostsByCategorySlug, decodeHtmlEntities } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPostsByCategorySlug("projects", 50);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostByCategorySlug(slug, "projects");
  if (!post) return {};
  return {
    title: decodeHtmlEntities(post.title.rendered),
    description: post.meta.project_description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostByCategorySlug(slug, "projects");
  if (!post) notFound();

  const { meta } = post;
  const techStack = meta.project_tech_stack
    ? meta.project_tech_stack.split(",").map((t) => t.trim())
    : [];

  // WordPress content is from our own trusted CMS, not user input,
  // so dangerouslySetInnerHTML is safe here.

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
          {decodeHtmlEntities(post.title.rendered)}
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
