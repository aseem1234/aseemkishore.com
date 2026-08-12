import assert from "node:assert/strict";
import { test } from "node:test";

import {
  GATEWAY_API_URL,
  GATEWAY_MODEL,
  _resetLearned,
  isGatewayEligible,
  writeWithFallback,
} from "../src/lib/together";

const PRIMARY = "Qwen/Qwen3.7-Max";
const DIRECT_FALLBACK = "zai-org/GLM-5.2";

function jsonCompletion(content: string, model: string): Response {
  return Response.json({
    model,
    choices: [{ message: { content } }],
  });
}

function directStream(content: string): Response {
  return new Response(
    `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\ndata: [DONE]\n\n`,
    { headers: { "content-type": "text/event-stream" } },
  );
}

function gatewayStream(content: string): Response {
  const frames = [
    { model: GATEWAY_MODEL, choices: [{ delta: { role: "assistant", content }, finish_reason: null }], usage: null },
    { model: GATEWAY_MODEL, choices: [{ delta: {}, finish_reason: "stop" }], usage: null },
    { model: GATEWAY_MODEL, choices: [], usage: { prompt_tokens: 80, completion_tokens: 40, total_tokens: 120 } },
  ];
  return new Response(
    `${frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("")}data: [DONE]\n\n`,
    { headers: { "content-type": "text/event-stream" } },
  );
}

test.beforeEach(() => _resetLearned());

test("off mode preserves the direct Qwen to GLM fallback request and result", async () => {
  const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
  const result = await writeWithFallback({
    apiKey: "together-secret",
    systemPrompt: "system",
    userPrompt: "user",
    extraBody: { response_format: { type: "json_object" } },
    env: {
      TWEET_SCORE_GATEWAY_FALLBACK_MODE: "off",
      TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true",
    },
    gatewayTrustedServerContext: true,
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), body: JSON.parse(String(init?.body)) });
      return calls.length === 1
        ? new Response("primary unavailable", { status: 503 })
        : jsonCompletion("direct fallback", DIRECT_FALLBACK);
    },
    gatewayOidcTokenProvider: async () => {
      throw new Error("OIDC must not be read while off");
    },
  });

  assert.deepEqual(result, {
    ok: true,
    content: "direct fallback",
    error: null,
    model: DIRECT_FALLBACK,
    usedFallback: true,
  });
  assert.equal(calls.length, 2);
  assert.deepEqual(calls.map((call) => call.body), [
    {
      model: PRIMARY,
      messages: [
        { role: "system", content: "system" },
        { role: "user", content: "user" },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      chat_template_kwargs: { enable_thinking: false },
      reasoning: { enabled: false },
      response_format: { type: "json_object" },
      stream: true,
    },
    {
      model: DIRECT_FALLBACK,
      messages: [
        { role: "system", content: "system" },
        { role: "user", content: "user" },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      chat_template_kwargs: { enable_thinking: false },
      reasoning: { enabled: false },
      response_format: { type: "json_object" },
    },
  ]);
});

test("a direct primary or fallback success never reads OIDC", async () => {
  for (const successfulAttempt of [1, 2]) {
    let calls = 0;
    const result = await writeWithFallback({
      apiKey: "together-secret",
      systemPrompt: "system",
      userPrompt: "user",
      env: {
        TWEET_SCORE_GATEWAY_FALLBACK_MODE: "live",
        TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true",
      },
      gatewayTrustedServerContext: true,
      gatewayOidcTokenProvider: async () => {
        throw new Error("OIDC must not be read after a direct success");
      },
      fetchImpl: async () => {
        calls += 1;
        return calls === successfulAttempt
          ? successfulAttempt === 1
            ? directStream("direct success")
            : jsonCompletion("direct success", DIRECT_FALLBACK)
          : new Response("unavailable", { status: 503 });
      },
    });
    assert.equal(result.ok, true);
    assert.equal(calls, successfulAttempt);
  }
});

