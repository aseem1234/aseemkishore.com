import assert from "node:assert/strict";
import { test } from "node:test";

import { createTweetScoreHandler } from "../src/app/api/tools/tweet-score/route";

test("client fields cannot select Gateway trust, model, auth, or routing", async () => {
  let received: Record<string, unknown> | null = null;
  const handler = createTweetScoreHandler({
    env: { TOGETHER_API_KEY: "together-secret" },
    rateLimiter: () => ({ ok: true, remaining: 19 }),
    writer: async (args) => {
      received = args as unknown as Record<string, unknown>;
      return {
        ok: true,
        content: '{"score":80,"verdict":"Works","roast":"Fine","fixes":["Ship"]}',
        error: null,
        model: "Qwen/Qwen3.7-Max",
        usedFallback: false,
      };
    },
  });
  const request = new Request("https://example.test/api/tools/tweet-score", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      draft: "hello",
      gatewayTrustedServerContext: false,
      model: "attacker/model",
      token: "attacker-token",
      providerOptions: { gateway: { only: ["attacker"] } },
    }),
  });

  const response = await handler(request);
  assert.equal(response.status, 200);
  assert.equal(received?.gatewayTrustedServerContext, true);
  assert.equal(received?.model, undefined);
  assert.equal(received?.token, undefined);
  assert.equal(received?.providerOptions, undefined);
});
