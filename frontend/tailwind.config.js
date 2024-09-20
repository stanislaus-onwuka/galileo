/** @type {import('tailwindcss').Config} */

const baseColors = {
  default: "#8D8DFF",
  background: "#08302F",
  "light-green": "#A6C4C4",
  orange: "#FF805E",
  "neutral-0": "#FEFEFE",
  "neutral-5": "#FCFCFD",
  "neutral-10": "#F9FAFB",
  "neutral-20": "#F2F4F7",
  "neutral-30": "#EAECF0",
  "neutral-40": "#D0D5DD",
  "neutral-50": "#98A2B3",
  "neutral-60": "#667085",
  "neutral-70": "#475467",
  "neutral-80": "#344054",
  "neutral-90": "#1D2939",
  "neutral-100": "#101323",
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...baseColors
      },
      backgroundColors: {
        ...baseColors
      },
      backgroundImage: {
        'artisan-sidebar' : 'url("/assets/imgs/bg-gradient.png")'
      },
      boxShadow: {
        'level-2': '0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'level-3': '0 8px 8px -4px rgba(0, 0, 0, 0.3)',
        'level-4': '0 24px 48px -12px rgba(0, 0, 0, 0.3)',
      },
      gridTemplateColumns: {
        "recommendation-grid": "repeat(auto-fit, minmax(240px, 1fr))",
      },
    },
  },
  plugins: [],
}