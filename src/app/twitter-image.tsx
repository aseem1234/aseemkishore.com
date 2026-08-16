import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Aseem Kishore — Content Strategy & Editorial Operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const photo = await readFile(join(process.cwd(), "public/images/aseem-kishore.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0f",
          color: "#f4f4f5",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#60a5fa",
            }}
          >
            Content Strategy & Editorial Operations
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
            Aseem Kishore
          </div>
          <div style={{ fontSize: 26, color: "#a1a1aa", marginTop: 24 }}>
            Digital Publishing | AI | Product
          </div>
        </div>
        <img
          src={photoSrc}
          alt=""
          width={280}
          height={280}
          style={{
            width: 280,
            height: 280,
            borderRadius: 24,
            objectFit: "cover",
          }}
        />
      </div>
    ),
    size,
  );
}
