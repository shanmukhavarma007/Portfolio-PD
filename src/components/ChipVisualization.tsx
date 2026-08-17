"use client";

import { useEffect, useRef } from "react";

export function ChipVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const pad = 24;
      const chipW = w - pad * 2;
      const chipH = h - pad * 2;
      const cx = w / 2;
      const cy = h / 2;

      // Chip outline
      ctx.strokeStyle = "rgba(42, 48, 56, 0.6)";
      ctx.lineWidth = 1;
      ctx.strokeRect(pad, pad, chipW, chipH);

      // Inner die boundary
      const dieInset = 16;
      ctx.strokeStyle = "rgba(61, 139, 253, 0.12)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(pad + dieInset, pad + dieInset, chipW - dieInset * 2, chipH - dieInset * 2);

      // Macro blocks (top-left region)
      const macroX = pad + dieInset + 20;
      const macroY = pad + dieInset + 16;
      const macros = [
        { w: chipW * 0.18, h: chipH * 0.22, label: "CPU" },
        { w: chipW * 0.14, h: chipH * 0.16, label: "SRAM" },
        { w: chipW * 0.1, h: chipH * 0.22, label: "I/O" },
      ];

      let mx = macroX;
      macros.forEach((m) => {
        ctx.strokeStyle = "rgba(103, 208, 216, 0.2)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(mx, macroY, m.w, m.h);
        ctx.fillStyle = "rgba(103, 208, 216, 0.03)";
        ctx.fillRect(mx, macroY, m.w, m.h);
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = "rgba(103, 208, 216, 0.35)";
        ctx.fillText(m.label, mx + 4, macroY + 12);
        mx += m.w + 12;
      });

      // Standard cell region (large central area)
      const scX = pad + dieInset + 20;
      const scY = macroY + chipH * 0.28;
      const scW = chipW - dieInset * 2 - 40;
      const scH = chipH * 0.48;

      ctx.strokeStyle = "rgba(61, 139, 253, 0.1)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(scX, scY, scW, scH);

      // Standard cell rows (horizontal lines)
      const rowCount = 18;
      const rowH = scH / rowCount;
      for (let i = 0; i < rowCount; i++) {
        const y = scY + i * rowH;
        ctx.strokeStyle = i % 3 === 0 ? "rgba(61, 139, 253, 0.08)" : "rgba(42, 48, 56, 0.3)";
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(scX, y);
        ctx.lineTo(scX + scW, y);
        ctx.stroke();
      }

      // Routing lines (vertical, sparse)
      const routeCount = 12;
      const routeSpacing = scW / routeCount;
      for (let i = 0; i < routeCount; i++) {
        const x = scX + i * routeSpacing + routeSpacing * 0.5;
        const isClock = i % 4 === 0;
        ctx.strokeStyle = isClock
          ? "rgba(103, 208, 216, 0.15)"
          : "rgba(61, 139, 253, 0.06)";
        ctx.lineWidth = isClock ? 0.6 : 0.3;
        ctx.beginPath();
        ctx.moveTo(x, scY);
        ctx.lineTo(x, scY + scH);
        ctx.stroke();
      }

      // Clock tree (H-tree pattern from center)
      const treeDepth = 3;
      function drawHTree(x: number, y: number, size: number, depth: number) {
        if (depth === 0 || size < 4 || !ctx) return;
        const half = size / 2;
        ctx.strokeStyle = `rgba(103, 208, 216, ${0.12 + depth * 0.03})`;
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

      // Timing paths (diagonal accent lines)
      ctx.strokeStyle = "rgba(61, 139, 253, 0.15)";
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

      // Bottom region (power mesh)
      const pmY = scY + scH + 16;
      const pmH = chipH - dieInset * 2 - (pmY - (pad + dieInset)) - 16;
      if (pmH > 10) {
        ctx.strokeStyle = "rgba(42, 48, 56, 0.4)";
        ctx.lineWidth = 0.3;
        for (let i = 0; i < 8; i++) {
          const y = pmY + (pmH / 8) * i;
          ctx.beginPath();
          ctx.moveTo(pad + dieInset + 20, y);
          ctx.lineTo(pad + chipW - dieInset - 20, y);
          ctx.stroke();
        }
        for (let i = 0; i < 6; i++) {
          const x = pad + dieInset + 20 + ((scW) / 6) * i;
          ctx.beginPath();
          ctx.moveTo(x, pmY);
          ctx.lineTo(x, pmY + pmH);
          ctx.stroke();
        }
      }

      // Pin pads around the perimeter
      const pinCount = 8;
      const pinSize = 3;
      ctx.fillStyle = "rgba(154, 163, 175, 0.2)";
      for (let i = 0; i < pinCount; i++) {
        const spacing = chipW / (pinCount + 1);
        // Top pins
        ctx.fillRect(pad + spacing * (i + 1) - pinSize / 2, pad - 1, pinSize, pinSize);
        // Bottom pins
        ctx.fillRect(pad + spacing * (i + 1) - pinSize / 2, pad + chipH - pinSize + 1, pinSize, pinSize);
      }
      for (let i = 0; i < pinCount - 2; i++) {
        const spacing = chipH / (pinCount - 1);
        // Left pins
        ctx.fillRect(pad - 1, pad + spacing * (i + 1) - pinSize / 2, pinSize, pinSize);
        // Right pins
        ctx.fillRect(pad + chipW - pinSize + 1, pad + spacing * (i + 1) - pinSize / 2, pinSize, pinSize);
      }

      // Labels
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillStyle = "rgba(92, 101, 112, 0.5)";
      ctx.fillText("DIE", pad + 4, pad - 4);
      ctx.fillText("STANDARD CELLS", scX + 2, scY - 4);
      ctx.fillText("POWER MESH", pad + dieInset + 20, pmY - 4);
    }

    draw();

    const observer = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      canvas.width = r.width * d;
      canvas.height = r.height * d;
      ctx?.scale(d, d);
      draw();
    });
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}