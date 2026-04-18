'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSWRConfig } from 'swr'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SuggestionForm from '@/components/suggestions/SuggestionForm'
import SuggestionWall from '@/components/suggestions/SuggestionWall'
import { Mail, Lightbulb } from '@/components/shared/Icons'

export default function SuggestionsSection() {
  const t = useTranslations('suggestions')
  const { mutate } = useSWRConfig()

  function handleSuccess() {
    setTimeout(() => mutate('/api/suggestions'), 2000)
  }

  return (
    <section id="podnety" className="relative py-28 sm:py-36" style={{ background: 'linear-gradient(180deg, #020810 0%, #04101f 100%)' }}>
      <div className="section-divider mb-0" />
      <div className="aurora-orb w-[35vw] h-[35vw] top-0 right-[-5vw] opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            {t('label')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-blue-200/55 max-w-2xl mx-auto text-base">
            {t('subline')}
          </p>
        </AnimatedSection>

        {/* Desktop: [photo | form | wall]  Mobile: photo accent strip + form/wall */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_1fr] gap-5 items-stretch">

          {/* Portrait photo — waist-up, full height of adjacent cards */}
          <AnimatedSection direction="left">
            <motion.div
              className="relative rounded-3xl overflow-hidden ring-1 ring-blue-500/15 group
                         h-48 sm:h-64 lg:h-full min-h-0 lg:min-h-[520px]"
              whileHover={{ scale: 1.012 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              <Image
                src="/photos/spolu-suggestions.webp"
                alt="Tomáš Mucha a Martin Buček — každý podnet čítame osobne"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 280px"
              />
              {/* Bottom vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(2,8,16,0.8) 0%, rgba(2,8,16,0.1) 45%, transparent 70%)' }} />
              {/* Hover border */}
              <div className="absolute inset-0 rounded-3xl border border-blue-500/0 group-hover:border-blue-500/20 transition-colors duration-300" />
              {/* Name overlay */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <p className="text-white font-bold text-base leading-snug">
                  Martin &amp; Tomáš
                </p>
                <span className="text-blue-300/50 text-[10px] font-semibold uppercase tracking-[0.22em] mt-0.5 block">
                  FEI VŠB-TUO · 2026
                </span>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="up" delay={0.1}>
            <div
              className="glass rounded-3xl p-7 sm:p-8 h-full"
              style={{ borderTop: '2px solid rgba(79,70,229,0.5)' }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)' }}>
                  <Mail size={15} className="text-[#818cf8]" />
                </div>
                {t('form_heading')}
              </h3>
              <SuggestionForm onSuccess={handleSuccess} />
            </div>
          </AnimatedSection>

          {/* Wall */}
          <AnimatedSection direction="up" delay={0.2}>
            <div
              className="glass rounded-3xl p-7 sm:p-8 h-full"
              style={{ borderTop: '2px solid rgba(6,182,212,0.4)' }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)' }}>
                  <Lightbulb size={15} className="text-teal-400" />
                </div>
                {t('wall_heading')}
              </h3>
              <SuggestionWall />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
