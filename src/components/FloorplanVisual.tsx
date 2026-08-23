/*
 * High-density EDA physical-design floorplan visualization.
 * Pure SVG (no canvas), deterministic layout — safe for SSR.
 */

type Cell = { x: number; y: number; w: number };

/* Deterministically "placed" standard cells (two rows in the core area) */
const STD_CELLS: Cell[] = [];
{
  let rowA = 46;
  let rowB = 46;
  for (let i = 0; i < 60 && (rowA < 470 || rowB < 470); i++) {
    if (rowA <= 468) {
      const w = 8 + ((i * 11) % 16);
      STD_CELLS.push({ x: rowA, y: 130, w });
      rowA += w + 3;
    }
    if (rowB <= 468) {
      const w = 8 + ((i * 17) % 20);
      STD_CELLS.push({ x: rowB, y: 146, w });
      rowB += w + 3;
    }
  }
}

const IO_PAD_TOP_XS = Array.from({ length: 17 }, (_, i) => 40 + i * 26);
const IO_PAD_SIDE_YS = Array.from({ length: 11 }, (_, i) => 48 + i * 28);
const MESH_V_XS = [75, 114, 153, 192, 231, 270, 309, 348, 387, 426, 465];
const MESH_H_YS = [70, 100, 130, 160, 190, 220, 250, 280, 310];
const CELL_ROW_YS_A = [128, 136, 144, 152, 160, 168, 176, 184, 192];
const CELL_ROW_YS_B = [324, 330, 336];
const CORNER_TICKS: [number, number][] = [
  [18, 18],
  [522, 18],
  [18, 362],
  [522, 362],
];

