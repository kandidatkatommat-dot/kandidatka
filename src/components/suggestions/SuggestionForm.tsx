'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
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

// Category keys stored in DB — kept in Slovak as DB values
const categories: SuggestionCategory[] = ['Výuka', 'Digitalizácia', 'Kampus', 'Skúšky', 'Iné']

const MAX_LEN = 500

export default function SuggestionForm({ onSuccess }: { onSuccess?: () => void }) {
  const t = useTranslations('suggestions')
  const [name, setName] = useState('')
  const [category, setCategory] = useState<SuggestionCategory | ''>('')
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [categoryTouched, setCategoryTouched] = useState(false)
  const honeypotRef = useRef<HTMLInputElement>(null)

  const remaining = MAX_LEN - suggestion.length

  function resetForm() {
    setName('')
    setCategory('')
    setSuggestion('')
    setSuccess(false)
    setCategoryTouched(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!category || suggestion.trim().length < 10) return
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
        toast.error(json.error ?? t('form_error'))
      } else {
        setSuccess(true)
        onSuccess?.()
      }
    } catch {
      toast.error(t('form_error_network'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.88, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          className="flex flex-col items-center gap-5 py-8 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl bg-[#4f46e5]/30 scale-125 pointer-events-none" />
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(109,40,217,0.12) 100%)',
                border: '1.5px solid rgba(79,70,229,0.35)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <motion.path
                  d="M8 20 L16 28 L32 12"
                  stroke="#818cf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                />
              </svg>
            </div>
          </div>

          <div>
            <motion.h3
              className="text-2xl font-black mb-1"
              style={{
                background: 'linear-gradient(90deg, #a5b4fc, #818cf8, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {t('success_heading')}
            </motion.h3>
            <motion.p
              className="text-sm text-blue-200/60 max-w-xs leading-relaxed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
            >
              {t('success_text')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            <button
              onClick={resetForm}
              className="px-5 py-2.5 text-sm font-semibold text-[#818cf8] hover:text-[#a5b4fc] rounded-xl transition-colors border border-[#4f46e5]/30 hover:border-[#6366f1]/50 hover:bg-[#4f46e5]/8"
            >
              {t('success_again')}
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
        >
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
              {t('form_name_label')}
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('form_name_placeholder')}
              maxLength={100}
              className="bg-blue-500/5 border-blue-500/20 text-white placeholder:text-blue-300/30 focus-visible:ring-blue-500/50"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-blue-300/70 uppercase tracking-widest">
              {t('form_category_label')}
            </label>
            <Select value={category} onValueChange={(v) => { setCategory(v as SuggestionCategory); setCategoryTouched(true) }}>
              <SelectTrigger className={`bg-blue-500/5 text-white focus:ring-blue-500/50 transition-colors ${
                categoryTouched && !category
                  ? 'border-amber-500/50 ring-1 ring-amber-500/30'
                  : 'border-blue-500/20'
              }`}>
                <SelectValue placeholder={t('form_category_placeholder')} />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1628] border-blue-500/20">
                {categories.map((c) => (
                  <SelectItem key={c} value={c} className="text-blue-100 focus:bg-blue-500/20 focus:text-white">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Suggestion text */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-blue-300/70 uppercase tracking-widest">
              {t('form_text_label')}
            </label>
            <Textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value.slice(0, MAX_LEN))}
              placeholder={t('form_text_placeholder')}
              rows={5}
              className="bg-blue-500/5 border-blue-500/20 text-white placeholder:text-blue-300/30 focus-visible:ring-blue-500/50 resize-none"
            />
            <div className="flex justify-between items-center">
              {suggestion.trim().length > 0 && suggestion.trim().length < 10 ? (
                <p className="text-xs text-blue-400/50">
                  {t('form_min_chars', { n: 10 - suggestion.trim().length })}
                </p>
              ) : (
                <span />
              )}
              <span className={`text-xs ${remaining < 50 ? 'text-[#818cf8]' : 'text-blue-400/40'}`}>
                {t('form_chars_left', { n: remaining })}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !category || suggestion.trim().length < 10}
            onClick={() => { if (!category) setCategoryTouched(true) }}
            className="w-full bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white border-0 shadow-lg shadow-[#4f46e5]/25 py-5 font-semibold transition-all duration-200 disabled:opacity-40 hover:scale-[1.02]"
          >
            {loading ? t('form_submitting') : t('form_submit')}
          </Button>

          <p className="text-xs text-blue-300/30 text-center leading-relaxed">
            {t('form_footer')}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
