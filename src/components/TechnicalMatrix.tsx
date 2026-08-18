"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const TECH = [
  { label: "Tcl", status: "STRONG", dots: 5 },
  { label: "Linux / Shell", status: "STRONG", dots: 5 },
  { label: "Python / AWK", status: "INTERMEDIATE", dots: 3 },
  { label: "CMOS Fundamentals", status: "STRONG", dots: 5 },
  { label: "Digital Design", status: "STRONG", dots: 5 },
  { label: "Static Timing Analysis", status: "ACTIVE TRAINING", dots: 4 },
  { label: "Physical Design Flow", status: "ACTIVE TRAINING", dots: 4 },
  { label: "Low-Power Design", status: "FAMILIAR", dots: 2 },
  { label: "RTL Design Basics", status: "FAMILIAR", dots: 2 },
  { label: "Power Analysis", status: "USUALLY USE", dots: 3 },
];

const EDA = [
  { label: "Cadence Innovus", status: "TRAINING", dots: 4 },
  { label: "Cadence Tempus", status: "TRAINING", dots: 4 },
  { label: "Cadence Genus", status: "TRAINING", dots: 4 },
  { label: "OpenLane", status: "EXPLORING", dots: 2 },
];

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  STRONG: { color: "var(--accent-secondary)", bg: "color-mix(in srgb, var(--accent-secondary) 8%, transparent)" },
  "ACTIVE TRAINING": { color: "var(--warning)", bg: "color-mix(in srgb, var(--warning) 8%, transparent)" },
  TRAINING: { color: "var(--accent)", bg: "color-mix(in srgb, var(--accent) 8%, transparent)" },
  INTERMEDIATE: { color: "var(--accent-secondary)", bg: "color-mix(in srgb, var(--accent-secondary) 5%, transparent)" },
  "USUALLY USE": { color: "var(--accent-secondary)", bg: "color-mix(in srgb, var(--accent-secondary) 5%, transparent)" },
  FAMILIAR: { color: "var(--text-muted)", bg: "transparent" },
  EXPLORING: { color: "var(--text-muted)", bg: "transparent" },
};

function SkillCard({ label, status, dots }: { label: string; status: string; dots: number }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.FAMILIAR;

  return (
    <div
      style={{
        padding: "clamp(12px, 2vw, 16px)",
        background: style.bg,
        border: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 3vw, 16px)",
            fontWeight: 500,
            color: "var(--text)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.08em",
            color: style.color,
            padding: "2px 6px",
            border: `1px solid color-mix(in srgb, ${style.color} 30%, transparent)`,
            flexShrink: 0,
          }}
        >
          {status}
        </span>
      </div>
      {/* Visual dot indicators */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: i < dots ? style.color : "var(--border-subtle)",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function TechnicalMatrix() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="scroll-reveal"
      style={{
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
        position: "relative",
      }}
    >
      <div className="section-deco-number" aria-hidden="true">03</div>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--text-muted)",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          03 / TECHNICAL MATRIX
        </div>

        <WaveformHr style={{ marginBottom: "clamp(20px, 4vw, 32px)" }} />

        {/* TECH section */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 4vw, 32px)",
            fontWeight: 500,
            color: "var(--text)",
            margin: "0 0 4px 0",
          }}
        >
          Tech & Skills
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            margin: "0 0 clamp(16px, 3vw, 24px) 0",
          }}
        >
          Programming and core EDA domain knowledge
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "clamp(32px, 5vw, 48px)",
          }}
        >
          {TECH.map((t) => (
            <SkillCard key={t.label} {...t} />
          ))}
        </div>

        {/* EDA section */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 4vw, 32px)",
            fontWeight: 500,
            color: "var(--text)",
            margin: "0 0 4px 0",
          }}
        >
          EDA Tools
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            margin: "0 0 clamp(16px, 3vw, 24px) 0",
          }}
        >
          Commercial and open-source implementation tools
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {EDA.map((t) => (
            <SkillCard key={t.label} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
