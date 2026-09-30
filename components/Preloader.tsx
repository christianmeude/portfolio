'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

declare global {
  interface Window {
    __cmReady?: boolean
  }
}

const SEEN_KEY = 'cm:seen'

function signalReady() {
  window.__cmReady = true
  window.dispatchEvent(new Event('cm:ready'))
}

export default function Preloader() {
  const [done, setDone] = useState(false)
  const [n, setN] = useState(0)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      seen = false
    }
    if (reduced || seen) {
      setDone(true)
      signalReady()
      return
    }
    const counter = { v: 0 }
    const tween = gsap.to(counter, {
      v: 100,
      duration: 1.8,
      ease: 'expo.out',
      onUpdate: () => setN(Math.round(counter.v)),
      onComplete: () => {
        try {
          window.sessionStorage.setItem(SEEN_KEY, '1')
        } catch {
          // Private mode etc. — theatre simply replays next visit.
        }
        const el = rootRef.current
        signalReady()
        if (!el) {
          setDone(true)
          return
        }
        gsap.to(el, {
          yPercent: -100,
          duration: 0.7,
          ease: 'power4.inOut',
          delay: 0.25,
          onComplete: () => setDone(true),
        })
      },
    })
    return () => {
      tween.kill()
    }
  }, [])

  if (done) return null
  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-[#f5f2ee]" aria-hidden="true">
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
