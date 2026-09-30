'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { EMAIL } from '../lib/site'

const LINKS = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Skills', href: '#skills' },
  { n: '03', label: 'Projects', href: '#projects' },
  { n: '04', label: 'Contact', href: '#contact' },
]

export default function SiteNav() {
  const [render, setRender] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closing = useRef(false)

  const reduceMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const openMenu = () => {
    closing.current = false
    setRender(true)
  }

  const closeMenu = () => {
    if (!render || closing.current) return
    const el = dialogRef.current
    if (!el || reduceMotion()) {
      setRender(false)
      triggerRef.current?.focus()
      return
    }
    closing.current = true
    gsap.to(el, {
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        closing.current = false
        setRender(false)
        triggerRef.current?.focus()
      },
    })
  }

  useEffect(() => {
    if (!render) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const el = dialogRef.current
    if (el && !reduceMotion()) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' })
      gsap.fromTo(
        el.querySelectorAll('[data-menu-link]'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06, delay: 0.08 },
      )
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // closeMenu is stable by design (refs + captured render=true); re-run only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render])

  return (
    <>
      <nav data-nav-entrance className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] border-[#0a0a0a] bg-[#f5f2ee] px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <a href="#top" className="font-display text-3xl font-extrabold tracking-tight">
            CM.
          </a>
        </div>
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-sm font-bold uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-brutal btn-primary-brutal px-6 py-2 text-sm uppercase tracking-[0.15em]">
              Hire me
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#contact"
            className="btn-brutal btn-primary-brutal px-4 text-xs uppercase tracking-[0.15em]"
          >
            Hire me
          </a>
          <button
            ref={triggerRef}
            type="button"
            onClick={openMenu}
            aria-expanded={render}
            aria-label="Open menu"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border-[3px] border-[#0a0a0a] bg-white shadow-brutal"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {render && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[80] flex flex-col bg-[#0a0a0a] text-[#f5f2ee]"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-display text-3xl font-extrabold tracking-tight">CM.</span>
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border-[3px] border-[#f5f2ee]"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-1 px-6">
            {LINKS.map((l) => (
              <li key={l.href} data-menu-link>
                <a
                  href={l.href}
                  onClick={closeMenu}
                  className="group flex min-h-[64px] items-baseline gap-4"
                >
                  <span className="font-mono text-xs text-[#777]">{l.n}</span>
                  <span className="font-display text-5xl font-extrabold uppercase tracking-tight group-hover:opacity-60">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t-[3px] border-[#f5f2ee]/20 px-6 py-6">
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-flex min-h-[52px] items-center bg-[#f5f2ee] px-8 text-sm font-bold uppercase tracking-[0.15em] text-[#0a0a0a]"
            >
              Hire me
            </a>
            <p className="mt-4 font-mono text-xs tracking-[0.15em] text-[#cccccc]">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
