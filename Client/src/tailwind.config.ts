import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  plugins: [],
  theme: {
    extend: {
      colors: {
        base: {
          0: "var(--base-0000)",
          50: "var(--base-0050)",
          100: "var(--base-0100)",
          200: "var(--base-0200)",
          300: "var(--base-0300)",
          400: "var(--base-0400)",
          500: "var(--base-0500)",
          600: "var(--base-0600)",
          700: "var(--base-0700)",
          800: "var(--base-0800)",
          900: "var(--base-0900)",
          950: "var(--base-0950)",
          1000: "var(--base-1000)"
        }
      },
      keyframes: {
        "border-cover": {
          "0%": {
            transform: "translate(0px, 0px)"
          },
          "35%": {
            transform: "translate(calc(var(--parent-width)), 0px) rotate(90deg)"
          },
          "50%": {
            transform: "translate(calc(var(--parent-width)), var(--parent-height)) rotate(180deg)"
          },
          "85%": {
            transform: "translate(0px, var(--parent-height)) rotate(270deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(360deg)"
          }
        },
        "border-cover-reverse": {
          "0%": {
            transform: "translate(0px, 0px)"
          },
          "35%": {
            transform: "translate(calc(-1*var(--parent-width)), 0px) rotate(90deg)"
          },
          "50%": {
            transform: "translate(calc(-1*var(--parent-width)), calc(-1*var(--parent-height))) rotate(180deg)"
          },
          "85%": {
            transform: "translate(0, calc(-1*var(--parent-height))) rotate(270deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(360deg)"
          }
        }
      },
      animation: {
        "border-cover": "border-cover 10s linear infinite",
        "border-cover-reverse": "border-cover-reverse 10s linear infinite"
      }
    }
  }
};

export default config;