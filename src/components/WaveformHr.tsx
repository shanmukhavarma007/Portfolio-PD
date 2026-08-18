"use client";

export function WaveformHr({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="waveform-hr" style={style} aria-hidden="true">
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Baseline */}
        <line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke="var(--border-subtle)"
          strokeWidth="1"
        />
        {/* Signal pulses — timing diagram motif */}
        <path
          d="M0,12 L80,12 L80,4 L200,4 L200,12 L320,12 L320,4 L380,4 L380,12 L500,12 L500,4 L620,4 L620,12 L720,12 L720,4 L800,4 L800,12 L920,12 L920,4 L1020,4 L1020,12 L1200,12"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Secondary signal — lower frequency */}
        <path
          d="M0,12 L150,12 L150,18 L400,18 L400,12 L550,12 L550,18 L800,18 L800,12 L1000,12 L1000,18 L1200,18 L1200,12"
          stroke="var(--border-subtle)"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
