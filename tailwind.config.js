/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta "vellum": pergaminho quente + tinta
        vellum: '#F7F1E8',
        paper: '#FBF8F3',
        sand: '#ECE4D8',
        ink: '#1C1B1A',
        graphite: '#4A4741',
        taupe: '#A8A5A0',
        ember: '#D2553F',
      },
      fontFamily: {
        sans: ['"Open Sauce One"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        curtain: 'cubic-bezier(0.76, 0, 0.24, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
