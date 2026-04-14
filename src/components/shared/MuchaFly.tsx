'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

// Custom SVG fly — top-down view, geometric/cute
function FlySvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      {/* Body */}
      <ellipse cx="16" cy="16" rx="3.5" ry="6" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="0.8"/>
      {/* Head */}
      <circle cx="16" cy="9" r="3" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="0.8"/>
      {/* Eyes */}
      <circle cx="14.5" cy="8.5" r="1.2" fill="#60a5fa"/>
      <circle cx="17.5" cy="8.5" r="1.2" fill="#60a5fa"/>
      {/* Left wings */}
      <ellipse cx="10" cy="14" rx="5.5" ry="3" fill="rgba(59,130,246,0.25)" stroke="rgba(59,130,246,0.5)" strokeWidth="0.6" transform="rotate(-20 10 14)"/>
      <ellipse cx="9" cy="18" rx="4" ry="2" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.4)" strokeWidth="0.6" transform="rotate(-15 9 18)"/>
      {/* Right wings */}
      <ellipse cx="22" cy="14" rx="5.5" ry="3" fill="rgba(59,130,246,0.25)" stroke="rgba(59,130,246,0.5)" strokeWidth="0.6" transform="rotate(20 22 14)"/>
      <ellipse cx="23" cy="18" rx="4" ry="2" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.4)" strokeWidth="0.6" transform="rotate(15 23 18)"/>
      {/* Legs */}
      <line x1="13" y1="19" x2="9" y2="24" stroke="#3b82f6" strokeWidth="0.7" strokeLinecap="round"/>
      <line x1="14.5" y1="21" x2="11" y2="26" stroke="#3b82f6" strokeWidth="0.7" strokeLinecap="round"/>
      <line x1="19" y1="19" x2="23" y2="24" stroke="#3b82f6" strokeWidth="0.7" strokeLinecap="round"/>
      <line x1="17.5" y1="21" x2="21" y2="26" stroke="#3b82f6" strokeWidth="0.7" strokeLinecap="round"/>
    </svg>
  )
}

export default function MuchaFly() {
  const controls = useAnimation()
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const timer = setTimeout(() => {
      const startX = Math.random() * (window.innerWidth - 100) + 50
      const startY = Math.random() * 200 + 50
      setPos({ x: startX, y: startY })
      setVisible(true)

      // Fly a random zigzag path then disappear
      const points = Array.from({ length: 8 }, () => ({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight * 0.4),
      }))

      controls.start({
        x: points.map(p => p.x),
        y: points.map(p => p.y),
        rotate: [0, 15, -20, 10, -15, 5, -10, 0],
        transition: {
          duration: 12,
          ease: 'easeInOut',
          times: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        },
      }).then(() => setVisible(false))
    }, 5000)

    return () => clearTimeout(timer)
  }, [controls])

  if (!visible) return null

  return (
    <motion.div
      animate={controls}
      initial={{ x: pos.x, y: pos.y, opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        opacity: 0.7,
        filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.4))',
      }}
      whileInView={{ opacity: 0.7 }}
      transition={{ opacity: { duration: 0.5 } }}
    >
      {/* Wing flutter animation */}
      <motion.div
        animate={{ scaleX: [1, 1.15, 0.85, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlySvg />
      </motion.div>
    </motion.div>
  )
}
