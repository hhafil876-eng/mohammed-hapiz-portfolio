import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Languages, Sparkles } from 'lucide-react'
import TiltCard from './TiltCard'
import { cyberAudio } from '../utils/audio'

export default function About() {
  return (
    <div className="section-padding relative px-6 sm:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#FFD600] shadow-[0_0_8px_rgba(255,214,0,0.5)]" />
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#FFD600] uppercase font-mono">
              Biography &amp; Foundations
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            Curiosity, Engineering &amp; <span className="yellow-text-gradient">Vision</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story & Philosophy - 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Identity Dossier Card */}
            <TiltCard
              maxTilt={4}
              scale={1.01}
              className="p-8 sm:p-10 hover:border-[#FFD600]/30"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD600]/12 border border-[#FFD600]/30 text-[#FFD600] text-xs font-medium mb-7 font-mono">
                <Sparkles size={13} className="text-[#FFD600]" />
                <span>Developer · AI Specialist · Creative Technologist</span>
              </div>

              <div className="space-y-5 text-silver-300 text-base leading-relaxed font-normal">
                <p>
                  I'm <span className="text-white font-medium">Mohammed Hapiz</span>, an engineer and creative technologist based in Karnataka, India. My passion centers on building practical, high-impact digital experiences that unite computational depth with intuitive visual design.
                </p>
                <p>
                  My technical focus spans <span className="text-white font-medium">full-stack web development, Java programming, <span className="text-[#FFD600] font-medium">generative AI workflows</span>, prompt engineering, and interactive browser systems</span>. I approach each problem from first principles—designing clean architectures that scale smoothly.
                </p>
                <p>
                  Beyond software engineering, I bring years of dedicated practice in <span className="text-white font-medium">cinematography, video post-production, photography, and brand identity design</span>. I believe the most transformative digital products emerge when engineering rigor is amplified by creative aesthetics.
                </p>
                <p className="text-silver-400">
                  Continuously evolving, experimenting with emerging technology models, and building solutions ready for production.
                </p>
              </div>

              {/* Geographic & Linguistic Coordinates */}
              <div className="flex flex-wrap gap-3 mt-9 pt-7 border-t border-[#C0C0C0]/15">
                <div
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2B2E34]/60 border border-[#C0C0C0]/15 hover:border-[#FFD600]/40 text-xs text-silver-300 transition-colors"
                >
                  <MapPin size={13} className="text-[#FFD600]" />
                  <span>Kundapura, Udupi, Karnataka, India</span>
                </div>

                <div
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2B2E34]/60 border border-[#C0C0C0]/15 hover:border-[#FFD600]/40 text-xs text-silver-300 transition-colors"
                >
                  <Languages size={13} className="text-[#FFD600]" />
                  <span>English · Hindi · Kannada</span>
                </div>
              </div>
            </TiltCard>

            {/* Core Pillars */}
            <div className="grid sm:grid-cols-3 gap-3.5">
              {[
                { title: 'Technical Precision', desc: 'Modern reactive architecture & robust OOP' },
                { title: 'Applied Intelligence', desc: 'Generative models, prompt design & agent logic' },
                { title: 'Visual Aesthetics', desc: 'Cinematic creative media & brand identity' },
              ].map((p, idx) => (
                <TiltCard
                  key={idx}
                  maxTilt={6}
                  scale={1.02}
                  className="p-5 hover:border-[#FFD600]/30"
                >
                  <div className="text-xs font-semibold text-white mb-1.5 font-display flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                    <span>{p.title}</span>
                  </div>
                  <div className="text-xs text-silver-400 leading-snug">
                    {p.desc}
                  </div>
                </TiltCard>
              ))}
            </div>
          </motion.div>

          {/* Education & Vital Metrics - 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Academic Trajectory */}
            <TiltCard
              maxTilt={4}
              scale={1.01}
              className="p-7 sm:p-8 hover:border-[#FFD600]/30"
            >
              <div className="flex items-center justify-between mb-7 pb-4 border-b border-[#C0C0C0]/15">
                <div className="flex items-center gap-2 text-xs font-medium text-white tracking-wide uppercase font-mono">
                  <GraduationCap size={16} className="text-[#FFD600]" />
                  <span>Academic Trajectory</span>
                </div>
                <span className="text-[10px] font-mono text-[#FFD600] bg-[#FFD600]/10 px-2.5 py-0.5 rounded-full border border-[#FFD600]/25 font-semibold">
                  CURRENT
                </span>
              </div>

              <div className="space-y-6">
                {/* BE CSE */}
                <div className="relative pl-5 border-l border-[#FFD600]/40">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#FFD600] shadow-[0_0_8px_#FFD600]" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">
                      Bachelor of Engineering in Computer Science
                    </span>
                    <span className="text-xs font-mono text-[#FFD600] font-semibold bg-[#FFD600]/10 px-2 py-0.5 rounded border border-[#FFD600]/20">
                      7.6 CGPA
                    </span>
                  </div>
                  <p className="text-xs text-silver-300 mt-1">Moodlakatte Institute of Technology, Kundapura</p>
                  <p className="text-[11px] text-silver-400">Visvesvaraya Technological University (VTU)</p>
                  <p className="text-[10px] font-mono text-silver-500 mt-1">2023 — Present</p>
                </div>

                {/* PUC */}
                <div className="relative pl-5 border-l border-[#C0C0C0]/20">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-silver-500" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">
                      Pre-University Course (PUC)
                    </span>
                    <span className="text-xs font-mono text-silver-200 font-semibold bg-[#2B2E34] px-2 py-0.5 rounded border border-[#C0C0C0]/15">
                      81.0%
                    </span>
                  </div>
                  <p className="text-xs text-silver-300 mt-1">Excellent PU College, Sunnari</p>
                  <p className="text-[10px] font-mono text-silver-500 mt-1">2020 — 2021</p>
                </div>
              </div>
            </TiltCard>

            {/* Vital Metrics Counters */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Artifacts', val: '06+', isYellow: true },
                { label: 'Competencies', val: '24+', isYellow: false },
                { label: 'Media Track', val: '3 Yrs', isYellow: true },
              ].map((s, idx) => (
                <TiltCard
                  key={idx}
                  maxTilt={8}
                  scale={1.03}
                  className="p-4 text-center hover:border-[#FFD600]/30"
                >
                  <div className={`font-display font-bold text-2xl ${
                    s.isYellow ? 'text-[#FFD600] drop-shadow-[0_0_12px_rgba(255,214,0,0.3)]' : 'text-white'
                  }`}>
                    {s.val}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-silver-400 mt-1 font-mono">
                    {s.label}
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* Career Aspiration Card */}
            <TiltCard
              maxTilt={4}
              scale={1.01}
              className="p-6 bg-gradient-to-br from-[#FFD600]/05 via-transparent to-transparent hover:border-[#FFD600]/30"
            >
              <div className="text-[11px] tracking-wider text-[#FFD600] uppercase font-semibold mb-2 flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                <span>Professional Objective</span>
              </div>
              <p className="text-xs text-silver-300 leading-relaxed font-normal">
                Seeking ambitious software engineering, AI development, and creative technology opportunities to build robust systems and solve real-world problems with elegance.
              </p>
            </TiltCard>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
