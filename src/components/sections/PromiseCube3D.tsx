'use client'

import { useState, useEffect, useRef, useLayoutEffect, useMemo, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
  ClipboardLines, VoteCheck, Broadcast, ShieldCheck,
  Scales, CoinStack, StarBadge, PenDocument,
  ScreenCode, Gear, Smartphone, Lightbulb,
  PeopleTalk, Mail, UsersGroup, BarChart,
} from '@/components/shared/Icons'

/* ── Static data: icons, colors, accents per face/cell ─────── */
type IconComponent = React.ComponentType<{ size?: number; className?: string }>

const FACE_ICON_DATA: Array<Array<{ Icon: IconComponent; color: string; accent: string }>> = [
  [
    { Icon: ClipboardLines, color: 'rgba(59,130,246,0.14)',  accent: '#3b82f6' },
    { Icon: VoteCheck,      color: 'rgba(79,70,229,0.12)',   accent: '#818cf8' },
    { Icon: Broadcast,      color: 'rgba(6,182,212,0.12)',   accent: '#06b6d4' },
    { Icon: ShieldCheck,    color: 'rgba(139,92,246,0.12)',  accent: '#8b5cf6' },
  ],
  [
    { Icon: Scales,      color: 'rgba(79,70,229,0.14)',   accent: '#818cf8' },
    { Icon: CoinStack,   color: 'rgba(16,185,129,0.12)',  accent: '#10b981' },
    { Icon: StarBadge,   color: 'rgba(59,130,246,0.12)',  accent: '#3b82f6' },
    { Icon: PenDocument, color: 'rgba(6,182,212,0.10)',   accent: '#06b6d4' },
  ],
  [
    { Icon: ScreenCode, color: 'rgba(6,182,212,0.14)',   accent: '#06b6d4' },
    { Icon: Gear,       color: 'rgba(59,130,246,0.12)',  accent: '#3b82f6' },
    { Icon: Smartphone, color: 'rgba(139,92,246,0.12)',  accent: '#8b5cf6' },
    { Icon: Lightbulb,  color: 'rgba(79,70,229,0.12)',   accent: '#818cf8' },
  ],
  [
    { Icon: PeopleTalk, color: 'rgba(16,185,129,0.14)',  accent: '#10b981' },
    { Icon: Mail,       color: 'rgba(59,130,246,0.12)',  accent: '#3b82f6' },
    { Icon: UsersGroup, color: 'rgba(88,101,242,0.14)',  accent: '#5865F2' },
    { Icon: BarChart,   color: 'rgba(6,182,212,0.12)',   accent: '#06b6d4' },
  ],
]

type FaceTranslation = { label: string; cells: { title: string; sub: string }[] }

type CellFull = { Icon: IconComponent; color: string; accent: string; title: string; sub: string }
type FaceFull = { id: number; label: string; cells: CellFull[] }

const CubeFace = memo(function CubeFace({ face, size }: { face: FaceFull; size: number }) {
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
      {face.cells.map((cell, i) => (
        <div
          key={i}
          className="rounded-xl flex flex-col"
          style={{ gap: small ? 4 : 6, padding: small ? 8 : 12, background: cell.color, border: `1px solid ${cell.accent}22` }}
        >
          <div style={{ color: cell.accent }}>
            <cell.Icon size={small ? 14 : 18} />
          </div>
          <p className="font-bold text-white/85 leading-snug" style={{ fontSize: small ? 9 : 11 }}>
            {cell.title}
          </p>
          <p className="text-blue-200/45 leading-snug" style={{ fontSize: small ? 8 : 10 }}>
            {cell.sub}
          </p>
        </div>
      ))}
    </div>
  )
})

export default function PromiseCube3D() {
  const t = useTranslations('cube')
  const [step, setStep]         = useState(0)
  const [faceSize, setFaceSize] = useState(320)
  const prefersReduced          = useReducedMotion()
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef            = useRef<HTMLDivElement>(null)

  /* Merge translations with static icon/color data */
  const faces: FaceFull[] = useMemo(() => {
    const translations = t.raw('faces') as FaceTranslation[]
    return FACE_ICON_DATA.map((faceIcons, fi) => ({
      id: fi,
      label: translations[fi].label,
      cells: faceIcons.map((cell, ci) => ({
        ...cell,
        title: translations[fi].cells[ci].title,
        sub:   translations[fi].cells[ci].sub,
      })),
    }))
  }, [t])

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      setFaceSize(Math.min(290, Math.max(200, w - 32)))
    }
    let debounceId: ReturnType<typeof setTimeout> | null = null
    const debouncedMeasure = () => {
      if (debounceId) clearTimeout(debounceId)
      debounceId = setTimeout(measure, 120)
    }
    measure()
    const ro = new ResizeObserver(debouncedMeasure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => { if (debounceId) clearTimeout(debounceId); ro.disconnect() }
  }, [])

  useEffect(() => {
    if (prefersReduced) return
    const start = () => { intervalRef.current = setInterval(() => setStep(s => s + 1), 5000) }
    const stop  = () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null } }
    const onVis = () => document.hidden ? stop() : start()
    start()
    document.addEventListener('visibilitychange', onVis)
    return () => { stop(); document.removeEventListener('visibilitychange', onVis) }
  }, [prefersReduced])

  const goNext = () => setStep(s => s + 1)
  const goPrev = () => setStep(s => s - 1 + faces.length * 1000)

  const half           = faceSize / 2
  const currentFaceIdx = ((step % faces.length) + faces.length) % faces.length
  const rotateY        = step * -90

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
      aria-label={t('aria_label', { face: faces[currentFaceIdx]?.label ?? '' })}
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

      {/* 3D Cube */}
      <div style={{ height: faceSize + 64, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <div style={{ perspective: `${faceSize * 2.5}px` }}>
          <motion.div
            style={{
              width: faceSize, height: faceSize,
              transformStyle: 'preserve-3d',
              position: 'relative',
              willChange: 'transform',
              cursor: 'grab',
              touchAction: 'pan-y',
            }}
            animate={{ rotateY }}
            transition={{ duration: prefersReduced ? 0 : 1.1, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) goNext()
              else if (info.offset.x > 40) goPrev()
            }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {faces.map((face, i) => (
              <div
                key={face.id}
                style={{
                  position: 'absolute', inset: 0,
                  transform: faceTransforms[i],
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  borderRadius: 14, overflow: 'hidden',
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
            aria-label={t('dot_label', { n: i + 1 })}
            className="p-2 flex items-center justify-center"
          >
            <span className={`rounded-full transition-all duration-300 block ${
              currentFaceIdx === i ? 'w-5 h-1.5 bg-[#818cf8]' : 'w-1.5 h-1.5 bg-blue-500/25 hover:bg-blue-500/50'
            }`} />
          </button>
        ))}
      </div>
    </div>
  )
}
