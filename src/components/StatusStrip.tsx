"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const METRICS = [
  { label: "Foundations Mastered", value: "100%", accent: true },
  { label: "Lab Repos", value: "3+", accent: false },
  { label: "Target Domain", value: "ASIC / Physical Design", accent: false },
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
        background: "color-mix(in srgb, var(--surface-1) 80%, transparent)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(12px, 2vw, 16px) clamp(16px, 4vw, 48px)",
          display: "flex",
          justifyContent: "center",
          gap: "clamp(24px, 4vw, 48px)",
          flexWrap: "wrap",
        }}
      >
        {METRICS.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {i > 0 && (
              <span
                style={{
                  width: "1px",
                  height: "12px",
                  background: "var(--border-subtle)",
                  marginRight: "8px",
                }}
              />
            )}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </span>
            <span
              className={`badge ${item.accent ? "badge--accent" : "badge--muted"}`}
              style={{ fontSize: "10px", padding: "2px 8px" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
