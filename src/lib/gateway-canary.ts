import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { getVercelOidcToken } from "@vercel/oidc";

import { GATEWAY_API_URL, GATEWAY_MODEL } from "./together";

export const CANARY_MODEL = GATEWAY_MODEL;
export const CANARY_OUTPUT = "TWEET-SCORE-GATEWAY-CANARY-OK";
const CANARY_PROMPT = `Reply with exactly ${CANARY_OUTPUT} and nothing else.`;
const RESPONSE_LIMIT = 8 * 1024;

type CanaryTelemetry = {
  ok: boolean;
  transport: "vercel-ai-gateway-openai-compatible";
  requested_model: string;
  resolved_model: string | null;
  resolved_provider: null;
  outcome: string;
  failure_class: string | null;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number } | null;
  gateway_attempted: boolean;
  gateway_billing_classification: "metered_gateway" | "unmetered_preflight";
  output_hash: string | null;
  run_id: string;
  deployment_id: string | null;
  side_effect_state: "synthetic_no_persistence";
};

function validUsage(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const usage = value as Record<string, unknown>;
  const prompt = usage.prompt_tokens;
  const completion = usage.completion_tokens;
  const total = usage.total_tokens;
  if (!Number.isSafeInteger(prompt) || !Number.isSafeInteger(completion) || !Number.isSafeInteger(total)
    || (prompt as number) < 1 || (prompt as number) > 128
    || (completion as number) < 1 || (completion as number) > 16
    || (total as number) !== (prompt as number) + (completion as number)) return null;
  return { prompt_tokens: prompt as number, completion_tokens: completion as number, total_tokens: total as number };
}

async function readCanary(response: Response) {
  if (!response.headers.get("content-type")?.toLowerCase().includes("text/event-stream") || !response.body) {
    throw new Error("response_content_type_invalid");
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let raw = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    raw += decoder.decode(value, { stream: true });
    if (Buffer.byteLength(raw, "utf8") > RESPONSE_LIMIT) {
      void reader.cancel();
      throw new Error("response_too_large");
    }
  }
  raw += decoder.decode();
  const lines = raw.replace(/\r\n?/g, "\n").split("\n").filter(Boolean);
  if (!lines.length || lines.length > 32) throw new Error("response_shape_invalid");
  let done = false;
  let finish = false;
  let usage: ReturnType<typeof validUsage> = null;
  const parts: string[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith("data:")) throw new Error("response_shape_invalid");
    const payload = line.slice(5).trim();
    if (payload === "[DONE]") {
      if (done || index !== lines.length - 1) throw new Error("response_shape_invalid");
      done = true;
      continue;
    }
    const frame = JSON.parse(payload) as Record<string, unknown>;
    const choices = frame.choices;
    if (done || frame.model !== CANARY_MODEL || !Array.isArray(choices) || choices.length > 1) throw new Error("response_shape_invalid");
    if (choices.length === 0) {
      usage = validUsage(frame.usage);
      if (!usage || !finish) throw new Error("usage_invalid");
      continue;
    }
    const choice = choices[0] as Record<string, unknown>;
    const delta = choice.delta;
    if (!delta || typeof delta !== "object" || Array.isArray(delta)) throw new Error("response_shape_invalid");
    const d = delta as Record<string, unknown>;
    if (Object.hasOwn(d, "tool_calls") || Object.hasOwn(d, "function_call") || Object.hasOwn(d, "reasoning") || Object.hasOwn(d, "reasoning_content")
      || (Object.hasOwn(d, "role") && d.role !== "assistant")
      || (Object.hasOwn(d, "content") && typeof d.content !== "string")) throw new Error("response_shape_invalid");
    if (d.content) parts.push(d.content as string);
    if (choice.finish_reason != null) {
      if (finish || choice.finish_reason !== "stop") throw new Error("response_shape_invalid");
      finish = true;
    }
  }
  const output = parts.join("");
  if (!done || !finish || !usage || output !== CANARY_OUTPUT) throw new Error("output_mismatch");
  return { output, usage };
}

