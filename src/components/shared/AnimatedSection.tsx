'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
  delay?: number
}

export default function AnimatedSection({
  children,
  className,
  direction = 'up',
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  // Skip all animations when user prefers reduced motion
  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 40 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{
        duration: 0.7,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
