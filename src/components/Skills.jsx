import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Brain, Camera, Cpu, Search, Database, Sparkles } from 'lucide-react'
import TiltCard from './TiltCard'
import { cyberAudio } from '../utils/audio'

const DOMAINS = [
  {
    icon: Code2,
    code: '01',
    category: 'Full-Stack & Web Architecture',
    desc: 'Reactive user interfaces, server runtimes, and RESTful API architecture.',
    skills: [
      { name: 'React.js', level: 'Proficient' },
      { name: 'JavaScript (ES6+)', level: 'Proficient' },
      { name: 'Node.js', level: 'Proficient' },
      { name: 'Express.js', level: 'Proficient' },
      { name: 'Java (OOP)', level: 'Strong' },
      { name: 'Tailwind CSS', level: 'Proficient' },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
      { name: 'Vite', level: 'Proficient' },
    ],
  },
  {
    icon: Database,
    code: '02',
    category: 'Computer Science & Data Stores',
    desc: 'Data structure foundations, algorithmic complexity, relational & document stores.',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'Core' },
      { name: 'MongoDB', level: 'Proficient' },
      { name: 'SQL', level: 'Core' },
      { name: 'DBMS Principles', level: 'Core' },
      { name: 'Computer Networks', level: 'Core' },
      { name: 'REST APIs', level: 'Proficient' },
      { name: 'C Language', level: 'Core' },
      { name: 'Python Basics', level: 'Working' },
    ],
  },
  {
    icon: Brain,
    code: '03',
    category: 'Artificial Intelligence & Agents',
    desc: 'Generative model integration, contextual prompt engineering, and agentic workflows.',
    skills: [
      { name: 'Generative AI', level: 'Advanced' },
      { name: 'Prompt Engineering', level: 'Advanced' },
      { name: 'OpenAI API Pipelines', level: 'Advanced' },
      { name: 'AI Product Prototyping', level: 'Proficient' },
      { name: 'Context Engineering', level: 'Advanced' },
      { name: 'AI-Assisted Dev', level: 'Advanced' },
      { name: 'LLM Orchestration', level: 'Working' },
    ],
  },
  {
    icon: Camera,
    code: '04',
    category: 'Creative Media & Direction',
    desc: 'Cinematic video post-production, visual identity design, and narrative storytelling.',
    skills: [
      { name: 'Cinematic Video Editing', level: 'Advanced' },
      { name: 'Videography', level: 'Advanced' },
      { name: 'Photography', level: 'Advanced' },
      { name: 'Brand & Logo Design', level: 'Award-Winning' },
      { name: 'Color Grading', level: 'Advanced' },
      { name: 'Digital Content Creation', level: 'Advanced' },
      { name: 'CapCut & Alight Motion', level: 'Advanced' },
    ],
  },
  {
    icon: Cpu,
    code: '05',
    category: 'Development Ecosystem & Tools',
    desc: 'Modern developer toolchains, version control, canvas game engines, and hosting.',
    skills: [
      { name: 'Git & GitHub', level: 'Proficient' },
      { name: 'Visual Studio Code', level: 'Proficient' },
      { name: 'Postman', level: 'Proficient' },
      { name: 'Phaser Game Engine', level: 'Proficient' },
      { name: 'Three.js & WebGL', level: 'Working' },
      { name: 'Cloud Hosting (Vercel)', level: 'Proficient' },
    ],
  },
]

export default function Skills() {
  const [query, setQuery] = useState('')

  const filteredDomains = DOMAINS.map((domain) => {
    if (!query.trim()) return domain
    const filteredSkills = domain.skills.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    )
    return { ...domain, skills: filteredSkills }
  }).filter((d) => d.skills.length > 0)

  return (
    <div className="section-padding relative px-6 sm:px-12 overflow-hidden">
      {/* Subtle Constellation Geometric Network in Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="15%" y1="20%" x2="45%" y2="40%" stroke="#FFD600" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="45%" y1="40%" x2="80%" y2="25%" stroke="#C0C0C0" strokeWidth="1" />
        <line x1="45%" y1="40%" x2="50%" y2="85%" stroke="#FFD600" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="15%" y1="75%" x2="50%" y2="85%" stroke="#C0C0C0" strokeWidth="1" />
        <line x1="50%" y1="85%" x2="85%" y2="70%" stroke="#FFD600" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="15%" cy="20%" r="3" fill="#FFD600" />
        <circle cx="45%" cy="40%" r="4" fill="#FFE45C" />
        <circle cx="80%" cy="25%" r="3" fill="#C0C0C0" />
        <circle cx="50%" cy="85%" r="4" fill="#FFD600" />
        <circle cx="85%" cy="70%" r="3" fill="#C0C0C0" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header — The Constellation Engine */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#FFD600] shadow-[0_0_8px_rgba(255,214,0,0.5)]" />
              <span className="text-[11px] font-medium tracking-[0.22em] text-[#FFD600] uppercase font-mono">
                System 02 // The Constellation Engine
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
              Engineering &amp; <span className="yellow-text-gradient">Capabilities</span>
            </h2>
          </div>

          {/* Search Box — Frequency Scanner */}
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFD600]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Scan frequencies (React, Java, AI)..."
              aria-label="Filter skills by keyword"
              className="w-full bg-[#101114]/90 border border-[#C0C0C0]/20 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-silver-500 focus:outline-none focus:border-[#FFD600] transition-all font-mono shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>

        {/* Competencies Constellation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredDomains.map((dom, idx) => {
            const Icon = dom.icon
            return (
              <motion.div
                key={dom.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <TiltCard
                  maxTilt={5}
                  scale={1.015}
                  className="p-7 sm:p-8 h-full flex flex-col justify-between group hover:border-[#FFD600]/40 relative overflow-hidden"
                >
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#FFD600]/30 rounded-tr-lg pointer-events-none" />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-[#090A0C] border border-[#C0C0C0]/20 flex items-center justify-center text-[#FFD600] group-hover:border-[#FFD600]/50 group-hover:shadow-[0_0_12px_rgba(255,214,0,0.2)] transition-all shadow-sm">
                        <Icon size={18} />
                      </div>
                      <span className="text-xs font-mono text-silver-500 group-hover:text-[#FFD600] transition-colors">
                        // NEXUS {dom.code}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FFE45C] transition-colors leading-snug mb-2">
                      {dom.category}
                    </h3>

                    <p className="text-xs text-silver-300 leading-relaxed font-normal mb-6">
                      {dom.desc}
                    </p>
                  </div>

                  {/* Skills Cloud */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[#C0C0C0]/10">
                    {dom.skills.map((s, index) => (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: index * .035 }}
                        key={s.name}
                        onMouseEnter={() => cyberAudio.playHover()}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#090A0C]/80 border border-[#C0C0C0]/15 text-xs text-silver-200 hover:border-[#FFD600]/40 hover:text-white transition-all select-none group/tag"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#FFD600] group-hover/tag:shadow-[0_0_6px_#FFD600]" />
                        <span>{s.name}</span>
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
