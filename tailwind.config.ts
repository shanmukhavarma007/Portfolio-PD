import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      background: "#050811",
      surface1: "#0B0F14",
      surface2: "#111827",
      surface3: "#1E293B",
      surface4: "#334155",
      primary: "#06B6D4",
      secondary: "#22D3EE",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#F87171",
      info: "#22D3EE",
      primaryText: "#F8FAFC",
      secondaryText: "#CBD5E1",
      mutedText: "#94A3B8",
    },
    fontFamily: {
      display: ["Inter", "sans-serif"],
      body: ["Inter", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    borderRadius: {
      sm: "4px",
      md: "8px",
      full: "9999px",
    },
    extend: {
      transitionProperty: {
        DEFAULT: "color 0.2s ease, background 0.2s ease",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;