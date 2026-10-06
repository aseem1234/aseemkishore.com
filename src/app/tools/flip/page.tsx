import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const appStoreUrl = "https://apps.apple.com/app/id6808014080";

export const metadata: Metadata = {
  title: "Fast Coin Flip for iPhone",
  description:
    "Fast Coin Flip (Flip on your Home Screen) is an iPhone coin-flip app from AK Internet Consulting, Inc. Tap or shake, mint your own coin, no account and no ads. Requires iOS 18 or later.",
  alternates: { canonical: "/tools/flip" },
  other: { "apple-itunes-app": "app-id=6808014080" },
};

const features = [
  {
    title: "Tap or shake",
    body: "Tap the coin or shake your phone. It lands on heads or tails.",
  },
  {
    title: "A fair flip",
    body: "Every result comes from Apple's cryptographically secure random generator, on your device.",
  },
  {
    title: "26 face pairs, 9 table backgrounds",
    body: "Pick the coin and the surface it lands on.",
  },
  {
    title: "Mint your own coin",
    body: "Describe a coin in a sentence and AI draws both faces. Pro, 2 per day.",
  },
  {
    title: "Widgets, Siri and the Action button",
    body: "Flip from the Home Screen, by voice, or with a button press. Pro.",
  },
  {
    title: "No account, no ads",
    body: "Nothing to sign up for, and no third-party analytics SDK.",
  },
];

const screenshots = [
  { src: "/flip/promo/01-hero.jpg", alt: "Flip showing a gold coin on a wood table, landed on heads" },
  { src: "/flip/promo/02-result.jpg", alt: "Flip showing a silver dollar on a wood table, landed on tails" },
  { src: "/flip/promo/03-custom.jpg", alt: "Flip showing an AI-made pirate skull coin on a marble table" },
  { src: "/flip/promo/04-customize.jpg", alt: "Flip's coin screen with heads and tails faces and the Pro upgrade card" },
  { src: "/flip/promo/06-faces.jpg", alt: "Flip's grid of coin face pairs and table backgrounds" },
];

const freeFeatures = [
  "Tap or shake to flip",
  "Cryptographically secure random outcomes",
  "Last-20 flip history",
  "6 coin face pairs and 3 table backgrounds",
];

const proFeatures = [
  "More face pairs and table backgrounds",
  "AI coin faces from a sentence (2 per day)",
  "Widgets, Siri and Action button",
  "3D thumb-flick and sound effects",
  "Custom photo faces",
  "iCloud Backup of settings and custom faces",
];

const faqs = [
  {
    question: "Is it random?",
    answer:
      "Yes. Flip uses Apple's SecRandomCopyBytes, a cryptographically secure random generator, for every heads or tails outcome, entirely on-device.",
  },
  {
    question: "Is there an account?",
    answer:
      "No. Flip has no account system and no sign-in. Flip history stays on your device. Pro iCloud Backup can sync settings and custom/AI faces to your iCloud.",
  },
  {
    question: "What does Pro cost?",
    answer:
      "Flip Pro is $0.99 per year with a free 1-month introductory offer, or $4.99 lifetime. Both unlock the same features. Purchases go through Apple StoreKit.",
  },
  {
    question: "What does it run on?",
    answer: "iPhone only, on iOS 18 or later.",
  },
];

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Fast Coin Flip",
  alternateName: "Flip",
  url: absoluteUrl("/tools/flip"),
  downloadUrl: appStoreUrl,
  operatingSystem: "iOS 18+",
  applicationCategory: "UtilitiesApplication",
  description:
    "An iPhone coin-flip app. Tap or shake, mint your own coin, no account and no ads.",
  author: { "@type": "Organization", name: "AK Internet Consulting, Inc." },
  // Free to download; Flip Pro ($0.99/year or $4.99 once) is an in-app purchase.
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function FlipPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Fast Coin Flip", path: "/tools/flip" },
        ])}
      />
      <JsonLd data={appJsonLd} />
      <PageHero
        eyebrow="iPhone App"
        title="Mint your own coin. Flip it fair."
        description="Fast Coin Flip (Flip on your Home Screen) lands on heads or tails with a tap or a shake. Pick a coin, or describe one and have it drawn for you."
      />

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={appStoreUrl}
          className="inline-flex items-center rounded-lg bg-blue-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-400"
        >
          Download on the App Store
        </a>
        <Link href="/flip-privacy" className="text-sm text-blue-400 hover:text-blue-300">
          Privacy policy
        </Link>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        iPhone only, iOS 18 or later. Published by AK Internet Consulting, Inc.
      </p>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">What it does</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="text-base font-semibold text-zinc-100">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{f.body}</p>
            </div>
          ))}
        </div>
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
            <p className="mt-1 text-sm text-zinc-500">
              $0.99/year with a 1-month free offer, or $4.99 lifetime. Same unlocks either way.
            </p>
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
          No account and no third-party analytics SDK. Flip Pro iCloud Backup can sync settings,
          custom photos, and saved AI faces to your iCloud. AI Generate sends your prompt to our
          server. Read the full{" "}
          <Link href="/flip-privacy" className="text-blue-400 hover:text-blue-300">
            Flip privacy policy
          </Link>
          .
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Screenshots</h2>
        <ul
          tabIndex={0}
          aria-label="Fast Coin Flip screenshots, scrolls sideways"
          className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
        >
          {screenshots.map((shot) => (
            <li key={shot.src} className="w-44 shrink-0 snap-start sm:w-52">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={600}
                height={1303}
                sizes="(min-width: 640px) 208px, 176px"
                className="h-auto w-full rounded-2xl border border-zinc-800"
              />
            </li>
          ))}
        </ul>
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
