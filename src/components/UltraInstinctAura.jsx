import { useEffect, useRef } from 'react'

export default function UltraInstinctAura() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let isPaused = false

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouse = { x: width / 2, y: height / 2, active: false }
    let shockwaves = []

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const onMouseMove = (e) => {
      if (prefersReducedMotion) return
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
      
      if (!isMobile && Math.random() < 0.2) {
        embers.push(new Ember(mouse.x + (Math.random() - 0.5) * 30, mouse.y + (Math.random() - 0.5) * 30, true))
      }
    }

    const onClick = (e) => {
      if (prefersReducedMotion) return
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: Math.min(width, height) * (isMobile ? 0.35 : 0.45),
        opacity: 0.85,
        color: 'rgba(240, 246, 255, ',
        edgeColor: 'rgba(163, 230, 53, ' // Lime accent
      })
      const burstCount = isMobile ? 8 : 18
      for (let i = 0; i < burstCount; i++) {
        embers.push(new Ember(e.clientX, e.clientY, true))
      }
    }

    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('click', onClick)

    // ─── Divine Embers / Aura Sparks ───
    class Ember {
      constructor(startX, startY, isBurst = false) {
        this.reset(startX, startY, isBurst)
      }

      reset(startX, startY, isBurst = false) {
        this.x = startX !== undefined ? startX : Math.random() * width
        this.y = startY !== undefined ? startY : height + Math.random() * 50
        this.size = Math.random() * 2 + 0.8
        
        if (isBurst) {
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 3 + 1.2
          this.vx = Math.cos(angle) * speed
          this.vy = Math.sin(angle) * speed - 1.2
          this.life = 1
          this.decay = Math.random() * 0.025 + 0.015
        } else {
          this.vx = (Math.random() - 0.5) * 0.6
          this.vy = -(Math.random() * 1.5 + 0.8)
          this.life = Math.random() * 0.8 + 0.2
          this.decay = Math.random() * 0.003 + 0.002
        }

        const r = Math.random()
        if (r < 0.6) {
          this.color = [255, 255, 255] // Silver-white
        } else if (r < 0.85) {
          this.color = [163, 230, 53] // Electric Lime
        } else {
          this.color = [56, 189, 248] // Cyan
        }
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decay
        this.vx += Math.sin(this.y * 0.01) * 0.03

        if (this.life <= 0 || this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset()
        }
      }

      draw() {
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.life * 0.75})`
        if (!isMobile) {
          ctx.shadowBlur = this.size * 5
          ctx.shadowColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.life})`
        }
        ctx.fill()
        ctx.restore()
      }
    }

    // ─── Flowing Aura Waves ───
    class AuraWave {
      constructor(baseColor, speed, amplitude) {
        this.baseColor = baseColor
        this.speed = speed
        this.amplitude = amplitude
        this.time = Math.random() * 100
      }

      draw() {
        this.time += this.speed
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(0, height)
        const step = isMobile ? 50 : 30
        for (let x = 0; x <= width; x += step) {
          const y = height * 0.55 + 
            Math.sin(x * 0.002 + this.time) * this.amplitude + 
            Math.cos(x * 0.004 - this.time * 0.7) * (this.amplitude * 0.5)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, height * 0.4, 0, height)
        grad.addColorStop(0, this.baseColor[0])
        grad.addColorStop(0.5, this.baseColor[1])
        grad.addColorStop(1, 'transparent')

        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
      }
    }

    const emberCount = isMobile ? 22 : Math.min(65, Math.floor((width * height) / 22000))
    const embers = Array.from({ length: emberCount }, () => new Ember())

    const waves = [
      new AuraWave(['rgba(163, 230, 53, 0.04)', 'rgba(2, 6, 23, 0.3)'], 0.006, isMobile ? 90 : 130),
      new AuraWave(['rgba(241, 245, 249, 0.03)', 'rgba(56, 189, 248, 0.02)'], 0.01, isMobile ? 80 : 110),
    ]

    const loop = () => {
      if (isPaused) return
      animationId = requestAnimationFrame(loop)

      ctx.clearRect(0, 0, width, height)

      // Draw subtle aura waves
      waves.forEach(w => w.draw())

      // Update & Draw shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i]
        sw.radius += (sw.maxRadius - sw.radius) * 0.07 + 2
        sw.opacity -= 0.02

        if (sw.opacity <= 0) {
          shockwaves.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
        ctx.strokeStyle = sw.edgeColor + sw.opacity + ')'
        ctx.lineWidth = 2.5
        if (!isMobile) {
          ctx.shadowBlur = 18
          ctx.shadowColor = 'rgba(163, 230, 53, ' + sw.opacity + ')'
        }
        ctx.stroke()
        ctx.restore()
      }

      // Update & Draw embers
      embers.forEach(e => {
        e.update()
        e.draw()
      })
    }

    // Visibility Management
    const onVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true
        cancelAnimationFrame(animationId)
      } else {
        if (!prefersReducedMotion) {
          isPaused = false
          loop()
        }
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    if (prefersReducedMotion) {
      // Draw static gentle ambient background without ongoing RAF loop
      waves.forEach(w => w.draw())
    } else {
      loop()
    }

    return () => {
      cancelAnimationFrame(animationId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
