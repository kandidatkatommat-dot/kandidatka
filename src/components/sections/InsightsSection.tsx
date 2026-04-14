'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'

/* ── Data ───────────────────────────────────────────────── */
const segments = [
  { label: 'Digitalizácia',        pct: 28, color: '#3b82f6', dark: '#1d4ed8' },
  { label: 'Výuka & hodnotenie',   pct: 24, color: '#f97316', dark: '#c2410c' },
  { label: 'Skúšobný poriadok',    pct: 22, color: '#06b6d4', dark: '#0e7490' },
  { label: 'Kampus & priestory',   pct: 16, color: '#8b5cf6', dark: '#6d28d9' },
  { label: 'Komunikácia',          pct: 10, color: '#10b981', dark: '#047857' },
]

const filmFrames = [
  { title: 'Transparentnosť',  score: 94, desc: 'Mesačné správy zo senátu', color: '#3b82f6' },
  { title: 'Skúšky férovejšie', score: 91, desc: 'Revízia skúšobného poriadku', color: '#f97316' },
  { title: 'Váš hlas v rozpočte', score: 88, desc: 'Priame zastupovanie potrieb', color: '#06b6d4' },
  { title: 'Digitálne nástroje', score: 85, desc: 'Modernizácia systémov FEI', color: '#8b5cf6' },
  { title: 'Verejné Q&A',       score: 96, desc: 'Každý semester bez výnimky', color: '#10b981' },
]

/* ── Animated counter ───────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
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
}

/* ── SVG Donut Chart ────────────────────────────────────── */
const CX = 110, CY = 110, R = 80, r = 50
const STROKE = R - r

function polarToXY(deg: number, radius: number) {
  const rad = (deg - 90) * (Math.PI / 180)
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

function segmentPath(startDeg: number, endDeg: number) {
  const mid = (R + r) / 2
  const o1 = polarToXY(startDeg, R), o2 = polarToXY(endDeg, R)
  const i1 = polarToXY(endDeg, r), i2 = polarToXY(startDeg, r)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M${o1.x},${o1.y} A${R},${R} 0 ${large},1 ${o2.x},${o2.y} L${i1.x},${i1.y} A${r},${r} 0 ${large},0 ${i2.x},${i2.y} Z`
}

function DonutChart() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [visible, setVisible] = useState(segments.map(() => false))

  useEffect(() => {
    if (!inView) return
    segments.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => { const n = [...prev]; n[i] = true; return n })
      }, i * 180)
    })
  }, [inView])

  let cumDeg = 0
  const segs = segments.map((s) => {
    const start = cumDeg
    cumDeg += (s.pct / 100) * 360
    return { ...s, start, end: cumDeg }
  })

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full blur-2xl opacity-20"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
        <svg ref={ref} width={220} height={220} className="relative drop-shadow-2xl">
          {segs.map((s, i) => (
            <motion.path
              key={i}
              d={segmentPath(s.start, s.end)}
              fill={hoveredIdx === i ? s.color : s.dark}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={visible[i] ? {
                opacity: 1,
                scale: hoveredIdx === i ? 1.04 : 1,
                transformOrigin: `${CX}px ${CY}px`,
              } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
              style={{ filter: hoveredIdx === i ? `drop-shadow(0 0 8px ${s.color}80)` : 'none' }}
            />
          ))}
          {/* Center */}
          <circle cx={CX} cy={CY} r={r - 4} fill="#020810" />
          <text x={CX} y={CY - 6} textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="inherit">
            {hoveredIdx !== null ? segments[hoveredIdx].pct + '%' : '5'}
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="inherit" fontWeight="600" letterSpacing="1">
            {hoveredIdx !== null ? 'PODNETOV' : 'KATEGÓRIÍ'}
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 gap-2 w-full max-w-[260px]">
        {segs.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={visible[i] ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.35, delay: i * 0.18 + 0.3 }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-default ${hoveredIdx === i ? 'bg-white/5' : ''}`}
          >
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: s.color }} />
            <span className="text-xs text-blue-200/70 flex-1">{s.label}</span>
            <span className="text-xs font-bold tabular-nums" style={{ color: s.color }}>{s.pct}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Film Frame ─────────────────────────────────────────── */
function Perforation({ y }: { y: number }) {
  return (
    <>
      {[12, 30, 48, 66, 84, 102].map((x) => (
        <rect key={x} x={x} y={y} width="8" height="6" rx="1.5" fill="#0a1628" />
      ))}
    </>
  )
}

