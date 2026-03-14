import Link from "next/link";
import type { WPPost } from "@/lib/wordpress";
import { decodeHtmlEntities } from "@/lib/wordpress";

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
  const title = decodeHtmlEntities(post.title.rendered);
  const fullExcerpt = decodeHtmlEntities(stripHtml(post.excerpt.rendered));
  const excerpt = fullExcerpt.slice(0, 150);

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
          {fullExcerpt.length > 150 ? "..." : ""}
        </p>
      )}
      <span className="mt-auto text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
        Read more &rarr;
      </span>
    </Link>
  );
}
