import { ImageResponse } from "next/og";

export const alt = "TECDEX Compliance, plataforma GRC simple y trazable";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0b1f3a 0%, #123b68 62%, #2563eb 100%)",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1000px",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#7dd3fc",
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.16em",
              marginBottom: 32,
              textTransform: "uppercase",
            }}
          >
            TecDex
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            TECDEX Compliance
          </div>
          <div
            style={{
              color: "#bae6fd",
              display: "flex",
              fontSize: 38,
              lineHeight: 1.25,
              marginTop: 30,
            }}
          >
            Plataforma ISO 27001, 9001 y 42001 en Chile
          </div>
        </div>
      </div>
    ),
    size,
  );
}
