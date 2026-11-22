import SignalPath from './SignalPath'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll } from 'framer-motion'
import { Users, Lightbulb, Heart, Building2, Calendar, CheckCircle2 } from 'lucide-react'
import TiltCard from './TiltCard'
import { cyberAudio } from '../utils/audio'

const EXPERIENCES = [
  {
    role: 'Founder & Creative Lead',
    org: 'H&N Creations',
    type: 'Commercial Creative Studio',
    timeframe: 'Ongoing',
    icon: Building2,
    badge: 'Entrepreneurial Venture',
    summary:
      'A creative media studio delivering commercial cinematography, post-production color grading, corporate event coverage, visual branding, and digital marketing assets.',
    points: [
      'Directed end-to-end creative production lifecycles for private and institutional events.',
      'Authored brand identity systems, promotional media, and high-engagement social collateral.',
      'Delivered cinematic color-graded video reels and promotional advertisements across Karnataka.',
    ],
    skills: ['Creative Direction', 'Cinematography', 'Video Editing', 'Brand Identity', 'Media Production'],
  },
  {
    role: 'Core Media Lead · 3 Years',
    org: 'MIT Kundapura Media Club',
    type: 'Institutional Media Operations',
    timeframe: '3 Years Continuous',
    icon: Users,
    badge: 'Leadership & Production',
    summary:
      'Spearheaded campus-wide digital media coverage, directing dynamic promotional reels, capturing symposiums, and expanding social media engagement across 3 consecutive years.',
    points: [
      'Continuous three-year leadership contribution to official college media production.',
      'Produced cinematic highlight films and high-profile keynote speaker coverage.',
      'Architected media workflows for flagship technical symposiums and collegiate festivals.',
    ],
    skills: ['Content Strategy', 'Live Event Cinematography', 'Social Media Strategy', 'Editing Workflows'],
  },
  {
    role: 'Active Member & Media Director',
    org: 'Udyam X — Entrepreneurship Cell',
    type: 'Incubation & Student Venture',
    timeframe: 'Collegiate Era',
    icon: Lightbulb,
    badge: 'Ideate · Innovate · Impact',
    summary:
      'Cultivated the student startup ecosystem through ideathon planning, creative marketing campaigns, pitch event production, and brand storytelling.',
    points: [
      'Organized and executed student Ideathons and competitive startup pitch summits.',
      'Produced high-impact campaign videos that boosted registration and visibility.',
      'Designed marketing collateral communicating entrepreneurship and innovation principles.',
    ],
    skills: ['Ideathons', 'Brand Design', 'Event Publicity', 'Entrepreneurial Strategy'],
  },
  {
    role: 'Technology Educator & Volunteer',
    org: 'Panchayat Community Initiative',
    type: 'Community Impact',
    timeframe: 'Grassroots Service',
    icon: Heart,
    badge: 'Digital Empowerment',
    summary:
      'Led foundational coding and computational thinking workshops for young students in rural communities through a local Panchayat social initiative.',
    points: [
      'Taught basic programming logic, problem-solving, and web fundamentals to young learners.',
      'Introduced modern AI concepts and digital tools to inspire future technologist pathways.',
      'Promoted grassroots technological access and digital literacy in underserved areas.',
    ],
    skills: ['Community Leadership', 'Pedagogy', 'Coding Education', 'Social Impact'],
  },
]

function TimelineProgress({ timeline }) {
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 75%', 'end 75%'] })
  return (
    <motion.div aria-hidden="true" style={{ scaleY: scrollYProgress }} className="absolute left-6 top-4 bottom-4 origin-top w-px bg-[#FFD600]/60 hidden sm:block" />
  )
}

export default function Experience() {
  const timeline = useRef(null)
  const reduced = useReducedMotion()
  const nearby = useInView(timeline, { margin: '600px' })
  return (
    <div className="section-padding relative px-6 sm:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <SignalPath />
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#FFD600] uppercase font-mono">
              Leadership &amp; Track Record
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            Executive <span className="yellow-text-gradient">Trajectory</span>
          </h2>
        </motion.div>

        {/* Timeline Conduit */}
        <div ref={timeline} className="relative">
          {/* Subtle vertical silver guide */}
          <div className="absolute left-4 sm:left-6 top-4 bottom-4 w-px bg-gradient-to-b from-[#FFD600]/60 via-[#C0C0C0]/20 to-transparent hidden sm:block" />

          {reduced ? (
            <div aria-hidden="true" className="absolute left-6 top-4 bottom-4 origin-top w-px bg-[#FFD600]/60 hidden sm:block" />
          ) : nearby && <TimelineProgress timeline={timeline} />}
          <div className="space-y-8 sm:space-y-11">
            {EXPERIENCES.map((exp, i) => {
              const Icon = exp.icon

              return (
                <motion.div
                  key={exp.org}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative sm:pl-16 group"
                >
                  {/* Subtle Node Pin with Yellow Accent */}
                  <div className="hidden sm:flex absolute left-4 sm:left-6 top-9 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#17191D] border border-[#FFD600] items-center justify-center z-20 group-hover:scale-125 shadow-[0_0_8px_#FFD600] transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                  </div>

                  {/* 3D Experience Card */}
                  <TiltCard
                    maxTilt={4}
                    scale={1.01}
                    className="p-8 sm:p-9 hover:border-[#FFD600]/30"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-[#2B2E34] border border-[#C0C0C0]/20 flex items-center justify-center text-[#FFD600] flex-shrink-0 shadow-sm">
                          <Icon size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] tracking-wider text-[#FFD600] uppercase font-mono block">
                            {exp.type}
                          </span>
                          <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                            {exp.org}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-xs font-mono text-silver-300 bg-[#2B2E34] px-3 py-1 rounded-full border border-[#C0C0C0]/20 flex items-center gap-1.5">
                          <Calendar size={11} className="text-[#FFD600]" />
                          {exp.timeframe}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-medium text-silver-200 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                      <span>{exp.role}</span>
                    </div>

                    <p className="text-sm text-silver-300 mb-5 leading-relaxed font-normal">
                      {exp.summary}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-[#C0C0C0]/10">
                      {exp.points.map((pt, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2.5 text-xs text-silver-300"
                        >
                          <CheckCircle2 size={13} className="text-[#FFD600] mt-0.5 flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#C0C0C0]/10">
                      {exp.skills.map((s) => (
                        <span
                          key={s}
                          onMouseEnter={() => cyberAudio.playHover()}
                          className="text-xs px-3 py-1 rounded-full bg-[#2B2E34]/70 border border-[#C0C0C0]/15 text-silver-300 hover:border-[#FFD600]/40 hover:text-white transition-colors select-none"
                        >
                          {s}
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
    </div>
  )
}
