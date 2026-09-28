'use client'

import { useState } from 'react'

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

export default function RepoPill({ label, url }: { label: string; url: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const short = url.replace('https://', '')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const area = document.createElement('textarea')
      area.value = url
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="repo-pill" data-open={open || undefined}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-[#f5f2ee] px-5 text-sm font-bold transition-colors hover:bg-[#f5f2ee] hover:text-[#0a0a0a]"
        aria-label={`${label}: ${short} (opens in new tab)`}
      >
        <GitHubIcon />
        {label}
        <span className="repo-url font-mono font-normal" aria-hidden="true">
          {short}
        </span>
      </a>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Collapse link' : 'Expand full link'}
        className="repo-expand inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 border-[#f5f2ee]/40 text-sm font-bold"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          {open ? (
            <path d="M2 7h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <path
              d="M7 2v10M2 7h10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied!' : `Copy ${label} URL`}
        className="repo-copy inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 border-[#f5f2ee] text-sm"
      >
        {copied ? (
          <span aria-hidden="true">✓</span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Repository URL copied to clipboard' : ''}
      </span>
    </div>
  )
}
