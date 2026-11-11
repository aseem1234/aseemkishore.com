/**
 * Simple in-memory per-IP rate limiter for serverless.
 * Soft limit: each warm instance tracks its own bucket (good enough for cost control).
 */

type Bucket = { count: number; resetAt: number };

export const MAX_RATE_LIMIT_BUCKETS = 4096;

const buckets = new Map<string, Bucket>();

function pruneBucketsIfNeeded(now: number): void {
  if (buckets.size < MAX_RATE_LIMIT_BUCKETS) return;
  for (const [k, v] of buckets) {
    if (now >= v.resetAt) buckets.delete(k);
  }
  while (buckets.size >= MAX_RATE_LIMIT_BUCKETS) {
    const oldest = buckets.keys().next().value;
    if (oldest === undefined) break;
    buckets.delete(oldest);
  }
}

export function rateLimit(args: {
  key: string;
  limit: number;
  windowMs: number;
  now?: number;
}): { ok: true; remaining: number } | { ok: false; retryAfterSec: number } {
  const now = args.now ?? Date.now();
  const existing = buckets.get(args.key);

  if (!existing || now >= existing.resetAt) {
    buckets.delete(args.key);
    pruneBucketsIfNeeded(now);
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
  const realIp = headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}

export function _resetRateLimits(): void {
  buckets.clear();
}

export function _bucketCount(): number {
  return buckets.size;
}
