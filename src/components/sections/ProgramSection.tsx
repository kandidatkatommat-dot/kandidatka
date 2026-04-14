'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DocumentEye, CoinStack, ChatBubbleHeart, Scales, ScreenCode, PeopleTalk } from '@/components/shared/Icons'
import AnimatedSection from '@/components/shared/AnimatedSection'

const promises = [
  {
    icon: DocumentEye,
    title: 'Transparentné správy',
    description: 'Každý mesiac zverejníme zrozumiteľný súhrn rozhodnutí senátu. Žiadna byrokracia — len jasné info pre každého.',
    tag: 'Komunikácia',
    accent: 'blue',
    span: 'bento-tall',
    featured: true,
    detail: 'Každý mesiac uverejníme správu o rozhodnutiach senátu — vrátane hlasovaní a našich pozícií. Žiadne tajné dohody. Dostupné na tomto webe 24/7.',
    link: '#podnety',
  },
  {
    icon: CoinStack,
    title: 'Hlas pri rozpočte',
    description: 'Pri schvaľovaní rozpočtu fakulty budeme aktívne presadzovať priority študentov — lepšie vybavenie, dostupné priestory.',
    tag: 'Financie',
    accent: 'orange',
    span: '',
    detail: 'Pri každom hlasovaní o rozpočte budeme aktívne presadzovať alokáciu na projekty navrhnuté študentmi — laboratóriá, vybavenie, digitálne nástroje.',
    link: '#podnety',
  },
  {
    icon: ChatBubbleHeart,
    title: 'Otvorený kanál podnetov',
    description: 'Táto stránka zostane aktívna počas celého funkčného obdobia 2026–2029.',
    tag: 'Zapojenie',
    accent: 'teal',
    span: '',
    detail: 'Tento web ostane aktívny po celé funkčné obdobie 2026–2029. Budeme na ňom zverejňovať správy, podnety a výsledky našej práce v senáte.',
    link: '#podnety',
  },
  {
    icon: Scales,
    title: 'Férovejší skúšobný poriadok',
    description: 'Iniciujeme revíziu skúšobného poriadku s dôrazom na transparentnosť hodnotenia a férovosť opravných termínov.',
    tag: 'Akademické pravidlá',
    accent: 'orange',
    span: 'bento-wide',
    detail: 'Iniciujeme formálny návrh na revíziu skúšobného poriadku — špeciálne pravidlá opravných termínov, transparentné hodnotenie a jasné kritériá.',
    link: '#podnety',
  },
  {
    icon: ScreenCode,
    title: 'Lepšie digitálne nástroje',
    description: 'Podporíme modernizáciu systémov pre študentov — od portálov až po e-learningové platformy.',
    tag: 'Digitalizácia',
    accent: 'blue',
    span: '',
    detail: 'Budeme presadzovať upgrade digitálnych nástrojov — od IS/STAG po e-learningové platformy. Konkrétne návrhy predložíme na základe podnetov od vás.',
    link: '#podnety',
  },
  {
    icon: PeopleTalk,
    title: 'Verejné Q&A každý semester',
    description: 'Každý semester usporiadame verejné stretnutie, kde odpovieme na otázky a porozprávame sa o dianí na FEI.',
    tag: 'Dialóg',
    accent: 'teal',
    span: '',
    detail: 'Každý semester zorganizujeme otvorené stretnutie so študentmi — kde sa môžete pýtať čokoľvek o dianí v senáte. Prvé do 3 mesiacov od zvolenia.',
    link: '#podnety',
  },
]

type PromiseItem = typeof promises[0]

const accentMap = {
  blue:   { icon: 'text-blue-400',   bg: 'bg-blue-500/12',   tag: 'bg-blue-500/10 text-blue-300 border-blue-500/20',   glow: 'hover:shadow-blue-500/10',   iconBg: 'bg-blue-500/12',   iconColor: 'text-blue-400',   accent: 'text-blue-300'   },
  orange: { icon: 'text-[#f07560]', bg: 'bg-[#e8634a]/12', tag: 'bg-[#e8634a]/10 text-[#f09070] border-[#e8634a]/20', glow: 'hover:shadow-[#c84870]/10', iconBg: 'bg-[#e8634a]/12', iconColor: 'text-[#f07560]', accent: 'text-[#f09070]' },
  teal:   { icon: 'text-teal-400',   bg: 'bg-teal-500/12',   tag: 'bg-teal-500/10 text-teal-300 border-teal-500/20',   glow: 'hover:shadow-teal-500/10',   iconBg: 'bg-teal-500/12',   iconColor: 'text-teal-400',   accent: 'text-teal-300'   },
}

export default function ProgramSection() {
  const [selectedItem, setSelectedItem] = useState<PromiseItem | null>(null)

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
            <span className="text-[#f07560]/80 font-medium">Žiadne prázdne sľuby.</span>
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
                className={`glass glass-hover rounded-3xl p-6 sm:p-7 flex flex-col gap-4 group cursor-pointer transition-all duration-300 hover:shadow-xl ${a.glow} ${p.span}`}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.97 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
                }}
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                onClick={() => setSelectedItem(p)}
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
                  p.accent === 'blue' ? 'bg-blue-400' : p.accent === 'orange' ? 'bg-[#e8634a]' : 'bg-teal-400'
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

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div
              className="relative max-w-md w-full glass rounded-3xl p-8 border border-blue-500/20"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-blue-400/40 hover:text-white transition-colors text-lg leading-none"
              >
                ✕
              </button>
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const a = accentMap[selectedItem.accent as keyof typeof accentMap]
                  const Icon = selectedItem.icon
                  return (
                    <>
                      <div className={`p-2.5 rounded-xl ${a.iconBg}`}>
                        <Icon size={20} className={a.iconColor} />
                      </div>
                      <span className={`text-xs font-semibold uppercase tracking-wider ${a.accent}`}>{selectedItem.tag}</span>
                    </>
                  )
                })()}
              </div>
              <h3 className="text-xl font-black text-white mb-3">{selectedItem.title}</h3>
              <p className="text-sm text-blue-200/65 leading-relaxed mb-6">{selectedItem.detail}</p>
              <a
                href={selectedItem.link ?? '#podnety'}
                onClick={() => setSelectedItem(null)}
                className="inline-flex items-center gap-2 text-sm text-[#f07560] hover:text-[#f09070] font-semibold transition-colors"
              >
                Súvisí s podnetmi →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
