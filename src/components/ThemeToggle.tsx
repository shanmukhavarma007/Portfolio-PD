"use client";

import { useState, useCallback } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") === "light";
    }
    return false;
  });

  const toggle = useCallback(() => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.setAttribute("data-theme", next ? "light" : "dark");
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  }, [isLight]);

  return (
    <button
      onClick={toggle}
      className={className}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      style={{
        background: "none",
        border: "1px solid var(--border-subtle)",
        padding: "5px 8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--text-muted)",
        letterSpacing: "0.04em",
        transition: "color 0.2s ease, border-color 0.2s ease",
        lineHeight: 1,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
      }}
    >
      <span style={{ fontSize: "12px" }}>{isLight ? "☀" : "☾"}</span>
    </button>
  );
}
