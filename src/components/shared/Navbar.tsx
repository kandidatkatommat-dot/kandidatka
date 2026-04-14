'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from '@/components/shared/Icons'
import { Button } from '@/components/ui/button'

const links = [
  { label: 'O nás', href: '#o-nas' },
  { label: 'Program', href: '#program' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Podnety', href: '#podnety' },
  { label: 'Sociálne siete', href: '#socialne-siete' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#050d1a]/80 border-b border-blue-500/20 shadow-lg shadow-blue-500/5'
          : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-lg font-bold gradient-text">Volíme FEI</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            2026
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-blue-100/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-blue-500/10"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <a href="#podnety" className="hidden md:block">
            <Button
              size="sm"
              data-cursor
              className="bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white border-0 shadow-lg shadow-[#4f46e5]/20 transition-all duration-200"
            >
              Pošli podnet
            </Button>
          </a>
          <button
            className="md:hidden p-2 text-blue-200 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden backdrop-blur-2xl bg-[#03080f]/95 border-t border-blue-500/20 shadow-2xl shadow-blue-950/50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm text-blue-100/80 hover:text-white hover:bg-blue-500/10 rounded-xl transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#podnety" onClick={() => setMenuOpen(false)}>
                <Button className="w-full mt-2 bg-gradient-to-br from-[#4f46e5] to-[#6d28d9] hover:from-[#6366f1] hover:to-[#7c3aed] text-white border-0">
                  Pošli podnet
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
