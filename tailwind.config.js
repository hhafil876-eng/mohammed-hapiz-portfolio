/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── PORTFOLIO 3.0: ECLIPSE — THE OBSIDIAN REALM ───
        abyss: '#090A0C',      // Deepest background void
        obsidian: '#101114',   // Primary surface & dark stone
        graphite: {
          950: '#090A0C',
          900: '#101114',
          850: '#17191D',      // Foundation tone
          800: '#24272D',      // Charcoal slate
          700: '#343840',      // Metallic grey
          600: '#3C424C',
          500: '#525866',
        },
        charcoal: '#24272D',
        steel: '#777D85',
        metallic: {
          surface: '#17191D',
          elevated: '#24272D',
          stone: '#101114',
          border: 'rgba(192, 192, 192, 0.14)',
          borderHover: 'rgba(255, 214, 0, 0.45)',
          silver: '#C0C0C0',
          muted: '#A9AFB8',
          platinum: '#E5E7EB',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',      // Main typography (Platinum)
          300: '#D1D5DB',
          400: '#C0C0C0',      // Metallic highlight
          500: '#A9AFB8',      // Muted silver
          600: '#8A929E',
          700: '#777D85',      // Steel grey
          800: '#484E59',
          900: '#24272D',
        },
        yellow: {
          electric: '#FFD600', // Primary energy accent
          celestial: '#FFE45C',// Corona / hover tone
          gold: '#B99A00',     // Deep ancient gold
          glow: 'rgba(255, 214, 0, 0.35)',
          subtle: 'rgba(255, 214, 0, 0.08)',
        },
        gold: {
          DEFAULT: '#B99A00',
          light: '#FFE45C',
          deep: '#8C7400',
        },
        // Unified semantic tokens
        ui: {
          bg: '#090A0C',
          obsidian: '#101114',
          surface: '#17191D',
          hover: '#24272D',
          border: 'rgba(192, 192, 192, 0.14)',
          borderGold: 'rgba(255, 214, 0, 0.4)',
          text: '#E5E7EB',
          muted: '#A9AFB8',
          steel: '#777D85',
          accent: '#FFD600',
          accentHover: '#FFE45C',
          gold: '#B99A00',
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
        celestial: '0.28em',
      },
      animation: {
        'eclipse-pulse': 'eclipsePulse 8s ease-in-out infinite',
        'orbit-slow': 'orbitSpin 45s linear infinite',
        'orbit-reverse': 'orbitSpinReverse 55s linear infinite',
        'energy-drift': 'energyDrift 20s ease-in-out infinite alternate',
      },
      keyframes: {
        eclipsePulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.65', transform: 'scale(1.03)' },
        },
        orbitSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        orbitSpinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        energyDrift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(15px, -15px, 0)' },
        },
      },
    },
  },
  plugins: [],
}
