/** Together chat client with a default-off, OIDC-backed final Gateway leg. */

import { createHash, randomUUID } from "node:crypto";
import { getVercelOidcToken } from "@vercel/oidc";

const API_URL = "https://api.together.xyz/v1/chat/completions";
export const GATEWAY_API_URL =
  "https://ai-gateway.vercel.sh/v1/chat/completions";
export const GATEWAY_MODEL = "alibaba/qwen3.7-max";
const GATEWAY_PROVIDER = "alibaba";

const NO_THINKING = {
  chat_template_kwargs: { enable_thinking: false },
  reasoning: { enabled: false },
};

const STREAM_REQUIRED_RE = /only supports streaming/i;
const BAD_TEMPLATE_KWARGS_RE =
  /chat_template_kwargs|enable_thinking|template|reasoning/i;

const REQUEST_TIMEOUT_MS = Number(process.env.TOGETHER_TIMEOUT_MS) || 75_000;
const GATEWAY_CHAIN_DIRECT_LEG_TIMEOUT_MS = 15_000;
const GATEWAY_RESPONSE_LIMIT = 32 * 1024;
const MAX_GATEWAY_FRAMES = 256;

const GATEWAY_PRIVACY_OPTIONS = Object.freeze({
  gateway: Object.freeze({
    zeroDataRetention: true,
    disallowPromptTraining: true,
    only: Object.freeze([GATEWAY_PROVIDER]),
  }),
});

const streamOnly = new Set<string>();
const rejectsTemplateKwargs = new Set<string>();

export const WRITER = process.env.WRITER_MODEL || "Qwen/Qwen3.7-Max";
export const WRITER_FALLBACK =
  process.env.WRITER_FALLBACK_MODEL || "zai-org/GLM-5.2";

const MODEL_HINTS: Record<string, { stream?: boolean }> = {
  "Qwen/Qwen3.7-Max": { stream: true },
};

export function configFor(id: string) {
  return { stream: MODEL_HINTS[id]?.stream === true };
}

function deltaContent(payload: string): string | null {
  if (!payload || payload === "[DONE]") return null;
  let frame: {
    choices?: Array<{ delta?: { content?: string } }>;
  };
  try {
    frame = JSON.parse(payload);
  } catch {
    return null;
  }
  const d = frame.choices?.[0]?.delta;
  if (!d) return null;
  return typeof d.content === "string" && d.content ? d.content : null;
}

async function readSSE(body: ReadableStream<Uint8Array>): Promise<string> {
  const decoder = new TextDecoder();
  const reader = body.getReader();
  let buf = "";
  const parts: string[] = [];

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith("data:")) continue;
      const piece = deltaContent(line.slice(5).trim());
      if (piece) parts.push(piece);
    }
  }

  buf += decoder.decode();
  const tail = buf.trim();
  if (tail.startsWith("data:")) {
    const piece = deltaContent(tail.slice(5).trim());
    if (piece) parts.push(piece);
  }
  return parts.join("");
}

type AttemptResult =
  | { ok: true; content: string }
  | {
      ok: false;
      status?: number;
      error: string;
      raw?: string;
      failure: FailureDetails;
    };

type FailureDetails = {
  status?: number;
  code?: string;
  name?: string;
  source: string;
};

