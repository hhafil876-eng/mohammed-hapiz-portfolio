import { motion } from 'framer-motion'
import { Linkedin, Github, ArrowUp, Code, FileDown } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

export default function Footer() {
  const toTop = () => {
    cyberAudio.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-obsidian-950 py-16 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.08]">
          
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs tracking-tighter">
              H
            </div>

            <div>
              <span className="font-display font-bold text-base text-white tracking-tight block">
                Mohammed Hapiz
              </span>
              <span className="text-xs text-gray-400 font-sans tracking-normal">
                Developer · AI Specialist · Creative Technologist
              </span>
            </div>
          </div>

          {/* Editorial Nav */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-medium tracking-wide">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault()
                  cyberAudio.playHover()
                  document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="/assets/mohammed-hapiz-resume.pdf"
              download="Mohammed_Hapiz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1"
            >
              <span>Resume PDF</span>
              <FileDown size={12} />
            </a>
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={toTop}
            onMouseEnter={() => cyberAudio.playHover()}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 hover:border-lime-400/40 hover:text-lime-300 flex items-center justify-center text-gray-300 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="font-normal text-xs text-gray-400">
            © {new Date().getFullYear()} Mohammed Hapiz. Built with precision, React 18 &amp; Three.js.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/mohammad-hapiz-4a692429a/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => cyberAudio.playHover()}
              className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/10 hover:border-lime-400/40 hover:text-lime-300 flex items-center justify-center text-gray-300 transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={14} />
            </a>

            <a
              href="https://github.com/hhafil876-eng"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => cyberAudio.playHover()}
              className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/10 hover:border-lime-400/40 hover:text-lime-300 flex items-center justify-center text-gray-300 transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={14} />
            </a>

            <a
              href="https://leetcode.com/u/hafiz876"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => cyberAudio.playHover()}
              className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/10 hover:border-lime-400/40 hover:text-lime-300 flex items-center justify-center text-gray-300 transition-all"
              aria-label="LeetCode Profile"
            >
              <Code size={14} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
