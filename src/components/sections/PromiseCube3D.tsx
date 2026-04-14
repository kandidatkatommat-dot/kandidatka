'use client'

import { useState, useEffect, useRef, useLayoutEffect, useMemo, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ClipboardLines, VoteCheck, Broadcast, ShieldCheck,
  Scales, CoinStack, StarBadge, PenDocument,
  ScreenCode, Gear, Smartphone, Lightbulb,
  PeopleTalk, Mail, UsersGroup, BarChart,
} from '@/components/shared/Icons'

/* ── Face data ──────────────────────────────────────── */
const faces = [
  {
    id: 0,
    label: 'Transparentnosť',
    cells: [
      { Icon: ClipboardLines, title: 'Mesačné správy',         sub: 'Súhrn rozhodnutí senátu každý mesiac',   color: 'rgba(59,130,246,0.14)',  accent: '#3b82f6' },
      { Icon: VoteCheck,      title: 'Verejné hlasovanie',     sub: 'Každé naše hlasovanie bude logované',    color: 'rgba(79,70,229,0.12)',   accent: '#818cf8' },
      { Icon: Broadcast,      title: 'Otvorený kanál',         sub: 'Podnety od študentov celý mandát',        color: 'rgba(6,182,212,0.12)',   accent: '#06b6d4' },
      { Icon: ShieldCheck,    title: 'Žiadne tajné dohody',    sub: 'Všetky rozhodnutia dostupné 24/7',        color: 'rgba(139,92,246,0.12)', accent: '#8b5cf6' },
    ],
  },
  {
    id: 1,
    label: 'Akademické práva',
    cells: [
      { Icon: Scales,      title: 'Férovejší skúšobný poriadok', sub: 'Revízia opravných termínov',            color: 'rgba(79,70,229,0.14)',   accent: '#818cf8' },
      { Icon: CoinStack,   title: 'Hlas pri rozpočte',            sub: 'Priority študentov vo financiách',     color: 'rgba(16,185,129,0.12)',  accent: '#10b981' },
      { Icon: StarBadge,   title: 'Transparentné hodnotenie',     sub: 'Jasné kritériá, nie ľubovôľa',         color: 'rgba(59,130,246,0.12)',  accent: '#3b82f6' },
      { Icon: PenDocument, title: 'Formálne návrhy',              sub: 'Iniciatívy predložené senátu',          color: 'rgba(6,182,212,0.10)',   accent: '#06b6d4' },
    ],
  },
  {
    id: 2,
    label: 'Digitalizácia',
    cells: [
      { Icon: ScreenCode, title: 'Lepšie digitálne nástroje', sub: 'Modernizácia portálov a e-learningu',     color: 'rgba(6,182,212,0.14)',   accent: '#06b6d4' },
      { Icon: Gear,       title: 'Upgrade systémov',           sub: 'IS/STAG a ďalšie platformy',              color: 'rgba(59,130,246,0.12)',  accent: '#3b82f6' },
      { Icon: Smartphone, title: 'Mobilné riešenia',           sub: 'Funkčnosť na všetkých zariadeniach',      color: 'rgba(139,92,246,0.12)', accent: '#8b5cf6' },
      { Icon: Lightbulb,  title: 'Návrhy od vás',              sub: 'Implementujeme čo reálne potrebujete',    color: 'rgba(79,70,229,0.12)',   accent: '#818cf8' },
    ],
  },
  {
    id: 3,
    label: 'Dialóg',
    cells: [
      { Icon: PeopleTalk, title: 'Verejné Q&A každý semester', sub: 'Otvorené stretnutia so senátormi',       color: 'rgba(16,185,129,0.14)',  accent: '#10b981' },
      { Icon: Mail,       title: 'Priamy kontakt',              sub: 'tomas.mucha.st@vsb.cz',                  color: 'rgba(59,130,246,0.12)',  accent: '#3b82f6' },
      { Icon: UsersGroup, title: 'Komunita FEI',                sub: 'Discord, konzultácie, feedback',          color: 'rgba(88,101,242,0.14)', accent: '#5865F2' },
      { Icon: BarChart,   title: 'Výsledky zverejnené',         sub: 'Čo sa podarilo — na tomto webe',         color: 'rgba(6,182,212,0.12)',   accent: '#06b6d4' },
    ],
  },
]

type Cell = typeof faces[0]['cells'][0]

