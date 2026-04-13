'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

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
  const d = Math.floor(total / 86400000)
  const h = Math.floor((total % 86400000) / 3600000)
  const m = Math.floor((total % 3600000) / 60000)
  const s = Math.floor((total % 60000) / 1000)
  return { d, h, m, s, mounted: true }
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass glow-ring-blue rounded-xl w-16 h-14 flex items-center justify-center">
        <span className="text-2xl font-extrabold text-white tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] text-blue-400/60 uppercase tracking-widest mt-1">{label}</span>
    </div>
  )
}

/* ── Particles ─────────────────────────────────────────────── */
interface Particle { id: number; x: number; y: number; size: number; dur: number; delay: number; color: string }

function FloatingParticles({ particles }: { particles: Particle[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, opacity: 0.2 }}
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ── Variants ──────────────────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' as const } },
}

/* ── Component ─────────────────────────────────────────────── */
export default function HeroSection() {
  const { d, h, m, s, mounted } = useCountdown()

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: (i * 41 + 7) % 100,
        y: (i * 59 + 5) % 85,
        size: (i % 3) + 2,
        dur: 5 + (i % 5),
        delay: (i % 9) * 0.4,
        color: i % 4 === 0 ? '#f97316' : i % 4 === 1 ? '#06b6d4' : '#3b82f6',
      })),
    []
  )

  return (
    <section className="aurora-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Aurora orbs */}
      <div className="aurora-orb w-[55vw] h-[55vw] bottom-[-20vw] left-[-10vw]"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', animationDelay: '-6s' }}
        aria-hidden />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden />

      {/* Floating particles */}
      <FloatingParticles particles={particles} />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <Badge className="px-4 py-1.5 text-xs font-semibold glass-sm text-blue-300 border border-blue-500/25 tracking-wide">
            🗳️ Voľby AS FEI VŠB-TUO · 12.–15. mája 2026
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="text-6xl sm:text-8xl font-black leading-[0.9] mb-6 tracking-tight">
          <span className="gradient-text">Volíme</span>
          <br />
          <span className="text-white">FEI 2026</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p variants={item} className="text-lg sm:text-xl font-medium text-blue-200/80 mb-3">
          Tomáš Mucha · Martin Buček
        </motion.p>
        <motion.p variants={item} className="text-base text-blue-300/50 mb-10 max-w-xl mx-auto leading-relaxed">
          Dvaja študenti FEI, ktorí chcú preniesť reálne zmeny do Akademického senátu.
          <br className="hidden sm:block" /> Pošli nám, čo ťa trápi — budeme to riešiť.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <a href="#program">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-2xl shadow-orange-500/30 px-8 py-6 text-base font-bold w-full sm:w-auto transition-all duration-200 hover:scale-[1.03]">
              Náš program
            </Button>
          </a>
          <a href="#podnety">
            <Button size="lg" variant="outline" className="border-blue-400/30 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/50 backdrop-blur-sm px-8 py-6 text-base font-semibold w-full sm:w-auto transition-all duration-200">
              Pošli podnet ✉️
            </Button>
          </a>
        </motion.div>

        {/* Countdown — only renders after client mount to avoid hydration mismatch */}
        {mounted && (
          <motion.div variants={item} className="flex flex-col items-center gap-3">
            <p className="text-xs text-blue-400/50 uppercase tracking-widest font-medium">
              Do začiatku hlasovania zostáva
            </p>
            <div className="flex items-start gap-2 sm:gap-3">
              <CountUnit value={d} label="dní" />
              <span className="text-blue-400/40 text-xl font-bold mt-3">:</span>
              <CountUnit value={h} label="hodín" />
              <span className="text-blue-400/40 text-xl font-bold mt-3">:</span>
              <CountUnit value={m} label="minút" />
              <span className="text-blue-400/40 text-xl font-bold mt-3">:</span>
              <CountUnit value={s} label="sekúnd" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll arrow */}
      <motion.a
        href="#o-nas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-400/40 hover:text-blue-300 transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <ChevronDown size={30} />
      </motion.a>
    </section>
  )
}
