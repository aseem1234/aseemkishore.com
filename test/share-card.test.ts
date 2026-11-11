import assert from "node:assert/strict";
import { test } from "node:test";

import {
  OPENAI_IMAGE_TIMEOUT_MS,
  SHARE_CARD_MODELS,
  wrapText,
} from "../src/lib/share-card";
import {
  MAX_RATE_LIMIT_BUCKETS,
  _bucketCount,
  _resetRateLimits,
  rateLimit,
} from "../src/lib/rate-limit";

test("routes share-card generation to Flare with GPT Image 2 fallback", () => {
  assert.deepEqual(SHARE_CARD_MODELS, ["gpt-image-2.5-flare", "gpt-image-2"]);
  assert.equal(OPENAI_IMAGE_TIMEOUT_MS, 25_000);
});

test("wrapText breaks unbroken oversized tokens so SVG tspans never overflow", () => {
  const lines = wrapText("x".repeat(95), 42, 3);
  assert.deepEqual(lines, ["x".repeat(42), "x".repeat(42), "x".repeat(11)]);
  assert.ok(lines.every((line) => line.length <= 42));
});

test("rateLimit prunes expired buckets and caps total bucket count", () => {
  _resetRateLimits();
  try {
    const t0 = 1_000_000;
    for (let i = 0; i < MAX_RATE_LIMIT_BUCKETS; i++) {
      const r = rateLimit({
        key: `expired-${i}`,
        limit: 5,
        windowMs: 1_000,
        now: t0,
      });
      assert.equal(r.ok, true);
    }
    assert.equal(_bucketCount(), MAX_RATE_LIMIT_BUCKETS);

    // After window expiry, inserting one new key sweeps expired entries first
    const afterExpiry = rateLimit({
      key: "fresh-ip",
      limit: 5,
      windowMs: 1_000,
      now: t0 + 2_000,
    });
    assert.equal(afterExpiry.ok, true);
    assert.equal(_bucketCount(), 1);

    // Even when all entries are active, size never exceeds MAX_RATE_LIMIT_BUCKETS
    for (let i = 0; i < MAX_RATE_LIMIT_BUCKETS + 25; i++) {
      rateLimit({
        key: `active-${i}`,
        limit: 5,
        windowMs: 60_000,
        now: t0 + 2_000,
      });
    }
    assert.equal(_bucketCount(), MAX_RATE_LIMIT_BUCKETS);
  } finally {
    _resetRateLimits();
  }
});
