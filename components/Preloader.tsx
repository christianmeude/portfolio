'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [done, setDone] = useState(false)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      window.dispatchEvent(new Event('cm:ready'))
      return
    }
    let v = 0
    const id = window.setInterval(() => {
      v += Math.ceil(Math.random() * 14)
      if (v >= 100) {
        v = 100
        window.clearInterval(id)
        window.setTimeout(() => {
          setDone(true)
          window.dispatchEvent(new Event('cm:ready'))
        }, 250)
      }
      setN(v)
    }, 90)
    return () => window.clearInterval(id)
  }, [])

  if (done) return null
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-[#f5f2ee]" aria-hidden="true">
      <div className="flex h-full flex-col items-center justify-center px-6">
        <div className="font-display text-7xl font-extrabold tracking-tight">CM.</div>
        <div className="type-mono-label mt-3 text-[#cccccc]">Mobile · Web · Systems</div>
        <div className="mt-10 flex items-baseline gap-2 font-mono">
          <span className="text-5xl font-bold tabular-nums">{String(n).padStart(3, '0')}</span>
          <span className="text-sm text-[#cccccc]">/ 100</span>
        </div>
        <div className="mt-4 h-[3px] w-full max-w-xs bg-[#444444]">
          <div className="h-full bg-[#f5f2ee]" style={{ width: `${n}%` }} />
        </div>
      </div>
    </div>
  )
}
