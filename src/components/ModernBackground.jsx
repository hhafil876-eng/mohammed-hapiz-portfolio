import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function ModernBackground() {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const springConfig = { damping: 30, stiffness: 180, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* ─── 1. DEEP OBSIDIAN CANVAS ─── */}
      <div className="absolute inset-0 bg-[#030508]" />

      {/* ─── 2. SUBTLE ARCHITECTURAL MICRO-GRID ─── */}
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.45) 1px, transparent 0)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
        }}
      />

      {/* ─── 3. STRATEGIC AMBIENT STUDIO GLOWS (Quiet Luxury) ─── */}
      {/* Top Hero Glow: Subtle Lime Green Accent */}
      <div 
        className="absolute -top-32 right-1/4 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(163, 230, 53, 0.08) 0%, rgba(132, 204, 22, 0.03) 45%, transparent 70%)',
          filter: 'blur(90px)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Middle Section Glow: Subtle Ice Cyan Accent */}
      <div 
        className="absolute top-1/2 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, rgba(14, 165, 233, 0.02) 45%, transparent 70%)',
          filter: 'blur(100px)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Lower Section Glow: Soft Emerald Foundation */}
      <div 
        className="absolute bottom-10 right-10 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(163, 230, 53, 0.06) 0%, rgba(16, 185, 129, 0.02) 50%, transparent 70%)',
          filter: 'blur(110px)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* ─── 4. MOUSE-INTERACTIVE SOFT SPOTLIGHT (Desktop Only) ─── */}
      {mounted && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="hidden md:block absolute w-[420px] h-[420px] rounded-full pointer-events-none"
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(163, 230, 53, 0.045) 0%, rgba(56, 189, 248, 0.02) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
      )}

      {/* ─── 5. SUBTLE EDGE VIGNETTE (Focuses attention to center content) ─── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 65%, rgba(3, 5, 8, 0.6) 100%)',
        }}
      />
    </div>
  )
}
