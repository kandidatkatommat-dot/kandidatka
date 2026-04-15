'use client'

import { useEffect, useRef, memo } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'
import AnimatedSection from '@/components/shared/AnimatedSection'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/* ── Stable chart geometry constants ── */
const SEG_VALUES  = [28, 24, 22, 16, 10]
const SEG_COLORS  = ['#3b82f6', '#0ea5e9', '#06b6d4', '#8b5cf6', '#10b981']
const SEG_DARKS   = ['#1d4ed8', '#0369a1', '#0e7490', '#6d28d9', '#047857']
const TOTAL       = SEG_VALUES.reduce((a, b) => a + b, 0)

const legendItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.5 + i * 0.1, duration: 0.4 } }),
}
const statCardVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.45, delay: i * 0.1 } }),
}

const Counter = memo(function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !ref.current) return
    const ctrl = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix },
    })
    return () => ctrl.stop()
  }, [inView, to, suffix])
  return <span ref={ref}>0{suffix}</span>
})

/* ── 3D Pie Chart ── */
const CX = 240, CY = 150, RX = 108, RY = 40, DEPTH = 30
const FF = 'inherit'

function ep(a: number) { return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) } }
function topFacePath(a1: number, a2: number) {
  const p1 = ep(a1), p2 = ep(a2)
  const large = (a2 - a1) > Math.PI ? 1 : 0
  return `M ${CX} ${CY} L ${p1.x} ${p1.y} A ${RX} ${RY} 0 ${large} 1 ${p2.x} ${p2.y} Z`
}

interface SegData { label: string; sub: string; value: number; color: string; dark: string; a1: number; a2: number; mid: number }

