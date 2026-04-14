'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

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
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // No animation — reduced motion or SSR fallback
  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  // Touch devices: fade only (no translate — avoids compositor work)
  if (isTouch) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    )
  }

  // Desktop: full directional animation
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
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
