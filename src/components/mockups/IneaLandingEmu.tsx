import { useEffect, useRef, useState } from 'react'
import { BrowserFrame } from './frames'

/**
 * Inea Scents landing — faithful interactive preview of the real React
 * single-page marketing site, rebuilt from its own sections: nav with theme
 * toggle, hero, package tiers, 4-step "how the day goes", and the inquiry
 * form that POSTs to the bookings API.
 *
 * Content is illustrative sample input (badged as such); copy, tiers, and
 * branding (plum #6A4053, cream #FDF4F5, night #151012, Figtree) mirror the
 * real site. No motion library here — the real page is a calm static read.
 */

const PLUM = '#6A4053'
const PLUM_DARK = '#4B2738'
const CREAM = '#FDF4F5'
const NIGHT = '#151012'
const NIGHT_SURFACE = '#1C1618'

const TIERS = [
  { pax: 50, price: 'Php 4,499' },
  { pax: 70, price: 'Php 6,399' },
  { pax: 100, price: 'Php 8,799' },
  { pax: 150, price: 'Php 13,119' },
]

const INCLUDED = [
  'Logo 10ml bottle per guest',
  '4 inspired scents to choose from',
  'Styled bar, 3–4h with 2 staff',
  'Claim stub + celebrant gift',
]

const STEPS = [
  'Tell us your date and guest count',
  'We confirm availability with you',
  'Guests explore the scents with our team',
  'Everyone takes home your logo bottle',
]

