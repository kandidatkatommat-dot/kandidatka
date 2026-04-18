'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CandidatesGallery() {
  return (
    <section className="relative py-4 sm:py-6 overflow-hidden" style={{ background: '#020810' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Editorial layout: large feature left + 2 stacked right */}
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-3">

          {/* Feature: 2.webp — landscape, main photo */}
          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            style={{ height: 'clamp(280px, 38vw, 480px)' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            whileHover={{ scale: 1.015 }}
          >
            <Image
              src="/photos/spolu-feature.webp"
              alt="Tomáš Mucha a Martin Buček pred FEI VŠB-TUO"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5">
              <span className="text-[11px] font-semibold text-white/55 uppercase tracking-[0.22em]">
                Volíme FEI 2026
              </span>
            </div>
            <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/20 transition-colors duration-300" />
          </motion.div>

          {/* Right stack: ukazujeme + podanie ruky */}
          <div className="flex flex-col gap-3">
            {[
              { src: '/photos/ukazujeme.webp', alt: 'Kandidáti ukazujú na budovu FEI', label: 'Naša fakulta' },
              { src: '/photos/podanie-ruky.webp', alt: 'Kandidáti si podávajú ruky pred FEI', label: 'Záväzok' },
            ].map((p, i) => (
              <motion.div
                key={p.src}
                className="relative rounded-2xl overflow-hidden group flex-1"
                style={{ minHeight: 'clamp(130px, 17vw, 228px)' }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em]">
                    {p.label}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