/* ── Face content — scales with cube size ─────────────── */
const CubeFace = memo(function CubeFace({ face, size }: { face: typeof faces[0]; size: number }) {
  const small = size < 260
  return (
    <div
      className="grid grid-cols-2 h-full"
      style={{
        gap: small ? 6 : 8,
        padding: small ? 10 : 16,
        background: 'linear-gradient(135deg, rgba(4,16,31,0.95) 0%, rgba(9,22,41,0.98) 100%)',
      }}
    >
      {face.cells.map((cell: Cell, i: number) => (
        <div
          key={i}
          className="rounded-xl flex flex-col"
          style={{
            gap: small ? 4 : 6,
            padding: small ? 8 : 12,
            background: cell.color,
            border: `1px solid ${cell.accent}22`,
          }}
        >
          <div style={{ color: cell.accent }}>
            <cell.Icon size={small ? 14 : 18} />
          </div>
          <p
            className="font-bold text-white/85 leading-snug"
            style={{ fontSize: small ? 9 : 11 }}
          >
            {cell.title}
          </p>
          <p
            className="text-blue-200/45 leading-snug"
            style={{ fontSize: small ? 8 : 10 }}
          >
            {cell.sub}
          </p>
        </div>
      ))}
    </div>
  )
})

/* ── Main export ────────────────────────────────────────── */
export default function PromiseCube3D() {
  const [step, setStep]         = useState(0)
  const [faceSize, setFaceSize] = useState(320)
  const prefersReduced          = useReducedMotion()
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef            = useRef<HTMLDivElement>(null)

  /* Measure container width — runs before paint to avoid flash */
  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      setFaceSize(Math.min(290, Math.max(200, w - 32)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  /* Auto-rotation — pauses when tab hidden */
  useEffect(() => {
    if (prefersReduced) return
    const start = () => {
      intervalRef.current = setInterval(() => setStep(s => s + 1), 5000)
    }
    const stop = () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    }
    const onVis = () => document.hidden ? stop() : start()
    start()
    document.addEventListener('visibilitychange', onVis)
    return () => { stop(); document.removeEventListener('visibilitychange', onVis) }
  }, [prefersReduced])

  const goNext = () => setStep(s => s + 1)
  const goPrev = () => setStep(s => s - 1 + faces.length * 1000)

  const half             = faceSize / 2
  const currentFaceIdx   = ((step % faces.length) + faces.length) % faces.length
  const rotateY          = step * -90

  /* Dynamic face transforms based on measured size — memoized so string objects
     are stable between renders (only recalculate when faceSize changes)        */
  const faceTransforms = useMemo(() => [
    `rotateY(0deg)   translateZ(${half}px)`,
    `rotateY(90deg)  translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
  ], [half])

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-5 w-full"
      role="region"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext() }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev() }
      }}
      aria-label={`Sľuby — ${faces[currentFaceIdx].label}. Naviguj šípkami alebo swajpom.`}
    >
      {/* Label strip */}
      <div className="flex gap-1.5 flex-wrap justify-center w-full px-1">
        {faces.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setStep(i)}
            className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-300 ${
              currentFaceIdx === i
                ? 'bg-[#4f46e5]/25 text-[#a5b4fc] border border-[#4f46e5]/40'
                : 'text-blue-400/35 hover:text-blue-400/60 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 3D Cube — unified for all screen sizes */}
      <div
        style={{
          height: faceSize + 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div style={{ perspective: `${faceSize * 2.5}px` }}>
          <motion.div
            style={{
              width: faceSize,
              height: faceSize,
              transformStyle: 'preserve-3d',
              position: 'relative',
              willChange: 'transform',
              cursor: 'grab',
              touchAction: 'pan-y', // allow vertical scroll, intercept horizontal swipe
            }}
            animate={{ rotateY }}
            transition={{ duration: prefersReduced ? 0 : 1.1, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40)      goNext()
              else if (info.offset.x > 40)  goPrev()
            }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {faces.map((face, i) => (
              <div
                key={face.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: faceTransforms[i],
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(59,130,246,0.12)',
                  boxShadow: '0 0 40px rgba(79,70,229,0.08)',
                }}
              >
                <CubeFace face={face} size={faceSize} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5" aria-hidden>
        {faces.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            aria-label={`Strana ${i + 1}`}
            className="p-2 flex items-center justify-center"
          >
            <span className={`rounded-full transition-all duration-300 block ${
              currentFaceIdx === i
                ? 'w-5 h-1.5 bg-[#818cf8]'
                : 'w-1.5 h-1.5 bg-blue-500/25 hover:bg-blue-500/50'
            }`} />
          </button>
        ))}
      </div>
    </div>
  )
}
