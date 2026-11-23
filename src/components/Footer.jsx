import { motion } from 'framer-motion'
import { Linkedin, Github, ArrowUp, Code, FileDown } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

export default function Footer() {
  const toTop = () => {
    cyberAudio.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sections = ['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact']

  return (
    <footer className="footer-closing" role="contentinfo">
      {/* Dramatic typographic closing statement */}
      <div className="footer-statement" aria-hidden="true">
        <span className="footer-statement-text">
          Mohammed Hapiz
        </span>
        <span className="footer-statement-year">{new Date().getFullYear()}</span>
      </div>

      {/* Horizontal separator with fissure accent */}
      <div className="footer-sep" aria-hidden="true">
        <div className="footer-sep-line" />
        <div className="footer-sep-crack" />
        <div className="footer-sep-line" />
      </div>

      <div className="footer-inner">
        {/* Left: identity */}
        <div className="footer-identity">
          <div className="footer-monogram" aria-hidden="true">H</div>
          <div>
            <span className="footer-name">Mohammed Hapiz</span>
            <span className="footer-roles">Developer · AI Specialist · Creative Technologist</span>
          </div>
        </div>

        {/* Center: nav */}
        <nav className="footer-nav" aria-label="Footer Navigation">
          {sections.map(s => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              onClick={e => {
                e.preventDefault()
                cyberAudio.playHover()
                document.querySelector(`#${s.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="footer-nav-link"
            >
              {s}
            </a>
          ))}
          <a
            href="/assets/mohammed-hapiz-resume.pdf"
            download="Mohammed_Hapiz_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cyberAudio.playClick()}
            className="footer-nav-link footer-nav-resume"
          >
            Resume <FileDown size={11} aria-hidden="true" />
          </a>
        </nav>

        {/* Right: socials + scroll-to-top */}
        <div className="footer-actions">
          <div className="footer-socials">
            {[
              { href: 'https://www.linkedin.com/in/mohammad-hapiz-4a692429a/', label: 'LinkedIn', Icon: Linkedin },
              { href: 'https://github.com/hhafil876-eng', label: 'GitHub', Icon: Github },
              { href: 'https://leetcode.com/u/hafiz876', label: 'LeetCode', Icon: Code },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => cyberAudio.playHover()}
                className="footer-social-link"
                aria-label={`${label} Profile`}
                title={label}
              >
                <Icon size={14} aria-hidden="true" />
              </a>
            ))}
          </div>

          <motion.button
            onClick={toTop}
            onMouseEnter={() => cyberAudio.playHover()}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="footer-top-btn"
            aria-label="Scroll to top"
            title="Back to top"
          >
            <ArrowUp size={14} aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      {/* Legal baseline */}
      <p className="footer-legal">
        Built with React 18, Vite, Tailwind CSS &amp; Framer Motion.
        Hand-crafted in Karnataka, India.
      </p>
    </footer>
  )
}
