import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Brain, Camera, Cpu, Search, Database, Layers } from 'lucide-react'
import TiltCard from './TiltCard'
import { cyberAudio } from '../utils/audio'

const DOMAINS = [
  {
    icon: Code2,
    code: '01',
    category: 'Full-Stack & Backend Systems',
    desc: 'Reactive user interfaces, server runtimes, and RESTful API architecture.',
    skills: [
      { name: 'React.js', level: 'Fluent' },
      { name: 'JavaScript (ES6+)', level: 'Fluent' },
      { name: 'Node.js', level: 'Fluent' },
      { name: 'Express.js', level: 'Fluent' },
      { name: 'Java (OOP)', level: 'Strong' },
      { name: 'Tailwind CSS', level: 'Fluent' },
      { name: 'HTML5 & CSS3', level: 'Mastery' },
      { name: 'Vite', level: 'Fluent' },
    ],
  },
  {
    icon: Database,
    code: '02',
    category: 'Core Computer Science & Databases',
    desc: 'Data structure foundations, algorithmic complexity, relational & document stores.',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'Core' },
      { name: 'MongoDB', level: 'Fluent' },
      { name: 'SQL', level: 'Core' },
      { name: 'DBMS Principles', level: 'Core' },
      { name: 'Computer Networks', level: 'Core' },
      { name: 'REST APIs', level: 'Fluent' },
      { name: 'C Language', level: 'Core' },
      { name: 'Python Basics', level: 'Core' },
    ],
  },
  {
    icon: Brain,
    code: '03',
    category: 'Artificial Intelligence & Agents',
    desc: 'Generative model integration, contextual prompt engineering, and agentic pipelines.',
    skills: [
      { name: 'Generative AI', level: 'Advanced' },
      { name: 'Prompt Engineering', level: 'Mastery' },
      { name: 'OpenAI API Pipelines', level: 'Advanced' },
      { name: 'AI Product Prototyping', level: 'Fluent' },
      { name: 'Context Engineering', level: 'Advanced' },
      { name: 'AI-Assisted Dev', level: 'Mastery' },
      { name: 'LLM Orchestration', level: 'Advanced' },
    ],
  },
  {
    icon: Camera,
    code: '04',
    category: 'Creative Media & Direction',
    desc: 'Cinematic video post-production, visual identity design, and narrative storytelling.',
    skills: [
      { name: 'Cinematic Video Editing', level: 'Mastery' },
      { name: 'Videography', level: 'Advanced' },
      { name: 'Photography', level: 'Advanced' },
      { name: 'Brand & Logo Design', level: 'Champion' },
      { name: 'Color Grading', level: 'Advanced' },
      { name: 'Digital Content Creation', level: 'Mastery' },
      { name: 'Digital Marketing', level: 'Fluent' },
    ],
  },
  {
    icon: Cpu,
    code: '05',
    category: 'Development Ecosystem & Toolchains',
    desc: 'Modern developer toolchains, version control, canvas game engines, and suites.',
    skills: [
      { name: 'Git & GitHub', level: 'Mastery' },
      { name: 'Visual Studio Code', level: 'Mastery' },
      { name: 'Postman', level: 'Fluent' },
      { name: 'Phaser Game Engine', level: 'Fluent' },
      { name: 'CapCut & Alight Motion', level: 'Mastery' },
      { name: 'Three.js & WebGL', level: 'Fluent' },
      { name: 'Cloud Deployment (Vercel/Netlify)', level: 'Fluent' },
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
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-lime-400 shadow-[0_0_8px_#a3e635]" />
              <span className="text-[11px] font-medium tracking-[0.2em] text-lime-400 uppercase">
                Technical Competencies
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
              Engineering &amp; <span className="lime-text-gradient">Capabilities</span>
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-lime-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search competencies (e.g. React, Java, AI)..."
              aria-label="Filter skills by keyword"
              className="w-full bg-white/[0.02] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-lime-400/50 transition-all font-sans"
            />
          </div>
        </motion.div>

        {/* Competencies Grid */}
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
                  className="p-7 sm:p-8 h-full flex flex-col justify-between group hover:border-lime-400/30"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-lime-400 group-hover:border-lime-400/40 transition-all">
                        <Icon size={18} />
                      </div>
                      <span className="text-xs font-mono text-gray-500 group-hover:text-lime-400 transition-colors">
                        // {dom.code}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-lime-300 transition-colors leading-snug mb-2">
                      {dom.category}
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed font-normal mb-6">
                      {dom.desc}
                    </p>
                  </div>

                  {/* Skills Cloud */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                    {dom.skills.map((s) => (
                      <span
                        key={s.name}
                        onMouseEnter={() => cyberAudio.playHover()}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.08] text-xs text-gray-200 hover:border-lime-400/40 hover:text-lime-300 transition-all"
                      >
                        <span className="w-1 h-1 rounded-full bg-lime-400" />
                        <span>{s.name}</span>
                      </span>
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
