import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Copy, Check, FileDown } from 'lucide-react'
import Hero3DGyro from './Hero3DGyro'
import ErrorBoundary from './ErrorBoundary'
import { cyberAudio } from '../utils/audio'

const ROLES = [
  'Developer & Software Engineer',
  'AI Systems & Prompt Specialist',
  'Creative Technologist & Director',
]

function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 2000)
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
      del ? 35 : 75
    )
    return () => clearTimeout(t)
  }, [text, del, idx, pause])

  return (
    <span className="relative font-medium text-gray-200 tracking-tight">
      <span className="text-white font-semibold">{text}</span>
      <span className="text-lime-400 animate-pulse ml-1 font-mono font-normal">|</span>
    </span>
  )
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const goto = (id) => {
    cyberAudio.playClick()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
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
  const bgGlowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig)
  const bgGlowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)

  const handleMouseMove = (e) => {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[96vh] flex items-center justify-center pt-32 pb-20 px-6 sm:px-12 overflow-hidden"
    >
      {/* Background Soft Studio Ambiance with Lime Accent Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: bgGlowX, y: bgGlowY }}
          className="absolute right-1/4 top-1/4 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px] rounded-full bg-gradient-to-tr from-lime-500/15 via-lime-400/10 to-transparent blur-[130px] animate-aura-pulse"
        />
        <div className="absolute left-1/4 bottom-1/4 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full bg-gradient-to-br from-white/[0.04] via-ui-cyan/[0.05] to-transparent blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* ================= LEFT COLUMN: EDITORIAL BIO & ACTIONS (7 Cols) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Indicator */}
            <div
              onMouseEnter={() => cyberAudio.playHover()}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-7 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400 shadow-[0_0_10px_#a3e635]" />
              </span>
              <span className="text-[11px] font-medium tracking-[0.16em] text-gray-300 uppercase">
                Available for Roles &amp; <span className="text-lime-400 font-semibold">Strategic Collaborations</span>
              </span>
            </div>

            {/* Main Name Heading */}
            <div className="relative mb-5">
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[1.02] text-white">
                Mohammed <br />
                <span className="luxury-text-gradient">Hapiz</span>
              </h1>
            </div>

            {/* Dynamic Role */}
            <div className="h-8 sm:h-9 flex items-center text-lg sm:text-xl md:text-2xl mb-5 font-display">
              <Typewriter />
            </div>

            {/* Primary Value Proposition with Lime Highlights */}
            <h2 className="text-xl sm:text-2xl text-gray-200 leading-snug mb-5 max-w-xl font-normal font-sans">
              Building digital experiences through{' '}
              <span className="text-white font-medium">technology</span>,{' '}
              <span className="text-lime-400 font-semibold drop-shadow-[0_0_15px_rgba(163,230,53,0.35)]">creativity</span> &amp;{' '}
              <span className="text-lime-300 font-semibold">innovation</span>.
            </h2>

            {/* Executive Bio */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-normal">
              Computer Science student at MIT Kundapura. Dedicated to architecting robust web
              applications, integrating generative AI workflows, and directing high-fidelity visual media.
            </p>

            {/* Action Controls Including Download Resume */}
            <div className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
              <button
                onClick={() => goto('#projects')}
                onMouseEnter={() => cyberAudio.playHover()}
                className="ui-btn-primary px-7 py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide uppercase cursor-pointer group shadow-[0_4px_20px_rgba(163,230,53,0.25)]"
              >
                <span>Selected Works</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => goto('#contact')}
                onMouseEnter={() => cyberAudio.playHover()}
                className="ui-btn-secondary px-6 py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide uppercase cursor-pointer hover:border-lime-400/40"
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
                className="px-5 py-3.5 rounded-xl bg-lime-400/10 border border-lime-400/30 hover:border-lime-400 hover:bg-lime-400/20 text-lime-300 flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.15)]"
                title="Download Mohammed Hapiz Official Resume"
              >
                <FileDown size={15} className="text-lime-400" />
                <span>Resume CV</span>
              </a>

              <button
                onClick={copyEmail}
                onMouseEnter={() => cyberAudio.playHover()}
                className="px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-lime-400/40 text-gray-300 hover:text-white flex items-center gap-2 text-xs font-mono transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-lime-400" />
                    <span className="text-lime-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-gray-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Verified Metrics Bar */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              {[
                { label: 'Academic Rigor', val: '7.6 CGPA', sub: 'MIT Kundapura (VTU)', isLime: true },
                { label: 'Creative Media', val: '3+ Years', sub: 'Production & Direction', isLime: false },
                { label: 'Artifacts', val: '06 Systems', sub: 'Engineered & Deployed', isLime: true },
                { label: 'Base', val: 'Karnataka', sub: 'Global Remote Ready', isLime: false },
              ].map((m, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="p-2 transition-all text-left"
                >
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-0.5">
                    {m.label}
                  </div>
                  <div className={`font-display font-bold text-sm sm:text-base tracking-tight ${
                    m.isLime ? 'text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.3)]' : 'text-white'
                  }`}>
                    {m.val}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* ================= RIGHT COLUMN: PORTRAIT SHOWCASE (5 Cols) ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY }}
            className="lg:col-span-5 relative flex items-center justify-center perspective-[1200px] select-none"
          >
            {/* Floating Luxury Pedestal */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              style={{ x: portraitX, y: portraitY }}
              className="relative w-full max-w-[420px] sm:max-w-[470px] flex items-center justify-center"
            >
              {/* --- LAYER 1: Brushed Titanium Glass Pedestal --- */}
              <div className="absolute inset-3 sm:inset-5 rounded-[28px] bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent border border-white/10 backdrop-blur-2xl -z-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Real-time 3D Mechanical Gyroscope with Lime Green Core & WebGL Zero-Crash Fallback */}
                <ErrorBoundary fallback={<div className="absolute inset-0 bg-transparent" />}>
                  <Hero3DGyro mouseX={mouseX} mouseY={mouseY} />
                </ErrorBoundary>
              </div>

              {/* --- LAYER 2: Soft Lime Green & Studio Backlight --- */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[340px] h-[340px] rounded-full bg-lime-500/20 blur-[85px] -z-10 animate-aura-pulse pointer-events-none" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[300px] h-[300px] rounded-full bg-ui-cyan/15 blur-[80px] -z-10 pointer-events-none" />

              {/* --- LAYER 3: Authentic High-Resolution Portrait Cutout --- */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)',
                }}
              >
                <picture>
                  <source srcSet="/assets/hapiz-portrait.webp" type="image/webp" />
                  <img
                    src="/assets/hapiz-portrait.png"
                    alt="Mohammed Hapiz — Developer, AI Specialist & Creative Technologist"
                    className="w-full h-auto object-contain object-top relative z-10 transition-all duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(163, 230, 53, 0.28)) drop-shadow(0 0 35px rgba(56, 189, 248, 0.18)) drop-shadow(0 25px 35px rgba(0, 0, 0, 0.95))',
                    }}
                    loading="eager"
                  />
                </picture>

                {/* Feathered Dark Base Blend */}
                <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-ui-void via-ui-void/80 to-transparent pointer-events-none z-20" />
              </div>

              {/* --- LAYER 4: Floating Metadata Chips --- */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                onMouseEnter={() => cyberAudio.playHover()}
                className="absolute -top-1 -right-2 sm:right-1 px-3.5 py-1.5 rounded-full bg-obsidian-900/90 border border-lime-400/30 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center gap-2 z-30 group cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
                <span className="font-display font-medium text-xs text-white group-hover:text-lime-300 transition-colors">
                  AI &amp; Engineering
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                onMouseEnter={() => cyberAudio.playHover()}
                className="absolute bottom-8 -left-3 sm:-left-4 px-3.5 py-1.5 rounded-full bg-obsidian-900/90 border border-white/10 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center gap-2 z-30 group cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
                <span className="font-display font-medium text-xs text-white group-hover:text-lime-300 transition-colors">
                  H&amp;N Creations
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
