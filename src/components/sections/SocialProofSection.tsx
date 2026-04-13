'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'

const testimonials = [
  { quote: 'Konečne kandidáti, ktorí vedia čo chcú. Transparentnosť v senáte je to, čo FEI potrebuje.', name: 'Marek K.', year: '3. ročník', dept: 'Informatika' },
  { quote: 'Páči sa mi, že majú konkrétne plány a nie len sľuby. Podával som podnet a dostalo sa mi odpovede.', name: 'Jana P.', year: '2. ročník', dept: 'Elektrotechnika' },
  { quote: 'Revízia skúšobného poriadku je niečo, na čo čakáme dlho. Dúfam, že to dokážu presadiť.', name: 'Lukáš M.', year: 'Ing. 1. ročník', dept: 'Kybernetika' },
  { quote: 'Osobne som im napísal cez web a odpovedali do hodiny. To je servis, aký od senátorov čakám.', name: 'Petra V.', year: '4. ročník', dept: 'Elektrotechnika' },
  { quote: 'Digitalizácia nástrojov na FEI je katastrofa. Rád, že to niekto konečne berie vážne.', name: 'Tomáš H.', year: '3. ročník', dept: 'Informatika' },
  { quote: 'Verejné Q&A každý semester? To by zmenilo všetko. Nakoniec by sme vedeli, čo sa deje v senáte.', name: 'Simona B.', year: 'Ing. 2. ročník', dept: 'Mechatronika' },
]

function TestimonialCard({ quote, name, year, dept }: (typeof testimonials)[0]) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] glass glass-hover rounded-2xl p-6 flex flex-col gap-4 mx-3">
      <p className="text-sm text-blue-100/65 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3 mt-auto">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #f97316)' }}
        >
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">{name}</p>
          <p className="text-xs text-blue-400/50">
            {year} · {dept}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SocialProofSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const doubled = [...testimonials, ...testimonials]

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #03080f 0%, #060f1e 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <AnimatedSection className="text-center">
          <span className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-[0.2em] mb-3">
            Čo hovoria študenti
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Študenti za nami stoja</h2>
        </AnimatedSection>
      </div>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Gradient fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #03080f, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #060f1e, transparent)' }}
        />

        <motion.div
          ref={trackRef}
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          style={{ width: 'max-content' }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
