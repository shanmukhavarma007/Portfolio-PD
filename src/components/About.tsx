"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

const METADATA = [
  { label: "EDUCATION", value: "B.Tech \u2014 ECE \u00b7 2026\nVignan\u2019s Institute of Information Technology" },
  { label: "TRAINING", value: "Currently undergoing intensive VLSI Physical Design training at Sumedha IT" },
  { label: "CURRENT FOCUS", value: "VLSI PHYSICAL DESIGN" },
  { label: "INTERESTS", value: "Physical Design \u00b7 STA \u00b7 Automation" },
  { label: "STATUS", value: "Intensive Training" },
];

export function About() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className="scroll-reveal section-container"
      style={{
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
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
          <SectionHeader index="08" title="About the Engineer" />
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

        {/* Right: metadata cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            overflow: "hidden",
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
