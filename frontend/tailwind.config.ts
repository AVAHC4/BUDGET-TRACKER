import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#0ea5e9", // Sky blue
          "primary-content": "#ffffff",
          secondary: "#8b5cf6", // Violet
          "secondary-content": "#ffffff",
          accent: "#f97316", // Orange
          "accent-content": "#ffffff",
          neutral: "#334155", // Slate-700
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f9fafb", // Gray-50
          "base-300": "#f3f4f6", // Gray-100
          "base-content": "#1f2937", // Gray-800
          info: "#06b6d4", // Cyan
          "info-content": "#ffffff",
          success: "#10b981", // Emerald
          "success-content": "#ffffff",
          warning: "#fbbf24", // Amber
          "warning-content": "#ffffff",
          error: "#f43f5e", // Rose
          "error-content": "#ffffff",
        },
      },
      {
        darkTheme: {
          primary: "#8b5cf6", // Lighter purple for dark mode
          "primary-content": "#ffffff",
          secondary: "#f472b6", // Lighter pink for dark mode
          "secondary-content": "#ffffff",
          accent: "#34d399", // Lighter emerald for dark mode
          "accent-content": "#ffffff",
          neutral: "#4b5563", // Gray-600
          "neutral-content": "#ffffff",
          "base-100": "#1f2937", // Gray-800
          "base-200": "#111827", // Gray-900
          "base-300": "#0f172a", // Slate-900
          "base-content": "#f9fafb", // Gray-50
          info: "#60a5fa", // Lighter blue for dark mode
          "info-content": "#ffffff",
          success: "#4ade80", // Lighter green for dark mode
          "success-content": "#ffffff",
          warning: "#fbbf24", // Lighter amber for dark mode
          "warning-content": "#ffffff",
          error: "#f87171", // Lighter red for dark mode
          "error-content": "#ffffff",
        },
      },
    ],
    darkTheme: "darkTheme",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    themeRoot: ":root",
  },
} satisfies Config;
