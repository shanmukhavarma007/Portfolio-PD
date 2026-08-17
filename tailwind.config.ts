import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      background: "#0B0D10",
      surface1: "#14171C",
      surface2: "#1B1F26",
      surface3: "#20252D",
      surface4: "#262B33",
      primary: "#3D8BFD",
      secondary: "#67D0D8",
      success: "#3FD87E",
      warning: "#FFB84D",
      error: "#FF5F57",
      info: "#67D0D8",
      primaryText: "#EDEFF2",
      secondaryText: "#9AA3AF",
      mutedText: "#68717D",
    },
    fontFamily: {
      display: ["Space Grotesk", "sans-serif"],
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