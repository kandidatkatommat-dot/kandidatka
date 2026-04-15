'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'

/* ── Testimonials — Czech, Slovak, English, no flags ── */
const testimonials = [
  {
    quote: 'Konečně kandidáti, kteří říkají konkrétní věci. Žádné plané sliby — vidět, že opravdu rozumí tomu, co senát může ovlivnit.',
    name: 'Jakub V.',
    info: '3. ročník, Informatika',
    initial: 'JV',
    color: 'from-blue-600 to-blue-800',
    lang: 'cs',
  },
  {
    quote: 'Líbí se mi nápad s otevřeným kanálem podnětů. Poprvé mám pocit, že mám kde říct, co mi na FEI chybí.',
    name: 'Barbora K.',
    info: '2. ročník, Kybernetika',
    initial: 'BK',
    color: 'from-indigo-500 to-violet-700',
    lang: 'cs',
  },
  {
    quote: 'Transparentní zprávy ze senátu? To by byla revoluce. Dosud nikdo ani netušil, co se tam vlastně rozhoduje.',
    name: 'Michal T.',
    info: '4. ročník, Elektrotechnika',
    initial: 'MT',
    color: 'from-teal-500 to-teal-700',
    lang: 'cs',
  },
  {
    quote: 'Ako prváčka som rada, že niekto rieši skúšobný poriadok. Systém opravných termínov je mätúci a nikto to doteraz neriešil.',
    name: 'Tereza N.',
    info: '1. ročník, Informatika',
    initial: 'TN',
    color: 'from-purple-500 to-purple-700',
    lang: 'sk',
  },
  {
    quote: 'Verejné Q&A stretnutia so senátormi sú skvelý nápad. Na iných školách to funguje — vzťah s vedením je oveľa lepší.',
    name: 'Ondřej P.',
    info: '2. ročník Ing., Telekomunikácie',
    initial: 'OP',
    color: 'from-blue-500 to-indigo-700',
    lang: 'sk',
  },
  {
    quote: "Finally, candidates who address real issues. Better digital tools and transparent decision-making — that's exactly what every student here needs.",
    name: 'Aryan S.',
    info: '2nd year, Exchange Student',
    initial: 'AS',
    color: 'from-emerald-500 to-teal-700',
    lang: 'en',
  },
  {
    quote: "The open feedback channel is a brilliant idea. As an Erasmus student I never knew how to reach the senate — now there's finally a way.",
    name: 'Min-Ji L.',
    info: '3rd year, Erasmus',
    initial: 'ML',
    color: 'from-indigo-500 to-violet-600',
    lang: 'en',
  },
]

const INTERVAL = 5400
const RINGS = 14

