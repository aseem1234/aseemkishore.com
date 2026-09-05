import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { defaultPairId, findPair, flipPairs, type FlipPair } from "@/data/flipCoins";
import { coinTitle, parseCoinParams, type CoinParams } from "@/lib/flip-link";

/** Social card for a shared coin link: `/api/tools/flip-og?p=…&h=…&t=…&b=…`. */

const size = { width: 1200, height: 630 };

const FACE_CIRCLE = 220;
// The source art is a round coin on black padding; oversizing inside a clipped
// circle crops that padding away, the same trick the /c page uses with scale-110.
const FACE_IMAGE = 244;

const libertyPair: FlipPair = findPair(defaultPairId) ?? flipPairs[0];

const fallbackParams: CoinParams = {
  pair: libertyPair,
  headsText: null,
  tailsText: null,
  backdrop: null,
};

/**
 * Inlines a face as a data URL. The stem always comes from the catalog, never from
 * the query string, so no caller-supplied path ever reaches the filesystem.
 */
async function faceDataUrl(asset: string): Promise<string> {
  const bytes = await readFile(join(process.cwd(), "public/flip/faces", `${asset}.jpg`));
  return `data:image/jpeg;base64,${bytes.toString("base64")}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = parseCoinParams(searchParams);
  const view = params ?? fallbackParams;

  const [headsSrc, tailsSrc] = await Promise.all([
    faceDataUrl(view.pair.heads),
    faceDataUrl(view.pair.tails),
  ]);

  const faces: { src: string; caption: string }[] = [
    { src: headsSrc, caption: coinTitle("heads", view.headsText) },
    { src: tailsSrc, caption: coinTitle("tails", view.tailsText) },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          background: view.backdrop?.color ?? "#0a0a0f",
        }}
      >
        {/* Scrim, so the lighter backdrops (marble, metal) keep text contrast. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(10, 10, 15, 0.62)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "56px",
            color: "#f4f4f5",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#fcd34d",
            }}
          >
            {params ? "Someone sent you a coin" : "A coin you can mint"}
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, marginTop: 14 }}>{view.pair.name}</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 96, marginTop: 36 }}>
            {faces.map((face) => (
              <div
                key={face.caption}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: FACE_CIRCLE,
                    height: FACE_CIRCLE,
                    borderRadius: FACE_CIRCLE / 2,
                    overflow: "hidden",
                    border: "3px solid rgba(252, 211, 77, 0.65)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only. */}
                  <img
                    src={face.src}
                    alt=""
                    width={FACE_IMAGE}
                    height={FACE_IMAGE}
                    style={{ width: FACE_IMAGE, height: FACE_IMAGE, objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#fde68a",
                    marginTop: 20,
                  }}
                >
                  {face.caption}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#d4d4d8",
              marginTop: 40,
            }}
          >
            Flip
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
