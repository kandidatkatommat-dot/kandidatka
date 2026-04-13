'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Candidate } from '@/types'

const candidates: Candidate[] = [
  {
    id: 'MUC0075',
    name: 'Tomáš Mucha',
    role: 'Kandidát do AS FEI',
    department: 'FEI VŠB-TUO',
    bio: 'Študujem na FEI a verím, že každý študent si zaslúži byť vypočutý. Zaujímam sa o transparentnosť akademického prostredia a modernizáciu systémov pre študentov.',
    whyRunning:
      'Chcem, aby hlasy študentov dosiahli tam, kde sa rozhoduje o rozpočte, pravidlách a budúcnosti fakulty — nie len počas kampane, ale každý deň.',
    photoUrl: '/photos/tomas-mucha.jpg',
  },
  {
    id: 'BUC0130',
    name: 'Martin Buček',
    role: 'Kandidát do AS FEI',
    department: 'FEI VŠB-TUO',
    bio: 'Dobrá komunikácia medzi vedením a študentmi je základ kvalitného štúdia. Chcem byť tým spojovacím článkom, ktorý prináša konkrétne výsledky.',
    whyRunning:
      'Senát schvaľuje rozpočet, pravidlá, volí dekana. To je presne miesto, kde môžeme systematicky meniť veci k lepšiemu — nie len sľubovať.',
    photoUrl: '/photos/martin-bucek.jpg',
  },
]

const stats = [
  { value: '3', suffix: 'roky', label: 'funkčného obdobia' },
  { value: '2026', suffix: '–29', label: 'termín mandátu' },
  { value: '100', suffix: '%', label: 'oddanosť veci' },
]

const cardAccents = [
  { border: 'rgba(59,130,246,0.4)', quoteColor: 'text-blue-500/20', quoteBorder: 'border-blue-500/30', quoteText: 'text-blue-200/60' },
  { border: 'rgba(249,115,22,0.4)', quoteColor: 'text-orange-500/20', quoteBorder: 'border-orange-500/30', quoteText: 'text-blue-200/60' },
]

function CandidateCard({ c, direction, accentIdx }: { c: Candidate; direction: 'left' | 'right'; accentIdx: number }) {
  const initials = c.name.split(' ').map((n) => n[0]).join('')
  const accent = cardAccents[accentIdx]
  return (
    <AnimatedSection direction={direction}>
      <motion.div
        className="glass glass-hover rounded-3xl p-8 h-full flex flex-col gap-6 group transition-transform duration-300 hover:-translate-y-1"
        style={{ borderTop: `2px solid ${accent.border}` }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        {/* Avatar row */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-lg bg-blue-500/25 scale-110" />
            <Avatar className="relative w-20 h-20 ring-2 ring-blue-500/20 ring-offset-2 ring-offset-[#020810]">
              <AvatarImage src={c.photoUrl ?? undefined} alt={c.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{c.name}</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant="outline" className="text-xs border-blue-500/25 text-blue-300 bg-blue-500/8 font-mono">
                {c.id}
              </Badge>
              <span className="text-xs text-blue-400/50">FEI VŠB-TUO</span>
            </div>
            {c.linkedIn && (
              <a
                href={c.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1.5 text-xs text-blue-400/50 hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={11} />
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-blue-100/65 text-sm leading-relaxed flex-1">{c.bio}</p>

        {/* Quote — prominent with large decorative mark */}
        <div className="relative mt-4">
          <span className={`absolute -top-2 -left-1 text-4xl ${accent.quoteColor} font-serif leading-none select-none`}>&ldquo;</span>
          <blockquote className={`pl-4 border-l-2 ${accent.quoteBorder} text-sm ${accent.quoteText} italic leading-relaxed`}>
            {c.whyRunning}
          </blockquote>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}

export default function AboutSection() {
  return (
    <section id="o-nas" className="relative py-28 sm:py-36" style={{ background: '#020810' }}>
      <div className="aurora-orb w-[40vw] h-[40vw] top-0 right-[-10vw] opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-[0.2em] mb-4">
            Kandidáti
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Kto sme?
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto text-base">
            Dvaja študenti FEI, ktorí chcú byť skutočným hlasom akademickej obce v senáte.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {candidates.map((c, i) => (
            <CandidateCard key={c.id} c={c} direction={i === 0 ? 'left' : 'right'} accentIdx={i} />
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="glass glow-ring-blue rounded-2xl p-5 text-center">
              <div className="text-3xl font-black gradient-text-blue tabular-nums">
                {s.value}<span className="text-xl">{s.suffix}</span>
              </div>
              <div className="text-xs text-blue-400/50 mt-1 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
