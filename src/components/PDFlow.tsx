"use client";

import { useState, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeader } from "./SectionHeader";

interface PDStage {
  id: string;
  label: string;
  shortLabel: string;
  stageNum: string;
  description: string;
  concepts: string[];
}

const PD_STAGES: PDStage[] = [
  {
    id: "rtl",
    label: "RTL",
    shortLabel: "RTL",
    stageNum: "01",
    description: "Register-Transfer Level design capture and lint verification.",
    concepts: ["LINT", "CDC", "SIM"],
  },
  {
    id: "synth",
    label: "SYNTHESIS",
    shortLabel: "SYN",
    stageNum: "02",
    description: "Logic synthesis converting RTL into a gate-level netlist.",
    concepts: ["GTL", "MAPPING", "OPT"],
  },
  {
    id: "floorplan",
    label: "FLOORPLAN",
    shortLabel: "FP",
    stageNum: "03",
    description: "Die size definition, I/O placement, and power grid structuring.",
    concepts: ["PADS", "POWER GRID", "MACROS"],
  },
  {
    id: "placement",
    label: "PLACEMENT",
    shortLabel: "PLACE",
    stageNum: "04",
    description: "Standard cell placement with congestion and timing optimization.",
    concepts: ["GLOBAL", "DETAIL", "LEGALIZATION"],
  },
  {
    id: "cts",
    label: "CTS",
    shortLabel: "CTS",
    stageNum: "05",
    description: "Clock Tree Synthesis ensuring minimal skew and latency.",
    concepts: ["SKEW", "LATENCY", "BUFFERS"],
  },
  {
    id: "routing",
    label: "ROUTING",
    shortLabel: "ROUTE",
    stageNum: "06",
    description: "Detailed signal routing connecting cells without DRC violations.",
    concepts: ["GLOBAL", "TRACK", "DETAIL"],
  },
  {
    id: "sta",
    label: "STA",
    shortLabel: "STA",
    stageNum: "07",
    description: "Static Timing Analysis validating setup and hold constraints.",
    concepts: ["SETUP", "HOLD", "SLACK"],
  },
  {
    id: "signoff",
    label: "SIGNOFF",
    shortLabel: "SIGN",
    stageNum: "08",
    description: "Final physical verification before tape-out fabrication.",
    concepts: ["DRC", "LVS", "IR DROP", "EM"],
  },
];

