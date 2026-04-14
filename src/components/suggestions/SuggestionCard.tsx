'use client'

import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { Suggestion, SuggestionCategory } from '@/types'

const categoryColors: Record<SuggestionCategory, string> = {
  Výuka: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  Digitalizácia: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  Kampus: 'bg-green-500/15 text-green-300 border-green-500/25',
  Skúšky: 'bg-[#4f46e5]/15 text-[#a5b4fc] border-[#4f46e5]/25',
  Iné: 'bg-slate-500/15 text-slate-300 border-slate-500/25',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short' })
}

/* Hoisted — stable references, not recreated on every render */
const VOTED_ANIM = { scale: [1, 1.4, 1] as number[] }
const NO_ANIM = {}

export default memo(function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const [votes, setVotes] = useState(suggestion.vote_count ?? 0)
  const [hasVoted, setHasVoted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleUpvote(e: React.MouseEvent) {
    e.preventDefault()
    if (hasVoted || loading) return
    setLoading(true)
    const res = await fetch(`/api/suggestions/${suggestion.id}/vote`, { method: 'POST' })
    if (res.ok) {
      setVotes(v => v + 1)
      setHasVoted(true)
    } else if (res.status === 409) {
      setHasVoted(true) // already voted
    }
    setLoading(false)
  }

  return (
    <div className="glass rounded-xl p-4 flex flex-col gap-3 break-inside-avoid mb-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Badge
          variant="outline"
          className={`text-xs ${categoryColors[suggestion.category]}`}
        >
          {suggestion.category}
        </Badge>
        <span className="text-xs text-blue-300/40">{formatDate(suggestion.created_at)}</span>
      </div>
      <p className="text-sm text-blue-100/80 leading-relaxed">{suggestion.suggestion}</p>
      <div className="flex items-center justify-between gap-2">
        {suggestion.name && (
          <p className="text-xs text-blue-400/50 font-medium">— {suggestion.name}</p>
        )}
        <button
          onClick={handleUpvote}
          disabled={hasVoted || loading}
          aria-label={hasVoted ? 'Hlasoval si' : 'Hlasovať za podnet'}
          className={`ml-auto flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 min-w-[44px] min-h-[44px] justify-end px-1 ${
            hasVoted
              ? 'text-[#818cf8] cursor-default'
              : 'text-blue-400/50 hover:text-[#818cf8] hover:scale-110'
          }`}
        >
          <motion.span animate={hasVoted ? VOTED_ANIM : NO_ANIM} transition={{ duration: 0.3 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={hasVoted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </motion.span>
          <span>{votes}</span>
        </button>
      </div>
    </div>
  )
})
