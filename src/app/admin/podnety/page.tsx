import { createServerClient } from '@/lib/supabase/server'
import PodnetyTable from './PodnetyTable'
import type { Suggestion } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminPodnetyPage() {
  const supabase = createServerClient()

  const { data } = await supabase
    .from('suggestions')
    .select('*')
    .eq('honeypot', false)
    .order('created_at', { ascending: false })
    .limit(200)

  const suggestions: Suggestion[] = data ?? []
  const pending = suggestions.filter((s) => !s.approved)
  const approved = suggestions.filter((s) => s.approved)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Podnety</h1>
        <p className="text-xs text-blue-400/50">
          {pending.length} čakajúcich · {approved.length} schválených
        </p>
      </div>

      {pending.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-[#818cf8] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4f46e5] inline-block" />
            Čakajú na schválenie ({pending.length})
          </h2>
          <PodnetyTable suggestions={pending} />
        </section>
      )}

      {approved.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Schválené ({approved.length})
          </h2>
          <PodnetyTable suggestions={approved} />
        </section>
      )}

      {suggestions.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-blue-200/60">Zatiaľ žiadne podnety.</p>
        </div>
      )}
    </div>
  )
}
