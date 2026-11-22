import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, ArrowUpRight, FileDown, Compass } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about', code: '01' },
  { label: 'Competencies', href: '#skills', id: 'skills', code: '02' },
  { label: 'Selected Works', href: '#projects', id: 'projects', code: '03' },
  { label: 'Trajectory', href: '#experience', id: 'experience', code: '04' },
  { label: 'Credentials', href: '#achievements', id: 'achievements', code: '05' },
  { label: 'Contact', href: '#contact', id: 'contact', code: '06' },
]

const progressClass = 'fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B99A00] via-[#FFD600] to-[#E5E7EB] origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(255,214,0,0.6)]'

function LegacyPageProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div aria-hidden="true" className={progressClass} style={{ scaleX: scrollYProgress }} />
}

function PageProgress() {
  if (!globalThis.CSS?.supports('animation-timeline: scroll(root block)')) return <LegacyPageProgress />
  return <div aria-hidden="true" className={progressClass + ' page-scroll-progress'} />
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('home')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      setHidden(y > lastY.current && y > 220)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.25 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => sections.forEach((s) => obs.unobserve(s))
  }, [])

  const goto = (href) => {
    cyberAudio.playClick()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'auto' })
    }
  }

  return (
    <>
      {/* ─── CELESTIAL ENERGY SCROLL PROGRESS ─── */}
      <PageProgress />

      <motion.header
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-5 pointer-events-none"
      >
        <nav
          className={`max-w-6xl mx-auto rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all duration-400 relative ${
            scrolled
              ? 'bg-[#101114]/90 backdrop-blur-2xl border border-[#C0C0C0]/20 shadow-[0_18px_50px_rgba(0,0,0,0.92)]'
              : 'bg-[#101114]/45 backdrop-blur-lg border border-[#C0C0C0]/15'
          }`}
          aria-label="Main Navigation"
        >
          {/* Subtle Celestial Ring Edge Accent */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#FFD600]/25 to-transparent pointer-events-none" />

          {/* Celestial Monogram Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              goto('#home')
            }}
            onMouseEnter={() => cyberAudio.playHover()}
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Return to top of page"
          >
            <div className="relative w-7 h-7 rounded-full bg-[#FFD600] flex items-center justify-center text-[#090A0C] font-bold text-xs tracking-tighter shadow-[0_0_12px_rgba(255,214,0,0.45)] group-hover:scale-105 transition-transform">
              <span className="relative z-10">H</span>
              <div className="absolute -inset-1 rounded-full border border-[#FFD600]/30 animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-semibold text-sm tracking-tight text-white group-hover:text-[#FFE45C] transition-colors">
                Hapiz
              </span>
              <span className="text-[#FFD600] font-bold">.</span>
              <span className="text-[10px] font-mono text-silver-500 tracking-wider hidden sm:inline uppercase">
                Obsidian
              </span>
            </div>
          </a>

          {/* Desktop Celestial Links */}
          <ul className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href, id, code }) => {
              const isActive = active === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault()
                      goto(href)
                    }}
                    onMouseEnter={() => cyberAudio.playHover()}
                    className={`relative px-4 py-1.5 text-xs tracking-wider rounded-full transition-all uppercase font-medium ${
                      isActive ? 'text-[#FFD600]' : 'text-silver-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                        className="absolute inset-0 bg-[#FFD600]/12 border border-[#FFD600]/40 rounded-full shadow-[0_0_14px_rgba(255,214,0,0.25)]"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-silver-600 opacity-60">{code}</span>
                      <span>{label}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Resume Download Pill */}
            <a
              href="/assets/mohammed-hapiz-resume.pdf"
              download="Mohammed_Hapiz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#17191D]/80 border border-[#C0C0C0]/20 hover:border-[#FFD600] hover:text-white text-silver-300 text-xs transition-all cursor-pointer font-medium shadow-sm group"
              title="Download Resume PDF"
            >
              <span>CV</span>
              <FileDown size={13} className="text-[#FFD600] group-hover:scale-110 transition-transform" />
            </a>

            {/* Inquire CTA */}
            <button
              onClick={() => goto('#contact')}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD600] hover:bg-[#FFE45C] text-[#090A0C] font-semibold text-xs tracking-wide transition-all cursor-pointer shadow-[0_2px_15px_rgba(255,214,0,0.3)] hover:shadow-[0_2px_22px_rgba(255,214,0,0.45)]"
            >
              <span>Inquire</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                cyberAudio.playClick()
                setOpen(!open)
              }}
              className="xl:hidden p-2 text-silver-300 hover:text-white rounded-full bg-[#17191D] border border-[#C0C0C0]/20"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown — The Obsidian Vault Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden mt-3 max-w-6xl mx-auto rounded-3xl bg-[#101114]/98 border border-[#C0C0C0]/25 backdrop-blur-2xl p-6 pointer-events-auto shadow-[0_24px_60px_rgba(0,0,0,0.98)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD600]/40 to-transparent" />
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C0C0C0]/15 text-[11px] font-mono text-silver-500 uppercase tracking-widest">
                <span>The Celestial Compass</span>
                <Compass size={14} className="text-[#FFD600]" />
              </div>
              <ul className="space-y-1.5 mb-5">
                {NAV_LINKS.map(({ label, href, id, code }) => {
                  const isActive = active === id
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault()
                          goto(href)
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium tracking-wide transition-all ${
                          isActive
                            ? 'bg-[#FFD600]/15 text-[#FFD600] border border-[#FFD600]/30 shadow-[0_0_12px_rgba(255,214,0,0.15)]'
                            : 'text-silver-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <span>{label}</span>
                        <span className="text-xs font-mono text-silver-500">[{code}]</span>
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="pt-4 border-t border-[#C0C0C0]/15 flex flex-col gap-2.5">
                <a
                  href="/assets/mohammed-hapiz-resume.pdf"
                  download="Mohammed_Hapiz_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="w-full py-3 rounded-xl bg-[#17191D] border border-[#C0C0C0]/25 hover:border-[#FFD600] text-silver-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <FileDown size={14} className="text-[#FFD600]" />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  onClick={() => goto('#contact')}
                  className="w-full py-3 rounded-xl bg-[#FFD600] text-[#090A0C] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_2px_15px_rgba(255,214,0,0.3)]"
                >
                  <span>Initiate Inquiry</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
