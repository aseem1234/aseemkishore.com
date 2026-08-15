import { ImageResponse } from "next/og";

export const alt = "Aseem Kishore — Content Strategy & Editorial Operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#0a0a0f",
          color: "#f4f4f5",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#60a5fa",
          }}
        >
          Content Strategy & Editorial Operations
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
          Aseem Kishore
        </div>
        <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 28 }}>
          Digital Publishing | AI | Product
        </div>
      </div>
    ),
    size,
  );
}
