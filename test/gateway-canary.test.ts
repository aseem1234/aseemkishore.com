import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CANARY_MODEL,
  CANARY_OUTPUT,
  createGatewayCanaryHandler,
  runGatewayCanary,
} from "../src/lib/gateway-canary";

function canaryStream(): Response {
  const frames = [
    { model: CANARY_MODEL, choices: [{ delta: { role: "assistant", content: CANARY_OUTPUT }, finish_reason: null }], usage: null },
    { model: CANARY_MODEL, choices: [{ delta: {}, finish_reason: "stop" }], usage: null },
    { model: CANARY_MODEL, choices: [], usage: { prompt_tokens: 12, completion_tokens: 8, total_tokens: 20 } },
  ];
  return new Response(
    `${frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("")}data: [DONE]\n\n`,
    { headers: { "content-type": "text/event-stream" } },
  );
}

function canaryFinishUsageStream(): Response {
  const frames = [
    { model: CANARY_MODEL, choices: [{ delta: { role: "assistant", content: CANARY_OUTPUT }, finish_reason: null }], usage: null },
    {
      model: CANARY_MODEL,
      choices: [{ delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 12, completion_tokens: 8, total_tokens: 20 },
    },
  ];
  return new Response(
    `${frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("")}data: [DONE]\n\n`,
    { headers: { "content-type": "text/event-stream" } },
  );
}

test("fixed canary makes one no-tools, no-system, privacy-bound request", async () => {
  const calls: Array<{ url: string; headers: Headers; body: Record<string, unknown> }> = [];
  const telemetry = await runGatewayCanary({
    oidcToken: "request-oidc",
    runId: "fixed-run-id",
    deploymentId: "deployment-id",
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), headers: new Headers(init?.headers), body: JSON.parse(String(init?.body)) });
      return canaryStream();
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].headers.get("authorization"), "Bearer request-oidc");
  assert.deepEqual(calls[0].body, {
    model: CANARY_MODEL,
    messages: [{ role: "user", content: `Reply with exactly ${CANARY_OUTPUT} and nothing else.` }],
    temperature: 0,
    max_tokens: 16,
    chat_template_kwargs: { enable_thinking: false },
    reasoning: { enabled: false },
    stream: true,
    stream_options: { include_usage: true },
    providerOptions: {
      gateway: {
        zeroDataRetention: true,
        disallowPromptTraining: true,
        only: ["alibaba"],
      },
    },
  });
  assert.equal(Object.hasOwn(calls[0].body, "tools"), false);
  assert.equal(telemetry.output_hash.length, 64);
  assert.equal(JSON.stringify(telemetry).includes(CANARY_OUTPUT), false);
  assert.equal(telemetry.side_effect_state, "synthetic_no_persistence");
});

test("canary accepts usage on the stop finish frame", async () => {
  const telemetry = await runGatewayCanary({
    oidcToken: "request-oidc",
    runId: "finish-usage-run",
    fetchImpl: async () => canaryFinishUsageStream(),
  });
  assert.equal(telemetry.ok, true);
  assert.equal(telemetry.usage?.total_tokens, 20);
});

test("canary handler checks trusted cron, no input, qualification, and temporary arm before OIDC", async () => {
  let oidcLookups = 0;
  let paidCalls = 0;
  const handler = createGatewayCanaryHandler({
    env: {
      CRON_SECRET: "cron-secret",
      TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true",
      TWEET_SCORE_GATEWAY_CANARY_ARMED: "true",
    },
    oidcTokenProvider: async () => {
      oidcLookups += 1;
      return "request-oidc";
    },
    canaryRunner: async () => {
      paidCalls += 1;
      return { ok: true, output_hash: "a".repeat(64), side_effect_state: "synthetic_no_persistence" };
    },
  });

  const unauthorized = await handler(new Request("https://example.test/api/gateway-canary", { headers: { authorization: "Bearer cron-secret", "user-agent": "browser" } }));
  assert.equal(unauthorized.status, 403);

  const withInput = await handler(new Request("https://example.test/api/gateway-canary?draft=secret", { headers: { authorization: "Bearer cron-secret", "user-agent": "vercel-cron/1.0" } }));
  assert.equal(withInput.status, 400);
  assert.equal(oidcLookups, 0);

  const authorized = await handler(new Request("https://example.test/api/gateway-canary", { headers: { authorization: "Bearer cron-secret", "user-agent": "vercel-cron/1.0" } }));
  assert.equal(authorized.status, 200);
  assert.equal(oidcLookups, 1);
  assert.equal(paidCalls, 1);
});

