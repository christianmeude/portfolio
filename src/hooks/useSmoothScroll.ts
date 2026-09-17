import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Page-wide smooth scroll (Lenis) driven off GSAP's ticker, plus ScrollTrigger sync.
 * Reduced-motion users get native scroll: no Lenis instance, no ScrollTriggers.
 * The mobile Work carousel track carries `data-lenis-prevent` so its horizontal
 * snap scroller never fights vertical smoothing.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      // 64px sticky header + breathing room for #work / #about / #contact jumps.
      anchors: { offset: -72 },
      // One RAF loop: GSAP's ticker drives Lenis, never Lenis's own loop.
      autoRaf: false,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Font swap shifts section offsets; re-measure triggers once settled.
    let settled = false
    document.fonts?.ready.then(() => {
      if (!settled) ScrollTrigger.refresh()
    })

    return () => {
      settled = true
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
