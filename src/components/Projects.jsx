import ProjectVisualPreview from './ProjectVisualPreview'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { Layers, Gamepad2, ShieldAlert, Cpu, Camera, ArrowUpRight, Github, ExternalLink, Code2 } from 'lucide-react'
import ProjectModal from './ProjectModal'
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
    color: '#FFD600',
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
    color: '#C0C0C0',
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
    color: '#E5E7EB',
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
    color: '#FFD600',
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
    color: '#C0C0C0',
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
    color: '#E5E7EB',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Full-Stack' },
  { id: 'ai', label: 'AI' },
  { id: 'games', label: 'Games' },
  { id: 'cyber', label: 'Security' },
  { id: 'media', label: 'Media' },
]

// A single editorial project panel (full-width alternating layout)
function ProjectPanel({ proj, index, onOpen }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0
  const Icon = proj.icon

  const variants = {
    hidden: { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
    visible: { opacity: 1, clipPath: 'inset(0 0 0 0%)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.article
      ref={ref}
      variants={variants}
      initial={false}
      animate="visible"
      className={`project-panel ${isEven ? 'panel-left' : 'panel-right'}`}
      aria-label={proj.title}
    >
      {/* Giant number — background element */}
      <div className="panel-number" aria-hidden="true">{proj.num}</div>

      {/* Visual column */}
      <div className="panel-visual">
        <div className="panel-visual-inner">
          <div className="panel-preview"><ProjectVisualPreview project={proj} isExpanded /></div>
          <div className="panel-icon-stage">
            <div className="panel-icon-bg" aria-hidden="true">
              <Icon size={56} className="panel-icon" />
            </div>
            {/* Fissure crack decoration on the visual block */}
            <svg className="panel-crack" viewBox="0 0 200 300" aria-hidden="true">
              <polyline
                points="120,10 100,80 115,150 90,220 105,290"
                stroke={proj.color}
                strokeWidth="1"
                fill="none"
                strokeOpacity="0.5"
              />
              <polyline points="100,80 75,100" stroke={proj.color} strokeWidth="0.6" strokeOpacity="0.3" fill="none"/>
              <polyline points="115,150 140,165" stroke={proj.color} strokeWidth="0.6" strokeOpacity="0.3" fill="none"/>
            </svg>
          </div>

          {/* Tech badges stacked in visual area */}
          <div className="panel-tech-stack">
            {proj.tech.slice(0, 4).map(t => (
              <span key={t} className="panel-tech-tag">{t}</span>
            ))}
            {proj.tech.length > 4 && <span className="panel-tech-tag panel-tech-more">+{proj.tech.length - 4}</span>}
          </div>
        </div>
      </div>

      {/* Content column */}
      <div className="panel-content">
        <div className="panel-meta">
          <span className="panel-badge">{proj.badge}</span>
          {proj.isPrototype && <span className="panel-proto">Prototype</span>}
        </div>

        <h3 className="panel-title">{proj.title}</h3>
        <p className="panel-category">{proj.category}</p>

        <p className="panel-desc">{proj.solution}</p>

        <ul className="panel-features" aria-label="Key features">
          {proj.features.slice(0, 3).map((f, i) => (
            <li key={i} className="panel-feature-item">
              <span className="feature-dash" aria-hidden="true">—</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="panel-actions">
          <button
            onClick={(e) => onOpen(proj, e.currentTarget)}
            onMouseEnter={() => cyberAudio.playHover()}
            className="panel-cta"
            aria-label={`Open full case study for ${proj.title}`}
          >
            <span>Full Case Study</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>

          <div className="panel-links" onClick={e => e.stopPropagation()}>
            {proj.github && (
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-link-icon"
                aria-label={`${proj.sourceLabel || 'GitHub'} for ${proj.title}`}
                onClick={() => cyberAudio.playClick()}
                title={proj.sourceLabel || 'GitHub'}
              >
                <Github size={15} />
              </a>
            )}
            {proj.demo && (
              <a
                href={proj.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-link-icon panel-link-live"
                aria-label={`${proj.demoLabel || 'Live demo'} for ${proj.title}`}
                onClick={() => cyberAudio.playClick()}
                title={proj.demoLabel || 'Live demo'}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const triggerRef = useRef(null)
  const sectionRef = useRef(null)

  const handleOpenModal = useCallback((project, element) => {
    cyberAudio.playClick()
    triggerRef.current = element
    setSelectedProject(project)
  }, [])

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.type === filter)

  return (
    <div ref={sectionRef} className="projects-editorial-section">

      {/* ── SECTION HEADER ── */}
      <div className="projects-header">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="projects-header-inner"
        >
          <span className="section-eyebrow">Selected Engineering Work</span>
          <h2 className="projects-title">
            <span className="projects-title-num">03</span>
            <span className="projects-title-text">
              Built &amp; <em>Shipped</em>
            </span>
          </h2>
          <p className="projects-subtitle">
            Six projects and prototypes across AI, full-stack web, game development, cybersecurity, and creative media.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="project-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              aria-pressed={filter === cat.id}
              onClick={() => { cyberAudio.playClick(); setFilter(cat.id) }}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`filter-btn ${filter === cat.id ? 'filter-btn-active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── PROJECT PANELS ── */}
      <div className="panels-container">
        <AnimatePresence>
          {filtered.map((proj, i) => (
            <ProjectPanel
              key={proj.num}
              proj={proj}
              index={i}
              onOpen={handleOpenModal}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key="project-modal"
            project={selectedProject}
            triggerRef={triggerRef}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
