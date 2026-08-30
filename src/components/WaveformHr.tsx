"use client";

import { useId, useSyncExternalStore } from "react";

type Variant = "waveform" | "pcb" | "ruler" | "timing";

const reducedMotionQuery =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

function subscribeReducedMotion(onChange: () => void) {
  reducedMotionQuery?.addEventListener("change", onChange);
  return () => reducedMotionQuery?.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => reducedMotionQuery?.matches ?? false,
    () => false
  );
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
  const tall = variant === "timing";
  return (
    <div
      className={`waveform-hr w-full overflow-hidden${tall ? " waveform-hr--tall" : ""}`}
      style={style}
      aria-hidden="true"
    >
      {variant === "waveform" && <WaveformVariant id={id} animate={!reduced} />}
      {variant === "pcb" && <PcbTraceVariant id={id} />}
      {variant === "ruler" && <RulerVariant />}
      {variant === "timing" && (
        <TimingDiagramVariant id={id} animate={!reduced} />
      )}
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

/**
 * Digital clock pulse / setup & hold timing diagram.
 * Pure SVG + CSS keyframes: the clock & data edges sweep with a traveling
 * highlight, and the setup/hold violation window pulses. Requires no JS.
 */
function TimingDiagramVariant({ id, animate }: { id: string; animate: boolean }) {
  const clkId = `clk-${id}`;
  const dataId = `dt-${id}`;
  const sweepId = `sw-${id}`;

  // CLK: 4 complete square-wave cycles across 1200px (period 300px)
  const clkPath =
    "M0,40 L120,40 L120,20 L240,20 L240,40 L330,40 L330,20 L450,20 L450,40 L540,40 L540,20 L660,20 L660,40 L750,40 L750,20 L870,20 L870,40 L960,40 L960,20 L1080,20 L1080,40 L1200,40";
  // DATA: sampled high across the middle half, toggling around clock edges
  const dataPath =
    "M0,96 L150,96 L150,80 L420,80 L420,96 L600,96 L600,112 L840,112 L840,96 L1050,96 L1050,112 L1200,112";

  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={clkId} x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="25%" stopColor="var(--accent)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.7" />
          <stop offset="75%" stopColor="var(--accent)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={dataId} x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0" />
          <stop offset="25%" stopColor="var(--accent-secondary)" stopOpacity="0.55" />
          <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="0.6" />
          <stop offset="75%" stopColor="var(--accent-secondary)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0" />
        </linearGradient>
        {/* Traveling bright sweep highlight for measuring-edge scan */}
        <linearGradient id={sweepId} x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="40%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          {animate && (
            <>
              <animate attributeName="x1" values="-260;1400" dur="4s" repeatCount="indefinite" />
              <animate attributeName="x2" values="0;1660" dur="4s" repeatCount="indefinite" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Lane guidelines */}
      <line x1="0" y1="30" x2="1200" y2="30" stroke="var(--border)" strokeOpacity="0.25" strokeWidth="0.5" />
      <line x1="0" y1="60" x2="1200" y2="60" stroke="var(--border)" strokeOpacity="0.25" strokeWidth="0.5" />
      <line x1="0" y1="90" x2="1200" y2="90" stroke="var(--border)" strokeOpacity="0.25" strokeWidth="0.5" />

      {/* Time tick marks */}
      {Array.from({ length: 13 }, (_, i) => i * 100).map((x) => (
        <line key={x} x1={x} y1="6" x2={x} y2="12" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.6" />
      ))}

      {/* Lane labels */}
      <text x="8" y="12" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1" fill="var(--accent)" opacity="0.8">
        {"CLK"}
      </text>
      <text x="8" y="68" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1" fill="var(--accent-secondary)" opacity="0.8">
        {"DATA"}
      </text>

      {/* Setup / hold violation window */}
      <line x1="560" y1="48" x2="560" y2="78" stroke="#f59e0b" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="3 3" className="td-marker" />
      <line x1="660" y1="48" x2="660" y2="78" stroke="#f59e0b" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="3 3" className="td-marker" style={{ animationDelay: "-0.25s" }} />
      <rect x="560" y="52" width="100" height="26" fill="#f59e0b" opacity="0.06" className="td-window" />
      <text x="585" y="116" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="0.5" fill="#f59e0b" opacity="0.85">
        {"setup"}
      </text>
      <text x="668" y="116" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="0.5" fill="#f59e0b" opacity="0.85">
        {"hold"}
      </text>

      {/* CLK + DATA signal paths (base, dim) */}
      <path d={clkPath} stroke={`url(#${clkId})`} strokeWidth="1" />
      <path d={dataPath} stroke={`url(#${dataId})`} strokeWidth="1" />

      {/* Traveling measurement sweep highlight */}
      <path d={clkPath} stroke={`url(#${sweepId})`} strokeWidth="2.2" strokeLinecap="round" />
      <path d={dataPath} stroke={`url(#${sweepId})`} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** PCB trace style: single trace with 90° jogs and via dots at bends */
function PcbTraceVariant({ id }: { id: string }) {  const gradId = `pg-${id}`;

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
