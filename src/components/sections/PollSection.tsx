'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Poll, PollOption } from '@/types/index'

function PollBar({ option, total, isWinner }: { option: PollOption; total: number; isWinner: boolean }) {
  const pct = total > 0 ? Math.round((option.vote_count / total) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-blue-100/80 font-medium">{option.option_text}</span>
          <span className={`text-sm font-bold tabular-nums ${isWinner ? 'text-orange-400' : 'text-blue-400/60'}`}>{pct}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: isWinner
                ? 'linear-gradient(90deg, #f97316, #fb923c)'
                : 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
          />
        </div>
      </div>
    </div>
  )
}

export default function PollSection() {
  const [poll, setPoll] = useState<Poll | null>(null)
  const [voted, setVoted] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [localCounts, setLocalCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    fetch('/api/polls/active')
      .then((r) => r.json())
      .then((d) => {
        if (d.poll) {
          setPoll(d.poll)
          const counts: Record<string, number> = {}
          d.poll.options?.forEach((o: PollOption) => {
            counts[o.id] = o.vote_count
          })
          setLocalCounts(counts)
        }
      })
      .finally(() => setLoading(false))

    // Check if already voted (localStorage)
    if (typeof window !== 'undefined') {
      const v = localStorage.getItem('poll_voted')
      if (v) setVoted(true)
    }
  }, [])

  const total = Object.values(localCounts).reduce((a, b) => a + b, 0)
  const maxCount = Math.max(...Object.values(localCounts), 1)

  async function handleVote() {
    if (!poll || !selectedId || submitting) return
    setSubmitting(true)

    const res = await fetch('/api/polls/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poll_id: poll.id, option_id: selectedId }),
    })

    if (res.ok || res.status === 409) {
      setLocalCounts((prev) => ({
        ...prev,
        [selectedId]: (prev[selectedId] ?? 0) + (res.ok ? 1 : 0),
      }))
      setVoted(true)
      localStorage.setItem('poll_voted', '1')
    }
    setSubmitting(false)
  }

  if (loading || !poll) return null

  const options = poll.options ?? []

  return (
    <section
      className="relative py-20 sm:py-28"
      style={{ background: 'linear-gradient(180deg, #060f1e 0%, #04101f 100%)' }}
    >
      <div className="section-divider mb-0" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-20">
        <AnimatedSection className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-3">
            Živý prieskum
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-3"
            style={{ fontFamily: 'var(--font-cal, inherit)' }}
          >
            {poll.question}
          </h2>
          {total > 0 && <p className="text-sm text-blue-400/50">{total} odpovedí od študentov FEI</p>}
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass rounded-3xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!voted ? (
                <motion.div
                  key="voting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedId(option.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                        selectedId === option.id
                          ? 'border-orange-500/50 bg-orange-500/8 text-white'
                          : 'border-blue-500/15 bg-white/[0.02] text-blue-100/70 hover:border-blue-500/30 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                            selectedId === option.id ? 'border-orange-500 bg-orange-500' : 'border-blue-500/30'
                          }`}
                        />
                        <span className="text-sm font-medium">{option.option_text}</span>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={handleVote}
                    disabled={!selectedId || submitting}
                    className="w-full mt-2 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
                  >
                    {submitting ? 'Odosielam...' : 'Hlasovať →'}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="text-xs text-green-400/70 uppercase tracking-widest mb-5 text-center">
                    ✓ Výsledky prieskumu
                  </p>
                  {options.map((option) => (
                    <PollBar
                      key={option.id}
                      option={{ ...option, vote_count: localCounts[option.id] ?? option.vote_count }}
                      total={total}
                      isWinner={(localCounts[option.id] ?? option.vote_count) === maxCount}
                    />
                  ))}
                  <p className="text-xs text-blue-400/40 text-center mt-4">
                    Tieto výsledky sú súčasťou nášho programu
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
