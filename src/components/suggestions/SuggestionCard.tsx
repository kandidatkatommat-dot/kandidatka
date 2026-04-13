import { Badge } from '@/components/ui/badge'
import type { Suggestion, SuggestionCategory } from '@/types'

const categoryColors: Record<SuggestionCategory, string> = {
  Výuka: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  Digitalizace: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  Kampus: 'bg-green-500/15 text-green-300 border-green-500/25',
  Zkoušky: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  Jiné: 'bg-slate-500/15 text-slate-300 border-slate-500/25',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short' })
}

export default function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
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
      {suggestion.name && (
        <p className="text-xs text-blue-400/50 font-medium">— {suggestion.name}</p>
      )}
    </div>
  )
}
