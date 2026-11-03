import Image from "next/image";
import React from "react";

/* ------------------------------------------------------------------ *
 * TechDetail
 * Collapsible "for the technically curious" block. Uses the native
 * <details> element so it works with zero client-side JavaScript and
 * stays accessible + keyboard-navigable by default.
 * ------------------------------------------------------------------ */
export function TechDetail({
  label = "Technical detail",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group mt-5 rounded-lg border border-neutral-200 bg-neutral-50 open:bg-white mwork:border-neutral-800 mwork:bg-neutral-900/60 mwork:open:bg-neutral-900">
      <summary className="flex cursor-pointer list-none items-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-neutral-700 transition-colors hover:text-brand-orange mwork:text-neutral-300 mwork:hover:text-brand-orange">
        <svg
          className="h-4 w-4 flex-shrink-0 text-brand-orange transition-transform duration-200 group-open:rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span>{label}</span>
        <span className="ml-auto text-xs font-normal text-neutral-500 group-open:hidden">
          show
        </span>
      </summary>
      <div className="border-t border-neutral-200 px-5 py-4 text-sm leading-relaxed text-neutral-600 mwork:border-neutral-800 mwork:text-neutral-400 [&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8em] [&_code]:text-brand-orange mwork:[&_code]:bg-neutral-800 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:space-y-1.5 [&_li]:flex [&_li]:gap-2">
        {children}
      </div>
    </details>
  );
}

/* ------------------------------------------------------------------ *
 * Term
 * Inline jargon with a plain-language explanation. CSS-only tooltip on
 * hover/focus for pointer users, and the same text is always available
 * to screen readers and on tap via the dotted-underline affordance.
 * ------------------------------------------------------------------ */
export function Term({
  children,
  definition,
}: {
  children: React.ReactNode;
  definition: string;
}) {
  return (
    <span className="group relative inline-block">
      {/* `title` keeps the definition reachable everywhere the styled tooltip
          is not rendered (touch devices, small screens), and exposes it as the
          accessible description. Every term is also in the page Glossary. */}
      <span
        tabIndex={0}
        title={definition}
        className="cursor-help border-b border-dashed border-brand-orange/60 font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 mwork:text-neutral-200"
      >
        {children}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-2 hidden w-[min(16rem,calc(100vw-2.5rem))] -translate-x-1/2 md:block rounded-lg bg-neutral-900 px-3.5 py-2.5 text-xs font-normal leading-relaxed text-white opacity-0 shadow-xl transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 mwork:bg-neutral-700"
      >
        {definition}
        <span className="absolute left-1/2 top-full -ml-1.5 border-x-[6px] border-t-[6px] border-x-transparent border-t-neutral-900 mwork:border-t-neutral-700" />
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Figure
 * Product screenshot with a caption. Bordered, rounded, dark-mode safe.
 * ------------------------------------------------------------------ */
export function Figure({
  src,
  alt,
  caption,
  width = 1356,
  height = 847,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    /* `min-w-0` is required: these figures sit inside CSS grid tracks, and a
       grid/flex item defaults to `min-width: auto`, which refuses to shrink
       below the image's intrinsic width and blows the track past the viewport. */
    <figure className="my-8 min-w-0">
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-md mwork:border-neutral-800 mwork:bg-neutral-900">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full max-w-full"
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-neutral-500 mwork:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * PlainEnglish
 * Highlighted "what this actually means" callout. Used to translate a
 * technical section into language a non-technical buyer understands.
 * ------------------------------------------------------------------ */
export function PlainEnglish({
  title = "In plain English",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-brand-orange bg-brand-orange/5 p-6 mwork:bg-brand-orange/10">
      <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-orange">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {title}
      </p>
      <div className="text-base leading-relaxed text-neutral-700 mwork:text-neutral-300">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Glossary
 * End-of-page footnote list defining every technical term used, so a
 * non-technical reader has one place to decode the jargon.
 * ------------------------------------------------------------------ */
export function Glossary({
  items,
}: {
  items: { term: string; definition: string }[];
}) {
  return (
    <section className="section bg-neutral-50 mwork:bg-neutral-900">
      <div className="container-narrow">
        <h2 className="mb-3 text-neutral-900 mwork:text-white">
          Plain-language glossary
        </h2>
        <p className="mb-8 text-neutral-600 mwork:text-neutral-400">
          Every technical term used on this page, explained without jargon.
        </p>
        <dl className="space-y-4">
          {items.map((item) => (
            <div
              key={item.term}
              className="rounded-lg border border-neutral-200 bg-white p-5 mwork:border-neutral-800 mwork:bg-neutral-950"
            >
              <dt className="font-heading font-bold text-neutral-900 mwork:text-white">
                {item.term}
              </dt>
              <dd className="mt-1.5 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                {item.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
