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
        paddingTop: "48px",
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

      {/* Radial glow behind focal area */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%)",
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
          gap: "48px",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="lg:!grid-cols-[7fr_5fr]"
      >
        {/* Left: Engineering identity */}
        <div style={{ maxWidth: "680px" }}>
          {/* Section tag */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            ENGINEERING PROFILE
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px, 7.5vw, 96px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              margin: "0 0 24px 0",
            }}
          >
            SHANMUKHA
            <br />
            <span style={{ color: "var(--accent)" }}>VARMA PENMETSA</span>
          </h1>

          {/* Title */}
          <div style={{ position: "relative", marginBottom: "20px", paddingBottom: "16px" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                letterSpacing: "0.12em",
                color: "var(--accent-secondary)",
                textTransform: "uppercase",
              }}
              className="boot-sequence"
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
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              margin: "0 0 32px 0",
              maxWidth: "520px",
            }}
          >
            Building hands-on expertise in VLSI Physical Design, STA and Tcl automation.
            Currently undergoing intensive training and building toward a career in Physical Design engineering.
          </p>

          {/* CTAs — primary, secondary, social */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="#work"
              className="btn-hover-lift"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                padding: "12px 28px",
                background: "var(--accent)",
                color: "var(--bg)",
                textDecoration: "none",
                display: "inline-block",
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
                padding: "12px 28px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                display: "inline-block",
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
            <span style={{ width: "1px", height: "20px", background: "var(--border-subtle)" }} />
            <a
              href="https://github.com/shanmukhavarma007"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.06em",
                padding: "12px 16px",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
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
                padding: "12px 16px",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
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

        {/* Right: Chip visualization */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 0.85",
            maxHeight: "520px",
          }}
          className="max-lg:hidden"
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
      </div>
    </section>
  );
}