async function attempt(args: {
  apiKey: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature: number;
  maxTokens: number;
  params: Record<string, unknown>;
  extraBody: Record<string, unknown>;
  stream: boolean;
  fetchImpl: typeof fetch;
  deadlineAt?: number;
}): Promise<AttemptResult> {
  const timeoutMs = Number.isFinite(args.deadlineAt)
    ? Math.min(
        REQUEST_TIMEOUT_MS,
        Math.max(0, Math.floor((args.deadlineAt as number) - Date.now())),
      )
    : REQUEST_TIMEOUT_MS;
  if (!timeoutMs) {
    return {
      ok: false,
      error: "request deadline exhausted",
      failure: { name: "TimeoutError", source: "request_deadline" },
    };
  }
  const body = {
    model: args.model,
    messages: args.messages,
    temperature: args.temperature,
    max_tokens: args.maxTokens,
    ...args.params,
    ...args.extraBody,
    ...(args.stream ? { stream: true } : {}),
  };

  const response = await args.fetchImpl(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return {
      ok: false,
      status: response.status,
      error: `Together API ${response.status}: ${text.slice(0, 300)}`,
      raw: text,
      failure: { status: response.status, source: "together_http" },
    };
  }

  if (args.stream) {
    if (!response.body) {
      return {
        ok: false,
        status: 200,
        error: "streaming requested but no response body",
        raw: "",
        failure: { status: 200, source: "together_response" },
      };
    }
    return { ok: true, content: await readSSE(response.body) };
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return { ok: true, content: data.choices?.[0]?.message?.content || "" };
}

export type ChatResult =
  | { ok: true; content: string; error: null }
  | { ok: false; content?: string; error: string };

export async function chat(args: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  config?: { stream?: boolean };
  temperature?: number;
  maxTokens?: number;
  extraBody?: Record<string, unknown>;
  fetchImpl?: typeof fetch;
  includeFailureDetails?: boolean;
  deadlineAt?: number;
}): Promise<ChatResult> {
  const messages = [
    { role: "system", content: args.systemPrompt },
    { role: "user", content: args.userPrompt },
  ];
  const model = args.model;
  let stream = args.config?.stream === true || streamOnly.has(model);
  let params: Record<string, unknown> = rejectsTemplateKwargs.has(model)
    ? {}
    : NO_THINKING;

  try {
    let retried429 = false;
    for (let i = 0; i < 4; i++) {
      const r = await attempt({
        apiKey: args.apiKey,
        model,
        messages,
        temperature: args.temperature ?? 0.7,
        maxTokens: args.maxTokens ?? 4096,
        params,
        extraBody: args.extraBody ?? {},
        stream,
        fetchImpl: args.fetchImpl ?? fetch,
        deadlineAt: args.deadlineAt,
      });

      if (!r.ok && r.status === 429 && !retried429) {
        retried429 = true;
        await new Promise((res) =>
          setTimeout(res, 1500 + Math.floor(Math.random() * 1000)),
        );
        continue;
      }
      if (
        !r.ok &&
        r.status === 400 &&
        !stream &&
        STREAM_REQUIRED_RE.test(r.raw || "")
      ) {
        streamOnly.add(model);
        stream = true;
        continue;
      }
      if (
        !r.ok &&
        r.status === 400 &&
        Object.keys(params).length &&
        BAD_TEMPLATE_KWARGS_RE.test(r.raw || "")
      ) {
        rejectsTemplateKwargs.add(model);
        params = {};
        continue;
      }
      if (!r.ok) return failureResult(r, args.includeFailureDetails);

      const content = r.content || "";
      return content.trim()
        ? { ok: true, content, error: null }
        : failureResult(
            {
              content,
              error: "empty completion",
              failure: { source: "completion" },
            },
            args.includeFailureDetails,
          );
    }
    return { ok: false, error: `exhausted retries for ${model}` };
  } catch (err) {
    const details = errorMetadata(err);
    return failureResult(
      {
        error: `request failed: ${details.message}`,
        failure: {
          code: details.code,
          name: details.name,
          source: "request_exception",
        },
      },
      args.includeFailureDetails,
    );
  }
}

type InternalChatFailure = ChatResult & { _failure?: FailureDetails };

function failureResult(
  result: { content?: string; error: string; failure: FailureDetails },
  includeFailureDetails?: boolean,
): ChatResult {
  const failure: InternalChatFailure = {
    ok: false,
    ...(Object.hasOwn(result, "content") ? { content: result.content } : {}),
    error: result.error,
  };
  if (includeFailureDetails) {
    Object.defineProperty(failure, "_failure", {
      value: result.failure,
      enumerable: false,
    });
  }
  return failure;
}

