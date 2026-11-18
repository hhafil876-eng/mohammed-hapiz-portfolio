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
      {/* ─── 1. DEEP GRAPHITE CANVAS ─── */}
      <div className="absolute inset-0 bg-[#17191D]" />

      {/* ─── 2. SUBTLE ARCHITECTURAL MICRO-GRID ─── */}
      <div 
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
        }}
      />

      {/* ─── 3. STRATEGIC AMBIENT STUDIO GLOWS ─── */}
      {/* Top Hero Glow: Subtle Electric Yellow Accent */}
      <div 
        className="absolute -top-32 right-1/4 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 214, 0, 0.05) 0%, rgba(255, 214, 0, 0.015) 45%, transparent 70%)',
          filter: 'blur(90px)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Middle Section Glow: Metallic Silver Accent */}
      <div 
        className="absolute top-1/2 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.035) 0%, rgba(192, 192, 192, 0.01) 45%, transparent 70%)',
          filter: 'blur(100px)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Lower Section Glow: Soft Graphite & Yellow Foundation */}
      <div 
        className="absolute bottom-10 right-10 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 214, 0, 0.04) 0%, rgba(52, 56, 64, 0.1) 50%, transparent 70%)',
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
              background: 'radial-gradient(circle, rgba(255, 214, 0, 0.03) 0%, rgba(192, 192, 192, 0.015) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
      )}

      {/* ─── 5. SUBTLE EDGE VIGNETTE ─── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 65%, rgba(15, 16, 19, 0.6) 100%)',
        }}
      />
    </div>
  )
}
