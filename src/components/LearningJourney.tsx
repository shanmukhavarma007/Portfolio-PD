"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WaveformHr } from "./WaveformHr";

const FOUNDATION_NODES = [
  {
    id: "digital-design",
    label: "DIGITAL DESIGN",
    concepts: "Logic · Boolean Algebra · K-Maps · Combinational · Sequential",
  },
  {
    id: "cmos",
    label: "CMOS",
    concepts:
      "MOSFET · CMOS Logic · Inverter · Digital CMOS Fundamentals",
  },
  {
    id: "linux",
    label: "LINUX",
    concepts: "CLI · Filesystem · Processes · Shell · AWK",
  },
  {
    id: "rtl-verilog",
    label: "RTL / VERILOG",
    concepts: "RTL Modeling · Control Flow · Blocking / Non-blocking · Basic Verilog",
  },
  {
    id: "tcl",
    label: "TCL",
    concepts:
      "Variables · Lists · Arrays · Dictionaries · Regexp · File I/O · Procedures",
  },
];

const CX = 300;
const CY = 240;
const RADIUS = 160;
const SVG_H = 560;
const NODE_POSITIONS: [number, number][] = [
  [CX, CY - RADIUS + 60],
  [CX - RADIUS * 0.95, CY - RADIUS * 0.31 + 60],
  [CX + RADIUS * 0.95, CY - RADIUS * 0.31 + 60],
  [CX - RADIUS * 0.59, CY + RADIUS * 0.81 + 60],
  [CX + RADIUS * 0.59, CY + RADIUS * 0.81 + 60],
];

const BUILDING_ITEMS = [
  { label: "PHYSICAL DESIGN", concepts: "Floorplanning · Placement · CTS · Routing" },
  { label: "STA", concepts: "Setup · Hold · Timing Analysis" },
  { label: "EDA", concepts: "Innovus · Tempus · Genus" },
];

/** Manhattan routing path from hub center to satellite node */
function manhattanPath(hubX: number, hubY: number, nx: number, ny: number): string {
  const midX = Math.round((hubX + nx) / 2);
  return `M${hubX},${hubY} L${midX},${hubY} L${midX},${ny} L${nx},${ny}`;
}

function splitLabel(label: string): string[] {
  const idx = label.indexOf(" / ");
  if (idx !== -1) {
    return [label.slice(0, idx), label.slice(idx + 3)];
  }
  return [label];
}

function splitConcepts(concepts: string): string[] {
  return concepts.split("·").map((s) => s.trim()).filter(Boolean);
}

