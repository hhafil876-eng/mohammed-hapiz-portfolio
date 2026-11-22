import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Copy, Check, FileDown } from 'lucide-react'
import { cyberAudio } from '../utils/audio'
import { heroEntrance } from '../utils/motionVariants'

const ROLES = [
  'Software Engineer & Full-Stack Developer',
  'Generative AI Specialist & Prompt Architect',
  'Creative Technologist & Media Director',
]

function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 2200)
      return () => clearTimeout(t)
    }
    const word = ROLES[idx]
    if (!del && text.length === word.length) {
      setPause(true)
      setDel(true)
      return
    }
    if (del && text.length === 0) {
      setDel(false)
      setIdx((i) => (i + 1) % ROLES.length)
      return
    }
    const t = setTimeout(
      () => setText(del ? text.slice(0, -1) : word.slice(0, text.length + 1)),
      del ? 30 : 65
    )
    return () => clearTimeout(t)
  }, [text, del, idx, pause])

  return (
    <span className="relative font-medium text-silver-300 tracking-tight">
      <span className="text-white font-semibold">{text}</span>
      <span className="text-[#FFD600] animate-pulse ml-1 font-mono font-normal">|</span>
    </span>
  )
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const scene = useRef(null)
  const inView = useInView(scene)
  const reduced = useReducedMotion()

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

  // Mouse Parallax Physics for the Hero Portrait & 3D Lighting
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 28, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig)
  const portraitX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)
  const portraitY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig)
  const bgGlowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [14, -14]), springConfig)
  const bgGlowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig)

  const handleMouseMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={scene}
      data-in-view={inView}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      className="hero-scene relative min-h-[96vh] flex items-center justify-center pt-32 pb-20 px-6 sm:px-12 overflow-hidden"
    >
      {/* Background Soft Studio Ambiance with Yellow & Silver Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ x: bgGlowX, y: bgGlowY }}
          className="absolute right-1/4 top-1/4 w-[480px] sm:w-[640px] h-[480px] sm:h-[640px] rounded-full bg-gradient-to-tr from-[#FFD600]/10 via-[#FFD600]/05 to-transparent blur-[120px] animate-aura-pulse"
        />
        <div className="absolute left-1/4 bottom-1/4 w-[400px] sm:w-[540px] h-[400px] sm:h-[540px] rounded-full bg-gradient-to-br from-[#C0C0C0]/08 via-[#343840]/20 to-transparent blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="hero-grid grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* ================= LEFT COLUMN: EDITORIAL BIO & ACTIONS (7 Cols) ================= */}
          <motion.div
            variants={heroEntrance}
            initial="hidden"
            animate="visible"
            custom={0}
            className="hero-copy lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Indicator */}
            <div
              onMouseEnter={() => cyberAudio.playHover()}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2B2E34]/80 border border-[#C0C0C0]/20 backdrop-blur-xl mb-7 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD600] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD600] shadow-[0_0_8px_#FFD600]" />
              </span>
              <span className="text-[11px] font-medium tracking-[0.16em] text-silver-300 uppercase font-mono">
                Available for Roles &amp; <span className="text-[#FFD600] font-semibold">Strategic Engineering</span>
              </span>
            </div>

            {/* Main Name Heading */}
            <div className="relative mb-5">
              <h1 aria-label="Mohammed Hapiz" className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[1.02] text-white">
                <span aria-hidden="true" className="name-line"><span>Mohammed</span></span>
                <span aria-hidden="true" className="name-line"><span className="luxury-text-gradient">Hapiz</span></span>
              </h1>
            </div>

            {/* Dynamic Role */}
            <div className="min-h-14 sm:min-h-9 flex items-center text-lg sm:text-xl md:text-2xl mb-5 font-display">
              <span className="sr-only">{ROLES[0]}</span>
              <span aria-hidden="true">{reduced || !inView ? ROLES[0] : <Typewriter />}</span>
            </div>

            {/* Primary Value Proposition */}
            <h2 className="text-xl sm:text-2xl text-silver-200 leading-snug mb-5 max-w-xl font-normal font-sans">
              Building exceptional digital systems through{' '}
              <span className="text-white font-medium">engineering</span>,{' '}
              <span className="text-[#FFD600] font-semibold drop-shadow-[0_0_12px_rgba(255,214,0,0.3)]">creativity</span> &amp;{' '}
              <span className="text-silver-100 font-medium">applied intelligence</span>.
            </h2>

            {/* Executive Bio */}
            <p className="text-silver-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-normal">
              Computer Science student at MIT Kundapura (VTU). Dedicated to architecting robust web
              applications, integrating generative AI pipelines, and directing high-fidelity visual media.
            </p>

            {/* Action Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
              <button
                onClick={() => goto('#projects')}
                onMouseEnter={() => cyberAudio.playHover()}
                className="ui-btn-primary px-7 py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide uppercase cursor-pointer group"
              >
                <span>Selected Works</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => goto('#contact')}
                onMouseEnter={() => cyberAudio.playHover()}
                className="ui-btn-secondary px-6 py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide uppercase cursor-pointer"
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
                className="px-5 py-3.5 rounded-xl bg-[#2B2E34]/80 border border-[#C0C0C0]/25 hover:border-[#FFD600] text-silver-200 hover:text-white flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer shadow-sm group"
                title="Download Mohammed Hapiz Official Resume"
              >
                <FileDown size={15} className="text-[#FFD600] group-hover:scale-110 transition-transform" />
                <span>Resume CV</span>
              </a>

              <button
                onClick={copyEmail}
                onMouseEnter={() => cyberAudio.playHover()}
                className="px-4 py-3.5 rounded-xl bg-[#2B2E34]/60 border border-[#C0C0C0]/15 hover:border-[#FFD600]/50 text-silver-300 hover:text-white flex items-center gap-2 text-xs font-mono transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[#FFD600]" />
                    <span className="text-[#FFD600]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-silver-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Verified Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-[#2B2E34]/80 border border-[#C0C0C0]/15 backdrop-blur-xl shadow-sm">
              {[
                { label: 'Academic Rigor', val: '7.6 CGPA', sub: 'MIT Kundapura (VTU)', isYellow: true },
                { label: 'Creative Media', val: '3+ Years', sub: 'Production & Direction', isYellow: false },
                { label: 'Artifacts', val: '06 Systems', sub: 'Engineered & Deployed', isYellow: true },
                { label: 'Base', val: 'Karnataka', sub: 'Global Remote Ready', isYellow: false },
              ].map((m, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="p-2 transition-all text-left"
                >
                  <div className="text-[10px] uppercase tracking-wider text-silver-500 font-medium mb-0.5 font-mono">
                    {m.label}
                  </div>
                  <div className={`font-display font-bold text-sm sm:text-base tracking-tight ${
                    m.isYellow ? 'text-[#FFD600]' : 'text-white'
                  }`}>
                    {m.val}
                  </div>
                  <div className="text-[10px] text-silver-400 truncate mt-0.5">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* ================= RIGHT COLUMN: PORTRAIT SHOWCASE (5 Cols) ================= */}
          <motion.div
            variants={heroEntrance}
            initial="hidden"
            animate="visible"
            custom={2}
            style={{ rotateX, rotateY }}
            className="lg:col-span-5 relative flex items-center justify-center perspective-[1200px] select-none"
          >
            <div className="portrait-stage">
              <div aria-hidden="true" className="portrait-orbit" />
              <motion.div className="portrait-crop" style={{ x: portraitX, y: portraitY }}>
                <img src="/assets/hapiz-portrait.webp" width="681" height="1024"
                  alt="Mohammed Hapiz wearing a dark suit" fetchpriority="high" />
              </motion.div>
              <span className="portrait-label">AI &amp; Engineering</span>
              <span className="portrait-label studio-label">H&amp;N Creations</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
