import SignalPath from './SignalPath'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, MapPin, CheckCircle2, AlertCircle, Mail, MessageSquare, Copy, Check, ArrowUpRight, Send, Code, Compass } from 'lucide-react'
import TiltCard from './TiltCard'
import { cyberAudio } from '../utils/audio'

const CHANNELS = [
  {
    code: 'VECTOR 01',
    icon: Linkedin,
    label: 'LinkedIn Network',
    value: 'Mohammad Hapiz',
    sub: 'Professional connections & trajectory',
    href: 'https://www.linkedin.com/in/mohammad-hapiz-4a692429a/',
  },
  {
    code: 'VECTOR 02',
    icon: Github,
    label: 'GitHub Repositories',
    value: 'hhafil876-eng',
    sub: 'Source code, projects & open source',
    href: 'https://github.com/hhafil876-eng',
  },
  {
    code: 'VECTOR 03',
    icon: Code,
    label: 'LeetCode Profile',
    value: 'hafiz876',
    sub: 'Data structures & problem solving',
    href: 'https://leetcode.com/u/hafiz876',
  },
  {
    code: 'VECTOR 04',
    icon: Mail,
    label: 'Direct Email',
    value: 'hhafil876@gmail.com',
    sub: 'Primary vector for direct communications',
    href: 'mailto:hhafil876@gmail.com',
  },
  {
    code: 'VECTOR 05',
    icon: MapPin,
    label: 'Location & Availability',
    value: 'Kundapura, Karnataka, India',
    sub: 'Open for remote & on-site opportunities',
    href: null,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', _honey: '' })
  const [errors, setErrors] = useState({})
  const [transmitting, setTransmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [submissionError, setSubmissionError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [copiedDraft, setCopiedDraft] = useState(false)

  const pending = useRef(null)
  const feedback = useRef(null)
  useEffect(() => () => pending.current?.abort(), [])
  useEffect(() => { feedback.current?.focus() }, [sent, submissionError])

  const validate = () => {
    const errs = {}
    const trimmedName = form.name.trim()
    const trimmedEmail = form.email.trim()
    const trimmedMsg = form.message.trim()

    if (!trimmedName || trimmedName.length < 2) {
      errs.name = 'Please provide your name or organization (minimum 2 characters).'
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!trimmedMsg || trimmedMsg.length < 10) {
      errs.message = 'Please provide inquiry details (minimum 10 characters).'
    }
    return errs
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
    if (submissionError) {
      setSubmissionError(null)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (pending.current) return
    cyberAudio.playClick()

    // Bot honeypot detection
    if (form._honey) {
      setSubmissionError('Unable to accept this submission. Use the email option below.')
      return
    }

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      e.currentTarget.elements[Object.keys(validationErrors)[0]].focus()
      return
    }

    const controller = new AbortController()
    pending.current = controller
    const timeout = setTimeout(() => controller.abort(), 20000)
    setTransmitting(true)
    setSubmissionError(null)
    const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
    const subject = 'Portfolio Inquiry from ' + form.name.trim()
    const fields = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }
    try {
      const response = await fetch(key ? 'https://api.web3forms.com/submit' : 'https://formsubmit.co/ajax/hhafil876@gmail.com', {
        method: 'POST',
        signal: controller.signal,
        headers: { Accept: 'application/json' },
        body: new URLSearchParams({
          ...fields,
          ...(key ? { access_key: key, subject, replyto: fields.email } : { _subject: subject, _template: 'table', _captcha: 'false' }),
        }),
      })
      const data = await response.json().catch(() => null)
      const reason = typeof data?.message === 'string' ? data.message : ''
      if (/activat|confirm your email/i.test(reason)) {
        setSubmissionError('The mailbox requires activation. Please use the email option below.')
      } else if (response.ok && (data?.success === true || data?.success === 'true')) {
        setSent(true)
        cyberAudio.playTransmit()
      } else {
        setSubmissionError(reason || (response.ok ? 'The provider returned an unrecognized confirmation.' :
          'The email service returned HTTP ' + response.status + '. Please try again later.'))
      }
    } catch {
      setSubmissionError(controller.signal.aborted ? 'The service timed out. Delivery is unconfirmed. Your draft is saved here.' :
        'The browser could not confirm a response from the email service. Check your connection or use the email option below.')
    } finally {
      clearTimeout(timeout)
      pending.current = null
      setTransmitting(false)
    }
  }

  const copyEmail = () => {
    cyberAudio.playClick()
    navigator.clipboard.writeText('hhafil876@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const copyDraft = () => {
    cyberAudio.playClick()
    const draft = `Subject: Portfolio Inquiry - ${form.name || 'Collaboration'}\n\nFrom: ${form.name || 'Colleague'} (${form.email || 'No email provided'})\n\nMessage:\n${form.message || 'I would like to connect regarding an engineering opportunity.'}`
    navigator.clipboard.writeText(draft)
    setCopiedDraft(true)
    setTimeout(() => setCopiedDraft(false), 2400)
  }

  const mailtoLink = `mailto:hhafil876@gmail.com?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${form.name || 'Prospective Partner'}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
  )}`

  return (
    <div className="section-padding relative px-6 sm:px-12 overflow-hidden">
      {/* ─── THE FINAL ECLIPSE: CELESTIAL PORTAL GEOMETRY ─── */}
      <div className="absolute right-0 bottom-10 w-[700px] h-[700px] rounded-full border border-[#FFD600]/[0.05] pointer-events-none" />
      <div className="absolute right-10 bottom-20 w-[540px] h-[540px] rounded-full border border-dashed border-[#C0C0C0]/[0.04] pointer-events-none animate-orbit-slow" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header — The Final Eclipse */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <SignalPath />
            <span className="text-[11px] font-medium tracking-[0.22em] text-[#FFD600] uppercase font-mono">
              System 06 // The Final Eclipse &amp; Portal
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            Initiate <span className="yellow-text-gradient">Collaboration</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Inbound Channels (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Obsidian Orientation Slate */}
            <div className="p-7 rounded-3xl bg-[#101114]/90 border border-[#C0C0C0]/20 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.8)] mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#FFD600]" />
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Let's Build Something Exceptional
              </h3>
              <p className="text-xs sm:text-sm text-silver-300 leading-relaxed font-normal">
                Available for full-time software engineering roles, technical internships, AI system prototypes, and creative technology engagements.
              </p>
            </div>

            {/* Channels List — Obsidian Slabs */}
            <div className="space-y-3">
              {CHANNELS.map((ch, idx) => {
                const Icon = ch.icon
                const isActionable = Boolean(ch.href)

                const content = (
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#101114]/80 border border-[#C0C0C0]/15 hover:border-[#FFD600]/40 transition-all group relative overflow-hidden">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#090A0C] border border-[#C0C0C0]/20 flex items-center justify-center text-[#FFD600] group-hover:scale-105 group-hover:border-[#FFD600]/40 transition-all flex-shrink-0 shadow-sm">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-mono text-silver-500 tracking-wider">
                          //{ch.code} · {ch.label}
                        </div>
                        <div className="text-sm font-semibold text-white group-hover:text-[#FFE45C] transition-colors">
                          {ch.value}
                        </div>
                        <div className="text-[11px] text-silver-400">
                          {ch.sub}
                        </div>
                      </div>
                    </div>

                    {isActionable && (
                      <ArrowUpRight size={15} className="text-silver-500 group-hover:text-[#FFD600] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                    )}
                  </div>
                )

                if (isActionable) {
                  return (
                    <a
                      key={idx}
                      href={ch.href}
                      target={ch.href.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={() => cyberAudio.playClick()}
                      onMouseEnter={() => cyberAudio.playHover()}
                      className="block cursor-pointer"
                    >
                      {content}
                    </a>
                  )
                }

                return <div key={idx}>{content}</div>
              })}
            </div>

            {/* Quick Copy Email Button */}
            <div className="pt-2">
              <button
                onClick={copyEmail}
                onMouseEnter={() => cyberAudio.playHover()}
                className="w-full py-3.5 rounded-2xl bg-[#101114]/90 border border-[#C0C0C0]/20 hover:border-[#FFD600]/50 text-silver-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[#FFD600]" />
                    <span className="text-[#FFD600]">hhafil876@gmail.com Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-silver-400" />
                    <span>Copy hhafil876@gmail.com</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form & Message Dispatch (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <TiltCard
              maxTilt={3}
              scale={1.008}
              className="p-8 sm:p-10 hover:border-[#FFD600]/30 relative overflow-hidden"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFD600]/35 rounded-tr-xl pointer-events-none" />

              {sent ? (
                <div ref={feedback} tabIndex={-1} role="status" className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#FFD600]/15 border border-[#FFD600]/40 text-[#FFD600] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,214,0,0.3)]">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-sm text-silver-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. The email service accepted your inquiry.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', email: '', message: '', _honey: '' })
                    }}
                    className="ui-btn-secondary px-6 py-2.5 text-xs rounded-full cursor-pointer mt-4"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form aria-busy={transmitting} onSubmit={onSubmit} noValidate className="space-y-6">
                  {/* Honeypot for spam bot mitigation */}
                  <input
                    type="text"
                    name="_honey"
                    value={form._honey}
                    onChange={onChange}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name Input */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                      Your Name or Organization <span className="text-[#FFD600]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      disabled={transmitting} aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="e.g. Elena Rostova / Google Recruiter"
                      required
                      className={`w-full bg-[#090A0C]/90 border rounded-2xl px-4 py-3.5 text-sm text-white placeholder-silver-600 focus:outline-none transition-all ${
                        errors.name ? 'border-red-500/80 focus:ring-1 focus:ring-red-500' : 'border-[#C0C0C0]/20 focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600]'
                      }`}
                    />
                    {errors.name && (
                      <p id="error-name" className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-mono">
                        <AlertCircle size={12} />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                      Email Address <span className="text-[#FFD600]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      disabled={transmitting} aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="name@company.com"
                      required
                      className={`w-full bg-[#090A0C]/90 border rounded-2xl px-4 py-3.5 text-sm text-white placeholder-silver-600 focus:outline-none transition-all ${
                        errors.email ? 'border-red-500/80 focus:ring-1 focus:ring-red-500' : 'border-[#C0C0C0]/20 focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600]'
                      }`}
                    />
                    {errors.email && (
                      <p id="error-email" className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-mono">
                        <AlertCircle size={12} />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                      Inquiry Details &amp; Project Scope <span className="text-[#FFD600]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      disabled={transmitting} aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      placeholder="Discuss an open engineering role, freelance project, architectural problem, or collaboration..."
                      required
                      className={`w-full bg-[#090A0C]/90 border rounded-2xl px-4 py-3.5 text-sm text-white placeholder-silver-600 focus:outline-none transition-all resize-none ${
                        errors.message ? 'border-red-500/80 focus:ring-1 focus:ring-red-500' : 'border-[#C0C0C0]/20 focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600]'
                      }`}
                    />
                    {errors.message && (
                      <p id="error-message" className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-mono">
                        <AlertCircle size={12} />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submission Error Banner & Graceful Fallbacks */}
                  {submissionError && (
                    <div ref={feedback} role="alert" tabIndex={-1} className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 text-xs text-red-300 space-y-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{submissionError}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-red-500/20">
                        <a
                          href={mailtoLink}
                          className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-[#FFD600] transition-colors"
                        >
                          <Send size={12} />
                          <span>Send via Email Client</span>
                        </a>

                        <button
                          type="button"
                          onClick={copyDraft}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                        >
                          {copiedDraft ? (
                            <>
                              <Check size={12} className="text-[#FFD600]" />
                              <span>Draft Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy Pre-filled Draft</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Action */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-silver-500 font-mono">
                      Security: SSL Encrypted · Direct Routing
                    </span>

                    <button
                      type="submit"
                      disabled={transmitting}
                      className="w-full sm:w-auto ui-btn-primary px-8 py-3.5 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-50"
                    >
                      {transmitting ? (
                        <span>Transmitting Data...</span>
                      ) : (
                        <>
                          <span>{submissionError ? 'Retry submission' : 'Transmit Message'}</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
