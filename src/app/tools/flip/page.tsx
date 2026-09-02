import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Flip — Coin Flip for iPhone",
  description:
    "Flip is a sleek, fast iPhone coin-flip app from AK Internet Consulting, Inc. Tap or shake; it lands on HEADS or TAILS. Coming soon on the App Store.",
  alternates: { canonical: "/tools/flip" },
};

const freeFeatures = [
  "Tap or shake to flip",
  "Crypto-random outcomes (Apple's SecRandomCopyBytes)",
  "Last-20 flip history",
  "6 coin face pairs",
];

const proFeatures = [
  "3D thumb-flick",
  "Metal sound effects",
  "Custom coin faces",
  "Home Screen widget",
  "~20 extra face pairs",
  "AI Generate (2 per day)",
];

const faqs = [
  {
    question: "Is it random?",
    answer:
      "Yes. Flip uses Apple's SecRandomCopyBytes — a cryptographically secure random generator — for every heads/tails outcome, entirely on-device.",
  },
  {
    question: "Is there an account?",
    answer:
      "No. Flip has no account system and no sign-in. Your flip history and coin faces stay on your device.",
  },
  {
    question: "What does Pro cost?",
    answer:
      "Flip Pro is $0.99 per year with a 7-day free trial, handled by Apple through StoreKit.",
  },
];

export default function FlipPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Flip", path: "/tools/flip" },
        ])}
      />
      <PageHero
        eyebrow="iPhone App"
        title="Flip"
        description="A sleek, fast iPhone coin-flip. Tap or shake; it lands on HEADS or TAILS."
      />

      <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
        <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden="true" />
        Coming soon on the App Store — in development, TestFlight next
      </p>

      <p className="mt-4 text-sm text-zinc-500">
        Published by AK Internet Consulting, Inc.
      </p>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">What it does</h2>
        <p className="mt-4 text-zinc-400">
          Flip settles the call fast: tap the coin or shake your phone, and it lands on HEADS or
          TAILS. Every outcome comes from Apple&rsquo;s cryptographically secure random generator,
          on-device. It keeps your last 20 flips so you can check the record, and ships with six
          coin face pairs to pick from.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Free vs Pro</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-lg font-semibold text-zinc-100">Forever free</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-400">
              {freeFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-blue-500/30 bg-zinc-900/40 p-6">
            <h3 className="text-lg font-semibold text-zinc-100">Flip Pro</h3>
            <p className="mt-1 text-sm text-zinc-500">$0.99/year, 7-day free trial</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-400">
              {proFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Privacy</h2>
        <p className="mt-4 text-zinc-400">
          No account, no third-party analytics SDK, and nothing leaves your device unless you use
          the optional AI Generate feature. Read the full{" "}
          <Link href="/flip-privacy" className="text-blue-400 hover:text-blue-300">
            Flip privacy policy
          </Link>
          .
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Screenshots</h2>
        <div className="mt-6 flex min-h-40 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-8">
          <p className="text-center text-sm text-zinc-500">App Store shots will go here.</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">FAQ</h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-semibold text-zinc-100">{faq.question}</dt>
              <dd className="mt-2 text-zinc-400">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Support</h2>
        <p className="mt-4 text-zinc-400">
          Questions or feedback:{" "}
          <a href="mailto:hello@aseemkishore.com" className="text-blue-400 hover:text-blue-300">
            hello@aseemkishore.com
          </a>{" "}
          or{" "}
          <a
            href="mailto:legal@akinternetconsulting.com"
            className="text-blue-400 hover:text-blue-300"
          >
            legal@akinternetconsulting.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
