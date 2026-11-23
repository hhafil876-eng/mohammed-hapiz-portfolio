import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Star, Music, Video, ShieldCheck, Palette, Building2, ArrowUpRight } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const ACHIEVEMENTS = [
  {
    num: '01',
    icon: Award,
    title: 'Letter of Appreciation — CWC',
    status: 'Conferred Dec 2023',
    badge: 'Civic Leadership',
    issuer: 'The Concerned for Working Children (CWC, Kundapura)',
    evidence: 'Official Letter of Appreciation on institutional letterhead for volunteer technology leadership',
    portalLabel: 'Organization Portal',
    portalUrl: 'https://www.concernedforworkingchildren.org/',
    summary: 'Awarded a formal Letter of Appreciation by The Concerned for Working Children (CWC) for dedicated volunteer technology leadership and social community empowerment.',
  },
  {
    num: '02',
    icon: Star,
    title: 'Global Contributor — IBM Z Datathon',
    status: 'Global 2024',
    badge: 'Enterprise Computing',
    issuer: 'IBM & The Shooting Stars Foundation',
    evidence: 'Global Contributor record for enterprise data challenge problem-solving',
    portalLabel: 'Program Portal',
    portalUrl: 'https://www.ibm.com/community/z/',
    summary: 'Recognized as an official Global Project Contributor for technical data problem solving in the IBM Z Datathon organized by IBM & The Shooting Stars Foundation.',
  },
  {
    num: '03',
    icon: Music,
    title: 'Top Lyria Artist — Music Edition',
    status: 'Honored 2024',
    badge: 'Google Ambassador',
    issuer: 'Google Student Ambassador Program (GSAP)',
    evidence: 'National Showcase Selection in Generative AI Audio-Visual Engineering',
    portalLabel: 'Showcase Record',
    portalUrl: 'https://www.linkedin.com/in/mohammad-hapiz-4a692429a/',
    summary: 'Recognized as a Top Lyria Artist in the Google Student Ambassador Program Music Night challenge for innovative audio-visual engineering.',
  },
  {
    num: '04',
    icon: Palette,
    title: 'First Place: Brand & Logo Design',
    status: '1st Place Champion',
    badge: 'Abhigyan Fest 2024',
    issuer: 'Moodlakatte Institute of Technology, Kundapura',
    evidence: 'Official VTU College Merit Certificate & 1st Place Champion Gold Trophy',
    portalLabel: 'Collegiate Portal',
    portalUrl: 'https://mitkundapura.com/',
    summary: 'Secured First Place in competitive Logo & Brand Identity Design at the Abhigyan National Techno-Cultural Fest at MIT Kundapura.',
  },
  {
    num: '05',
    icon: Video,
    title: 'Second Place: Cinematography',
    status: '2nd Place Runner-Up',
    badge: 'Abhigyan Fest 2024',
    issuer: 'Moodlakatte Institute of Technology, Kundapura',
    evidence: 'Official VTU College Merit Certificate & 2nd Place Runner-Up Shield (Dec 2024)',
    portalLabel: 'Collegiate Portal',
    portalUrl: 'https://mitkundapura.com/',
    summary: 'Won Second Place in competitive Videography & Cinematography for advanced post-production pacing, lighting, and cinematic color grading.',
  },
  {
    num: '06',
    icon: Building2,
    title: 'Founder & Director — H&N Creations',
    status: 'Active Commercial Studio',
    badge: 'Commercial Enterprise',
    issuer: 'Commercial Production & Client Delivery Register',
    evidence: 'Commercial event films and 3+ years active commercial production credit across Karnataka',
    portalLabel: 'Studio Portfolio',
    portalUrl: 'https://www.linkedin.com/in/mohammad-hapiz-4a692429a/',
    summary: 'Founded and directed an active commercial media studio delivering professional cinematography, commercial event coverage, and digital brand identities across Karnataka.',
  },
]

export default function Achievements() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="achievements-exhibition" aria-label="Credentials and Achievements">

      {/* ── HEADER ── */}
      <motion.div
        className="achievements-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-eyebrow">Credentials & Recognition</span>
        <h2 className="achievements-title">
          <span className="achievements-title-num">05</span>
          <span>Honors &amp; <em>Distinctions</em></span>
        </h2>
        <div className="achievements-audit-badge">
          <ShieldCheck size={13} aria-hidden="true" />
          <span>All credentials are independently auditable</span>
        </div>
      </motion.div>

      {/* ── EXHIBITION LAYOUT ── Staggered masonry-ish rows with big numbers */}
      <div className="achievements-grid">
        {ACHIEVEMENTS.map((ach, i) => {
          const Icon = ach.icon
          return (
            <motion.div
              key={ach.title}
              className="achievement-exhibit"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              {/* Giant number backdrop */}
              <span className="exhibit-num" aria-hidden="true">{ach.num}</span>

              <div className="exhibit-body">
                <div className="exhibit-top">
                  <div className="exhibit-icon-wrap">
                    <Icon size={18} className="exhibit-icon" aria-hidden="true" />
                  </div>
                  <span className="exhibit-badge">{ach.badge}</span>
                </div>

                <h3 className="exhibit-title">{ach.title}</h3>
                <p className="exhibit-summary">{ach.summary}</p>

                <div className="exhibit-evidence">
                  <span className="evidence-label">Evidence</span>
                  <span className="evidence-text">{ach.evidence}</span>
                </div>

                <div className="exhibit-footer">
                  <span className="exhibit-status">{ach.status}</span>
                  <a
                    href={ach.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exhibit-portal-link"
                    onClick={() => cyberAudio.playClick()}
                    onMouseEnter={() => cyberAudio.playHover()}
                    title={`Visit ${ach.portalLabel}`}
                    aria-label={`${ach.portalLabel} — opens in new tab`}
                  >
                    <span>{ach.portalLabel}</span>
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
