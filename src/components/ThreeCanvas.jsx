import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeCanvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pixelRatioCap = isMobile ? 1.5 : 2

    // ─── SCENE SETUP ───
    const scene = new THREE.Scene()
    // Atmospheric dark cinematic fog that reveals glowing horizons
    scene.fog = new THREE.FogExp2(0x030508, 0.0012)

    const camera = new THREE.PerspectiveCamera(
      62,
      window.innerWidth / window.innerHeight,
      1,
      3000
    )
    camera.position.set(0, 140, 500)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap))
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // ─── DELICATE TEXTURE GENERATOR ───
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.2, 'rgba(240, 253, 244, 0.9)')
      grad.addColorStop(0.5, 'rgba(163, 230, 53, 0.35)') // Electric Lime
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(32, 32, 32, 0, Math.PI * 2)
      ctx.fill()
      return new THREE.CanvasTexture(canvas)
    }

    const glowTexture = createGlowTexture()

    // ─── 1. CYBERNETIC HIGHWAY / TERRAIN GRID (Cinematic Runway) ───
    const gridCols = isMobile ? 40 : 70
    const gridRows = isMobile ? 50 : 80
    const gridSpacing = 42
    const totalGridPoints = gridCols * gridRows

    const gridPositions = new Float32Array(totalGridPoints * 3)
    const gridColors = new Float32Array(totalGridPoints * 3)

    let pIdx = 0
    for (let c = 0; c < gridCols; c++) {
      for (let r = 0; r < gridRows; r++) {
        const x = (c - gridCols / 2) * gridSpacing
        const z = (r - gridRows * 0.35) * -gridSpacing // Extends deep into the horizon
        const y = -120

        gridPositions[pIdx] = x
        gridPositions[pIdx + 1] = y
        gridPositions[pIdx + 2] = z

        // Gradient color: Electric lime center line fading to icy cyan & silver
        const distFromCenter = Math.abs(x) / (gridCols * gridSpacing * 0.5)
        if (distFromCenter < 0.15) {
          // Highway center line: Intense electric lime
          gridColors[pIdx] = 0.64
          gridColors[pIdx + 1] = 0.90
          gridColors[pIdx + 2] = 0.21
        } else if (distFromCenter < 0.5) {
          gridColors[pIdx] = 0.85
          gridColors[pIdx + 1] = 0.98
          gridColors[pIdx + 2] = 0.95
        } else {
          gridColors[pIdx] = 0.22
          gridColors[pIdx + 1] = 0.74
          gridColors[pIdx + 2] = 0.97
        }

        pIdx += 3
      }
    }

    const gridGeometry = new THREE.BufferGeometry()
    gridGeometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3))
    gridGeometry.setAttribute('color', new THREE.BufferAttribute(gridColors, 3))

    const gridMaterial = new THREE.PointsMaterial({
      size: isMobile ? 13 : 11,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const gridParticles = new THREE.Points(gridGeometry, gridMaterial)
    scene.add(gridParticles)

    // ─── 2. HYPERSPACE STREAKS (Stretch based on scroll speed) ───
    const streakCount = isMobile ? 300 : 750
    const streakPositions = new Float32Array(streakCount * 3)
    const streakSpeeds = new Float32Array(streakCount)
    const streakBaseZ = new Float32Array(streakCount)

    for (let s = 0; s < streakCount; s++) {
      const idx = s * 3
      streakPositions[idx] = (Math.random() - 0.5) * 1600
      streakPositions[idx + 1] = (Math.random() - 0.2) * 900
      const z = (Math.random() - 0.5) * 2800 - 400
      streakPositions[idx + 2] = z
      streakBaseZ[s] = z
      streakSpeeds[s] = Math.random() * 2 + 1
    }

    const streakGeometry = new THREE.BufferGeometry()
    streakGeometry.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3))

    const streakMaterial = new THREE.PointsMaterial({
      size: 5,
      map: glowTexture,
      color: 0xf8fafc,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const streakParticles = new THREE.Points(streakGeometry, streakMaterial)
    scene.add(streakParticles)

    // ─── 3. CINEMATIC WARP GATES (Massive Glowing Portals along the Flight Path) ───
    const gatesGroup = new THREE.Group()
    scene.add(gatesGroup)

    const gateZPositions = [200, -350, -900, -1450, -2000, -2550]
    const gates = []

    gateZPositions.forEach((zPos, gIdx) => {
      const gateRingGeo = new THREE.TorusGeometry(isMobile ? 120 : 160, 0.4, 16, 64)
      const isLime = gIdx % 2 === 0
      const gateRingMat = new THREE.MeshBasicMaterial({
        color: isLime ? 0xa3e635 : 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
      const ring = new THREE.Mesh(gateRingGeo, gateRingMat)
      ring.position.set(0, 0, zPos)
      ring.rotation.z = gIdx * 0.4

      // Hexagonal outer frame for high-tech architectural feel
      const hexGeo = new THREE.CircleGeometry(isMobile ? 140 : 185, 6)
      const hexMat = new THREE.MeshBasicMaterial({
        color: isLime ? 0xa3e635 : 0xf8fafc,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
      const hex = new THREE.Mesh(hexGeo, hexMat)
      hex.position.set(0, 0, zPos)

      gatesGroup.add(ring)
      gatesGroup.add(hex)

      gates.push({ ring, hex, baseZ: zPos, rotSpeed: (gIdx % 2 === 0 ? 1 : -1) * 0.004 })
    })

    // ─── 4. KINETIC SCROLL VELOCITY ENGINE ───
    let targetScroll = 0
    let currentScroll = 0
    let scrollVelocity = 0
    let lastScrollY = window.scrollY
    let lastTimestamp = performance.now()

    const onScroll = () => {
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
      targetScroll = Math.min(1, Math.max(0, window.scrollY / maxScroll))

      const now = performance.now()
      const dt = Math.max(1, now - lastTimestamp)
      const deltaY = window.scrollY - lastScrollY
      const instantVel = Math.abs(deltaY / dt) * 10
      scrollVelocity = Math.min(80, scrollVelocity * 0.7 + instantVel * 0.3)

      lastScrollY = window.scrollY
      lastTimestamp = now
    }

    // Mouse Parallax Steering
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.15
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.1
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', onResize)

    // Initial trigger
    onScroll()

    // ─── 5. THE CINEMATIC RENDER LOOP ───
    let clock = 0
    let isPaused = false

    const animate = () => {
      if (isPaused) return
      animationFrameId = requestAnimationFrame(animate)

      clock += 0.015

      // Smooth Inertia Scroll Scrubbing (Damped spring lerp)
      currentScroll += (targetScroll - currentScroll) * 0.055
      scrollVelocity *= 0.94 // Friction decay

      // Mouse Parallax Smoothing
      mouseX += (targetMouseX - mouseX) * 0.04
      mouseY += (targetMouseY - mouseY) * 0.04

      // ─── DYNAMIC 3D CAMERA FLIGHT CHOREOGRAPHY ───
      // Camera flies deep forward through the digital cosmos over 2,200 units as user scrolls!
      const flightZ = 500 - currentScroll * 2200
      const flightY = 130 + Math.sin(currentScroll * Math.PI * 2.5) * 85 - mouseY * 0.5
      const flightX = Math.sin(currentScroll * Math.PI * 3) * 110 + mouseX

      camera.position.set(flightX, flightY, flightZ)

      // Cinematic camera roll (banking into turns)
      const rollAngle = Math.sin(currentScroll * Math.PI * 3.5) * 0.08 + (targetMouseX * 0.0003)
      camera.rotation.z = rollAngle

      // Camera look-ahead point down the runway
      const lookAheadZ = flightZ - 500
      const lookAheadY = flightY * 0.3
      const lookAheadX = flightX * 0.4
      camera.lookAt(lookAheadX, lookAheadY, lookAheadZ)

      // ─── ANIMATE CYBER RUNWAY ELEVATION WAVES ───
      const posArray = gridGeometry.attributes.position.array
      let pPointer = 0
      for (let c = 0; c < gridCols; c++) {
        for (let r = 0; r < gridRows; r++) {
          const x = posArray[pPointer]
          const z = posArray[pPointer + 2]

          // Kinetic terrain waves reacting to time and scroll progress
          const waveHeight =
            Math.sin(c * 0.2 + clock + currentScroll * 8) * 14 +
            Math.cos(r * 0.15 - clock * 0.8 + currentScroll * 6) * 12

          posArray[pPointer + 1] = -120 + waveHeight
          pPointer += 3
        }
      }
      gridGeometry.attributes.position.needsUpdate = true

      // ─── ROTATE WARP GATES & PULSE ILLUMINATION ───
      gates.forEach((gate, gIdx) => {
        gate.ring.rotation.z += gate.rotSpeed
        gate.hex.rotation.z -= gate.rotSpeed * 0.5

        // Dynamic scale pulse as camera approaches
        const distToCamera = Math.abs(camera.position.z - gate.baseZ)
        if (distToCamera < 300) {
          const proximity = 1 - distToCamera / 300
          gate.ring.material.opacity = 0.35 + proximity * 0.45
        } else {
          gate.ring.material.opacity = 0.35
        }
      })

      // ─── STRETCH PARTICLES ON HIGH-SPEED SCROLL (WARP DRIVE EFFECT) ───
      const streakPos = streakGeometry.attributes.position.array
      const speedMultiplier = 1 + scrollVelocity * 0.12

      streakMaterial.size = 5 + Math.min(15, scrollVelocity * 0.4)

      for (let s = 0; s < streakCount; s++) {
        const sIdx = s * 3
        // Drift forward or backward based on scroll direction
        streakPos[sIdx + 2] += streakSpeeds[s] * speedMultiplier

        // Loop streaks infinitely
        if (streakPos[sIdx + 2] > camera.position.z + 200) {
          streakPos[sIdx + 2] = camera.position.z - 2400
        } else if (streakPos[sIdx + 2] < camera.position.z - 2600) {
          streakPos[sIdx + 2] = camera.position.z + 100
        }
      }
      streakGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    // Visibility management
    const onVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true
        cancelAnimationFrame(animationFrameId)
      } else {
        if (!prefersReducedMotion) {
          isPaused = false
          animate()
        }
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    if (prefersReducedMotion) {
      renderer.render(scene, camera)
    } else {
      animate()
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)

      gridGeometry.dispose()
      gridMaterial.dispose()
      streakGeometry.dispose()
      streakMaterial.dispose()
      glowTexture.dispose()
      renderer.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  )
}
