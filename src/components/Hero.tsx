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
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(42, 48, 56, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42, 48, 56, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.4,
          pointerEvents: "none",
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
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: "0 0 20px 0",
            }}
          >
            SHANMUKHA
            <br />
            <span style={{ color: "var(--accent)" }}>VARMA PENMETSA</span>
          </h1>

          {/* Title */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              letterSpacing: "0.12em",
              color: "var(--accent-secondary)",
              textTransform: "uppercase",
              marginBottom: "20px",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            VLSI PHYSICAL DESIGN ENGINEER
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
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                padding: "12px 28px",
                background: "var(--accent)",
                color: "var(--bg)",
                textDecoration: "none",
                transition: "all 0.2s ease",
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
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                padding: "12px 28px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s ease",
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