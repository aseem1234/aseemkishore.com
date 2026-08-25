import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          color: "#60a5fa",
          fontSize: 118,
          fontWeight: 700,
          letterSpacing: "-0.06em",
        }}
      >
        A
      </div>
    ),
    size,
  );
}
