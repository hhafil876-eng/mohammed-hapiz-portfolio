import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, ExternalLink, Github, CheckCircle2, Shield, Wrench, Layers, Sparkles } from 'lucide-react'
import ProjectVisualPreview from './ProjectVisualPreview'
import { cyberAudio } from '../utils/audio'
import { modalBackdrop, modalContent, transitions } from '../utils/motionVariants'

export default function ProjectModal({ project, onClose, triggerRef }) {
  const modalRef = useRef(null)

  // 1. Background Scroll Lock with Layout Shift Prevention
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      // Restore focus to triggering card upon dismissal
      if (triggerRef?.current) {
        triggerRef.current.focus()
      }
    }
  }, [triggerRef])

  // 2. Keyboard Accessibility: Focus Trap and Escape Key
  useEffect(() => {
    const modalEl = modalRef.current
    if (!modalEl) return

    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusableElements = Array.from(modalEl.querySelectorAll(focusableSelectors))
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Initial focus on close button or modal container
    if (firstElement) {
      firstElement.focus()
    } else {
      modalEl.focus()
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        cyberAudio.playClick()
        onClose()
        return
      }

      if (e.key === 'Tab') {
        if (focusableElements.length === 0) {
          e.preventDefault()
          return
        }

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !modalEl.contains(document.activeElement)) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement || !modalEl.contains(document.activeElement)) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      aria-describedby="modal-project-desc"
    >
      {/* ─── DARK GRAPHITE BACKDROP WITH CONTROLLED BLUR ─── */}
      <motion.div
        variants={modalBackdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={() => {
          cyberAudio.playClick()
          onClose()
        }}
        className="fixed inset-0 bg-[#0F1013]/85 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* ─── MODAL CASE STUDY VIEWER ─── */}
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        variants={modalContent}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-2xl bg-[#2B2E34]/95 border border-[#C0C0C0]/25 rounded-3xl p-6 sm:p-9 shadow-[0_25px_70px_rgba(15,16,19,0.95)] z-10 overflow-hidden max-h-[90vh] overflow-y-auto focus:outline-none"
      >
        {/* Subtle Top Electric Yellow Accent Border Line */}
        <div className="modal-trace absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD600] to-transparent opacity-80" />

        {/* ─── TOP HEADER BAR ─── */}
        <div className="flex items-start justify-between gap-4 border-b border-[#C0C0C0]/15 pb-5 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] text-[#FFD600] font-mono tracking-wider uppercase font-semibold">
                Case Study // {project.num}
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#FFD600]/12 border border-[#FFD600]/30 text-[#FFD600] text-[10px] tracking-wider uppercase font-medium">
                {project.badge}
              </span>
              {project.status && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#17191D]/80 border border-[#C0C0C0]/20 text-silver-300 text-[10px] font-mono">
                  STATUS: {project.status}
                </span>
              )}
            </div>
            <h3
              id="modal-project-title"
              className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight"
            >
              {project.title}
            </h3>
            <p className="text-xs text-silver-400 mt-1 font-sans">
              {project.category}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              cyberAudio.playClick()
              onClose()
            }}
            aria-label="Close project case study"
            className="w-9 h-9 rounded-full bg-[#17191D]/80 border border-[#C0C0C0]/20 hover:border-[#FFD600] flex items-center justify-center text-silver-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* ─── VISUAL TELEMETRY & SYSTEM PREVIEW ─── */}
        <div className="mb-6">
          <ProjectVisualPreview project={project} isExpanded={true} />
        </div>

        {/* ─── PROBLEM & SOLUTION BREAKDOWN ─── */}
        <div className="space-y-5 mb-6">
          <div>
            <h4 className="text-xs font-semibold text-[#FFD600] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Shield size={13} className="text-[#FFD600]" />
              <span>The Engineering Challenge & Context</span>
            </h4>
            <p
              id="modal-project-desc"
              className="text-silver-200 text-xs sm:text-sm leading-relaxed font-normal bg-[#17191D]/60 p-3.5 rounded-xl border border-[#C0C0C0]/10"
            >
              {project.problem || project.desc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#FFD600] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers size={13} className="text-[#FFD600]" />
              <span>Engineered Solution & Architecture</span>
            </h4>
            <p className="text-silver-200 text-xs sm:text-sm leading-relaxed font-normal bg-[#17191D]/60 p-3.5 rounded-xl border border-[#C0C0C0]/10">
              {project.solution}
            </p>
          </div>

          {project.contribution && (
            <div>
              <h4 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wrench size={13} className="text-silver-400" />
                <span>Personal Role & Contributions</span>
              </h4>
              <p className="text-silver-200 text-xs sm:text-sm leading-relaxed font-normal bg-[#17191D]/60 p-3.5 rounded-xl border border-[#C0C0C0]/10">
                {project.contribution}
              </p>
            </div>
          )}
        </div>

        {/* ─── CORE CAPABILITIES & SYSTEM FEATURES ─── */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-[#FFD600] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles size={13} />
            <span>Core Capabilities & System Features</span>
          </h4>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {project.features?.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#17191D]/50 border border-[#C0C0C0]/10 text-xs text-silver-200"
              >
                <CheckCircle2 size={14} className="text-[#FFD600] flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── INTEGRATED TECHNOLOGIES ─── */}
        <div className="mb-8">
          <h4 className="text-xs font-semibold text-silver-400 uppercase tracking-wider mb-2.5">
            Technology Stack & Toolchain
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-[#17191D]/70 border border-[#C0C0C0]/20 text-silver-200 text-xs tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ─── FOOTER CONTROLS ─── */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-5 border-t border-[#C0C0C0]/15">
          <button
            onClick={() => {
              cyberAudio.playClick()
              onClose()
            }}
            className="px-5 py-2.5 rounded-full border border-[#C0C0C0]/25 hover:border-[#C0C0C0] text-silver-300 hover:text-white text-xs tracking-wide transition-all cursor-pointer bg-[#17191D]/60"
          >
            Close Dossier
          </button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="ui-btn-secondary px-5 py-2.5 flex items-center gap-2 text-xs tracking-wide rounded-full cursor-pointer hover:border-[#FFD600]/50"
            >
              <Github size={14} />
              <span>{project.sourceLabel || 'Source Code'}</span>
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="ui-btn-primary px-6 py-2.5 flex items-center gap-2 text-xs tracking-wide rounded-full cursor-pointer hover:bg-yellow-hover"
            >
              <span>{project.demoLabel || (project.isPrototype ? 'Inspect Prototype' : 'Launch Live Demo')}</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  )
}
