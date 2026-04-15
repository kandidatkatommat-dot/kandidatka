'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    outer.style.opacity = '1'
    inner.style.opacity = '1'

    let rafId = 0
    let mx = 0, my = 0
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        outer.style.transform = `translate(${mx - 16}px, ${my - 16}px)`
        inner.style.transform = `translate(${mx - 3}px, ${my - 3}px)`
      })
    }

    // Event delegation — one listener pair instead of one per element.
    // Also catches dynamically added buttons (e.g. lazy-loaded sections).
    const delegate = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a,button,[data-cursor]')) {
        outer.classList[e.type === 'mouseover' ? 'add' : 'remove']('cursor-grow')
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', delegate)
    document.addEventListener('mouseout', delegate)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', delegate)
      document.removeEventListener('mouseout', delegate)
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden />
      <div ref={innerRef} className="cursor-inner" aria-hidden />
    </>
  )
}
