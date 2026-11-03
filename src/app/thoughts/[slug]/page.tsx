import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { thoughtArticleJsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";
import { getPublishedThought } from "@/lib/thoughts";
import { formatThoughtDate } from "@/lib/thoughts-model";

export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedThought((await params).slug);
  if (!post) return {};
  const images = post.heroImage
    ? [{ url: post.heroImage.url, alt: post.heroImage.alt }]
    : [{ url: absoluteUrl("/opengraph-image") }];
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/thoughts/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/thoughts/${post.slug}`),
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: ["Aseem Kishore"],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

export default async function ThoughtPage({ params }: Props) {
  const post = await getPublishedThought((await params).slug);
  if (!post) notFound();
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd data={thoughtArticleJsonLd(post)} />
      <Link
        href="/thoughts"
        className="text-sm text-zinc-400 transition-colors hover:text-blue-400"
      >
        &larr; All thoughts
      </Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-wider text-blue-400">
        {post.category === "markets" ? "Markets" : "Tech & AI"}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
        {post.title}
      </h1>
      <time
        dateTime={post.date}
        className="mt-4 block font-mono text-sm text-zinc-400"
      >
        {formatThoughtDate(post.date)}
      </time>
      {post.tags.length ? (
        <ul aria-label="Tags" className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      {post.heroImage ? (
        <Image
          src={post.heroImage.url}
          alt={post.heroImage.alt}
          width={1200}
          height={675}
          unoptimized
          priority
          className="mt-10 h-auto w-full rounded-xl border border-zinc-800"
        />
      ) : null}
      {post.category === "markets" ? (
        <aside className="mt-8 rounded-lg border border-zinc-700 bg-zinc-900/70 p-4 text-sm text-zinc-300">
          Not investment advice, just my opinion.
        </aside>
      ) : null}
      <article
        className="thought-prose prose prose-invert prose-zinc mt-12 max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-a:text-blue-400 prose-strong:text-zinc-100"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      {post.video ? (
        <figure className="mt-10">
          <video
            controls
            playsInline
            preload="metadata"
            poster={post.video.poster}
            className="w-full rounded-xl border border-zinc-700 bg-black"
          >
            <source src={post.video.url} type="video/mp4" />
            Your browser does not support embedded video.{" "}
            <a href={post.video.url}>Download the video</a>.
          </video>
        </figure>
      ) : null}
    </div>
  );
}
