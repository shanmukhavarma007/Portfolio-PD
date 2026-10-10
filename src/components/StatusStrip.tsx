"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATUS_METRICS = [
  {
    value: "PPA Focus",
    label: "CORE OBJECTIVE",
    subtext: "Timing, Power & Area",
    color: "var(--accent-cyan, #00f0ff)",
  },
  {
    value: "ASIC PD",
    label: "PRIMARY DOMAIN",
    subtext: "RTL to GDSII",
    color: "var(--accent-green, #22c55e)",
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
        className="section-inner"
        style={{
          paddingTop: "clamp(14px, 2vw, 20px)",
          paddingBottom: "clamp(14px, 2vw, 20px)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATUS_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="scroll-reveal-child glass-card flex min-h-[130px] flex-col items-center justify-center gap-1.5 px-4 py-4"
            >
              <span
                className="font-mono text-xl font-bold tracking-wide sm:text-2xl text-center"
                style={{ color: metric.color }}
              >
                {metric.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400 whitespace-normal text-center">
                {metric.label}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400 whitespace-normal text-center">
                {metric.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
