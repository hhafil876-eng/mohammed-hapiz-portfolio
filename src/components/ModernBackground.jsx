import { useState, useEffect } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'

export default function ModernBackground() {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const springConfig = { damping: 32, stiffness: 160, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (reduced || !matchMedia('(pointer: fine)').matches) return
    setMounted(true)
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, reduced])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* ─── 1. ABYSS BLACK TO OBSIDIAN FOUNDATION ─── */}
      <div className="absolute inset-0 bg-[#090A0C]" />

      {/* ─── 2. CELESTIAL COORDINATE MICRO-GRID & ORBIT ARCS ─── */}
      <div 
        className="architectural-grid absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #c0c0c015 1px, transparent 1px),
            linear-gradient(#c0c0c015 1px, transparent 1px),
            radial-gradient(circle at 1px 1px, #ffd60060 1px, transparent 0)
          `,
          backgroundSize: '120px 120px, 120px 120px, 40px 40px',
          maskImage: 'radial-gradient(ellipse 95% 85% at 50% 25%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 25%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
        }}
      />

      {/* Decorative Radial Orbit Rings in Background */}
      <div 
        className="absolute top-10 right-1/4 w-[900px] h-[900px] rounded-full border border-[#C0C0C0]/[0.035] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-28 right-1/4 w-[740px] h-[740px] rounded-full border border-dashed border-[#FFD600]/[0.04] pointer-events-none animate-orbit-slow"
      />

      {/* ─── 3. STRATEGIC VOLUMETRIC ATMOSPHERIC ILLUMINATION ─── */}
      {/* Hero Celestial Corona Glow (Subtle Electric Yellow & Gold) */}
      <div 
        className="absolute -top-36 right-1/4 w-[700px] h-[700px] rounded-full pointer-events-none animate-eclipse-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255, 214, 0, 0.045) 0%, rgba(185, 154, 0, 0.02) 40%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Middle Arcane Glow: Metallic Silver & Obsidian */}
      <div 
        className="absolute top-1/2 -left-48 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.03) 0%, rgba(36, 39, 45, 0.08) 50%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Lower Foundation Glow: Gold Corona & Deep Graphite */}
      <div 
        className="absolute bottom-10 right-10 w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 214, 0, 0.035) 0%, rgba(23, 25, 29, 0.12) 55%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* ─── 4. MOUSE-INTERACTIVE SOFT ASTROLABE LIGHT (Desktop Only) ─── */}
      {mounted && !reduced && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="hidden md:block absolute w-[460px] h-[460px] rounded-full pointer-events-none"
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 214, 0, 0.028) 0%, rgba(192, 192, 192, 0.012) 45%, transparent 70%)',
            }}
          />
        </motion.div>
      )}

      {/* ─── 5. SUBTLE OBSIDIAN VIGNETTE ─── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(9, 10, 12, 0.75) 100%)',
        }}
      />
    </div>
  )
}
