import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zebboy — AI Chatbot Trained on Your Documents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* Chat bubble mockup */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            background: "white",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            opacity: 0.92,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>AI Assistant</span>
              <span style={{ fontSize: 11, color: "#22c55e" }}>● Online</span>
            </div>
          </div>
          <div
            style={{
              background: "#f3f4f6",
              borderRadius: 12,
              padding: "8px 14px",
              fontSize: 13,
              color: "#374151",
              maxWidth: 220,
            }}
          >
            Hi! How can I help you? 👋
          </div>
          <div
            style={{
              background: "#2563eb",
              borderRadius: 12,
              padding: "8px 14px",
              fontSize: 13,
              color: "white",
              alignSelf: "flex-end",
              maxWidth: 200,
            }}
          >
            What's your return policy?
          </div>
          <div
            style={{
              background: "#f3f4f6",
              borderRadius: 12,
              padding: "8px 14px",
              fontSize: 13,
              color: "#374151",
              maxWidth: 240,
            }}
          >
            We offer 30-day returns on all orders!
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingLeft: 100,
            paddingRight: 400,
            width: "100%",
          }}
        >
          {/* Badge */}
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 100,
              padding: "6px 18px",
              fontSize: 14,
              fontWeight: 600,
              color: "white",
              marginBottom: 28,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            AI-powered customer support
          </div>

          {/* Logo / brand */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "white",
              letterSpacing: -2,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            Zebboy
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.35,
              marginBottom: 40,
              maxWidth: 520,
            }}
          >
            A chatbot trained on your documents, ready in minutes.
          </div>

          {/* Pills */}
          <div style={{ display: "flex", gap: 12 }}>
            {["Upload docs", "Customize bot", "Embed in 1 line"].map((label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 15,
                  color: "white",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 100,
            fontSize: 15,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 500,
          }}
        >
          zebboy.com · Free to start
        </div>
      </div>
    ),
    { ...size }
  );
}
