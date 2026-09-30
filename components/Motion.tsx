'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    __cmReady?: boolean
  }
}

/** One motion owner: Lenis smooth scroll, preloader-gated hero entrance, scroll reveals. */
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: true })
    lenis.on('scroll', ScrollTrigger.update)
    lenis.stop()

    const ctx = gsap.context(() => {
      const nav = document.querySelector('[data-nav-entrance]')
      const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero-entrance]')
      let played = false

      if (nav) gsap.set(nav, { y: -12, opacity: 0 })
      if (heroItems.length > 0) gsap.set(heroItems, { y: 32, opacity: 0 })

      const playEntrance = () => {
        if (played) return
        played = true
        lenis.start()
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.35 })
        if (nav) tl.to(nav, { y: 0, opacity: 1, duration: 0.6 }, 0)
        if (heroItems.length > 0) {
          tl.to(heroItems, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.15)
        }
        tl.eventCallback('onComplete', () => ScrollTrigger.refresh())
      }

      if (window.__cmReady) {
        playEntrance()
      } else {
        window.addEventListener('cm:ready', playEntrance, { once: true })
        // Fallback: never leave the hero hidden if the signal is missed.
        window.setTimeout(playEntrance, 4000)
      }

      // Scroll reveals only — hero owns its entrance above.
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
