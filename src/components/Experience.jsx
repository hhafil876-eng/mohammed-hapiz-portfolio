import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { Users, Lightbulb, Heart, Building2, Calendar } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const EXPERIENCES = [
  {
    num: '01',
    role: 'Founder & Creative Lead',
    org: 'H&N Creations',
    type: 'Commercial Creative Studio',
    timeframe: 'Ongoing',
    icon: Building2,
    summary: 'A creative media studio delivering commercial cinematography, post-production color grading, corporate event coverage, visual branding, and digital marketing assets.',
    points: [
      'Directed end-to-end creative production lifecycles for private and institutional events.',
      'Authored brand identity systems, promotional media, and high-engagement social collateral.',
      'Delivered cinematic color-graded video reels and promotional advertisements across Karnataka.',
    ],
    skills: ['Creative Direction', 'Cinematography', 'Video Editing', 'Brand Identity', 'Media Production'],
  },
  {
    num: '02',
    role: 'Core Media Lead · 3 Years',
    org: 'MIT Kundapura Media Club',
    type: 'Institutional Media Operations',
    timeframe: '3 Years Continuous',
    icon: Users,
    summary: 'Spearheaded campus-wide digital media coverage, directing dynamic promotional reels, capturing symposiums, and expanding social media engagement across 3 consecutive years.',
    points: [
      'Continuous three-year leadership contribution to official college media production.',
      'Produced cinematic highlight films and high-profile keynote speaker coverage.',
      'Architected media workflows for flagship technical symposiums and collegiate festivals.',
    ],
    skills: ['Content Strategy', 'Live Event Cinematography', 'Social Media Strategy', 'Editing Workflows'],
  },
  {
    num: '03',
    role: 'Active Member & Media Director',
    org: 'Udyam X — Entrepreneurship Cell',
    type: 'Incubation & Student Venture',
    timeframe: 'Collegiate Era',
    icon: Lightbulb,
    summary: 'Cultivated the student startup ecosystem through ideathon planning, creative marketing campaigns, pitch event production, and brand storytelling.',
    points: [
      'Organized and executed student Ideathons and competitive startup pitch summits.',
      'Produced high-impact campaign videos that boosted registration and visibility.',
      'Designed marketing collateral communicating entrepreneurship and innovation principles.',
    ],
    skills: ['Ideathons', 'Brand Design', 'Event Publicity', 'Entrepreneurial Strategy'],
  },
  {
    num: '04',
    role: 'Technology Educator & Volunteer',
    org: 'Panchayat Community Initiative',
    type: 'Community Impact',
    timeframe: 'Grassroots Service',
    icon: Heart,
    summary: 'Led foundational coding and computational thinking workshops for young students in rural communities through a local Panchayat social initiative.',
    points: [
      'Taught basic programming logic, problem-solving, and web fundamentals to young learners.',
      'Introduced modern AI concepts and digital tools to inspire future technologist pathways.',
      'Promoted grassroots technological access and digital literacy in underserved areas.',
    ],
    skills: ['Community Leadership', 'Pedagogy', 'Coding Education', 'Social Impact'],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 80%', 'end 20%'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const reduced = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="experience-section" aria-label="Experience and Trajectory">

      {/* ── HEADER ── */}
      <motion.div
        className="exp-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-eyebrow">Professional Trajectory</span>
        <h2 className="exp-title">
          <span className="exp-title-num">04</span>
          <span>Experience &amp; <em>Impact</em></span>
        </h2>
      </motion.div>

      {/* ── TIMELINE ── */}
      <div className="exp-timeline">
        {/* Animated vertical track */}
        <div className="exp-track" aria-hidden="true">
          <div className="exp-track-bg" />
          {!reduced && (
            <motion.div className="exp-track-fill" style={{ height: lineHeight }} />
          )}
        </div>

        {/* Experience entries */}
        <div className="exp-entries">
          {EXPERIENCES.map((exp, i) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={exp.org}
                className="exp-entry"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Timeline node */}
                <div className="exp-node" aria-hidden="true">
                  <div className="exp-node-inner">
                    <Icon size={14} />
                  </div>
                </div>

                {/* Entry card — minimal architectural style */}
                <div className="exp-card">
                  <div className="exp-card-top">
                    <div className="exp-num-block" aria-hidden="true">{exp.num}</div>
                    <div className="exp-header-info">
                      <div className="exp-role">{exp.role}</div>
                      <div className="exp-org">{exp.org}</div>
                    </div>
                    <div className="exp-time">
                      <Calendar size={11} aria-hidden="true" />
                      <span>{exp.timeframe}</span>
                    </div>
                  </div>

                  <div className="exp-type">{exp.type}</div>

                  <p className="exp-summary">{exp.summary}</p>

                  <ul className="exp-points" aria-label="Key contributions">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="exp-point">
                        <span className="exp-point-dash" aria-hidden="true">—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="exp-skills">
                    {exp.skills.map(s => (
                      <span key={s} className="exp-skill-tag"
                        onMouseEnter={() => cyberAudio.playHover()}
                      >{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
