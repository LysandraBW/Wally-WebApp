import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {  
      fontSize: {
        "00": "0.640rem",
        "01": "0.720rem",
        "02": "0.800rem",
        "03": "0.833rem",
        "04": "0.900rem",
        "05": "1.000rem",
        "06": "1.250rem",
        "07": "1.563rem",
        "08": "1.953rem",
        "09": "2.441rem",
        "10": "3.052rem",
        "11": "3.815rem"
      },
      keyframes: {
        'slide-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'slide-left': 'slide-left 8s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
