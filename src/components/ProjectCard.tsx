import Link from "next/link";
import type { WPPost } from "@/lib/wordpress";
import { decodeHtmlEntities } from "@/lib/wordpress";

export default function ProjectCard({ post }: { post: WPPost }) {
  const { meta } = post;
  const title = decodeHtmlEntities(post.title.rendered);
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
