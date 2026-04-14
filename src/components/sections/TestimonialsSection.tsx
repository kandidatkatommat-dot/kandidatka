'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Quote } from '@/components/shared/Icons'
import AnimatedSection from '@/components/shared/AnimatedSection'

const testimonials = [
  // ── Czech (majority) ──────────────────────────────────
  {
    quote: 'Konečně kandidáti, kteří říkají konkrétní věci. Žádné plané sliby — je vidět, že rozumí tomu, co senát reálně může ovlivnit.',
    name: 'Jakub V.',
    info: '3. ročník, Informatika',
    initial: 'JV',
    lang: 'cs',
    flag: '🇨🇿',
    color: 'from-blue-600 to-blue-800',
  },
  {
    quote: 'Líbí se mi nápad s otevřeným kanálem podnětů. Poprvé mám pocit, že mám kde říct, co mi na FEI opravdu chybí.',
    name: 'Barbora K.',
    info: '2. ročník, Kybernetika',
    initial: 'BK',
    lang: 'cs',
    flag: '🇨🇿',
    color: 'from-[#e8634a] to-[#a8306a]',
  },
  {
    quote: 'Transparentní zprávy ze senátu? To by byla revoluce. Dosud nikdo ani netušil, co se tam vlastně rozhoduje.',
    name: 'Michal T.',
    info: '4. ročník, Elektrotechnika',
    initial: 'MT',
    lang: 'cs',
    flag: '🇨🇿',
    color: 'from-teal-500 to-teal-700',
  },
  // ── Slovak ────────────────────────────────────────────
  {
    quote: 'Ako prváčka som rada, že niekto rieši skúšobný poriadok. Systém opravných termínov je mätúci a doteraz to nikto neriešil.',
    name: 'Tereza N.',
    info: '1. ročník, Informatika',
    initial: 'TN',
    lang: 'sk',
    flag: '🇸🇰',
    color: 'from-purple-500 to-purple-700',
  },
  {
    quote: 'Verejné Q&A stretnutia so senátormi sú skvelý nápad. Na iných školách to funguje — vzťah s vedením je oveľa lepší.',
    name: 'Ondřej P.',
    info: '2. ročník Ing., Telekomunikácie',
    initial: 'OP',
    lang: 'sk',
    flag: '🇸🇰',
    color: 'from-blue-500 to-indigo-700',
  },
  // ── English (Erasmus / exchange) ──────────────────────
  {
    quote: "Finally, candidates who actually address real issues. Better digital tools and transparent decision-making — that's exactly what every student here needs.",
    name: 'Aryan S.',
    info: '2nd year, Exchange Student',
    initial: 'AS',
    lang: 'en',
    flag: '🇮🇳',
    color: 'from-emerald-500 to-teal-700',
  },
  {
    quote: "The open feedback channel is a brilliant idea. As an Erasmus student I never knew how to reach the senate — now there's finally a way.",
    name: 'Min-Ji L.',
    info: '3rd year, Erasmus',
    initial: 'ML',
    lang: 'en',
    flag: '🇰🇷',
    color: 'from-[#e8634a] to-[#db2777]',
  },
]

const langLabel: Record<string, string> = { cs: 'Česky', sk: 'Slovensky', en: 'English' }
const INTERVAL = 5200

