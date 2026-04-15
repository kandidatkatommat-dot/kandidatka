'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { type Locale } from '@/i18n/routing'

const locales: { code: Locale; label: string }[] = [
  { code: 'sk', label: 'SK' },
  { code: 'cs', label: 'CS' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  function handleChange(next: Locale) {
    if (next === locale) return
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex items-center gap-0.5" aria-label="Language selector">
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span className="text-blue-500/20 mx-0.5 text-xs select-none">·</span>}
          <button
            onClick={() => handleChange(l.code)}
            aria-label={`Switch to ${l.label}`}
            aria-current={locale === l.code ? 'true' : undefined}
            className={`text-xs font-semibold transition-colors px-1 py-0.5 rounded ${
              locale === l.code
                ? 'text-white'
                : 'text-blue-400/50 hover:text-blue-300'
            }`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  )
}
