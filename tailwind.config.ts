import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0f12",
        "background-elevated": "#14171c",
        "background-card": "#181b21",
        "primary-text": "#f2efe9",
        "secondary-text": "#8b929a",
        muted: "#5c636b",
        accent: "#d4a853",
        "accent-dim": "#b8923f",
        "accent-muted": "rgba(212, 168, 83, 0.15)",
        teal: "#2d9d8a",
        "teal-muted": "rgba(45, 157, 138, 0.2)",
        border: "#252a32",
        "border-focus": "#3d4550",
      },
      fontFamily: {
        heading: ["Instrument Serif", "serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backdropBlur: {
        glass: "16px",
      },
      animation: {
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
