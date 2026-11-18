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
    // Atmospheric graphite fog
    scene.fog = new THREE.FogExp2(0x17191D, 0.0012)

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

    // ─── TEXTURE GENERATOR ───
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.2, 'rgba(240, 240, 240, 0.9)')
      grad.addColorStop(0.5, 'rgba(255, 214, 0, 0.35)') // Electric Yellow
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(32, 32, 32, 0, Math.PI * 2)
      ctx.fill()
      return new THREE.CanvasTexture(canvas)
    }

    const glowTexture = createGlowTexture()

    // ─── 1. RUNWAY GRID ───
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
        const z = (r - gridRows * 0.35) * -gridSpacing
        const y = -120

        gridPositions[pIdx] = x
        gridPositions[pIdx + 1] = y
        gridPositions[pIdx + 2] = z

        // Gradient color: Electric yellow center line fading to silver
        const distFromCenter = Math.abs(x) / (gridCols * gridSpacing * 0.5)
        if (distFromCenter < 0.15) {
          // Highway center line: Electric yellow (#FFD600)
          gridColors[pIdx] = 1.0
          gridColors[pIdx + 1] = 0.84
          gridColors[pIdx + 2] = 0.0
        } else if (distFromCenter < 0.5) {
          gridColors[pIdx] = 0.85
          gridColors[pIdx + 1] = 0.88
          gridColors[pIdx + 2] = 0.92
        } else {
          gridColors[pIdx] = 0.60
          gridColors[pIdx + 1] = 0.62
          gridColors[pIdx + 2] = 0.66
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

    // ─── 2. STREAKS ───
    const streakCount = isMobile ? 300 : 750
    const streakPositions = new Float32Array(streakCount * 3)

    for (let s = 0; s < streakCount; s++) {
      const idx = s * 3
      streakPositions[idx] = (Math.random() - 0.5) * 1600
      streakPositions[idx + 1] = (Math.random() - 0.2) * 900
      streakPositions[idx + 2] = (Math.random() - 0.5) * 2800 - 400
    }

    const streakGeometry = new THREE.BufferGeometry()
    streakGeometry.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3))

    const streakMaterial = new THREE.PointsMaterial({
      size: 5,
      map: glowTexture,
      color: 0xE5E7EB,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const streakParticles = new THREE.Points(streakGeometry, streakMaterial)
    scene.add(streakParticles)

    // ─── 3. CINEMATIC GATES ───
    const gatesGroup = new THREE.Group()
    scene.add(gatesGroup)

    const gateZPositions = [200, -350, -900, -1450, -2000, -2550]
    const gates = []

    gateZPositions.forEach((zPos, gIdx) => {
      const gateRingGeo = new THREE.TorusGeometry(isMobile ? 120 : 160, 0.4, 16, 64)
      const isYellow = gIdx % 2 === 0
      const gateRingMat = new THREE.MeshBasicMaterial({
        color: isYellow ? 0xFFD600 : 0xC0C0C0,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
      const ring = new THREE.Mesh(gateRingGeo, gateRingMat)
      ring.position.set(0, 0, zPos)
      ring.rotation.z = gIdx * 0.4

      const hexGeo = new THREE.CircleGeometry(isMobile ? 140 : 185, 6)
      const hexMat = new THREE.MeshBasicMaterial({
        color: isYellow ? 0xFFD600 : 0xE5E7EB,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
      const hex = new THREE.Mesh(hexGeo, hexMat)
      hex.position.set(0, 0, zPos)

      gatesGroup.add(ring)
      gatesGroup.add(hex)

      gates.push({ ring, hex, rotSpeed: (gIdx % 2 === 0 ? 1 : -1) * 0.004 })
    })

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      if (!prefersReducedMotion) {
        gates.forEach((g) => {
          g.ring.rotation.z += g.rotSpeed
          g.hex.rotation.z -= g.rotSpeed * 0.5
        })
      }
      renderer.render(scene, camera)
    }

    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', onResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
}
