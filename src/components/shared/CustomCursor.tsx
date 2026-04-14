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

    const grow = () => outer.classList.add('cursor-grow')
    const shrink = () => outer.classList.remove('cursor-grow')

    const cleanups: (() => void)[] = []

    document.addEventListener('mousemove', move)
    cleanups.push(() => document.removeEventListener('mousemove', move))

    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
      cleanups.push(() => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    })

    return () => { cancelAnimationFrame(rafId); cleanups.forEach(fn => fn()) }
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden />
      <div ref={innerRef} className="cursor-inner" aria-hidden />
    </>
  )
}