export async function runGatewayCanary({
  oidcToken,
  fetchImpl = fetch,
  runId = randomUUID(),
  deploymentId = process.env.VERCEL_DEPLOYMENT_ID ?? null,
}: {
  oidcToken: string;
  fetchImpl?: typeof fetch;
  runId?: string;
  deploymentId?: string | null;
}): Promise<CanaryTelemetry> {
  const token = oidcToken.trim();
  if (!token) throw new Error("oidc_missing");
  const response = await fetchImpl(GATEWAY_API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "text/event-stream" },
    redirect: "error",
    signal: AbortSignal.timeout(20_000),
    body: JSON.stringify({
      model: CANARY_MODEL,
      messages: [{ role: "user", content: CANARY_PROMPT }],
      temperature: 0,
      max_tokens: 16,
      chat_template_kwargs: { enable_thinking: false },
      reasoning: { enabled: false },
      stream: true,
      stream_options: { include_usage: true },
      providerOptions: { gateway: { zeroDataRetention: true, disallowPromptTraining: true, only: ["alibaba"] } },
    }),
  });
  if (!response.ok) {
    void response.body?.cancel();
    throw new Error(`gateway_http_${response.status}`);
  }
  const result = await readCanary(response);
  return {
    ok: true,
    transport: "vercel-ai-gateway-openai-compatible",
    requested_model: CANARY_MODEL,
    resolved_model: CANARY_MODEL,
    resolved_provider: null,
    outcome: "canary_success",
    failure_class: null,
    usage: result.usage,
    gateway_attempted: true,
    gateway_billing_classification: "metered_gateway",
    output_hash: createHash("sha256").update(result.output).digest("hex"),
    run_id: runId,
    deployment_id: deploymentId,
    side_effect_state: "synthetic_no_persistence",
  };
}

function authorizedCron(request: Request, secret: string): boolean {
  const expected = secret ? `Bearer ${secret}` : "";
  const actual = request.headers.get("authorization") ?? "";
  if (request.headers.get("user-agent") !== "vercel-cron/1.0" || !expected || !actual) return false;
  const expectedBytes = Buffer.from(expected);
  const actualBytes = Buffer.from(actual);
  return expectedBytes.length === actualBytes.length && timingSafeEqual(expectedBytes, actualBytes);
}

function disabled(failureClass: string): CanaryTelemetry {
  return {
    ok: false,
    transport: "vercel-ai-gateway-openai-compatible",
    requested_model: CANARY_MODEL,
    resolved_model: null,
    resolved_provider: null,
    outcome: "disabled",
    failure_class: failureClass,
    usage: null,
    gateway_attempted: false,
    gateway_billing_classification: "unmetered_preflight",
    output_hash: null,
    run_id: randomUUID(),
    deployment_id: null,
    side_effect_state: "synthetic_no_persistence",
  };
}

function failedAfterDispatch(deploymentId: string | null): CanaryTelemetry {
  return {
    ...disabled("canary_failed"),
    outcome: "error",
    gateway_attempted: true,
    gateway_billing_classification: "metered_gateway",
    deployment_id: deploymentId,
  };
}

export function createGatewayCanaryHandler({
  env = process.env,
  oidcTokenProvider = getVercelOidcToken,
  canaryRunner = runGatewayCanary,
}: {
  env?: NodeJS.ProcessEnv;
  oidcTokenProvider?: () => Promise<string>;
  canaryRunner?: (args: { oidcToken: string; deploymentId: string | null }) => Promise<Record<string, unknown>>;
} = {}) {
  return async function gatewayCanaryHandler(request: Request): Promise<Response> {
    if (request.method !== "GET") return Response.json({ error: "GET only" }, { status: 405 });
    if (!authorizedCron(request, env.CRON_SECRET ?? "")) return Response.json({ error: "Unauthorized" }, { status: 403 });
    if (request.body !== null || new URL(request.url).search) {
      return Response.json({ error: "Request input is not accepted" }, { status: 400 });
    }
    if (env.TWEET_SCORE_GATEWAY_TEXT_QUALIFIED !== "true") return Response.json(disabled("qualification_disabled"));
    if (env.TWEET_SCORE_GATEWAY_CANARY_ARMED !== "true") return Response.json(disabled("canary_not_armed"));
    let token: string;
    try {
      token = (await oidcTokenProvider()).trim();
      if (!token) throw new Error("oidc_missing");
    } catch {
      return Response.json({ ...disabled("canary_failed"), outcome: "error" }, { status: 502 });
    }
    const deploymentId = env.VERCEL_DEPLOYMENT_ID ?? null;
    try {
      return Response.json(await canaryRunner({ oidcToken: token, deploymentId }));
    } catch {
      return Response.json(failedAfterDispatch(deploymentId), { status: 502 });
    }
  };
}
