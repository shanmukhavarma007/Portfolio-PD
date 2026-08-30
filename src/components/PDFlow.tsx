"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

interface PDStage {
  id: string;
  label: string;
  stageNum: string;
  description: string;
  concepts: string[];
  metrics: string[];
  commands: string[];
}

const PD_STAGES: PDStage[] = [
  {
    id: "rtl",
    label: "RTL",
    stageNum: "01",
    description: "Register-Transfer Level design capture and lint verification.",
    concepts: ["LINT", "CDC", "SIM"],
    metrics: ["LINT CLEAN", "CDC 0 ISSUES", "SIM COVERED"],
    commands: ["genus -f scripts/synth.tcl", "lint -run cdc_check", "read_verilog top.v"],
  },
  {
    id: "synth",
    label: "SYNTHESIS",
    stageNum: "02",
    description: "Logic synthesis converting RTL into a gate-level netlist.",
    concepts: ["GTL", "MAPPING", "OPT"],
    metrics: ["WNS \u2265 0 NS", "TNS 0", "AREA OPT"],
    commands: ["read_sdc constraints.sdc", "compile -map_effort high", "report_qor"],
  },
  {
    id: "floorplan",
    label: "FLOORPLAN",
    stageNum: "03",
    description: "Die size definition, I/O placement, and power grid structuring.",
    concepts: ["PADS", "POWER GRID", "MACROS"],
    metrics: ["UTIL 65\u201370%", "MACROS FIXED", "PG RINGS"],
    commands: ["floorPlan -d 1200 900 -r 1.33", "placeInstance SRAM_0 -origin {44 44}", "addRing -nets {VDD VSS}"],
  },
  {
    id: "placement",
    label: "PLACEMENT",
    stageNum: "04",
    description: "Standard cell placement with congestion and timing optimization.",
    concepts: ["GLOBAL", "DETAIL", "LEGALIZATION"],
    metrics: ["CONGESTION < 1%", "LEGALIZED 100%", "TIMING DRIVEN"],
    commands: ["setPlaceMode -congestionEffort high", "placeDesign -noPrePlaceOpt", "legalizePlace"],
  },
  {
    id: "cts",
    label: "CTS",
    stageNum: "05",
    description: "Clock Tree Synthesis ensuring minimal skew and latency.",
    concepts: ["SKEW", "LATENCY", "BUFFERS"],
    metrics: ["SKEW \u2264 30 PS", "LATENCY MIN", "BALANCED BUF"],
    commands: ["specifyClockTree -clk clk -buf CLKBUFX12", "clockDesign", "report_clock_timing"],
  },
  {
    id: "routing",
    label: "ROUTING",
    stageNum: "06",
    description: "Detailed signal routing connecting cells without DRC violations.",
    concepts: ["GLOBAL", "TRACK", "DETAIL"],
    metrics: ["DRC 0", "TRACKED", "ANTENNA OK"],
    commands: ["globalRoute", "setNanoRouteMode -routeWithTimingDriven true", "detailedRoute"],
  },
  {
    id: "sta",
    label: "TIMING ANALYSIS",
    stageNum: "07",
    description: "Setup/hold slack analysis within Innovus, SDC constraint validation, and clock tree timing verification.",
    concepts: ["SETUP", "HOLD", "SLACK", "SDC", "CTS TIMING"],
    metrics: ["SETUP MET", "HOLD CLEAN", "SLACK +VE", "SDC VALIDATED"],
    commands: ["read_sdc timing.sdc", "report_timing -setup", "report_hold_violations"],
  },
  {
    id: "signoff",
    label: "SIGNOFF",
    stageNum: "08",
    description: "Final physical verification before tape-out fabrication.",
    concepts: ["DRC", "LVS", "IR DROP", "EM"],
    metrics: ["DRC/LVS CLEAN", "EM/IR PASS", "GDSII OUT"],
    commands: ["calibre -drc layout.gds", "calibre -lvs top.vs", "streamOut top.gds -units 1000"],
  },
];

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ color: "#06B6D4" }}
    >
      <polyline
        points="2,5 8,11 14,5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ color: "#06B6D4" }}
    >
      <polyline
        points="5,2 11,8 5,14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function PDFlow() {
  const [activeStage, setActiveStage] = useState<string>(PD_STAGES[0].id);
  const ref = useScrollReveal();

  const activeData = PD_STAGES.find((s) => s.id === activeStage) || PD_STAGES[0];

  return (
    <section
      id="flow"
      ref={ref}
      className="scroll-reveal section-glow section-divider-top section-divider-bottom"
      style={{
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
        background: "#060b13",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        <SectionHeader badge="02 // FLOW" title="Physical Design Flow" />

        {/* Desktop: 2-column interactive layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {/* Left column (w-1/3): vertical step nav */}
          <aside className="md:col-span-1 flex flex-col gap-2">
            {PD_STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage(stage.id)}
                  className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                    isActive
                      ? "border-cyan-400/70 bg-slate-900/80 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      : "border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 hover:bg-slate-900/70"
                  }`}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border font-mono text-[10px] font-bold"
                    style={{
                      color: isActive ? "#06B6D4" : "var(--text-muted)",
                      borderColor: isActive
                        ? "rgba(6,182,212,0.5)"
                        : "var(--border-subtle)",
                    }}
                  >
                    {stage.stageNum}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate font-mono text-xs font-bold tracking-wide ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span className="block truncate font-mono text-[9px] tracking-wider text-slate-500">
                      STAGE_{stage.stageNum}
                    </span>
                  </span>
                  <span
                    className="shrink-0"
                    style={{ color: isActive ? "#06B6D4" : "var(--text-muted)" }}
                  >
                    <ChevronRight />
                  </span>
                </button>
              );
            })}
          </aside>

          {/* Right column (w-2/3): EDA code panel */}
          <div
            key={activeData.id}
            className="pd-readout-animate pd-hud md:col-span-2"
            style={{ position: "relative" }}
          >
            <span className="pd-hud-bracket pd-hud-bracket--tl" />
            <span className="pd-hud-bracket pd-hud-bracket--tr" />
            <span className="pd-hud-bracket pd-hud-bracket--bl" />
            <span className="pd-hud-bracket pd-hud-bracket--br" />

            <div
              className="relative z-10 w-full p-5 sm:p-7"
            >
              {/* Terminal title bar */}
              <div className="mb-5 flex items-center gap-2 border-b border-slate-800 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 truncate font-mono text-[10px] tracking-wider text-slate-400">
                  stage_{activeData.stageNum}_exec.shell
                </span>
                <span className="ml-auto shrink-0 rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-cyan-300">
                  RUNNING
                </span>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  color: "var(--accent-secondary)",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                }}
              >
                STATUS: ACTIVE // {activeData.stageNum}_STAGE
              </div>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                  textShadow: "0 0 10px rgba(6, 182, 212, 0.4)",
                }}
              >
                {activeData.label}
              </div>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  lineHeight: 1.8,
                  color: "var(--text-secondary)",
                  margin: "0 0 24px 0",
                  maxWidth: "680px",
                }}
              >
                {activeData.description}
              </p>

              {/* Timing / verification metrics */}
              <div className="mb-5">
                <div className="mb-2 font-mono text-[9px] tracking-[0.2em] text-slate-500">
                  {"// METRICS"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeData.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-emerald-300"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Concepts */}
              <div className="mb-5">
                <div className="mb-2 font-mono text-[9px] tracking-[0.2em] text-slate-500">
                  {"// CONCEPTS"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeData.concepts.map((c) => (
                    <span key={c} className="pd-hud-chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tool commands */}
              <div>
                <div className="mb-2 font-mono text-[9px] tracking-[0.2em] text-slate-500">
                  {"// TOOL COMMANDS"}
                </div>
                <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/80">
                  {activeData.commands.map((cmd, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 border-b border-slate-800/70 px-3 py-2 last:border-b-0"
                    >
                      <span className="select-none font-mono text-[10px] leading-relaxed text-slate-600">
                        {i + 1}
                      </span>
                      <span className="font-mono text-[11px] leading-relaxed text-cyan-300">
                        <span className="text-emerald-400">$ </span>
                        {cmd}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: collapsible vertical accordion */}
        <div className="flex flex-col gap-2 md:hidden">
          {PD_STAGES.map((stage) => {
            const isOpen = activeStage === stage.id;
            return (
              <div
                key={stage.id}
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50"
              >
                <button
                  type="button"
                  onClick={() => setActiveStage(isOpen ? "" : stage.id)}
                  aria-expanded={isOpen}
                  className={`flex min-h-[48px] w-full items-center justify-between gap-3 p-4 text-left transition-colors ${
                    isOpen ? "bg-slate-900/80" : ""
                  }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border font-mono text-[10px] font-bold"
                      style={{
                        color: isOpen ? "#06B6D4" : "var(--text-muted)",
                        borderColor: isOpen
                          ? "rgba(6,182,212,0.5)"
                          : "var(--border-subtle)",
                      }}
                    >
                      {stage.stageNum}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-mono text-xs font-bold tracking-wide ${
                          isOpen ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {stage.label}
                      </span>
                      <span className="block font-mono text-[9px] tracking-wider text-slate-500">
                        STAGE_{stage.stageNum}
                      </span>
                    </span>
                  </span>
                  <span
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown />
                  </span>
                </button>

                {isOpen && (
                  <div
                    key={`${stage.id}-body`}
                    className="pd-readout-animate border-t border-slate-800/70 p-4"
                  >
                    <p className="mb-4 text-[13px] leading-relaxed text-slate-300">
                      {stage.description}
                    </p>

                    <div className="mb-4">
                      <div className="mb-2 font-mono text-[9px] tracking-[0.2em] text-slate-500">
                        {"// METRICS"}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] tracking-wide text-emerald-300"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="mb-2 font-mono text-[9px] tracking-[0.2em] text-slate-500">
                        {"// TOOL COMMANDS"}
                      </div>
                      <div className="space-y-1.5">
                        {stage.commands.map((cmd, i) => (
                          <div
                            key={i}
                            className="overflow-x-auto whitespace-pre rounded-md border border-slate-800 bg-slate-950/80 px-3 py-1.5 font-mono text-[10px] leading-relaxed text-cyan-300"
                          >
                            <span className="text-emerald-400">$ </span>
                            {cmd}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
