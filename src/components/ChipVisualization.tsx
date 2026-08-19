"use client";

import { useEffect, useRef, useCallback } from "react";

function cssVar(el: HTMLElement, name: string, fallback: string): string {
  return getComputedStyle(el).getPropertyValue(name).trim() || fallback;
}

export function ChipVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Read theme-aware floorplan colors (opacity baked into each variable)
    const fpDie = cssVar(canvas, "--fp-die", "#2A303899");
    const fpAccentDim = cssVar(canvas, "--fp-accent-dim", "#3D8BFD1F");
    const fpAccentBorder = cssVar(canvas, "--fp-accent-border", "#3D8BFD1A");
    const fpCellRow = cssVar(canvas, "--fp-cell-row", "#3D8BFD14");
    const fpCellLine = cssVar(canvas, "--fp-cell-line", "#2A30384D");
    const fpRouteClock = cssVar(canvas, "--fp-route-clock", "#67D0D826");
    const fpRouteLine = cssVar(canvas, "--fp-route-line", "#3D8BFD0F");
    const fpHtree = cssVar(canvas, "--fp-htree", "#67D0D820");
    const fpTiming = cssVar(canvas, "--fp-timing", "#3D8BFD26");
    const fpMesh = cssVar(canvas, "--fp-mesh", "#2A303866");
    const fpPin = cssVar(canvas, "--fp-pin", "#9AA3AF33");
    const fpLabel = cssVar(canvas, "--fp-label", "#5C657080");
    const fpMacroBorder = cssVar(canvas, "--fp-macro-border", "#67D0D833");
    const fpMacroFill = cssVar(canvas, "--fp-macro-fill", "#67D0D808");
    const fpMacroLabel = cssVar(canvas, "--fp-macro-label", "#67D0D859");

    const pad = 24;
    const chipW = w - pad * 2;
    const chipH = h - pad * 2;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Chip outline (die boundary)
    ctx.strokeStyle = fpDie;
    ctx.lineWidth = 1;
    ctx.strokeRect(pad, pad, chipW, chipH);

    // Inner die boundary
    const dieInset = 16;
    ctx.strokeStyle = fpAccentBorder;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(pad + dieInset, pad + dieInset, chipW - dieInset * 2, chipH - dieInset * 2);

    // Macro blocks
    const macroX = pad + dieInset + 20;
    const macroY = pad + dieInset + 16;
    const macros = [
      { w: chipW * 0.18, h: chipH * 0.22, label: "CPU" },
      { w: chipW * 0.14, h: chipH * 0.16, label: "SRAM" },
      { w: chipW * 0.1, h: chipH * 0.22, label: "I/O" },
    ];

    let mx = macroX;
    macros.forEach((m) => {
      ctx.strokeStyle = fpMacroBorder;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(mx, macroY, m.w, m.h);
      ctx.fillStyle = fpMacroFill;
      ctx.fillRect(mx, macroY, m.w, m.h);
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = fpMacroLabel;
      ctx.fillText(m.label, mx + 4, macroY + 12);
      mx += m.w + 12;
    });

    // Standard cell region
    const scX = pad + dieInset + 20;
    const scY = macroY + chipH * 0.28;
    const scW = chipW - dieInset * 2 - 40;
    const scH = chipH * 0.48;

    ctx.strokeStyle = fpAccentBorder;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(scX, scY, scW, scH);

    // Standard cell rows
    const rowCount = 18;
    const rowH = scH / rowCount;
    for (let i = 0; i < rowCount; i++) {
      const y = scY + i * rowH;
      ctx.strokeStyle = i % 3 === 0 ? fpCellRow : fpCellLine;
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.moveTo(scX, y);
      ctx.lineTo(scX + scW, y);
      ctx.stroke();
    }

    // Routing lines
    const routeCount = 12;
    const routeSpacing = scW / routeCount;
    for (let i = 0; i < routeCount; i++) {
      const x = scX + i * routeSpacing + routeSpacing * 0.5;
      const isClock = i % 4 === 0;
      ctx.strokeStyle = isClock ? fpRouteClock : fpRouteLine;
      ctx.lineWidth = isClock ? 0.6 : 0.3;
      ctx.beginPath();
      ctx.moveTo(x, scY);
      ctx.lineTo(x, scY + scH);
      ctx.stroke();
    }

    // Clock tree (H-tree)
    const treeDepth = 3;
    function drawHTree(x: number, y: number, size: number, depth: number) {
      if (depth === 0 || size < 4 || !ctx) return;
      const half = size / 2;
      ctx.strokeStyle = fpHtree;
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.moveTo(x - half, y);
      ctx.lineTo(x + half, y);
      ctx.moveTo(x, y - half);
      ctx.lineTo(x, y + half);
      ctx.stroke();
      drawHTree(x - half, y, half * 0.8, depth - 1);
      drawHTree(x + half, y, half * 0.8, depth - 1);
      drawHTree(x, y - half, half * 0.8, depth - 1);
      drawHTree(x, y + half, half * 0.8, depth - 1);
    }
    drawHTree(cx, cy, Math.min(scW, scH) * 0.5, treeDepth);

    // Timing paths
    ctx.strokeStyle = fpTiming;
    ctx.lineWidth = 0.8;
    ctx.setLineDash([4, 6]);
    for (let i = 0; i < 3; i++) {
      const startX = scX + scW * (0.15 + i * 0.3);
      const startY = scY + 8;
      const endX = scX + scW * (0.3 + i * 0.2);
      const endY = scY + scH - 8;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      const midY = (startY + endY) / 2;
      ctx.bezierCurveTo(startX, midY, endX, midY, endX, endY);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Power mesh
    const pmY = scY + scH + 16;
    const pmH = chipH - dieInset * 2 - (pmY - (pad + dieInset)) - 16;
    if (pmH > 10) {
      ctx.strokeStyle = fpMesh;
      ctx.lineWidth = 0.3;
      for (let i = 0; i < 8; i++) {
        const y = pmY + (pmH / 8) * i;
        ctx.beginPath();
        ctx.moveTo(pad + dieInset + 20, y);
        ctx.lineTo(pad + chipW - dieInset - 20, y);
        ctx.stroke();
      }
      for (let i = 0; i < 6; i++) {
        const x = pad + dieInset + 20 + (scW / 6) * i;
        ctx.beginPath();
        ctx.moveTo(x, pmY);
        ctx.lineTo(x, pmY + pmH);
        ctx.stroke();
      }
    }

    // Pin pads
    const pinCount = 8;
    const pinSize = 3;
    ctx.fillStyle = fpPin;
    for (let i = 0; i < pinCount; i++) {
      const spacing = chipW / (pinCount + 1);
      ctx.fillRect(pad + spacing * (i + 1) - pinSize / 2, pad - 1, pinSize, pinSize);
      ctx.fillRect(pad + spacing * (i + 1) - pinSize / 2, pad + chipH - pinSize + 1, pinSize, pinSize);
    }
    for (let i = 0; i < pinCount - 2; i++) {
      const spacing = chipH / (pinCount - 1);
      ctx.fillRect(pad - 1, pad + spacing * (i + 1) - pinSize / 2, pinSize, pinSize);
      ctx.fillRect(pad + chipW - pinSize + 1, pad + spacing * (i + 1) - pinSize / 2, pinSize, pinSize);
    }

    // Labels
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = fpLabel;
    ctx.fillText("DIE", pad + 4, pad - 4);
    ctx.fillText("STANDARD CELLS", scX + 2, scY - 4);
    ctx.fillText("POWER MESH", pad + dieInset + 20, pmY - 4);
  }, []);

  useEffect(() => {
    draw();

    const observer = new ResizeObserver(() => draw());
    observer.observe(canvasRef.current!);

    return () => {
      observer.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="chip-canvas"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
