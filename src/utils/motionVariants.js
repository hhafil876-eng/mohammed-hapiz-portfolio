/**
 * Reusable Cinematic Animation System for Mohammed Hapiz Portfolio 2.0
 * GPU-accelerated transforms, refined springs, and reduced-motion compliant easings.
 */

export const transitions = {
  spring: {
    type: 'spring',
    stiffness: 320,
    damping: 28,
    mass: 0.8,
  },
  smooth: {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1], // Cubic bezier for executive snappy deceleration
  },
  fast: {
    duration: 0.3,
    ease: [0.16, 1, 0.3, 1],
  },
  modal: {
    duration: 0.38,
    ease: [0.16, 1, 0.3, 1],
  },
}

export const heroEntrance = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export const textReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const cardVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

export const modalContent = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: {
      duration: 0.24,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const filterTabTransition = {
  type: 'spring',
  stiffness: 350,
  damping: 28,
}