export function IneaLandingEmu() {
  const [dark, setDark] = useState(false)
  const [tierIdx, setTierIdx] = useState(1)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('70')
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)
  const inquireRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const say = (message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }

  const jump = (ref: React.RefObject<HTMLDivElement | null>) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ref.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  const submit = () => {
    if (!name.trim() || !date.trim()) {
      setFormError('Tell us your name and event date — everything else is optional.')
      return
    }
    setFormError(null)
    setSent(true)
    say('Inquiry drafted. The live site posts it to the bookings API.')
  }

  const bg = dark ? NIGHT : CREAM
  const surface = dark ? NIGHT_SURFACE : '#ffffff'
  const ink = dark ? '#f3e7ea' : PLUM_DARK
  const muted = dark ? '#b39aa1' : '#99868C'
  const hairline = dark ? '#36222c' : '#ecdfe1'
  const field = dark ? NIGHT_SURFACE : '#ffffff'

  const inputStyle: React.CSSProperties = {
    background: field,
    borderColor: hairline,
    color: ink,
  }

  return (
    <BrowserFrame label="Inea Scents landing page interactive preview — sample content" url="inea-scents / landing" interactive laptop>
      <div
        className="[font-family:Figtree,system-ui,sans-serif]"
        style={{ background: bg, color: ink }}
      >
        <p aria-live="polite" className="sr-only">
          Inea Scents landing preview
          {toast ? `. ${toast}` : ''}
        </p>

        {/* Nav */}
        <div className="flex items-center justify-between gap-2 border-b px-4 py-2.5" style={{ borderColor: hairline, background: bg }}>
          <p className="text-[14px] font-bold tracking-wide">
            INEA <span className="font-normal italic">Scents</span>
          </p>
          <div className="flex items-center gap-1.5">
            <span className="hidden rounded-full px-2 py-0.5 text-[10px] font-semibold min-[560px]:inline-block" style={{ background: '#C4ACAC', color: PLUM_DARK }}>
              Sample data
            </span>
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-pressed={dark}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border text-[14px]"
              style={{ borderColor: hairline }}
            >
              <span aria-hidden="true">{dark ? '☀' : '☾'}</span>
            </button>
            <button
              type="button"
              onClick={() => jump(inquireRef)}
              className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-4 text-[12px] font-semibold text-white"
              style={{ background: PLUM }}
            >
              Inquire
            </button>
          </div>
        </div>

        {/* Page */}
        <div ref={scrollRef} data-lenis-prevent className="flex h-[380px] flex-col gap-5 overflow-y-auto px-5 py-5">
          {/* Hero */}
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
              Bespoke perfume bar · Metro Manila
            </p>
            <p className="max-w-[420px] text-[26px] font-bold leading-tight">
              The perfume bar guests remember
            </p>
            <p className="max-w-[380px] text-[12px] leading-relaxed" style={{ color: muted }}>
              A styled perfume bar at your event. Guests choose from 4 inspired
              scents and take home a 10ml bottle with your logo.
            </p>
            <p className="text-[13px] font-bold">Starts at Php 4,499 · 50–150 pax</p>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => jump(packagesRef)}
                className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-5 text-[12px] font-semibold text-white"
                style={{ background: PLUM }}
              >
                See packages
              </button>
              <button
                type="button"
                onClick={() => say('The native app listing lives outside this preview.')}
                className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-5 text-[12px] font-semibold"
                style={{ borderColor: hairline, color: ink }}
              >
                Book in App
              </button>
            </div>
          </div>

          {/* Packages */}
          <div ref={packagesRef} className="scroll-mt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
              Packages
            </p>
            <p className="mt-1 text-[16px] font-bold">One bar, four sizes</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2" role="group" aria-label="Pick a guest tier">
              {TIERS.map((t, i) => (
                <button
                  key={t.pax}
                  type="button"
                  onClick={() => setTierIdx(i)}
                  aria-pressed={tierIdx === i}
                  className="cursor-pointer rounded-2xl border p-3 text-left"
                  style={
                    tierIdx === i
                      ? { borderColor: PLUM, background: surface, outline: `2px solid ${PLUM}`, outlineOffset: '-2px' }
                      : { borderColor: hairline, background: surface }
                  }
                >
                  <p className="text-[15px] font-bold">{t.pax} pax</p>
                  <p className="text-[12px] font-semibold" style={{ color: tierIdx === i ? PLUM : muted }}>
                    {t.price}
                  </p>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px]" style={{ color: muted }} aria-live="polite">
              {TIERS[tierIdx].pax} guests · {TIERS[tierIdx].price} — every tier includes:
            </p>
            <ul className="mt-1.5 grid grid-cols-1 gap-1.5 min-[560px]:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-xl border p-2.5 text-[11px] font-medium" style={{ borderColor: hairline, background: surface }}>
                  <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: PLUM }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
              How the day goes
            </p>
            <ol className="mt-2 flex flex-col gap-1.5">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-2.5 text-[12px] font-medium">
                  <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: PLUM }}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Inquiry */}
          <div ref={inquireRef} className="scroll-mt-2 rounded-2xl border p-4" style={{ borderColor: hairline, background: surface }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
              Inquire
            </p>
            <p className="mt-1 text-[16px] font-bold">Check your date</p>
            {sent ? (
              <div className="mt-2.5 flex flex-col gap-2">
                <p role="status" className="text-[13px] font-semibold">
                  Thanks, {name.trim()} — inquiry drafted for {date.trim()} ({guests} guests).
                </p>
                <p className="text-[12px]" style={{ color: muted }}>
                  The live site posts this to the bookings API; the team confirms availability within a day.
                </p>
                <button
                  type="button"
                  onClick={() => { setSent(false); setName(''); setDate('') }}
                  className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-full border text-[12px] font-semibold"
                  style={{ borderColor: hairline, color: ink }}
                >
                  Draft another inquiry
                </button>
              </div>
            ) : (
              <div className="mt-2.5 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold" style={{ color: muted }}>Name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="h-11 w-full rounded-xl border px-3 text-[13px] outline-none"
                      style={inputStyle}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold" style={{ color: muted }}>Event date</span>
                    <input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Sat, Sep 27"
                      className="h-11 w-full rounded-xl border px-3 text-[13px] outline-none"
                      style={inputStyle}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1 block text-[11px] font-semibold" style={{ color: muted }}>Guest count</span>
                  <div className="flex gap-1.5" role="group" aria-label="Guest count">
                    {['50', '70', '100', '150'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGuests(g)}
                        aria-pressed={guests === g}
                        className="min-h-[44px] flex-1 cursor-pointer rounded-full border text-[12px] font-semibold"
                        style={guests === g ? { background: PLUM, borderColor: PLUM, color: '#fff' } : { borderColor: hairline, color: ink }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </label>
                {formError && (
                  <p role="alert" className="text-[12px] font-semibold text-[#B3261E]">
                    {formError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={submit}
                  className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold text-white"
                  style={{ background: PLUM }}
                >
                  Send inquiry →
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="pb-1 text-center text-[11px]" style={{ color: muted }}>
            Metro Manila, Philippines · © 2026 Inea Scents (preview)
          </p>
        </div>

        {toast && (
          <p className="sr-only" aria-live="polite">
            {toast}
          </p>
        )}
      </div>
    </BrowserFrame>
  )
}
