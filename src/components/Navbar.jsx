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
      setScrolled(y > 40)
      setHidden(y > lastY.current && y > 180)
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
      { threshold: 0.3 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => sections.forEach((s) => obs.unobserve(s))
  }, [])

  const goto = (href) => {
    cyberAudio.playClick()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Lime Accent Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-lime-400 via-emerald-400 to-ui-cyan origin-left z-50 pointer-events-none shadow-[0_0_10px_#a3e635]"
      />

      <motion.header
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-5 sm:px-8 py-5 pointer-events-none"
      >
        <nav
          className={`max-w-6xl mx-auto rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto transition-all duration-500 ${
            scrolled
              ? 'bg-obsidian-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
              : 'bg-white/[0.02] backdrop-blur-lg border border-white/[0.08]'
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
            aria-label="Return to top"
          >
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs tracking-tighter shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              H
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm tracking-tight text-white group-hover:text-lime-300 transition-colors">
                Hapiz
              </span>
              <span className="text-lime-400 font-bold">.</span>
              <span className="text-[11px] text-gray-400 tracking-wide hidden sm:inline">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
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
                      isActive ? 'text-lime-400 font-medium' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                        className="absolute inset-0 bg-lime-400/10 border border-lime-400/40 rounded-full shadow-[0_0_12px_rgba(163,230,53,0.2)]"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-lime-400/40 hover:text-lime-300 text-gray-300 text-xs transition-all cursor-pointer font-medium"
              title="Download Resume PDF"
            >
              <span>CV</span>
              <FileDown size={13} className="text-lime-400" />
            </a>

            {/* Inquire CTA */}
            <button
              onClick={() => goto('#contact')}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-lime-300 text-black font-semibold text-xs tracking-wide transition-all cursor-pointer shadow-[0_2px_15px_rgba(163,230,53,0.3)] hover:shadow-[0_2px_20px_rgba(163,230,53,0.5)]"
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
              className="md:hidden p-2 text-gray-300 hover:text-white rounded-full bg-white/[0.04] border border-white/10"
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
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-3 max-w-6xl mx-auto rounded-3xl bg-obsidian-900/95 border border-white/15 backdrop-blur-2xl p-6 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
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
                        className={`block px-4 py-3 rounded-2xl text-sm font-medium tracking-wide ${
                          isActive
                            ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                        }`}
                      >
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
                <a
                  href="/assets/mohammed-hapiz-resume.pdf"
                  download="Mohammed_Hapiz_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="w-full py-3 rounded-xl bg-lime-400/10 border border-lime-400/30 text-lime-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <FileDown size={14} className="text-lime-400" />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  onClick={() => goto('#contact')}
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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
