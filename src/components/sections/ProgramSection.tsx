'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { DocumentEye, CoinStack, ChatBubbleHeart, Scales, ScreenCode, PeopleTalk } from '@/components/shared/Icons'
import AnimatedSection from '@/components/shared/AnimatedSection'
import PromiseCube3D from '@/components/sections/PromiseCube3D'

const accentMap = {
  blue:   { icon: 'text-blue-400',   bg: 'bg-blue-500/12',   tag: 'bg-blue-500/10 text-blue-300 border-blue-500/20',   glow: 'hover:shadow-blue-500/10',   iconBg: 'bg-blue-500/12',   iconColor: 'text-blue-400',   accent: 'text-blue-300'   },
  orange: { icon: 'text-[#818cf8]', bg: 'bg-[#4f46e5]/12', tag: 'bg-[#4f46e5]/10 text-[#a5b4fc] border-[#4f46e5]/20', glow: 'hover:shadow-[#6d28d9]/10', iconBg: 'bg-[#4f46e5]/12', iconColor: 'text-[#818cf8]', accent: 'text-[#a5b4fc]' },
  teal:   { icon: 'text-teal-400',   bg: 'bg-teal-500/12',   tag: 'bg-teal-500/10 text-teal-300 border-teal-500/20',   glow: 'hover:shadow-teal-500/10',   iconBg: 'bg-teal-500/12',   iconColor: 'text-teal-400',   accent: 'text-teal-300'   },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

type AccentKey = keyof typeof accentMap

interface PromiseItem {
  icon: React.ComponentType<{ className?: string; size?: number }>
  title: string
  description: string
  tag: string
  accent: AccentKey
  span: string
  featured?: boolean
  detail: string
  link: string
}

export default function ProgramSection() {
  const t = useTranslations('program')
  const [selectedItem, setSelectedItem] = useState<PromiseItem | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const promises: PromiseItem[] = [
    { icon: DocumentEye, title: t('p1_title'), description: t('p1_desc'), tag: t('p1_tag'), accent: 'blue',   span: 'bento-tall', featured: true, detail: t('p1_detail'), link: '#podnety' },
    { icon: CoinStack,   title: t('p2_title'), description: t('p2_desc'), tag: t('p2_tag'), accent: 'orange', span: '',           detail: t('p2_detail'), link: '#podnety' },
    { icon: ChatBubbleHeart, title: t('p3_title'), description: t('p3_desc'), tag: t('p3_tag'), accent: 'teal', span: '', detail: t('p3_detail'), link: '#podnety' },
    { icon: Scales,      title: t('p4_title'), description: t('p4_desc'), tag: t('p4_tag'), accent: 'orange', span: 'bento-wide', detail: t('p4_detail'), link: '#podnety' },
    { icon: ScreenCode,  title: t('p5_title'), description: t('p5_desc'), tag: t('p5_tag'), accent: 'blue',   span: '',           detail: t('p5_detail'), link: '#podnety' },
    { icon: PeopleTalk,  title: t('p6_title'), description: t('p6_desc'), tag: t('p6_tag'), accent: 'teal',   span: '',           detail: t('p6_detail'), link: '#podnety' },
  ]

  useEffect(() => {
    if (selectedItem) {
      requestAnimationFrame(() => closeButtonRef.current?.focus())
    }
  }, [selectedItem])

  return (
    <section id="program" className="relative py-28 sm:py-36" style={{ background: 'linear-gradient(180deg, #020810 0%, #04101f 100%)' }}>
      <div className="aurora-orb w-[45vw] h-[45vw] top-[10%] left-[-15vw] opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} aria-hidden />

      <div className="section-divider mb-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            {t('label')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-blue-200/55 max-w-2xl mx-auto text-base">
            {t('subline')}{' '}
            <span className="text-[#818cf8]/80 font-medium">{t('subline_accent')}</span>
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-14">
          <div className="glass rounded-3xl p-6 sm:p-10 overflow-hidden">
            <p className="text-xs font-semibold text-blue-400/50 uppercase tracking-[0.2em] text-center mb-8">
              {t('cube_label')}
            </p>
            <PromiseCube3D />
          </div>
        </AnimatedSection>

        <motion.div
          className="bento-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {promises.map((p) => {
            const Icon = p.icon
            const a = accentMap[p.accent]
            return (
              <motion.div
                key={p.title}
                className={`glass glass-hover rounded-3xl p-6 sm:p-7 flex flex-col gap-4 group cursor-pointer transition-all duration-300 hover:shadow-xl ${a.glow} ${p.span}`}
                variants={cardVariants}
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                onClick={() => setSelectedItem(p)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${a.bg}`}>
                    <Icon className={`${a.icon} w-5 h-5`} />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${a.tag}`}>
                    {p.tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-blue-100/60 leading-relaxed">{p.description}</p>
                </div>
                <div className={`mt-auto h-0.5 rounded-full w-12 opacity-40 group-hover:w-20 transition-all duration-500 ${
                  p.accent === 'blue' ? 'bg-blue-400' : p.accent === 'orange' ? 'bg-[#4f46e5]' : 'bg-teal-400'
                }`} />
              </motion.div>
            )
          })}

          {/* Handshake photo tile — col 3, row 3 (empty corner) */}
          <motion.div
            className="relative rounded-3xl overflow-hidden group"
            variants={cardVariants}
            whileHover={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <Image
              src="/photos/podanie-ruky.webp"
              alt="Tomáš Mucha a Martin Buček si podávajú ruky pred FEI"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(2,8,16,0.65) 0%, transparent 55%)' }} />
            <div className="absolute inset-0 rounded-3xl border border-blue-500/0 group-hover:border-blue-500/20 transition-colors duration-300" />
            <div className="absolute bottom-5 left-5 z-10">
              <span className="text-[10px] font-semibold text-white/55 uppercase tracking-[0.22em]">
                Náš záväzok
              </span>
            </div>
          </motion.div>
        </motion.div>

        <AnimatedSection delay={0.3} className="text-center mt-10">
          <p className="text-xs text-blue-400/35 font-medium">
            {t('footer_note')}
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
              className="relative max-w-md w-full glass rounded-3xl p-5 sm:p-8 border border-blue-500/20"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                onClick={() => setSelectedItem(null)}
                aria-label="Zavrieť"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-blue-400/40 hover:text-white transition-colors text-lg leading-none"
              >
                ✕
              </button>
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const a = accentMap[selectedItem.accent]
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
                className="inline-flex items-center gap-2 text-sm text-[#818cf8] hover:text-[#a5b4fc] font-semibold transition-colors"
              >
                {t('modal_suggestions_link')}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
