import {
  findBackdrop,
  findPair,
  type FlipBackdrop,
  type FlipPair,
} from "@/data/flipCoins";
import { siteUrl } from "@/lib/site";

/** App Store identifiers for the Flip iPhone app (AK Internet Consulting, Inc.). */
export const FLIP_APP_ID = "6808014080";
export const FLIP_APP_STORE_URL = `https://apps.apple.com/app/id${FLIP_APP_ID}`;
export const FLIP_CLIP_BUNDLE_ID = "com.akinternetconsulting.flip.Clip";

/** The app clamps custom face text to 24 characters; the web link must agree. */
export const MAX_FACE_TEXT = 24;

export type CoinSide = "heads" | "tails";

export type CoinParams = {
  pair: FlipPair;
  headsText: string | null;
  tailsText: string | null;
  backdrop: FlipBackdrop | null;
};

/**
 * Accepts either the App Router's resolved `searchParams` object or a
 * `URLSearchParams` (route handlers), so callers do not have to normalise.
 */
export type CoinSearchParams =
  | URLSearchParams
  | Record<string, string | string[] | undefined>
  | null
  | undefined;

function readParam(source: CoinSearchParams, key: string): string | undefined {
  if (!source) return undefined;
  if (source instanceof URLSearchParams) return source.get(key) ?? undefined;
  const value = source[key];
  if (Array.isArray(value)) return value[0];
  return value;
}

/** Trim, drop empties, and clamp to 24 code points so a surrogate pair is never split. */
function cleanFaceText(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const points = Array.from(trimmed);
  if (points.length <= MAX_FACE_TEXT) return trimmed;
  return points.slice(0, MAX_FACE_TEXT).join("");
}

/**
 * Reads a shared-coin link. Returns null when `p` is missing or names a pair this
 * site does not know, which is the caller's cue to render the generic fallback.
 * An unknown backdrop is not fatal — it just resolves to null.
 */
export function parseCoinParams(searchParams: CoinSearchParams): CoinParams | null {
  const pair = findPair(readParam(searchParams, "p"));
  if (!pair) return null;

  return {
    pair,
    headsText: cleanFaceText(readParam(searchParams, "h")),
    tailsText: cleanFaceText(readParam(searchParams, "t")),
    backdrop: findBackdrop(readParam(searchParams, "b")),
  };
}

/** The caption under a face: the sender's own words, else the default side name. */
export function coinTitle(side: CoinSide, text: string | null | undefined): string {
  const trimmed = text?.trim();
  if (trimmed) return trimmed.toUpperCase();
  return side === "heads" ? "HEADS" : "TAILS";
}

/**
 * Percent-encodes every value (spaces become `%20`, not `+`) so the same query
 * survives Safari, the custom scheme, and Swift's `URLComponents` alike.
 */
function coinQuery(params: CoinParams): string {
  const entries: [string, string][] = [["p", params.pair.id]];
  if (params.headsText) entries.push(["h", params.headsText]);
  if (params.tailsText) entries.push(["t", params.tailsText]);
  if (params.backdrop) entries.push(["b", params.backdrop.id]);

  return entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&");
}

/** Deep link into the installed app. */
export function appSchemeURL(params: CoinParams): string {
  return `flip://coin?${coinQuery(params)}`;
}

/** The shareable https link — also what the Smart App Banner passes as app-argument. */
export function canonicalURL(params: CoinParams): string {
  return `${siteUrl}/c?${coinQuery(params)}`;
}

/** Site-relative path to the social card for this coin. */
export function ogImagePath(params: CoinParams): string {
  return `/api/tools/flip-og?${coinQuery(params)}`;
}