test("one final OIDC Gateway attempt follows two eligible direct failures", async () => {
  const calls: Array<{ url: string; headers: Headers; body: Record<string, unknown> }> = [];
  let oidcLookups = 0;
  const telemetry: unknown[] = [];
  const result = await writeWithFallback({
    apiKey: "together-secret",
    systemPrompt: "system",
    userPrompt: "user",
    temperature: 0.6,
    maxTokens: 512,
    extraBody: { response_format: { type: "json_object" } },
    env: {
      TWEET_SCORE_GATEWAY_FALLBACK_MODE: "live",
      TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true",
      VERCEL_DEPLOYMENT_ID: "deployment-safe-id",
    },
    gatewayTrustedServerContext: true,
    gatewayOidcTokenProvider: async () => {
      oidcLookups += 1;
      return "runtime-oidc-token";
    },
    onGatewayTelemetry: (event) => telemetry.push(event),
    fetchImpl: async (url, init) => {
      calls.push({
        url: String(url),
        headers: new Headers(init?.headers),
        body: JSON.parse(String(init?.body)),
      });
      return calls.length < 3
        ? new Response("provider unavailable", { status: 503 })
        : gatewayStream('{"score":80,"verdict":"Works","roast":"Fine","fixes":["Ship"]}');
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.model, GATEWAY_MODEL);
  assert.equal(result.usedFallback, true);
  assert.equal(oidcLookups, 1);
  assert.equal(calls.length, 3);
  assert.equal(calls[2].url, GATEWAY_API_URL);
  assert.equal(calls[2].headers.get("authorization"), "Bearer runtime-oidc-token");
  assert.deepEqual(calls[2].body, {
    model: GATEWAY_MODEL,
    messages: [
      { role: "system", content: "system" },
      { role: "user", content: "user" },
    ],
    temperature: 0.6,
    max_tokens: 512,
    chat_template_kwargs: { enable_thinking: false },
    reasoning: { enabled: false },
    response_format: { type: "json_object" },
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
  assert.equal(telemetry.length, 1);
  assert.deepEqual(Object.keys(telemetry[0] as object).sort(), [
    "chain_attempt",
    "deployment_id",
    "failure_class",
    "gateway_attempted",
    "outcome",
    "output_hash",
    "requested_model",
    "requested_provider",
    "resolved_model",
    "resolved_provider",
    "run_id",
    "side_effect_state",
    "transport",
    "usage",
  ]);
  assert.equal(JSON.stringify(telemetry).includes("runtime-oidc-token"), false);
  assert.equal(JSON.stringify(telemetry).includes("system"), false);
  assert.equal(JSON.stringify(telemetry).includes("user"), false);
});

test("Gateway is never considered unless both direct failures are eligible", async () => {
  let oidcLookups = 0;
  const result = await writeWithFallback({
    apiKey: "together-secret",
    systemPrompt: "system",
    userPrompt: "user",
    env: {
      TWEET_SCORE_GATEWAY_FALLBACK_MODE: "live",
      TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true",
    },
    gatewayTrustedServerContext: true,
    gatewayOidcTokenProvider: async () => {
      oidcLookups += 1;
      return "runtime-oidc-token";
    },
    fetchImpl: async () =>
      oidcLookups === 0
        ? new Response("bad request", { status: 400 })
        : new Response("unavailable", { status: 503 }),
  });

  assert.equal(result.ok, false);
  assert.equal(oidcLookups, 0);
});

test("only documented direct infrastructure classes are Gateway eligible", async () => {
  for (const status of [401, 402, 403, 429, 500, 503]) {
    assert.equal(
      isGatewayEligible({ status, source: "together_http" }),
      true,
      `status ${status}`,
    );
  }
  for (const status of [400, 404, 422]) {
    assert.equal(
      isGatewayEligible({ status, source: "together_http" }),
      false,
      `status ${status}`,
    );
  }
  for (const name of ["TimeoutError", "AbortError", "ConnectTimeoutError"]) {
    assert.equal(isGatewayEligible({ name, source: "request_exception" }), true, name);
  }
  for (const code of ["ETIMEDOUT", "UND_ERR_CONNECT_TIMEOUT", "ENOENT", "EACCES"]) {
    assert.equal(isGatewayEligible({ code, source: "request_exception" }), true, code);
  }
  assert.equal(isGatewayEligible({ name: "SyntaxError", source: "request_exception" }), false);
  assert.equal(isGatewayEligible({ status: 503, source: "gateway_http" }), false);
});

test("shadow mode observes a successful final attempt but returns the direct failure", async () => {
  let calls = 0;
  let event: Record<string, unknown> | null = null;
  const result = await writeWithFallback({
    apiKey: "together-secret",
    systemPrompt: "system",
    userPrompt: "user",
    env: { TWEET_SCORE_GATEWAY_FALLBACK_MODE: "shadow", TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true" },
    gatewayTrustedServerContext: true,
    gatewayOidcTokenProvider: async () => "oidc",
    onGatewayTelemetry: (value) => {
      event = value as unknown as Record<string, unknown>;
    },
    fetchImpl: async () => {
      calls += 1;
      return calls < 3
        ? new Response("unavailable", { status: 503 })
        : gatewayStream("discarded shadow output");
    },
  });
  assert.equal(result.ok, false);
  assert.equal(result.model, DIRECT_FALLBACK);
  assert.equal(event?.outcome, "shadow");
  assert.equal(event?.side_effect_state, "shadow_discarded");
});

test("missing OIDC is an unmetered preflight failure and never calls Gateway", async () => {
  let calls = 0;
  let event: Record<string, unknown> | null = null;
  const result = await writeWithFallback({
    apiKey: "together-secret",
    systemPrompt: "system",
    userPrompt: "user",
    env: { TWEET_SCORE_GATEWAY_FALLBACK_MODE: "live", TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true" },
    gatewayTrustedServerContext: true,
    gatewayOidcTokenProvider: async () => "",
    onGatewayTelemetry: (value) => {
      event = value as unknown as Record<string, unknown>;
    },
    fetchImpl: async () => {
      calls += 1;
      return new Response("unavailable", { status: 503 });
    },
  });
  assert.equal(result.ok, false);
  assert.equal(calls, 2);
  assert.equal(event?.gateway_attempted, false);
  assert.equal(event?.chain_attempt, null);
});

test("unqualified, untrusted, unknown-model, and explicit-model calls never read OIDC", async () => {
  const cases = [
    { env: { TWEET_SCORE_GATEWAY_FALLBACK_MODE: "live" }, trusted: true },
    { env: { TWEET_SCORE_GATEWAY_FALLBACK_MODE: "live", TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true" }, trusted: false },
    { env: { TWEET_SCORE_GATEWAY_FALLBACK_MODE: "invalid", TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true" }, trusted: true },
  ];

  for (const entry of cases) {
    let calls = 0;
    await writeWithFallback({
      apiKey: "together-secret",
      systemPrompt: "system",
      userPrompt: "user",
      env: entry.env,
      gatewayTrustedServerContext: entry.trusted,
      gatewayOidcTokenProvider: async () => {
        throw new Error("OIDC must not be read");
      },
      fetchImpl: async () => {
        calls += 1;
        return new Response("unavailable", { status: 503 });
      },
    });
    assert.equal(calls, 2);
  }

  let explicitCalls = 0;
  await writeWithFallback({
    apiKey: "together-secret",
    systemPrompt: "system",
    userPrompt: "user",
    model: PRIMARY,
    env: { TWEET_SCORE_GATEWAY_FALLBACK_MODE: "live", TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true" },
    gatewayTrustedServerContext: true,
    gatewayOidcTokenProvider: async () => {
      throw new Error("OIDC must not be read");
    },
    fetchImpl: async () => {
      explicitCalls += 1;
      return new Response("unavailable", { status: 503 });
    },
  });
  assert.equal(explicitCalls, 1);
});

test("malformed, wrong-model, tool, oversized, or inconsistent-usage Gateway streams fail closed", async () => {
  const invalidFrames = [
    [{ model: "alibaba/different", choices: [{ delta: { content: "x" }, finish_reason: "stop" }], usage: null }],
    [{ model: GATEWAY_MODEL, choices: [{ delta: { tool_calls: [] }, finish_reason: "stop" }], usage: null }],
    [
      { model: GATEWAY_MODEL, choices: [{ delta: { content: "x".repeat(20_000) }, finish_reason: "stop" }], usage: null },
      { model: GATEWAY_MODEL, choices: [], usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 } },
    ],
    [
      { model: GATEWAY_MODEL, choices: [{ delta: { content: "x" }, finish_reason: "stop" }], usage: null },
      { model: GATEWAY_MODEL, choices: [], usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 9 } },
    ],
  ];

  for (const frames of invalidFrames) {
    let calls = 0;
    const result = await writeWithFallback({
      apiKey: "together-secret",
      systemPrompt: "system",
      userPrompt: "user",
      env: { TWEET_SCORE_GATEWAY_FALLBACK_MODE: "live", TWEET_SCORE_GATEWAY_TEXT_QUALIFIED: "true" },
      gatewayTrustedServerContext: true,
      gatewayOidcTokenProvider: async () => "oidc",
      fetchImpl: async () => {
        calls += 1;
        if (calls < 3) return new Response("unavailable", { status: 503 });
        return new Response(
          `${frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("")}data: [DONE]\n\n`,
          { headers: { "content-type": "text/event-stream" } },
        );
      },
    });
    assert.equal(result.ok, false);
    assert.equal(calls, 3);
  }
});
