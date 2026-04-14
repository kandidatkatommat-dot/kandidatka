import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

async function getStats() {
  const supabase = createServerClient()
  const [
    { count: pending },
    { count: approved },
    { count: supporters },
    { count: subscribers },
  ] = await Promise.all([
    supabase.from('suggestions').select('id', { count: 'exact', head: true }).eq('approved', false).eq('honeypot', false),
    supabase.from('suggestions').select('id', { count: 'exact', head: true }).eq('approved', true),
    supabase.from('supporters').select('id', { count: 'exact', head: true }),
    supabase.from('newsletter_subs').select('id', { count: 'exact', head: true }).eq('confirmed', true),
  ])
  return { pending: pending ?? 0, approved: approved ?? 0, supporters: supporters ?? 0, subscribers: subscribers ?? 0 }
}

async function getRecentPending() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('suggestions')
    .select('id, name, category, suggestion, created_at')
    .eq('approved', false)
    .eq('honeypot', false)
    .order('created_at', { ascending: false })
    .limit(5)
  return data ?? []
}

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([getStats(), getRecentPending()])

  const statCards = [
    { label: 'Podnety na schválenie', value: stats.pending, color: 'text-[#f07560]', href: '/admin/podnety' },
    { label: 'Schválené podnety', value: stats.approved, color: 'text-green-400', href: '/admin/podnety' },
    { label: 'Podporovatelia', value: stats.supporters, color: 'text-blue-400', href: null },
    { label: 'Newsletter subscribers', value: stats.subscribers, color: 'text-teal-400', href: null },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Dashboard</h1>
        <p className="text-xs text-blue-400/50">Volíme FEI 2026 — senátorský admin panel</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <div className={`text-3xl font-black tabular-nums ${s.color}`}>{s.value}</div>
            <div className="text-xs text-blue-400/50 mt-1 leading-tight">{s.label}</div>
            {s.href && (
              <Link href={s.href} className="text-xs text-blue-400/40 hover:text-blue-300 mt-2 block transition-colors">
                Zobraziť →
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Recent pending suggestions */}
      {recent.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Podnety čakajúce na schválenie</h2>
            <Link href="/admin/podnety" className="text-xs text-[#f07560] hover:text-[#f09070] transition-colors">
              Všetky podnety →
            </Link>
          </div>
          <div className="space-y-3">
            {recent.map((s) => (
              <div key={s.id} className="glass rounded-xl p-4 flex items-start gap-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 flex-shrink-0 mt-0.5">
                  {s.category}
                </span>
                <p className="text-sm text-blue-100/75 flex-1 line-clamp-2">{s.suggestion}</p>
                <span className="text-xs text-blue-400/40 flex-shrink-0">
                  {new Date(s.created_at).toLocaleDateString('sk-SK', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.pending === 0 && (
        <div className="glass rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">✓</div>
          <p className="text-blue-200/60 text-sm">Žiadne podnety nečakajú na schválenie.</p>
        </div>
      )}
    </div>
  )
}
