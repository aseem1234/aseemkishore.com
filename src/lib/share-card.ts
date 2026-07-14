import OpenAI from "openai";
import sharp from "sharp";

export type ShareCardInput = {
  score: number;
  verdict: string;
  roast: string;
};

const SIZE = "1024x1024" as const;

function imageQuality(): "low" | "medium" | "high" {
  const q = (process.env.IMAGE_QUALITY || "medium").toLowerCase();
  if (q === "low" || q === "high") return q;
  return "medium";
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    } else {
      current = next;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines.slice(0, maxLines);
}

function scoreColor(score: number): string {
  if (score >= 70) return "#34d399";
  if (score >= 40) return "#fbbf24";
  return "#f87171";
}

function buildOverlaySvg(input: ShareCardInput): Buffer {
  const color = scoreColor(input.score);
  const verdict = escapeXml(input.verdict.slice(0, 60));
  const roastLines = wrapText(input.roast, 42, 3).map(escapeXml);

  const roastTspans = roastLines
    .map(
      (line, i) =>
        `<tspan x="72" dy="${i === 0 ? 0 : 36}">${line}</tspan>`,
    )
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0f" stop-opacity="0.35"/>
      <stop offset="55%" stop-color="#0a0a0f" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#scrim)"/>
  <text x="72" y="120" fill="#a1a1aa" font-family="ui-sans-serif, system-ui, sans-serif" font-size="28" font-weight="600" letter-spacing="2">TWEET FLOPS-O-METER</text>
  <text x="72" y="320" fill="${color}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="180" font-weight="800">${input.score}<tspan font-size="64" fill="#71717a" dy="-80">/100</tspan></text>
  <text x="72" y="420" fill="#f4f4f5" font-family="ui-sans-serif, system-ui, sans-serif" font-size="40" font-weight="700">${verdict}</text>
  <text x="72" y="520" fill="#d4d4d8" font-family="ui-sans-serif, system-ui, sans-serif" font-size="28" font-weight="400">${roastTspans}</text>
  <text x="72" y="940" fill="#52525b" font-family="ui-sans-serif, system-ui, sans-serif" font-size="24" font-weight="500">aseemkishore.com/tools</text>
</svg>`;

  return Buffer.from(svg);
}

async function generateBackground(
  openai: OpenAI,
  input: ShareCardInput,
): Promise<Buffer> {
  const quality = imageQuality();
  const vibe =
    input.score >= 70
      ? "triumphant neon aurora over a dark city skyline"
      : input.score >= 40
        ? "stormy twilight clouds with a faint orange glow"
        : "lonely rainy neon street at night, muted red accents";

  const prompt = `Abstract atmospheric background for a social media score card. Mood: ${vibe}. Dark cinematic palette (#0a0a0f base), subtle grain, no people, no faces, no logos, absolutely no text letters numbers or watermarks anywhere in the image. Soft bokeh lights. 1:1 square.`;

  const models = ["gpt-image-2", "gpt-image-1.5"] as const;
  let lastError: unknown;

  for (const model of models) {
    try {
      const response = await openai.images.generate({
        model,
        prompt,
        n: 1,
        size: SIZE,
        quality,
        output_format: "png",
      });
      const b64 = response.data?.[0]?.b64_json;
      if (!b64) throw new Error("No image data returned");
      return Buffer.from(b64, "base64");
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Image generation failed");
}

/** Fallback dark gradient if OpenAI is unavailable. */
async function solidBackground(): Promise<Buffer> {
  return sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 3,
      background: { r: 10, g: 10, b: 15 },
    },
  })
    .png()
    .toBuffer();
}

export async function composeShareCard(
  input: ShareCardInput,
  options?: { skipAiBackground?: boolean },
): Promise<{ buffer: Buffer; usedAiBackground: boolean }> {
  let usedAiBackground = false;
  let bg: Buffer;

  if (options?.skipAiBackground || !process.env.OPENAI_API_KEY) {
    bg = await solidBackground();
  } else {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      bg = await generateBackground(openai, input);
      usedAiBackground = true;
    } catch {
      bg = await solidBackground();
    }
  }

  const overlay = buildOverlaySvg(input);
  const buffer = await sharp(bg)
    .resize(1024, 1024, { fit: "cover" })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toBuffer();

  return { buffer, usedAiBackground };
}