function PieChart3D({ segsData }: { segsData: SegData[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-60px' })
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (!inView || triggeredRef.current) return
    triggeredRef.current = true
    const svgEl = containerRef.current
    if (!svgEl) return
    const timers: ReturnType<typeof setTimeout>[] = []
    let mounted = true
    svgEl.querySelectorAll<HTMLElement>('.pie-seg').forEach((el, i) => {
      timers.push(setTimeout(() => { if (mounted) el.classList.add('pie-visible') }, i * 110))
    })
    svgEl.querySelectorAll<HTMLElement>('.callout-line').forEach((el, i) => {
      timers.push(setTimeout(() => { if (mounted) el.classList.add('c-visible') }, 320 + i * 90))
    })
    svgEl.querySelectorAll<HTMLElement>('.callout-label').forEach((el, i) => {
      timers.push(setTimeout(() => { if (mounted) el.classList.add('c-visible') }, 460 + i * 70))
    })
    return () => { mounted = false; timers.forEach(clearTimeout) }
  }, [inView])

  const sideWalls = segsData.map((s) => {
    const norm = (a: number) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    const na1 = norm(s.a1)
    const na2 = na1 + (s.a2 - s.a1)
    const ca1 = Math.max(na1, 0)
    const ca2 = Math.min(na2, Math.PI)
    if (ca2 <= ca1 + 0.01) return null
    const p1 = ep(ca1), p2 = ep(ca2)
    const large = (ca2 - ca1) > Math.PI ? 1 : 0
    return { s, ca1, ca2, p1, p2, large }
  }).filter(Boolean) as Array<{ s: SegData; ca1: number; ca2: number; p1: {x:number;y:number}; p2: {x:number;y:number}; large: number }>

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <svg viewBox="0 0 480 290" width="100%" style={{ maxWidth: 520, overflow: 'hidden' }}>
        <defs>
          <filter id="pglow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="lglow3d" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <ellipse cx={CX} cy={CY + DEPTH + 8} rx={RX + 12} ry={RY + 5} fill="rgba(0,0,0,0.25)" />
        {sideWalls.map(({ s, p1, p2, large }, i) => (
          <g key={i}>
            <path d={`M ${p1.x} ${p1.y} A ${RX} ${RY} 0 ${large} 1 ${p2.x} ${p2.y} L ${p2.x} ${p2.y + DEPTH} A ${RX} ${RY} 0 ${large} 0 ${p1.x} ${p1.y + DEPTH} Z`} fill={s.dark} opacity="0.85" />
            {[p1, p2].map((p, j) => <line key={j} x1={p.x} y1={p.y} x2={p.x} y2={p.y + DEPTH} stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" />)}
          </g>
        ))}
        {segsData.map((s, i) => (
          <path key={i} d={topFacePath(s.a1, s.a2)} fill={s.color} opacity="0.92" stroke="rgba(2,8,16,0.6)" strokeWidth="0.8" filter="url(#pglow3d)" className="pie-seg" />
        ))}
        {segsData.map((s, i) => {
          const cosM = Math.cos(s.mid), sinM = Math.sin(s.mid)
          const startX = CX + (RX + 14) * cosM, startY = CY + (RY + 10) * sinM
          const elbowX = startX + cosM * 24, elbowY = startY + sinM * 24
          const isRight = cosM >= 0
          const endX = elbowX + (isRight ? 44 : -44)
          const textX = endX + (isRight ? 6 : -6)
          const anchor = isRight ? 'start' : 'end'
          return (
            <g key={i}>
              <circle cx={startX} cy={startY} r="2.2" fill={s.color} className="callout-label" />
              <polyline points={`${startX},${startY} ${elbowX},${elbowY} ${endX},${elbowY}`} stroke={s.color} strokeWidth="1" fill="none" filter="url(#lglow3d)" opacity="0.75" className="callout-line" />
              <circle cx={endX} cy={elbowY} r="2.8" fill={s.color} className="callout-label" />
              <text x={textX} y={elbowY - 3} textAnchor={anchor} fontSize="11" fill="#cbd5e1" fontFamily={FF} fontWeight="600" className="callout-label">{s.label}</text>
              <text x={textX} y={elbowY + 11} textAnchor={anchor} fontSize="9.5" fill={s.color} fontFamily={FF} fontWeight="700" opacity="0.9" className="callout-label">{s.sub}</text>
            </g>
          )
        })}
        <ellipse cx={CX} cy={CY} rx={28} ry={14} fill="#020810" opacity="0.9" />
        <text x={CX} y={CY - 2} textAnchor="middle" fontSize="13" fill="white" fontWeight="800" fontFamily={FF}>FEI</text>
        <text x={CX} y={CY + 9} textAnchor="middle" fontSize="7" fill="#60a5fa" fontWeight="600" fontFamily={FF} letterSpacing="1">PRIORITY</text>
      </svg>
    </div>
  )
}

export default function InsightsSection() {
  const t = useTranslations('insights')
  const { data } = useSWR<{ count: number }>('/api/suggestions', fetcher, { revalidateOnFocus: false, refreshWhenHidden: false })
  const suggestionCount = data?.count ?? 0

  const segLabels = [t('seg1'), t('seg2'), t('seg3'), t('seg4'), t('seg5')]
  const subLabel = (v: number) => `${v}%`

  const segsData: SegData[] = (() => {
    let ang = -Math.PI / 2
    return SEG_VALUES.map((value, i) => {
      const sweep = (value / TOTAL) * 2 * Math.PI
      const a1 = ang, a2 = ang + sweep, mid = ang + sweep / 2
      ang += sweep
      return { label: segLabels[i], sub: subLabel(value), value, color: SEG_COLORS[i], dark: SEG_DARKS[i], a1, a2, mid }
    })
  })()

  const stats = [
    { n: suggestionCount, s: '',       label: t('stat_suggestions_label'), color: 'text-blue-400' },
    { n: 3,               s: ' roky',  label: t('stat_years_label'),       color: 'text-[#818cf8]' },
    { n: 5,               s: ' miest', label: t('stat_seats_label'),       color: 'text-teal-400' },
    { n: 100,             s: '%',      label: t('stat_public_label'),      color: 'text-purple-400' },
  ]

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden" style={{ background: 'linear-gradient(180deg, #04101f 0%, #020810 100%)' }}>
      <div className="section-divider mb-0" />
      <div className="aurora-orb w-[40vw] h-[40vw] top-[5%] right-[-10vw] opacity-35"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)' }} aria-hidden />
      <div className="aurora-orb w-[30vw] h-[30vw] bottom-[5%] left-[-8vw] opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-purple-400 uppercase tracking-[0.2em] mb-4">
            {t('label')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{t('heading')}</h2>
          <p className="text-blue-200/55 max-w-2xl mx-auto text-base">{t('subline')}</p>
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <div className="glass rounded-3xl p-6 sm:p-10">
            <p className="text-xs font-semibold text-blue-400/50 uppercase tracking-[0.2em] text-center mb-8">
              {t('chart_label')}
            </p>
            <PieChart3D segsData={segsData} />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
              {segsData.map((s, i) => (
                <motion.div key={i} className="flex items-center gap-2"
                  custom={i} variants={legendItemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
                  <div>
                    <p className="text-[10px] font-semibold text-white/80 leading-tight">{s.label}</p>
                    <p className="text-[9px] font-bold tabular-nums" style={{ color: s.color }}>{s.value}%</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((item, i) => (
              <motion.div key={i} className="glass rounded-2xl p-5 text-center"
                custom={i} variants={statCardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className={`text-2xl sm:text-3xl font-black tabular-nums ${item.color}`}>
                  <Counter to={item.n} suffix={item.s} />
                </div>
                <div className="text-[10px] text-blue-400/45 mt-1 leading-tight uppercase tracking-wider">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
