"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const STACK_GRID = [
  {
    category: "EDA Tools",
    items: ["Innovus", "Genus", "OpenLane"],
  },
  {
    category: "Physical Design",
    items: ["Floorplan", "Placement", "CTS", "Routing", "Signoff"],
  },
  {
    category: "Analysis & Verification",
    items: ["Timing Analysis", "Power Analysis", "IR Drop", "DRC", "LVS"],
  },
  {
    category: "Scripting & Automation",
    items: ["Tcl", "Python", "AWK", "Shell / Bash"],
  },
  {
    category: "Foundation",
    items: ["Digital Design", "CMOS", "RTL / Verilog", "Linux"],
  },
];

const COMPETENCIES = [
  {
    label: "RTL-to-GDSII Flow",
    tag: "FULL PIPELINE",
    description:
      "End-to-end ASIC implementation from netlist synthesis and floorplanning to signoff-grade tapeout stream.",
    modIndex: "MOD_01",
  },
  {
    label: "Timing Closure & CTS",
    tag: "MULTI-CORNER / OCV",
    description:
      "Setup/hold signoff across multi-PVT corners, AOCV/POCV derating, clock skew balancing, and slack closure.",
    modIndex: "MOD_02",
  },
  {
    label: "Synthesis & Constraints",
    tag: "SDC-DRIVEN",
    description:
      "Logic synthesis with Genus, SDC boundary constraints, false/multicycle paths, and area-timing tradeoffs.",
    modIndex: "MOD_03",
  },
  {
    label: "EDA Flow Automation",
    tag: "TCL / PYTHON",
    description:
      "Automated run-scripts, batch timing report parsing, constraint generation, and custom Tcl/Python utilities.",
    modIndex: "MOD_04",
  },
  {
    label: "Physical Verification",
    tag: "SIGNOFF-GRADE",
    description:
      "DRC, LVS, antenna rule closure, and metal fill compliance across advanced semiconductor process nodes.",
    modIndex: "MOD_05",
  },
];

type Competency = {
  label: string;
  tag: string;
  description: string;
  modIndex: string;
  className?: string;
};

function CompetencyCard({
  label,
  tag,
  description,
  modIndex,
  className,
}: Competency) {
  // Wrap hyphenated compounds that break badly to prevent orphans
  const processedDescription = description
    .replace("signoff-grade", '<span className="whitespace-nowrap">signoff-grade</span>')
    .replace("area-timing", '<span className="whitespace-nowrap">area-timing</span>')
    .replace("multi-PVT", '<span className="whitespace-nowrap">multi-PVT</span>');

  return (
    <li className={`scroll-reveal-child relative overflow-hidden rounded-xl border border-cyan-500/15 bg-slate-900/40 backdrop-blur-md min-w-0 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.08),0_4px_24px_rgba(0,0,0,0.4)] h-full flex flex-col ${className || ""}`}>
      {/* Pin ticks along top edge */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(6, 182, 212, 0.25) 10px, rgba(6, 182, 212, 0.25) 11px)",
          inset: 0,
          width: "100%",
          height: "1px",
        }}
      />

      {/* 4-corner L-bracket accents */}
      <span className="pd-comp-corner pd-comp-corner--tl" />
      <span className="pd-comp-corner pd-comp-corner--tr" />
      <span className="pd-comp-corner pd-comp-corner--bl" />
      <span className="pd-comp-corner pd-comp-corner--br" />

      {/* Top gradient trace line */}
      <span className="pd-comp-glow" />

      {/* HEADER STRIP (top zone) */}
      <div className="relative z-[1] flex items-center justify-between gap-4 h-9 px-5 sm:px-6 border-b border-cyan-500/10 bg-slate-900/30">
        {/* Module index */}
        <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase text-cyan-400/60 shrink-0" aria-hidden="true">
          {modIndex}
        </span>
        {/* Decorative status marks (reuse terminal status dot style) */}
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/20" />
        </div>
      </div>

      {/* BODY (middle zone, flex-1) */}
      <div className="relative z-[1] flex flex-col flex-1 p-5 sm:p-6 min-h-0">
        <h3 className="font-mono text-base sm:text-lg font-semibold leading-tight text-slate-100 text-balance">
          {label}
        </h3>
        <p 
          className="font-body text-sm sm:text-[15px] leading-relaxed mt-3 text-slate-400 max-w-prose text-pretty flex-1"
          dangerouslySetInnerHTML={{ __html: processedDescription }}
        />
      </div>

      {/* FOOTER (bottom zone, mt-auto) */}
      <div className="relative z-[1] flex items-center justify-between gap-4 px-5 sm:px-6 py-3 border-t border-cyan-500/10 bg-slate-900/30 mt-auto">
        <span className="inline-flex items-center shrink-0 h-8 px-3 text-[11px] font-mono font-medium tracking-wider uppercase rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 transition-all duration-200">
          {tag}
        </span>
        {/* Optional subtle nav glyph */}
        <span className="shrink-0 font-mono text-[11px] text-cyan-400/30" aria-hidden="true">→</span>
      </div>
    </li>
  );
}

