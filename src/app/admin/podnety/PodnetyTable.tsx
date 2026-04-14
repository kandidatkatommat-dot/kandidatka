'use client'

import { useState, useTransition } from 'react'
import { approveSuggestion, rejectSuggestion } from './actions'
import type { Suggestion } from '@/types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('sk-SK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const categoryColors: Record<string, string> = {
  Výuka: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  Digitalizace: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  Kampus: 'bg-green-500/15 text-green-300 border-green-500/25',
  Zkoušky: 'bg-[#e8634a]/15 text-[#f09070] border-[#e8634a]/25',
  Jiné: 'bg-slate-500/15 text-slate-300 border-slate-500/25',
}

function SuggestionRow({ s, onAction }: { s: Suggestion; onAction: (id: string, action: 'approve' | 'reject') => void }) {
  const [pending, startTransition] = useTransition()
  const [done, setDone] = useState(false)

  function handle(action: 'approve' | 'reject') {
    startTransition(async () => {
      if (action === 'approve') await approveSuggestion(s.id)
      else await rejectSuggestion(s.id)
      setDone(true)
      onAction(s.id, action)
    })
  }

  if (done) return null

  return (
    <div className={`glass rounded-xl p-4 space-y-3 transition-opacity ${pending ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${categoryColors[s.category] ?? categoryColors['Jiné']}`}>
            {s.category}
          </span>
          {s.name && (
            <span className="text-xs text-blue-400/60 font-medium">{s.name}</span>
          )}
          <span className="text-xs text-blue-400/35">{formatDate(s.created_at)}</span>
        </div>
        {!s.approved && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handle('approve')}
              disabled={pending}
              className="px-3 py-1 text-xs font-bold text-green-400 hover:text-white hover:bg-green-500/20 border border-green-500/30 rounded-lg transition-all disabled:opacity-50"
            >
              ✓ Schváliť
            </button>
            <button
              onClick={() => handle('reject')}
              disabled={pending}
              className="px-3 py-1 text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all disabled:opacity-50"
            >
              ✕ Zamietnuť
            </button>
          </div>
        )}
        {s.approved && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-400/60 font-medium">✓ Schválené</span>
            <button
              onClick={() => handle('reject')}
              disabled={pending}
              className="px-3 py-1 text-xs font-bold text-red-400/60 hover:text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-lg transition-all disabled:opacity-50"
            >
              Odstrániť
            </button>
          </div>
        )}
      </div>
      <p className="text-sm text-blue-100/75 leading-relaxed">{s.suggestion}</p>
      {(s.vote_count ?? 0) > 0 && (
        <p className="text-xs text-[#f07560]/60">♥ {s.vote_count} hlasov</p>
      )}
    </div>
  )
}

export default function PodnetyTable({ suggestions }: { suggestions: Suggestion[] }) {
  const [list, setList] = useState(suggestions)

  function handleAction(id: string) {
    // Row removes itself after action; optionally reorder here
    setList((prev) => prev.filter((s) => s.id !== id))
  }

  if (list.length === 0) return null

  return (
    <div className="space-y-3">
      {list.map((s) => (
        <SuggestionRow key={s.id} s={s} onAction={handleAction} />
      ))}
    </div>
  )
}
