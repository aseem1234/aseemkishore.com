/**
 * Coin faces and backdrops for the Flip iPhone app, transcribed from the app's
 * `FaceCatalog.swift` and `BackdropCatalog.swift`. Ids must stay in sync with the
 * app: they are what a shared coin link (`/c?p=…&b=…`) carries.
 *
 * `heads` / `tails` are asset stems; the web art lives at
 * `public/flip/faces/<stem>.jpg` and `public/flip/backdrops/<id>.jpg`.
 */

export type FlipPair = {
  id: string;
  name: string;
  heads: string;
  tails: string;
};

export type FlipBackdrop = {
  id: string;
  name: string;
  /**
   * Flat stand-in for the texture, used where the photo cannot be drawn (OG cards).
   * Taken from the middle gradient stop of the app's `BackdropCatalog` entry.
   */
  color: string;
};

export const flipPairs: FlipPair[] = [
  // Free pack
  { id: "liberty", name: "Liberty", heads: "CoinHeads", tails: "CoinTails" },
  { id: "yesno", name: "Yes / No", heads: "yes", tails: "no" },
  { id: "penny", name: "Wheat Penny", heads: "penny-heads", tails: "penny-tails" },
  { id: "lucky", name: "Lucky 7", heads: "lucky7", tails: "clover" },
  { id: "sunmoon", name: "Sun & Moon", heads: "sun", tails: "moon" },
  { id: "staygo", name: "Stay / Go", heads: "stay", tails: "go" },
  // Pro pack
  { id: "btc", name: "Bitcoin", heads: "btc-heads", tails: "btc-tails" },
  { id: "eightball", name: "8-Ball", heads: "eightball-heads", tails: "eightball-tails" },
  { id: "poker", name: "Poker", heads: "poker-red", tails: "poker-black" },
  { id: "heartskull", name: "Heart & Skull", heads: "heart", tails: "skull" },
  { id: "pizzaburger", name: "Dinner", heads: "pizza", tails: "burger" },
  { id: "sports", name: "Sports", heads: "soccer", tails: "basketball" },
  { id: "peacelove", name: "Peace", heads: "peace", tails: "love" },
  { id: "fireice", name: "Fire & Ice", heads: "fire", tails: "ice" },
  { id: "crownjester", name: "Crown", heads: "crown", tails: "jester" },
  { id: "coffeebeer", name: "Drinks", heads: "coffee", tails: "beer" },
  { id: "rocket", name: "Space", heads: "rocket", tails: "planet" },
  { id: "yinyang", name: "Yin Yang", heads: "yin", tails: "yang" },
  { id: "quarter", name: "Quarter", heads: "washington", tails: "quarter-eagle" },
  { id: "maple", name: "Maple", heads: "maple", tails: "loonie" },
  { id: "euro", name: "Euro", heads: "euro-heads", tails: "euro-tails" },
  { id: "dice", name: "Dice", heads: "dice1", tails: "dice6" },
  { id: "vinyl", name: "Music", heads: "vinyl", tails: "note" },
  { id: "game", name: "Game", heads: "gamepad", tails: "joystick" },
  { id: "diamond", name: "Gems", heads: "diamond", tails: "gem" },
  { id: "smile", name: "Mood", heads: "smile", tails: "frown" },
];

/** The pair used when a link carries no usable `p`. */
export const defaultPairId = "liberty";

export const flipBackdrops: FlipBackdrop[] = [
  // Free pack
  { id: "felt", name: "Dark felt", color: "#0a140f" },
  { id: "wood", name: "Warm wood", color: "#4d2b17" },
  { id: "marble", name: "Simple marble", color: "#707075" },
  // Pro pack
  { id: "casino", name: "Casino felt", color: "#124d2b" },
  { id: "bokeh", name: "Gold bokeh", color: "#573b12" },
  { id: "nightsky", name: "Night sky", color: "#0a0d26" },
  { id: "metal", name: "Brushed metal", color: "#575961" },
  { id: "leather", name: "Leather", color: "#381a0f" },
  { id: "velvet", name: "Velvet", color: "#47081a" },
];

export function findPair(id: string | undefined | null): FlipPair | null {
  if (!id) return null;
  return flipPairs.find((pair) => pair.id === id) ?? null;
}

export function findBackdrop(id: string | undefined | null): FlipBackdrop | null {
  if (!id) return null;
  return flipBackdrops.find((backdrop) => backdrop.id === id) ?? null;
}

export function faceImagePath(asset: string): string {
  return `/flip/faces/${asset}.jpg`;
}

export function backdropImagePath(id: string): string {
  return `/flip/backdrops/${id}.jpg`;
}
