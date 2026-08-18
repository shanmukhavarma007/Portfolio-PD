"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const METADATA = [
  { label: "EDUCATION", value: "B.Tech — ECE · 2026\nVignan\u2019s Institute of Information Technology" },
  { label: "TRAINING", value: "Currently undergoing intensive VLSI Physical Design training at Sumedha IT" },
  { label: "CURRENT FOCUS", value: "VLSI PHYSICAL DESIGN" },
  { label: "INTERESTS", value: "Physical Design · STA · Automation" },
  { label: "STATUS", value: "Intensive Training" },
];

export function About() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className="scroll-reveal"
      style={{
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(24px, 4vw, 48px)",
          position: "relative",
        }}
        className="lg:!grid-cols-[7fr_5fr]"
      >
        {/* Left */}
        <div>
          <div
            className="badge badge--muted"
            style={{ marginBottom: "12px" }}
          >
            08 / ABOUT THE ENGINEER
          </div>
          <WaveformHr style={{ marginBottom: "clamp(16px, 3vw, 32px)" }} />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 3vw, 16px)",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: "480px",
            }}
          >
            A VLSI Physical Design engineer currently undergoing intensive
            training. Building hands-on capability through active project work,
            engineering notes and continuous learning. Focused on the physical
            design flow from floorplan through signoff.
          </p>
        </div>

        {/* Right: metadata — stacked cards instead of grid rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {METADATA.map((item) => (
            <div
              key={item.label}
              style={{
                padding: "clamp(12px, 2vw, 16px)",
                background: "var(--bg)",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                className="badge badge--muted"
                style={{ fontSize: "8px", padding: "2px 6px" }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(13px, 2.5vw, 15px)",
                  color: "var(--text)",
                  whiteSpace: "pre-line",
                  lineHeight: 1.4,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
