import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://volimefei.vercel.app'
const locales = ['sk', 'cs', 'en'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map(locale => ({
    url: locale === 'sk' ? BASE : `${BASE}/${locale}`,
    lastModified: new Date(),
    priority: locale === 'sk' ? 1 : 0.9,
    alternates: {
      languages: {
        sk: BASE,
        cs: `${BASE}/cs`,
        en: `${BASE}/en`,
      },
    },
  }))
}
