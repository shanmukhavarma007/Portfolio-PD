"use client";

import { useState, useEffect, useCallback } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let theme: "light" | "dark" | null = null;
    try {
      theme = localStorage.getItem("theme") as "light" | "dark" | null;
    } catch {}

    if (theme === "light") {
      setIsLight(true);
    } else if (theme === "dark") {
      setIsLight(false);
    } else if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr === "light") {
        setIsLight(true);
      } else if (attr === "dark") {
        setIsLight(false);
      }
    }
  }, []);

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
        transition: "color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        lineHeight: 1,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(56, 189, 248, 0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <span
        style={{
          fontSize: "12px",
          display: "inline-block",
          transition: "transform 0.3s ease",
          transform: isLight ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        {isLight ? "☀" : "☾"}
      </span>
    </button>
  );
}