const pageVariants: Variants = {
  enter: (d: number) => ({
    x: d > 0 ? 50 : -50,
    opacity: 0,
    rotateY: d > 0 ? 12 : -12,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
  exit: (d: number) => ({
    x: d > 0 ? -50 : 50,
    opacity: 0,
    rotateY: d > 0 ? -12 : 12,
    transition: { duration: 0.22, ease: 'easeIn' },
  }),
}

export default function TestimonialsSection() {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Keep pausedRef in sync without adding paused to the interval effect deps
  useEffect(() => { pausedRef.current = paused }, [paused])

  const go = useCallback((d: 1 | -1) => {
    setDir(d)
    setCur((c) => (c + d + testimonials.length) % testimonials.length)
  }, [])

  const jumpTo = useCallback((i: number) => {
    setDir(i > cur ? 1 : -1)
    setCur(i)
  }, [cur])

  useEffect(() => {
    const start = () => {
      if (timerRef.current) return
      timerRef.current = setInterval(() => { if (!pausedRef.current) go(1) }, INTERVAL)
    }
    const stop = () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    }
    // Pause interval entirely when tab hidden — saves CPU/battery
    const onVis = () => document.hidden ? stop() : start()
    start()
    document.addEventListener('visibilitychange', onVis)
    return () => { stop(); document.removeEventListener('visibilitychange', onVis) }
  }, [go])

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) go(1)
    else if (info.offset.x > 40) go(-1)
  }

  const t = testimonials[cur]

  return (
    <section className="relative py-28 sm:py-36" style={{ background: '#04101f' }}>
      <div className="section-divider mb-0" />
      <div className="aurora-orb w-[40vw] h-[40vw] bottom-[-10vw] right-[-10vw] opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-28">

        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-[0.2em] mb-4">
            Čo hovoria študenti
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Hlas akademickej obce
          </h2>
          <p className="text-blue-200/50 max-w-xl mx-auto">
            Reálne reakcie od spolužiakov na FEI.
          </p>
        </AnimatedSection>

        {/* ── NOTEBOOK ──────────────────────────────────────── */}
        <AnimatedSection>
          <div
            className="relative mx-auto select-none"
            style={{ maxWidth: 680 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Page-stack depth */}
            <div className="absolute bottom-0 left-[28px] right-0 pointer-events-none z-0" aria-hidden>
              {[6, 4, 2].map((h, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  bottom: -(i + 1) * 3,
                  left: i * 2,
                  right: -i,
                  height: h,
                  background: `rgba(13,31,58,${0.9 - i * 0.2})`,
                  borderRadius: '0 0 6px 6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }} />
              ))}
            </div>

            {/* Notebook body */}
            <div
              className="relative flex rounded-xl sm:rounded-2xl overflow-hidden z-10"
              style={{
                boxShadow: '0 0 0 1px rgba(59,130,246,0.1), 0 24px 60px rgba(0,0,0,0.6)',
                minHeight: 'clamp(260px, 40vw, 360px)',
              }}
            >

              {/* ── SPIRAL BINDING ───────────────────── */}
              <div
                className="flex-shrink-0 flex flex-col items-center justify-evenly py-4 z-20 relative"
                style={{
                  width: 28,
                  background: 'linear-gradient(180deg, #020c1c 0%, #040e20 100%)',
                  borderRight: '1px solid rgba(59,130,246,0.08)',
                }}
                aria-hidden
              >
                {Array.from({ length: RINGS }).map((_, i) => (
                  <div key={i} style={{
                    width: 16,
                    height: 11,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(148,163,184,0.22)',
                    background: '#020810',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.03)',
                  }} />
                ))}
              </div>

              {/* ── COVER PAGE — hidden on mobile ────── */}
              <div
                className="hidden sm:flex flex-col justify-between flex-shrink-0 relative overflow-hidden"
                style={{
                  width: 138,
                  background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 100%)',
                  borderRight: '1px solid rgba(59,130,246,0.1)',
                  padding: '24px 16px',
                }}
              >
                {/* Dot texture */}
                <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden style={{
                  backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)',
                  backgroundSize: '14px 14px',
                }} />

                {/* Label sticker */}
                <div className="relative z-10">
                  <div className="w-full rounded-lg border border-blue-500/15 p-3"
                    style={{ background: 'rgba(59,130,246,0.04)' }}>
                    <p className="text-[9px] font-semibold text-blue-400/45 uppercase tracking-[0.18em] mb-1.5">
                      Akademická obec
                    </p>
                    <p className="text-base font-black text-white/75 leading-tight">
                      FEI<br />VŠB–TUO
                    </p>
                    <div className="mt-2 h-px bg-blue-500/12" />
                    <p className="text-[10px] text-blue-300/30 mt-1.5 font-medium leading-snug">
                      Podnety &amp;<br />reakcie 2026
                    </p>
                  </div>
                </div>

                {/* Chapter tag */}
                <div className="relative z-10">
                  <p className="text-[9px] font-mono text-blue-400/18 uppercase tracking-widest mb-1">Kap. 01</p>
                  <p className="text-[10px] text-blue-300/28 font-semibold leading-snug">
                    Hlas<br />akademickej<br />obce
                  </p>
                </div>

                {/* Page num */}
                <span className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono text-blue-400/15 z-10">
                  {String(cur + 1).padStart(2, '0')}
                </span>
              </div>

              {/* ── LINED CONTENT PAGE ───────────────── */}
              <div className="flex-1 relative overflow-hidden" style={{ perspective: '900px' }}>

                {/* Page background */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(160deg, #0d1f3a 0%, #091629 100%)' }} />

                {/* Ruled lines */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
                  background: 'repeating-linear-gradient(transparent, transparent 29px, rgba(59,130,246,0.06) 29px, rgba(59,130,246,0.06) 30px)',
                  backgroundPositionY: '22px',
                }} />

                {/* Red margin */}
                <div className="absolute left-10 top-0 bottom-0 w-px pointer-events-none"
                  style={{ background: 'rgba(239,68,68,0.09)' }} aria-hidden />

                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={cur}
                    custom={dir}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col justify-between p-5 pl-10 sm:pl-14 pb-6"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    style={{ cursor: 'grab', willChange: 'transform' }}
                    whileDrag={{ cursor: 'grabbing' }}
                  >
                    {/* Opening quote */}
                    <div className="text-5xl text-indigo-500/10 font-serif leading-none -mb-2 select-none" aria-hidden>
                      &ldquo;
                    </div>

                    {/* Quote — line-height matches ruled lines */}
                    <p lang={t.lang} className="flex-1 flex items-center text-sm sm:text-[14.5px] text-blue-100/80 leading-[26px] sm:leading-[30px] italic">
                      {t.quote}
                    </p>

                    {/* Author + nav */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-blue-500/8">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-[10px] font-bold text-white">{t.initial}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                          <p className="text-[11px] text-blue-400/45 truncate">{t.info}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => go(-1)} aria-label="Predchádzajúce vyjadrenie"
                          className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg text-blue-400/50 hover:text-teal-400 transition-colors">
                          ‹
                        </button>
                        <button onClick={() => go(1)} aria-label="Ďalšie vyjadrenie"
                          className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg text-blue-400/50 hover:text-teal-400 transition-colors">
                          ›
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Corner fold */}
                <div className="absolute bottom-0 right-0 pointer-events-none" aria-hidden style={{
                  width: 22, height: 22,
                  background: 'linear-gradient(225deg, rgba(79,70,229,0.18) 50%, transparent 50%)',
                }} />

              </div>
            </div>

          </div>

          {/* Progress dots */}
          <div className="flex justify-center items-center gap-2 mt-5" role="tablist" aria-label="Navigácia citátov">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === cur}
                aria-label={`Citát ${i + 1} z ${testimonials.length}`}
                onClick={() => jumpTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === cur
                    ? 'w-5 h-2 bg-blue-400'
                    : 'w-2 h-2 bg-blue-400/25 hover:bg-blue-400/50'
                }`}
              />
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
