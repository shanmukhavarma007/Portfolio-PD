"use client";

import { FloorplanVisual } from "./FloorplanVisual";
import { HeroWaveform } from "./HeroWaveform";

export function Hero() {
  return (
    <section
      id="hero"
      className="scroll-reveal section-glow relative flex min-h-dvh flex-col overflow-hidden pt-[calc(72px+env(safe-area-inset-top,0px))] pb-8 lg:pb-12"
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

      {/* Text-column waveform fade: dark gradient on the left ~55% to keep AA contrast */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(90deg, var(--bg) 0%, var(--bg) 35%, color-mix(in srgb, var(--bg) 85%, transparent) 50%, transparent 55%)",
        }}
      />

      <div className="section-inner flex flex-col-reverse lg:grid lg:grid-cols-[7fr_5fr] items-start gap-8 lg:gap-12 w-full relative z-10">
        {/* ASIC floorplan visualization */}
        <div className="flex justify-center w-full lg:order-2" aria-hidden="true">
          <div
            style={{
              position: "relative",
              aspectRatio: "540 / 380",
              maxHeight: "min(420px, 55vh)",
              width: "100%",
            }}
          >
            <FloorplanVisual />
          </div>
        </div>

        {/* Hero text content */}
        <div className="max-w-[680px] flex flex-col w-full lg:order-1">
          {/* Text stack with explicit mt-* for precise spacing */}
          <div className="flex flex-col max-w-[60ch]">
            {/* Top badge pills */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Role / Status Badge */}
              <div className="glass-badge glass-badge--wrap font-mono text-xs tracking-wider shadow-[0_0_12px_rgba(6,182,212,0.15)] h-10 flex items-center">
                <span className="relative flex h-2 w-2 shrink-0">
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
                className="group relative inline-flex flex-wrap items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300 w-fit max-w-full h-10 flex items-center"
              >
                {/* Hardware Status Pill Tag */}
                <span className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-emerald-300 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE PLATFORM
                </span>

                {/* Main Callout Text */}
                <span className="font-mono text-xs sm:text-sm leading-snug text-emerald-200 group-hover:text-white transition-colors min-w-0">
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

            {/* Name — 24px from badges */}
            <h1 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-balance"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text)",
                letterSpacing: "-0.02em",
                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
              Shanmukha
              <br />
              <span style={{ color: "var(--accent)" }}>Varma Penmetsa</span>
            </h1>

            {/* Lead sentence — 24px from headline, same measure as paragraph */}
            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-[60ch] text-pretty text-[var(--text-secondary)]">
              Synthesizing clean architecture into optimal PPA—driving <span className="whitespace-nowrap">RTL-to-GDSII</span> closure with deterministic precision.
            </p>

            {/* Supporting paragraph — 16px from lead, visibly smaller, quieter, same measure */}
            <p className="mt-4 text-base md:text-[17px] leading-relaxed max-w-[60ch] text-pretty text-slate-400 font-sans">
              ECE graduate training in the full <span className="whitespace-nowrap">RTL-to-GDSII</span> flow. I&apos;ve taken CVA6 and an AES core through logic synthesis with Genus, I&apos;m now working through floorplanning, and I automate the flow with Tcl, from <span className="whitespace-nowrap">timing-report</span> parsing to constraint generation. I also built VLSI Hub, an interactive practice platform for CMOS, digital design and Tcl.
            </p>
          </div>

          {/* CTAs — 32px mobile / 40px desktop from paragraph */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#contact"
              className="btn-primary btn-hover-lift h-12 sm:h-14 flex items-center justify-center w-full sm:w-auto text-center"
            >
              GET IN TOUCH
            </a>
            <a
              href="https://github.com/shanmukhavarma007/tcl-scripts"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-hover-lift h-12 sm:h-14 flex items-center justify-center w-full sm:w-auto text-center"
            >
              VIEW TCL SCRIPTS ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
