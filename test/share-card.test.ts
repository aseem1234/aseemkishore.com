import assert from "node:assert/strict";
import { test } from "node:test";

import { SHARE_CARD_MODELS } from "../src/lib/share-card";

test("routes share-card generation to Flare with GPT Image 2 fallback", () => {
  assert.deepEqual(SHARE_CARD_MODELS, ["gpt-image-2.5-flare", "gpt-image-2"]);
});
