export type TweetScoreResult = {
  score: number;
  verdict: string;
  roast: string;
  fixes: string[];
};

export const MAX_DRAFT_CHARS = 500;

const SYSTEM_PROMPT = `You are a blunt but fair X (Twitter) draft critic. Score how likely a draft tweet is to flop vs land.

Rules:
- Be specific to the draft. No generic advice.
- Short and punchy. Verdict max 8 words. Roast max 2 sentences.
- Fixes: 2 or 3 concrete edits (not vague tips).
- Score 0–100 where 0 = guaranteed flop, 100 = banger.
- Prefer honesty over niceness.
- Respond with ONLY a JSON object matching this schema:
{"score":number,"verdict":string,"roast":string,"fixes":string[]}`;

export function buildUserPrompt(draft: string): string {
  return `Score this draft tweet:\n\n"""${draft}"""`;
}

export function parseTweetScore(raw: string): TweetScoreResult | null {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  let data: unknown;
  try {
    data = JSON.parse(trimmed.slice(start, end + 1));
  } catch {
    return null;
  }

  if (!data || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;

  const score = Number(obj.score);
  if (!Number.isFinite(score)) return null;

  const verdict = typeof obj.verdict === "string" ? obj.verdict.trim() : "";
  const roast = typeof obj.roast === "string" ? obj.roast.trim() : "";
  const fixesRaw = Array.isArray(obj.fixes) ? obj.fixes : [];
  const fixes = fixesRaw
    .filter((f): f is string => typeof f === "string")
    .map((f) => f.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (!verdict || !roast || fixes.length < 1) return null;

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    verdict: verdict.slice(0, 80),
    roast: roast.slice(0, 400),
    fixes,
  };
}

export { SYSTEM_PROMPT };
