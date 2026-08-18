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
        paddingTop: "64px",
        paddingBottom: "clamp(24px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid — IC floorplan style */}
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

      {/* Radial glow behind focal area — positioned behind text, not overlapping */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 65%)",
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
        {/* Chip visualization — appears FIRST on mobile for visual impact */}
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
          {/* SVG trace draw-in overlay */}
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
            {/* Routing traces that animate in */}
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
            {/* Horizontal standard cell row traces */}
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

        {/* Engineering identity — text content */}
        <div style={{ maxWidth: "680px", position: "relative", zIndex: 1 }}>
          {/* Section tag */}
          <div
            className="badge badge--muted"
            style={{ marginBottom: "16px" }}
          >
            ENGINEERING PROFILE
          </div>

          {/* Name — dramatically larger on mobile */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 10vw, 96px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "0 0 16px 0",
              position: "relative",
            }}
          >
            SHANMUKHA
            <br />
            <span style={{ color: "var(--accent)" }}>VARMA PENMETSA</span>
          </h1>

          {/* Title */}
          <div style={{ position: "relative", marginBottom: "16px", paddingBottom: "12px" }}>
            <div
              className="badge badge--accent-secondary boot-sequence"
              style={{ marginBottom: "8px", fontSize: "10px" }}
            >
              VLSI PHYSICAL DESIGN ENGINEER
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "var(--accent)",
                opacity: 0.3,
                transformOrigin: "left",
              }}
              className="accent-draw-in"
            />
          </div>

          {/* Concise statement */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 3.5vw, 16px)",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              margin: "0 0 clamp(16px, 3vw, 24px) 0",
              maxWidth: "520px",
            }}
          >
            Building hands-on expertise in VLSI Physical Design, STA and Tcl automation.
            Currently undergoing intensive training and building toward a career in Physical Design engineering.
          </p>

          {/* Glass bar — key stats */}
          <div
            style={{
              display: "flex",
              gap: "clamp(16px, 3vw, 32px)",
              padding: "clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px)",
              background: "color-mix(in srgb, var(--surface-1) 60%, transparent)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "12px",
              marginBottom: "clamp(20px, 4vw, 32px)",
              maxWidth: "fit-content",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontWeight: 600,
                  color: "var(--accent)",
                }}
              >
                6+
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                Tools
              </span>
            </div>
            <div
              style={{
                width: "1px",
                background: "var(--border-subtle)",
                alignSelf: "stretch",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontWeight: 600,
                  color: "var(--accent-secondary)",
                }}
              >
                1
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                Project
              </span>
            </div>
            <div
              style={{
                width: "1px",
                background: "var(--border-subtle)",
                alignSelf: "stretch",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontWeight: 600,
                  color: "var(--warning)",
                }}
              >
                2026
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                Graduate
              </span>
            </div>
          </div>

          {/* CTAs — primary, secondary, social */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              alignItems: "center",
            }}
            className="sm:!flex"
          >
            <a
              href="#work"
              className="btn-hover-lift"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                padding: "12px 24px",
                background: "var(--accent)",
                color: "var(--bg)",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "var(--accent-secondary)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "var(--accent)";
              }}
            >
              VIEW ENGINEERING WORK
            </a>
            <a
              href="/resume.pdf"
              download="Shanmukha_Varma_Resume.pdf"
              aria-label="Download Shanmukha Varma resume PDF"
              className="btn-hover-lift"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                padding: "12px 24px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              RESUME
            </a>
            <a
              href="https://github.com/shanmukhavarma007"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.06em",
                padding: "12px 12px",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.06em",
                padding: "12px 12px",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
