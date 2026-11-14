import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const trailCanvasRef = useRef(null)

  // Luxury smooth damped spring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.25 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    const trailCanvas = trailCanvasRef.current
    if (!trailCanvas) return
    const ctx = trailCanvas.getContext('2d')
    trailCanvas.width = window.innerWidth
    trailCanvas.height = window.innerHeight

    let particles = []
    let lastX = -100
    let lastY = -100

    const onResize = () => {
      trailCanvas.width = window.innerWidth
      trailCanvas.height = window.innerHeight
    }

    const onMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Minimal luxury stardust (subtle, delicate)
      if (dist > 6) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: -dx * 0.1 + (Math.random() - 0.5) * 0.8,
          vy: -dy * 0.1 + (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.6 + 0.8,
          life: 0.8,
          decay: 0.035,
          color: Math.random() > 0.5 ? '255, 255, 255' : '186, 230, 253',
        })
      }

      lastX = e.clientX
      lastY = e.clientY
    }

    const onMouseDown = () => {
      setClicked(true)
    }
    const onMouseUp = () => setClicked(false)

    const onMouseOver = (e) => {
      const el = e.target
      if (el.closest('a, button, [role="button"], input, textarea, .ui-card, [data-cursor-hover]')) {
        setHovered(true)
      }
    }

    const onMouseOut = (e) => {
      const el = e.target
      if (el.closest('a, button, [role="button"], input, textarea, .ui-card, [data-cursor-hover]')) {
        setHovered(false)
      }
    }

    let animId
    const render = () => {
      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.5})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      animId = requestAnimationFrame(render)
    }

    render()

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [cursorX, cursorY])

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Delicate Trail Canvas */}
      <canvas ref={trailCanvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Luxury Trailing Halo Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 46 : clicked ? 20 : 28,
          height: hovered ? 46 : clicked ? 20 : 28,
          borderColor: hovered ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.2 }}
        className="rounded-full border pointer-events-none transition-colors"
      />

      {/* Pinpoint Core Indicator */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 0.6 : clicked ? 1.4 : 1,
          opacity: hovered ? 0.8 : 1,
        }}
        className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none"
      />
    </div>
  )
}
