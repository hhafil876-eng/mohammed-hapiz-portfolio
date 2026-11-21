import { motion } from 'framer-motion'

export default function SignalPath() {
  return (
    <span aria-hidden="true" className="signal-path">
      <motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: .8, ease: 'easeOut' }} />
    </span>
  )
}
