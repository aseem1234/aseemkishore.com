import assert from "node:assert/strict";
import { test } from "node:test";

import { findBackdrop, findPair, flipBackdrops, flipPairs } from "../src/data/flipCoins";
import {
  appSchemeURL,
  canonicalURL,
  coinTitle,
  MAX_FACE_TEXT,
  ogImagePath,
  parseCoinParams,
} from "../src/lib/flip-link";

test("catalog covers the app's 26 pairs and 9 backdrops with unique ids", () => {
  assert.equal(flipPairs.length, 26);
  assert.equal(flipBackdrops.length, 9);
  assert.equal(new Set(flipPairs.map((pair) => pair.id)).size, 26);
  assert.equal(new Set(flipBackdrops.map((backdrop) => backdrop.id)).size, 9);
  assert.equal(findPair("liberty")?.heads, "CoinHeads");
  assert.equal(findBackdrop("marble")?.name, "Simple marble");
});

test("a full link round-trips back to the same canonical URL", () => {
  const params = parseCoinParams({ p: "btc", h: "Pizza", t: "Tacos", b: "marble" });
  assert.ok(params);
  assert.equal(params.pair.name, "Bitcoin");
  assert.equal(params.headsText, "Pizza");
  assert.equal(params.tailsText, "Tacos");
  assert.equal(params.backdrop?.id, "marble");

  const url = canonicalURL(params);
  assert.equal(url, "https://aseemkishore.com/c?p=btc&h=Pizza&t=Tacos&b=marble");

  const reparsed = parseCoinParams(new URL(url).searchParams);
  assert.deepEqual(reparsed, params);
});

test("URLSearchParams and plain objects parse identically", () => {
  const fromObject = parseCoinParams({ p: "dice", h: "Roll" });
  const fromSearchParams = parseCoinParams(new URLSearchParams("p=dice&h=Roll"));
  assert.deepEqual(fromSearchParams, fromObject);
});

test("a missing or unknown pair yields null", () => {
  assert.equal(parseCoinParams({}), null);
  assert.equal(parseCoinParams({ h: "Pizza" }), null);
  assert.equal(parseCoinParams({ p: "" }), null);
  assert.equal(parseCoinParams({ p: "not-a-pair" }), null);
  assert.equal(parseCoinParams(undefined), null);
});

test("an unknown backdrop degrades to null instead of failing the link", () => {
  const params = parseCoinParams({ p: "liberty", b: "shag-carpet" });
  assert.ok(params);
  assert.equal(params.backdrop, null);
  assert.equal(canonicalURL(params), "https://aseemkishore.com/c?p=liberty");
});

test("face text is trimmed, emptied to null, and clamped to 24 characters", () => {
  const params = parseCoinParams({ p: "yesno", h: "   Order the pizza   ", t: "   " });
  assert.ok(params);
  assert.equal(params.headsText, "Order the pizza");
  assert.equal(params.tailsText, null);

  const long = parseCoinParams({ p: "yesno", h: "A".repeat(40) });
  assert.equal(long?.headsText?.length, MAX_FACE_TEXT);

  // Clamping counts code points, so a trailing emoji is never split into a lone surrogate.
  const emoji = parseCoinParams({ p: "yesno", h: `${"a".repeat(23)}🎲🎲` });
  assert.equal(Array.from(emoji?.headsText ?? "").length, MAX_FACE_TEXT);
  assert.ok(emoji?.headsText?.endsWith("🎲"));
});

test("only the first value of a repeated query key is used", () => {
  const params = parseCoinParams({ p: ["btc", "liberty"], h: ["Yes", "No"] });
  assert.equal(params?.pair.id, "btc");
  assert.equal(params?.headsText, "Yes");
});

test("coinTitle uppercases sender text and falls back to the side name", () => {
  assert.equal(coinTitle("heads", "Pizza"), "PIZZA");
  assert.equal(coinTitle("tails", "  tacos  "), "TACOS");
  assert.equal(coinTitle("heads", null), "HEADS");
  assert.equal(coinTitle("tails", ""), "TAILS");
  assert.equal(coinTitle("tails", undefined), "TAILS");
});

test("spaces and ampersands are percent-encoded, never left raw or turned into plus", () => {
  const params = parseCoinParams({ p: "sunmoon", h: "Fish & Chips", t: "Sushi Bar" });
  assert.ok(params);

  const url = canonicalURL(params);
  assert.equal(
    url,
    "https://aseemkishore.com/c?p=sunmoon&h=Fish%20%26%20Chips&t=Sushi%20Bar",
  );
  assert.ok(!url.includes("+"));

  const search = new URL(url).searchParams;
  assert.equal(search.get("h"), "Fish & Chips");
  assert.equal(search.get("t"), "Sushi Bar");
});

test("the app scheme and OG paths carry the same query as the canonical URL", () => {
  const params = parseCoinParams({ p: "poker", h: "Bet", t: "Fold", b: "casino" });
  assert.ok(params);
  const query = "p=poker&h=Bet&t=Fold&b=casino";
  assert.equal(appSchemeURL(params), `flip://coin?${query}`);
  assert.equal(canonicalURL(params), `https://aseemkishore.com/c?${query}`);
  assert.equal(ogImagePath(params), `/api/tools/flip-og?${query}`);
});