function errorMetadata(error: unknown): {
  message: string;
  code?: string;
  name?: string;
} {
  const err = error && typeof error === "object" ? error : null;
  const cause = err && "cause" in err && err.cause && typeof err.cause === "object"
    ? err.cause
    : null;
  const message = error instanceof Error ? error.message : String(error);
  const code =
    (err && "code" in err && typeof err.code === "string" ? err.code : undefined) ??
    (cause && "code" in cause && typeof cause.code === "string" ? cause.code : undefined);
  const outerName = err && "name" in err && typeof err.name === "string" ? err.name : undefined;
  const causeName = cause && "name" in cause && typeof cause.name === "string" ? cause.name : undefined;
  return {
    message,
    code,
    name: outerName === "TypeError" && causeName ? causeName : outerName ?? causeName,
  };
}

export function isGatewayEligible(failure?: FailureDetails): boolean {
  if (!failure) return false;
  const status = Number(failure.status);
  if ([401, 402, 403, 429].includes(status)) {
    return failure.source === "together_http";
  }
  if (status >= 500 && status < 600) return failure.source === "together_http";
  return (
    ["TimeoutError", "AbortError", "ConnectTimeoutError"].includes(
      failure.name ?? "",
    ) ||
    [
      "ETIMEDOUT",
      "UND_ERR_CONNECT_TIMEOUT",
      "ENOTFOUND",
      "ECONNRESET",
      "ECONNREFUSED",
      "EAI_AGAIN",
      "UND_ERR_SOCKET",
    ].includes(failure.code ?? "")
  );
}

function directLegDeadline(chainDeadlineAt?: number): number | undefined {
  if (!Number.isFinite(chainDeadlineAt)) return undefined;
  return Math.min(
    chainDeadlineAt as number,
    Date.now() + GATEWAY_CHAIN_DIRECT_LEG_TIMEOUT_MS,
  );
}

function gatewayMode(env: NodeJS.ProcessEnv): "off" | "shadow" | "live" {
  const value = String(env.TWEET_SCORE_GATEWAY_FALLBACK_MODE ?? "")
    .trim()
    .toLowerCase();
  return value === "shadow" || value === "live" ? value : "off";
}

function isGatewayQualified(env: NodeJS.ProcessEnv): boolean {
  return env.TWEET_SCORE_GATEWAY_TEXT_QUALIFIED === "true";
}

function gatewayFailureClass(failure?: FailureDetails): string | null {
  if (!failure) return null;
  const status = Number(failure.status);
  if (status) return `status_${status}`;
  if (["TimeoutError", "AbortError", "ConnectTimeoutError"].includes(failure.name ?? "")) {
    return "timeout";
  }
  return failure.source || "unknown";
}

export type GatewayTelemetry = {
  transport: "vercel-ai-gateway-openai-compatible";
  requested_model: string;
  requested_provider: string;
  resolved_model: string | null;
  resolved_provider: null;
  chain_attempt: 3 | null;
  outcome: string;
  failure_class: string | null;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number } | null;
  gateway_attempted: boolean;
  output_hash: string | null;
  run_id: string;
  deployment_id: string | null;
  side_effect_state: "shadow_discarded" | "not_persisted_by_adapter";
};

function emitGatewayTelemetry(
  event: GatewayTelemetry,
  sink?: (event: GatewayTelemetry) => unknown,
): void {
  try {
    const result = sink ? sink(event) : console.info("tweet_score_gateway_attempt", JSON.stringify(event));
    Promise.resolve(result).catch(() => console.warn("tweet_score_gateway_telemetry_failed"));
  } catch {
    console.warn("tweet_score_gateway_telemetry_failed");
  }
}

type GatewayResult =
  | {
      ok: true;
      content: string;
      resolvedModel: string;
      usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
      attempted: true;
    }
  | { ok: false; error: string; failure: FailureDetails; attempted: boolean };

