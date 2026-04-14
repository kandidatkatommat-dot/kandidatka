'use client'

import useSWR from 'swr'
import { Skeleton } from '@/components/ui/skeleton'
import SuggestionCard from './SuggestionCard'
import { Lightbulb } from '@/components/shared/Icons'
import type { Suggestion } from '@/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function SuggestionWall() {
  const { data, error, isLoading } = useSWR<{ data: Suggestion[]; count: number }>(
    '/api/suggestions',
    fetcher,
    { refreshInterval: 30000, refreshWhenHidden: false }
  )

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <p className="text-red-400/60 text-sm">Podnety sa nepodarilo načítať. Skús obnoviť stránku.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-xl p-4 mb-4 break-inside-avoid space-y-2">
            <Skeleton className="h-4 w-20 bg-blue-500/10" />
            <Skeleton className="h-3 w-full bg-blue-500/10" />
            <Skeleton className="h-3 w-4/5 bg-blue-500/10" />
          </div>
        ))}
      </div>
    )
  }

  const suggestions = data?.data ?? []

  if (suggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
          <Lightbulb size={24} className="text-blue-400/50" />
        </div>
        <p className="text-blue-200/60 text-sm">
          Buď prvý, kto pošle podnet! Tvoj nápad môže zmeniť FEI.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-blue-300/60 font-medium" aria-live="polite" aria-atomic="true">
          {suggestions.length} {suggestions.length === 1 ? 'podnet' : suggestions.length < 5 ? 'podnety' : 'podnetov'} od študentov
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden />
      </div>
      <div className="columns-1 sm:columns-2 gap-4">
        {suggestions.map((s) => (
          <SuggestionCard key={s.id} suggestion={s} />
        ))}
      </div>
    </div>
  )
}
