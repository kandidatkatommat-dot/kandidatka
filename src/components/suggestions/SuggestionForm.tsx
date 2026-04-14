'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SuggestionCategory } from '@/types'

const categories: SuggestionCategory[] = ['Výuka', 'Digitalizace', 'Kampus', 'Zkoušky', 'Jiné']

const MAX_LEN = 500

export default function SuggestionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<SuggestionCategory | ''>('')
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)
  const honeypotRef = useRef<HTMLInputElement>(null)

  const remaining = MAX_LEN - suggestion.length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!category) {
      toast.error('Vyber kategóriu podnetu.')
      return
    }
    if (suggestion.trim().length < 10) {
      toast.error('Podnět musí mít alespoň 10 znaků.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/suggestions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          category,
          suggestion: suggestion.trim(),
          website: honeypotRef.current?.value ?? '',
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error ?? 'Nastala chyba. Skúste to znova.')
      } else {
        toast.success('Ďakujeme za tvoj podnet! Preveríme ho a zverejníme.', {
          description: 'Tvoje nápady pomáhajú formovať lepšiu FEI.',
        })
        setName('')
        setCategory('')
        setSuggestion('')
        onSuccess?.()
      }
    } catch {
      toast.error('Nastala sieťová chyba. Skúste to znova.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — hidden from real users */}
      <input
        ref={honeypotRef}
        name="website"
        type="text"
        tabIndex={-1}
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
        aria-hidden
        autoComplete="off"
      />

      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-blue-300/70 uppercase tracking-widest">
          Meno (nepovinné)
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Anonymný študent"
          maxLength={100}
          className="bg-blue-500/5 border-blue-500/20 text-white placeholder:text-blue-300/30 focus-visible:ring-blue-500/50"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-blue-300/70 uppercase tracking-widest">
          Kategória *
        </label>
        <Select value={category} onValueChange={(v) => setCategory(v as SuggestionCategory)}>
          <SelectTrigger className="bg-blue-500/5 border-blue-500/20 text-white focus:ring-blue-500/50">
            <SelectValue placeholder="Vyber kategóriu..." />
          </SelectTrigger>
          <SelectContent className="bg-[#0a1628] border-blue-500/20">
            {categories.map((c) => (
              <SelectItem
                key={c}
                value={c}
                className="text-blue-100 focus:bg-blue-500/20 focus:text-white"
              >
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Suggestion text */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-blue-300/70 uppercase tracking-widest">
          Tvoj podnet *
        </label>
        <Textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value.slice(0, MAX_LEN))}
          placeholder="Čo by si chcel/a zmeniť alebo zlepšiť na FEI?"
          rows={5}
          className="bg-blue-500/5 border-blue-500/20 text-white placeholder:text-blue-300/30 focus-visible:ring-blue-500/50 resize-none"
        />
        <div className="flex justify-end">
          <span
            className={`text-xs ${
              remaining < 50 ? 'text-[#818cf8]' : 'text-blue-400/40'
            }`}
          >
            {remaining} znakov zostáva
          </span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-500/20 py-5 font-semibold transition-all duration-200"
      >
        {loading ? 'Odosielam...' : 'Odoslať podnet ✉️'}
      </Button>

      <p className="text-xs text-blue-300/30 text-center leading-relaxed">
        Podnety prechádzajú moderáciou pred zverejnením. Osobné údaje nie sú povinné.
      </p>
    </form>
  )
}
