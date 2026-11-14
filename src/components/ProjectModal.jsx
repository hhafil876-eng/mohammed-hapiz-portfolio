import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, CheckCircle2, Shield, Wrench, Layers } from 'lucide-react'
import ProjectVisualPreview from './ProjectVisualPreview'
import { cyberAudio } from '../utils/audio'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Luxury Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            cyberAudio.playClick()
            onClose()
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-obsidian-900/95 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Top Header Bar */}
          <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] text-lime-400 font-mono tracking-wider uppercase">
                  Case Study // {project.num}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-300 text-[10px] tracking-wider uppercase font-medium">
                  {project.badge}
                </span>
                {project.status && (
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 text-[10px] font-mono">
                    STATUS: {project.status}
                  </span>
                )}
              </div>
              <h3 id="modal-project-title" className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                {project.category}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                cyberAudio.playClick()
                onClose()
              }}
              aria-label="Close project details"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-lime-400/40 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* High-Fidelity Expanded Visual Preview & Live Telemetry */}
          <div className="mb-6">
            <ProjectVisualPreview project={project} isExpanded={true} />
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="space-y-5 mb-6">
            <div>
              <h4 className="text-xs font-semibold text-lime-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Shield size={13} />
                <span>The Challenge &amp; Problem</span>
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-normal bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.04]">
                {project.problem || project.desc}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-lime-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers size={13} />
                <span>Engineered Solution &amp; Architecture</span>
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-normal bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.04]">
                {project.solution}
              </p>
            </div>

            {project.contribution && (
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench size={13} />
                  <span>Personal Role &amp; Contribution</span>
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-normal bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.04]">
                  {project.contribution}
                </p>
              </div>
            )}
          </div>

          {/* Key Features Breakdown */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-lime-400 uppercase tracking-wider mb-3">
              Core Capabilities &amp; System Features
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {project.features?.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-gray-200"
                >
                  <CheckCircle2 size={14} className="text-lime-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Technologies */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              Technologies &amp; Ecosystem
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech?.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-gray-200 text-xs tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-5 border-t border-white/[0.08]">
            <button
              onClick={() => {
                cyberAudio.playClick()
                onClose()
              }}
              className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-gray-300 text-xs tracking-wide transition-all cursor-pointer"
            >
              Close Dossier
            </button>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="ui-btn-secondary px-5 py-2.5 flex items-center gap-2 text-xs tracking-wide rounded-full cursor-pointer hover:border-lime-400/40"
              >
                <Github size={14} />
                <span>Source Code</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="ui-btn-primary px-6 py-2.5 flex items-center gap-2 text-xs tracking-wide rounded-full cursor-pointer hover:bg-lime-300 shadow-[0_2px_15px_rgba(163,230,53,0.35)]"
              >
                <span>{project.isPrototype ? 'View Prototype' : 'Launch Live Demo'}</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
