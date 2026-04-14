'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, FlyIcon } from '@/components/shared/Icons'
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

const discordNicks: Record<string, string> = {
  MUC0075: 'Tom. (Starky) Muc.',
  BUC0130: 'Bucoun',
}

/* Discord logo SVG — simplified wordmark icon */
function DiscordIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="Discord">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

const stats = [
  { value: '3', suffix: 'roky', label: 'funkčného obdobia' },
  { value: '2026', suffix: '–29', label: 'termín mandátu' },
  { value: '100', suffix: '%', label: 'oddanosť veci' },
]

const cardAccents = [
  { border: 'rgba(59,130,246,0.4)', quoteColor: 'text-blue-500/20', quoteBorder: 'border-blue-500/30', quoteText: 'text-blue-200/60' },
  { border: 'rgba(232,99,74,0.4)', quoteColor: 'text-[#4f46e5]/20', quoteBorder: 'border-[#4f46e5]/30', quoteText: 'text-blue-200/60' },
]

function CandidateCard({ c, direction, accentIdx }: { c: Candidate; direction: 'left' | 'right'; accentIdx: number }) {
  const initials = c.name.split(' ').map((n) => n[0]).join('')
  const accent = cardAccents[accentIdx]
  const discordNick = discordNicks[c.id]
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
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {c.name}
              {c.id === 'MUC0075' && (
                <span title="Mucha 🪰" className="text-blue-400/40 hover:text-blue-300/70 transition-colors cursor-default">
                  <FlyIcon size={14} className="inline" />
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant="outline" className="text-xs border-blue-500/25 text-blue-300 bg-blue-500/8 font-mono">
                {c.id}
              </Badge>
              <span className="text-xs text-blue-400/50">FEI VŠB-TUO</span>
            </div>
            {discordNick && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[#5865F2]/60">
                  <DiscordIcon size={12} />
                </span>
                <span className="text-xs font-mono text-[#5865F2]/60">{discordNick}</span>
              </div>
            )}
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
          <span className="inline-block text-xs font-semibold text-[#818cf8] uppercase tracking-[0.2em] mb-4">
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
