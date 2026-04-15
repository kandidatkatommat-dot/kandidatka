// Root layout — thin shell required by Next.js.
// All providers, html, and body are handled in [locale]/layout.tsx.
// Admin has its own html+body in admin/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
