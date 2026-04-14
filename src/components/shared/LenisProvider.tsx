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
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
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
