'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Podnety', href: '/admin/podnety' },
]

export default function AdminNav() {
  const pathname = usePathname()
  return (
    <nav className="border-b border-blue-500/15 backdrop-blur-xl bg-[#03080f]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-white mr-4">Admin</span>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                pathname === l.href
                  ? 'bg-blue-500/20 text-white font-semibold'
                  : 'text-blue-300/60 hover:text-white hover:bg-blue-500/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-blue-400/50 hover:text-blue-300 transition-colors">
            ← Web
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="text-xs text-blue-400/50 hover:text-red-400 transition-colors"
          >
            Odhlásiť
          </button>
        </div>
      </div>
    </nav>
  )
}
