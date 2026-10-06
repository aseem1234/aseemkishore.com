import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import CopyButton from "./CopyButton";

const appStoreUrl = "https://apps.apple.com/app/id6808014080";
const pressEmail = "hello@aseemkishore.com";
const legalEmail = "legal@akinternetconsulting.com";
const base = "/flip/press";

export const metadata: Metadata = {
  title: "Fast Coin Flip press kit",
  description:
    "Press kit for Fast Coin Flip, an iPhone coin-flip app from AK Internet Consulting, Inc.: fact sheet, copy-ready descriptions, app icon, screenshots, graphics and short videos.",
  alternates: { canonical: "/tools/flip/press" },
  openGraph: {
    title: "Fast Coin Flip press kit",
    description:
      "Fact sheet, descriptions, app icon, screenshots, graphics and short videos for Fast Coin Flip.",
    url: "/tools/flip/press",
    type: "website",
    images: [{ url: `${base}/graphics/og-1200x630.png`, width: 1200, height: 630 }],
  },
};

const facts: [string, React.ReactNode][] = [
  ["Name", "Fast Coin Flip"],
  ["Home-screen name", "Flip"],
  ["Developer", "AK Internet Consulting, Inc."],
  ["Category", "Utilities"],
  ["Platform", "iPhone only, iOS 18 or later"],
  ["Released", "October 2026 (App Store)"],
  [
    "Price",
    "Free to download. Flip Pro is $0.99 per year with a free 1-month introductory offer, or $4.99 once (lifetime). Both unlock the same features.",
  ],
  ["Age rating", "4+"],
  ["Languages", "English"],
  ["Privacy", "No account, no ads, no third-party analytics SDKs"],
  [
    "Privacy policy",
    <Link key="p" href="/flip-privacy" className="text-blue-400 hover:text-blue-300">
      /flip-privacy
    </Link>,
  ],
  [
    "Support and marketing page",
    <Link key="s" href="/tools/flip" className="text-blue-400 hover:text-blue-300">
      /tools/flip
    </Link>,
  ],
  [
    "App Store",
    <a key="a" href={appStoreUrl} className="text-blue-400 hover:text-blue-300">
      apps.apple.com/app/id6808014080
    </a>,
  ],
];

const descriptions = [
  {
    id: "one-line",
    title: "One line",
    note: "100 characters or fewer",
    text: "Fast Coin Flip is an iPhone coin-flip app: tap or shake, pick your coin, no account and no ads.",
  },
  {
    id: "short",
    title: "Short",
    note: "About 50 words",
    text: "Fast Coin Flip is an iPhone app that flips a coin when you tap or shake. The result comes from the iPhone's cryptographically secure random generator, and the animation lands on that result. Choose from 26 coin face pairs and 9 table backgrounds. There is no account and there are no ads.",
  },
  {
    id: "long",
    title: "Long",
    note: "About 150 words",
    text: "Fast Coin Flip (Flip on the Home Screen) is an iPhone app that flips a coin when you tap or shake. The result comes from the iPhone's cryptographically secure random generator (SecRandomCopyBytes), and the animation lands on that result. It includes 26 coin face pairs and 9 table backgrounds; 6 faces and 3 backgrounds are free and the rest are part of Flip Pro. Flip Pro adds AI-minted coins from a typed sentence (2 per day, safety-filtered, sent through our server using OpenAI's moderation and image APIs, with nothing stored or made public), custom photo and text faces, Home Screen and Lock Screen widgets, Siri and Action button flips, a thumb-flick toss with metal sound effects, iCloud backup, and sharing a coin, which opens an App Clip preview. The Control Center flip control is free. Fast Coin Flip is not a gambling app and has no wagers or payouts. It is free to download, with no account and no ads.",
  },
];

type Asset = {
  file: string;
  thumb: string;
  alt: string;
  title: string;
  dims: string;
  bytes: number;
  use?: string;
};

const icon: Asset = {
  file: `${base}/icon/fast-coin-flip-icon-1024.png`,
  thumb: `${base}/thumbs/icon.jpg`,
  alt: "Fast Coin Flip app icon",
  title: "App icon",
  dims: "1024 x 1024",
  bytes: 1330303,
  use: "Do not alter the icon.",
};

