'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const photos = [
  {
    src: '/photos/ukazujeme.webp',
    alt: 'Tomáš a Martin ukazujú na budovu FEI',
    label: 'Naša fakulta',
    aspect: 'tall',   // 3:4
  },
  {
    src: '/photos/spolu.webp',
    alt: 'Tomáš a Martin pred vchodom FEI',
    label: 'Tím',
    aspect: 'wide',   // shorter center
  },
  {
    src: '/photos/podanie-ruky.webp',
    alt: 'Tomáš a Martin si podávajú ruky pred FEI',
    label: 'Záväzok',
    aspect: 'tall',
  },
]

export default function CandidatesGallery() {
  return (
    <section className="relative py-4 sm:py-6 overflow-hidden" style={{ background: '#020810' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              className="relative overflow-hidden rounded-2xl group"
              style={{ height: p.aspect === 'tall' ? 'clamp(220px, 30vw, 400px)' : 'clamp(180px, 24vw, 340px)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              {/* Subtle permanent overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/80 via-transparent to-transparent" />
              {/* Label */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-semibold text-blue-300/70 uppercase tracking-[0.18em]">
                  {p.label}
                </span>
              </div>
              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
