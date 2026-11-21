import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const spring = { damping: 30, stiffness: 560, mass: 0.22 }
const eligible = '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export default function CustomCursor() {
  const layer = useRef(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, spring)
  const ringY = useSpring(y, spring)

  useEffect(() => {
    const root = document.documentElement
    const cursor = layer.current
    const media = matchMedia(eligible)
    const particles = [...cursor.querySelectorAll('.cursor-trail')]
    let next = 0
    let lastTrail = 0

    function hide() {
      root.classList.remove('custom-cursor-active')
      cursor.hidden = true
    }
    function move(event) {
      const target = event.target
      if (!media.matches || event.pointerType !== 'mouse' || !(target instanceof Element)) return hide()
      const control = target.closest('a, button, [role=button], [role=tab]')
      if (target.closest('input, textarea, select, [contenteditable=true]') ||
          (!control && target.closest('p, h1, h2, h3, label, li'))) return hide()
      if (cursor.hidden) {
        ringX.jump(event.clientX)
        ringY.jump(event.clientY)
      }
      cursor.hidden = false
      root.classList.add('custom-cursor-active')
      cursor.dataset.mode = control?.matches('a') ? 'link' :
        control?.hasAttribute('data-project') ? 'view' : control ? 'button' : 'default'
      x.set(event.clientX)
      y.set(event.clientY)
      if (event.type === 'pointermove' && event.timeStamp - lastTrail > 46) {
        const dot = particles[next]
        dot.getAnimations().forEach(animation => animation.cancel())
        dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
        dot.animate([{ opacity: 0.46 }, { opacity: 0 }], 220)
        next = (next + 1) % particles.length
        lastTrail = event.timeStamp
      }
    }
    function pulse(event) {
      move(event)
      if (cursor.hidden) return
      const wave = cursor.querySelector('.cursor-pulse')
      wave.style.translate = `${event.clientX}px ${event.clientY}px`
      wave.getAnimations().forEach(animation => animation.cancel())
      wave.animate([{ transform: 'scale(.35)', opacity: .8 }, { transform: 'scale(1.5)', opacity: 0 }], 300)
    }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerover', move)
    document.addEventListener('pointerdown', pulse)
    document.addEventListener('keydown', hide)
    root.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    media.addEventListener('change', hide)
    return () => {
      hide()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', move)
      document.removeEventListener('pointerdown', pulse)
      document.removeEventListener('keydown', hide)
      root.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      media.removeEventListener('change', hide)
    }
  }, [x, y, ringX, ringY])

  return (
    <div ref={layer} hidden aria-hidden="true" className="reactor">
      {Array.from({length: 5}, (_, i) => <i key={i} className="cursor-trail" />)}
      <i className="cursor-pulse" />
      <motion.div style={{ x: ringX, y: ringY }}><i className="reticle" /><span>VIEW</span></motion.div>
      <motion.div style={{ x, y }}><i className="cursor-core" /></motion.div>
    </div>
  )
}
