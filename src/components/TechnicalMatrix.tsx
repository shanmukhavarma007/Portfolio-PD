"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

interface TechRow {
  domain: string;
  technologies: string;
  status: string;
  statusColor: string;
}

const TECH_ROWS: TechRow[] = [
  {
    domain: "Physical Design",
    technologies: "Floorplan / Placement / CTS / Routing",
    status: "LEARNING",
    statusColor: "var(--warning)",
  },
  {
    domain: "Timing",
    technologies: "STA / Setup / Hold Analysis",
    status: "PRACTICING",
    statusColor: "var(--warning)",
  },
  {
    domain: "Automation",
    technologies: "Tcl — Variables / Control Flow / Procedures / Regexp / File I/O",
    status: "COMPLETED / HANDS-ON",
    statusColor: "var(--success)",
  },
  {
    domain: "Systems",
    technologies: "Linux / AWK / Shell",
    status: "HANDS-ON",
    statusColor: "var(--success)",
  },
  {
    domain: "RTL",
    technologies: "Verilog",
    status: "FOUNDATION",
    statusColor: "var(--accent-secondary)",
  },
  {
    domain: "CMOS",
    technologies: "CMOS Fundamentals / Digital Design",
    status: "FOUNDATION",
    statusColor: "var(--accent-secondary)",
  },
];

const EDA_ROWS: TechRow[] = [
  {
    domain: "Cadence Innovus",
    technologies: "Physical Design / Implementation",
    status: "INSTITUTE — TRAINING",
    statusColor: "var(--accent)",
  },
  {
    domain: "Cadence Tempus",
    technologies: "Static Timing Analysis",
    status: "INSTITUTE — TRAINING",
    statusColor: "var(--accent)",
  },
  {
    domain: "Cadence Genus",
    technologies: "Synthesis",
    status: "INSTITUTE — TRAINING",
    statusColor: "var(--accent)",
  },
  {
    domain: "OpenLane",
    technologies: "RTL-to-GDSII / Open-source implementation flow",
    status: "INSTALLED / EXPLORING",
    statusColor: "var(--accent-secondary)",
  },
];

function TableSection({
  title,
  rows,
}: {
  title: string;
  rows: TechRow[];
}) {
  return (
    <div style={{ marginBottom: "48px" }}>
      {title && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
      )}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr 160px",
            gap: "24px",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--surface-1)",
          }}
          className="max-md:!grid-cols-1 max-md:!gap-1"
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            DOMAIN
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            TECHNOLOGIES
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            STATUS
          </div>
        </div>

        {/* Data rows */}
        {rows.map((row) => (
          <div
            key={row.domain}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 160px",
              gap: "24px",
              padding: "14px 16px",
              borderBottom: "1px solid var(--border-subtle)",
              transition: "background 0.15s ease",
              cursor: "default",
            }}
            className="max-md:!grid-cols-1 max-md:!gap-1 hover:!bg-[var(--surface-2)]"
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--text)",
              }}
            >
              {row.domain}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--text-secondary)",
              }}
            >
              {row.technologies}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                className="status-dot-pulse"
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: row.statusColor,
                  color: row.statusColor,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: row.statusColor,
                }}
              >
                {row.status}
              </span>
            </div>
          </div>
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
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)",
        position: "relative",
      }}
    >
      {/* Decorative section number */}
      <div className="section-deco-number" aria-hidden="true">03</div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
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
          03 / TECHNICAL ARSENAL
        </div>
        <WaveformHr style={{ marginBottom: "48px" }} />

        <TableSection title="" rows={TECH_ROWS} />
        <TableSection title="EDA ENVIRONMENT" rows={EDA_ROWS} />
      </div>
    </section>
  );
}