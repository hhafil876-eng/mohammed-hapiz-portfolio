import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Copy, Check, FileDown } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const ROLES = [
  'Software Engineer & Full-Stack Developer',
  'Generative AI Specialist & Prompt Architect',
  'Creative Technologist & Media Director',
]

function useTypewriter(words, enabled, speed = 65, deleteSpeed = 30, pause = 2200) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!enabled) return
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, pause)
      return () => clearTimeout(t)
    }
    const word = words[wordIdx]
    if (!isDeleting && display.length === word.length) {
      setIsPaused(true); return
    }
    if (isDeleting && display.length === 0) {
      setIsDeleting(false); setWordIdx(i => (i + 1) % words.length); return
    }
    const t = setTimeout(() => {
      setDisplay(isDeleting ? display.slice(0, -1) : word.slice(0, display.length + 1))
    }, isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(t)
  }, [display, isDeleting, wordIdx, isPaused, enabled])

  return display
}

// SVG Obsidian Monolith with Fissure
function ObsidianMonolith({ mouseX, mouseY }) {
  const reduced = useReducedMotion()
  const rotX = useTransform(mouseY, [-0.5, 0.5], [3, -3])
  const rotY = useTransform(mouseX, [-0.5, 0.5], [-5, 5])
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['35%', '65%'])
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['35%', '65%'])

  const atmosphere = useMotionTemplate`radial-gradient(ellipse 60% 80% at ${glowX} ${glowY}, rgba(255,214,0,0.12), transparent 70%)`
  return (
    <motion.div
      className="monolith-stage"
      style={reduced ? {} : { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
    >
      <svg
        viewBox="0 0 400 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="monolith-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="obsidianBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#24272D" />
            <stop offset="45%" stopColor="#17191D" />
            <stop offset="100%" stopColor="#090A0C" />
          </linearGradient>
          <linearGradient id="fissureGlow" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#FFD600" stopOpacity="0" />
            <stop offset="25%" stopColor="#FFD600" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFE45C" stopOpacity="1" />
            <stop offset="75%" stopColor="#FFD600" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B99A00" stopOpacity="0" />
          </linearGradient>
          <filter id="fissureBloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="monolithShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="20" stdDeviation="30" floodColor="#000000" floodOpacity="0.9" />
          </filter>
          <radialGradient id="surfaceLight" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#343840" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#090A0C" stopOpacity="0" />
          </radialGradient>
          <clipPath id="monolithClip">
            <polygon points="80,20 320,0 400,540 60,560" />
          </clipPath>
        </defs>

        {/* Main monolith body */}
        <polygon
          points="80,20 320,0 400,540 60,560"
          fill="url(#obsidianBody)"
          filter="url(#monolithShadow)"
        />

        {/* Surface light sheen */}
        <polygon
          points="80,20 320,0 400,540 60,560"
          fill="url(#surfaceLight)"
          clipPath="url(#monolithClip)"
        />

        {/* Surface texture lines */}
        <line x1="90" y1="80" x2="310" y2="60" stroke="#C0C0C0" strokeWidth="0.3" strokeOpacity="0.12" />
        <line x1="80" y1="140" x2="320" y2="118" stroke="#C0C0C0" strokeWidth="0.3" strokeOpacity="0.08" />
        <line x1="72" y1="200" x2="330" y2="176" stroke="#C0C0C0" strokeWidth="0.2" strokeOpacity="0.1" />
        <line x1="68" y1="260" x2="336" y2="234" stroke="#C0C0C0" strokeWidth="0.3" strokeOpacity="0.07" />
        <line x1="65" y1="320" x2="345" y2="294" stroke="#C0C0C0" strokeWidth="0.2" strokeOpacity="0.1" />
        <line x1="63" y1="380" x2="348" y2="354" stroke="#C0C0C0" strokeWidth="0.3" strokeOpacity="0.08" />

        {/* Primary fissure — jagged crack from top-right to bottom-left */}
        <polyline
          points="260,10 230,80 250,160 215,240 235,310 200,390 220,460 185,540"
          stroke="url(#fissureGlow)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#fissureBloom)"
        />
        {/* Fissure branches */}
        <polyline
          points="230,80 195,110 170,100"
          stroke="#FFD600"
          strokeWidth="0.8"
          fill="none"
          strokeOpacity="0.6"
          filter="url(#fissureBloom)"
        />
        <polyline
          points="250,160 285,185 270,210"
          stroke="#FFD600"
          strokeWidth="0.6"
          fill="none"
          strokeOpacity="0.4"
        />
        <polyline
          points="215,240 175,265 158,255"
          stroke="#FFD600"
          strokeWidth="0.7"
          fill="none"
          strokeOpacity="0.5"
        />
        <polyline
          points="235,310 270,330 285,320"
          stroke="#FFE45C"
          strokeWidth="0.5"
          fill="none"
          strokeOpacity="0.4"
        />

        {/* Inner yellow energy glow core */}
        <polyline
          points="260,10 230,80 250,160 215,240 235,310 200,390 220,460 185,540"
          stroke="#FFD600"
          strokeWidth="6"
          fill="none"
          strokeOpacity="0.08"
        />

        {/* Edge metallic rim */}
        <polygon
          points="80,20 320,0 400,540 60,560"
          fill="none"
          stroke="#C0C0C0"
          strokeWidth="0.6"
          strokeOpacity="0.18"
        />
        {/* Top edge highlight */}
        <line x1="80" y1="20" x2="320" y2="0" stroke="#C0C0C0" strokeWidth="1.2" strokeOpacity="0.35" />
      </svg>

      {/* Atmospheric light from fissure */}
      <motion.div
        className="monolith-aura"
        style={{ background: atmosphere }}
      />

      {/* Fissure reflection on ground */}
      <div className="monolith-ground-reflection" aria-hidden="true" />
    </motion.div>
  )
}

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()
  const scene = useRef(null)
  const inView = useInView(scene, { once: false })
  const role = useTypewriter(ROLES, inView && !reduced)

  const goto = (id) => {
    cyberAudio.playClick()
    document.querySelector(id)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
  }

  const copyEmail = () => {
    cyberAudio.playClick()
    navigator.clipboard.writeText('hhafil876@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  // Pointer parallax
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { damping: 30, stiffness: 100 })
  const my = useSpring(rawY, { damping: 30, stiffness: 100 })

  const handleMove = useCallback((e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [reduced])

  const handleLeave = useCallback(() => { rawX.set(0); rawY.set(0) }, [])

  // Portrait parallax
  const portraitX = useTransform(mx, v => v * -12)
  const portraitY = useTransform(my, v => v * -12)

  // Entrance variants
  const ENV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.4, ease: 'easeOut' } }
  }
  const TEXT = {
    hidden: { opacity: 0, x: -40 },
    visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] } })
  }
  const FISSURE_DRAW = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.8, delay: 0.4, ease: 'easeInOut' } }
  }

  return (
    <div
      ref={scene}
      className="hero-monolith-scene"
      data-visible={inView}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* ── BACKGROUND ATMOSPHERE ── */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="atmo-layer atmo-deep" />
        <div className="atmo-layer atmo-mid" />
        {/* Directional light beam from fissure direction */}
        <motion.div
          className="atmo-beam"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        {/* Fine grain grid */}
        <div className="atmo-grid" />
      </div>

      {/* ── MAIN CONTENT ── asymmetric composition */}
      <div className="hero-monolith-inner">

        {/* ── RIGHT: OBSIDIAN MONOLITH OBJECT ── positioned first in DOM, visually right/behind */}
        <motion.div
          className="monolith-col"
          variants={ENV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <ObsidianMonolith mouseX={mx} mouseY={my} />

          {/* Portrait integrated into the monolith scene — ghost silhouette */}
          <motion.div
            className="hero-portrait"
            style={reduced ? {} : { x: portraitX, y: portraitY }}
          >
            <img
              src="/assets/hapiz-portrait.webp"
              width="681"
              height="1024"
              alt="Mohammed Hapiz"
              fetchpriority="high"
              className="hero-portrait-img"
            />
            <div className="portrait-gradient-fade" aria-hidden="true" />
          </motion.div>
        </motion.div>

        {/* ── LEFT: EDITORIAL TYPOGRAPHY COLUMN ── */}
        <div className="copy-col">

          {/* Status indicator */}
          <motion.div
            custom={0.2}
            variants={TEXT}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hero-status-pill"
          >
            <span className="status-dot" aria-hidden="true" />
            <span className="status-text">AVAILABLE FOR OPPORTUNITIES</span>
          </motion.div>

          {/* Giant name — split lines */}
          <motion.h1
            custom={0.4}
            variants={TEXT}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hero-name-block"
            aria-label="Mohammed Hapiz"
          >
            <div className="hero-name-line">
              <span className="hero-name-word">Mohammed</span>
            </div>
            <div className="hero-name-line">
              <span className="hero-name-word hero-name-accent">Hapiz</span>
              {/* Yellow slash accent */}
              <span className="hero-name-slash" aria-hidden="true">/</span>
            </div>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            custom={0.6}
            variants={TEXT}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hero-role-line"
            aria-label={ROLES[0]}
          >
            <span className="role-label" aria-hidden="true">— </span>
            <span className="role-text">{reduced ? ROLES[0] : (role || '\u00A0')}</span>
            {!reduced && <span className="role-cursor" aria-hidden="true">|</span>}
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            custom={0.75}
            variants={TEXT}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hero-bio"
          >
            Computer Science student at MIT Kundapura (VTU). Architecting robust web
            applications, integrating generative AI pipelines, and directing high-fidelity visual media.
          </motion.p>

          {/* CTA row */}
          <motion.div
            custom={0.9}
            variants={TEXT}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hero-cta-row"
          >
            <button
              onClick={() => goto('#projects')}
              onMouseEnter={() => cyberAudio.playHover()}
              className="cta-primary"
            >
              <span>Selected Works</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>

            <button
              onClick={() => goto('#contact')}
              onMouseEnter={() => cyberAudio.playHover()}
              className="cta-secondary"
            >
              <span>Initiate Inquiry</span>
            </button>

            <a
              href="/assets/mohammed-hapiz-resume.pdf"
              download="Mohammed_Hapiz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              onMouseEnter={() => cyberAudio.playHover()}
              className="cta-ghost"
              title="Download Resume PDF"
            >
              <FileDown size={15} aria-hidden="true" />
              <span>Resume</span>
            </a>

            <button
              onClick={copyEmail}
              onMouseEnter={() => cyberAudio.playHover()}
              className="cta-ghost"
              title="Copy email address"
              aria-label="Copy email to clipboard"
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              <span>{copied ? 'Copied' : 'hhafil876@gmail.com'}</span>
            </button>
          </motion.div>

          {/* Telemetry strip — horizontal, below CTAs */}
          <motion.div
            custom={1.05}
            variants={TEXT}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hero-telemetry"
            aria-label="Key metrics"
          >
            {[
              { val: '7.6', unit: 'CGPA', label: 'VTU Academic Rigor' },
              { val: '06', unit: 'Systems', label: 'Engineered & Deployed' },
              { val: '3+', unit: 'Years', label: 'Creative Media' },
              { val: 'KA', unit: 'India', label: 'Karnataka · Remote Ready' },
            ].map((m, i) => (
              <div key={i} className="telemetry-item">
                <span className="telemetry-val">{m.val}<span className="telemetry-unit">{m.unit}</span></span>
                <span className="telemetry-label">{m.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-track">
          <motion.div
            className="scroll-thumb"
            animate={{ y: inView && !reduced ? [0, 14, 0] : 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
