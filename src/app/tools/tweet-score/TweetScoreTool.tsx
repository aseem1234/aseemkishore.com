"use client";

import { useCallback, useState } from "react";
import { MAX_DRAFT_CHARS } from "@/lib/tweet-score";

type ScoreResult = {
  score: number;
  verdict: string;
  roast: string;
  fixes: string[];
};

function scoreColor(score: number): string {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

export default function TweetScoreTool() {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const revokeCard = useCallback(() => {
    setCardUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  async function onScore() {
    setError(null);
    setResult(null);
    revokeCard();
    setLoading(true);
    try {
      const res = await fetch("/api/tools/tweet-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft }),
      });
      const data = (await res.json()) as ScoreResult & { error?: string };
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setResult({
        score: data.score,
        verdict: data.verdict,
        roast: data.roast,
        fixes: data.fixes,
      });
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onShareCard(skipAiBackground = false) {
    if (!result) return;
    setError(null);
    setCardLoading(true);
    revokeCard();
    try {
      const res = await fetch("/api/tools/share-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: result.score,
          verdict: result.verdict,
          roast: result.roast,
          skipAiBackground,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data.error || "Could not generate share card.");
        return;
      }
      const blob = await res.blob();
      setCardUrl(URL.createObjectURL(blob));
    } catch {
      setError("Network error generating share card.");
    } finally {
      setCardLoading(false);
    }
  }

  async function copyRoast() {
    if (!result) return;
    const text = `I scored ${result.score}/100 on the Tweet Flops-o-Meter: "${result.verdict}"\n\n${result.roast}\n\nTry yours → https://aseemkishore.com/tools/tweet-score`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareIntent = result
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `I scored ${result.score}/100 on the Tweet Flops-o-Meter — ${result.verdict}\n\nTry yours: https://aseemkishore.com/tools/tweet-score`,
      )}`
    : null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
        aseemkishore.com/tools
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
        Tweet Flops-o-Meter
      </h1>
      <p className="mt-4 text-lg text-zinc-400">
        Paste a draft. Get scored, roasted, and a shareable card — in seconds.
      </p>

      <label htmlFor="draft" className="sr-only">
        Draft tweet
      </label>
      <textarea
        id="draft"
        value={draft}
        onChange={(e) => setDraft(e.target.value.slice(0, MAX_DRAFT_CHARS))}
        rows={5}
        placeholder="Paste your draft tweet here…"
        className="mt-10 w-full resize-y rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-base text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="mt-2 flex items-center justify-between text-sm text-zinc-500">
        <span>
          {draft.length}/{MAX_DRAFT_CHARS}
        </span>
      </div>

      <button
        type="button"
        onClick={onScore}
        disabled={loading || !draft.trim()}
        className="mt-4 w-full rounded-xl bg-blue-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {loading ? "Scoring…" : "Score my draft"}
      </button>

      {error && (
        <p className="mt-6 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-10 space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          <div>
            <p
              className={`text-6xl font-extrabold tracking-tight sm:text-7xl ${scoreColor(result.score)}`}
            >
              {result.score}
              <span className="text-2xl font-semibold text-zinc-600">
                /100
              </span>
            </p>
            <p className="mt-3 text-2xl font-semibold text-zinc-100">
              {result.verdict}
            </p>
            <p className="mt-4 text-zinc-400 leading-relaxed">{result.roast}</p>
          </div>

          {result.fixes.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Fix it
              </h2>
              <ul className="mt-3 space-y-2">
                {result.fixes.map((fix) => (
                  <li
                    key={fix}
                    className="flex gap-2 text-zinc-300 leading-relaxed"
                  >
                    <span className="text-blue-400">→</span>
                    <span>{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-6">
            <button
              type="button"
              onClick={() => onShareCard(false)}
              disabled={cardLoading}
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white disabled:opacity-40"
            >
              {cardLoading ? "Making card…" : "Make share card"}
            </button>
            <button
              type="button"
              onClick={() => onShareCard(true)}
              disabled={cardLoading}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 disabled:opacity-40"
            >
              Fast card (no AI art)
            </button>
            <button
              type="button"
              onClick={copyRoast}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
            >
              {copied ? "Copied!" : "Copy roast"}
            </button>
            {shareIntent && (
              <a
                href={shareIntent}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
              >
                Post on X
              </a>
            )}
          </div>

          {cardUrl && (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cardUrl}
                alt={`Flops-o-Meter score ${result.score}`}
                className="w-full max-w-md rounded-xl border border-zinc-700"
              />
              <a
                href={cardUrl}
                download={`tweet-score-${result.score}.png`}
                className="inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Download PNG
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
