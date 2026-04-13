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

    const move = (e: MouseEvent) => {
      outer.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
      inner.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
    }

    const grow = () => outer.classList.add('cursor-grow')
    const shrink = () => outer.classList.remove('cursor-grow')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden />
      <div ref={innerRef} className="cursor-inner" aria-hidden />
    </>
  )
}
