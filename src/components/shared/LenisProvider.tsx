'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  // Store the exact function reference so cleanup removes the same one it added
  const tickerFnRef = useRef<((time: number) => void) | null>(null)

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
    lenisRef.current = lenis

    const tickerFn = (time: number) => lenis.raf(time * 1000)
    tickerFnRef.current = tickerFn

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current)
        tickerFnRef.current = null
      }
    }
  }, [])

  return <>{children}</>
}
