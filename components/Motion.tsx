'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/** One motion owner: Lenis smooth scroll, hero entrance, scroll reveals, stat count-up. */
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: true })
    lenis.on('scroll', ScrollTrigger.update)

    const ctx = gsap.context(() => {
      // Scroll reveals only — the hero renders in its settled position.
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })

    return () => {
      ctx.revert()
      lenis.destroy()
    }
  }, [])

  return null
}