function ManifestRow({ category, items }: { category: string; items: string[] }) {
  return (
    <dl className="flex flex-col sm:grid sm:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr] gap-2 sm:gap-4 items-start sm:items-center py-4 sm:py-5 border-b border-cyan-500/10 last:border-0">
      <dt className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-cyan-400 shrink-0 min-w-[200px] xl:min-w-[220px] flex items-center">
        {category}
      </dt>
      <dd className="flex flex-wrap gap-2 min-w-0">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center h-8 px-3 text-[11px] font-mono font-medium tracking-wider uppercase rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 transition-all duration-200 cursor-default whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </dd>
    </dl>
  );
}

function ManifestPanel() {
  return (
    <section
      className="scroll-reveal-child relative overflow-hidden rounded-xl border border-cyan-500/15 bg-slate-900/40 backdrop-blur-md"
      aria-label="Toolchain Manifest"
    >
      {/* Terminal-style header strip */}
      <div className="flex items-center gap-3 border-b border-cyan-500/15 px-4 sm:px-6 py-3 bg-slate-900/60">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-[10px] tracking-wider text-slate-400">
          toolchain.manifest
        </span>
        <span className="ml-auto shrink-0 rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-cyan-300">
          MANIFEST
        </span>
      </div>

      {/* Manifest rows */}
      <div className="px-4 sm:px-6">
        {STACK_GRID.map((group) => (
          <ManifestRow key={group.category} category={group.category} items={group.items} />
        ))}
      </div>

      {/* 4-corner L-bracket accents on outer panel */}
      <span className="pd-hud-bracket pd-hud-bracket--tl" />
      <span className="pd-hud-bracket pd-hud-bracket--tr" />
      <span className="pd-hud-bracket pd-hud-bracket--bl" />
      <span className="pd-hud-bracket pd-hud-bracket--br" />
    </section>
  );
}

function CompetenciesSubHeading() {
  return (
    <h3 className="flex items-center gap-3 mt-10 lg:mt-12 mb-4">
      <span className="font-mono text-sm font-semibold tracking-widest uppercase text-cyan-400 shrink-0">
        Architecture & System Competencies
      </span>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/40 via-cyan-500/10 to-transparent self-center" />
    </h3>
  );
}

export function EngineeringProfile() {
  const ref = useScrollReveal();

  return (
    <section
      id="stack"
      ref={ref}
      className="scroll-reveal section-container section-glow"
    >
      <div className="section-inner">
        <SectionHeader badge="01 // STACK" title="Technical Capabilities" />

        <p className="text-pretty max-w-prose text-[var(--text-secondary)] leading-relaxed mb-8 text-base sm:text-lg">
          Complete ASIC physical design toolchain — from RTL synthesis through
          final verification, backed by strong EDA automation and foundational
          VLSI knowledge.
        </p>

        {/* ─── A) TOOLCHAIN MANIFEST ─── */}
        <ManifestPanel />

        {/* ─── B) ARCHITECTURE & SYSTEM COMPETENCIES ─── */}
        <CompetenciesSubHeading />

        {/* Competency Grid — chip module cards */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5 items-stretch" role="list" aria-label="Architecture & System Competencies">
          {COMPETENCIES.map((comp, index) => (
            <CompetencyCard
              key={comp.label}
              {...comp}
              className={`
                ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}
                ${index === 4 ? "md:col-span-2" : ""}
              `}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}