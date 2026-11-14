/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030508',
          900: '#06080d',
          850: '#0a0d14',
          800: '#0f141f',
          700: '#161d2d',
        },
        platinum: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
        },
        lime: {
          glow: '#ccff00',
          electric: '#a8ff35',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
        },
        luxury: {
          lime: '#a3e635',
          emerald: '#10b981',
          ice: '#38bdf8',
          sapphire: '#0284c7',
          gold: '#f59e0b',
        },
        ui: {
          void: '#030508',
          dark: '#07090e',
          card: 'rgba(10, 14, 22, 0.65)',
          silver: '#f1f5f9',
          cyan: '#38bdf8',
          lime: '#a3e635',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.22em',
      },
      animation: {
        'aura-pulse': 'auraPulse 5s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'reverse-spin': 'reverseSpin 35s linear infinite',
      },
      keyframes: {
        auraPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        reverseSpin: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
}
