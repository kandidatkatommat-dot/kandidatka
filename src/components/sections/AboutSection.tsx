'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, DiscordIcon, StarBadge } from '@/components/shared/Icons'
import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Candidate } from '@/types'

const discordNicks: Record<string, string> = {
  MUC0075: 'Tom. (Starky) Muc.',
  BUC0130: 'Bucoun',
}

const cardAccents = [
  { border: 'rgba(59,130,246,0.4)', quoteColor: 'text-blue-500/20', quoteBorder: 'border-blue-500/30', quoteText: 'text-blue-200/60' },
  { border: 'rgba(232,99,74,0.4)', quoteColor: 'text-[#4f46e5]/20', quoteBorder: 'border-[#4f46e5]/30', quoteText: 'text-blue-200/60' },
]

type CandidateData = Candidate & { lang: string; award?: string }

function CandidateCard({ c, direction, accentIdx }: { c: CandidateData; direction: 'left' | 'right'; accentIdx: number }) {
  const accent = cardAccents[accentIdx]
  const discordNick = discordNicks[c.id]

  return (
    <AnimatedSection direction={direction}>
      <motion.div
        className="glass glass-hover rounded-3xl p-6 sm:p-8 h-full flex flex-col gap-5 group"
        style={{ borderTop: `2px solid ${accent.border}` }}
        whileHover={{ scale: 1.015, y: -4 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
            {c.name}
            {discordNick && (
              <>
                <span className="text-[#5865F2]/25 font-light select-none">·</span>
                <span className="flex items-center gap-1.5">
                  <DiscordIcon size={14} className="text-[#5865F2]/55 flex-shrink-0" />
                  <span className="text-sm font-mono text-[#5865F2]/75">{discordNick}</span>
                </span>
              </>
            )}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant="outline" className="text-xs border-blue-500/25 text-blue-300 bg-blue-500/8 font-mono">
              {c.id}
            </Badge>
            <span className="text-xs text-blue-400/50">FEI VŠB-TUO</span>
          </div>
          {c.linkedIn && (
            <a href={c.linkedIn} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-1.5 text-xs text-blue-400/50 hover:text-blue-300 transition-colors">
              <ExternalLink size={11} />LinkedIn
            </a>
          )}
        </div>

        <p lang={c.lang} className="text-blue-100/65 text-sm leading-relaxed flex-1">{c.bio}</p>

        <div className="relative">
          <span className={`absolute -top-2 -left-1 text-4xl ${accent.quoteColor} font-serif leading-none select-none`}>&ldquo;</span>
          <blockquote lang={c.lang} className={`pl-4 border-l-2 ${accent.quoteBorder} text-sm ${accent.quoteText} italic leading-relaxed`}>
            {c.whyRunning}
          </blockquote>
        </div>

        {c.award && (
          <div className="pt-2 border-t border-white/5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border border-[#4f46e5]/35 bg-[#4f46e5]/10 text-[#818cf8] leading-none">
              <StarBadge size={10} className="flex-shrink-0" />
              {c.award}
            </span>
          </div>
        )}
      </motion.div>
    </AnimatedSection>
  )
}

export default function AboutSection() {
  const t = useTranslations('about')
  const locale = useLocale()

  const muchaLang = locale === 'en' ? 'en' : 'sk'
  const bucekLang = locale === 'en' ? 'en' : 'cs'

  const candidates: CandidateData[] = [
    {
      id: 'MUC0075',
      name: 'Tomáš Mucha',
      role: 'Kandidát do AS FEI',
      department: 'FEI VŠB-TUO',
      bio: t('bio_mucha'),
      whyRunning: t('why_mucha'),
      photoUrl: null,
      lang: muchaLang,
    },
    {
      id: 'BUC0130',
      name: 'Martin Buček',
      role: 'Kandidát do AS FEI',
      department: 'FEI VŠB-TUO',
      bio: t('bio_bucek'),
      whyRunning: t('why_bucek'),
      photoUrl: null,
      lang: bucekLang,
      award: t('award_bucek'),
    },
  ]

  const stats = [
    { value: t('stat_years_value'), suffix: t('stat_years_suffix'), label: t('stat_years_label') },
    { value: t('stat_mandate_value'), suffix: t('stat_mandate_suffix'), label: t('stat_mandate_label') },
    { value: t('stat_dedication_value'), suffix: t('stat_dedication_suffix'), label: t('stat_dedication_label') },
  ]

  return (
    <section id="o-nas" className="relative py-28 sm:py-36" style={{ background: '#020810' }}>

      <div className="aurora-orb w-[40vw] h-[40vw] top-0 right-[-10vw] opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── HEADING ─────────────────────────────────────────── */}
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-[#818cf8] uppercase tracking-[0.2em] mb-4">
            {t('label')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            {t('heading')}
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto text-base">{t('subline')}</p>
        </AnimatedSection>

        {/* ── TRIPTYCH: [karta | foto | karta] ────────────────── */}
        {/* Mobile: stacked; Desktop lg+: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px_1fr] gap-5 items-stretch mb-10">

          {/* Tomáš */}
          <CandidateCard c={candidates[0]} direction="left" accentIdx={0} />

          {/* Center photo */}
          <AnimatedSection>
            <motion.div
              className="relative rounded-3xl overflow-hidden ring-1 ring-blue-500/15 h-full min-h-[320px]"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ scale: 1.012 }}
            >
              <Image
                src="/photos/kandidati-triptych.webp"
                alt="Tomáš Mucha a Martin Buček pred Fakultou elektrotechniky a informatiky"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 300px"
                priority
              />
              {/* Subtle vignette top */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(2,8,16,0.35) 0%, transparent 30%, transparent 65%, rgba(2,8,16,0.6) 100%)' }} />
              {/* FEI label bottom-left */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.22em]">
                  FEI VŠB–TUO · 2026
                </p>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Martin */}
          <CandidateCard c={candidates[1]} direction="right" accentIdx={1} />
        </div>

        {/* ── STATS ───────────────────────────────────────────── */}
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
