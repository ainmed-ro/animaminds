import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Fără Haos – Program pentru Profesioniști";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F5F0E8",
          position: "relative",
          fontFamily: "Georgia, serif",
          overflow: "hidden",
        }}
      >
        {/* Background decorative circle top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, #2D4A5C55 0%, transparent 70%)",
          }}
        />
        {/* Background decorative circle bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, #7C9A7E44 0%, transparent 70%)",
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            backgroundColor: "#2D4A5C",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 70px",
            height: "100%",
            zIndex: 1,
          }}
        >
          {/* Top: brand line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#2D4A5C",
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#2D4A5C",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              AnimaMinds
            </span>
          </div>

          {/* Center: Main title block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#2D4A5C",
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              Program AI & Digital
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                color: "#1C2B1E",
                lineHeight: 0.9,
                letterSpacing: -2,
              }}
            >
              AI Fără
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                fontStyle: "italic",
                color: "#2D4A5C",
                lineHeight: 0.9,
                letterSpacing: -2,
              }}
            >
              Haos
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#3D3530",
                marginTop: 12,
                maxWidth: 640,
                lineHeight: 1.4,
              }}
            >
              Folosește AI. Păstrează controlul. Program practic pentru profesioniști.
            </div>
          </div>

          {/* Bottom: tagline + status */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  backgroundColor: "#2D4A5C20",
                  border: "1px solid #2D4A5C50",
                  borderRadius: 12,
                  padding: "10px 20px",
                  fontSize: 16,
                  color: "#1C2B1E",
                  fontWeight: 600,
                }}
              >
                8 ore · Fără cunoștințe tehnice
              </div>
              <div
                style={{
                  backgroundColor: "#2D4A5C20",
                  border: "1px solid #2D4A5C50",
                  borderRadius: 12,
                  padding: "10px 20px",
                  fontSize: 16,
                  color: "#1C2B1E",
                  fontWeight: 600,
                }}
              >
                În curând
              </div>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#2D4A5C",
                fontWeight: 600,
              }}
            >
              animaminds.ro/programe/ai-fara-haos
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
