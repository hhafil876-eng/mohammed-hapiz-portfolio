import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Code2, Brain, Camera, Cpu, Database, Search, X } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const DOMAINS = [
  {
    id: 'web',
    icon: Code2,
    label: 'Full-Stack & Web',
    desc: 'Reactive interfaces, server runtimes, RESTful API architecture.',
    x: 50, y: 20, // % coordinates in the graph canvas
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
    id: 'cs',
    icon: Database,
    label: 'Computer Science',
    desc: 'Data structures, algorithms, databases, computer networks.',
    x: 18, y: 50,
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
    id: 'ai',
    icon: Brain,
    label: 'AI & Agents',
    desc: 'Generative models, prompt engineering, agentic workflows.',
    x: 82, y: 50,
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
    id: 'media',
    icon: Camera,
    label: 'Creative Media',
    desc: 'Cinematic video, visual identity design, narrative storytelling.',
    x: 18, y: 82,
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
    id: 'tools',
    icon: Cpu,
    label: 'Dev Ecosystem',
    desc: 'Toolchains, version control, game engines, cloud hosting.',
    x: 82, y: 82,
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

// Which nodes connect to which (by id)
const CONNECTIONS = [
  ['web', 'cs'],
  ['web', 'ai'],
  ['web', 'tools'],
  ['cs', 'ai'],
  ['ai', 'tools'],
  ['media', 'cs'],
  ['media', 'tools'],
]

const LEVEL_COLOR = {
  'Award-Winning': '#FFD600',
  'Advanced': '#FFD600',
  'Proficient': '#E5E7EB',
  'Strong': '#E5E7EB',
  'Core': '#C0C0C0',
  'Working': '#777D85',
}

function NodeGraph({ domains, connections, activeId, onSelect }) {
  const svgRef = useRef(null)
  const [dims, setDims] = useState({ w: 600, h: 420 })

  useEffect(() => {
    const update = () => {
      if (svgRef.current) {
        const r = svgRef.current.getBoundingClientRect()
        setDims({ w: r.width || 600, h: r.height || 420 })
      }
    }
    update()
    const ro = new ResizeObserver(update)
    if (svgRef.current) ro.observe(svgRef.current)
    return () => ro.disconnect()
  }, [])

  const getPos = (d) => ({
    x: (d.x / 100) * dims.w,
    y: (d.y / 100) * dims.h,
  })

  const domainMap = Object.fromEntries(domains.map(d => [d.id, d]))

  return (
    <svg
      ref={svgRef}
      className="skill-graph-svg"
      aria-hidden="true"
      viewBox={`0 0 ${dims.w} ${dims.h}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD600" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#FFD600" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient center glow */}
      <ellipse cx={dims.w/2} cy={dims.h/2} rx={dims.w*0.4} ry={dims.h*0.4} fill="url(#centerGrad)" />

      {/* Connection lines */}
      {connections.map(([aId, bId]) => {
        const a = getPos(domainMap[aId])
        const b = getPos(domainMap[bId])
        const isActive = activeId && (activeId === aId || activeId === bId)
        return (
          <motion.line
            key={`${aId}-${bId}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={isActive ? '#FFD600' : '#343840'}
            strokeWidth={isActive ? 1.5 : 1}
            strokeOpacity={isActive ? 0.8 : 0.5}
            strokeDasharray={isActive ? 'none' : '4 6'}
            animate={{ stroke: isActive ? '#FFD600' : '#343840', strokeOpacity: isActive ? 0.8 : 0.4 }}
            transition={{ duration: 0.3 }}
          />
        )
      })}

      {/* Nodes */}
      {domains.map(d => {
        const { x, y } = getPos(d)
        const isActive = activeId === d.id
        const Icon = d.icon
        return (
          <g
            key={d.id}
            onClick={() => onSelect(isActive ? null : d.id)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(isActive ? null : d.id) } }}
            tabIndex={0}
            role="button"
            aria-pressed={isActive}
            aria-label={`Select ${d.label} skill domain`}
            style={{ cursor: 'pointer' }}
          >
            {/* Node outer ring */}
            <motion.circle
              cx={x} cy={y} r={isActive ? 36 : 30}
              fill={isActive ? 'rgba(255,214,0,0.1)' : 'rgba(23,25,29,0.9)'}
              stroke={isActive ? '#FFD600' : '#343840'}
              strokeWidth={isActive ? 2 : 1}
              filter={isActive ? 'url(#nodeGlow)' : undefined}
              animate={{ r: isActive ? 36 : 30 }}
              transition={{ duration: 0.3 }}
            />
            {/* Node inner */}
            <circle cx={x} cy={y} r={isActive ? 24 : 20} fill="#101114" />

            {/* Icon placeholder (using text since SVG foreignObject has constraints) */}
            <text
              x={x}
              y={y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={isActive ? '14' : '12'}
              fill={isActive ? '#FFD600' : '#C0C0C0'}
              fontFamily="monospace"
            >
              {d.id.toUpperCase()}
            </text>

            {/* Label below node */}
            <text
              x={x}
              y={y + (isActive ? 50 : 44)}
              textAnchor="middle"
              fontSize="10"
              fill={isActive ? '#FFD600' : '#777D85'}
              fontFamily="var(--font-mono, monospace)"
              letterSpacing="0.08em"
            >
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Skills() {
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const activeDomain = DOMAINS.find(d => d.id === activeId)

  const searchFiltered = query.trim()
    ? DOMAINS.filter(d => d.skills.some(s => s.name.toLowerCase().includes(query.toLowerCase())))
    : null

  const handleSelect = useCallback((id) => {
    cyberAudio.playClick()
    setActiveId(id)
  }, [])

  const clearSearch = () => { setQuery(''); cyberAudio.playClick() }

  return (
    <section ref={sectionRef} className="skills-graph-section" aria-label="Technical Capabilities">

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="skills-header"
      >
        <span className="section-eyebrow">Engineering Capabilities</span>
        <h2 className="skills-title">
          <span className="skills-title-num">02</span>
          <span className="skills-title-text">Skill <em>Constellation</em></span>
        </h2>
        <p className="skills-subtitle">
          Select a domain node to explore capabilities. Each node connects related disciplines.
        </p>
      </motion.div>

      {/* ── MAIN LAYOUT ── */}
      <div className="skills-layout">

        {/* LEFT: Interactive Node Graph */}
        <motion.div
          className="graph-col"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="graph-container">
            <div className="graph-bg-label" aria-hidden="true">SKILL MAP</div>
            <NodeGraph
              domains={DOMAINS}
              connections={CONNECTIONS}
              activeId={activeId}
              onSelect={handleSelect}
            />
            {!activeId && (
              <div className="graph-hint" aria-live="polite">
                <span>Click any node to explore</span>
              </div>
            )}
          </div>

          {/* Search — below the graph */}
          <div className="skills-search-row">
            <div className="skills-search-wrap">
              <Search size={14} className="search-icon" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search skill (React, AI, Python…)"
                aria-label="Filter skills by keyword"
                className="skills-search-input"
              />
              {query && (
                <button onClick={clearSearch} className="search-clear" aria-label="Clear search">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Detail Panel */}
        <motion.div
          className="detail-col"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {/* Search results view */}
            {searchFiltered ? (
              <motion.div
                key="search-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="detail-panel"
              >
                <div className="detail-panel-header">
                  <span className="detail-eyebrow">Search Results</span>
                  <span className="detail-title">"{query}"</span>
                </div>
                <div className="detail-skills-list">
                  {searchFiltered.flatMap(d =>
                    d.skills
                      .filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
                      .map(s => ({ ...s, domain: d.label }))
                  ).map((s, i) => (
                    <div key={i} className="skill-row-item">
                      <div className="skill-row-name">
                        <span className="skill-row-dot" style={{ background: LEVEL_COLOR[s.level] || '#777D85' }} aria-hidden="true" />
                        <span>{s.name}</span>
                      </div>
                      <div className="skill-row-meta">
                        <span className="skill-domain-tag">{s.domain}</span>
                        <span className="skill-level" style={{ color: LEVEL_COLOR[s.level] || '#777D85' }}>{s.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : activeDomain ? (
              /* Active node detail */
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="detail-panel"
              >
                <div className="detail-panel-header">
                  <span className="detail-eyebrow">Domain {activeDomain.id.toUpperCase()}</span>
                  <h3 className="detail-title">{activeDomain.label}</h3>
                  <p className="detail-desc">{activeDomain.desc}</p>
                </div>

                <div className="detail-skills-list">
                  {activeDomain.skills.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                      className="skill-row-item"
                    >
                      <div className="skill-row-name">
                        <span className="skill-row-dot" style={{ background: LEVEL_COLOR[s.level] || '#777D85' }} aria-hidden="true" />
                        <span>{s.name}</span>
                      </div>
                      <span className="skill-level" style={{ color: LEVEL_COLOR[s.level] || '#777D85' }}>{s.level}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Connected domains */}
                <div className="detail-connections">
                  <span className="detail-connections-label">Connects to:</span>
                  <div className="detail-connection-tags">
                    {CONNECTIONS
                      .filter(([a, b]) => a === activeDomain.id || b === activeDomain.id)
                      .map(([a, b]) => {
                        const otherId = a === activeDomain.id ? b : a
                        const other = DOMAINS.find(d => d.id === otherId)
                        return other ? (
                          <button
                            key={otherId}
                            onClick={() => handleSelect(otherId)}
                            className="connection-tag"
                          >
                            {other.label}
                          </button>
                        ) : null
                      })
                    }
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Default: all domains overview */
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="detail-panel"
              >
                <div className="detail-panel-header">
                  <span className="detail-eyebrow">All Domains</span>
                  <h3 className="detail-title">5 Core Areas</h3>
                  <p className="detail-desc">Select a node in the graph or search for a specific skill.</p>
                </div>

                <div className="domains-overview">
                  {DOMAINS.map(d => {
                    const Icon = d.icon
                    return (
                      <button
                        key={d.id}
                        onClick={() => handleSelect(d.id)}
                        onMouseEnter={() => cyberAudio.playHover()}
                        className="domain-overview-btn"
                      >
                        <Icon size={16} className="domain-overview-icon" aria-hidden="true" />
                        <div>
                          <div className="domain-overview-label">{d.label}</div>
                          <div className="domain-overview-count">{d.skills.length} skills</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