function validUsage(value: unknown):
  | { prompt_tokens: number; completion_tokens: number; total_tokens: number }
  | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const usage = value as Record<string, unknown>;
  const prompt = usage.prompt_tokens;
  const completion = usage.completion_tokens;
  const total = usage.total_tokens;
  if (
    !Number.isSafeInteger(prompt) ||
    !Number.isSafeInteger(completion) ||
    !Number.isSafeInteger(total) ||
    (prompt as number) < 1 ||
    (completion as number) < 1 ||
    (total as number) !== (prompt as number) + (completion as number) ||
    (prompt as number) > 2_048 ||
    (completion as number) > 512
  ) {
    return null;
  }
  return {
    prompt_tokens: prompt as number,
    completion_tokens: completion as number,
    total_tokens: total as number,
  };
}

async function readGatewaySse(response: Response): Promise<GatewayResult> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("text/event-stream") || !response.body) {
    return {
      ok: false,
      error: "Gateway response content type is invalid",
      failure: { source: "gateway_response" },
      attempted: true,
    };
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let raw = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    raw += decoder.decode(value, { stream: true });
    if (Buffer.byteLength(raw, "utf8") > GATEWAY_RESPONSE_LIMIT) {
      void reader.cancel();
      return {
        ok: false,
        error: "Gateway response exceeded the byte limit",
        failure: { source: "gateway_response" },
        attempted: true,
      };
    }
  }
  raw += decoder.decode();

  const lines = raw.replace(/\r\n?/g, "\n").split("\n").filter(Boolean);
  if (!lines.length || lines.length > MAX_GATEWAY_FRAMES) {
    return { ok: false, error: "Gateway SSE frame count is invalid", failure: { source: "gateway_response" }, attempted: true };
  }
  let done = false;
  let finishReason: string | null = null;
  let usage: ReturnType<typeof validUsage> = null;
  const pieces: string[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith("data:")) {
      return { ok: false, error: "Gateway SSE line is invalid", failure: { source: "gateway_response" }, attempted: true };
    }
    const payload = line.slice(5).trim();
    if (payload === "[DONE]") {
      if (done || index !== lines.length - 1) {
        return { ok: false, error: "Gateway SSE terminator is invalid", failure: { source: "gateway_response" }, attempted: true };
      }
      done = true;
      continue;
    }
    let frame: Record<string, unknown>;
    try {
      frame = JSON.parse(payload) as Record<string, unknown>;
    } catch {
      return { ok: false, error: "Gateway SSE JSON is invalid", failure: { source: "gateway_response" }, attempted: true };
    }
    const choices = frame.choices;
    if (done || frame.model !== GATEWAY_MODEL || !Array.isArray(choices) || choices.length > 1) {
      return { ok: false, error: "Gateway response shape is invalid", failure: { source: "gateway_response" }, attempted: true };
    }
    if (choices.length === 0) {
      usage = validUsage(frame.usage);
      if (!usage || finishReason !== "stop") {
        return { ok: false, error: "Gateway usage is invalid", failure: { source: "gateway_response" }, attempted: true };
      }
      continue;
    }
    if (usage || frame.usage != null) {
      return { ok: false, error: "Gateway usage position is invalid", failure: { source: "gateway_response" }, attempted: true };
    }
    const choice = choices[0] as Record<string, unknown>;
    const delta = choice.delta;
    if (!delta || typeof delta !== "object" || Array.isArray(delta)) {
      return { ok: false, error: "Gateway response delta is invalid", failure: { source: "gateway_response" }, attempted: true };
    }
    const deltaRecord = delta as Record<string, unknown>;
    if (
      Object.hasOwn(deltaRecord, "tool_calls") ||
      Object.hasOwn(deltaRecord, "function_call") ||
      Object.hasOwn(deltaRecord, "reasoning") ||
      Object.hasOwn(deltaRecord, "reasoning_content") ||
      (Object.hasOwn(deltaRecord, "role") && deltaRecord.role !== "assistant") ||
      (Object.hasOwn(deltaRecord, "content") && typeof deltaRecord.content !== "string")
    ) {
      return { ok: false, error: "Gateway response delta is invalid", failure: { source: "gateway_response" }, attempted: true };
    }
    if (deltaRecord.content) pieces.push(deltaRecord.content as string);
    if (choice.finish_reason != null) {
      if (finishReason || choice.finish_reason !== "stop") {
        return { ok: false, error: "Gateway finish reason is invalid", failure: { source: "gateway_response" }, attempted: true };
      }
      finishReason = "stop";
    }
  }
  const content = pieces.join("");
  if (!done || finishReason !== "stop" || !usage || !content.trim() || Buffer.byteLength(content, "utf8") > 16 * 1024) {
    return { ok: false, error: "Gateway completion is invalid", failure: { source: "gateway_response" }, attempted: true };
  }
  return { ok: true, content, resolvedModel: GATEWAY_MODEL, usage, attempted: true };
}

