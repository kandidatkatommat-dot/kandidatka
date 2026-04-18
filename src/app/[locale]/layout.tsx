import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Toaster } from '@/components/ui/sonner'
import LenisProvider from '@/components/shared/LenisProvider'
import CustomCursor from '@/components/shared/CustomCursor'
import MuchaFly from '@/components/shared/MuchaFly'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { routing, type Locale } from '@/i18n/routing'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://volimefei.vercel.app'

  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    keywords: ['senát', 'FEI', 'VŠB-TUO', 'volby', 'akademický senát', 'Mucha', 'Buček'],
    openGraph: {
      title: t('title'),
      description: t('og_description'),
      type: 'website',
      locale: locale === 'sk' ? 'sk_SK' : locale === 'cs' ? 'cs_CZ' : 'en_GB',
      siteName: 'Volíme FEI 2026',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Volíme FEI 2026' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('og_description'),
      images: ['/opengraph-image.png'],
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        'sk': siteUrl,
        'cs': `${siteUrl}/cs`,
        'en': `${siteUrl}/en`,
      },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} dark cursor-none md:cursor-none`}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/CalSans-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <>
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var ua=navigator.userAgent;var isChrome=/Chrome\\//.test(ua)&&!/Chromium\\//.test(ua)&&!/Edg\\//.test(ua)&&navigator.vendor==='Google Inc.';if(isChrome)document.documentElement.classList.add('no-backdrop');})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <MuchaFly />
          <LenisProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </LenisProvider>
          <Toaster richColors position="bottom-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
