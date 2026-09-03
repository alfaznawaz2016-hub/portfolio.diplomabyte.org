/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(260 87% 3%)',
        foreground: 'hsl(40 6% 95%)',
        'hero-sub': 'hsl(40 6% 82%)',
      },
      fontFamily: {
        sans: ['Geist Sans', 'sans-serif'],
        heading: ['General Sans', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
}