const screenshots: Asset[] = [
  { file: "01-flip-heads", title: "Heads", alt: "Flip showing a coin landed on heads", bytes: 2705033 },
  { file: "02-flip-tails", title: "Tails", alt: "Flip showing a coin landed on tails", bytes: 2769167 },
  { file: "03-midair", title: "Mid-air flip", alt: "Flip showing a coin in the air during a toss", bytes: 3039826 },
  { file: "06-backgrounds", title: "Table backgrounds", alt: "Flip's picker of table backgrounds, with Pro items marked", bytes: 1916665 },
  { file: "07-paywall", title: "Flip Pro", alt: "Flip's Flip Pro screen listing the Pro features and prices", bytes: 1151073 },
  { file: "08-pro-wood-btc", title: "Pro: Bitcoin coin, wood table", alt: "Flip showing a Bitcoin coin on a wood table", bytes: 3482766 },
  { file: "08b-pro-casino-yesno", title: "Pro: Yes/No coin, casino felt", alt: "Flip showing a Yes/No coin on casino felt", bytes: 2707004 },
  { file: "09-history", title: "Flip history", alt: "Flip's history of recent flips", bytes: 159301 },
  { file: "11-ai-pirate", title: "Pro: AI-minted coin", alt: "Flip showing an AI-minted pirate skull coin", bytes: 3900061 },
].map((s) => ({
  ...s,
  file: `${base}/screenshots/${s.file}.png`,
  thumb: `${base}/thumbs/${s.file}.jpg`,
  dims: "1320 x 2868",
}));

const graphics: Asset[] = [
  { file: "x-card-1600x900", title: "X card", dims: "1600 x 900", bytes: 948395, use: "X / Twitter post image (16:9)", alt: "Fast Coin Flip promotional card, 16:9" },
  { file: "linkedin-1200x627", title: "LinkedIn card", dims: "1200 x 627", bytes: 574650, use: "LinkedIn post or link image", alt: "Fast Coin Flip promotional card for LinkedIn" },
  { file: "og-1200x630", title: "Link preview", dims: "1200 x 630", bytes: 500327, use: "Open Graph / link-preview image", alt: "Fast Coin Flip link-preview image" },
  { file: "square-1080x1080", title: "Square hero", dims: "1080 x 1080", bytes: 1375959, use: "Instagram or Threads hero post", alt: "Fast Coin Flip square promotional image" },
  { file: "vertical-1080x1920", title: "Vertical", dims: "1080 x 1920", bytes: 1157622, use: "Stories, Reels or TikTok cover", alt: "Fast Coin Flip vertical promotional image" },
  { file: "feature-mint-1080x1080", title: "Feature: mint a coin", dims: "1080 x 1080", bytes: 1428232, use: "Feature post: AI-minted coin (Pro)", alt: "Feature graphic about minting your own coin with Flip Pro" },
  { file: "feature-tapshake-1080x1080", title: "Feature: tap or shake", dims: "1080 x 1080", bytes: 686884, use: "Feature post: tap or shake", alt: "Feature graphic about tapping or shaking to flip" },
  { file: "feature-tables-1080x1080", title: "Feature: coins and tables", dims: "1080 x 1080", bytes: 690773, use: "Feature post: coins and tables", alt: "Feature graphic about coin faces and table backgrounds" },
  { file: "feature-privacy-1080x1080", title: "Feature: no account, no ads", dims: "1080 x 1080", bytes: 1169832, use: "Feature post: no account, no ads", alt: "Feature graphic about no account and no ads" },
].map((g) => ({
  ...g,
  file: `${base}/graphics/${g.file}.png`,
  thumb: `${base}/thumbs/${g.file}.jpg`,
}));

const videos = [
  { slug: "who-goes-first", title: "Who goes first? Settle it in one tap", seconds: 12.8, bytes: 1410503, coverBytes: 190614 },
  { slug: "shake-to-decide", title: "Stay or go? Shake your iPhone to decide", seconds: 13.0, bytes: 1696776, coverBytes: 226884 },
  { slug: "mint-a-coin", title: "Type a sentence, get a custom coin", seconds: 12.5, bytes: 861156, coverBytes: 249007 },
  { slug: "coins-and-tables", title: "26 coins, 9 tables: make your coin flip yours", seconds: 15.9, bytes: 1789825, coverBytes: 126987 },
];

