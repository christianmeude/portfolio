import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/**
 * Fixed full-page liquid-chrome ambient layer.
 * Pure CSS: silvery metallic washes drift slowly behind all content.
 * `prefers-reduced-motion` freezes the drift; the static wash always remains.
 * GSAP adds one calm scroll parallax on the layer itself (never the blobs —
 * they already own CSS keyframe transforms); dead under reduced motion.
 */
export default function ChromeBackdrop() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.to(root.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} aria-hidden="true" className="chrome">
      <div className="chrome-wash" />
      <div className="chrome-blob chrome-blob-a" />
      <div className="chrome-blob chrome-blob-b" />
      <div className="chrome-blob chrome-blob-c" />
      <div className="chrome-sheen" />
    </div>
  )
}
