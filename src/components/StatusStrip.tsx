"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const STRIP_ITEMS = [
  { label: "CURRENTLY", value: "INTENSIVE VLSI PD TRAINING" },
  { label: "FOCUS", value: "PHYSICAL DESIGN · STA · EDA" },
  { label: "COMPLETED", value: "TCL — HANDS-ON" },
  { label: "DIRECTION", value: "BUILDING TOWARD SILICON" },
];

export function StatusStrip() {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="scroll-reveal"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--surface-1)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 48px)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
        className="!grid-cols-2 md:!grid-cols-4"
      >
        {STRIP_ITEMS.map((item, i) => (
          <div
            key={item.label}
            style={{
              padding: "16px 20px",
              borderRight:
                i < STRIP_ITEMS.length - 1 ? "1px solid var(--border-subtle)" : "none",
            }}
            className="[&:nth-child(2)]:!border-r-0 [&:nth-child(2)]:max-md:!border-r-0 max-md:[&:nth-child(2)]:border-r-1 max-md:[&:nth-child(2)]:!border-r-[var(--border-subtle)]"
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "var(--text-secondary)",
                lineHeight: 1.4,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}