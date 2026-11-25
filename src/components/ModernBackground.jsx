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
      {/* 1. Deep Abyss Foundation */}
      <div className="absolute inset-0 bg-[#090A0C]" />

      {/* 2. Fine Architectural Grain Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #c0c0c0 1px, transparent 1px),
            linear-gradient(#c0c0c0 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* 3. Volumetric Atmospheric Haze */}
      <div 
        className="absolute top-0 right-1/4 w-[80vw] max-w-[1000px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(255, 214, 0, 0.03) 0%, rgba(36, 39, 45, 0.15) 50%, transparent 80%)',
        }}
      />

      {/* 4. Mouse-reactive subtle directional light on desktop */}
      {mounted && !reduced && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="hidden md:block absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 214, 0, 0.025) 0%, rgba(192, 192, 192, 0.01) 40%, transparent 70%)',
            }}
          />
        </motion.div>
      )}

      {/* 5. Edge Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(9, 10, 12, 0.8) 100%)',
        }}
      />
    </div>
  )
}
