'use client'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { Mail } from '@/components/shared/Icons'

export default function Footer() {
  const t = useTranslations('footer')

  const sectionLinks = [
    { href: '#o-nas', label: (t.raw('sections') as string[])[0] },
    { href: '#program', label: (t.raw('sections') as string[])[1] },
    { href: '#podnety', label: (t.raw('sections') as string[])[2] },
    { href: '#socialne-siete', label: (t.raw('sections') as string[])[3] },
  ]

  return (
    <footer style={{ background: '#010609' }} className="border-t border-blue-500/8 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div className="space-y-3 max-w-xs">
            <div>
              <span className="text-xl font-black gradient-text">Volíme FEI 2026</span>
            </div>
            <p className="text-sm text-blue-200/40 leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-blue-400/70 uppercase tracking-[0.15em]">{t('col_dates')}</h4>
              <ul className="space-y-2 text-blue-200/45">
                <li>{t('date1')}</li>
                <li>{t('date2')}</li>
                <li>{t('date3')}</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-blue-400/70 uppercase tracking-[0.15em]">{t('col_candidates')}</h4>
              <ul className="space-y-2 text-blue-200/45">
                <li>Tomáš Mucha</li>
                <li className="font-mono text-blue-400/60 text-xs">MUC0075</li>
                <li className="mt-2">Martin Buček</li>
                <li className="font-mono text-blue-400/60 text-xs">BUC0130</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-blue-400/70 uppercase tracking-[0.15em]">{t('col_sections')}</h4>
              <ul className="space-y-2">
                {sectionLinks.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="text-blue-200/40 hover:text-blue-300 transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-blue-400/70 uppercase tracking-[0.15em]">{t('col_contact')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:tomas.mucha.st@vsb.cz" className="text-blue-200/40 hover:text-blue-300 transition-colors break-all">
                    tomas.mucha.st@vsb.cz
                  </a>
                </li>
                <li>
                  <a href="mailto:martin.bucek.st@vsb.cz" className="text-blue-200/40 hover:text-blue-300 transition-colors break-all">
                    martin.bucek.st@vsb.cz
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-blue-500/8 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 p-4 rounded-2xl" style={{background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)'}}>
          <span className="text-sm text-blue-200/60 flex items-center gap-1.5">
            <Mail size={14} className="text-blue-400/60" />
            {t('newsletter_mini')}
          </span>
          <a
            href="#newsletter"
            className="px-4 py-1.5 text-sm bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white rounded-lg transition-all font-medium whitespace-nowrap"
          >
            {t('newsletter_cta')}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-blue-200/25">
          <span>{t('copyright')}</span>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-blue-200/25 hover:text-blue-300 transition-colors">{t('privacy')}</a>
            <span>{t('senate')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
