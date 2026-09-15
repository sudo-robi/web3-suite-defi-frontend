/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        stellar: {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#b9dfff",
          300: "#7cc5ff",
          400: "#36a9ff",
          500: "#0c8ce9",
          600: "#0070c7",
          700: "#0058a1",
          800: "#004b85",
          900: "#07406e",
          950: "#042849",
        },
        defi: {
          green: "#00d4aa",
          red: "#ff4757",
          yellow: "#ffc048",
          purple: "#a855f7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
