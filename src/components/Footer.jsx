import { motion } from 'framer-motion'
import { Linkedin, Github, ArrowUp, Code, FileDown } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

export default function Footer() {
  const toTop = () => {
    cyberAudio.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-[#C0C0C0]/15 bg-[#17191D] py-16 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#C0C0C0]/10">
          
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#FFD600] flex items-center justify-center text-[#17191D] font-bold text-xs tracking-tighter shadow-sm">
              H
            </div>

            <div>
              <span className="font-display font-bold text-base text-white tracking-tight block">
                Mohammed Hapiz
              </span>
              <span className="text-xs text-silver-400 font-sans tracking-normal">
                Developer · AI Specialist · Creative Technologist
              </span>
            </div>
          </div>

          {/* Editorial Nav */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-silver-400 font-medium tracking-wide">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault()
                  cyberAudio.playHover()
                  document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="hover:text-white transition-colors cursor-pointer"
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
              className="text-[#FFD600] hover:text-[#FFE45C] transition-colors flex items-center gap-1 font-semibold"
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
            className="w-10 h-10 rounded-full bg-[#2B2E34] border border-[#C0C0C0]/20 hover:border-[#FFD600] hover:text-[#FFD600] flex items-center justify-center text-silver-300 transition-all cursor-pointer shadow-sm"
            aria-label="Scroll to top of page"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver-400">
          <p className="font-normal text-xs text-silver-400">
            © {new Date().getFullYear()} Mohammed Hapiz. Built with precision, React 18, Three.js &amp; Tailwind CSS.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/mohammad-hapiz-4a692429a/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => cyberAudio.playHover()}
              className="w-9 h-9 rounded-full bg-[#2B2E34] border border-[#C0C0C0]/20 hover:border-[#FFD600] hover:text-[#FFD600] flex items-center justify-center text-silver-300 transition-all shadow-sm"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin size={14} />
            </a>

            <a
              href="https://github.com/hhafil876-eng"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => cyberAudio.playHover()}
              className="w-9 h-9 rounded-full bg-[#2B2E34] border border-[#C0C0C0]/20 hover:border-[#FFD600] hover:text-[#FFD600] flex items-center justify-center text-silver-300 transition-all shadow-sm"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github size={14} />
            </a>

            <a
              href="https://leetcode.com/u/hafiz876"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => cyberAudio.playHover()}
              className="w-9 h-9 rounded-full bg-[#2B2E34] border border-[#C0C0C0]/20 hover:border-[#FFD600] hover:text-[#FFD600] flex items-center justify-center text-silver-300 transition-all shadow-sm"
              aria-label="LeetCode Profile"
              title="LeetCode Profile"
            >
              <Code size={14} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
