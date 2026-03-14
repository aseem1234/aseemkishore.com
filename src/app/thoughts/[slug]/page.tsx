import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostByCategorySlug, getPostsByCategorySlug, decodeHtmlEntities } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string): string {
  return new Date(dateStr + "Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function generateStaticParams() {
  const thoughts = await getPostsByCategorySlug("thoughts", 50);
  return thoughts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostByCategorySlug(slug, "thoughts");
  if (!post) return {};
  return { title: decodeHtmlEntities(post.title.rendered) };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostByCategorySlug(slug, "thoughts");
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
        {decodeHtmlEntities(post.title.rendered)}
      </h1>
      <time className="mt-4 block font-mono text-sm text-zinc-600">
        {formatDate(post.date)}
      </time>

      {/* Content from our own trusted WordPress CMS, not user input */}
      <article
        className="prose prose-invert prose-zinc mt-12 max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-a:text-blue-400 prose-strong:text-zinc-200"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}
