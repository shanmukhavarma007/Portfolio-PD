"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const SKILL_GROUPS = [
  {
    title: "FOUNDATION",
    items: ["Digital Design", "CMOS", "Linux", "Tcl"],
    statusColor: "var(--accent-secondary)",
    statusLabel: "COMPLETED / HANDS-ON",
    progress: 100,
  },
  {
    title: "CURRENTLY DEVELOPING",
    items: ["Physical Design", "STA", "EDA Implementation Flow"],
    statusColor: "var(--warning)",
    statusLabel: "ACTIVE",
    progress: 65,
  },
  {
    title: "EDA — INSTITUTE",
    items: ["Cadence Innovus", "Cadence Tempus", "Cadence Genus"],
    statusColor: "var(--accent)",
    statusLabel: "TRAINING",
    progress: 45,
  },
  {
    title: "OPEN-SOURCE EDA",
    items: ["OpenLane"],
    statusColor: "var(--accent-secondary)",
    statusLabel: "INSTALLED / EXPLORING",
    progress: 30,
  },
];

const METADATA = [
  { label: "LOCATION", value: "Hyderabad, India" },
  { label: "EDUCATION", value: "B.Tech — ECE · 2026\nVignan\u2019s Institute of Information Technology" },
  { label: "TRAINING", value: "Currently undergoing intensive VLSI Physical Design training at Sumedha IT" },
  { label: "CURRENT FOCUS", value: "Physical Design · STA · EDA" },
  { label: "AUTOMATION", value: "Tcl · Linux · AWK" },
  { label: "EDA", value: "Cadence Innovus · Tempus · Genus · OpenLane" },
];

export function EngineeringProfile() {
  const ref = useScrollReveal();

  return (
    <section
      id="engineering"
      ref={ref}
      className="scroll-reveal"
      style={{
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
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
          gap: "clamp(32px, 5vw, 48px)",
          position: "relative",
        }}
        className="lg:!grid-cols-[7fr_5fr]"
      >
        {/* Left: profile info + metadata */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            className="badge badge--muted"
            style={{ marginBottom: "12px" }}
          >
            01 / ENGINEERING PROFILE
          </div>

          <WaveformHr style={{ marginBottom: "clamp(20px, 4vw, 32px)" }} />

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "0 0 16px 0",
            }}
          >
            Engineering Profile
          </h2>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(13px, 2.5vw, 15px)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "clamp(16px, 3vw, 24px)",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border-subtle)",
              maxWidth: "480px",
            }}
          >
            Location, education, training focus and core technical capabilities.
          </div>

          {/* Metadata — visual card-style layout instead of label/value rows */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
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
                }}
              >
                <div
                  className="badge badge--muted"
                  style={{ marginBottom: "4px", fontSize: "8px", padding: "2px 6px" }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(12px, 2.5vw, 14px)",
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

        {/* Right: technical summary with progress bars */}
        <div
          className="surface-card"
          style={{
            padding: "clamp(20px, 3vw, 32px)",
            background: "var(--surface-1)",
            borderRadius: "12px",
          }}
        >
          <div
            className="badge badge--muted"
            style={{
              marginBottom: "clamp(20px, 3vw, 28px)",
              paddingBottom: "12px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            TECHNICAL STATUS
          </div>

          {SKILL_GROUPS.map((group) => (
            <div key={group.title} style={{ marginBottom: "clamp(20px, 3vw, 28px)" }}>
              {/* Group header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: group.statusColor,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="badge"
                    style={{
                      color: group.statusColor,
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      fontSize: "10px",
                    }}
                  >
                    {group.title}
                  </span>
                </div>
                <span
                  className="badge badge--muted"
                  style={{ fontSize: "8px" }}
                >
                  {group.statusLabel}
                </span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: "3px",
                  background: "var(--border-subtle)",
                  marginBottom: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${group.progress}%`,
                    background: group.statusColor,
                    transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>

              {/* Items as compact chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      padding: "3px 8px",
                      background: "var(--surface-2)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
