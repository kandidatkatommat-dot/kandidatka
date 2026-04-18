'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { BallotBox } from '@/components/shared/Icons'

export default function VoteSection() {
  const t = useTranslations('vote')

  const steps = [
    { step: '01', label: t('step1_label'), desc: t('step1_desc') },
    { step: '02', label: t('step2_label'), desc: t('step2_desc') },
    { step: '03', label: t('step3_label'), desc: t('step3_desc') },
  ]

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden" style={{ background: '#020810' }}>
      <div className="section-divider mb-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-28">

        {/* Heading */}
        <AnimatedSection className="text-center mb-16 max-w-4xl mx-auto">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            {t('label')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t('heading')}<br />
            <span className="gradient-text">{t('heading_accent')}</span>
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto text-base">
            {t('subline')}
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 max-w-4xl mx-auto">
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

        {/* CTA + photo side by side */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-stretch">

            {/* CTA box */}
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-[#4f46e5]/15 scale-150 pointer-events-none" />
              <div className="relative glass glow-ring-orange rounded-3xl p-8 sm:p-12 h-full flex flex-col items-center justify-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)' }}>
                  <BallotBox size={32} className="text-[#818cf8]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white text-center">
                  {t('cta_date')}
                </h3>
                <p className="text-blue-200/60 text-sm text-center max-w-sm">
                  {t('cta_desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <a href="https://www.vsb.cz/cs/univerzita/organizacni-struktura/akademicky-senat/volby-as-2026/" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        className="bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white border-0 shadow-xl shadow-[#6d28d9]/30 px-8 py-6 text-base font-bold transition-all duration-200 hover:scale-[1.03] w-full sm:w-auto"
                      >
                        {t('cta_button')}
                      </Button>
                    </a>
                  </motion.div>
                </div>
                <p className="text-xs text-blue-400/35">{t('cta_footnote')}</p>
              </div>
            </div>

            {/* Photo: ukazujeme — they point = you vote */}
            <motion.div
              className="relative rounded-3xl overflow-hidden ring-1 ring-blue-500/15 min-h-[320px] group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              whileHover={{ scale: 1.012 }}
            >
              <Image
                src="/photos/ukazujeme.webp"
                alt="Tomáš Mucha a Martin Buček ukazujú na Fakultu elektrotechniky a informatiky"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 340px"
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(2,8,16,0.25) 0%, transparent 35%, transparent 65%, rgba(2,8,16,0.55) 100%)' }} />
              <div className="absolute bottom-4 left-5 z-10">
                <p className="text-[10px] font-semibold text-white/55 uppercase tracking-[0.22em]">
                  Naša fakulta · naša zmena
                </p>
              </div>
            </motion.div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
