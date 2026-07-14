/**
 * Simple in-memory per-IP rate limiter for serverless.
 * Soft limit: each warm instance tracks its own bucket (good enough for cost control).
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(args: {
  key: string;
  limit: number;
  windowMs: number;
}): { ok: true; remaining: number } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const existing = buckets.get(args.key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(args.key, { count: 1, resetAt: now + args.windowMs });
    return { ok: true, remaining: args.limit - 1 };
  }

  if (existing.count >= args.limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true, remaining: args.limit - existing.count };
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") || "unknown";
}
