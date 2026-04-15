import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AdminNav from '../AdminNav'

export const metadata: Metadata = {
  title: 'Admin | Volíme FEI 2026',
  robots: 'noindex, nofollow',
}

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen" style={{ background: '#020810' }}>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
