'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton'
import SuggestionCard from './SuggestionCard'
import { Lightbulb } from '@/components/shared/Icons'
import type { Suggestion, SuggestionCategory } from '@/types'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

// Category keys are DB values — kept in Slovak
const CATEGORIES: SuggestionCategory[] = ['Výuka', 'Digitalizácia', 'Kampus', 'Skúšky', 'Iné']

const categoryColors: Record<SuggestionCategory, { active: string; inactive: string }> = {
  Výuka:        { active: 'bg-blue-500/20 text-blue-300 border-blue-500/40',     inactive: 'text-blue-400/50 border-blue-500/15 hover:border-blue-500/30 hover:text-blue-300' },
  Digitalizácia:{ active: 'bg-purple-500/20 text-purple-300 border-purple-500/40', inactive: 'text-purple-400/50 border-purple-500/15 hover:border-purple-500/30 hover:text-purple-300' },
  Kampus:       { active: 'bg-green-500/20 text-green-300 border-green-500/40',   inactive: 'text-green-400/50 border-green-500/15 hover:border-green-500/30 hover:text-green-300' },
  Skúšky:       { active: 'bg-[#4f46e5]/20 text-[#a5b4fc] border-[#4f46e5]/40',  inactive: 'text-[#818cf8]/50 border-[#4f46e5]/15 hover:border-[#4f46e5]/30 hover:text-[#a5b4fc]' },
  Iné:          { active: 'bg-slate-500/20 text-slate-300 border-slate-500/40',   inactive: 'text-slate-400/50 border-slate-500/15 hover:border-slate-500/30 hover:text-slate-300' },
}

export default function SuggestionWall() {
  const t = useTranslations('suggestions')
  const [activeFilter, setActiveFilter] = useState<SuggestionCategory | null>(null)

  const { data, error, isLoading } = useSWR<{ data: Suggestion[]; count: number }>(
    '/api/suggestions',
    fetcher,
    { refreshInterval: 30000, refreshWhenHidden: false }
  )

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <p className="text-red-400/60 text-sm">{t('wall_error')}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-xl p-4 space-y-2">
            <Skeleton className="h-4 w-20 bg-blue-500/10" />
            <Skeleton className="h-3 w-full bg-blue-500/10" />
            <Skeleton className="h-3 w-4/5 bg-blue-500/10" />
          </div>
        ))}
      </div>
    )
  }

  const all = data?.data ?? []

  if (all.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
          <Lightbulb size={24} className="text-blue-400/50" />
        </div>
        <p className="text-blue-200/60 text-sm">{t('wall_empty')}</p>
      </div>
    )
  }

  const filtered = activeFilter ? all.filter((s) => s.category === activeFilter) : all
  const presentCategories = CATEGORIES.filter((c) => all.some((s) => s.category === c))

  // Locale-aware pluralization using translation keys
  function pluralize(n: number) {
    if (n === 1) return t('wall_count_one')
    if (n < 5) return t('wall_count_few')
    return t('wall_count_many')
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <span className="text-sm text-blue-300/60 font-medium" aria-live="polite" aria-atomic="true">
          {filtered.length} {pluralize(filtered.length)}{activeFilter ? ` · ${activeFilter}` : ` ${t('wall_from_students')}`}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" aria-hidden />
      </div>

      {/* Filter tabs */}
      {presentCategories.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-5" role="group" aria-label={t('wall_filter_aria')}>
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 ${
              activeFilter === null
                ? 'bg-blue-500/15 text-blue-300 border-blue-500/35'
                : 'text-blue-400/50 border-blue-500/15 hover:border-blue-500/30 hover:text-blue-300'
            }`}
          >
            {t('wall_all')}
          </button>
          {presentCategories.map((c) => {
            const colors = categoryColors[c]
            const isActive = activeFilter === c
            return (
              <button
                key={c}
                onClick={() => setActiveFilter(isActive ? null : c)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 ${
                  isActive ? colors.active : colors.inactive
                }`}
              >
                {c}
              </button>
            )
          })}
        </div>
      )}

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-blue-200/40 text-sm">{t('wall_none_in_category', { category: activeFilter ?? '' })}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
          {filtered.map((s) => (
            <SuggestionCard key={s.id} suggestion={s} />
          ))}
        </div>
      )}
    </div>
  )
}
