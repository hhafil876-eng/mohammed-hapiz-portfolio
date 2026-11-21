import SignalPath from './SignalPath'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Gamepad2, ShieldAlert, Cpu, Camera, ArrowUpRight, Github, ExternalLink, Code2 } from 'lucide-react'
import TiltCard from './TiltCard'
import ProjectModal from './ProjectModal'
import ProjectVisualPreview from './ProjectVisualPreview'
import { cyberAudio } from '../utils/audio'

export const PROJECTS = [
  {
    num: '01',
    title: 'DecoSpace — AI Interior Studio',
    badge: 'Flagship Platform',
    status: 'Interactive Prototype',
    isPrototype: true,
    type: 'ai',
    category: 'Generative AI · Interior Architecture & Layouts',
    icon: Layers,
    problem: 'Traditional interior design planning requires expensive software, lacking real-time spatial previews and responsive design suggestions based on budget and aesthetic constraints.',
    solution: 'Conceptualized and engineered an interactive interior customization platform featuring dynamic room layout controls, real-time material presets, and prompt-driven generative recommendations.',
    contribution: 'Lead Architect — UI/UX design, interactive layout studio logic, and prompt engineering integration.',
    features: [
      'Interactive Room Layout Studio & Grid',
      'Real-time Material & Aesthetic Presets',
      'Prompt-driven AI Style Recommendations',
      'Client-side Persistence State Engine',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Generative AI', 'Prompt Engineering', 'UI/UX'],
    github: 'https://github.com/hhafil876-eng/portfolio',
    sourceLabel: 'Portfolio Repository',
    demo: 'https://mohammed-hapiz-portfolio.vercel.app/#projects',
    demoLabel: 'Portfolio Showcase',
  },
  {
    num: '02',
    title: 'Personal Portfolio Management System',
    badge: 'Full-Stack System',
    status: 'Cloud Production',
    isPrototype: false,
    type: 'web',
    category: 'Full-Stack Web Development · MERN Architecture',
    icon: Code2,
    problem: 'Engineers require a performant, customizable portfolio system with a secure admin dashboard to manage projects, technical competencies, and incoming inquiries dynamically.',
    solution: 'Engineered a full-stack portfolio platform featuring an authenticated admin dashboard, protected routes, dynamic project/resume upload services, and contact routing.',
    contribution: 'Full-Stack Engineer — End-to-end implementation including RESTful API endpoints, MongoDB models, and reactive frontend UI.',
    features: [
      'Secure Admin Dashboard with Authentication',
      'Dynamic Project & Skill Metadata CRUD',
      'Protected Routes & JWT Authorization',
      'Cloud Deployment with Automated CI/CD',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Cloud Hosting'],
    github: 'https://github.com/hhafil876-eng/portfolio',
    sourceLabel: 'Portfolio Repository',
    demo: 'https://mohammed-hapiz-portfolio.vercel.app/',
  },
  {
    num: '03',
    title: 'BLADEQUEST: Realm of Stars',
    badge: 'Game Engine',
    status: 'Playable Build',
    isPrototype: false,
    type: 'games',
    category: 'Browser Game Development · 2D Canvas RPG',
    icon: Gamepad2,
    problem: 'Browser games often suffer from frame drops, unoptimized canvas rendering, and clunky collision handling on varied screen sizes.',
    solution: 'Architected a performant 2D adventure game utilizing the Phaser framework, implementing modular sprite controllers, procedural enemy AI encounters, and a star crystal game economy.',
    contribution: 'Game Programmer — Physics loops, sprite sheet animation states, encounter logic, and save-state serialization.',
    features: [
      'Fantasy Map Exploration & Collision Grid',
      'Procedural Enemy Encounter State Machine',
      'Star Crystal Economy & Character Progression',
      'Local Storage Save State Architecture',
    ],
    tech: ['JavaScript (ES6+)', 'Phaser Game Engine', 'Vite', 'HTML5 Canvas', 'CSS3'],
    github: 'https://github.com/hhafil876-eng/bladequest',

  },
  {
    num: '04',
    title: 'ScamShield — Cyber Threat Defense',
    badge: 'Cyber Defense',
    status: 'Live Deployment',
    isPrototype: false,
    type: 'cyber',
    category: 'Cybersecurity · Threat Intelligence & Digital Safety',
    icon: ShieldAlert,
    problem: 'Digital fraud, phishing vectors, and social engineering attacks deceive internet users due to a lack of practical, interactive threat education.',
    solution: 'Designed an educational threat intelligence portal cataloging deceptive cyber patterns, interactive simulated scam scenarios, and preventive safety guidelines.',
    contribution: 'Security Researcher & UI Designer — Threat vector classification, interactive awareness UX, and defense guidelines.',
    features: [
      'Comprehensive Threat Vector Taxonomy',
      'Interactive Phishing Scenario Simulations',
      'Preventive Digital Defense Protocols',
      'Educational Threat Intelligence UX',
    ],
    tech: ['React', 'Cybersecurity', 'Web Development', 'Threat Modeling', 'Vercel'],
    github: 'https://github.com/hhafil876-eng/ScamShield',
    demo: 'https://scam-shield-gules.vercel.app/',
  },
  {
    num: '05',
    title: 'RAPHAEL — Autonomous AI Assistant',
    badge: 'AI Assistant',
    status: 'Experimental Agent',
    isPrototype: true,
    type: 'ai',
    category: 'Artificial Intelligence · Conversational Orchestration',
    icon: Cpu,
    problem: 'Complex daily routines and developer workflows require multi-turn conversational understanding, memory retention, and automated API task dispatching.',
    solution: 'Created an autonomous assistant architecture exploring multi-turn conversational context buffers, prompt chain workflows, and automation scripts using LLM APIs.',
    contribution: 'AI Engineer — Prompt design, contextual conversational pipeline, and Python automation integration.',
    features: [
      'Context-aware Multi-turn Memory Engine',
      'Structured Prompt Chain Orchestration',
      'OpenAI API Pipeline Integration',
      'Automated Task Scripting Pipelines',
    ],
    tech: ['Python', 'OpenAI API', 'Prompt Engineering', 'Automation Scripts'],
    github: 'https://github.com/hhafil876-eng/portfolio',
    sourceLabel: 'Portfolio Repository',

  },
  {
    num: '06',
    title: 'Creative Media Portfolio — H&N Creations',
    badge: 'Media Studio',
    status: 'Commercial Production',
    isPrototype: false,
    type: 'media',
    category: 'Cinematography · Commercial Direction · Motion Graphics',
    icon: Camera,
    problem: 'Brands and institutions need commercial-grade video production and distinctive visual identity systems to capture attention and communicate effectively.',
    solution: 'Directed and delivered extensive commercial cinematography, institutional event films, documentary coverage, and social media brand campaigns for clients across Karnataka.',
    contribution: 'Founder & Creative Director — Cinematography, color grading, motion graphics, and post-production editing.',
    features: [
      'Cinematic Color Grading & Post-Production',
      'High-Profile Campus Event Cinematography',
      'Promotional Commercials & Campaign Videos',
      'Brand Identity Systems & Poster Collateral',
    ],
    tech: ['Video Editing', 'Cinematography', 'Color Grading', 'CapCut', 'Alight Motion'],
    github: 'https://github.com/hhafil876-eng/portfolio',
    sourceLabel: 'Portfolio Repository',
    demo: 'https://www.linkedin.com/in/mohammad-hapiz-4a692429a/',
    demoLabel: 'LinkedIn Profile',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Artifacts' },
  { id: 'web', label: 'Full-Stack & Web' },
  { id: 'ai', label: 'Generative AI' },
  { id: 'games', label: 'Game Engines' },
  { id: 'cyber', label: 'Cyber Defense' },
  { id: 'media', label: 'Creative Media' },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const triggerRef = useRef(null)

  const handleOpenModal = (project, element) => {
    cyberAudio.playClick()
    triggerRef.current = element
    setSelectedProject(project)
  }

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === filter)

  return (
    <div className="section-padding relative px-6 sm:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SignalPath />
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#FFD600] uppercase font-mono">
                Featured Engineering Portfolio
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
              Selected <span className="yellow-text-gradient">Artifacts</span>
            </h2>
          </div>

          <div className="text-xs text-silver-400 font-mono flex items-center gap-2 bg-[#2B2E34]/80 border border-[#C0C0C0]/15 px-4 py-2 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600] shadow-[0_0_8px_#FFD600]" />
            <span className="text-silver-400">INDEX:</span>
            <span className="text-silver-100 font-semibold">{PROJECTS.length} VERIFIED SYSTEMS</span>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist" aria-label="Project Categories">
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat.id
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  cyberAudio.playClick()
                  setFilter(cat.id)
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                className={`relative px-4 py-2 rounded-full text-xs tracking-wide transition-all cursor-pointer select-none ${
                  isActive
                    ? 'text-[#17191D] font-semibold'
                    : 'bg-[#2B2E34]/60 border border-[#C0C0C0]/15 text-silver-400 hover:text-white hover:border-[#FFD600]/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                    className="absolute inset-0 bg-[#FFD600] rounded-full shadow-[0_2px_15px_rgba(255,214,0,0.35)]"
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Verification & Transparency Banner */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#2B2E34]/70 border border-[#C0C0C0]/15 mb-8 text-[11px] text-silver-400 shadow-sm">
          <ShieldAlert size={14} className="text-[#FFD600] flex-shrink-0" />
          <span>
            <strong className="text-silver-100 font-medium">Verifiable Artifacts:</strong> Cards feature simulated UI architectural telemetry. Launch live execution via <span className="text-[#FFD600] font-mono">Live Demo</span> or inspect verified public <span className="text-[#FFD600] font-mono">GitHub</span> repositories.
          </span>
        </div>

        {/* 3D Works Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence>
            {filteredProjects.map((proj, i) => {
              return (
                <motion.div
                  layout
                  key={proj.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <TiltCard
                    data-project=""
                    maxTilt={5}
                    scale={1.015}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open detailed case study for ${proj.title}`}
                    onKeyDown={(e) => {
                      if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault()
                        handleOpenModal(proj, e.currentTarget)
                      }
                    }}
                    onClick={(e) => handleOpenModal(proj, e.currentTarget)}
                    className="p-7 sm:p-8 h-full flex flex-col justify-between group cursor-pointer hover:border-[#FFD600]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono text-silver-500 group-hover:text-[#FFD600] transition-colors">
                          // {proj.num}
                        </span>

                        <div className="flex items-center gap-2">
                          {proj.isPrototype && (
                            <span className="text-[10px] tracking-wider uppercase font-medium px-2.5 py-0.5 rounded-full bg-[#343840] border border-[#C0C0C0]/20 text-silver-300">
                              Prototype
                            </span>
                          )}
                          <span className="text-[10px] tracking-wider uppercase font-medium px-3 py-1 rounded-full bg-[#FFD600]/12 border border-[#FFD600]/30 text-[#FFD600]">
                            {proj.badge}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Visual Proof & System Preview */}
                      <div className="mb-5">
                        <ProjectVisualPreview project={proj} />
                      </div>

                      {/* Title & Category */}
                      <div className="mb-3">
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-[#FFE45C] transition-colors leading-tight mb-1">
                          {proj.title}
                        </h3>
                        <p className="text-[11px] text-silver-400 truncate font-sans">
                          {proj.category}
                        </p>
                      </div>

                      {/* Description / Problem */}
                      <p className="text-xs text-silver-300 leading-relaxed mb-5 line-clamp-3 font-normal">
                        {proj.solution}
                      </p>

                      {/* Features */}
                      <div className="space-y-1.5 mb-6 pt-4 border-t border-[#C0C0C0]/10">
                        {proj.features.slice(0, 3).map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2 text-[11px] text-silver-400"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#FFD600] flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Metadata & Direct Action Links */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {proj.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#2B2E34] border border-[#C0C0C0]/15 text-silver-300"
                          >
                            {t}
                          </span>
                        ))}
                        {proj.tech.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#17191D]/60 text-silver-500">
                            +{proj.tech.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#C0C0C0]/15">
                        <span className="text-xs font-medium text-silver-200 flex items-center gap-1 group-hover:text-[#FFD600] group-hover:translate-x-0.5 transition-all">
                          <span>View Case Study</span>
                          <ArrowUpRight size={14} className="text-[#FFD600]" />
                        </span>

                        {/* Direct Fast Action Links */}
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${proj.sourceLabel || 'GitHub Repository'} for ${proj.title}`}
                              onClick={() => cyberAudio.playClick()}
                              className="w-7 h-7 rounded-lg bg-[#2B2E34] border border-[#C0C0C0]/20 hover:border-[#FFD600] flex items-center justify-center text-silver-400 hover:text-white transition-all"
                              title={proj.sourceLabel || 'GitHub Repository'}
                            >
                              <Github size={13} />
                            </a>
                          )}

                          {proj.demo && (
                            <a
                              href={proj.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${proj.demoLabel || 'Live Demo or Preview'} for ${proj.title}`}
                              onClick={() => cyberAudio.playClick()}
                              className="w-7 h-7 rounded-lg bg-[#FFD600]/15 border border-[#FFD600]/30 hover:border-[#FFD600] hover:bg-[#FFD600]/25 flex items-center justify-center text-[#FFD600] transition-all"
                              title={proj.demoLabel || 'Live Demo or Preview'}
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* ─── DETAILED MODAL CASE STUDY DOSSIER WITH PROPER EXIT ANIMATION ─── */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              key="case-study-modal"
              project={selectedProject}
              triggerRef={triggerRef}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