function FilmFrame({ frame, index, inView }: { frame: typeof filmFrames[0]; index: number; inView: boolean }) {
  const [shown, setShown] = useState(false)
  const scoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setShown(true), index * 200)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -25 }}
      animate={shown ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -25 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-shrink-0 w-[136px] group"
      style={{ perspective: 400 }}
    >
      {/* Film strip SVG shell */}
      <svg width="136" height="200" className="absolute inset-0" viewBox="0 0 136 200">
        <rect width="136" height="200" rx="4" fill="#0a1628" />
        <rect x="6" y="0" width="124" height="200" fill="#060f1e" />
        <Perforation y={8} />
        <Perforation y={186} />
      </svg>

      {/* Content inside frame */}
      <div className="relative z-10 mx-[6px] mt-[22px] mb-[22px] h-[156px] rounded-sm overflow-hidden flex flex-col"
        style={{ background: `linear-gradient(160deg, ${frame.color}15 0%, #020810 100%)` }}>

        {/* Score arc */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-3">
          <svg width="80" height="80" viewBox="0 0 80 80" className="overflow-visible">
            {/* Track */}
            <circle cx="40" cy="40" r="30" fill="none" stroke="#ffffff08" strokeWidth="6" />
            {/* Arc */}
            <motion.circle
              cx="40" cy="40" r="30"
              fill="none"
              stroke={frame.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 30}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
              animate={shown ? { strokeDashoffset: 2 * Math.PI * 30 * (1 - frame.score / 100) } : { strokeDashoffset: 2 * Math.PI * 30 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              transform="rotate(-90 40 40)"
              style={{ filter: `drop-shadow(0 0 4px ${frame.color}80)` }}
            />
            {/* Score text */}
            <text x="40" y="36" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="inherit">
              {frame.score}
            </text>
            <text x="40" y="50" textAnchor="middle" fill={frame.color} fontSize="7" fontWeight="600" fontFamily="inherit" letterSpacing="1">
              / 100
            </text>
          </svg>

          <div className="text-center">
            <p className="text-[11px] font-bold text-white leading-tight">{frame.title}</p>
            <p className="text-[9px] text-blue-300/40 mt-0.5 leading-tight">{frame.desc}</p>
          </div>
        </div>

        {/* Bottom color bar */}
        <motion.div
          className="h-1 w-full"
          style={{ background: frame.color }}
          initial={{ scaleX: 0 }}
          animate={shown ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </div>
    </motion.div>
  )
}

/* ── Main Section ───────────────────────────────────────── */
export default function InsightsSection() {
  const filmRef = useRef<HTMLDivElement>(null)
  const filmInView = useInView(filmRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #04101f 0%, #020810 100%)' }}>
      <div className="section-divider mb-0" />

      {/* BG orbs */}
      <div className="aurora-orb w-[40vw] h-[40vw] top-[5%] right-[-10vw] opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} aria-hidden />
      <div className="aurora-orb w-[30vw] h-[30vw] bottom-[10%] left-[-8vw] opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-28">

        {/* Heading */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-purple-400 uppercase tracking-[0.2em] mb-4">
            Dáta & Priority
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Čo FEI naozaj potrebuje?
          </h2>
          <p className="text-blue-200/55 max-w-2xl mx-auto text-base">
            Analýza podnetov od študentov. Každé rozhodnutie v senáte vychádza z týchto dát.
          </p>
        </AnimatedSection>

        {/* Top row: Donut + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-center">
          {/* Donut */}
          <AnimatedSection direction="left">
            <div className="glass rounded-3xl p-8 flex flex-col items-center">
              <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-[0.2em] mb-6">
                Rozloženie podnetov od študentov
              </p>
              <DonutChart />
            </div>
          </AnimatedSection>

          {/* Right stats */}
          <AnimatedSection direction="right">
            <div className="space-y-5">
              <div className="glass rounded-3xl p-7">
                <p className="text-xs text-blue-400/50 uppercase tracking-widest mb-5">Kľúčové čísla</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 847, s: '+', label: 'podnetov zebrali sme', color: 'text-blue-400' },
                    { n: 3,   s: ' roky', label: 'mandát 2026–2029', color: 'text-orange-400' },
                    { n: 5,   s: ' miest', label: 'senát má pre študentov', color: 'text-teal-400' },
                    { n: 100, s: '%', label: 'záväzkov verejných', color: 'text-purple-400' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="glass rounded-2xl p-4 text-center"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <div className={`text-2xl font-black tabular-nums ${item.color}`}>
                        <Counter to={item.n} suffix={item.s} />
                      </div>
                      <div className="text-[10px] text-blue-400/45 mt-1 leading-tight uppercase tracking-wider">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Priority bars */}
              <div className="glass rounded-3xl p-7">
                <p className="text-xs text-blue-400/50 uppercase tracking-widest mb-5">Top priority podľa hlasov</p>
                <div className="space-y-4">
                  {segments.slice(0, 3).map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-blue-100/75 font-medium">{s.label}</span>
                        <span className="text-sm font-bold tabular-nums" style={{ color: s.color }}>{s.pct}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${s.dark}, ${s.color})` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Film strip */}
        <div ref={filmRef}>
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-[0.2em] mb-3">
              Naše hodnotenia záväzkov
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Každý sľub — skóre pripravenosti
            </h3>
          </AnimatedSection>

          {/* Film strip container */}
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #020810, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #020810, transparent)' }} />

            {/* Horizontal film strip line */}
            <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 scrollbar-none"
              style={{ scrollbarWidth: 'none' }}>

              {/* Sprocket strip top */}
              <div className="hidden sm:flex flex-col items-center gap-0 relative">
                <div className="w-px h-full absolute left-1/2 bg-blue-500/5" />
              </div>

              {filmFrames.map((frame, i) => (
                <FilmFrame key={i} frame={frame} index={i} inView={filmInView} />
              ))}
            </div>
          </div>

          <AnimatedSection delay={0.4} className="text-center mt-8">
            <p className="text-xs text-blue-400/30">
              Skóre vychádza z konkrétnosti sľubu, právomocí senátu a podnetov od študentov
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
