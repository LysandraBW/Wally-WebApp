import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#E3ECFF',
          200: '#9BAFDF',
          300: '#557AC9',
          400: '#273B9B',
          500: '#1A2970',
          600: '#06093B',
          700: '#020921'
        },
        gray: {
          100: '#FEFEFE',
          200: '#DFE0EA',
          300: '#DDDDDD',
          400: '#757890',
          500: '#383838',
          600: '#15161C',
          700: '#000000'
        },
        red: {
          100: '#FAD4D4',
          200: '#E35E62',
          300: '#E3393E'
        },
        green: {
          100: '#C9E8D1',
          200: '#76B07D',
          300: '#33A140'
        }
      }
    },
  },
  plugins: [],
};
export default config;
