"use client";

import { FloorplanVisual } from "./FloorplanVisual";

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
        {/* ASIC floorplan visualization */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "540 / 380",
            maxHeight: "min(420px, 55vh)",
            order: -1,
          }}
          className="lg:!order-none"
        >
          <FloorplanVisual />
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

          {/* Interactive platform badge */}
          <div style={{ marginBottom: "16px" }}>
            <a
              href="https://vlsi-hub-iota.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover-lift badge badge--accent-secondary"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "10px",
                padding: "5px 12px",
                boxShadow: "0 0 12px color-mix(in srgb, var(--accent-secondary) 30%, transparent)",
              }}
            >
              🚀 Built VLSI Hub: Practice CMOS, Digital, Linux &amp; Tcl Live ↗
            </a>
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
              href="https://github.com/shanmukhavarma007/tcl-scripts"
              target="_blank"
              rel="noopener noreferrer"
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
              VIEW TCL SCRIPTS ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