test("qualification or arm absence is a successful unmetered no-op", async () => {
  for (const env of [
    { CRON_SECRET: "cron-secret" },
    { CRON_SECRET: "cron-secret", TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true" },
  ]) {
    const handler = createGatewayCanaryHandler({
      env,
      oidcTokenProvider: async () => {
        throw new Error("OIDC must not be read");
      },
      canaryRunner: async () => {
        throw new Error("Gateway must not be called");
      },
    });
    const response = await handler(new Request("https://example.test/api/gateway-canary", { headers: { authorization: "Bearer cron-secret", "user-agent": "vercel-cron/1.0" } }));
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.gateway_attempted, false);
    assert.equal(body.gateway_billing_classification, "unmetered_preflight");
  }
});

test("canary failures after OIDC preflight remain visibly attempted and metered", async () => {
  const authorizedRequest = () => new Request("https://example.test/api/gateway-canary", {
    headers: { authorization: "Bearer cron-secret", "user-agent": "vercel-cron/1.0" },
  });
  const env = {
    CRON_SECRET: "cron-secret",
    TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true",
    TWEET_SCORE_GATEWAY_CANARY_ARMED: "true",
    VERCEL_DEPLOYMENT_ID: "deployment-id",
  };

  const oidcFailure = createGatewayCanaryHandler({
    env,
    oidcTokenProvider: async () => {
      throw new Error("OIDC unavailable");
    },
    canaryRunner: async () => assert.fail("runner must not start without OIDC"),
  });
  const preflightResponse = await oidcFailure(authorizedRequest());
  assert.equal(preflightResponse.status, 502);
  const preflight = await preflightResponse.json();
  assert.equal(preflight.gateway_attempted, false);
  assert.equal(preflight.gateway_billing_classification, "unmetered_preflight");

  const dispatchedFailure = createGatewayCanaryHandler({
    env,
    oidcTokenProvider: async () => "request-oidc",
    canaryRunner: async () => {
      throw new Error("malformed paid response");
    },
  });
  const dispatchedResponse = await dispatchedFailure(authorizedRequest());
  assert.equal(dispatchedResponse.status, 502);
  const dispatched = await dispatchedResponse.json();
  assert.equal(dispatched.ok, false);
  assert.equal(dispatched.outcome, "error");
  assert.equal(dispatched.failure_class, "canary_failed");
  assert.equal(dispatched.gateway_attempted, true);
  assert.equal(dispatched.gateway_billing_classification, "metered_gateway");
  assert.equal(dispatched.deployment_id, "deployment-id");
  assert.equal(dispatched.output_hash, null);
});

test("canary modules cannot import content, image, storage, or rate-limit paths", async () => {
  const { readFile } = await import("node:fs/promises");
  const sources = await Promise.all([
    readFile(new URL("../src/lib/gateway-canary.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/gateway-canary/route.ts", import.meta.url), "utf8"),
  ]);
  const combined = sources.join("\n");
  for (const forbiddenImport of [
    /from\s+["'][^"']*wordpress[^"']*["']/,
    /from\s+["'][^"']*share-card[^"']*["']/,
    /from\s+["'][^"']*tweet-score[^"']*["']/,
    /from\s+["'][^"']*rate-limit[^"']*["']/,
    /from\s+["']node:fs[^"']*["']/,
    /from\s+["']@vercel\/blob[^"']*["']/,
    /from\s+["']openai[^"']*["']/,
  ]) {
    assert.equal(forbiddenImport.test(combined), false, forbiddenImport.source);
  }
});
