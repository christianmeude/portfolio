import { useState } from 'react'
import { EMAIL, GITHUB_PROFILE } from '../data/projects'

export default function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'fail'>('idle')
  const copied = copyState === 'ok'

  const copyEmail = async () => {
    let ok = false
    try {
      await navigator.clipboard.writeText(EMAIL)
      ok = true
    } catch {
      try {
        const area = document.createElement('textarea')
        area.value = EMAIL
        document.body.appendChild(area)
        area.select()
        ok = document.execCommand('copy')
        document.body.removeChild(area)
      } catch {
        ok = false
      }
    }
    setCopyState(ok ? 'ok' : 'fail')
    window.setTimeout(() => setCopyState('idle'), 2500)
  }

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="section-pad border-t border-(--color-border)">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">Contact</p>
        <h2 id="contact-heading" className="reveal font-display mt-3 text-3xl font-bold sm:text-4xl">
          Let&apos;s build something calm.
        </h2>
        <p className="reveal mt-3 max-w-xl text-(--color-muted-foreground)">
          Open to roles and freelance. Email is fastest.
        </p>
        <div className="reveal mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full bg-(--color-accent) px-7 font-semibold text-(--color-on-accent) transition-transform duration-200 hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mr-2">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Email me
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-(--color-border) bg-(--color-card) px-7 font-semibold transition-colors duration-200 hover:border-(--color-accent)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mr-2">
              <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {copyState === 'fail' ? 'Copy failed — select the address below' : copied ? 'Copied to clipboard' : 'Copy email address'}
          </button>
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-(--color-border) bg-(--color-card) px-7 font-semibold transition-colors duration-200 hover:border-(--color-accent)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mr-2">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
            GitHub
          </a>
        </div>
        <p aria-live="polite" className="reveal mt-4 select-all text-(--color-muted-foreground)">
          {EMAIL}
          {copied && <span className="ml-2 font-semibold text-(--color-accent)">— copied</span>}
          {copyState === 'fail' && (
            <span className="ml-2 font-semibold text-(--color-accent)">— copy failed, long-press to select</span>
          )}
        </p>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-(--color-border) pt-6 text-sm text-(--color-muted-foreground)">
          <p>© {new Date().getFullYear()} Christian Meude.</p>
          <a href="#top" className="inline-flex min-h-[44px] items-center font-semibold hover:underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
