'use client'

import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function FaqSection() {
  const t = useTranslations('faq')

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
  ]

  return (
    <section className="relative py-28 sm:py-36" style={{ background: 'linear-gradient(180deg, #04101f 0%, #020810 100%)' }}>
      <div className="section-divider mb-0" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-[#818cf8] uppercase tracking-[0.2em] mb-4">
            {t('label')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto">
            {t('subline')}{' '}
            <a href="#socialne-siete" className="text-blue-400 hover:text-blue-300 transition-colors">
              {t('subline_link')}
            </a>
            .
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <Accordion className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={i + 1}
                className="glass glass-hover rounded-2xl border-0 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-white hover:text-blue-300 hover:no-underline py-5 [&[data-state=open]]:text-blue-300 transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-blue-200/65 leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}
