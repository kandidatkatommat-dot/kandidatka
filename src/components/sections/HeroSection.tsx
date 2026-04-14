'use client'

import { useEffect, useState, useMemo, useRef, memo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, Mail } from '@/components/shared/Icons'

/* ── Countdown ─────────────────────────────────────────────── */
const VOTE_DATE = new Date('2026-05-12T08:00:00')

function useCountdown() {
  const [mounted, setMounted] = useState(false)
  const [diff, setDiff] = useState(0)
  useEffect(() => {
    setMounted(true)
    setDiff(VOTE_DATE.getTime() - Date.now())
    const id = setInterval(() => setDiff(VOTE_DATE.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  if (!mounted) return { d: 0, h: 0, m: 0, s: 0, mounted: false }
  const total = Math.max(0, diff)
  return {
    d: Math.floor(total / 86400000),
    h: Math.floor((total % 86400000) / 3600000),
    m: Math.floor((total % 3600000) / 60000),
    s: Math.floor((total % 60000) / 1000),
    mounted: true,
  }
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-md" />
        <div className="relative glass rounded-2xl h-[64px] flex items-center justify-center border border-blue-500/15" style={{ width: 'clamp(58px,14vw,76px)' }}>
          <span className="text-[28px] font-bold tabular-nums text-white leading-none" style={{ fontFamily: 'var(--font-cal, inherit)' }}>
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-[10px] text-blue-400/50 uppercase tracking-[0.2em] font-medium">{label}</span>
    </div>
  )
}

/* ── Aurora Mesh background ─────────────────────────────────── */
const AuroraMesh = memo(function AuroraMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Primary orb */}
      <div
        className="absolute top-[-20%] left-[10%] w-[70vw] h-[70vw] rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(59,130,246,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)',
          filter: 'blur(20px)',
          animation: 'aurora 14s ease-in-out infinite',
        }}
      />
      {/* Secondary orb */}
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'aurora 18s ease-in-out infinite reverse',
          animationDelay: '-7s',
        }}
      />
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20" />
    </div>
  )
})

/* ── Floating particles (CSS only, no Three.js needed for fallback) */
interface Particle {
  id: number
  x: number
  y: number
  size: number
  dur: number
  delay: number
  color: string
  opacity: number
}

const FloatingParticles = memo(function FloatingParticles({ particles }: { particles: Particle[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, opacity: p.opacity }}
          animate={{ y: [0, -28, 0], opacity: [p.opacity, p.opacity * 1.6, p.opacity] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
})

/* ── Scroll indicator ─────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.a
      href="#o-nas"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-400/30 hover:text-blue-300/60 transition-colors group"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Scroll down"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Prejdi dolu</span>
      <ChevronDown size={18} />
    </motion.a>
  )
}

/* ── Main variants ──────────────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

/* ── Component ─────────────────────────────────────────────── */
export default function HeroSection() {
  const { d, h, m, s, mounted } = useCountdown()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: (i * 37 + 11) % 100,
        y: (i * 53 + 7) % 90,
        size: (i % 4) + 1.5,
        dur: 6 + (i % 6),
        delay: (i % 10) * 0.35,
        color:
          i % 5 === 0 ? '#4f46e5'
          : i % 5 === 1 ? '#06b6d4'
          : i % 5 === 2 ? '#3b82f6'
          : i % 5 === 3 ? '#8b5cf6'
          : '#60a5fa',
        opacity: 0.15 + (i % 3) * 0.08,
      })),
    []
  )

  return (
    <section ref={sectionRef} className="aurora-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AuroraMesh />
      <FloatingParticles particles={particles} />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full"
      >
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <Badge className="px-5 py-2 text-xs font-semibold glass-sm text-blue-300 border border-blue-500/20 tracking-widest uppercase gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Voľby AS FEI VŠB-TUO · 12.–15. mája 2026
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="mb-6">
            <h1
              className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.88] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-cal, inherit)' }}
            >
              <span className="gradient-text block">Volíme</span>
              <span className="text-white block">FEI 2026</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p variants={item} className="text-lg sm:text-xl font-semibold text-white/70 mb-2 tracking-wide">
            Tomáš Mucha · Martin Buček
          </motion.p>
          <motion.p variants={item} className="text-sm sm:text-base text-blue-300/45 mb-12 max-w-lg mx-auto leading-relaxed">
            Dvaja študenti FEI s reálnym plánom pre Akademický senát.
            <br className="hidden sm:block" />
            Pošli nám, čo ťa trápi — budeme to riešiť.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <a href="#program">
              <Button
                size="lg"
                data-cursor
                className="group relative overflow-hidden bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white border-0 shadow-2xl shadow-[#4f46e5]/25 px-9 py-6 text-base font-bold w-full sm:w-auto transition-all duration-300 hover:scale-[1.04] hover:shadow-[#6d28d9]/40"
              >
                <span className="relative z-10">Náš program →</span>
              </Button>
            </a>
            <a href="#podnety">
              <Button
                size="lg"
                variant="outline"
                data-cursor
                className="border-blue-500/20 bg-white/[0.03] text-blue-200 hover:bg-blue-500/8 hover:border-blue-500/40 backdrop-blur-sm px-9 py-6 text-base font-semibold w-full sm:w-auto transition-all duration-300 hover:scale-[1.02]"
              >
                Pošli podnet <Mail size={15} className="ml-0.5" />
              </Button>
            </a>
          </motion.div>

          {/* Countdown */}
          {mounted && (
            <motion.div variants={item} className="flex flex-col items-center gap-4">
              <p className="text-[11px] text-blue-400/40 uppercase tracking-[0.25em] font-medium">
                Do začiatku hlasovania zostáva
              </p>
              <div className="flex items-start gap-3 sm:gap-4">
                <CountUnit value={d} label="dní" />
                <span className="text-blue-400/25 text-2xl font-thin mt-5">:</span>
                <CountUnit value={h} label="hodín" />
                <span className="text-blue-400/25 text-2xl font-thin mt-5">:</span>
                <CountUnit value={m} label="minút" />
                <span className="text-blue-400/25 text-2xl font-thin mt-5">:</span>
                <CountUnit value={s} label="sekúnd" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
