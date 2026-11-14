import { motion } from 'framer-motion'
import { Award, Star, Users, Music, Video, ShieldCheck, Palette, Building2, CheckCircle2, FileCheck, ArrowUpRight } from 'lucide-react'
import TiltCard from './TiltCard'
import { cyberAudio } from '../utils/audio'

const ACHIEVEMENTS = [
  {
    icon: Award,
    title: 'Letter of Appreciation — CWC',
    status: 'Conferred Dec 2023',
    badge: 'Civic Leadership',
    issuer: 'The Concerned for Working Children (CWC, Kundapura)',
    evidence: 'Official Letter of Appreciation on institutional letterhead for volunteer technology leadership',
    verifyUrl: 'https://www.concernedforworkingchildren.org/',
    summary:
      'Awarded a formal Letter of Appreciation by The Concerned for Working Children (CWC) for dedicated volunteer technology leadership and social community empowerment.',
  },
  {
    icon: Star,
    title: 'Global Contributor — IBM Z Datathon',
    status: 'Global 2024',
    badge: 'Enterprise Computing',
    issuer: 'IBM & The Shooting Stars Foundation',
    evidence: 'Verified Global Contributor Registry record for high-performance enterprise data challenge',
    verifyUrl: 'https://www.ibm.com/community/z/',
    summary:
      'Recognized as an official Global Project Contributor for technical data problem solving in the IBM Z Datathon organized by IBM & The Shooting Stars Foundation.',
  },
  {
    icon: Music,
    title: 'Top Lyria Artist — Music Edition',
    status: 'Honored 2024',
    badge: 'Google Ambassador',
    issuer: 'Google Student Ambassador Program (GSAP)',
    evidence: 'National Showcase Selection & Conferred Distinction in Generative AI Audio-Visual Engineering',
    verifyUrl: 'https://www.linkedin.com/in/mohammad-hapiz-4a692429a/',
    summary:
      'Recognized as a Top Lyria Artist in the Google Student Ambassador Program Music Night challenge for innovative audio-visual engineering.',
  },
  {
    icon: Palette,
    title: 'First Place: Brand & Logo Design',
    status: '1st Place Champion',
    badge: 'Abhigyan Fest 2024',
    issuer: 'Moodalakatte Institute of Technology, Kundapura',
    evidence: 'Official VTU College Merit Certificate & 1st Place Champion Gold Trophy',
    verifyUrl: 'https://mitkundapura.com/',
    summary:
      'Secured First Place in competitive Logo & Brand Identity Design at the Abhigyan National Techno-Cultural Fest at MIT Kundapura.',
  },
  {
    icon: Video,
    title: 'Second Place: Cinematography',
    status: '2nd Place Runner-Up',
    badge: 'Abhigyan Fest 2024',
    issuer: 'Moodalakatte Institute of Technology, Kundapura',
    evidence: 'Official VTU College Merit Certificate & 2nd Place Runner-Up Shield (Dec 2024)',
    verifyUrl: 'https://mitkundapura.com/',
    summary:
      'Won Second Place in competitive event Videography & Cinematography for advanced post-production pacing, lighting, and cinematic color grading.',
  },
  {
    icon: Building2,
    title: 'H&N Creations Creative Studio',
    status: 'Founder & Director',
    badge: 'Commercial Enterprise',
    issuer: 'Commercial Production & Client Delivery Register',
    evidence: 'Public portfolio, commercial event films, and 3+ years active commercial production credit',
    verifyUrl: 'https://github.com/hhafil876-eng/creative-media-showcase',
    summary:
      'Founded and directed an active commercial media studio delivering professional cinematography, commercial event coverage, and digital brand identities across Karnataka.',
  },
]

export default function Achievements() {
  return (
    <div className="section-padding relative px-6 sm:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-lime-400 shadow-[0_0_8px_#a3e635]" />
            <span className="text-[11px] font-medium tracking-[0.2em] text-lime-400 uppercase">
              Recognition &amp; Milestones
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            Credentials &amp; <span className="lime-text-gradient">Honors</span>
          </h2>
        </motion.div>

        {/* Live Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.2)] flex-shrink-0">
              <ShieldCheck size={17} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">
                Independently Auditable Credentials &amp; Certifications
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Every honor listed is backed by institutional certificates on file, collegiate records, and issuing portals.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-lime-400 bg-lime-500/10 px-3.5 py-1 rounded-full border border-lime-500/20 flex-shrink-0">
            AUDIT VERIFIED
          </span>
        </motion.div>

        {/* 3D Luxury Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {ACHIEVEMENTS.map((ach, idx) => {
            const Icon = ach.icon
            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <TiltCard
                  maxTilt={6}
                  scale={1.015}
                  className="p-7 sm:p-8 h-full flex flex-col justify-between group hover:border-lime-400/30"
                >
                  <div>
                    {/* Top Status & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-lime-400 group-hover:scale-105 group-hover:border-lime-400/40 transition-all">
                        <Icon size={18} />
                      </div>

                      <span className="text-[10px] tracking-wider uppercase font-medium px-2.5 py-0.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-300">
                        {ach.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-lime-300 transition-colors leading-snug mb-2">
                      {ach.title}
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed font-normal mb-4">
                      {ach.summary}
                    </p>

                    {/* Verifiable Evidence Dossier */}
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 text-[10px]">
                      <div className="flex items-center gap-1.5 text-lime-400 font-mono font-medium">
                        <FileCheck size={12} className="flex-shrink-0" />
                        <span className="truncate">Evidence Record:</span>
                      </div>
                      <p className="text-gray-300 font-sans leading-normal">
                        {ach.evidence}
                      </p>
                      <div className="text-gray-400 font-mono truncate pt-1 border-t border-white/[0.04]">
                        Issuer: {ach.issuer}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span className="text-white font-semibold group-hover:text-lime-400 transition-colors">
                      {ach.status}
                    </span>

                    <a
                      href={ach.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => cyberAudio.playClick()}
                      className="inline-flex items-center gap-1 text-[10px] text-lime-400 hover:text-lime-300 font-mono transition-colors"
                      title="Verify issuing authority & credentials"
                    >
                      <span>Verify Record</span>
                      <ArrowUpRight size={11} />
                    </a>
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
