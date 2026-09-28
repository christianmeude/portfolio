'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const VARIANTS = [
  { key: 'A', name: 'Cream Brutalism' },
  { key: 'B', name: 'Quiet Minimal' },
  { key: 'C', name: 'Ink Editorial' },
] as const

// PROTOTYPE switcher — dev only, never ships. ?variant=A|B|C on `/`.
export default function PrototypeSwitcher() {
  const router = useRouter()
  const params = useSearchParams()
  const current = (params.get('variant') ?? 'A').toUpperCase()
  const idx = Math.max(
    0,
    VARIANTS.findIndex((v) => v.key === current),
  )

  if (process.env.NODE_ENV === 'production') return null

  const go = (next: number) => {
    const v = VARIANTS[(next + VARIANTS.length) % VARIANTS.length]
    const q = new URLSearchParams(params.toString())
    q.set('variant', v.key)
    router.replace(`?${q.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key === 'ArrowLeft') go(idx - 1)
      if (e.key === 'ArrowRight') go(idx + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-1 rounded-full border-[3px] border-[#f5f2ee] bg-[#0a0a0a] px-2 py-1 text-[#f5f2ee] shadow-[4px_4px_0_rgba(0,0,0,0.35)]">
      <button
        type="button"
        onClick={() => go(idx - 1)}
        aria-label="Previous variant"
        className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full font-bold hover:bg-[#f5f2ee] hover:text-[#0a0a0a]"
      >
        ←
      </button>
      <span className="px-2 font-mono text-xs font-bold tracking-widest" aria-live="polite">
        {VARIANTS[idx].key} · {VARIANTS[idx].name}
      </span>
      <button
        type="button"
        onClick={() => go(idx + 1)}
        aria-label="Next variant"
        className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full font-bold hover:bg-[#f5f2ee] hover:text-[#0a0a0a]"
      >
        →
      </button>
    </div>
  )
}
