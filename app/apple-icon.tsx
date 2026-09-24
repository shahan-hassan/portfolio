import { ImageResponse } from "next/og";

// Apple touch icon metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #070607 0%, #171517 100%)", // Obsidian gradient
          border: "4px solid rgba(252, 80, 0, 0.4)", // Ember rim
          borderRadius: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(252, 80, 0, 0.25)",
          }}
        />

        {/* Monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
            borderRadius: "26px",
            background: "#fc5000",
            boxShadow: "0 8px 30px rgba(252, 80, 0, 0.3)",
          }}
        >
          <span
            style={{
              color: "#070607",
              fontSize: 68,
              fontWeight: 900,
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 1,
            }}
          >
            S
          </span>
        </div>

        {/* Sulfur accent */}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#f5f28e",
            }}
          />
          <span
            style={{
              color: "#e2e2df",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "1.5px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textTransform: "uppercase",
            }}
          >
            SHAHAN
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