export function LearningJourney() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const ref = useScrollReveal();

  const getVisibleNode = (id: string) => {
    if (hoveredNode === id || expandedNode === id) return id;
    return null;
  };

  return (
    <section
      id="journey"
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
      {/* IC floorplan-style background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.06,
        }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fp-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="4" y="4" width="112" height="112" fill="none" stroke="var(--border)" strokeWidth="0.5" />
              <rect x="8" y="8" width="48" height="32" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="60" y="8" width="52" height="20" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="60" y="28" width="24" height="12" fill="none" stroke="var(--accent)" strokeWidth="0.3" opacity="0.5" />
              <rect x="8" y="44" width="32" height="28" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="44" y="44" width="36" height="20" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="84" y="44" width="28" height="28" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="8" y="76" width="68" height="36" fill="none" stroke="var(--border)" strokeWidth="0.3" />
              <rect x="80" y="76" width="32" height="36" fill="none" stroke="var(--accent-secondary)" strokeWidth="0.3" opacity="0.4" />
              <line x1="56" y1="8" x2="56" y2="112" stroke="var(--accent)" strokeWidth="0.2" opacity="0.3" />
              <line x1="8" y1="42" x2="112" y2="42" stroke="var(--border)" strokeWidth="0.2" opacity="0.3" />
              <line x1="8" y1="74" x2="112" y2="74" stroke="var(--border)" strokeWidth="0.2" opacity="0.2" />
              <line x1="40" y1="8" x2="40" y2="112" stroke="var(--border)" strokeWidth="0.15" opacity="0.2" />
              <line x1="80" y1="8" x2="80" y2="112" stroke="var(--border)" strokeWidth="0.15" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fp-grid)" />
        </svg>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
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
          06 / FOUNDATION BUILT
        </div>
        <WaveformHr style={{ marginBottom: "clamp(24px, 4vw, 48px)" }} />

        {/* Main content: heading + foundation map */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
          }}
          className="lg:!grid-cols-[3fr_4fr]"
        >
          {/* Left: heading + description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                margin: 0,
              }}
            >
              From
              <br />
              Fundamentals
              <br />
              to Implementation
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.6vw, 16px)",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                margin: 0,
                maxWidth: "400px",
              }}
            >
              A strong foundation across digital systems, CMOS, Linux, RTL
              and Tcl — now being applied to Physical Design.
            </p>
          </div>

          {/* Right: foundation map — desktop */}
          <div className="hidden md:block" style={{ width: "100%" }}>
            <svg
              viewBox={`0 0 600 ${SVG_H}`}
              style={{ width: "100%", height: "auto" }}
              overflow="visible"
              role="img"
              aria-label="VLSI foundation map showing five completed disciplines connected to a central hub"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-strong">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="hub-glow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Radial gradient for node fills */}
                <radialGradient id="node-grad" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="var(--surface-3)" />
                  <stop offset="100%" stopColor="var(--surface-1)" />
                </radialGradient>
                <radialGradient id="node-grad-active" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="var(--surface-4)" />
                  <stop offset="100%" stopColor="var(--surface-2)" />
                </radialGradient>
              </defs>

              {/* Manhattan routing traces — connection lines */}
              {FOUNDATION_NODES.map((node, i) => {
                const [nx, ny] = NODE_POSITIONS[i];
                const visible = getVisibleNode(node.id);
                const d = manhattanPath(CX, CY, nx, ny);
                return (
                  <g key={`conn-${node.id}`}>
                    {/* Trace background (wider, dimmer) */}
                    <path
                      d={d}
                      fill="none"
                      stroke={visible ? "var(--accent)" : "var(--border)"}
                      strokeOpacity={visible ? 0.15 : 0.08}
                      strokeWidth="4"
                      strokeLinecap="square"
                    />
                    {/* Main trace */}
                    <path
                      d={d}
                      fill="none"
                      className="fd-conn"
                      stroke={visible ? "var(--accent)" : "var(--border)"}
                      strokeOpacity={visible ? 0.6 : 0.3}
                      strokeWidth="1"
                      strokeLinecap="square"
                    />
                    {/* Animated signal pulse along trace */}
                    <circle r="2.5" fill="var(--accent)" opacity="0.7">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${i * 0.6}s`}
                        path={d}
                      />
                    </circle>
                    <circle r="1.2" fill="var(--accent)" opacity="0.4">
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${i * 0.6}s`}
                        path={d}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Central hub — larger, glowing, pulsing border */}
              <g>
                {/* Outer glow halo */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={48}
                  fill="var(--accent)"
                  opacity={0.04}
                  filter="url(#hub-glow)"
                />
                {/* Pulsing outer ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={40}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  strokeOpacity={0.3}
                >
                  <animate
                    attributeName="r"
                    values="40;44;40"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.3;0.12;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Hub body — rounded rect with gradient feel */}
                <rect
                  x={CX - 72}
                  y={CY - 26}
                  width={144}
                  height={52}
                  fill="var(--surface-2)"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeOpacity={0.6}
                  rx="3"
                  filter="url(#glow)"
                />
                {/* Inner accent line */}
                <rect
                  x={CX - 70}
                  y={CY - 24}
                  width={140}
                  height={48}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                  strokeOpacity={0.15}
                  rx="2"
                />
                <text
                  x={CX}
                  y={CY - 3}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize="13"
                  fontWeight="600"
                  letterSpacing="0.18em"
                  fill="var(--text)"
                >
                  VLSI
                </text>
                <text
                  x={CX}
                  y={CY + 13}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="7.5"
                  letterSpacing="0.22em"
                  fill="var(--text-muted)"
                >
                  FOUNDATION
                </text>
              </g>

              {/* Foundation nodes — concentric ring style with radial gradient */}
              {FOUNDATION_NODES.map((node, i) => {
                const [nx, ny] = NODE_POSITIONS[i];
                const visible = getVisibleNode(node.id);
                const lines = splitLabel(node.label);
                const conceptLines = splitConcepts(node.concepts);
                const cardAbove = ny < CY;

                let cardH = 0;
                let cardY = 0;
                let cardAboveActual = false;
                if (visible) {
                  cardH = 44 + conceptLines.length * 11;
                  if (cardAbove && ny - cardH - 10 >= 0) {
                    cardY = ny - cardH - 10;
                    cardAboveActual = true;
                  } else if (!cardAbove && ny + 36 + cardH <= SVG_H) {
                    cardY = ny + 36;
                    cardAboveActual = false;
                  } else if (ny >= SVG_H / 2) {
                    cardY = Math.max(0, ny - cardH - 10);
                    cardAboveActual = true;
                  } else {
                    cardY = Math.min(SVG_H - cardH, ny + 36);
                    cardAboveActual = false;
                  }
                }

                return (
                  <g key={node.id}>
                    {/* Node labels */}
                    {lines.map((line, li) => {
                      let labelY: number;
                      if (visible) {
                        if (cardAboveActual) {
                          labelY = ny + 48 + li * 13;
                        } else {
                          labelY = cardY - 20 - (lines.length - 1 - li) * 13;
                        }
                      } else {
                        labelY = ny + 48 + li * 13;
                      }
                      return (
                        <text
                          key={li}
                          x={nx}
                          y={labelY}
                          textAnchor="middle"
                          fontFamily="var(--font-mono)"
                          fontSize="9"
                          letterSpacing="0.08em"
                          fill={
                            visible ? "var(--text)" : "var(--text-secondary)"
                          }
                          style={{ transition: "fill 0.3s ease" }}
                        >
                          {line}
                        </text>
                      );
                    })}

                    {/* Interactive hitbox + visual node */}
                    <g
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() =>
                        setExpandedNode(expandedNode === node.id ? null : node.id)
                      }
                    >
                      {/* Invisible hitbox */}
                      <rect
                        x={nx - 80}
                        y={ny - 60}
                        width={160}
                        height={120}
                        fill="transparent"
                      />

                      {/* Hover glow background */}
                      {visible && (
                        <circle
                          cx={nx}
                          cy={ny}
                          r={36}
                          fill="var(--accent)"
                          opacity={0.06}
                        />
                      )}

                      {/* Outer ring — via/pad style */}
                      <circle
                        cx={nx}
                        cy={ny}
                        r={28}
                        fill="none"
                        stroke={
                          visible ? "var(--accent)" : "var(--border-subtle)"
                        }
                        strokeWidth={visible ? 1.5 : 0.8}
                        strokeOpacity={visible ? 0.5 : 0.4}
                        style={{ transition: "all 0.3s ease" }}
                      />

                      {/* Main node body — radial gradient fill */}
                      <circle
                        cx={nx}
                        cy={ny}
                        r={22}
                        fill={
                          visible
                            ? "url(#node-grad-active)"
                            : "url(#node-grad)"
                        }
                        stroke={
                          visible ? "var(--accent)" : "var(--border)"
                        }
                        strokeWidth={visible ? 1.5 : 1}
                        filter={visible ? "url(#glow)" : undefined}
                        style={{ transition: "all 0.3s ease" }}
                      />

                      {/* Inner concentric ring — IC pad detail */}
                      <circle
                        cx={nx}
                        cy={ny}
                        r={14}
                        fill="none"
                        stroke={
                          visible ? "var(--accent)" : "var(--border-subtle)"
                        }
                        strokeWidth="0.5"
                        strokeOpacity={visible ? 0.4 : 0.25}
                        style={{ transition: "all 0.3s ease" }}
                      />

                      {/* Center dot */}
                      <circle
                        cx={nx}
                        cy={ny}
                        r={3.5}
                        fill="var(--accent)"
                        opacity={visible ? 1 : 0.4}
                        filter={visible ? "url(#glow-strong)" : undefined}
                        style={{ transition: "all 0.3s ease" }}
                      />

                      {/* Checkmark — prominent when visible */}
                      {visible && (
                        <text
                          x={nx}
                          y={ny - 38}
                          textAnchor="middle"
                          fontFamily="var(--font-mono)"
                          fontSize="9"
                          letterSpacing="0.06em"
                          fill="var(--accent)"
                          filter="url(#glow)"
                        >
                          &#10003;
                        </text>
                      )}
                    </g>

                    {/* Node card — hover/click popup */}
                    {visible && (
                      <g className="fd-card-enter">
                        <rect
                          x={nx - 100}
                          y={cardY}
                          width={200}
                          height={cardH}
                          fill="var(--surface-2)"
                          stroke="var(--accent)"
                          strokeWidth="1"
                          strokeOpacity={0.35}
                          rx="2"
                        />
                        <text
                          x={nx}
                          y={cardY + 18}
                          textAnchor="middle"
                          fontFamily="var(--font-mono)"
                          fontSize="8"
                          letterSpacing="0.08em"
                          fill="var(--accent)"
                        >
                          &#10003; COMPLETED
                        </text>
                        <text
                          x={nx}
                          y={cardY + 34}
                          textAnchor="middle"
                          fontFamily="var(--font-display)"
                          fontSize="12"
                          fontWeight="500"
                          letterSpacing="0.04em"
                          fill="var(--text)"
                        >
                          {node.label}
                        </text>
                        <text
                          x={nx}
                          y={cardY + 50}
                          textAnchor="middle"
                          fontFamily="var(--font-mono)"
                          fontSize="7.5"
                          letterSpacing="0.03em"
                          fill="var(--text-secondary)"
                        >
                          {conceptLines.map((concept, ci) => (
                            <tspan
                              key={ci}
                              x={nx}
                              dy={ci === 0 ? 0 : 11}
                            >
                              {concept}
                            </tspan>
                          ))}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Foundation map — mobile (vertical connected list) */}
          <div
            className="md:hidden"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              width: "100%",
            }}
          >
            {/* Central hub label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                background: "var(--surface-3)",
                border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                marginBottom: "0",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  flexShrink: 0,
                  boxShadow: "0 0 8px color-mix(in srgb, var(--accent) 40%, transparent)",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "var(--text)",
                  }}
                >
                  VLSI FOUNDATION
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  CORE DISCIPLINES
                </div>
              </div>
            </div>

            {/* Connector line */}
            <div
              style={{
                width: "1px",
                height: "12px",
                background: "var(--border)",
                marginLeft: "19px",
              }}
            />

            {/* Node list */}
            {FOUNDATION_NODES.map((node, idx) => {
              const active = expandedNode === node.id;
              const lines = splitLabel(node.label);
              return (
                <div key={node.id}>
                  <button
                    onClick={() =>
                      setExpandedNode(active ? null : node.id)
                    }
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      width: "100%",
                      padding: "14px 16px",
                      background: active
                        ? "color-mix(in srgb, var(--accent) 5%, transparent)"
                        : "transparent",
                      border: "none",
                      borderLeft: active
                        ? "2px solid var(--accent)"
                        : "2px solid var(--border-subtle)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: active
                          ? "var(--accent)"
                          : "var(--surface-2)",
                        border: active
                          ? "none"
                          : "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "1px",
                        boxShadow: active
                          ? "0 0 10px color-mix(in srgb, var(--accent) 30%, transparent)"
                          : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: active ? "var(--bg)" : "var(--text-muted)",
                        }}
                      >
                        &#10003;
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          letterSpacing: "0.06em",
                          color: active
                            ? "var(--text)"
                            : "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {lines.map((line, li) => (
                          <span key={li}>
                            {li > 0 && (
                              <span
                                style={{
                                  color: "var(--text-muted)",
                                  margin: "0 2px",
                                }}
                              >
                                /
                              </span>
                            )}
                            {line}
                          </span>
                        ))}
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "8px",
                            letterSpacing: "0.1em",
                            color: "var(--accent)",
                            opacity: active ? 1 : 0.5,
                            marginLeft: "auto",
                            transition: "opacity 0.2s ease",
                          }}
                        >
                          COMPLETED
                        </span>
                      </div>

                      {active && (
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            lineHeight: 1.6,
                            color: "var(--text-secondary)",
                            marginTop: "6px",
                          }}
                        >
                          {node.concepts}
                        </div>
                      )}
                    </div>
                  </button>
                  {idx < FOUNDATION_NODES.length - 1 && (
                    <div
                      style={{
                        width: "1px",
                        height: "0px",
                        background: "var(--border)",
                        marginLeft: "25px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Transition strip */}
        <div
          style={{
            marginTop: "clamp(32px, 5vw, 56px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              marginBottom: "4px",
            }}
          >
            FOUNDATION COMPLETE
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              lineHeight: 1,
            }}
          >
            ↓
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--accent-secondary)",
              marginTop: "4px",
              marginBottom: "clamp(20px, 3vw, 36px)",
            }}
          >
            CURRENTLY BUILDING
          </div>
        </div>

        {/* Currently Building */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
          className="md:!grid-cols-3"
        >
          {BUILDING_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                padding: "24px",
                background: "var(--bg)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--surface-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <span
                  className="status-dot-pulse"
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--warning)",
                    color: "var(--warning)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                    color: "var(--text)",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {item.concepts}
              </div>
            </div>
          ))}
        </div>

        {/* Open-Source Exploration */}
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              height: "1px",
              flex: 1,
              background: "var(--border-subtle)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            OPEN-SOURCE EXPLORATION
          </span>
          <div
            style={{
              height: "1px",
              flex: "1",
              background: "var(--border-subtle)",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.06em",
            color: "var(--text-secondary)",
            marginTop: "12px",
          }}
        >
          OpenLane — Installed
        </div>
      </div>
    </section>
  );
}
