'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'

const cards = [
  // ── Czech ────────────────────────────────────────────
  { quote: 'Konečně někdo bere vážně digitalizaci na FEI. Čekáme na to celé studium.', name: 'Marek K.', year: '3. ročník', dept: 'Informatika', flag: '🇨🇿', color: '#3b82f6' },
  { quote: 'Osobně jsem jim napsal přes web a odpověděli do hodiny. To je přesně ten přístup, jaký od senátorů čekám.', name: 'Jana P.', year: '2. ročník', dept: 'Elektrotechnika', flag: '🇨🇿', color: '#06b6d4' },
  { quote: 'Revize zkušebního řádu je něco, na co čekáme hodně dlouho. Snad to konečně prosadí.', name: 'Lukáš M.', year: 'Ing. 1. ročník', dept: 'Kybernetika', flag: '🇨🇿', color: '#8b5cf6' },
  { quote: 'Veřejné Q&A každý semestr? To by změnilo všechno. Konečně bychom věděli, co se v senátu děje.', name: 'Petra V.', year: '4. ročník', dept: 'Elektrotechnika', flag: '🇨🇿', color: '#10b981' },
  { quote: 'Kampaň s konkrétním programem. Ne jen prázdné sliby, ale skutečné kroky, které senát může udělat.', name: 'Tomáš H.', year: '3. ročník', dept: 'Informatika', flag: '🇨🇿', color: '#4f46e5' },
  // ── Slovak ───────────────────────────────────────────
  { quote: 'Transparentné správy zo senátu by boli revolúcia. Doteraz nikto ani nevedel, čo sa tam rozhoduje.', name: 'Simona B.', year: 'Ing. 2. ročník', dept: 'Mechatronika', flag: '🇸🇰', color: '#6d28d9' },
  { quote: 'Podával som podnet a dostalo sa mi odpovede. Prvýkrát som mal pocit, že ma niekto počuje.', name: 'Rastislav D.', year: '2. ročník', dept: 'Informatika', flag: '🇸🇰', color: '#3b82f6' },
  // ── English (Erasmus / exchange) ─────────────────────
  { quote: "Voting online in 2 minutes? That's how it should work everywhere. Great initiative.", name: 'Priya M.', year: '2nd year, Erasmus', dept: 'Computer Science', flag: '🇮🇳', color: '#06b6d4' },
  { quote: "I didn't know how the academic senate worked before. Now I do — and I'm voting.", name: 'Lucas W.', year: '3rd year, Exchange', dept: 'Electronics', flag: '🇩🇪', color: '#10b981' },
]

function Card({ quote, name, year, dept, flag, color }: (typeof cards)[0]) {
  return (
    <div
      className="flex-shrink-0 w-[290px] sm:w-[320px] glass glass-hover rounded-2xl p-5 mx-2.5 flex flex-col gap-3"
      style={{ borderColor: `${color}18` }}
    >
      {/* Flag + quote */}
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0 mt-0.5">{flag}</span>
        <p className="text-[13px] text-blue-100/65 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />

      {/* Author */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${color}, #020810)` }}
        >
          {name[0]}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white leading-tight">{name}</p>
          <p className="text-[11px] text-blue-400/45">{year} · {dept}</p>
        </div>
      </div>
    </div>
  )
}

export default function SocialProofSection() {
  const doubled = [...cards, ...cards]

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #03080f 0%, #060f1e 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <AnimatedSection className="text-center">
          <span className="inline-block text-xs font-semibold text-[#818cf8] uppercase tracking-[0.2em] mb-3">
            Reakcie z celej FEI
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Študenti za nami stoja
          </h2>
          <p className="text-blue-300/35 text-xs tracking-widest uppercase">
            <span className="text-[#818cf8]/70">🇨🇿</span> Česky &nbsp;·&nbsp;
            <span className="text-purple-400/70">🇸🇰</span> Slovensky &nbsp;·&nbsp;
            <span className="text-teal-400/70">🌍</span> English
          </p>
        </AnimatedSection>
      </div>

      {/* Row 1 — forward */}
      <div className="relative mb-3">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #03080f, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #060f1e, transparent)' }} />

        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
          style={{ width: 'max-content' }}
        >
          {doubled.map((c, i) => <Card key={i} {...c} />)}
        </motion.div>
      </div>

      {/* Row 2 — reverse (offset by half) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #03080f, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #060f1e, transparent)' }} />

        <motion.div
          className="flex"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 42, ease: 'linear', repeat: Infinity }}
          style={{ width: 'max-content' }}
        >
          {doubled.map((c, i) => <Card key={i} {...c} />)}
        </motion.div>
      </div>
    </section>
  )
}
