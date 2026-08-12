import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { writeWithFallback } from "@/lib/together";
import {
  MAX_DRAFT_CHARS,
  SYSTEM_PROMPT,
  buildUserPrompt,
  parseTweetScore,
} from "@/lib/tweet-score";

export const runtime = "nodejs";
export const maxDuration = 60;

type HandlerDependencies = {
  env?: NodeJS.ProcessEnv;
  rateLimiter?: typeof rateLimit;
  writer?: typeof writeWithFallback;
};

export function createTweetScoreHandler({
  env = process.env,
  rateLimiter = rateLimit,
  writer = writeWithFallback,
}: HandlerDependencies = {}) {
  return async function tweetScoreHandler(req: Request) {
    const ip = clientIp(req.headers);
    const limited = rateLimiter({
      key: `tweet-score:${ip}`,
      limit: 20,
      windowMs: 60 * 60 * 1000,
    });
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      );
    }

    const apiKey = env.TOGETHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Scoring is temporarily unavailable." },
        { status: 503 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const draft =
      body &&
      typeof body === "object" &&
      "draft" in body &&
      typeof (body as { draft: unknown }).draft === "string"
        ? (body as { draft: string }).draft.trim()
        : "";

    if (!draft) {
      return NextResponse.json(
        { error: "Paste a draft tweet first." },
        { status: 400 },
      );
    }
    if (draft.length > MAX_DRAFT_CHARS) {
      return NextResponse.json(
        { error: `Draft must be ${MAX_DRAFT_CHARS} characters or fewer.` },
        { status: 400 },
      );
    }

    const result = await writer({
      apiKey,
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: buildUserPrompt(draft),
      temperature: 0.6,
      maxTokens: 512,
      extraBody: { response_format: { type: "json_object" } },
      env,
      gatewayTrustedServerContext: true,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: "Could not score that draft. Try again." },
        { status: 502 },
      );
    }

    const parsed = parseTweetScore(result.content);
    if (!parsed) {
      return NextResponse.json(
        { error: "Could not parse score. Try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ...parsed,
      model: result.model,
    });
  };
}

export const POST = createTweetScoreHandler();
