"use client";

import { ChipVisualization } from "./ChipVisualization";

export function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(16px, 4vw, 48px)",
        paddingTop: "72px",
        paddingBottom: "clamp(24px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--border) 15%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--border) 15%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(24px, 4vw, 48px)",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="lg:!grid-cols-[7fr_5fr]"
      >
        {/* Chip visualization */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 0.85",
            maxHeight: "min(400px, 55vh)",
            order: -1,
          }}
          className="lg:!order-none"
        >
          <ChipVisualization />
          <svg
            viewBox="0 0 500 425"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M120,180 L120,350"
              stroke="var(--accent)"
              strokeWidth="1"
              opacity="0.25"
              className="trace-draw"
              style={{ "--trace-len": "170" } as React.CSSProperties}
            />
            <path
              d="M200,180 L200,350"
              stroke="var(--accent)"
              strokeWidth="0.8"
              opacity="0.2"
              className="trace-draw"
              style={{ "--trace-len": "170", animationDelay: "0.6s" } as React.CSSProperties}
            />
            <path
              d="M280,180 L280,350"
              stroke="var(--accent-secondary)"
              strokeWidth="1"
              opacity="0.2"
              className="trace-draw"
              style={{ "--trace-len": "170", animationDelay: "0.8s" } as React.CSSProperties}
            />
            <path
              d="M360,180 L360,350"
              stroke="var(--accent)"
              strokeWidth="0.6"
              opacity="0.15"
              className="trace-draw"
              style={{ "--trace-len": "170", animationDelay: "1s" } as React.CSSProperties}
            />
            <path
              d="M80,220 L420,220"
              stroke="var(--border)"
              strokeWidth="0.5"
              opacity="0.2"
              className="trace-draw"
              style={{ "--trace-len": "340", animationDelay: "1.2s" } as React.CSSProperties}
            />
            <path
              d="M80,280 L420,280"
              stroke="var(--border)"
              strokeWidth="0.5"
              opacity="0.15"
              className="trace-draw"
              style={{ "--trace-len": "340", animationDelay: "1.4s" } as React.CSSProperties}
            />
            <path
              d="M80,320 L420,320"
              stroke="var(--accent-secondary)"
              strokeWidth="0.5"
              opacity="0.15"
              className="trace-draw"
              style={{ "--trace-len": "340", animationDelay: "1.6s" } as React.CSSProperties}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "16px",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            FLOORPLAN REPRESENTATION
          </div>
        </div>

        {/* Hero text content */}
        <div style={{ maxWidth: "680px", position: "relative", zIndex: 1 }}>
          {/* Status pill */}
          <div
            className="badge badge--accent"
            style={{ marginBottom: "16px" }}
          >
            <span
              className="status-dot-pulse"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--accent)",
                color: "var(--accent)",
              }}
            />
            VLSI Physical Design Engineer
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 10vw, 80px)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: "0 0 16px 0",
            }}
          >
            Shanmukha
            <br />
            <span style={{ color: "var(--accent)" }}>Varma Penmetsa</span>
          </h1>

          {/* Bio */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 3.5vw, 20px)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              margin: "0 0 clamp(24px, 4vw, 40px) 0",
              maxWidth: "520px",
            }}
          >
            Building hands-on expertise in VLSI Physical Design, STA and Tcl
            automation. Currently undergoing intensive training and building
            toward a career in silicon engineering.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              className="btn-hover-lift glow-btn-primary"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                padding: "14px 28px",
                color: "#FFF",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
                borderRadius: "8px",
              }}
            >
              GET IN TOUCH
            </a>
            <a
              href="#work"
              className="btn-hover-lift glow-btn-ghost"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                padding: "14px 28px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
                borderRadius: "8px",
                background: "transparent",
              }}
            >
              VIEW LAB REPORTS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
