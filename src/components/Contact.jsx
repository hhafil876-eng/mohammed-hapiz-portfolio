import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, MapPin, CheckCircle2, AlertCircle, Mail, MessageSquare, Copy, Check, ArrowUpRight, Send, Code } from 'lucide-react'
import TiltCard from './TiltCard'
import { cyberAudio } from '../utils/audio'

const CHANNELS = [
  {
    icon: Linkedin,
    label: 'LinkedIn Network',
    value: 'Mohammad Hapiz',
    sub: 'Professional connections & trajectory',
    href: 'https://www.linkedin.com/in/mohammad-hapiz-4a692429a/',
  },
  {
    icon: Github,
    label: 'GitHub Repositories',
    value: 'hhafil876-eng',
    sub: 'Source code, projects & open source',
    href: 'https://github.com/hhafil876-eng',
  },
  {
    icon: Code,
    label: 'LeetCode Profile',
    value: 'hafiz876',
    sub: 'Data structures & problem solving',
    href: 'https://leetcode.com/u/hafiz876',
  },
  {
    icon: Mail,
    label: 'Direct Email',
    value: 'hhafil876@gmail.com',
    sub: 'Primary vector for direct communications',
    href: 'mailto:hhafil876@gmail.com',
  },
  {
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
    cyberAudio.playClick()

    // Bot honeypot detection
    if (form._honey) {
      console.warn('Spam submission detected and dropped.')
      setSent(true)
      return
    }

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setTransmitting(true)
    setSubmissionError(null)

    try {
      // Real FormSubmit AJAX Endpoint with JSON payload
      const res = await fetch('https://formsubmit.co/ajax/hhafil876@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: `Portfolio Inquiry from ${form.name.trim()}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && (data?.success === 'true' || data?.success === true)) {
        setSent(true)
        cyberAudio.playTransmit()
      } else if (data?.message && data.message.toLowerCase().includes('activation')) {
        setSubmissionError(
          'Activation link dispatched to hhafil876@gmail.com. Please click "Activate Form" in that email once to finalize incoming routing.'
        )
      } else {
        throw new Error(data?.message || `HTTP ${res.status}: Submission failed`)
      }
    } catch (err) {
      console.warn('Direct delivery encountered a network barrier:', err)
      setSubmissionError(
        'Direct transmission encountered an obstacle. You can transmit immediately via your native email client or copy the pre-filled message below.'
      )
    } finally {
      setTransmitting(false)
    }
  }

  const copyEmail = () => {
    cyberAudio.playClick()
    navigator.clipboard.writeText('hhafil876@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const copyMessageDraft = () => {
    cyberAudio.playClick()
    const draft = `Name: ${form.name.trim() || 'Portfolio Inquirer'}\nEmail: ${form.email.trim() || 'N/A'}\n\nMessage:\n${form.message.trim()}`
    navigator.clipboard.writeText(draft)
    setCopiedDraft(true)
    setTimeout(() => setCopiedDraft(false), 2400)
  }

  const mailtoUrl = `mailto:hhafil876@gmail.com?subject=${encodeURIComponent(
    `Portfolio Inquiry: ${form.name.trim() || 'Professional Connection'}`
  )}&body=${encodeURIComponent(
    `Hello Mohammed,\n\n${form.message.trim() || 'I came across your portfolio and would like to connect.'}\n\nBest regards,\n${form.name.trim() || 'Inquirer'}\nEmail: ${form.email.trim() || 'N/A'}`
  )}`

  return (
    <div className="section-padding relative px-6 sm:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#a3e635]" />
            <span className="text-gray-300">Direct Inquiries // <span className="text-lime-400 font-semibold">Priority Dispatch</span></span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            Initiate <span className="lime-text-gradient">Collaboration</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-normal">
            Open for software engineering opportunities, AI development, full-stack projects, and creative media leadership.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct channels (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 space-y-4"
          >
            {CHANNELS.map((ch) => {
              const Icon = ch.icon
              return (
                <TiltCard
                  key={ch.label}
                  maxTilt={4}
                  scale={1.01}
                  className="p-5 sm:p-6 hover:border-lime-400/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                      <Icon size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-gray-400 tracking-wider uppercase font-medium block mb-0.5">
                        {ch.label}
                      </span>

                      {ch.href ? (
                        <a
                          href={ch.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => cyberAudio.playClick()}
                          className="font-display font-semibold text-sm text-white hover:text-lime-300 transition-colors block truncate"
                        >
                          {ch.value} ↗
                        </a>
                      ) : (
                        <div className="font-medium text-xs text-white truncate">
                          {ch.value}
                        </div>
                      )}

                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {ch.sub}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              )
            })}

            {/* Quick Copy Email Card */}
            <div
              onClick={copyEmail}
              onMouseEnter={() => cyberAudio.playHover()}
              className="ui-card p-5 border-white/10 hover:border-lime-400/40 flex items-center justify-between cursor-pointer group transition-all"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') copyEmail() }}
              aria-label="Copy direct email address to clipboard"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                    Fast Clipboard Copy
                  </div>
                  <div className="text-xs font-mono text-white group-hover:text-lime-300 transition-colors">
                    hhafil876@gmail.com
                  </div>
                </div>
              </div>

              {copied ? (
                <span className="text-[11px] font-mono text-lime-400 flex items-center gap-1 font-semibold">
                  <Check size={13} /> Copied
                </span>
              ) : (
                <Copy size={15} className="text-gray-400 group-hover:text-lime-400 transition-colors" />
              )}
            </div>

            {/* Availability Dossier */}
            <div className="ui-card p-6 border-white/10 bg-gradient-to-br from-lime-500/5 via-transparent to-transparent">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
                <span className="text-xs font-semibold text-white tracking-wide uppercase">
                  Status: Available for Roles
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-normal">
                Currently actively exploring software engineering, full-stack, and generative AI opportunities.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Luxury Inquiry Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7"
          >
            <TiltCard
              maxTilt={3}
              scale={1.005}
              className="p-8 sm:p-10 hover:border-lime-400/30"
            >
              {sent ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-4" role="status" aria-live="polite">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-16 h-16 rounded-full bg-lime-500/10 border border-lime-400/50 flex items-center justify-center text-white shadow-[0_0_25px_rgba(163,230,53,0.3)]"
                  >
                    <CheckCircle2 size={32} className="text-lime-400" />
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md leading-relaxed">
                    Thank you for reaching out, <span className="text-lime-300 font-semibold">{form.name}</span>. Your message has been routed to Mohammed's primary inbox. A direct reply will be sent to <span className="text-white font-mono">{form.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      cyberAudio.playClick()
                      setSent(false)
                      setForm({ name: '', email: '', message: '', _honey: '' })
                      setErrors({})
                    }}
                    className="mt-4 ui-btn-secondary px-6 py-2.5 text-xs tracking-wider uppercase cursor-pointer hover:border-lime-400/40"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6" noValidate>
                  {/* Hidden Anti-Spam Honeypot */}
                  <input
                    type="text"
                    name="_honey"
                    value={form._honey}
                    onChange={onChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className="text-lime-400" />
                      <span className="text-xs font-semibold text-white tracking-wide uppercase">
                        Inquiry Portal
                      </span>
                    </div>
                    <span className="text-[11px] text-lime-400 font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                      SECURE SUBMISSION
                    </span>
                  </div>

                  {/* Submission Error Banner with Native Fallback */}
                  {submissionError && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200" role="alert">
                      <AlertCircle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-2">
                        <p>{submissionError}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a
                            href={mailtoUrl}
                            onClick={() => cyberAudio.playClick()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-medium text-xs transition-colors"
                          >
                            <Mail size={13} />
                            <span>Launch Email Client</span>
                          </a>
                          <button
                            type="button"
                            onClick={copyMessageDraft}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 font-medium text-xs transition-colors cursor-pointer"
                          >
                            {copiedDraft ? <Check size={13} className="text-lime-400" /> : <Copy size={13} />}
                            <span>{copiedDraft ? 'Draft Copied' : 'Copy Message Draft'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                      Your Name / Organization <span className="text-lime-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onFocus={() => cyberAudio.playHover()}
                      onChange={onChange}
                      placeholder="Jane Doe or Acme Corp"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full bg-white/[0.02] border rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all font-sans ${
                        errors.name ? 'border-red-400/60 focus:border-red-400' : 'border-white/10 focus:border-lime-400/50'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1" role="alert">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                      Email Address <span className="text-lime-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onFocus={() => cyberAudio.playHover()}
                      onChange={onChange}
                      placeholder="name@company.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full bg-white/[0.02] border rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all font-sans ${
                        errors.email ? 'border-red-400/60 focus:border-red-400' : 'border-white/10 focus:border-lime-400/50'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1" role="alert">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-2">
                      Project Scope &amp; Inquiry <span className="text-lime-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onFocus={() => cyberAudio.playHover()}
                      onChange={onChange}
                      placeholder="Describe your project, timeline, open role, or technical collaboration..."
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full bg-white/[0.02] border rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all resize-none font-sans ${
                        errors.message ? 'border-red-400/60 focus:border-red-400' : 'border-white/10 focus:border-lime-400/50'
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1" role="alert">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submission Controls */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={transmitting}
                      onMouseEnter={() => cyberAudio.playHover()}
                      className="w-full ui-btn-primary py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:bg-lime-300 shadow-[0_4px_20px_rgba(163,230,53,0.35)]"
                    >
                      {transmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Inquiry...</span>
                        </span>
                      ) : (
                        <>
                          <span>Transmit Inquiry</span>
                          <ArrowUpRight size={15} />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between pt-2 text-[11px] text-gray-400">
                      <span>Prefer your native email app?</span>
                      <a
                        href={mailtoUrl}
                        onClick={() => cyberAudio.playClick()}
                        className="text-lime-400 hover:text-lime-300 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Mail size={12} />
                        <span>Open mailto: client</span>
                      </a>
                    </div>
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
