"use client";

import { useId, useEffect, useState } from "react";

type Variant = "waveform" | "pcb" | "ruler";

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

export function WaveformHr({
  style,
  variant = "waveform",
}: {
  style?: React.CSSProperties;
  variant?: Variant;
}) {
  const id = useId().replace(/:/g, "_");
  const reduced = usePrefersReducedMotion();
  return (
    <div className="waveform-hr" style={style} aria-hidden="true">
      {variant === "waveform" && <WaveformVariant id={id} animate={!reduced} />}
      {variant === "pcb" && <PcbTraceVariant id={id} />}
      {variant === "ruler" && <RulerVariant />}
    </div>
  );
}

const WAVE_PATH =
  "M0,14 L60,14 L60,6 L180,6 L180,14 L260,14 L260,6 L340,6 L340,14 L440,14 L440,6 L520,6 L520,14 L600,14 L600,6 L720,6 L720,14 L800,14 L800,6 L880,6 L880,14 L960,14 L960,6 L1060,6 L1060,14 L1140,14 L1140,6 L1200,6";

/**
 * Timing-diagram style: animated traveling signal pulse.
 *
 * Uses a traveling linearGradient instead of stroke-dashoffset.
 * The pulse shape is defined by the gradient stops, and the entire
 * gradient slides across the path via SMIL-animated x1/x2 values.
 * This avoids path-length mismatch bugs entirely.
 */
function WaveformVariant({ id, animate }: { id: string; animate: boolean }) {
  const baseGradId = `wb-${id}`;
  const pulseGradId = `wp-${id}`;
  const glowId = `wgl-${id}`;

  return (
    <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="none">
      <defs>
        {/* Base waveform gradient — static, fades at edges */}
        <linearGradient id={baseGradId} x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="15%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.7" />
          <stop offset="85%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>

        {/* Pulse gradient — bright center with soft edges, slides across the path */}
        <linearGradient
          id={pulseGradId}
          x1="0" y1="0" x2="400" y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="35%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="49%" stopColor="var(--accent)" stopOpacity="0.65" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.85" />
          <stop offset="51%" stopColor="var(--accent)" stopOpacity="0.65" />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="65%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          {animate && (
            <animate
              attributeName="x1"
              values="-400;1600"
              dur="5s"
              repeatCount="indefinite"
            />
          )}
          {animate && (
            <animate
              attributeName="x2"
              values="0;2000"
              dur="5s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>

        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base waveform — static, dim */}
      <path
        d={WAVE_PATH}
        stroke={`url(#${baseGradId})`}
        strokeWidth="1.2"
      />

      {/* Traveling pulse — bright segment slides across via animated gradient */}
      <path
        d={WAVE_PATH}
        stroke={`url(#${pulseGradId})`}
        strokeWidth="2.5"
        filter={`url(#${glowId})`}
      />
    </svg>
  );
}

/** PCB trace style: single trace with 90° jogs and via dots at bends */
function PcbTraceVariant({ id }: { id: string }) {
  const gradId = `pg-${id}`;

  return (
    <svg viewBox="0 0 1200 28" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0" />
          <stop offset="20%" stopColor="var(--accent-secondary)" stopOpacity="0.45" />
          <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="0.6" />
          <stop offset="80%" stopColor="var(--accent-secondary)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,14 L180,14 L180,8 L320,8 L320,14 L480,14 L480,20 L600,20 L600,14 L760,14 L760,8 L900,8 L900,14 L1050,14 L1050,20 L1200,20"
        stroke={`url(#${gradId})`}
        strokeWidth="1"
      />
      <circle cx="180" cy="14" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="180" cy="8" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="320" cy="8" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="320" cy="14" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="480" cy="14" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="480" cy="20" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="600" cy="20" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="600" cy="14" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="760" cy="14" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="760" cy="8" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="900" cy="8" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="900" cy="14" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="1050" cy="14" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
      <circle cx="1050" cy="20" r="2.5" fill="var(--accent-secondary)" opacity="0.5" />
    </svg>
  );
}

/** Ruler/tick-mark style: measurement scale with gradient fade */
function RulerVariant() {
  const ticks = [];
  for (let i = 0; i <= 60; i++) {
    const x = i * 20;
    const isMajor = i % 5 === 0;
    const y1 = isMajor ? 6 : 10;
    ticks.push(
      <line
        key={i}
        x1={x}
        y1={y1}
        x2={x}
        y2="18"
        stroke={isMajor ? "var(--accent)" : "var(--border)"}
        strokeWidth={isMajor ? "0.8" : "0.4"}
        opacity={isMajor ? "0.5" : "0.3"}
      />
    );
  }
  return (
    <svg viewBox="0 0 1200 28" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="wh-grad-r" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="10%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="90%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="18" x2="1200" y2="18" stroke="url(#wh-grad-r)" strokeWidth="0.8" />
      {ticks}
      <circle cx="600" cy="12" r="1.5" fill="var(--accent)" opacity="0.4" />
    </svg>
  );
}
