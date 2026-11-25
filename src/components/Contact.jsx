import { validateInquiry } from '../utils/inquiry'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin, Github, MapPin, CheckCircle2, AlertCircle, Mail, Copy, Check, ArrowUpRight, Send, Code } from 'lucide-react'
import { cyberAudio } from '../utils/audio'

const CHANNELS = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Mohammad Hapiz',
    href: 'https://www.linkedin.com/in/mohammad-hapiz-4a692429a/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'hhafil876-eng',
    href: 'https://github.com/hhafil876-eng',
  },
  {
    icon: Code,
    label: 'LeetCode',
    value: 'hafiz876',
    href: 'https://leetcode.com/u/hafiz876',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hhafil876@gmail.com',
    href: 'mailto:hhafil876@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kundapura, Karnataka · Remote Ready',
    href: null,
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '', _honey: '' })
  const [errors, setErrors] = useState({})
  const [transmitting, setTransmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [submissionError, setSubmissionError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState('')

  const pending = useRef(null)
  const feedback = useRef(null)
  useEffect(() => () => pending.current?.abort(), [])
  useEffect(() => { feedback.current?.focus() }, [sent, submissionError])

  const validate = () => validateInquiry(form).errors

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
    if (submissionError) setSubmissionError(null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (pending.current) return
    cyberAudio.playClick()
    if (form._honey) { setSubmissionError('Unable to process this submission.'); return }

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST', signal: controller.signal,
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validateInquiry(form).fields, _honey: form._honey }),
      })
      const data = await response.json().catch(() => null)
      if (response.ok && data?.success === true) {
        setSent(true)
        setForm({ name: '', email: '', message: '', _honey: '' })
        cyberAudio.playTransmit?.()
      } else {
        if (data?.errors) setErrors(data.errors)
        setSubmissionError(data?.message || 'The server did not confirm acceptance. Please retry or open your email app.')
      }
    } catch {
      setSubmissionError(controller.signal.aborted ? 'Request timed out. Please try again or use the email link.' : 'Network error. Check your connection or use the email link below.')
    } finally {
      clearTimeout(timeout)
      pending.current = null
      setTransmitting(false)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hhafil876@gmail.com')
      setCopied(true); setCopyError('')
      setTimeout(() => setCopied(false), 2400)
    } catch { setCopyError('Copy unavailable. Select the email address above to copy it.') }
  }

  const mailtoLink = `mailto:hhafil876@gmail.com?subject=${encodeURIComponent(`Portfolio Inquiry from ${form.name || 'Prospective Partner'}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`

  return (
    <section ref={sectionRef} className="contact-monumental" aria-label="Contact and Collaboration">

      {/* ── MONUMENTAL BACKDROP COMPOSITION ── */}
      <div className="contact-backdrop" aria-hidden="true">
        <div className="contact-backdrop-text">CONTACT</div>
        <div className="contact-fissure-line" />
      </div>

      {/* ── HEADER ── */}
      <motion.div
        className="contact-header"
        initial={false}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-eyebrow">System 06 — Final Eclipse</span>
        <h2 className="contact-title">
          Initiate <em>Collaboration</em>
        </h2>
        <p className="contact-subtitle">
          Available for engineering roles, AI prototypes, creative technology, and internships.
        </p>
      </motion.div>

      {/* ── MAIN SPLIT ── */}
      <div className="contact-split">

        {/* LEFT: Channels */}
        <motion.div
          className="contact-channels-col"
          initial={false}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="channels-list">
            {CHANNELS.map((ch, i) => {
              const Icon = ch.icon
              const inner = (
                <div
                  className={`channel-item ${ch.href ? 'channel-item-link' : ''}`}
                  onMouseEnter={() => ch.href && cyberAudio.playHover()}
                >
                  <div className="channel-icon-wrap">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">{ch.label}</span>
                    <span className="channel-value">{ch.value}</span>
                  </div>
                  {ch.href && <ArrowUpRight size={14} className="channel-arrow" aria-hidden="true" />}
                </div>
              )
              return ch.href ? (
                <a
                  key={i}
                  href={ch.href}
                  target={ch.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  aria-label={`${ch.label}: ${ch.value}`}
                >
                  {inner}
                </a>
              ) : <div key={i}>{inner}</div>
            })}
          </div>

          {/* Copy email CTA */}
          <button
            onClick={copyEmail}
            onMouseEnter={() => cyberAudio.playHover()}
            className="copy-email-btn"
            aria-label="Copy email address to clipboard"
          >
            {copied
              ? <><Check size={14} /><span>Copied to clipboard</span></>
              : <><Copy size={14} /><span>Copy Email Address</span></>
            }
          </button>
          <p role="status">{copyError}</p>
        </motion.div>

        {/* RIGHT: Form */}
        <motion.div
          className="contact-form-col"
          initial={false}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {sent ? (
            <div ref={feedback} tabIndex={-1} role="status" className="contact-success">
              <div className="success-icon-wrap">
                <CheckCircle2 size={32} className="success-icon" aria-hidden="true" />
              </div>
              <h3 className="success-title">Enquiry Accepted</h3>
              <p className="success-body">Thank you for reaching out. I'll respond as soon as possible.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '', _honey: '' }) }}
                className="contact-submit-btn"
                style={{ marginTop: '1.5rem', maxWidth: '220px' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-busy={transmitting} className="contact-form">

              {/* Honeypot */}
              <input type="text" name="_honey" value={form._honey} onChange={onChange}
                className="hidden" tabIndex="-1" autoComplete="off" aria-hidden="true" />

              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Name / Organization <span className="label-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name or company"
                  disabled={transmitting}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  required
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                />
                {errors.name && <p id="err-name" className="form-error"><AlertCircle size={12} /><span>{errors.name}</span></p>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Email Address <span className="label-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="name@company.com"
                  disabled={transmitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  required
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                />
                {errors.email && <p id="err-email" className="form-error"><AlertCircle size={12} /><span>{errors.email}</span></p>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message &amp; Scope <span className="label-required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Describe the project, role, or collaboration you have in mind..."
                  disabled={transmitting}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  required
                  className={`form-input form-textarea ${errors.message ? 'form-input-error' : ''}`}
                />
                {errors.message && <p id="err-message" className="form-error"><AlertCircle size={12} /><span>{errors.message}</span></p>}
              </div>

              {submissionError && (
                <div ref={feedback} role="alert" tabIndex={-1} className="form-error-banner">
                  <AlertCircle size={15} aria-hidden="true" />
                  <div>
                    <p>{submissionError}</p>
                    <a href={mailtoLink} className="form-fallback-link">Open your email app</a>
                  </div>
                </div>
              )}

              <div className="form-submit-row">
                <a href={mailtoLink} className="form-fallback-link">Open your email app</a>
                <button
                  type="submit"
                  disabled={transmitting}
                  className="contact-submit-btn"
                >
                  {transmitting
                    ? <span>Transmitting…</span>
                    : <><span>{submissionError ? 'Retry' : 'Send Message'}</span><Send size={14} aria-hidden="true" /></>
                  }
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
