'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    // Chrome: JS-driven scroll fights the compositor thread → native scroll is smoother
    const isChrome = document.documentElement.classList.contains('no-backdrop')

    // On touch or Chrome, native scroll is faster — skip Lenis entirely
    if (isTouch || isChrome) return

    const lenis = new Lenis({
      lerp: prefersReduced ? 1 : 0.08,
      smoothWheel: !prefersReduced,
    })

    // Native RAF loop — replaces gsap.ticker (~125KB removed from bundle)
    // lenis.raf() expects milliseconds; RAF timestamp is already in ms
    let rafId: number
    const loop = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
