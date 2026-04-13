'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/shared/AnimatedSection'

const steps = [
  { step: '01', label: 'Prihlásiš sa', desc: 'Cez systém UNIS VŠB-TUO svojimi FEI prihlasovacími údajmi.' },
  { step: '02', label: 'Vybereš kandidátov', desc: 'V zozname kandidátov FEI nájdeš Mucha & Buček.' },
  { step: '03', label: 'Potvrdíš hlas', desc: 'Anonymné hlasovanie. Celý proces trvá 2 minúty.' },
]

export default function VoteSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden" style={{ background: '#020810' }}>
      <div className="section-divider mb-0" />

      {/* Big glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            Ako hlasovať
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Tvoj hlas je<br />
            <span className="gradient-text">silný nástroj</span>
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto text-base">
            Voľby prebehajú elektronicky 12.–15. mája 2026 cez systém UNIS. Trvá to 2 minúty.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {steps.map((s, i) => (
            <AnimatedSection key={s.step} direction="up" delay={i * 0.1}>
              <motion.div
                className="glass glass-hover rounded-3xl p-6 text-center flex flex-col items-center gap-3"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center">
                  <span className="text-xl font-black gradient-text-blue">{s.step}</span>
                </div>
                <h3 className="font-bold text-white">{s.label}</h3>
                <p className="text-sm text-blue-200/55 leading-relaxed">{s.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Big CTA */}
        <AnimatedSection className="text-center">
          <div className="relative inline-block">
            {/* Glow behind button */}
            <div className="absolute inset-0 blur-3xl bg-orange-500/20 scale-150 pointer-events-none" />
            <div className="relative glass glow-ring-orange rounded-3xl p-8 sm:p-12 flex flex-col items-center gap-5">
              <span className="text-5xl">🗳️</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white text-center">
                Volíme 12.–15. mája 2026
              </h3>
              <p className="text-blue-200/60 text-sm text-center max-w-sm">
                Elektronicky cez UNIS VŠB-TUO. Každý študent FEI má jeden hlas.
                Použi ho — za ľudí, ktorí budú počúvať.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-xl shadow-orange-500/30 px-8 py-6 text-base font-bold transition-all duration-200 hover:scale-[1.03]"
                >
                  Mucha & Buček — zavolíme!
                </Button>
              </div>
              <p className="text-xs text-blue-400/35">
                MUC0075 · BUC0130 · FEI VŠB-TUO
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
