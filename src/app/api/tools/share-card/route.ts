import { NextRequest, NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { composeShareCard } from "@/lib/share-card";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const limited = rateLimit({
    key: `share-card:${ip}`,
    limit: 10,
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const obj = body as Record<string, unknown>;
  const score = Number(obj.score);
  const verdict = typeof obj.verdict === "string" ? obj.verdict.trim() : "";
  const roast = typeof obj.roast === "string" ? obj.roast.trim() : "";
  const skipAiBackground = obj.skipAiBackground === true;

  if (!Number.isFinite(score) || !verdict || !roast) {
    return NextResponse.json(
      { error: "score, verdict, and roast are required." },
      { status: 400 },
    );
  }

  try {
    const { buffer, usedAiBackground } = await composeShareCard(
      {
        score: Math.max(0, Math.min(100, Math.round(score))),
        verdict: verdict.slice(0, 80),
        roast: roast.slice(0, 400),
      },
      { skipAiBackground },
    );

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
        "X-Used-Ai-Background": usedAiBackground ? "1" : "0",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not generate share card." },
      { status: 502 },
    );
  }
}
