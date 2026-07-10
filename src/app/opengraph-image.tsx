import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b0b14 0%, #14122b 55%, #1c1440 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6d5bf6 0%, #3d2fc9 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 5.5V11c0 5.25 3.4 9.9 8 11 4.6-1.1 8-5.75 8-11V5.5L12 2Z" fill="white" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "white", fontWeight: 700, letterSpacing: -1 }}>
            ThreatForge
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 58, color: "white", fontWeight: 700, maxWidth: 980, lineHeight: 1.15 }}>
          AI-Powered Threat Intelligence &amp; Security Operations
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#a9a4d6", maxWidth: 820 }}>
          Detect, investigate, and respond to threats across your entire attack surface in real time.
        </div>
      </div>
    ),
    { ...size },
  );
}
