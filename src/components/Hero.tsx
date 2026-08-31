"use client";

import { FloorplanVisual } from "./FloorplanVisual";
import { HeroWaveform } from "./HeroWaveform";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(16px, 4vw, 48px)",
        paddingTop: "72px",
        paddingBottom: "clamp(24px, 4vw, 48px)",
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

      {/* Background waveform / scanline oscilloscope sweep */}
      <HeroWaveform />

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
        className="flex flex-col-reverse lg:grid lg:grid-cols-[7fr_5fr] items-center gap-8 lg:gap-12 max-w-[1400px] mx-auto w-full relative z-10"
      >
        {/* ASIC floorplan visualization */}
        <div
          className="flex justify-center w-full"
          style={{
            position: "relative",
            aspectRatio: "540 / 380",
            maxHeight: "min(420px, 55vh)",
          }}
        >
          <FloorplanVisual />
        </div>

        {/* Hero text content */}
        <div className="max-w-[680px] flex flex-col justify-center w-full">
          {/* Top badge pills */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Role / Status Badge */}
            <div className="glass-badge font-mono text-xs tracking-wider shadow-[0_0_12px_rgba(6,182,212,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>ASIC PHYSICAL DESIGN & EDA AUTOMATION</span>
            </div>

            {/* Interactive Project Callout Pill */}
            <a
              href="https://vlsi-hub-iota.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300 w-fit max-w-full"
            >
              {/* Hardware Status Pill Tag */}
              <span className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-emerald-300 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE PLATFORM
              </span>

              {/* Main Callout Text */}
              <span className="font-mono text-xs sm:text-sm text-emerald-200 group-hover:text-white transition-colors truncate">
                <span className="font-bold text-emerald-400">VLSI HUB</span>
                <span className="text-emerald-500/70 mx-1.5">{"//"}</span>
                Interactive CMOS, Digital & Tcl Labs
              </span>

              {/* Interactive Corner Arrow */}
              <span className="shrink-0 text-emerald-400 group-hover:text-emerald-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-xs font-mono ml-0.5">
                ↗
              </span>
            </a>
          </div>

          {/* Name */}
          <h1
            className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
              margin: "0 0 16px 0",
              letterSpacing: "-0.02em",
              fontWeight: 600,
              lineHeight: 1.05,
            }}
          >
            Shanmukha
            <br />
            <span style={{ color: "var(--accent)" }}>Varma Penmetsa</span>
          </h1>

          {/* Bio */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-[520px]"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
              margin: "0 0 clamp(24px, 4vw, 40px) 0",
              lineHeight: 1.6,
            }}
          >
            Synthesizing clean architecture into optimal PPA—driving RTL-to-GDSII closure with deterministic precision.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="btn-primary btn-hover-lift min-h-[44px]"
            >
              GET IN TOUCH
            </a>
            <a
              href="https://github.com/shanmukhavarma007/tcl-scripts"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-hover-lift min-h-[44px]"
            >
              VIEW TCL SCRIPTS ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