function size(bytes: number) {
  return bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

const linkClass =
  "text-blue-400 underline-offset-4 hover:text-blue-300 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400";
const buttonClass =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function AssetCard({ asset, ratio }: { asset: Asset; ratio: "portrait" | "wide" | "square" }) {
  const dims = asset.dims.split(" x ").map(Number);
  return (
    <li className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <Image
        src={asset.thumb}
        alt={asset.alt}
        width={dims[0]}
        height={dims[1]}
        unoptimized
        loading="lazy"
        className={`w-full rounded-lg border border-zinc-800 object-contain ${ratio === "portrait" ? "mx-auto max-h-72 w-auto" : "h-auto"}`}
      />
      <h3 className="mt-3 text-base font-semibold text-zinc-100">{asset.title}</h3>
      <p className="mt-1 text-sm text-zinc-400">
        {asset.dims} px, PNG, {size(asset.bytes)}
      </p>
      {asset.use ? <p className="mt-1 text-sm text-zinc-500">{asset.use}</p> : null}
      <a href={asset.file} download className={`mt-3 inline-block text-sm font-semibold ${linkClass}`}>
        Download<span className="sr-only"> {asset.title}</span>
      </a>
    </li>
  );
}

export default function FlipPressPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Fast Coin Flip", path: "/tools/flip" },
          { name: "Press kit", path: "/tools/flip/press" },
        ])}
      />
      <PageHero
        eyebrow="Press kit"
        title="Fast Coin Flip press kit"
        description="Facts, copy-ready descriptions, the app icon, screenshots, graphics and short videos for Fast Coin Flip, an iPhone coin-flip app from AK Internet Consulting, Inc."
      />
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a href={appStoreUrl} className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-400`}>
          View on the App Store
        </a>
        <a
          href={`mailto:${pressEmail}`}
          className={`${buttonClass} border border-zinc-600 text-zinc-100 hover:border-zinc-400 hover:text-white focus-visible:outline-zinc-300`}
        >
          Contact
        </a>
      </div>

      <section className="mt-16" aria-labelledby="facts">
        <h2 id="facts" className="text-2xl font-bold text-zinc-50">Fact sheet</h2>
        <table className="mt-6 w-full border-collapse text-left text-sm">
          <caption className="sr-only">Fast Coin Flip fact sheet</caption>
          <tbody>
            {facts.map(([k, v]) => (
              <tr key={k} className="border-t border-zinc-800 align-top">
                <th scope="row" className="w-40 py-3 pr-4 font-semibold text-zinc-100 sm:w-56">{k}</th>
                <td className="py-3 text-zinc-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-16" aria-labelledby="descriptions">
        <h2 id="descriptions" className="text-2xl font-bold text-zinc-50">Descriptions</h2>
        <p className="mt-2 text-zinc-400">Copy-ready text. Use it as is or quote from it.</p>
        <div className="mt-6 space-y-4">
          {descriptions.map((d) => (
            <div key={d.id} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-zinc-100">
                  {d.title} <span className="text-sm font-normal text-zinc-500">({d.note})</span>
                </h3>
                <CopyButton text={d.text} label={`${d.title.toLowerCase()} description`} />
              </div>
              <p className="mt-3 text-zinc-300">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="icon">
        <h2 id="icon" className="text-2xl font-bold text-zinc-50">App icon</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          <AssetCard asset={icon} ratio="square" />
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="screenshots">
        <h2 id="screenshots" className="text-2xl font-bold text-zinc-50">Screenshots</h2>
        <p className="mt-2 text-zinc-400">
          Full-resolution iPhone captures. Items marked Pro show Flip Pro features.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {screenshots.map((s) => (
            <AssetCard key={s.file} asset={s} ratio="portrait" />
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="graphics">
        <h2 id="graphics" className="text-2xl font-bold text-zinc-50">Graphics</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {graphics.map((g) => (
            <AssetCard key={g.file} asset={g} ratio="wide" />
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="videos">
        <h2 id="videos" className="text-2xl font-bold text-zinc-50">Short videos</h2>
        <p className="mt-2 text-zinc-400">
          Vertical, 720 x 1280, MP4. Sound is the app&apos;s own effects; there is no music.
        </p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <li key={v.slug} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <video
                controls
                preload="none"
                playsInline
                poster={`${base}/videos/cover-${v.slug}.jpg`}
                aria-label={v.title}
                className="aspect-[9/16] w-full rounded-lg border border-zinc-800 bg-black"
              >
                <source src={`${base}/videos/${v.slug}.mp4`} type="video/mp4" />
              </video>
              <h3 className="mt-3 text-base font-semibold text-zinc-100">{v.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                720 x 1280 px, {v.seconds.toFixed(1)} s, MP4, {size(v.bytes)}
              </p>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                <a href={`${base}/videos/${v.slug}.mp4`} download className={linkClass}>
                  Download video<span className="sr-only">: {v.title}</span>
                </a>
                <a href={`${base}/videos/cover-${v.slug}.jpg`} download className={linkClass}>
                  Download cover<span className="sr-only">: {v.title}</span> (JPG, 1080 x 1920, {size(v.coverBytes)})
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="using">
        <h2 id="using" className="text-2xl font-bold text-zinc-50">Using these assets</h2>
        <p className="mt-4 text-zinc-400">
          You may use these images and videos to write about or link to Fast Coin Flip. Please do not
          alter the app icon or imply endorsement. For the App Store badge, use Apple&apos;s official
          artwork from Apple&apos;s marketing resources; it is not included here.
        </p>
        <p className="mt-4 text-zinc-400">The coin artwork shown is original to the app.</p>
      </section>

      <section className="mt-16" aria-labelledby="contact">
        <h2 id="contact" className="text-2xl font-bold text-zinc-50">Contact</h2>
        <ul className="mt-4 space-y-2 text-zinc-400">
          <li>
            Press: <a href={`mailto:${pressEmail}`} className={linkClass}>{pressEmail}</a>
          </li>
          <li>
            Legal: <a href={`mailto:${legalEmail}`} className={linkClass}>{legalEmail}</a>
          </li>
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/tools/flip" className={linkClass}>Back to Fast Coin Flip</Link>
        </p>
      </section>
    </div>
  );
}
