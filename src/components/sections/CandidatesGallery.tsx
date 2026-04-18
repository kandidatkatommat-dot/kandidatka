'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const photos = [
  {
    src: '/photos/spolu-feature.webp',
    alt: 'Tomáš Mucha a Martin Buček pred Fakultou elektrotechniky a informatiky',
    label: 'Volíme FEI 2026',
    sublabel: 'Spolu za zmenu',
    pos: 'object-center',
  },
  {
    src: '/photos/ukazujeme.webp',
    alt: 'Kandidáti ukazujú na Fakultu elektrotechniky a informatiky',
    label: 'Naša fakulta',
    sublabel: 'FEI VŠB-TUO',
    pos: 'object-center',
    featured: true,
  },
  {
    src: '/photos/podanie-ruky.webp',
    alt: 'Tomáš Mucha a Martin Buček si podávajú ruky pred FEI',
    label: 'Záväzok',
    sublabel: 'Mucha & Buček',
    pos: 'object-center',
  },
]

export default function CandidatesGallery() {
  return (
    <section
      className="relative py-10 sm:py-16 overflow-hidden"
      style={{ background: '#020810' }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section label */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[10px] font-semibold text-blue-400/40 uppercase tracking-[0.28em]">
            Volíme FEI 2026 · Mucha &amp; Buček · FEI VŠB-TUO
          </span>
        </motion.div>

        {/* Triptych */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-end">
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden group ring-1 ring-white/5 ${
                p.featured ? 'sm:-mt-8' : ''
              }`}
              style={{ height: p.featured ? 'clamp(420px, 58vw, 680px)' : 'clamp(360px, 50vw, 600px)' }}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.018, y: -4 }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className={`object-cover ${p.pos} transition-transform duration-700 group-hover:scale-105`}
                sizes="(max-width: 640px) 100vw, 33vw"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(2,8,16,0.75) 0%, rgba(2,8,16,0.1) 35%, transparent 60%)',
                }}
              />

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-blue-500/0 group-hover:border-blue-500/25 transition-colors duration-400" />

              {/* Caption */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <p className="text-white font-bold text-sm leading-tight">{p.label}</p>
                <p className="text-blue-300/55 text-[10px] font-semibold uppercase tracking-[0.2em] mt-0.5">{p.sublabel}</p>
              </div>

              {/* Featured accent line top */}
              {p.featured && (
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[11px] text-blue-400/30 font-medium tracking-widest uppercase">
            MUC0075 · BUC0130 · Akademický senát FEI · 2026–2029
          </p>
        </motion.div>
      </div>
    </section>
  )
}