export function FloorplanVisual() {
  return (
    <svg
      viewBox="0 0 540 380"
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="ASIC floorplan visualization with macro blocks, power mesh and animated netlist routing"
    >
      {/* ── Deep silicon backdrop ── */}
      <rect
        x="4"
        y="4"
        width="532"
        height="372"
        rx="8"
        fill="#050b14"
        stroke="#1e293b"
      />
      <rect
        x="12"
        y="12"
        width="516"
        height="356"
        rx="5"
        fill="none"
        stroke="#1e293b"
        strokeOpacity="0.65"
      />

      {/* Corner coordinate tick marks */}
      <g stroke="#475569" strokeWidth="1">
        {CORNER_TICKS.map(([cx, cy]) => (
          <path key={`${cx}-${cy}`} d={`M${cx - 4} ${cy}H${cx + 4}M${cx} ${cy - 4}V${cy + 4}`} />
        ))}
      </g>

      {/* ── Outer I/O ring ── */}
      <g className="fill-slate-800 stroke-slate-700" strokeWidth="1">
        {IO_PAD_TOP_XS.map((x) => (
          <rect key={`pt-${x}`} x={x} y="20" width="14" height="8" rx="1.5" />
        ))}
        {IO_PAD_TOP_XS.map((x) => (
          <rect key={`pb-${x}`} x={x} y="346" width="14" height="8" rx="1.5" />
        ))}
        {IO_PAD_SIDE_YS.map((y) => (
          <rect key={`pl-${y}`} x="22" y={y} width="8" height="14" rx="1.5" />
        ))}
        {IO_PAD_SIDE_YS.map((y) => (
          <rect key={`pr-${y}`} x="510" y={y} width="8" height="14" rx="1.5" />
        ))}
      </g>

      {/* ── Power mesh (VDD/VSS orthogonal grid) ── */}
      <g className="stroke-cyan-500/10" strokeWidth="0.5">
        {MESH_V_XS.map((x) => (
          <line key={`mv-${x}`} x1={x} y1="42" x2={x} y2="338" />
        ))}
        {MESH_H_YS.map((y) => (
          <line key={`mh-${y}`} x1="36" y1={y} x2="504" y2={y} />
        ))}
      </g>

      {/* ── Standard-cell rows ── */}
      <g stroke="#334155" strokeOpacity="0.35" strokeWidth="0.5">
        {CELL_ROW_YS_A.map((y) => (
          <line key={`ra-${y}`} x1="40" y1={y} x2="500" y2={y} />
        ))}
        {CELL_ROW_YS_B.map((y) => (
          <line key={`rb-${y}`} x1="40" y1={y} x2="500" y2={y} />
        ))}
      </g>
      <g fill="#0D1830" stroke="#1E293B" strokeWidth="0.5">
        {STD_CELLS.map((cell, i) => (
          <rect key={`cell-${i}`} x={cell.x} y={cell.y} width={cell.w} height="12" rx="1" />
        ))}
      </g>

      {/* ── Macro blocks ── */}
      {/* SRAM_0 — top-left corner macro with memory-bank sub-stripes */}
      <g>
        <rect x="44" y="44" width="110" height="64" rx="3" fill="#0b1329" className="stroke-cyan-500/40" />
        <g stroke="#142036" strokeWidth="1">
          {[52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140].map((x) => (
            <line key={`s0-${x}`} x1={x} y1="68" x2={x} y2="102" />
          ))}
        </g>
        <text x="99" y="61" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" letterSpacing="1" className="fill-cyan-400">
          {"SRAM_0"}
        </text>
      </g>

      {/* SRAM_1 — adjacent to SRAM_0 */}
      <g>
        <rect x="162" y="44" width="86" height="64" rx="3" fill="#0b1329" className="stroke-cyan-500/40" />
        <g stroke="#142036" strokeWidth="1">
          {[170, 177, 184, 191, 198, 205, 212, 219, 226, 233, 240].map((x) => (
            <line key={`s1-${x}`} x1={x} y1="68" x2={x} y2="102" />
          ))}
        </g>
        <text x="205" y="61" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" letterSpacing="1" className="fill-cyan-400">
          {"SRAM_1"}
        </text>
      </g>

      {/* PLL_TOP — isolated analog macro with guard ring */}
      <g>
        <rect
          x="424"
          y="40"
          width="96"
          height="72"
          rx="4"
          fill="none"
          stroke="#10b981"
          strokeOpacity="0.5"
          strokeDasharray="5 3"
        />
        <rect x="431" y="47" width="82" height="58" rx="3" fill="#0b1329" className="stroke-cyan-500/40" />
        <text x="472" y="79" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" className="fill-slate-300">
          {"PLL_TOP"}
        </text>
      </g>

      {/* ALU_CORE / DSP_ENGINE — center-bottom macros */}
      <g>
        <rect x="110" y="215" width="150" height="100" rx="3" fill="#0b1329" className="stroke-cyan-500/40" />
        <g stroke="#142036" strokeWidth="1">
          <line x1="122" y1="245" x2="248" y2="245" />
          <line x1="122" y1="275" x2="248" y2="275" />
        </g>
        <text x="185" y="269" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" letterSpacing="1" className="fill-cyan-400">
          {"ALU_CORE"}
        </text>
      </g>
      <g>
        <rect x="272" y="215" width="152" height="100" rx="3" fill="#0b1329" className="stroke-cyan-500/40" />
        <g stroke="#142036" strokeWidth="1">
          <line x1="284" y1="245" x2="412" y2="245" />
          <line x1="284" y1="275" x2="412" y2="275" />
        </g>
        <text x="348" y="269" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" letterSpacing="1" className="fill-cyan-400">
          {"DSP_ENGINE"}
        </text>
      </g>

      {/* Core area label */}
      <text x="42" y="123" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" className="fill-cyan-400">
        {"STD_CELL_CORE (UTIL: 68.4%)"}
      </text>

      {/* ── Animated netlist routing — timing-critical nets (cyan) ── */}
      <g fill="none" stroke="#06b6d4" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
        <path className="net-pulse" d="M120,215 V150 H99 V110" />
        <path className="net-pulse" style={{ animationDelay: "-1s" }} d="M330,215 V150 H205 V110" />
        <path className="net-pulse" style={{ animationDelay: "-0.5s" }} d="M110,242 H30" />
        <path className="net-pulse" style={{ animationDelay: "-1.5s" }} d="M424,258 H510" />
        <path className="net-pulse" style={{ animationDelay: "-2s" }} d="M352,315 C352,336 386,330 392,344" />
      </g>
      <g fill="#06b6d4">
        <circle cx="120" cy="215" r="2" />
        <circle cx="99" cy="112" r="2" />
        <circle cx="330" cy="215" r="2" />
        <circle cx="205" cy="112" r="2" />
        <circle cx="32" cy="242" r="2" />
        <circle cx="510" cy="258" r="2" />
        <circle cx="392" cy="344" r="2" />
      </g>

      {/* ── Animated netlist routing — clock tree traces (emerald) ── */}
      <g fill="none" stroke="#10b981" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
        <path className="net-pulse" style={{ animationDelay: "-0.4s" }} d="M462,112 V180 H400 V213" />
        <path className="net-pulse" style={{ animationDelay: "-1.8s" }} d="M436,112 V192 C436,204 320,198 300,211" />
      </g>
      <g fill="#10b981">
        <circle cx="462" cy="114" r="2" />
        <circle cx="400" cy="211" r="2" />
        <circle cx="300" cy="211" r="2" />
      </g>

      {/* ── HUD overlays ── */}
      <text
        x="270"
        y="37"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="1"
        className="fill-slate-400"
      >
        {"DIE: 1.2mm x 0.9mm | TECH: 7nm FINFET | DRC: CLEAN"}
      </text>

      <circle
        cx="356"
        cy="361"
        r="3.5"
        fill="#10b981"
        className="status-dot-pulse"
        style={{ color: "#10B981" }}
      />
      <text
        x="364"
        y="365"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="0.5"
        className="fill-cyan-400"
      >
        {"[FLOORPLAN // METRICS_OK]"}
      </text>
    </svg>
  );
}
