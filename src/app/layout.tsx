import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import LenisProvider from "@/components/shared/LenisProvider";
import CustomCursor from "@/components/shared/CustomCursor";
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
  title: "Volíme FEI 2026 | Mucha & Buček",
  description:
    "Kandidátska stránka Tomáša Muchu a Martina Bučka pre voľby do Akademického senátu FEI VŠB-TUO 2026–2029. Pošli nám svoj podnet — chceme počúvať!",
  keywords: ["senát", "FEI", "VŠB-TUO", "volby", "akademický senát", "Mucha", "Buček"],
  openGraph: {
    title: "Volíme FEI 2026 | Mucha & Buček",
    description: "Kandidátska stránka pre voľby do AS FEI VŠB-TUO 2026–2029",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} dark cursor-none md:cursor-none`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
