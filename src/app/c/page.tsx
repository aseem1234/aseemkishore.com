import type { Metadata } from "next";
import Image from "next/image";
import {
  backdropImagePath,
  defaultPairId,
  faceImagePath,
  findPair,
  flipPairs,
  type FlipPair,
} from "@/data/flipCoins";
import {
  appSchemeURL,
  canonicalURL,
  coinTitle,
  FLIP_APP_STORE_URL,
  FLIP_CLIP_BUNDLE_ID,
  FLIP_APP_ID,
  ogImagePath,
  parseCoinParams,
  type CoinParams,
} from "@/lib/flip-link";

// The whole page is a function of the query string, so it can never be prerendered.
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const libertyPair: FlipPair = findPair(defaultPairId) ?? flipPairs[0];

/** What a link with no usable `p` shows: the free Liberty coin and the pitch. */
const fallbackParams: CoinParams = {
  pair: libertyPair,
  headsText: null,
  tailsText: null,
  backdrop: null,
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = parseCoinParams(await searchParams);
  const view = params ?? fallbackParams;
  const heads = coinTitle("heads", view.headsText);
  const tails = coinTitle("tails", view.tailsText);

  const title = params ? "Someone sent you a coin · Flip" : "Flip";
  const description = params
    ? `${view.pair.name}: ${heads} or ${tails}. Flip it on your iPhone — a fair 50/50 from your phone's own random source.`
    : `Flip: a coin you can mint. ${view.pair.name}, ${heads} or ${tails}, and about two dozen more faces on your iPhone.`;

  const canonical = params ? canonicalURL(view) : `${canonicalURL(view).split("?")[0]}`;
  const image = ogImagePath(view);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    // Individual coin links are private between sender and recipient.
    robots: params ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: `${view.pair.name}: ${heads} or ${tails}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      // Makes Safari show the App Clip card above the page.
      "apple-itunes-app": `app-id=${FLIP_APP_ID}, app-clip-bundle-id=${FLIP_CLIP_BUNDLE_ID}, app-argument=${canonicalURL(view)}`,
    },
  };
}

function CoinFace({ asset, caption }: { asset: string; caption: string }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-32 overflow-hidden rounded-full ring-2 ring-amber-300/60 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.9)] sm:h-40 sm:w-40">
        <Image
          src={faceImagePath(asset)}
          alt=""
          fill
          sizes="(min-width: 640px) 160px, 128px"
          priority
          // The source art is a round coin on black padding; scaling up crops the padding away.
          className="scale-110 object-cover"
        />
      </div>
      <figcaption className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/90 sm:text-sm">
        {caption}
      </figcaption>
    </figure>
  );
}

export default async function SharedCoinPage({ searchParams }: Props) {
  const params = parseCoinParams(await searchParams);
  const view = params ?? fallbackParams;
  const headsTitle = coinTitle("heads", view.headsText);
  const tailsTitle = coinTitle("tails", view.tailsText);

  return (
    <div className="relative -mt-16 flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center">
      {view.backdrop ? (
        <>
          <Image
            src={backdropImagePath(view.backdrop.id)}
            alt=""
            fill
            sizes="100vw"
            priority
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[#0a0a0f]/65 backdrop-blur-[2px]"
          />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0a0a0f]" />
      )}

      <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-300">
        {params ? "Someone sent you a coin" : "Flip: a coin you can mint."}
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        {view.pair.name}
      </h1>

      <div className="mt-9 flex items-start justify-center gap-8 sm:gap-12">
        <CoinFace asset={view.pair.heads} caption={headsTitle} />
        <CoinFace asset={view.pair.tails} caption={tailsTitle} />
      </div>

      <a
        href={FLIP_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-3.5 text-base font-semibold text-zinc-950 transition-colors hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
      >
        Get Flip on the App Store
      </a>

      <a
        href={appSchemeURL(view)}
        className="mt-4 text-sm font-medium text-amber-200/80 underline-offset-4 transition-colors hover:text-amber-100 hover:underline"
      >
        Open in Flip
      </a>

      <p className="mt-8 max-w-xs text-xs leading-relaxed text-zinc-400 sm:max-w-sm">
        Fair 50/50 from your iPhone&rsquo;s own random source. Free to flip; Pro mints your own
        coins.
      </p>
    </div>
  );
}
