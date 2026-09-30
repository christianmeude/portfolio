'use client'

import { useMemo, useState } from 'react'
import { EMAIL, GITHUB_PROFILE } from '../lib/site'

const INTENTS = ['Full-time role', 'Freelance project', 'Collaboration', 'Just saying hi'] as const
const SCOPES = ['Mobile app', 'Web app', 'Systems / backend'] as const

export default function Contact() {
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>('Freelance project')
  const [scope, setScope] = useState<(typeof SCOPES)[number]>('Mobile app')
  const [note, setNote] = useState('')

  const href = useMemo(() => {
    const subject = encodeURIComponent(`[${intent}] ${scope} — via portfolio`)
    const body = encodeURIComponent(
      `Hi Christian,\n\nIntent: ${intent}\nScope: ${scope}\n\nDetails:\n${note || '(write 2-3 lines: timeline, links, budget if any)'}\n\n—`,
    )
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }, [intent, scope, note])

  return (
    <footer id="contact" className="bg-[#f5f2ee]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <p className="type-mono-label">05 — Contact</p>
        <h2 data-reveal className="font-display mt-3 text-5xl font-extrabold uppercase leading-[0.9] md:text-7xl">
          Let&apos;s build
          <br />
          <span className="type-outline">something together.</span>
        </h2>
        <p className="mt-4 max-w-xl text-lg">
          Pick an intent and scope — it composes the email. No spam trap; the chat widget
          answers from approved notes only.
        </p>
        <p className="mt-4 md:hidden">
          <a href={`mailto:${EMAIL}`} className="font-bold underline">
            {EMAIL}
          </a>
        </p>

        <div data-reveal className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-[3px] border-[#0a0a0a] bg-white p-6 shadow-brutal">
            <p className="type-mono-label" id="intent-label">
              Intent
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby="intent-label">
              {INTENTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntent(i)}
                  aria-pressed={intent === i}
                  className={`min-h-[44px] rounded-full border-[3px] border-[#0a0a0a] px-4 text-sm font-bold ${
                    intent === i ? 'bg-[#0a0a0a] text-[#f5f2ee]' : 'bg-white'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <p className="type-mono-label mt-6" id="scope-label">
              Scope
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby="scope-label">
              {SCOPES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  aria-pressed={scope === s}
                  className={`min-h-[44px] rounded-full border-[3px] border-[#0a0a0a] px-4 text-sm font-bold ${
                    scope === s ? 'bg-[#0a0a0a] text-[#f5f2ee]' : 'bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="border-[3px] border-[#0a0a0a] bg-white p-6 shadow-brutal">
            <label className="type-mono-label" htmlFor="note">
              Details
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={6}
              placeholder="Timeline, links, budget if any…"
              className="mt-3 min-h-[120px] w-full border-[3px] border-[#0a0a0a] bg-[#f5f2ee] p-3 font-body text-sm"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={href} className="btn-brutal btn-primary-brutal">
                Compose email
              </a>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-brutal btn-ghost-brutal"
              >
                GitHub
              </a>
            </div>
            <p className="mt-3 select-all font-mono text-xs text-[#555]">{EMAIL}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-[#0a0a0a] pt-6 text-sm">
          <p>© {new Date().getFullYear()} Christian Meude. Keeping it simple.</p>
          <a href="#top" className="inline-flex min-h-[44px] items-center font-bold underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
