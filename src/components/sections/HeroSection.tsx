'use client'

import { useEffect, useState, useMemo, useRef, memo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, Mail } from '@/components/shared/Icons'

/* ── Countdown ─────────────────────────────────────────────── */
const VOTE_START = new Date('2026-05-12T08:00:00')
const VOTE_END   = new Date('2026-05-15T20:00:00')

type CountdownPhase = 'countdown' | 'voting' | 'ended'

function useCountdown() {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState(0)
  useEffect(() => {
    setMounted(true)
    setNow(Date.now())
    let id: ReturnType<typeof setInterval> | null = null
    const tick = () => setNow(Date.now())
    const start = () => { if (!id) id = setInterval(tick, 1000) }
    const stop  = () => { if (id) { clearInterval(id); id = null } }
    const onVis = () => document.hidden ? stop() : start()
    start()
    document.addEventListener('visibilitychange', onVis)
    return () => { stop(); document.removeEventListener('visibilitychange', onVis) }
  }, [])
  if (!mounted) return { d: 0, h: 0, m: 0, s: 0, mounted: false, phase: 'countdown' as CountdownPhase }
  const phase: CountdownPhase = now >= VOTE_END.getTime() ? 'ended' : now >= VOTE_START.getTime() ? 'voting' : 'countdown'
  const total = Math.max(0, VOTE_START.getTime() - now)
  return {
    d: Math.floor(total / 86400000),
    h: Math.floor((total % 86400000) / 3600000),
    m: Math.floor((total % 3600000) / 60000),
    s: Math.floor((total % 60000) / 1000),
    mounted: true,
    phase,
  }
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-md" />
        <div className="relative glass rounded-2xl h-[58px] sm:h-[64px] flex items-center justify-center border border-blue-500/15" style={{ width: 'clamp(52px,13vw,76px)' }}>
          <span className="text-[24px] sm:text-[28px] font-bold tabular-nums text-white leading-none" style={{ fontFamily: 'var(--font-cal, inherit)' }}>
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-[11px] text-blue-400/50 uppercase tracking-[0.2em] font-medium">{label}</span>
    </div>
  )
}

const AuroraMesh = memo(function AuroraMesh({ noFilter }: { noFilter: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute top-[-20%] left-[10%] w-[70vw] h-[70vw] rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(59,130,246,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)',
          filter: noFilter ? 'none' : 'blur(20px)',
          animation: 'aurora 14s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)',
          filter: noFilter ? 'none' : 'blur(30px)',
          animation: 'aurora 18s ease-in-out infinite reverse',
          animationDelay: '-7s',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-20" />
    </div>
  )
})

interface Particle {
  id: number; x: number; y: number; size: number; dur: number; delay: number; color: string; opacity: number
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

function ScrollIndicator({ label }: { label: string }) {
  return (
    <motion.a
      href="#o-nas"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-400/30 hover:text-blue-300/60 transition-colors group"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      aria-label={label}
    >
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium">{label}</span>
      <ChevronDown size={18} />
    </motion.a>
  )
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function HeroSection() {
  const t = useTranslations('hero')
  const { d, h, m, s, mounted, phase } = useCountdown()
  const sectionRef = useRef<HTMLElement>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [isChrome, setIsChrome] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const noParallax = isChrome || isTouch
  const y = useTransform(scrollYProgress, [0, 1], ['0%', noParallax ? '0%' : '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, noParallax ? 1 : 0])

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    setIsChrome(document.documentElement.classList.contains('no-backdrop'))
  }, [])

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 23 }, (_, i) => ({
        id: i,
        x: (i * 37 + 11) % 100,
        y: (i * 53 + 7) % 90,
        size: (i % 4) + 1.5,
        dur: 6 + (i % 6),
        delay: (i % 10) * 0.35,
        color: i % 5 === 0 ? '#4f46e5' : i % 5 === 1 ? '#06b6d4' : i % 5 === 2 ? '#3b82f6' : i % 5 === 3 ? '#8b5cf6' : '#60a5fa',
        opacity: 0.15 + (i % 3) * 0.08,
      })),
    []
  )

  return (
    <section ref={sectionRef} className="aurora-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AuroraMesh noFilter={isChrome} />
      <FloatingParticles particles={particles} />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-20 pb-8"
      >
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <Badge className="px-5 py-2 text-xs font-semibold glass-sm text-blue-300 border border-blue-500/20 tracking-widest uppercase gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t('badge')}
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="mb-6">
            <h1
              className="text-[clamp(2.8rem,min(12vw,10svh),9rem)] font-black leading-[0.88] tracking-[-0.03em]"
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
            {t('subline')}
            <br className="hidden sm:block" />
            {t('subline2')}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <a href="#program">
              <Button
                size="lg"
                data-cursor
                className="group relative overflow-hidden bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white border-0 shadow-2xl shadow-[#4f46e5]/25 px-9 py-6 text-base font-bold w-full sm:w-auto transition-all duration-300 hover:scale-[1.04] hover:shadow-[#6d28d9]/40"
              >
                <span className="relative z-10">{t('cta_primary')}</span>
              </Button>
            </a>
            <a href="#podnety">
              <Button
                size="lg"
                variant="outline"
                data-cursor
                className="border-blue-500/20 bg-white/[0.03] text-blue-200 hover:bg-blue-500/8 hover:border-blue-500/40 backdrop-blur-sm px-9 py-6 text-base font-semibold w-full sm:w-auto transition-all duration-300 hover:scale-[1.02]"
              >
                {t('cta_secondary')} <Mail size={15} className="ml-0.5" />
              </Button>
            </a>
          </motion.div>

          {/* Countdown */}
          {mounted && (
            <motion.div variants={item} className="flex flex-col items-center gap-4">
              {phase === 'countdown' && (
                <>
                  <p className="text-[11px] text-blue-400/40 uppercase tracking-[0.25em] font-medium">
                    {t('countdown_label')}
                  </p>
                  <div className="flex items-start gap-2 sm:gap-4">
                    <CountUnit value={d} label={t('countdown_days')} />
                    <span className="text-blue-400/25 text-2xl font-thin mt-5">:</span>
                    <CountUnit value={h} label={t('countdown_hours')} />
                    <span className="text-blue-400/25 text-2xl font-thin mt-5">:</span>
                    <CountUnit value={m} label={t('countdown_minutes')} />
                    <span className="text-blue-400/25 text-2xl font-thin mt-5">:</span>
                    <CountUnit value={s} label={t('countdown_seconds')} />
                  </div>
                </>
              )}
              {phase === 'voting' && (
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-green-500/20">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <span className="text-sm font-semibold text-green-300">{t('voting_live')}</span>
                </div>
              )}
              {phase === 'ended' && (
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-blue-500/20">
                  <span className="text-sm font-semibold text-blue-300/70">{t('voting_ended')}</span>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <ScrollIndicator label={t('scroll_down')} />
    </section>
  )
}
