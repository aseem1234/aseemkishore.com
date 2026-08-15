import Link from "next/link";
import type { Publication } from "@/data/types";

export default function ProjectCard({ post }: { post: Publication }) {
  return (
    <Link
      href={`/projects/${post.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-zinc-100 transition-colors group-hover:text-blue-400">
          {post.name}
        </h3>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          {post.status === "building" ? "Building" : "Active"}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-400">{post.summary}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {post.tech.slice(0, 4).map((tech) => (
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
