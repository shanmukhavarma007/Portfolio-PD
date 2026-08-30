"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATUS_METRICS = [
  {
    value: "< 7nm",
    label: "TARGET TECH NODE",
    subtext: "FinFET / Advanced Nodes",
    color: "var(--accent-cyan, #00f0ff)",
  },
  {
    value: "ASIC PD",
    label: "PRIMARY DOMAIN",
    subtext: "Floorplan to GDSII",
    color: "var(--accent-green, #00ff66)",
  },
  {
    value: "Tcl / Shell",
    label: "EDA SCRIPTING",
    subtext: "Automation & Custom Checks",
    color: "var(--accent-amber, #ffb700)",
  },
  {
    value: "STA & PnR",
    label: "CORE FOCUS",
    subtext: "Timing Closure & DRC/LVS",
    color: "var(--accent-purple, #b026ff)",
  },
];

export function StatusStrip() {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="scroll-reveal section-divider-top section-divider-bottom"
      style={{
        background: "color-mix(in srgb, var(--surface-1) 80%, transparent)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingTop: "clamp(14px, 2vw, 20px)",
          paddingBottom: "clamp(14px, 2vw, 20px)",
        }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATUS_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex min-h-[130px] flex-col items-center justify-center gap-1.5 rounded-xl border border-cyan-500/20 bg-slate-900/60 px-4 py-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]"
            >
              <span
                className="font-mono text-xl font-bold tracking-wide sm:text-2xl"
                style={{ color: metric.color }}
              >
                {metric.value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 whitespace-normal text-center">
                {metric.label}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500 whitespace-normal text-center">
                {metric.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
