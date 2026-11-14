import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Film, Compass, Activity, Play, ChevronRight } from 'lucide-react'

const CHAPTERS = [
  { id: 'home', name: 'ACT I: PROTOCOL ORIGIN', time: '00:00:12' },
  { id: 'about', name: 'ACT II: THE FOUNDATION', time: '00:01:24' },
  { id: 'skills', name: 'ACT III: CORE CAPABILITIES', time: '00:02:40' },
  { id: 'projects', name: 'ACT IV: SELECTED ARTIFACTS', time: '00:03:52' },
  { id: 'experience', name: 'ACT V: EXECUTIVE TRAJECTORY', time: '00:04:30' },
  { id: 'achievements', name: 'ACT VI: VERIFIED HONORS', time: '00:05:15' },
  { id: 'contact', name: 'FINALE: INITIATE LINK', time: '00:06:00' },
]

export default function CinematicHUD() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 })
  const [currentChapter, setCurrentChapter] = useState(CHAPTERS[0])
  const [timecode, setTimecode] = useState('00:00:00:00')
  const [velocityDisplay, setVelocityDisplay] = useState(0)

  useEffect(() => {
    let lastY = window.scrollY
    let lastTime = performance.now()
    let frameId

    const updateTelemetry = () => {
      const now = performance.now()
      const currentY = window.scrollY
      const dt = Math.max(1, now - lastTime)
      const vel = Math.abs((currentY - lastY) / dt) * 1000

      setVelocityDisplay((prev) => Math.round(prev * 0.85 + vel * 0.15))

      // Generate dynamic video timecode based on scroll position
      const totalFrames = Math.floor((currentY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 1440)
      const sec = Math.floor(totalFrames / 24)
      const frames = totalFrames % 24
      const min = Math.floor(sec / 60)
      const secRem = sec % 60
      const tc = `00:${String(min).padStart(2, '0')}:${String(secRem).padStart(2, '0')}:${String(frames).padStart(2, '0')}`
      setTimecode(tc)

      // Detect active chapter
      const scrollRatio = currentY / Math.max(1, document.body.scrollHeight - window.innerHeight)
      const chapterIdx = Math.min(CHAPTERS.length - 1, Math.floor(scrollRatio * CHAPTERS.length))
      setCurrentChapter(CHAPTERS[chapterIdx])

      lastY = currentY
      lastTime = now
      frameId = requestAnimationFrame(updateTelemetry)
    }

    frameId = requestAnimationFrame(updateTelemetry)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden font-mono select-none">
      {/* ─── 1. CINEMATIC 2.39:1 LETTERBOX BARS (Ultra-sleek top & bottom) ─── */}
      <div className="absolute top-0 inset-x-0 h-2 sm:h-3 bg-obsidian-950/80 backdrop-blur-md border-b border-white/[0.04] z-40" />
      <div className="absolute bottom-0 inset-x-0 h-4 sm:h-6 bg-obsidian-950/90 backdrop-blur-md border-t border-white/[0.06] z-40" />

      {/* ─── 2. TOP CORNER FILM TELEMETRY ─── */}
      {/* Top Left: Video Record Telemetry */}
      <div className="absolute top-5 sm:top-7 left-6 sm:left-10 flex items-center gap-3 text-[10px] sm:text-[11px] text-gray-400">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
          <span className="text-white font-bold tracking-widest">LIVE REC</span>
          <span className="text-gray-500">//</span>
          <span className="text-lime-400 font-semibold tracking-wider">4K 60FPS</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-gray-500 text-[10px]">
          <span>TC:</span>
          <span className="text-white font-semibold font-mono tracking-wider">{timecode}</span>
        </div>
      </div>

      {/* Top Right: Optical Lens Telemetry */}
      <div className="absolute top-5 sm:top-7 right-6 sm:right-10 hidden sm:flex items-center gap-3 text-[10px] text-gray-400">
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="text-gray-400">ANAMORPHIC: <span className="text-lime-300 font-semibold">35mm T1.5</span></span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">ISO: <span className="text-white font-semibold">800</span></span>
          <span className="text-gray-600">|</span>
          <span className="text-lime-400">FPS: 60</span>
        </div>
      </div>

      {/* ─── 3. CINEMATIC RETICLE CORNER ACCENTS ─── */}
      <div className="absolute top-8 left-6 w-3 h-3 border-t-2 border-l-2 border-white/20 pointer-events-none hidden lg:block" />
      <div className="absolute top-8 right-6 w-3 h-3 border-t-2 border-r-2 border-white/20 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-10 left-6 w-3 h-3 border-b-2 border-l-2 border-white/20 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-10 right-6 w-3 h-3 border-b-2 border-r-2 border-white/20 pointer-events-none hidden lg:block" />

      {/* ─── 4. BOTTOM CINEMATIC SCRUBBER TIMELINE ─── */}
      <div className="absolute bottom-1.5 inset-x-6 sm:inset-x-12 z-50 flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400">
        {/* Left: Active Chapter Title */}
        <div className="flex items-center gap-2 text-white truncate max-w-[220px] sm:max-w-md">
          <Play size={9} className="text-lime-400 fill-lime-400 flex-shrink-0 animate-pulse" />
          <span className="text-lime-400 font-semibold tracking-wider truncate">
            {currentChapter.name}
          </span>
        </div>

        {/* Center: Video Scrub Track */}
        <div className="flex-1 max-w-sm sm:max-w-xl mx-4 relative h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-lime-400 via-emerald-300 to-ui-cyan origin-left shadow-[0_0_10px_#a3e635]"
          />
        </div>

        {/* Right: Kinetic Camera Velocity & Depth Meter */}
        <div className="flex items-center gap-3 text-right flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5">
            <Activity size={10} className="text-lime-400" />
            <span>VEL:</span>
            <span className="text-white font-semibold font-mono w-14 text-right">
              {velocityDisplay} px/s
            </span>
          </div>
          <span className="text-lime-400 font-semibold">{timecode}</span>
        </div>
      </div>
    </div>
  )
}
