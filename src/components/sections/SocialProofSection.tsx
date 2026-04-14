'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'

const cards = [
  { quote: 'Konečně někdo bere vážně digitalizaci na FEI. Čekáme na to celé studium.', name: 'Marek K.', year: '3. ročník', dept: 'Informatika', color: '#3b82f6' },
  { quote: 'Osobně jsem jim napsal přes web a odpověděli do hodiny. Přesně ten přístup, jaký od senátorů čekám.', name: 'Jana P.', year: '2. ročník', dept: 'Elektrotechnika', color: '#06b6d4' },
  { quote: 'Revize zkušebního řádu je něco, na co čekáme hodně dlouho. Snad to konečně prosadí.', name: 'Lukáš M.', year: 'Ing. 1. ročník', dept: 'Kybernetika', color: '#8b5cf6' },
  { quote: 'Transparentné správy zo senátu by boli revolúcia. Doteraz nikto nevedel, čo sa tam rozhoduje.', name: 'Simona B.', year: 'Ing. 2. ročník', dept: 'Mechatronika', color: '#4f46e5' },
  { quote: 'Verejné Q&A každý semester? To by zmenilo všetko. Nakoniec by sme vedeli, čo sa deje v senáte.', name: 'Rastislav D.', year: '2. ročník', dept: 'Informatika', color: '#10b981' },
  { quote: 'Kampaň s konkrétnym programom. Nie len prázdne sľuby — skutočné kroky, ktoré senát môže urobiť.', name: 'Tomáš H.', year: '3. ročník', dept: 'Informatika', color: '#0ea5e9' },
  { quote: "Finally, candidates who actually address real issues. Better digital tools and transparent decisions.", name: 'Priya M.', year: '2nd year, Erasmus', dept: 'Computer Science', color: '#06b6d4' },
  { quote: "I didn't know how the academic senate worked before. Now I do — and I'm voting.", name: 'Lucas W.', year: '3rd year, Exchange', dept: 'Electronics', color: '#818cf8' },
  { quote: 'Verejné Q&A stretnutia so senátormi sú skvelý nápad. Na iných školách to funguje skvele.', name: 'Ondřej P.', year: '2. ročník Ing.', dept: 'Telekomunikácie', color: '#3b82f6' },
]

function Card({ quote, name, year, dept, color }: (typeof cards)[0]) {
  return (
    <div
      className="flex-shrink-0 w-[min(290px,calc(100vw-2rem))] sm:w-[320px] glass glass-hover rounded-2xl p-5 mx-2.5 flex flex-col gap-3"
      style={{ borderColor: `${color}18` }}
    >
      <p className="text-[13px] text-blue-100/65 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>

      <div className="h-px" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />

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
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

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
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Študenti za nami stoja
          </h2>
        </AnimatedSection>
      </div>

      {/* Single infinite scroll row */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #03080f, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #060f1e, transparent)' }} />

        <motion.div
          className="flex"
          animate={paused ? {} : { x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {doubled.map((c, i) => <Card key={`${i}-${c.name}`} {...c} />)}
        </motion.div>
      </div>
    </section>
  )
}
