import { useEffect, useState } from 'react'
import type { Theme } from '../hooks/useTheme'

interface Props {
  theme: Theme
  onToggle: () => void
}

export default function Header({ theme, onToggle }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 8))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled
          ? 'border-b border-(--color-border) bg-(--color-background)/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-(--color-accent) focus:px-4 focus:py-2 focus:text-(--color-on-accent)"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
          CM<span className="text-(--color-accent)">.</span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-3 text-sm font-medium sm:gap-5 sm:text-base">
          <a href="#work" className="flex min-h-[44px] items-center">
            Work
          </a>
          <a href="#stack" className="flex min-h-[44px] items-center">
            Stack
          </a>
          <a href="#about" className="flex min-h-[44px] items-center">
            About
          </a>
          <a href="#contact" className="flex min-h-[44px] items-center">
            Contact
          </a>
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border border-(--color-border) px-3 transition-colors duration-200 hover:border-(--color-accent)"
          >
            <span aria-hidden="true" className="inline-flex">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 13.5A8 8 0 0 1 10.5 4 6.5 6.5 0 1 0 20 13.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
            <span className="sr-only">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
