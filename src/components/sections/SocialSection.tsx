'use client'

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
