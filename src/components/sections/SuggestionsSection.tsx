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
        <AnimatedSection className="text-center mb-16">
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

        {/* Photo banner — listening candidates, contextual accent */}
        <AnimatedSection delay={0.1} className="mb-10">
          <motion.div
            className="relative w-full rounded-3xl overflow-hidden ring-1 ring-blue-500/10"
            style={{ height: 'clamp(200px, 22vw, 320px)' }}
            whileHover={{ scale: 1.008 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <Image
              src="/photos/spolu-feature.webp"
              alt="Tomáš Mucha a Martin Buček pred FEI VŠB-TUO"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1152px"
            />
            {/* Cinematic vignette */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(2,8,16,0.72) 0%, transparent 38%, transparent 62%, rgba(2,8,16,0.72) 100%)' }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(2,8,16,0.3) 0%, transparent 30%, transparent 65%, rgba(2,8,16,0.55) 100%)' }} />
            {/* Quote overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 px-6 text-center">
              <p className="text-white/90 text-lg sm:text-2xl font-bold leading-snug drop-shadow-lg">
                {t('photo_quote')}
              </p>
              <span className="text-blue-300/60 text-xs font-semibold uppercase tracking-[0.22em]">
                Tomáš &amp; Martin · FEI 2026
              </span>
            </div>
          </motion.div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <AnimatedSection direction="left">
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

          <AnimatedSection direction="right" delay={0.15}>
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
