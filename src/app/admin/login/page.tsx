'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await signIn('credentials', { password, redirect: false })
      if (res?.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(res?.error ? `Chyba: ${res.error}` : 'Nesprávne heslo.')
        setLoading(false)
      }
    } catch (err) {
      setError(`Neočakávaná chyba: ${err instanceof Error ? err.message : String(err)}`)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#020810' }}>
      <div className="glass rounded-3xl p-10 w-full max-w-sm border border-blue-500/20">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] block mb-2">
            Admin
          </span>
          <h1 className="text-2xl font-black text-white">Volíme FEI 2026</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-blue-400/70 font-medium uppercase tracking-widest block mb-1.5">
              Heslo
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-blue-500/20 text-white placeholder:text-blue-300/30 focus:outline-none focus:border-blue-500/50 text-sm"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-br from-[#e8634a] to-[#c84870] hover:from-[#f07055] hover:to-[#d45580] disabled:opacity-60 text-white font-bold rounded-xl transition-all text-sm"
          >
            {loading ? 'Prihlasovanie...' : 'Prihlásiť sa'}
          </button>
        </form>
      </div>
    </div>
  )
}
