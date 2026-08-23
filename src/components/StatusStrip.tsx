"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const TCL_SCRIPTS_URL = "https://github.com/shanmukhavarma007/tcl-scripts";

type Stat = {
  label: string;
  value: string;
  valueClass: string;
  href?: string;
};

const STATS: Stat[] = [
  {
    label: "FOUNDATIONS MASTERED",
    value: "100%",
    valueClass: "text-cyan-400",
  },
  {
    label: "TOOLS BUILT / LAB REPOS",
    value: "4+",
    valueClass: "text-white",
    href: TCL_SCRIPTS_URL,
  },
  {
    label: "LIVE PLATFORM",
    value: "VLSI HUB",
    valueClass: "text-emerald-400",
    href: "https://vlsi-hub-iota.vercel.app/",
  },
  {
    label: "TARGET DOMAIN",
    value: "ASIC / PD",
    valueClass: "text-slate-100",
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
          padding: "clamp(14px, 2vw, 20px) clamp(16px, 4vw, 48px)",
        }}
      >
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {STATS.map((stat) => {
            const card = (
              <>
                <span
                  className={`font-mono text-xl font-bold tracking-wide sm:text-2xl ${stat.valueClass}`}
                >
                  {stat.value}
                  {stat.href && (
                    <span className="ml-1 text-xs text-slate-500">↗</span>
                  )}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                  {stat.label}
                </span>
              </>
            );
            const className =
              "flex min-w-[150px] flex-1 flex-col items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]";
            return stat.href ? (
              <a
                key={stat.label}
                href={stat.href}
                target="_blank"
                rel="noreferrer"
                className={className}
                style={{ textDecoration: "none" }}
              >
                {card}
              </a>
            ) : (
              <div key={stat.label} className={className}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
