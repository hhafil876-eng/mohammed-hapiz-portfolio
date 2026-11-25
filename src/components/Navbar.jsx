import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, ArrowUpRight, FileDown } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about', code: '01' },
  { label: 'Skills', href: '#skills', id: 'skills', code: '02' },
  { label: 'Works', href: '#projects', id: 'projects', code: '03' },
  { label: 'Trajectory', href: '#experience', id: 'experience', code: '04' },
  { label: 'Credentials', href: '#achievements', id: 'achievements', code: '05' },
  { label: 'Contact', href: '#contact', id: 'contact', code: '06' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('home')
  const lastY = useRef(0)
  const { scrollYProgress } = useScroll()

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

  useEffect(() => {
    if (!open) return
    const close = e => { if (e.key === 'Escape') { setOpen(false); document.querySelector('[aria-expanded]')?.focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  const goto = (href) => {
    cyberAudio.playClick()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }
  }

  return (
    <>
      {/* Scroll progress trace */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFD600] via-[#C0C0C0] to-transparent origin-left z-50 pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        animate={{ y: hidden && !open ? -90 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 sm:py-4 pointer-events-none"
      >
        <nav
          className={`max-w-6xl mx-auto rounded-lg px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-300 relative ${
            scrolled
              ? 'bg-[#101114]/95 backdrop-blur-2xl border border-[#C0C0C0]/20 shadow-[0_16px_40px_rgba(0,0,0,0.9)]'
              : 'bg-[#101114]/60 backdrop-blur-md border border-[#C0C0C0]/12'
          }`}
          aria-label="Main Navigation"
        >
          {/* Architectural monogram */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              goto('#home')
            }}
            onMouseEnter={() => cyberAudio.playHover()}
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Return to top"
          >
            <div className="w-7 h-7 rounded bg-[#FFD600] flex items-center justify-center text-[#090A0C] font-bold text-xs tracking-tighter shadow-[0_0_10px_rgba(255,214,0,0.4)] group-hover:bg-[#FFE45C] transition-colors">
              H
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[#FFD600] transition-colors">
                Mohammed Hapiz
              </span>
            </div>
          </a>

          {/* Desktop links */}
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
                    className={`relative px-3.5 py-1.5 text-xs tracking-wider rounded font-mono transition-all uppercase ${
                      isActive ? 'text-[#FFD600] font-semibold' : 'text-[#C0C0C0] hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                        className="absolute inset-0 bg-[#FFD600]/10 border border-[#FFD600]/30 rounded"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="text-[9px] opacity-40">{code}</span>
                      <span>{label}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/assets/mohammed-hapiz-resume.pdf"
              download="Mohammed_Hapiz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#17191D] border border-[#C0C0C0]/15 hover:border-[#FFD600] text-[#E5E7EB] text-xs font-mono transition-all cursor-pointer"
              title="Download Resume PDF"
            >
              <span>CV</span>
              <FileDown size={12} className="text-[#FFD600]" />
            </a>

            <button
              onClick={() => goto('#contact')}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded bg-[#FFD600] hover:bg-[#FFE45C] text-[#090A0C] font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-[0_2px_12px_rgba(255,214,0,0.3)]"
            >
              <span>Inquire</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                cyberAudio.playClick()
                setOpen(!open)
              }}
              className="xl:hidden p-2 text-[#E5E7EB] hover:text-white rounded bg-[#17191D] border border-[#C0C0C0]/15"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              id="mobile-navigation"
              className="xl:hidden mt-2 max-w-6xl mx-auto rounded-lg bg-[#101114]/98 border border-[#C0C0C0]/20 backdrop-blur-2xl p-5 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
            >
              <ul className="space-y-1 mb-4">
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
                        className={`flex items-center justify-between px-3 py-2.5 rounded text-xs font-mono tracking-wider uppercase transition-all ${
                          isActive
                            ? 'bg-[#FFD600]/15 text-[#FFD600] border border-[#FFD600]/30'
                            : 'text-[#C0C0C0] hover:text-white hover:bg-white/[0.03]'
                        }`}
                      >
                        <span>{label}</span>
                        <span className="text-[10px] opacity-40">[{code}]</span>
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="pt-3 border-t border-[#C0C0C0]/10 flex flex-col gap-2">
                <a
                  href="/assets/mohammed-hapiz-resume.pdf"
                  download="Mohammed_Hapiz_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="w-full py-2.5 rounded bg-[#17191D] border border-[#C0C0C0]/20 hover:border-[#FFD600] text-[#E5E7EB] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <FileDown size={13} className="text-[#FFD600]" />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  onClick={() => goto('#contact')}
                  className="w-full py-2.5 rounded bg-[#FFD600] text-[#090A0C] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span>Initiate Inquiry</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
