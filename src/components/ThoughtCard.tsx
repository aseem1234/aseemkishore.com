import Link from "next/link";
import { formatThoughtDate, type ThoughtPost } from "@/lib/thoughts-model";

export default function ThoughtCard({ post }: { post: ThoughtPost }) {
  return (
    <Link
      href={`/thoughts/${post.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
    >
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-zinc-400">
        <time dateTime={post.date}>
          {formatThoughtDate(post.date, "short")}
        </time>
        <span>{post.category === "markets" ? "Markets" : "Tech & AI"}</span>
      </div>
      <h2 className="text-lg font-bold text-zinc-100 transition-colors group-hover:text-blue-400">
        {post.title}
      </h2>
      <p className="text-sm leading-relaxed text-zinc-400">
        {post.excerpt.slice(0, 150)}
        {post.excerpt.length > 150 ? "..." : ""}
      </p>
      <span className="mt-auto text-sm font-medium text-blue-400">
        Read more &rarr;
      </span>
    </Link>
  );
}