/* ── page-turn variants (perspective set on wrapper) ── */
const pageVariants: Variants = {
  enter: (d: number) => ({
    x: d > 0 ? 60 : -60,
    opacity: 0,
    rotateY: d > 0 ? 18 : -18,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: (d: number) => ({
    x: d > 0 ? -60 : 60,
    opacity: 0,
    rotateY: d > 0 ? -18 : 18,
    scale: 0.97,
    transition: { duration: 0.25, ease: 'easeIn' },
  }),
}

export default function TestimonialsSection() {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((d: 1 | -1) => {
    setDir(d)
    setCur((c) => (c + d + testimonials.length) % testimonials.length)
  }, [])

  /* auto-advance */
  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => go(1), INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [go, paused])

  /* drag-to-swipe */
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) go(1)
    else if (info.offset.x > 40) go(-1)
  }

  const t = testimonials[cur]

  return (
    <section className="relative py-28 sm:py-36" style={{ background: '#04101f' }}>
      <div className="section-divider mb-0" />
      <div className="aurora-orb w-[40vw] h-[40vw] bottom-[-10vw] right-[-10vw] opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-28">

        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-[0.2em] mb-4">
            Čo hovoria študenti
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Hlas akademickej obce
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto">
            Reálne reakcie od spolužiakov na FEI — česky, slovensky aj po anglicky.
          </p>
        </AnimatedSection>

        {/* ── BOOK ─────────────────────────────────────────── */}
        <AnimatedSection>
          <div
            className="relative mx-auto select-none"
            style={{ maxWidth: 700 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Book drop-shadow */}
            <div className="absolute inset-0 translate-y-4 blur-2xl opacity-50 rounded-2xl pointer-events-none"
              style={{ background: 'rgba(2,8,16,0.8)' }} aria-hidden />

            {/* Book body */}
            <div
              className="relative grid overflow-hidden rounded-xl sm:rounded-2xl"
              style={{
                gridTemplateColumns: '1fr 2fr',
                boxShadow: '0 0 0 1px rgba(59,130,246,0.12), 4px 0 0 #020810 inset, 0 24px 64px rgba(0,0,0,0.55)',
                background: 'linear-gradient(160deg, #0a1e38 0%, #071525 100%)',
              }}
            >
              {/* ── LEFT PAGE — decorative ─────────── */}
              <div className="relative hidden sm:flex flex-col justify-between py-8 px-6 overflow-hidden border-r border-blue-500/8">
                {/* Ruled lines */}
                <div className="absolute inset-0 flex flex-col justify-evenly px-4 pointer-events-none">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="h-px bg-blue-400/[0.06]" />
                  ))}
                </div>

                {/* Big quote watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Quote className="w-28 h-28 text-blue-500/[0.045]" />
                </div>

                {/* Language dots legend */}
                <div className="relative flex flex-col gap-2 mt-auto z-10">
                  {[
                    { flag: '🇨🇿', label: 'Česky',     active: t.lang === 'cs' },
                    { flag: '🇸🇰', label: 'Slovensky', active: t.lang === 'sk' },
                    { flag: '🌍', label: 'English',    active: t.lang === 'en' },
                  ].map((l) => (
                    <div key={l.label} className={`flex items-center gap-1.5 transition-opacity duration-300 ${l.active ? 'opacity-80' : 'opacity-20'}`}>
                      <span className="text-[11px]">{l.flag}</span>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-blue-300/70">{l.label}</span>
                    </div>
                  ))}
                </div>

                {/* Page number */}
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="text-[9px] font-mono text-blue-400/20">
                    {String(cur + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Spine */}
                <div className="absolute right-0 top-0 bottom-0 w-[3px]"
                  style={{ background: 'linear-gradient(180deg, #020810 0%, #0a1628 50%, #020810 100%)' }}
                  aria-hidden />
              </div>

              {/* ── RIGHT PAGE — content ───────────── */}
              <div
                className="relative overflow-hidden"
                style={{ perspective: '900px', minHeight: 280 }}
              >
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={cur}
                    custom={dir}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col gap-4 p-6 sm:p-8"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={handleDragEnd}
                    style={{ cursor: 'grab' }}
                    whileDrag={{ cursor: 'grabbing' }}
                  >
                    {/* Top bar: quote icon + lang badge */}
                    <div className="flex items-center justify-between">
                      <Quote className="w-6 h-6 text-teal-500/25 flex-shrink-0" />
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-blue-300/35">
                        <span>{t.flag}</span>
                        <span>{langLabel[t.lang]}</span>
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="flex-1 flex items-center text-sm sm:text-[15px] text-blue-100/80 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author + nav */}
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-blue-500/10">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-[10px] font-bold text-white">{t.initial}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                          <p className="text-[11px] text-blue-400/50 truncate">{t.info}</p>
                        </div>
                      </div>

                      {/* Page-turn arrows */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => go(-1)}
                          aria-label="Predchádzajúca"
                          className="w-8 h-8 rounded-full glass flex items-center justify-center text-lg text-blue-400/50 hover:text-teal-400 transition-colors"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => go(1)}
                          aria-label="Ďalšia"
                          className="w-8 h-8 rounded-full glass flex items-center justify-center text-lg text-blue-400/50 hover:text-teal-400 transition-colors"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    {/* Corner fold hint */}
                    <div
                      className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-30"
                      style={{
                        background: 'linear-gradient(225deg, rgba(59,130,246,0.18) 50%, transparent 50%)',
                        borderTopLeftRadius: 6,
                      }}
                      aria-hidden
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Progress bar at bottom of right page */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500/8">
                  <motion.div
                    className="h-full bg-teal-500/50 rounded-full"
                    key={cur}
                    initial={{ width: '0%' }}
                    animate={{ width: paused ? undefined : '100%' }}
                    transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                  />
                </div>
              </div>
            </div>

            {/* Page dots */}
            <div className="flex justify-center gap-1.5 mt-5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > cur ? 1 : -1); setCur(i) }}
                  aria-label={`Strana ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === cur
                      ? 'w-5 h-1.5 bg-teal-400'
                      : 'w-1.5 h-1.5 bg-blue-500/25 hover:bg-blue-500/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA strip */}
        <AnimatedSection delay={0.2} className="mt-10 text-center">
          <div className="glass glow-ring-orange rounded-2xl p-6 max-w-lg mx-auto inline-block">
            <p className="text-sm text-blue-200/70 mb-3">
              Aj ty chceš vyjadriť podporu alebo podeliť sa s názorom?
            </p>
            <a href="#podnety" className="text-[#f07560] hover:text-[#f09070] font-semibold text-sm transition-colors">
              Pošli nám podnet →
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
