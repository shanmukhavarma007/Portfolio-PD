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
      STD_CELLS.push({ x: rowA, y: 154, w });
      rowA += w + 3;
    }
    if (rowB <= 468) {
      const w = 8 + ((i * 17) % 20);
      STD_CELLS.push({ x: rowB, y: 170, w });
      rowB += w + 3;
    }
  }
}

const IO_PAD_TOP_XS = Array.from({ length: 17 }, (_, i) => 40 + i * 26);
const IO_PAD_SIDE_YS = Array.from({ length: 11 }, (_, i) => 48 + i * 28);
const MESH_V_XS = [75, 114, 153, 192, 231, 270, 309, 348, 387, 426, 465];
const MESH_H_YS = [70, 100, 130, 160, 190, 220, 250, 280, 310];
const CELL_ROW_YS_A = [152, 160, 168, 176, 184, 192, 200, 208, 216];
const CELL_ROW_YS_B = [324, 330, 336];
const CORNER_TICKS: [number, number][] = [
  [18, 18],
  [522, 18],
  [18, 362],
  [522, 362],
];

/* Tooltip primitive — hidden group revealed on .fp-block:hover via CSS.
   Rendered in a top-most floating layer so it never paints beneath shapes. */
function FpTip({
  x,
  y,
  title,
  lines,
  className = "",
}: {
  x: number;
  y: number;
  title: string;
  lines: string[];
  className?: string;
}) {
  return (
    <g className={`fp-tip ${className}`} transform={`translate(${x} ${y})`} pointerEvents="none">
      <rect x="-78" y="0" width="156" height={18 + lines.length * 13} rx="4" fill="#071527" stroke="#06b6d4" strokeOpacity="0.55" strokeWidth="0.75" />
      <text x="-68" y="13" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" letterSpacing="1" className="fill-cyan-400">
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x="-68"
          y={27 + i * 13}
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          className="fill-slate-300"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function FloorplanVisual() {
  return (
    <svg
      viewBox="0 0 540 380"
      className="floorplan-die w-full h-auto max-w-[340px] sm:max-w-md lg:max-w-full mx-auto"
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

      {/* ── Interactive overlay regions (transparent hit targets, drawn beneath macros so blocks win hover) ── */}
      {/* I/O ring */}
      <g className="fp-block fp-block--io">
        <rect x="16" y="16" width="508" height="348" rx="6" fill="transparent" className="fp-region" />
      </g>

      {/* Power grid */}
      <g className="fp-block fp-block--pg">
        <rect x="68" y="160" width="404" height="120" rx="2" fill="transparent" className="fp-region" />
      </g>

      {/* Standard-cell core area */}
      <g className="fp-block fp-block--core">
        <rect x="40" y="112" width="460" height="90" rx="2" fill="transparent" className="fp-region" />
        <text x="42" y="139" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" className="fill-cyan-400" pointerEvents="none">
          {"STD_CELL_CORE (UTIL: 68.4%)"}
        </text>
      </g>

      {/* ── Macro blocks (interactive tooltips) ── */}
      {/* SRAM_0 — top-left corner macro with memory-bank sub-stripes (kept clear of top IO ring) */}
      <g className="fp-block fp-block--sram0">
        <rect x="44" y="56" width="110" height="64" rx="3" fill="#0b1329" className="stroke-cyan-500/40 fp-shape" />
        <g stroke="#142036" strokeWidth="1">
          {[52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140].map((x) => (
            <line key={`s0-${x}`} x1={x} y1="80" x2={x} y2="114" />
          ))}
        </g>
        <text x="99" y="73" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" letterSpacing="1" className="fill-cyan-400" pointerEvents="none">
          {"SRAM_0"}
        </text>
      </g>

      {/* SRAM_1 — adjacent to SRAM_0 */}
      <g className="fp-block fp-block--sram1">
        <rect x="162" y="56" width="86" height="64" rx="3" fill="#0b1329" className="stroke-cyan-500/40 fp-shape" />
        <g stroke="#142036" strokeWidth="1">
          {[170, 177, 184, 191, 198, 205, 212, 219, 226, 233, 240].map((x) => (
            <line key={`s1-${x}`} x1={x} y1="80" x2={x} y2="114" />
          ))}
        </g>
        <text x="205" y="73" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" letterSpacing="1" className="fill-cyan-400" pointerEvents="none">
          {"SRAM_1"}
        </text>
      </g>

      {/* PLL_TOP — isolated analog macro with guard ring */}
      <g className="fp-block fp-block--pll">
        <rect
          x="400"
          y="40"
          width="96"
          height="72"
          rx="4"
          fill="none"
          stroke="#10b981"
          strokeOpacity="0.5"
          strokeDasharray="5 3"
          className="fp-shape"
        />
        <rect x="407" y="47" width="82" height="58" rx="3" fill="#0b1329" className="stroke-cyan-500/40" />
        <text x="448" y="79" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" className="fill-slate-300" pointerEvents="none">
          {"PLL_TOP"}
        </text>
      </g>

      {/* ALU_CORE / DSP_ENGINE — center-bottom macros */}
      <g className="fp-block fp-block--alu">
        <rect x="110" y="215" width="150" height="100" rx="3" fill="#0b1329" className="stroke-cyan-500/40 fp-shape" />
        <g stroke="#142036" strokeWidth="1">
          <line x1="122" y1="245" x2="248" y2="245" />
          <line x1="122" y1="275" x2="248" y2="275" />
        </g>
        <text x="185" y="269" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" letterSpacing="1" className="fill-cyan-400" pointerEvents="none">
          {"ALU_CORE"}
        </text>
      </g>
      <g className="fp-block fp-block--dsp">
        <rect x="272" y="215" width="152" height="100" rx="3" fill="#0b1329" className="stroke-cyan-500/40 fp-shape" />
        <g stroke="#142036" strokeWidth="1">
          <line x1="284" y1="245" x2="412" y2="245" />
          <line x1="284" y1="275" x2="412" y2="275" />
        </g>
        <text x="348" y="269" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" letterSpacing="1" className="fill-cyan-400" pointerEvents="none">
          {"DSP_ENGINE"}
        </text>
      </g>

      {/* ── Animated netlist routing — timing-critical nets (cyan) ── */}
      <g fill="none" stroke="#06b6d4" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
        <path className="net-pulse" d="M120,215 H210 V125 H99 V120" />
        <path className="net-pulse" style={{ animationDelay: "-1s" }} d="M330,215 V125 H205 V120" />
        <path className="net-pulse" style={{ animationDelay: "-0.5s" }} d="M110,242 H30" />
        <path className="net-pulse" style={{ animationDelay: "-1.5s" }} d="M424,258 H510" />
        <path className="net-pulse" style={{ animationDelay: "-2s" }} d="M352,315 C352,336 386,330 392,344" />
      </g>
      <g fill="#06b6d4">
        <circle cx="120" cy="215" r="2" />
        <circle cx="99" cy="121" r="2" />
        <circle cx="330" cy="215" r="2" />
        <circle cx="205" cy="121" r="2" />
        <circle cx="32" cy="242" r="2" />
        <circle cx="510" cy="258" r="2" />
        <circle cx="392" cy="344" r="2" />
      </g>

      {/* ── Animated netlist routing — clock tree traces (emerald) ── */}
      <g fill="none" stroke="#10b981" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
        <path className="net-pulse" style={{ animationDelay: "-0.4s" }} d="M438,112 V180 H400 V213" />
        <path className="net-pulse" style={{ animationDelay: "-1.8s" }} d="M412,112 V192 C412,204 320,198 300,211" />
      </g>
      <g fill="#10b981">
        <circle cx="438" cy="114" r="2" />
        <circle cx="400" cy="211" r="2" />
        <circle cx="300" cy="211" r="2" />
      </g>

      {/* ── HUD overlays ── */}
      <text
        x="270"
        y="33"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="1"
        className="fill-slate-400"
        pointerEvents="none"
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
        pointerEvents="none"
      />
      <text
        x="364"
        y="365"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="0.5"
        className="fill-cyan-400"
        pointerEvents="none"
      >
        {"[FLOORPLAN // METRICS_OK]"}
      </text>

      {/* ── Floating tooltip layer (rendered last = top-most z-order, never painted under shapes) ── */}
      <g className="fp-tips">
        <FpTip x={330} y={44} className="fp-tip-io" title="IO RING" lines={["Signal + power pads", "Top/Bottom: 34 pads", "Left/Right: 22 pads"]} />
        <FpTip x={270} y={208} className="fp-tip-pg" title="POWER GRID" lines={["VDD / VSS mesh", "M4 vertical strap", "M5 horizontal strap"]} />
        <FpTip x={270} y={120} className="fp-tip-core" title="CORE AREA" lines={["Std-cell rows", "Placement util 68.4%", "Double-row ABAB"]} />
        <FpTip x={99} y={140} className="fp-tip-sram0" title="MACRO [SRAM]" lines={["512KB SRAM block", "Mem-bank sub-array", "Analytical energy"]} />
        <FpTip x={205} y={140} className="fp-tip-sram1" title="MACRO [SRAM]" lines={["384KB SRAM block", "Column-mux bank", "Low-Vt optimized"]} />
        <FpTip x={448} y={130} className="fp-tip-pll" title="MACRO [ANALOG]" lines={["Isolated PLL", "Guard-ring shield", "Noise isolation"]} />
        <FpTip x={185} y={325} className="fp-tip-alu" title="CORE [DIGITAL]" lines={["Arithmetic unit", "Datapath macros", "3-row std cells"]} />
        <FpTip x={348} y={325} className="fp-tip-dsp" title="CORE [DIGITAL]" lines={["Signal processing", "Accumulator tree", "Multiplier macros"]} />
      </g>
    </svg>
  );
}
