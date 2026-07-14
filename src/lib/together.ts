/**
 * Thin Together.ai chat client — mirrors skills-api/lib/together.js quirks:
 * streaming-only models, disable thinking by default, 429 retry.
 */

const API_URL = "https://api.together.xyz/v1/chat/completions";

const NO_THINKING = {
  chat_template_kwargs: { enable_thinking: false },
  reasoning: { enabled: false },
};

const STREAM_REQUIRED_RE = /only supports streaming/i;
const BAD_TEMPLATE_KWARGS_RE =
  /chat_template_kwargs|enable_thinking|template|reasoning/i;

const REQUEST_TIMEOUT_MS = Number(process.env.TOGETHER_TIMEOUT_MS) || 75_000;

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
  | { ok: false; status: number; error: string; raw: string };

async function attempt(args: {
  apiKey: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature: number;
  maxTokens: number;
  params: Record<string, unknown>;
  extraBody: Record<string, unknown>;
  stream: boolean;
}): Promise<AttemptResult> {
  const body = {
    model: args.model,
    messages: args.messages,
    temperature: args.temperature,
    max_tokens: args.maxTokens,
    ...args.params,
    ...args.extraBody,
    ...(args.stream ? { stream: true } : {}),
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return {
      ok: false,
      status: response.status,
      error: `Together API ${response.status}: ${text.slice(0, 300)}`,
      raw: text,
    };
  }

  if (args.stream) {
    if (!response.body) {
      return {
        ok: false,
        status: 200,
        error: "streaming requested but no response body",
        raw: "",
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
      if (!r.ok) return { ok: false, error: r.error };

      const content = r.content || "";
      return content.trim()
        ? { ok: true, content, error: null }
        : { ok: false, content, error: "empty completion" };
    }
    return { ok: false, error: `exhausted retries for ${model}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `request failed: ${message}` };
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
}): Promise<ChatResult & { model?: string; usedFallback?: boolean }> {
  const primary = args.model || WRITER;
  const first = await chat({
    apiKey: args.apiKey,
    model: primary,
    systemPrompt: args.systemPrompt,
    userPrompt: args.userPrompt,
    config: configFor(primary),
    temperature: args.temperature,
    maxTokens: args.maxTokens,
    extraBody: args.extraBody,
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
  });

  return { ...second, model: fallback, usedFallback: true };
}
