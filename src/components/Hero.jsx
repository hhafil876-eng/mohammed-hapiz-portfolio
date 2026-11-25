import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Copy, Check, FileDown } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const ROLES = [
  'Software Engineer & Full-Stack Developer',
  'Generative AI Specialist & Prompt Architect',
  'Creative Technologist & Media Director',
]

function useTypewriter(words, speed = 65, deleteSpeed = 30, pause = 2200) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
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
  }, [display, isDeleting, wordIdx, isPaused])

  return display
}

// SVG Obsidian Monolith with intense illuminated fissure and floating metallic fragments
function ObsidianMonolith({ mouseX, mouseY }) {
  const reduced = useReducedMotion()
  const rotX = useTransform(mouseY, [-0.5, 0.5], [4, -4])
  const rotY = useTransform(mouseX, [-0.5, 0.5], [-6, 6])
  const frag1X = useTransform(mouseX, [-0.5, 0.5], [-15, 15])
  const frag1Y = useTransform(mouseY, [-0.5, 0.5], [-12, 12])
  const frag2X = useTransform(mouseX, [-0.5, 0.5], [18, -18])
  const frag2Y = useTransform(mouseY, [-0.5, 0.5], [14, -14])

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
          <linearGradient id="obsidianFacetLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2B2E34" />
            <stop offset="60%" stopColor="#17191D" />
            <stop offset="100%" stopColor="#090A0C" />
          </linearGradient>
          <linearGradient id="obsidianFacetRight" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F2228" />
            <stop offset="60%" stopColor="#121316" />
            <stop offset="100%" stopColor="#090A0C" />
          </linearGradient>
          <linearGradient id="fissureCore" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#FFD600" stopOpacity="0.2" />
            <stop offset="20%" stopColor="#FFD600" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="70%" stopColor="#FFE45C" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD600" stopOpacity="0.3" />
          </linearGradient>
          <filter id="fissureGlowIntense" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="monolithShadowMain" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow dx="0" dy="30" stdDeviation="35" floodColor="#000000" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* Shadow base */}
        <polygon points="90,30 310,10 390,530 65,550" fill="#090A0C" filter="url(#monolithShadowMain)" />

        {/* Facet Left */}
        <polygon points="90,30 240,25 210,540 65,550" fill="url(#obsidianFacetLeft)" />

        {/* Facet Right */}
        <polygon points="240,25 310,10 390,530 210,540" fill="url(#obsidianFacetRight)" />

        {/* Edge highlights */}
        <line x1="90" y1="30" x2="310" y2="10" stroke="#C0C0C0" strokeWidth="1.2" strokeOpacity="0.4" />
        <line x1="90" y1="30" x2="65" y2="550" stroke="#C0C0C0" strokeWidth="0.8" strokeOpacity="0.2" />
        <line x1="310" y1="10" x2="390" y2="530" stroke="#777D85" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="240" y1="25" x2="210" y2="540" stroke="#C0C0C0" strokeWidth="0.5" strokeOpacity="0.25" />

        {/* Geometric fracture ridges on stone surface */}
        <line x1="120" y1="100" x2="235" y2="140" stroke="#343840" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="100" y1="220" x2="215" y2="260" stroke="#343840" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="80" y1="380" x2="205" y2="390" stroke="#343840" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="245" y1="180" x2="360" y2="150" stroke="#24272D" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="230" y1="340" x2="370" y2="310" stroke="#24272D" strokeWidth="1" strokeOpacity="0.6" />

        {/* ── THE ILLUMINATED FISSURE ── */}
        {/* Soft wide background glow */}
        <polyline
          points="250,15 225,85 245,170 205,250 230,330 195,410 215,480 185,545"
          stroke="#FFD600"
          strokeWidth="10"
          fill="none"
          strokeOpacity="0.12"
        />

        {/* Glowing mid-path */}
        <polyline
          points="250,15 225,85 245,170 205,250 230,330 195,410 215,480 185,545"
          stroke="#FFD600"
          strokeWidth="3.5"
          fill="none"
          strokeOpacity="0.85"
          filter="url(#fissureGlowIntense)"
        />

        {/* Blazing white-hot core */}
        <polyline
          points="250,15 225,85 245,170 205,250 230,330 195,410 215,480 185,545"
          stroke="url(#fissureCore)"
          strokeWidth="1.6"
          fill="none"
        />

        {/* Fissure lightning branches */}
        <polyline points="225,85 180,110 155,98" stroke="#FFD600" strokeWidth="1.2" fill="none" strokeOpacity="0.75" filter="url(#fissureGlowIntense)" />
        <polyline points="245,170 280,195 305,188" stroke="#FFD600" strokeWidth="1" fill="none" strokeOpacity="0.6" />
        <polyline points="205,250 160,270 140,260" stroke="#FFD600" strokeWidth="1" fill="none" strokeOpacity="0.7" />
        <polyline points="230,330 275,355 295,342" stroke="#FFE45C" strokeWidth="0.8" fill="none" strokeOpacity="0.6" />
        <polyline points="195,410 150,430" stroke="#FFD600" strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
      </svg>

      {/* Floating Metallic Shards */}
      <motion.div
        className="floating-shard shard-1"
        style={reduced ? {} : { x: frag1X, y: frag1Y }}
        aria-hidden="true"
      />
      <motion.div
        className="floating-shard shard-2"
        style={reduced ? {} : { x: frag2X, y: frag2Y }}
        aria-hidden="true"
      />
      <motion.div
        className="floating-shard shard-3"
        aria-hidden="true"
      />

      {/* Ground reflection */}
      <div className="monolith-ground-reflection" aria-hidden="true" />
    </motion.div>
  )
}

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()
  const scene = useRef(null)
  const inView = useInView(scene, { once: false })
  const role = useTypewriter(ROLES)

  const goto = (id) => {
    cyberAudio.playClick()
    document.querySelector(id)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hhafil876@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch { window.location.href = 'mailto:hhafil876@gmail.com' }
  }

  // Pointer parallax physics
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { damping: 28, stiffness: 100 })
  const my = useSpring(rawY, { damping: 28, stiffness: 100 })

  const handleMove = useCallback((e) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [reduced, rawX, rawY])

  const handleLeave = useCallback(() => { rawX.set(0); rawY.set(0) }, [rawX, rawY])

  // Parallax for portrait
  const portraitX = useTransform(mx, v => v * -10)
  const portraitY = useTransform(my, v => v * -10)

  // Entrance variants
  const ENV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } }
  }
  const TEXT = {
    hidden: { opacity: 0, y: 24 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } })
  }

  return (
    <div
      ref={scene}
      className="hero-monolith-scene"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* Background atmosphere */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="atmo-deep" />
        <div className="atmo-mid" />
        <div className="atmo-beam" />
        <div className="atmo-grid" />
      </div>

      {/* Main content */}
      <div className="hero-monolith-inner">

        {/* LEFT: Editorial Typography Column */}
        <div className="copy-col">

          {/* Status badge */}
          <motion.div
            custom={0.15}
            variants={TEXT}
            initial={false}
            animate="visible"
            className="hero-status-pill"
          >
            <span className="status-dot" aria-hidden="true" />
            <span className="status-text">AVAILABLE FOR OPPORTUNITIES</span>
          </motion.div>

          {/* Oversized Name */}
          <motion.div
            custom={0.3}
            variants={TEXT}
            initial={false}
            animate="visible"
            className="hero-name-block"
            aria-label="Mohammed Hapiz"
          >
            <div className="hero-name-line">
              <span className="hero-name-word">Mohammed</span>
            </div>
            <div className="hero-name-line">
              <span className="hero-name-word hero-name-accent">Hapiz</span>
              <span className="hero-name-slash" aria-hidden="true">/</span>
            </div>
          </motion.div>

          {/* Role line */}
          <motion.div
            custom={0.45}
            variants={TEXT}
            initial={false}
            animate="visible"
            className="hero-role-line"
            aria-live="polite"
          >
            <span className="role-label" aria-hidden="true">— </span>
            <span className="role-text">{reduced ? ROLES[0] : (role || '\u00A0')}</span>
            {!reduced && <span className="role-cursor" aria-hidden="true">|</span>}
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            custom={0.6}
            variants={TEXT}
            initial={false}
            animate="visible"
            className="hero-bio"
          >
            Computer Science student at MIT Kundapura (VTU). Architecting robust web
            applications, integrating generative AI pipelines, and directing high-fidelity visual media.
          </motion.p>

          {/* CTA actions */}
          <motion.div
            custom={0.75}
            variants={TEXT}
            initial={false}
            animate="visible"
            className="hero-cta-row"
          >
            <button
              onClick={() => goto('#projects')}
              onMouseEnter={() => cyberAudio.playHover()}
              className="cta-primary"
            >
              <span>Selected Works</span>
              <ArrowUpRight size={15} aria-hidden="true" />
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
              <FileDown size={14} aria-hidden="true" />
              <span>Resume</span>
            </a>

            <button
              onClick={copyEmail}
              onMouseEnter={() => cyberAudio.playHover()}
              className="cta-ghost"
              title="Copy email address"
              aria-label="Copy email to clipboard"
            >
              {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
              <span>{copied ? 'Copied' : 'hhafil876@gmail.com'}</span>
            </button>
          </motion.div>

          {/* Telemetry metrics strip */}
          <motion.div
            custom={0.9}
            variants={TEXT}
            initial={false}
            animate="visible"
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

        {/* RIGHT: Monolith with Art-Directed Silhouette Portrait */}
        <motion.div
          className="monolith-col"
          variants={ENV}
          initial={false}
          animate="visible"
        >
          <ObsidianMonolith mouseX={mx} mouseY={my} />

          {/* Integrated studio portrait cutout */}
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
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="scroll-label">EXPLORE</span>
        <div className="scroll-track">
          <motion.div
            className="scroll-thumb"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
