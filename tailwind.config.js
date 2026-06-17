/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        geist: ['"Geist Sans"', 'sans-serif'],
        general: ['"General Sans"', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        cabin: ['Cabin', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "hero-sub": "hsl(var(--hero-sub))",
        datacore: {
          primary: "#7b39fc",
          secondary: "#2b2344",
        }
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
      }
    },
  },
  plugins: [],
}
