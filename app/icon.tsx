import { ImageResponse } from "next/og";

// Image metadata exported as required by Next.js file conventions
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070607", // Caldera Obsidian
          borderRadius: "7px",
          border: "1px solid rgba(252, 80, 0, 0.4)", // Ember border
          position: "relative",
        }}
      >
        {/* Kinetic S monogram styled with Caldera Ember */}
        <span
          style={{
            color: "#fc5000",
            fontSize: 21,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.5px",
          }}
        >
          S
        </span>
        {/* Sulfur accent dot */}
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#f5f28e",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
