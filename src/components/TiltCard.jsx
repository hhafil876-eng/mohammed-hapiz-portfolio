import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cyberAudio } from '../utils/audio'

export default function TiltCard({
  children,
  className = '',
  glare = true,
  maxTilt = 6,
  scale = 1.015,
  onClick,
  onKeyDown,
  role,
  tabIndex,
  ...props
}) {
  const reduced = useReducedMotion()
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    if (reduced || e.pointerType !== 'mouse' || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    setRotateX(tiltX)
    setRotateY(tiltY)

    if (glare) {
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100
      setGlarePos({ x: glareX, y: glareY, opacity: 0.15 })
    }
  }

  const handleMouseEnter = () => {
    cyberAudio.playHover()
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: rotateX !== 0 || rotateY !== 0 ? scale : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
        mass: 0.4,
      }}
      className={`relative ui-card ${className} select-none overflow-hidden`}
      {...props}
    >
      {/* Specular Glare (Metallic Silver & Soft Yellow) */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 214, 0, 0.06) 30%, transparent 60%)`,
            opacity: glarePos.opacity,
          }}
        />
      )}

      {/* Inner Card Content */}
      <div style={{ transform: 'translateZ(15px)' }} className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  )
}
