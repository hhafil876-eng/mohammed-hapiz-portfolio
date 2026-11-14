<div align="center">

# 🌐 Mohammed Hapiz — 3D Cyber Portfolio

**Production-grade, high-performance personal developer showcase built with React, Three.js, and modern creative technology.**

[![Live Web App](https://img.shields.io/badge/LIVE_DEMO-mohammed--hapiz--portfolio.vercel.app-00FF66?style=for-the-badge&logo=vercel&logoColor=black)](https://mohammed-hapiz-portfolio.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3.1-00E5FF?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187.0-white?style=for-the-badge&logo=threedotjs&logoColor=black)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=black)](https://tailwindcss.com/)

</div>

---

## 📌 01 // Overview

This repository houses the source code for the official portfolio of **Mohammed Hapiz** (Computer Science Student & Creative Technologist). 

Engineered from the ground up to diverge from standard static portfolio templates, this web application merges **computational WebGL rendering**, **reactive UI choreography**, and **spatial sound design** into a cohesive, futuristic terminal-inspired user experience.

- **Live URL:** [https://mohammed-hapiz-portfolio.vercel.app/](https://mohammed-hapiz-portfolio.vercel.app/)
- **Repository:** [https://github.com/hhafil876-eng/mohammed-hapiz-portfolio](https://github.com/hhafil876-eng/mohammed-hapiz-portfolio)
- **Deployment Platform:** Vercel Global Edge Network with automated SPA rewrites.

---

## ⚡ 02 // Core Features

- **Interactive 3D WebGL Canvas**: Procedural particle fields and reactive geometry rendered smoothly in real-time via Three.js.
- **Dynamic Physics & Gyro Cards**: 3D parallax tilt effects responding to cursor movement on desktop and device orientation on mobile devices.
- **Cinematic Audio Feedback**: Embedded low-latency Web Audio API engine providing futuristic click, hover, and alert feedback with user toggle controls.
- **Project Dossier System**: Interactive modal overlays with deep-dive technical breakdowns, problem/solution statements, and live demo routes.
- **Smooth Inertia Scrolling**: Unified scroll physics powered by Lenis smooth scrolling, synchronized with GSAP and Framer Motion layout triggers.
- **Multi-Route Contact Engine**: Fully functional contact dispatch integrating FormSubmit, Web3Forms API support, clipboard draft automation, and mailto fallbacks.
- **Production Asset Pipeline**: Optimized `.webp` media formats, custom SVG monogram favicons, canonical XML sitemaps, and robots crawler directives.

---

## 🛠️ 03 // Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18 (`react`, `react-dom`) |
| **Build & Bundler** | Vite 5 (manual vendor chunk splitting: `three`, `framer-motion`, `lucide-react`) |
| **3D & Graphics** | Three.js (`three` ^0.187.0) |
| **Animation & Motion** | Framer Motion (`^11.11.0`), GSAP (`^3.15.1`), Lenis Scroll (`^1.3.27`) |
| **Styling & Design** | Tailwind CSS (`^3.4.14`), PostCSS, Autoprefixer |
| **Icons & Typography** | Lucide React (`^0.400.0`), JetBrains Mono, Syne / Space Grotesk |
| **Deployment & Hosting** | Vercel SPA (`vercel.json`), Netlify (`netlify.toml`), FormSubmit |

---

## 📂 04 // Project Architecture

```text
mohammed-hapiz-portfolio/
├── public/
│   ├── assets/
│   │   ├── hapiz-portrait.webp     # Transparent cutouts
│   │   └── mohammed-hapiz-resume.pdf # Verifiable CV
│   ├── favicon.svg                 # Custom luxury monogram
│   ├── robots.txt                  # Search crawler directives
│   └── sitemap.xml                 # Canonical XML sitemap
├── src/
│   ├── assets/                     # Component-level static media
│   ├── components/
│   │   ├── About.jsx               # Personal bio & core values
│   │   ├── Achievements.jsx        # Verified technical milestones
│   │   ├── CinematicHUD.jsx        # Floating HUD & sound toggle
│   │   ├── Contact.jsx             # Contact form & fallback protocols
│   │   ├── CustomCursor.jsx        # Interactive trailing cursor
│   │   ├── Experience.jsx          # Academic & creative timeline
│   │   ├── Hero.jsx                # Landing view with typography
│   │   ├── Hero3DGyro.jsx          # 3D interactive tilt avatar
│   │   ├── Navbar.jsx              # Navigation with telemetry pills
│   │   ├── ProjectModal.jsx        # Expanded case study viewer
│   │   ├── Projects.jsx            # Project gallery & filtering
│   │   ├── Skills.jsx              # Technical skill matrix
│   │   ├── ThreeCanvas.jsx         # WebGL particle system
│   │   └── TiltCard.jsx            # 3D math card wrapper
│   ├── utils/
│   │   └── audio.js                # Web Audio synthesizer triggers
│   ├── App.jsx                     # Root application wrapper
│   ├── index.css                   # Global Tailwind utilities & variables
│   └── main.jsx                    # React 18 DOM mount point
├── vercel.json                     # Edge SPA rewrites & cache headers
├── netlify.toml                    # Netlify deployment rules
└── vite.config.js                  # Rollup chunk optimization
```

---

## 🚀 05 // Installation & Running Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn / pnpm

### 1. Clone the repository
```bash
git clone https://github.com/hhafil876-eng/mohammed-hapiz-portfolio.git
cd mohammed-hapiz-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to experience the live application.

### 4. Build for production
```bash
npm run build
```
Generates a minified, chunk-split production bundle inside the `/dist` directory.

### 5. Preview the production build
```bash
npm run preview
```

---

## 📈 06 // Current Status

- **Status:** `Live in Production`
- **Current Version:** `1.0.0`
- **Maintainer:** Mohammed Hapiz ([@hhafil876-eng](https://github.com/hhafil876-eng))

---

## 📄 07 // License & Attribution

Designed and engineered by **Mohammed Hapiz**. Licensed under the [MIT License](LICENSE).
