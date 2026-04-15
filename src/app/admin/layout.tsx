import type { Geist } from 'next/font/google'

// Root admin layout — provides html+body for all admin routes (login + protected).
// Authentication is enforced in the (protected) sub-layout, not here,
// so the login page is not caught in a redirect loop.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className="dark">
      <body className="min-h-full antialiased" style={{ background: '#020810', color: '#e2e8f0' }}>
        {children}
      </body>
    </html>
  )
}