async function gatewayAttempt(args: {
  token: string;
  systemPrompt: string;
  userPrompt: string;
  temperature: number;
  maxTokens: number;
  extraBody: Record<string, unknown>;
  fetchImpl: typeof fetch;
  deadlineAt?: number;
}): Promise<GatewayResult> {
  const timeoutMs = Number.isFinite(args.deadlineAt)
    ? Math.min(
        25_000,
        Math.max(0, Math.floor((args.deadlineAt as number) - Date.now())),
      )
    : Math.min(25_000, REQUEST_TIMEOUT_MS);
  if (!timeoutMs) {
    return {
      ok: false,
      error: "Gateway request deadline exhausted",
      failure: { name: "TimeoutError", source: "gateway_deadline" },
      attempted: false,
    };
  }
  let response: Response;
  try {
    response = await args.fetchImpl(GATEWAY_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.token}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      redirect: "error",
      body: JSON.stringify({
        ...args.extraBody,
        ...NO_THINKING,
        model: GATEWAY_MODEL,
        messages: [
          { role: "system", content: args.systemPrompt },
          { role: "user", content: args.userPrompt },
        ],
        temperature: args.temperature,
        max_tokens: args.maxTokens,
        stream: true,
        stream_options: { include_usage: true },
        providerOptions: GATEWAY_PRIVACY_OPTIONS,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    const details = errorMetadata(error);
    return { ok: false, error: "Gateway request failed", failure: { code: details.code, name: details.name, source: "gateway_exception" }, attempted: true };
  }
  if (!response.ok) {
    void response.body?.cancel();
    return { ok: false, error: `Vercel AI Gateway ${response.status}`, failure: { status: response.status, source: "gateway_http" }, attempted: true };
  }
  try {
    return await readGatewaySse(response);
  } catch {
    return {
      ok: false,
      error: "Gateway response stream failed",
      failure: { source: "gateway_response" },
      attempted: true,
    };
  }
}

/** Primary writer with automatic fallback. */
export async function writeWithFallback(args: {
  apiKey: string;
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  extraBody?: Record<string, unknown>;
  model?: string;
  env?: NodeJS.ProcessEnv;
  gatewayTrustedServerContext?: boolean;
  gatewayOidcTokenProvider?: () => Promise<string>;
  gatewayRunId?: string;
  onGatewayTelemetry?: (event: GatewayTelemetry) => unknown;
  fetchImpl?: typeof fetch;
}): Promise<ChatResult & { model?: string; usedFallback?: boolean }> {
  const env = args.env ?? process.env;
  const primary = args.model || (args.env?.WRITER_MODEL || WRITER);
  const mode = gatewayMode(env);
  const gatewayConfigured =
    !args.model &&
    primary === "Qwen/Qwen3.7-Max" &&
    mode !== "off" &&
    isGatewayQualified(env) &&
    args.gatewayTrustedServerContext === true;
  // The route has a 60-second ceiling. When Gateway is configured, reserve
  // five seconds for parsing and share the remainder across all serial legs.
  // Off mode retains the legacy per-attempt timeout exactly.
  const deadlineAt = gatewayConfigured ? Date.now() + 55_000 : undefined;
  const first = await chat({
    apiKey: args.apiKey,
    model: primary,
    systemPrompt: args.systemPrompt,
    userPrompt: args.userPrompt,
    config: configFor(primary),
    temperature: args.temperature,
    maxTokens: args.maxTokens,
    extraBody: args.extraBody,
    fetchImpl: args.fetchImpl,
    includeFailureDetails: true,
    deadlineAt: directLegDeadline(deadlineAt),
  });

  if (first.ok || args.model) {
    return { ...first, model: primary, usedFallback: false };
  }

  const fallback = WRITER_FALLBACK;
  const second = await chat({
    apiKey: args.apiKey,
    model: fallback,
    systemPrompt: args.systemPrompt,
    userPrompt: args.userPrompt,
    config: configFor(fallback),
    temperature: args.temperature,
    maxTokens: args.maxTokens,
    extraBody: args.extraBody,
    fetchImpl: args.fetchImpl,
    includeFailureDetails: true,
    deadlineAt: directLegDeadline(deadlineAt),
  });
  if (second.ok) return { ...second, model: fallback, usedFallback: true };

  const secondFailure = (second as InternalChatFailure)._failure;
  const finalOnlyEligible =
    gatewayConfigured &&
    isGatewayEligible((first as InternalChatFailure)._failure) &&
    isGatewayEligible(secondFailure);
  if (!finalOnlyEligible) return { ...second, model: fallback, usedFallback: true };

  let token: string | null = null;
  try {
    const value = await (args.gatewayOidcTokenProvider ?? getVercelOidcToken)();
    token = typeof value === "string" ? value.trim() || null : null;
  } catch {
    token = null;
  }
  const gateway = token
    ? await gatewayAttempt({
        token,
        systemPrompt: args.systemPrompt,
        userPrompt: args.userPrompt,
        temperature: args.temperature ?? 0.7,
        maxTokens: args.maxTokens ?? 4096,
        extraBody: args.extraBody ?? {},
        fetchImpl: args.fetchImpl ?? fetch,
        deadlineAt,
      })
    : {
        ok: false as const,
        error: "Vercel OIDC token is unavailable",
        failure: { source: "gateway_auth_preflight" },
        attempted: false,
      };
  const outcome = mode === "shadow"
    ? gateway.ok ? "shadow" : "shadow_error"
    : gateway.ok ? "final_failover" : "error";
  emitGatewayTelemetry(
    {
      transport: "vercel-ai-gateway-openai-compatible",
      requested_model: GATEWAY_MODEL,
      requested_provider: GATEWAY_PROVIDER,
      resolved_model: gateway.ok ? gateway.resolvedModel : null,
      resolved_provider: null,
      chain_attempt: gateway.attempted ? 3 : null,
      outcome,
      failure_class: gateway.ok ? null : gatewayFailureClass(gateway.failure),
      usage: gateway.ok ? gateway.usage : null,
      gateway_attempted: gateway.attempted,
      output_hash: gateway.ok ? createHash("sha256").update(gateway.content).digest("hex") : null,
      run_id: args.gatewayRunId ?? randomUUID(),
      deployment_id: env.VERCEL_DEPLOYMENT_ID ?? null,
      side_effect_state: mode === "shadow" ? "shadow_discarded" : "not_persisted_by_adapter",
    },
    args.onGatewayTelemetry,
  );
  if (mode === "shadow" || !gateway.ok) {
    return { ok: false, error: second.error, model: fallback, usedFallback: true };
  }
  return { ok: true, content: gateway.content, error: null, model: GATEWAY_MODEL, usedFallback: true };
}

export function _resetLearned(): void {
  streamOnly.clear();
  rejectsTemplateKwargs.clear();
}
