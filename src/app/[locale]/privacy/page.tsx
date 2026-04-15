import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return { title: `${t('heading')} — Volíme FEI 2026` }
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy')

  return (
    <main
      className="min-h-screen px-4 py-24"
      style={{ background: 'linear-gradient(180deg, #020810 0%, #04101f 100%)' }}
    >
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-xs text-blue-400/50 hover:text-blue-300 transition-colors mb-8 inline-block"
        >
          {t('back')}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{t('heading')}</h1>
        <p className="text-blue-400/40 text-sm mb-10">{t('effective')}</p>

        <div className="space-y-8 text-blue-100/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-white mb-2">{t('s1_heading')}</h2>
            <p>
              {t('s1_text')}{' '}
              <a href="mailto:tomas.mucha.st@vsb.cz" className="text-blue-400 hover:text-blue-300 transition-colors">
                tomas.mucha.st@vsb.cz
              </a>
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white mb-2">{t('s2_heading')}</h2>
            <p>{t('s2_text')}</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white mb-2">{t('s3_heading')}</h2>
            <p>{t('s3_text')}</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white mb-2">{t('s4_heading')}</h2>
            <p>{t('s4_text')}</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white mb-2">{t('s5_heading')}</h2>
            <p>
              {t('s5_text').split('localStorage')[0]}
              <code className="text-blue-300">localStorage</code>
              {t('s5_text').split('localStorage')[1]}
            </p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white mb-2">{t('s6_heading')}</h2>
            <p>
              {t('s6_text')}{' '}
              <a href="mailto:tomas.mucha.st@vsb.cz" className="text-blue-400 hover:text-blue-300 transition-colors">
                tomas.mucha.st@vsb.cz
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
