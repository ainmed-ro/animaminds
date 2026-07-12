import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Busola Deciziilor – Program de Dezvoltare Umană și Profesională";
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
            background: "radial-gradient(circle, #9B7EBD55 0%, transparent 70%)",
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
            background: "linear-gradient(to bottom, #9B7EBD, #7C9A7E)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px 60px 88px",
            height: "100%",
          }}
        >
          {/* Top: AnimaMinds brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#7C9A7E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              A
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#1C2B1E",
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
                color: "#9B7EBD",
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              Program de Dezvoltare
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
              BUSOLA
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                fontStyle: "italic",
                color: "#9B7EBD",
                lineHeight: 0.9,
                letterSpacing: -2,
              }}
            >
              DECIZIILOR
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
              Dezvoltare umană și profesională — claritate și direcție atunci când lucrurile par neclare.
            </div>
          </div>

          {/* Bottom: Dates + tagline */}
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
                  backgroundColor: "#9B7EBD20",
                  border: "1px solid #9B7EBD50",
                  borderRadius: 12,
                  padding: "10px 20px",
                  fontSize: 16,
                  color: "#1C2B1E",
                  fontWeight: 600,
                }}
              >
                4 formate de livrare
              </div>
              <div
                style={{
                  backgroundColor: "#9B7EBD20",
                  border: "1px solid #9B7EBD50",
                  borderRadius: 12,
                  padding: "10px 20px",
                  fontSize: 16,
                  color: "#1C2B1E",
                  fontWeight: 600,
                }}
              >
                📅 4–6 septembrie 2026
              </div>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#7C9A7E",
                fontStyle: "italic",
                textAlign: "right",
                maxWidth: 260,
                lineHeight: 1.5,
              }}
            >
              „Locul unde oamenii și ideile cresc împreună."
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
