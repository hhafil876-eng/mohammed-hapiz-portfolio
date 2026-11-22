/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0F1013',
          900: '#17191D', // Main background
          850: '#1F2227',
          800: '#2B2E34', // Secondary background
          700: '#343840', // Card surface
          600: '#3C424C', // Card hover / Elevated
          500: '#525866',
        },
        charcoal: '#2B2E34',
        metallic: {
          surface: '#343840',
          elevated: '#3C424C',
          border: 'rgba(192, 192, 192, 0.16)',
          borderHover: 'rgba(255, 214, 0, 0.45)',
          silver: '#C0C0C0',
          muted: '#A9AFB8',
          platinum: '#E5E7EB',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB', // Main typography
          300: '#D1D5DB',
          400: '#C0C0C0', // Metallic highlight
          500: '#A9AFB8', // Secondary typography
          600: '#8A929E',
          700: '#646C79',
          800: '#484E59',
          900: '#2B2E34',
        },
        yellow: {
          electric: '#FFD600', // Primary accent
          hover: '#FFE45C',    // Accent hover
          glow: 'rgba(255, 214, 0, 0.35)',
          subtle: 'rgba(255, 214, 0, 0.12)',
        },
        // Semantic aliases for consistency
        ui: {
          bg: '#17191D',
          surface: '#343840',
          hover: '#3C424C',
          border: 'rgba(192, 192, 192, 0.15)',
          text: '#E5E7EB',
          muted: '#A9AFB8',
          accent: '#FFD600',
          accentHover: '#FFE45C',
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
        'aura-pulse': 'auraPulse 6s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'reverse-spin': 'reverseSpin 35s linear infinite',
      },
      keyframes: {
        auraPulse: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.04)' },
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
