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
}

const PD_STAGES: PDStage[] = [
  {
    id: "rtl",
    label: "RTL",
    stageNum: "01",
    description: "Register-Transfer Level design capture and lint verification.",
    concepts: ["LINT", "CDC", "SIM"],
    metrics: ["LINT CLEAN", "CDC 0 ISSUES", "SIM COVERED"],
  },
  {
    id: "synth",
    label: "SYNTHESIS",
    stageNum: "02",
    description: "Logic synthesis converting RTL into a gate-level netlist.",
    concepts: ["GTL", "MAPPING", "OPT"],
    metrics: ["WNS \u2265 0 NS", "TNS 0", "AREA OPT"],
  },
  {
    id: "floorplan",
    label: "FLOORPLAN",
    stageNum: "03",
    description: "Die size definition, I/O placement, and power grid structuring.",
    concepts: ["PADS", "POWER GRID", "MACROS"],
    metrics: ["UTIL 65\u201370%", "MACROS FIXED", "PG RINGS"],
  },
  {
    id: "placement",
    label: "PLACEMENT",
    stageNum: "04",
    description: "Standard cell placement with congestion and timing optimization.",
    concepts: ["GLOBAL", "DETAIL", "LEGALIZATION"],
    metrics: ["CONGESTION < 1%", "LEGALIZED 100%", "TIMING DRIVEN"],
  },
  {
    id: "cts",
    label: "CTS",
    stageNum: "05",
    description: "Clock Tree Synthesis ensuring minimal skew and latency.",
    concepts: ["SKEW", "LATENCY", "BUFFERS"],
    metrics: ["SKEW \u2264 30 PS", "LATENCY MIN", "BALANCED BUF"],
  },
  {
    id: "routing",
    label: "ROUTING",
    stageNum: "06",
    description: "Detailed signal routing connecting cells without DRC violations.",
    concepts: ["GLOBAL", "TRACK", "DETAIL"],
    metrics: ["DRC 0", "TRACKED", "ANTENNA OK"],
  },
  {
    id: "sta",
    label: "STA",
    stageNum: "07",
    description: "Static Timing Analysis validating setup and hold constraints.",
    concepts: ["SETUP", "HOLD", "SLACK"],
    metrics: ["SETUP MET", "HOLD CLEAN", "SLACK +VE"],
  },
  {
    id: "signoff",
    label: "SIGNOFF",
    stageNum: "08",
    description: "Final physical verification before tape-out fabrication.",
    concepts: ["DRC", "LVS", "IR DROP", "EM"],
    metrics: ["DRC/LVS CLEAN", "EM/IR PASS", "GDSII OUT"],
  },
];

function Chevron() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mx-1 shrink-0 self-center"
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
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const ref = useScrollReveal();

  const activeData = PD_STAGES.find((s) => s.id === activeStage);

  return (
    <section
      id="pipeline"
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
        <SectionHeader id="02" title="Physical Design Flow" />

        {/* Stage cards + chevron connectors */}
        <div className="flex items-stretch overflow-x-auto pb-3">
          {PD_STAGES.map((stage, i) => {
            const isActive = activeStage === stage.id;
            return (
              <div key={stage.id} className="flex shrink-0">
                <button
                  type="button"
                  onMouseEnter={() => setActiveStage(stage.id)}
                  onFocus={() => setActiveStage(stage.id)}
                  onClick={() =>
                    setActiveStage(isActive ? null : stage.id)
                  }
                  className={`flex min-w-[150px] max-w-[190px] flex-col gap-2 rounded-xl border p-4 text-left backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? "border-cyan-400/70 bg-slate-900/80 shadow-[0_0_24px_rgba(6,182,212,0.25)]"
                      : "border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]"
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] tracking-[0.2em] ${
                      isActive ? "text-cyan-300" : "text-slate-500"
                    }`}
                  >
                    STAGE_{stage.stageNum}
                  </span>
                  <span className="font-mono text-sm font-bold tracking-wider text-white">
                    {stage.label}
                  </span>
                  <span className="flex flex-wrap gap-1">
                    {stage.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded border border-slate-700 bg-slate-800/70 px-1.5 py-0.5 font-mono text-[8px] tracking-wide text-emerald-300"
                      >
                        {metric}
                      </span>
                    ))}
                  </span>
                </button>
                {i < PD_STAGES.length - 1 && <Chevron />}
              </div>
            );
          })}
        </div>

        {/* Detail readout — EDA terminal HUD */}
        <div style={{ marginTop: "24px", minHeight: "150px" }}>
          {activeData ? (
            <div
              key={activeData.id}
              className="pd-readout-animate pd-hud"
              style={{ position: "relative" }}
            >
              <span className="pd-hud-bracket pd-hud-bracket--tl" />
              <span className="pd-hud-bracket pd-hud-bracket--tr" />
              <span className="pd-hud-bracket pd-hud-bracket--bl" />
              <span className="pd-hud-bracket pd-hud-bracket--br" />

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "clamp(20px, 3vw, 32px)",
                }}
              >
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
                    fontSize: "16px",
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
                    margin: "0 0 20px 0",
                    maxWidth: "680px",
                  }}
                >
                  {activeData.description}
                </p>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {activeData.concepts.map((c) => (
                    <span key={c} className="pd-hud-chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="pd-readout-animate"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                padding: "20px 0 20px 24px",
                borderLeft: "2px solid rgba(6, 182, 212, 0.25)",
              }}
            >
              Hover a stage to explore →
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
