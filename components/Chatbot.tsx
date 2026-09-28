'use client'

import { useEffect, useRef, useState } from 'react'
import { EMAIL } from '../lib/site'

interface Msg {
  from: 'bot' | 'you'
  text: string
}

const GREETING: Msg = {
  from: 'bot',
  text: 'Hi — I answer questions about Christian, his projects, and his work. What do you want to know?',
}

export default function Chatbot() {
  const [enabled, setEnabled] = useState(false)
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const logRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetch('/api/chat')
      .then((r) => r.json())
      .then((d) => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false))
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [msgs, open])

  if (!enabled) return null

  const ask = async () => {
    const q = input.trim()
    if (!q || busy) return
    setInput('')
    setMsgs((m) => [...m, { from: 'you', text: q }])
    setBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      const data = (await res.json()) as { answer?: string }
      setMsgs((m) => [...m, { from: 'bot', text: data.answer ?? `Email Christian at ${EMAIL}.` }])
    } catch {
      setMsgs((m) => [...m, { from: 'bot', text: `Something broke — email Christian at ${EMAIL}.` }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat about Christian's work"
          className="flex h-[420px] w-[min(92vw,360px)] flex-col border-[3px] border-[#0a0a0a] bg-[#f5f2ee] shadow-brutal"
        >
          <div className="flex items-center justify-between border-b-[3px] border-[#0a0a0a] bg-[#0a0a0a] px-4 py-3 text-[#f5f2ee]">
            <span className="type-mono-label">Ask about my work</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center font-bold"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 2l10 10M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-2xl border-2 border-[#0a0a0a] px-3 py-2 text-sm leading-relaxed ${
                  m.from === 'bot' ? 'bg-white' : 'ml-auto bg-[#0a0a0a] text-[#f5f2ee]'
                }`}
              >
                {m.text}
              </p>
            ))}
            {busy && (
              <p className="max-w-[85%] rounded-2xl border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm">
                …
              </p>
            )}
          </div>
          <form
            className="flex gap-2 border-t-[3px] border-[#0a0a0a] p-3"
            onSubmit={(e) => {
              e.preventDefault()
              ask()
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Ask about Christian&apos;s work
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. What did you build?"
              maxLength={500}
              className="min-h-[44px] w-full border-[3px] border-[#0a0a0a] bg-white px-3 text-sm"
            />
            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border-[3px] border-[#0a0a0a] bg-[#0a0a0a] font-bold text-[#f5f2ee] disabled:opacity-50"
              aria-label="Send question"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 14V2M3 7l5-5 5 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat about Christian\u2019s work'}
        className="inline-flex min-h-[56px] min-w-[56px] items-center justify-center rounded-full border-[3px] border-[#0a0a0a] bg-[#0a0a0a] text-2xl text-[#f5f2ee] shadow-brutal"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5h16v11H9l-5 4V5Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M8 9.5h8M8 12.5h5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  )
}
