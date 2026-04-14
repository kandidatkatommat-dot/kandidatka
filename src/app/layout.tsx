import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import LenisProvider from "@/components/shared/LenisProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import MuchaFly from "@/components/shared/MuchaFly";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://volimefei.vercel.app'),
  title: "Volíme FEI 2026 | Mucha & Buček",
  description:
    "Kandidátska stránka Tomáša Muchu a Martina Bučka pre voľby do Akademického senátu FEI VŠB-TUO 2026–2029. Pošli nám svoj podnet — chceme počúvať!",
  keywords: ["senát", "FEI", "VŠB-TUO", "volby", "akademický senát", "Mucha", "Buček"],
  openGraph: {
    title: "Volíme FEI 2026 | Mucha & Buček",
    description: "Mucha & Buček — za transparentný, dostupný Akademický senát FEI VŠB-TUO 2026–2029",
    type: "website",
    locale: "sk_SK",
    siteName: "Volíme FEI 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volíme FEI 2026 | Mucha & Buček",
    description: "Mucha & Buček — za transparentný, dostupný Akademický senát FEI VŠB-TUO 2026–2029",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
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
        {/* Runs synchronously before first paint — adds 'no-backdrop' class on
            Chrome so CSS can disable backdrop-filter without a visible flash.
            Chrome's backdrop-filter is ~4× slower than Safari on macOS Retina. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var ua=navigator.userAgent;var isChrome=/Chrome\\//.test(ua)&&!/Chromium\\//.test(ua)&&!/Edg\\//.test(ua)&&navigator.vendor==='Google Inc.';if(isChrome)document.documentElement.classList.add('no-backdrop');})();` }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <CustomCursor />
        <MuchaFly />
        <LenisProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </LenisProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