export function PDFlow() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [laserLeft, setLaserLeft] = useState<number | null>(null);
  const [contentKey, setContentKey] = useState<string>("empty");
  const nodeRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useScrollReveal();

  const activeData = PD_STAGES.find((s) => s.id === activeStage);

  const handleNodeEnter = useCallback(
    (stageId: string) => {
      const btn = nodeRefs.current.get(stageId);
      const container = containerRef.current;
      if (btn && container) {
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const centerX = btnRect.left - containerRect.left + btnRect.width / 2;
        setLaserLeft(centerX);
      }
      if (stageId !== activeStage) {
        setContentKey(stageId);
      }
      setActiveStage(stageId);
    },
    [activeStage],
  );

  const handleNodeLeave = useCallback(() => {
    setActiveStage(null);
    setLaserLeft(null);
    setContentKey("empty");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scroll-reveal section-glow section-divider-top section-divider-bottom"
      style={{
        padding: "clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px)",
        background: "#060b13",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}
      >
        <SectionHeader index="02" title="Physical Design Flow" />

        {/* Flow nodes + laser trace container */}
        <div style={{ position: "relative" }}>
          {/* Horizontal flow */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0",
              overflowX: "auto",
              paddingBottom: "16px",
              position: "relative",
              zIndex: 2,
            }}
            className="max-md:!flex-col max-md:!gap-0"
          >
            {PD_STAGES.map((stage, i) => {
              const isActive = activeStage === stage.id;
              const isLast = i === PD_STAGES.length - 1;

              return (
                <div
                  key={stage.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                  className="max-md:!w-full max-md:!flex-col max-md:!items-stretch"
                >
                  {/* Node */}
                  <button
                    ref={(el) => {
                      if (el) nodeRefs.current.set(stage.id, el);
                    }}
                    onMouseEnter={() => handleNodeEnter(stage.id)}
                    onMouseLeave={handleNodeLeave}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 8px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      minWidth: "80px",
                      transition: "all 0.2s ease",
                    }}
                    className="max-md:!w-full max-md:!items-start max-md:!flex-row max-md:!gap-4 max-md:!px-0 max-md:!py-3"
                  >
                    {/* Dot */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: isActive ? "#00E5FF" : "var(--surface-4)",
                        border: isActive ? "none" : "1px solid var(--border)",
                        transition: "all 0.3s ease",
                        boxShadow: isActive
                          ? "0 0 12px #00E5FF"
                          : "none",
                        flexShrink: 0,
                      }}
                    />

                    {/* Short label */}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        color: isActive ? "#00E5FF" : "var(--text-muted)",
                        textTransform: "uppercase",
                        transition: "color 0.2s ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {stage.shortLabel}
                    </span>

                    {/* Full label (desktop only) */}
                    <span
                      className="hidden md:block"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "8px",
                        letterSpacing: "0.06em",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        marginTop: "-4px",
                      }}
                    >
                      {stage.label}
                    </span>
                  </button>

                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className="max-md:!hidden"
                      style={{
                        width: "32px",
                        height: "1px",
                        background: isActive
                          ? "#00E5FF"
                          : "var(--border-subtle)",
                        transition: "background 0.3s ease",
                        flexShrink: 0,
                        marginTop: "20px",
                      }}
                    />
                  )}
                  {/* Vertical connector (mobile) */}
                  {!isLast && (
                    <div
                      className="md:!hidden"
                      style={{
                        width: "1px",
                        height: "16px",
                        background: "var(--border-subtle)",
                        marginLeft: "4px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Laser trace line */}
          {activeStage && laserLeft !== null && (
            <div
              className="pd-laser-trace"
              key={`laser-${activeStage}`}
              style={{
                position: "absolute",
                top: "52px",
                left: `${laserLeft}px`,
                width: "1px",
                height: "80px",
                background: "linear-gradient(to bottom, #00E5FF, transparent)",
                zIndex: 1,
                pointerEvents: "none",
                transform: "translateX(-0.5px)",
              }}
            />
          )}
        </div>

        {/* Detail readout — Cyberpunk Terminal HUD */}
        <div
          style={{
            marginTop: "24px",
            minHeight: "160px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {activeData ? (
            <div
              key={contentKey}
              className="pd-readout-animate pd-hud"
              style={{ position: "relative" }}
            >
              {/* Corner bracket accents */}
              <span className="pd-hud-bracket pd-hud-bracket--tl" />
              <span className="pd-hud-bracket pd-hud-bracket--tr" />
              <span className="pd-hud-bracket pd-hud-bracket--bl" />
              <span className="pd-hud-bracket pd-hud-bracket--br" />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1, padding: "clamp(20px, 3vw, 32px)" }}>

                {/* Status badge header */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    color: "rgba(0, 229, 255, 0.6)",
                    marginBottom: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  STATUS: ACTIVE // {activeData.stageNum}_STAGE
                </div>

                {/* Stage title */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#00E5FF",
                    letterSpacing: "0.1em",
                    marginBottom: "14px",
                    textTransform: "uppercase",
                    textShadow: "0 0 10px rgba(0, 229, 255, 0.4)",
                  }}
                >
                  {activeData.label}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    lineHeight: 1.8,
                    color: "#94A3B8",
                    margin: "0 0 20px 0",
                    maxWidth: "680px",
                  }}
                >
                  {activeData.description}
                </p>

                {/* Concept chips — terminal micro-switches */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {activeData.concepts.map((c) => (
                    <span
                      key={c}
                      className="pd-hud-chip"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              key="empty"
              className="pd-readout-animate"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                padding: "20px 0 20px 24px",
                borderLeft: "2px solid rgba(0, 229, 255, 0.15)",
              }}
            >
              Hover a stage to explore →
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
