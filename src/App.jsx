import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import ModernBackground from './components/ModernBackground'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import { cyberAudio } from './utils/audio'

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    cyberAudio.playClick()
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <div className="bg-[#17191D] text-[#E5E7EB] min-h-screen relative selection:bg-[#FFD600]/30 selection:text-white overflow-x-hidden">
      {/* ─── 1. MODERN GRAPHITE & METALLIC ARCHITECTURAL BACKGROUND ─── */}
      <ModernBackground />

      {/* ─── 2. HIGH-PRECISION RETICLE CURSOR (SILVER & ELECTRIC YELLOW) ─── */}
      <CustomCursor />

      {/* ─── 3. FLOATING NAVIGATION DOCK ─── */}
      <Navbar />

      {/* ─── 4. MAIN EXECUTIVE PORTFOLIO FLOW ─── */}
      <ErrorBoundary>
        <main className="relative z-10" id="main-content">
          <section id="home" className="relative" aria-label="Hero Introduction">
            <Hero />
          </section>

          <section id="about" className="relative" aria-label="About Mohammed Hapiz">
            <About />
          </section>

          <section id="skills" className="relative" aria-label="Technical Capabilities">
            <Skills />
          </section>

          <section id="projects" className="relative" aria-label="Featured Engineering Projects">
            <Projects />
          </section>

          <section id="experience" className="relative" aria-label="Experience & Trajectory">
            <Experience />
          </section>

          <section id="achievements" className="relative" aria-label="Key Milestones & Leadership">
            <Achievements />
          </section>

          <section id="contact" className="relative" aria-label="Contact & Collaboration Portal">
            <Contact />
          </section>
        </main>
      </ErrorBoundary>

      {/* ─── 5. FOOTER ─── */}
      <Footer />

      {/* ─── 6. FLOATING SCROLL TO TOP ─── */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            onMouseEnter={() => cyberAudio.playHover()}
            title="Scroll to top of page"
            aria-label="Scroll to top of page"
            className="fixed bottom-8 right-6 z-40 w-11 h-11 rounded-2xl bg-[#2B2E34]/90 border border-[#C0C0C0]/25 hover:border-[#FFD600] text-[#FFD600] hover:text-white shadow-[0_0_20px_rgba(255,214,0,0.25)] flex items-center justify-center transition-all cursor-pointer backdrop-blur-xl group"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
