'use client'

import { motion } from 'framer-motion'
import { FileText, MessageSquare, DollarSign, Scale, Monitor, Users } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

const promises = [
  {
    icon: FileText,
    title: 'Transparentné správy',
    description: 'Každý mesiac zverejníme zrozumiteľný súhrn rozhodnutí senátu. Žiadna byrokracia — len jasné info pre každého.',
    tag: 'Komunikácia',
    accent: 'blue',
    span: 'bento-tall',
    featured: true,
  },
  {
    icon: DollarSign,
    title: 'Hlas pri rozpočte',
    description: 'Pri schvaľovaní rozpočtu fakulty budeme aktívne presadzovať priority študentov — lepšie vybavenie, dostupné priestory.',
    tag: 'Financie',
    accent: 'orange',
    span: '',
  },
  {
    icon: MessageSquare,
    title: 'Otvorený kanál podnetov',
    description: 'Táto stránka zostane aktívna počas celého funkčného obdobia 2026–2029.',
    tag: 'Zapojenie',
    accent: 'teal',
    span: '',
  },
  {
    icon: Scale,
    title: 'Férovejší skúšobný poriadok',
    description: 'Iniciujeme revíziu skúšobného poriadku s dôrazom na transparentnosť hodnotenia a férovosť opravných termínov.',
    tag: 'Akademické pravidlá',
    accent: 'orange',
    span: 'bento-wide',
  },
  {
    icon: Monitor,
    title: 'Lepšie digitálne nástroje',
    description: 'Podporíme modernizáciu systémov pre študentov — od portálov až po e-learningové platformy.',
    tag: 'Digitalizácia',
    accent: 'blue',
    span: '',
  },
  {
    icon: Users,
    title: 'Verejné Q&A každý semester',
    description: 'Každý semester usporiadame verejné stretnutie kde odpovieme na otázky a porozprávame sa o dianí na FEI.',
    tag: 'Dialóg',
    accent: 'teal',
    span: '',
  },
]

const accentMap = {
  blue:   { icon: 'text-blue-400',   bg: 'bg-blue-500/12',   tag: 'bg-blue-500/10 text-blue-300 border-blue-500/20',   glow: 'hover:shadow-blue-500/10'   },
  orange: { icon: 'text-orange-400', bg: 'bg-orange-500/12', tag: 'bg-orange-500/10 text-orange-300 border-orange-500/20', glow: 'hover:shadow-orange-500/10' },
  teal:   { icon: 'text-teal-400',   bg: 'bg-teal-500/12',   tag: 'bg-teal-500/10 text-teal-300 border-teal-500/20',   glow: 'hover:shadow-teal-500/10'   },
}

export default function ProgramSection() {
  return (
    <section id="program" className="relative py-28 sm:py-36" style={{ background: 'linear-gradient(180deg, #020810 0%, #04101f 100%)' }}>
      <div className="aurora-orb w-[45vw] h-[45vw] top-[10%] left-[-15vw] opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} aria-hidden />

      <div className="section-divider mb-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            Náš program
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Čo sľubujeme?
          </h2>
          <p className="text-blue-200/55 max-w-2xl mx-auto text-base">
            Len reálne záväzky v rámci právomocí akademického senátu.{' '}
            <span className="text-orange-400/80 font-medium">Žiadne prázdne sľuby.</span>
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <motion.div
          className="bento-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {promises.map((p) => {
            const Icon = p.icon
            const a = accentMap[p.accent as keyof typeof accentMap]
            return (
              <motion.div
                key={p.title}
                className={`glass glass-hover rounded-3xl p-6 sm:p-7 flex flex-col gap-4 group cursor-default transition-all duration-300 hover:shadow-xl ${a.glow} ${p.span}`}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.97 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
                }}
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                {/* Icon + tag */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${a.bg}`}>
                    <Icon className={`${a.icon} w-5 h-5`} />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${a.tag}`}>
                    {p.tag}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-blue-100/60 leading-relaxed">{p.description}</p>
                </div>

                {/* Bottom rule — subtle accent line */}
                <div className={`mt-auto h-0.5 rounded-full w-12 opacity-40 group-hover:w-20 transition-all duration-500 ${
                  p.accent === 'blue' ? 'bg-blue-400' : p.accent === 'orange' ? 'bg-orange-400' : 'bg-teal-400'
                }`} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer note */}
        <AnimatedSection delay={0.3} className="text-center mt-10">
          <p className="text-xs text-blue-400/35 font-medium">
            Všetky sľuby sú v rámci zákonom definovaných kompetencií Akademického senátu (zákon č. 111/1998 Sb.)
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
