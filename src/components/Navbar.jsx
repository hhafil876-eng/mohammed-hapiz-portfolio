import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, ArrowUpRight, FileDown } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Competencies', href: '#skills' },
  { label: 'Selected Works', href: '#projects' },
  { label: 'Trajectory', href: '#experience' },
  { label: 'Credentials', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
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
      setHidden(y > lastY.current && y > 200)
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
      {/* ─── METALLIC & ELECTRIC YELLOW SCROLL PROGRESS ─── */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#FFD600] via-[#FFE45C] to-[#C0C0C0] origin-left z-50 pointer-events-none shadow-[0_0_10px_rgba(255,214,0,0.5)]"
      />

      <motion.header
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-5 pointer-events-none"
      >
        <nav
          className={`max-w-6xl mx-auto rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all duration-400 ${
            scrolled
              ? 'bg-[#2B2E34]/85 backdrop-blur-2xl border border-[#C0C0C0]/20 shadow-[0_16px_40px_rgba(15,16,19,0.85)]'
              : 'bg-[#2B2E34]/40 backdrop-blur-lg border border-[#C0C0C0]/15'
          }`}
          aria-label="Main Navigation"
        >
          {/* Monogram Brand */}
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
            <div className="w-7 h-7 rounded-full bg-[#FFD600] flex items-center justify-center text-[#17191D] font-bold text-xs tracking-tighter shadow-[0_0_10px_rgba(255,214,0,0.4)]">
              H
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-semibold text-sm tracking-tight text-white group-hover:text-[#FFE45C] transition-colors">
                Hapiz
              </span>
              <span className="text-[#FFD600] font-bold">.</span>
              <span className="text-[11px] text-silver-400 tracking-wide hidden sm:inline">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
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
                    className={`relative px-4 py-1.5 text-xs tracking-wide rounded-full transition-all ${
                      isActive ? 'text-[#FFD600] font-medium' : 'text-silver-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                        className="absolute inset-0 bg-[#FFD600]/12 border border-[#FFD600]/35 rounded-full shadow-[0_0_12px_rgba(255,214,0,0.2)]"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#17191D]/70 border border-[#C0C0C0]/20 hover:border-[#FFD600] hover:text-white text-silver-300 text-xs transition-all cursor-pointer font-medium shadow-sm group"
              title="Download Resume PDF"
            >
              <span>CV</span>
              <FileDown size={13} className="text-[#FFD600] group-hover:scale-110 transition-transform" />
            </a>

            {/* Inquire CTA */}
            <button
              onClick={() => goto('#contact')}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD600] hover:bg-[#FFE45C] text-[#17191D] font-semibold text-xs tracking-wide transition-all cursor-pointer shadow-[0_2px_15px_rgba(255,214,0,0.25)] hover:shadow-[0_2px_20px_rgba(255,214,0,0.4)]"
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
              className="lg:hidden p-2 text-silver-300 hover:text-white rounded-full bg-[#2B2E34] border border-[#C0C0C0]/20"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mt-3 max-w-6xl mx-auto rounded-3xl bg-[#2B2E34]/98 border border-[#C0C0C0]/25 backdrop-blur-2xl p-6 pointer-events-auto shadow-[0_20px_50px_rgba(15,16,19,0.95)]"
            >
              <ul className="space-y-1 mb-4">
                {NAV_LINKS.map(({ label, href }) => {
                  const id = href.slice(1)
                  const isActive = active === id
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault()
                          goto(href)
                        }}
                        className={`block px-4 py-3 rounded-2xl text-sm font-medium tracking-wide transition-colors ${
                          isActive
                            ? 'bg-[#FFD600]/15 text-[#FFD600] border border-[#FFD600]/30'
                            : 'text-silver-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        {label}
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
                  className="w-full py-3 rounded-xl bg-[#FFD600] text-[#17191D] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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
