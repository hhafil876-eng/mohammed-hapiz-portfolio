import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import * as THREE from 'three'

// ─── SAFE WEBGL COMPATIBILITY DETECTOR ───
function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  // Explicit testing flag to simulate WebGL-disabled browser environments
  if (
    window.location.search.includes('no-webgl') ||
    window.location.search.includes('disable-webgl') ||
    window.location.search.includes('webgl=0')
  ) {
    return false
  }
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    return Boolean(window.WebGLRenderingContext && gl)
  } catch (e) {
    return false
  }
}

// ─── LUXURY SVG/CSS GYROSCOPE FALLBACK (Zero WebGL Required) ───
function FallbackGyro({ mouseX, mouseY }) {
  const springConfig = { damping: 25, stiffness: 120 }
  const rotX = useSpring(useTransform(mouseY || { get: () => 0 }, [-0.5, 0.5], [12, -12]), springConfig)
  const rotY = useSpring(useTransform(mouseX || { get: () => 0 }, [-0.5, 0.5], [-12, 12]), springConfig)

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[800px] overflow-hidden select-none">
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY }}
        className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center"
      >
        {/* Soft Ambient Core Glow */}
        <div className="absolute w-44 h-44 rounded-full bg-lime-400/15 blur-2xl animate-pulse" />

        {/* Ring 1: Outer Platinum Ring (CSS 3D Rotating) */}
        <div
          className="absolute inset-2 sm:inset-4 rounded-full border border-slate-200/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          style={{
            animation: 'spin 22s linear infinite',
            transform: 'rotateX(65deg) rotateY(20deg)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>

        {/* Ring 2: Middle Sapphire Ring (Counter-rotating) */}
        <div
          className="absolute inset-8 sm:inset-10 rounded-full border border-sky-400/35 border-dashed shadow-[0_0_15px_rgba(56,189,248,0.2)]"
          style={{
            animation: 'spin-reverse 16s linear infinite',
            transform: 'rotateY(60deg) rotateX(25deg)',
          }}
        >
          <div className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
        </div>

        {/* Ring 3: Inner High-Tech Electric Lime Ring */}
        <div
          className="absolute inset-16 sm:inset-18 rounded-full border border-lime-400/50 shadow-[0_0_20px_rgba(163,230,53,0.3)]"
          style={{
            animation: 'spin 11s linear infinite',
            transform: 'rotateX(45deg) rotateZ(35deg)',
          }}
        >
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-lime-300 shadow-[0_0_8px_#a3e635]" />
        </div>

        {/* Geometric Quantum Core (SVG Diamond / Icosahedron) */}
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center animate-bounce-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full text-lime-400 filter drop-shadow-[0_0_12px_rgba(163,230,53,0.6)]">
            <polygon
              points="50,5 90,30 90,70 50,95 10,70 10,30"
              fill="rgba(163, 230, 53, 0.08)"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <polygon
              points="50,20 80,50 50,80 20,50"
              fill="rgba(56, 189, 248, 0.08)"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <circle cx="50" cy="50" r="4" fill="#ffffff" className="animate-ping" />
            <circle cx="50" cy="50" r="3" fill="#a3e635" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero3DGyro({ mouseX, mouseY }) {
  const mountRef = useRef(null)
  const [hasWebGL, setHasWebGL] = useState(() => isWebGLAvailable())

  useEffect(() => {
    if (!hasWebGL) return

    const mount = mountRef.current
    if (!mount) return

    let animationId
    let isPaused = false
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    const width = mount.clientWidth || 450
    const height = mount.clientHeight || 450

    let renderer = null
    let scene = null
    let camera = null
    let ro = null

    // Disposables
    let ring1Geo, ring1Mat, ring2Geo, ring2Mat, ring3Geo, ring3Mat, icoGeo, icoMat, nodeGeo, nodeMat

    try {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      camera.position.z = 24

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      })

      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))

      // WebGL Context Loss Safeguard
      renderer.domElement.addEventListener('webglcontextlost', (e) => {
        e.preventDefault()
        console.warn('WebGL Context Lost: Gracefully switching to luxury fallback.')
        setHasWebGL(false)
      })

      mount.appendChild(renderer.domElement)

      // ─── LUXURY MECHANICAL GYRO RINGS (Platinum, Ice Sapphire & Lime Green) ───
      const group = new THREE.Group()
      scene.add(group)

      // Ring 1: Outer Platinum Ring
      ring1Geo = new THREE.TorusGeometry(8.6, 0.025, 16, 120)
      ring1Mat = new THREE.MeshBasicMaterial({
        color: 0xf8fafc,
        transparent: true,
        opacity: 0.35,
        wireframe: true,
      })
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
      group.add(ring1)

      // Ring 2: Middle Ice Sapphire Ring
      ring2Geo = new THREE.TorusGeometry(6.9, 0.02, 16, 100)
      ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.28,
        wireframe: true,
      })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      group.add(ring2)

      // Ring 3: Inner High-Tech Ring (Electric Lime Green)
      ring3Geo = new THREE.TorusGeometry(5.2, 0.022, 16, 80)
      ring3Mat = new THREE.MeshBasicMaterial({
        color: 0xa3e635,
        transparent: true,
        opacity: 0.55,
        wireframe: true,
      })
      const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
      group.add(ring3)

      // Central Floating Quantum Core
      icoGeo = new THREE.IcosahedronGeometry(1.6, 1)
      icoMat = new THREE.MeshBasicMaterial({
        color: 0xa3e635,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      })
      const core = new THREE.Mesh(icoGeo, icoMat)
      group.add(core)

      // Orbiting Satellite Nodes
      const nodeCount = 5
      nodeGeo = new THREE.SphereGeometry(0.12, 12, 12)
      nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
      const nodes = []

      for (let k = 0; k < nodeCount; k++) {
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat)
        scene.add(nodeMesh)
        nodes.push({
          mesh: nodeMesh,
          radius: 6.9,
          speed: 0.009 * (k % 2 === 0 ? 1 : -1),
          angle: (k / nodeCount) * Math.PI * 2,
          inclination: k * 0.4,
        })
      }

      // Dynamic Size Observer
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width
          const h = entry.contentRect.height
          if (w > 0 && h > 0 && camera && renderer) {
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
          }
        }
      })
      ro.observe(mount)

      // ─── ANIMATION LOOP ───
      let angle = 0
      const animate = () => {
        if (isPaused || !renderer) return
        animationId = requestAnimationFrame(animate)

        angle += 0.006

        ring1.rotation.x = angle * 0.8
        ring1.rotation.y = angle * 0.5

        ring2.rotation.y = -angle * 0.9
        ring2.rotation.z = angle * 0.4

        ring3.rotation.z = angle * 1.1
        ring3.rotation.x = -angle * 0.6

        core.rotation.x += 0.012
        core.rotation.y += 0.015

        const mx = mouseX ? mouseX.get() : 0
        const my = mouseY ? mouseY.get() : 0
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mx * 0.35, 0.05)
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -my * 0.35, 0.05)

        nodes.forEach((n) => {
          n.angle += n.speed
          const x = Math.cos(n.angle) * n.radius
          const y = Math.sin(n.angle) * Math.sin(n.inclination) * n.radius
          const z = Math.sin(n.angle) * Math.cos(n.inclination) * n.radius
          n.mesh.position.set(x, y, z)
        })

        renderer.render(scene, camera)
      }

      const onVisibilityChange = () => {
        if (document.hidden) {
          isPaused = true
          cancelAnimationFrame(animationId)
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
        cancelAnimationFrame(animationId)
        document.removeEventListener('visibilitychange', onVisibilityChange)
        if (ro) ro.disconnect()
        if (ring1Geo) ring1Geo.dispose()
        if (ring1Mat) ring1Mat.dispose()
        if (ring2Geo) ring2Geo.dispose()
        if (ring2Mat) ring2Mat.dispose()
        if (ring3Geo) ring3Geo.dispose()
        if (ring3Mat) ring3Mat.dispose()
        if (icoGeo) icoGeo.dispose()
        if (icoMat) icoMat.dispose()
        if (nodeGeo) nodeGeo.dispose()
        if (nodeMat) nodeMat.dispose()
        if (renderer) {
          renderer.dispose()
          if (renderer.domElement && mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement)
          }
        }
      }
    } catch (err) {
      console.warn('WebGL initialization caught exception, activating fallback:', err)
      setHasWebGL(false)
      if (renderer?.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [mouseX, mouseY, hasWebGL])

  if (!hasWebGL) {
    return <FallbackGyro mouseX={mouseX} mouseY={mouseY} />
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  )
}
