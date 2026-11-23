import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { MapPin, GraduationCap, Languages, ArrowUpRight } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const PILLARS = [
  { title: 'Engineering', text: 'Full-stack systems, reactive interfaces, RESTful APIs, and scalable cloud infrastructure.' },
  { title: 'AI & Agents', text: 'Generative AI, prompt engineering, context design, and autonomous LLM pipelines.' },
  { title: 'Creative Media', text: 'Cinematic video post-production, photography, brand identity, and commercial direction.' },
]

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="about-monolith-section" aria-label="About Mohammed Hapiz">

      {/* ── SECTION INDICATOR ── */}
      <div className="about-section-mark" aria-hidden="true">
        <span className="section-mark-num">01</span>
        <span className="section-mark-line" />
      </div>

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div className="about-split">

        {/* LEFT: Editorial portrait column */}
        <motion.div
          className="about-portrait-col"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-portrait-frame">
            <motion.div className="about-portrait-img-wrap" style={{ y: portraitY }}>
              <img
                src="/assets/hapiz-portrait.webp"
                alt="Mohammed Hapiz"
                width="400"
                height="600"
                loading="lazy"
                className="about-portrait-img"
              />
              <div className="about-portrait-overlay" aria-hidden="true" />
            </motion.div>

            {/* Frame decorations */}
            <div className="portrait-corner-tl" aria-hidden="true" />
            <div className="portrait-corner-br" aria-hidden="true" />

            {/* Floating credential tag */}
            <div className="portrait-floating-tag">
              <span className="tag-year">2023 — Present</span>
              <span className="tag-label">MIT Kundapura · VTU</span>
            </div>
          </div>

          {/* Coordinates below portrait */}
          <div className="about-coordinates">
            <div className="coord-item" onMouseEnter={() => cyberAudio.playHover()}>
              <MapPin size={12} className="coord-icon" aria-hidden="true" />
              <span>Kundapura, Karnataka, India</span>
            </div>
            <div className="coord-item" onMouseEnter={() => cyberAudio.playHover()}>
              <Languages size={12} className="coord-icon" aria-hidden="true" />
              <span>English · Hindi · Kannada</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Editorial text column */}
        <div className="about-text-col">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <span className="section-eyebrow">About the Engineer</span>
            <h2 className="about-heading">
              Building at the intersection of{' '}
              <em className="about-heading-em">code</em>,{' '}
              <em className="about-heading-em">intelligence</em>{' '}
              &amp; <em className="about-heading-em">craft</em>
            </h2>
          </motion.div>

          <motion.div
            className="about-bio-block"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <p className="about-bio-text">
              I'm <strong>Mohammed Hapiz</strong>, a software engineer and creative technologist based in Karnataka, India. My work centres on building practical, high-impact digital systems that unite computational rigour with intentional visual design.
            </p>
            <p className="about-bio-text">
              My technical focus spans full-stack web development, Java programming, <span className="bio-highlight">generative AI workflows</span>, prompt engineering, and interactive browser systems — approaching every problem from first principles with clean architectures that scale.
            </p>
            <p className="about-bio-text">
              Beyond software, I bring years of dedicated practice in cinematography, video post-production, photography, and brand identity design through my commercial studio, H&N Creations.
            </p>
          </motion.div>

          {/* Three pillars — horizontal strips */}
          <div className="about-pillars">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                className="pillar-strip"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
              >
                <div className="pillar-num" aria-hidden="true">0{i + 1}</div>
                <div className="pillar-content">
                  <span className="pillar-title">{p.title}</span>
                  <span className="pillar-text">{p.text}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Academic block */}
          <motion.div
            className="about-academic"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="academic-header">
              <GraduationCap size={15} className="academic-icon" aria-hidden="true" />
              <span className="academic-label">Academic Record</span>
              <span className="academic-badge">CURRENT</span>
            </div>

            <div className="academic-entry">
              <div className="academic-entry-left">
                <span className="academic-degree">Bachelor of Engineering — Computer Science</span>
                <span className="academic-org">Moodlakatte Institute of Technology · VTU · 2023 — Present</span>
              </div>
              <div className="academic-cgpa">
                <span className="cgpa-num">7.6</span>
                <span className="cgpa-unit">CGPA</span>
              </div>
            </div>

            <div className="academic-entry academic-entry-secondary">
              <div className="academic-entry-left">
                <span className="academic-degree">Pre-University Course (PUC)</span>
                <span className="academic-org">Excellent PU College, Sunnari · 2020 — 2021</span>
              </div>
              <div className="academic-cgpa">
                <span className="cgpa-num" style={{ color: '#E5E7EB' }}>81%</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
