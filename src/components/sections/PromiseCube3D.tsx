'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      { Icon: ClipboardLines, title: 'Mesačné správy', sub: 'Súhrn rozhodnutí senátu každý mesiac', color: 'rgba(59,130,246,0.14)', accent: '#3b82f6' },
      { Icon: VoteCheck,      title: 'Verejné hlasovanie', sub: 'Každé naše hlasovanie bude logované', color: 'rgba(79,70,229,0.12)', accent: '#818cf8' },
      { Icon: Broadcast,      title: 'Otvorený kanál', sub: 'Podnety od študentov celý mandát', color: 'rgba(6,182,212,0.12)', accent: '#06b6d4' },
      { Icon: ShieldCheck,    title: 'Žiadne tajné dohody', sub: 'Všetky rozhodnutia dostupné 24/7', color: 'rgba(139,92,246,0.12)', accent: '#8b5cf6' },
    ],
  },
  {
    id: 1,
    label: 'Akademické práva',
    cells: [
      { Icon: Scales,      title: 'Férovejší skúšobný poriadok', sub: 'Revízia opravných termínov', color: 'rgba(79,70,229,0.14)', accent: '#818cf8' },
      { Icon: CoinStack,   title: 'Hlas pri rozpočte', sub: 'Priority študentov vo financiách', color: 'rgba(16,185,129,0.12)', accent: '#10b981' },
      { Icon: StarBadge,   title: 'Transparentné hodnotenie', sub: 'Jasné kritériá, nie ľubovôľa', color: 'rgba(59,130,246,0.12)', accent: '#3b82f6' },
      { Icon: PenDocument, title: 'Formálne návrhy', sub: 'Iniciatívy predložené senátu', color: 'rgba(6,182,212,0.10)', accent: '#06b6d4' },
    ],
  },
  {
    id: 2,
    label: 'Digitalizácia',
    cells: [
      { Icon: ScreenCode, title: 'Lepšie digitálne nástroje', sub: 'Modernizácia portálov a e-learningu', color: 'rgba(6,182,212,0.14)', accent: '#06b6d4' },
      { Icon: Gear,       title: 'Upgrade systémov', sub: 'IS/STAG a ďalšie platformy', color: 'rgba(59,130,246,0.12)', accent: '#3b82f6' },
      { Icon: Smartphone, title: 'Mobilné riešenia', sub: 'Funkčnosť na všetkých zariadeniach', color: 'rgba(139,92,246,0.12)', accent: '#8b5cf6' },
      { Icon: Lightbulb,  title: 'Návrhy od vás', sub: 'Implementujeme čo reálne potrebujete', color: 'rgba(79,70,229,0.12)', accent: '#818cf8' },
    ],
  },
  {
    id: 3,
    label: 'Dialóg',
    cells: [
      { Icon: PeopleTalk, title: 'Verejné Q&A každý semester', sub: 'Otvorené stretnutia so senátormi', color: 'rgba(16,185,129,0.14)', accent: '#10b981' },
      { Icon: Mail,       title: 'Priamy kontakt', sub: 'kandidatkatommat@gmail.com', color: 'rgba(59,130,246,0.12)', accent: '#3b82f6' },
      { Icon: UsersGroup, title: 'Komunita FEI', sub: 'Discord, konzultácie, feedback', color: 'rgba(88,101,242,0.14)', accent: '#5865F2' },
      { Icon: BarChart,   title: 'Výsledky zverejnené', sub: 'Čo sa podarilo — na tomto webe', color: 'rgba(6,182,212,0.12)', accent: '#06b6d4' },
    ],
  },
]

/* ── Desktop 3D cube ────────────────────────────────── */
const FACE_SIZE = 320
const HALF = FACE_SIZE / 2

const faceTransforms = [
  `rotateY(0deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
]

type Cell = typeof faces[0]['cells'][0]

function CubeFace({ face }: { face: typeof faces[0] }) {
  return (
    <div
      className="grid grid-cols-2 gap-2 p-4 h-full"
      style={{ background: 'linear-gradient(135deg, rgba(4,16,31,0.95) 0%, rgba(9,22,41,0.98) 100%)' }}
    >
      {face.cells.map((cell: Cell, i: number) => (
        <div
          key={i}
          className="rounded-xl p-3 flex flex-col gap-2"
          style={{ background: cell.color, border: `1px solid ${cell.accent}22` }}
        >
          <div style={{ color: cell.accent }}><cell.Icon size={18} /></div>
          <p className="text-xs font-bold text-white/85 leading-snug">{cell.title}</p>
          <p className="text-[10px] text-blue-200/45 leading-snug">{cell.sub}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Mobile carousel fallback ───────────────────────── */
function MobileCarousel({ step }: { step: number }) {
  const face = faces[step % faces.length]
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(4,16,31,0.95) 0%, rgba(9,22,41,0.98) 100%)',
          border: '1px solid rgba(59,130,246,0.1)',
        }}
      >
        <div className="px-4 pt-3 pb-1">
          <span className="text-[10px] font-semibold text-blue-400/50 uppercase tracking-widest">{face.label}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 p-3">
          {face.cells.map((cell: Cell, i: number) => (
            <div
              key={i}
              className="rounded-xl p-3 flex flex-col gap-2"
              style={{ background: cell.color, border: `1px solid ${cell.accent}22` }}
            >
              <div style={{ color: cell.accent }}><cell.Icon size={18} /></div>
              <p className="text-xs font-bold text-white/85 leading-snug">{cell.title}</p>
              <p className="text-[10px] text-blue-200/45 leading-snug">{cell.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Main export ────────────────────────────────────── */
export default function PromiseCube3D() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep((s) => s + 1), 5000)
    return () => clearInterval(t)
  }, [])

  const rotateY = step * -90

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Label strip */}
      <div className="flex gap-2 flex-wrap justify-center">
        {faces.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setStep(i)}
            className={`text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-300 ${
              (step % faces.length) === i
                ? 'bg-[#4f46e5]/25 text-[#a5b4fc] border border-[#4f46e5]/40'
                : 'text-blue-400/35 hover:text-blue-400/60 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Desktop 3D cube */}
      <div className="hidden sm:flex items-center justify-center" style={{ height: FACE_SIZE + 60 }}>
        <div style={{ perspective: 800 }}>
          <motion.div
            style={{
              width: FACE_SIZE,
              height: FACE_SIZE,
              transformStyle: 'preserve-3d',
              position: 'relative',
            }}
            animate={{ rotateY }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          >
            {faces.map((face, i) => (
              <div
                key={face.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: faceTransforms[i],
                  backfaceVisibility: 'hidden',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(59,130,246,0.12)',
                  boxShadow: '0 0 40px rgba(79,70,229,0.08)',
                }}
              >
                <CubeFace face={face} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile carousel */}
      <div className="sm:hidden w-full">
        <MobileCarousel step={step % faces.length} />
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5">
        {faces.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            aria-label={`Strana ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              (step % faces.length) === i
                ? 'w-5 h-1.5 bg-[#818cf8]'
                : 'w-1.5 h-1.5 bg-blue-500/25 hover:bg-blue-500/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
