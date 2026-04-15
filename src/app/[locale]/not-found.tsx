import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('not_found')

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(180deg, #020810 0%, #04101f 100%)' }}
    >
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">404</p>
      <h1
        className="text-5xl sm:text-6xl font-black mb-4"
        style={{
          background: 'linear-gradient(90deg, #a5b4fc, #818cf8, #6366f1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {t('heading')}
      </h1>
      <p className="text-blue-200/50 max-w-sm mb-8 leading-relaxed">{t('subline')}</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white font-semibold text-sm transition-all hover:scale-[1.03]"
      >
        {t('back')}
      </Link>
    </main>
  )
}
