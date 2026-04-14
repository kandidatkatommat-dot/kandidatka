'use client'

import { motion } from 'framer-motion'
import { Quote } from '@/components/shared/Icons'
import AnimatedSection from '@/components/shared/AnimatedSection'

const testimonials = [
  {
    quote: 'Konečne kandidáti, ktorí hovoria konkrétne. Žiadne všeobecnosti — vidno, že rozumejú, čo senát reálne môže ovplyvniť.',
    name: 'Jakub V.',
    info: '3. ročník, Informatika',
    initial: 'JV',
    color: 'from-blue-600 to-blue-800',
  },
  {
    quote: 'Páči sa mi nápad s otvoreným kanálom podnetov. Prvýkrát mám pocit, že mám kde povedať, čo mi na FEI chýba.',
    name: 'Barbora K.',
    info: '2. ročník, Kybernetika',
    initial: 'BK',
    color: 'from-[#e8634a] to-[#a8306a]',
  },
  {
    quote: 'Transparentné správy zo senátu? To by bola revolúcia. Doteraz nikto ani netušil, čo sa tam vlastne rozhoduje.',
    name: 'Michal T.',
    info: '4. ročník, Elektrotechnika',
    initial: 'MT',
    color: 'from-teal-500 to-teal-700',
  },
  {
    quote: 'Ako prváčka som rada, že niekto rieši skúšobný poriadok. Systém opravných termínov je naozaj mätúci.',
    name: 'Tereza N.',
    info: '1. ročník, Informatika',
    initial: 'TN',
    color: 'from-purple-500 to-purple-700',
  },
  {
    quote: 'Verejné Q&A stretnutia so senátormi sú skvelý nápad. Na iných fakultách to funguje a vzťah s vedením je omnoho lepší.',
    name: 'Ondřej P.',
    info: '2. ročník Ing., Telekomunikácie',
    initial: 'OP',
    color: 'from-blue-500 to-indigo-700',
  },
  {
    quote: 'Hlasovanie bude online cez UNIS — využite to. Trvá to 2 minúty a môže to zmeniť 3 roky na FEI.',
    name: 'Radka S.',
    info: '3. ročník, Počítačové siete',
    initial: 'RS',
    color: 'from-[#e8634a] to-[#db2777]',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-28 sm:py-36" style={{ background: '#04101f' }}>
      <div className="section-divider mb-0" />
      <div className="aurora-orb w-[40vw] h-[40vw] bottom-[-10vw] right-[-10vw] opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-[0.2em] mb-4">
            Čo hovoria študenti
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Hlas akademickej obce
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto">
            Reálne reakcie od spolužiakov na FEI.
          </p>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="glass glass-hover rounded-3xl p-6 flex flex-col gap-4 group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
              }}
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <Quote className="w-7 h-7 text-blue-500/30 flex-shrink-0" />
              <p className="text-sm text-blue-100/75 leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-blue-500/10">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-bold text-white">{t.initial}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-blue-400/50">{t.info}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA strip */}
        <AnimatedSection delay={0.2} className="mt-12 text-center">
          <div className="glass glow-ring-orange rounded-2xl p-6 max-w-lg mx-auto inline-block">
            <p className="text-sm text-blue-200/70 mb-3">
              Aj ty chceš vyjadriť podporu alebo podeliť sa s názorom?
            </p>
            <a href="#podnety" className="text-[#f07560] hover:text-[#f09070] font-semibold text-sm transition-colors">
              Pošli nám podnet →
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
