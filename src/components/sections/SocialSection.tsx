'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ExternalLink, Camera, MessageCircle } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

const socials = [
  {
    icon: Camera,
    label: 'Instagram',
    handle: '@volimefei2026',
    href: 'https://instagram.com/volimefei2026',
    gradient: 'from-pink-500/15 via-purple-500/10 to-indigo-500/15',
    border: 'border-pink-500/20 hover:border-pink-400/40',
    iconColor: 'text-pink-400',
    glow: 'hover:shadow-pink-500/10',
    description: 'Sleduj kampaň, zákulisie a aktualizácie každý deň',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp / Signal',
    handle: 'Napíš priamo',
    href: 'mailto:mucha.bucek@fei.vsb.cz',
    gradient: 'from-green-500/10 via-teal-500/8 to-cyan-500/10',
    border: 'border-green-500/20 hover:border-green-400/40',
    iconColor: 'text-green-400',
    glow: 'hover:shadow-green-500/10',
    description: 'Rýchly kontakt — na každú správu osobne odpovieme',
  },
  {
    icon: Mail,
    label: 'E-mail',
    handle: 'mucha.bucek@fei.vsb.cz',
    href: 'mailto:mucha.bucek@fei.vsb.cz',
    gradient: 'from-blue-500/12 via-blue-400/8 to-cyan-500/12',
    border: 'border-blue-500/20 hover:border-blue-400/40',
    iconColor: 'text-blue-400',
    glow: 'hover:shadow-blue-500/10',
    description: 'Pre dlhšie správy alebo návrhy na spoluprácu',
  },
]

export default function SocialSection() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email || subStatus === 'loading') return
    setSubStatus('loading')
    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSubStatus(res.ok ? 'success' : 'error')
  }

  return (
    <section id="socialne-siete" className="relative py-28 sm:py-36" style={{ background: '#04101f' }}>
      <div className="section-divider mb-0" />
      <div className="aurora-orb w-[40vw] h-[40vw] top-[-5vw] left-[-10vw] opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)' }} aria-hidden />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-[0.2em] mb-4">
            Zostň v obraze
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Sleduj kampaň
          </h2>
          <p className="text-blue-200/55 max-w-xl mx-auto">
            Každý deň nové zákulisie, podnety a odpovede. Sleduj, pýtaj sa, zapoj sa.
          </p>
        </AnimatedSection>

        {/* Newsletter signup */}
        <AnimatedSection delay={0.05}>
          <div id="newsletter" className="glass rounded-3xl p-8 mb-12 text-center">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-[0.2em] mb-3">Newsletter</p>
            <h3 className="text-2xl font-black text-white mb-2">Zostань informovaný</h3>
            <p className="text-sm text-blue-200/50 mb-6">Dostávaj správy o dianí v senáte priamo do emailu.</p>
            {subStatus === 'success' ? (
              <p className="text-green-400 font-semibold">✓ Prihlásený! Ďakujeme.</p>
            ) : (
              <>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tvoj@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-blue-500/20 text-white placeholder:text-blue-300/30 focus:outline-none focus:border-blue-500/50 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={subStatus === 'loading'}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-colors text-sm disabled:opacity-60 whitespace-nowrap"
                  >
                    {subStatus === 'loading' ? '...' : 'Prihlásiť sa'}
                  </button>
                </form>
                {subStatus === 'error' && (
                  <p className="text-red-400 text-xs mt-3">Niečo sa pokazilo. Skús to znova.</p>
                )}
              </>
            )}
          </div>
        </AnimatedSection>

        {/* Social cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {socials.map((s, i) => {
            const Icon = s.icon
            return (
              <AnimatedSection key={s.label} direction="up" delay={i * 0.08}>
                <motion.a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex flex-col gap-4 p-6 rounded-3xl border bg-gradient-to-br ${s.gradient} ${s.border} transition-all duration-300 group hover:shadow-xl ${s.glow} h-full`}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Icon className={`${s.iconColor} w-5 h-5`} />
                    </div>
                    <ExternalLink className="text-white/15 group-hover:text-white/40 w-4 h-4 transition-colors" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base">{s.label}</div>
                    <div className="text-blue-300/55 text-xs mt-0.5 font-medium">{s.handle}</div>
                  </div>
                  <p className="text-blue-100/45 text-xs leading-relaxed">{s.description}</p>
                </motion.a>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
