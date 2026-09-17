import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { PhoneFrame } from './frames'

gsap.registerPlugin(useGSAP)

/**
 * Inea Scents customer app — faithful interactive preview of the real Flutter
 * client, rebuilt from the repo's own router and booking API: splash/login →
 * shell tabs Home / Packages / Bookings / Profile, package detail, and the
 * multi-step booking flow (date + pax → scent picks → details → reference).
 *
 * Content is illustrative sample data (badged as such); flows, IA, prices,
 * scent names, and branding (plum #6A4053, cream #FDF4F5, Figtree) mirror the
 * real repos. Scent names come from the admin seeder; tiers from the landing.
 */

const PLUM = '#6A4053'
const PLUM_DARK = '#4B2738'
const CREAM = '#FDF4F5'
const MUTED = '#99868C'

interface Tier {
  pax: number
  price: string
}

interface Pack {
  id: string
  name: string
  blurb: string
  tiers: Tier[]
}

const PACKAGES: Pack[] = [
  {
    id: 'k1',
    name: 'Essential 10ml Perfume Bar',
    blurb: 'Styled bar, 10ml logo bottle per guest, 3–4h service with 2 staff.',
    tiers: [
      { pax: 50, price: 'Php 4,499' },
      { pax: 70, price: 'Php 6,399' },
      { pax: 100, price: 'Php 8,799' },
      { pax: 150, price: 'Php 13,119' },
    ],
  },
  {
    id: 'k2',
    name: 'Celebrant Gift Bundle',
    blurb: 'Perfume bar plus a wrapped gift set for the celebrant.',
    tiers: [
      { pax: 50, price: 'Php 5,499' },
      { pax: 70, price: 'Php 7,399' },
      { pax: 100, price: 'Php 9,999' },
    ],
  },
  {
    id: 'k3',
    name: 'Mirror + Bar Duo',
    blurb: 'Perfume bar with the selfie-mirror freebie, dressed for photos.',
    tiers: [
      { pax: 50, price: 'Php 5,999' },
      { pax: 70, price: 'Php 7,999' },
      { pax: 100, price: 'Php 10,799' },
    ],
  },
]

const SCENTS = [
  { name: 'Citrus Burst', note: 'Orange, lemon, grapefruit' },
  { name: 'Lavender Dream', note: 'Calming floral lavender' },
  { name: 'Ocean Breeze', note: 'Crisp marine notes' },
  { name: 'Vanilla Bean', note: 'Sweet, warm vanilla' },
]

const DATES = ['Sat, Sep 27', 'Sun, Sep 28', 'Sat, Oct 4']

type Tab = 'home' | 'packages' | 'bookings' | 'profile'
type View =
  | { name: 'splash' }
  | { name: 'login' }
  | { name: 'tab'; tab: Tab }
  | { name: 'detail'; packId: string }
  | { name: 'booking'; packId: string; step: 1 | 2 | 3 }
  | { name: 'confirmed'; reference: string }

const VIEW_TITLES: Record<string, string> = {
  splash: 'Splash',
  login: 'Sign in',
  home: 'Home',
  packages: 'Packages',
  bookings: 'My bookings',
  profile: 'Profile',
  detail: 'Package details',
  booking: 'New booking',
  confirmed: 'Booking confirmed',
}

function viewKey(view: View): string {
  if (view.name === 'tab') return view.tab
  if (view.name === 'booking') return `booking-${view.step}`
  return view.name
}

function TabIcon({ name }: { name: Tab }) {
  const paths: Record<string, string> = {
    home: 'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z',
    packages: 'M4 7l8-4 8 4v10l-8 4-8-4V7zm8 4L4 7m8 4l8-4m-8 4v10',
    bookings: 'M5 6h14v13H5z M5 10h14 M9 3v4 M15 3v4',
    profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0v1H5v-1z',
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

function PillButton({
  children,
  onClick,
  variant = 'primary',
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'outline'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold"
      style={
        variant === 'primary'
          ? { background: PLUM, color: '#fff' }
          : { border: `1px solid #e0cfd3`, color: PLUM, background: 'transparent' }
      }
    >
      {children}
    </button>
  )
}

export function IneaAppEmu() {
  const [view, setView] = useState<View>({ name: 'splash' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [date, setDate] = useState(DATES[0])
  const [tierIdx, setTierIdx] = useState(1)
  const [scentPicks, setScentPicks] = useState<string[]>(['Citrus Burst'])
  const [booked, setBooked] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const frameRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const toastTimer = useRef<number | undefined>(undefined)

  const key = viewKey(view)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        screenRef.current,
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.32, ease: 'power2.out' },
      )
    },
    { dependencies: [key], scope: frameRef },
  )

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    titleRef.current?.focus({ preventScroll: true })
  }, [key])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const say = (message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }

  const signIn = () => {
    if (!email.trim() || !password) {
      setLoginError('Enter your email and password.')
      return
    }
    setLoginError(null)
    setView({ name: 'tab', tab: 'home' })
  }

  const toggleScent = (name: string) =>
    setScentPicks((picks) => (picks.includes(name) ? picks.filter((s) => s !== name) : [...picks, name]))

  const packFor = (id: string) => PACKAGES.find((p) => p.id === id) ?? PACKAGES[0]
  const goTab = (tab: Tab) => setView({ name: 'tab', tab })

  const packageMatches = PACKAGES.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <PhoneFrame label="Inea Scents customer app interactive preview — sample content" interactive>
      <div
        ref={frameRef}
        className="flex h-[600px] flex-col [font-family:Figtree,system-ui,sans-serif]"
        style={{ background: CREAM, color: PLUM_DARK }}
      >
        <p aria-live="polite" className="sr-only">
          {VIEW_TITLES[key]}
          {toast ? `. ${toast}` : ''}
        </p>

        {/* Brand bar */}
        <div className="flex items-center justify-between px-4 pb-2 pt-9" style={{ background: CREAM }}>
          <p className="text-[16px] font-bold tracking-wide">
            INEA <span className="font-normal italic">Scents</span>
          </p>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: '#C4ACAC', color: PLUM_DARK }}>
            Sample data
          </span>
        </div>

        {/* Screen */}
        <div ref={screenRef} data-lenis-prevent className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4">
          <h3 ref={titleRef} tabIndex={-1} className="sr-only">
            {VIEW_TITLES[key]}
          </h3>

          {view.name === 'splash' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
              <p className="text-[26px] font-bold tracking-wide">
                INEA <span className="font-normal italic">Scents</span>
              </p>
              <p className="text-[12px]" style={{ color: MUTED }}>
                The perfume bar guests remember.
              </p>
              <div className="mt-2 w-full">
                <PillButton onClick={() => setView({ name: 'login' })}>Get started →</PillButton>
              </div>
            </div>
          )}

          {view.name === 'login' && (
            <div className="flex flex-1 flex-col justify-center gap-3 py-6">
              <p className="text-[22px] font-bold leading-tight">Welcome back</p>
              <p className="text-[12px] leading-relaxed" style={{ color: MUTED }}>
                Sign in to browse packages and track your event booking.
              </p>
              <label className="block">
                <span className="mb-1 block text-[11px] font-semibold" style={{ color: MUTED }}>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-2xl border bg-white px-3 text-[13px] outline-none"
                  style={{ borderColor: '#e0cfd3', color: PLUM_DARK }}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-semibold" style={{ color: MUTED }}>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-2xl border bg-white px-3 text-[13px] outline-none"
                  style={{ borderColor: '#e0cfd3', color: PLUM_DARK }}
                />
              </label>
              {loginError && (
                <p role="alert" className="text-[12px] font-semibold text-[#B3261E]">
                  {loginError}
                </p>
              )}
              <PillButton onClick={signIn}>Sign in</PillButton>
              <button
                type="button"
                onClick={() => say('Registration and password reset live in the full app.')}
                className="min-h-[44px] text-[12px] font-semibold"
                style={{ color: MUTED }}
              >
                New here? Create an account
              </button>
            </div>
          )}

          {view.name === 'tab' && view.tab === 'home' && (
            <>
              <p className="text-[19px] font-bold">Hello, Sample 👋</p>
              <div className="rounded-2xl p-4 text-white" style={{ background: PLUM }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Metro Manila · 10ml logo bottles</p>
                <p className="mt-1 text-[14px] font-semibold leading-snug">A styled perfume bar at your event, from Php 4,499.</p>
                <button
                  type="button"
                  onClick={() => goTab('packages')}
                  className="mt-3 inline-flex min-h-[44px] items-center rounded-full px-4 text-[12px] font-semibold"
                  style={{ background: CREAM, color: PLUM_DARK }}
                >
                  Browse packages →
                </button>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>
                Your upcoming event
              </p>
              <button
                type="button"
                onClick={() => goTab('bookings')}
                className="w-full rounded-2xl border bg-white p-3 text-left"
                style={{ borderColor: '#ecdfe1' }}
              >
                <p className="text-[13px] font-semibold">Essential 10ml Perfume Bar · 70 pax</p>
                <p className="mt-0.5 text-[11px]" style={{ color: MUTED }}>
                  Sat, Sep 27 · Confirmed — tap for bookings
                </p>
              </button>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>
                How the day goes
              </p>
              {['We style the bar at your venue', 'Guests explore 4 scents with our team', 'Everyone takes home your logo bottle'].map((step, i) => (
                <div key={step} className="flex items-center gap-2.5 rounded-2xl border bg-white p-3" style={{ borderColor: '#ecdfe1' }}>
                  <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: PLUM }}>
                    {i + 1}
                  </span>
                  <p className="text-[12px] font-medium">{step}</p>
                </div>
              ))}
            </>
          )}

          {view.name === 'tab' && view.tab === 'packages' && (
            <>
              <p className="text-[19px] font-bold">Packages</p>
              <label className="flex h-11 items-center rounded-full border bg-white px-4" style={{ borderColor: '#e0cfd3' }}>
                <span className="sr-only">Search packages</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search packages…"
                  className="w-full bg-transparent text-[13px] outline-none"
                  style={{ color: PLUM_DARK }}
                />
              </label>
              {packageMatches.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setView({ name: 'detail', packId: p.id })}
                  className="w-full rounded-2xl border bg-white p-3 text-left"
                  style={{ borderColor: '#ecdfe1' }}
                >
                  <div className="flex h-20 items-center justify-center rounded-xl text-[11px] font-semibold" style={{ background: '#f3e7ea', color: PLUM }}>
                    Gallery placeholder
                  </div>
                  <p className="mt-2 text-[13px] font-bold">{p.name}</p>
                  <p className="mt-0.5 text-[11px]" style={{ color: MUTED }}>
                    From {p.tiers[0].price} · up to {p.tiers[p.tiers.length - 1].pax} pax — tap for details
                  </p>
                </button>
              ))}
              {packageMatches.length === 0 && (
                <p className="py-6 text-center text-[12px]" style={{ color: MUTED }}>
                  No packages match “{query}”.
                </p>
              )}
            </>
          )}

          {view.name === 'detail' && (
            <>
              <button
                type="button"
                onClick={() => goTab('packages')}
                className="inline-flex min-h-[44px] items-center self-start text-[12px] font-semibold"
                style={{ color: MUTED }}
              >
                ← Back to Packages
              </button>
              <div className="flex h-28 items-center justify-center rounded-2xl text-[12px] font-semibold" style={{ background: '#f3e7ea', color: PLUM }}>
                Gallery placeholder
              </div>
              <p className="text-[16px] font-bold leading-snug">{packFor(view.packId).name}</p>
              <p className="text-[12px]" style={{ color: MUTED }}>{packFor(view.packId).blurb}</p>
              <div className="rounded-2xl border bg-white p-3" style={{ borderColor: '#ecdfe1' }}>
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Guest tiers</p>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {packFor(view.packId).tiers.map((t) => (
                    <li key={t.pax} className="flex justify-between text-[12px]">
                      <span>{t.pax} pax</span>
                      <span className="font-semibold">{t.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <PillButton onClick={() => { setTierIdx(1); setView({ name: 'booking', packId: view.packId, step: 1 }) }}>
                Book this package →
              </PillButton>
            </>
          )}

          {view.name === 'booking' && view.step === 1 && (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Step 1 of 3 · Date & guests</p>
              <p className="text-[17px] font-bold">{packFor(view.packId).name}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Event date</p>
              <div className="flex gap-1.5" role="group" aria-label="Pick an event date">
                {DATES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDate(d)}
                    aria-pressed={date === d}
                    className="min-h-[44px] flex-1 cursor-pointer rounded-full border text-[11px] font-semibold"
                    style={date === d ? { background: PLUM, borderColor: PLUM, color: '#fff' } : { borderColor: '#e0cfd3', color: PLUM_DARK }}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Guest count</p>
              <div className="flex gap-1.5" role="group" aria-label="Pick a guest tier">
                {packFor(view.packId).tiers.map((t, i) => (
                  <button
                    key={t.pax}
                    type="button"
                    onClick={() => setTierIdx(i)}
                    aria-pressed={tierIdx === i}
                    className="min-h-[44px] flex-1 cursor-pointer rounded-full border text-[11px] font-semibold"
                    style={tierIdx === i ? { background: PLUM, borderColor: PLUM, color: '#fff' } : { borderColor: '#e0cfd3', color: PLUM_DARK }}
                  >
                    {t.pax} · {t.price}
                  </button>
                ))}
              </div>
              <div className="mt-auto">
                <PillButton onClick={() => setView({ name: 'booking', packId: view.packId, step: 2 })}>Continue →</PillButton>
              </div>
            </>
          )}

          {view.name === 'booking' && view.step === 2 && (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Step 2 of 3 · Pick your scents</p>
              <p className="text-[17px] font-bold">4 scents, on the bar</p>
              <p className="text-[12px]" style={{ color: MUTED }} aria-live="polite">
                {scentPicks.length} selected — guests explore these with our team.
              </p>
              {SCENTS.map((s) => {
                const picked = scentPicks.includes(s.name)
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => toggleScent(s.name)}
                    aria-pressed={picked}
                    className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-2xl border bg-white p-3 text-left"
                    style={{ borderColor: picked ? PLUM : '#ecdfe1' }}
                  >
                    <span>
                      <span className="block text-[13px] font-semibold">{s.name}</span>
                      <span className="block text-[11px]" style={{ color: MUTED }}>{s.note}</span>
                    </span>
                    <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: picked ? PLUM : '#d9c6cb' }}>
                      {picked ? '✓' : '+'}
                    </span>
                  </button>
                )
              })}
              <div className="mt-auto flex gap-2">
                <PillButton variant="outline" onClick={() => setView({ name: 'booking', packId: view.packId, step: 1 })}>← Back</PillButton>
                <PillButton onClick={() => {
                  if (scentPicks.length === 0) { say('Pick at least one scent for the bar.'); return }
                  setView({ name: 'booking', packId: view.packId, step: 3 })
                }}>Continue →</PillButton>
              </div>
            </>
          )}

          {view.name === 'booking' && view.step === 3 && (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Step 3 of 3 · Your details</p>
              <p className="text-[17px] font-bold">Almost booked</p>
              <div className="rounded-2xl border bg-white p-3 text-[12px]" style={{ borderColor: '#ecdfe1' }}>
                <p className="font-semibold">{packFor(view.packId).name}</p>
                <p style={{ color: MUTED }}>
                  {date} · {packFor(view.packId).tiers[Math.min(tierIdx, packFor(view.packId).tiers.length - 1)].pax} pax ·{' '}
                  {packFor(view.packId).tiers[Math.min(tierIdx, packFor(view.packId).tiers.length - 1)].price}
                </p>
                <p style={{ color: MUTED }}>Scents: {scentPicks.join(', ') || '—'}</p>
              </div>
              <p className="text-[12px]" style={{ color: MUTED }}>
                The full app collects name, contact, venue, and payment here, then returns a booking reference.
              </p>
              <div className="mt-auto flex gap-2">
                <PillButton variant="outline" onClick={() => setView({ name: 'booking', packId: view.packId, step: 2 })}>← Back</PillButton>
                <PillButton onClick={() => { setBooked(true); setView({ name: 'confirmed', reference: 'IN-1043' }) }}>
                  Confirm booking
                </PillButton>
              </div>
            </>
          )}

          {view.name === 'confirmed' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
              <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full text-[22px] font-bold text-white" style={{ background: PLUM }}>✓</span>
              <p className="text-[19px] font-bold">Request received</p>
              <p className="text-[13px] font-semibold">Reference {view.reference} (sample)</p>
              <p className="max-w-[220px] text-[12px]" style={{ color: MUTED }}>
                The team confirms availability within a day — track it under Bookings.
              </p>
              <div className="mt-2 w-full">
                <PillButton onClick={() => goTab('bookings')}>View my bookings →</PillButton>
              </div>
            </div>
          )}

          {view.name === 'tab' && view.tab === 'bookings' && (
            <>
              <p className="text-[19px] font-bold">My Bookings</p>
              {[
                ...(booked ? [{ ref: 'IN-1043', pkg: `${packFor('k1').name} · ${date}`, status: 'Pending' }] : []),
                { ref: 'IN-1041', pkg: 'Essential 10ml Perfume Bar · Sat, Sep 27', status: 'Confirmed' },
                { ref: 'IN-1036', pkg: 'Essential 10ml Perfume Bar · Sat, Aug 16', status: 'Completed' },
              ].map((b) => (
                <div key={b.ref} className="rounded-2xl border bg-white p-3" style={{ borderColor: '#ecdfe1' }}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-bold">{b.ref}</p>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={b.status === 'Confirmed' ? { background: PLUM, color: '#fff' } : b.status === 'Pending' ? { background: '#C4ACAC', color: PLUM_DARK } : { background: '#e5dedf', color: '#7a6a6e' }}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px]" style={{ color: MUTED }}>{b.pkg}</p>
                </div>
              ))}
              <button
                type="button"
                onClick={() => say('Calendar availability lives in the full app.')}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border text-[12px] font-semibold"
                style={{ borderColor: '#e0cfd3', color: PLUM }}
              >
                Check calendar availability
              </button>
            </>
          )}

          {view.name === 'tab' && view.tab === 'profile' && (
            <>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full text-[15px] font-bold text-white" style={{ background: PLUM }}>
                  SS
                </span>
                <div>
                  <p className="text-[15px] font-bold">Sample Client</p>
                  <p className="text-[11px]" style={{ color: MUTED }}>sample@example.com</p>
                </div>
              </div>
              {['My bookings & wishlist', 'Notifications', 'Payment methods'].map((row) => (
                <button
                  key={row}
                  type="button"
                  onClick={() => say(`“${row}” lives in the full app.`)}
                  className="flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-2xl border bg-white p-3 text-left"
                  style={{ borderColor: '#ecdfe1' }}
                >
                  <span className="text-[12px] font-semibold">{row}</span>
                  <span aria-hidden="true" style={{ color: MUTED }}>→</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => { setEmail(''); setPassword(''); setBooked(false); setView({ name: 'login' }) }}
                className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-full border text-[13px] font-semibold"
                style={{ borderColor: '#B3261E', color: '#B3261E' }}
              >
                Sign out
              </button>
            </>
          )}
        </div>

        {/* Bottom tabs */}
        {(view.name === 'tab' || view.name === 'detail' || view.name === 'booking' || view.name === 'confirmed') && (
          <nav aria-label="Inea Scents sections" className="flex border-t bg-white px-1 pb-4 pt-1" style={{ borderColor: '#ecdfe1' }}>
            {(['home', 'packages', 'bookings', 'profile'] as const).map((t) => {
              const activeTab = (view.name === 'tab' && view.tab === t) ||
                (view.name === 'detail' && t === 'packages') ||
                ((view.name === 'booking' || view.name === 'confirmed') && t === 'bookings')
              const label = t === 'home' ? 'Home' : t === 'packages' ? 'Packages' : t === 'bookings' ? 'Bookings' : 'Profile'
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => goTab(t)}
                  aria-current={activeTab ? 'page' : undefined}
                  className="flex min-h-[52px] flex-1 cursor-pointer flex-col items-center justify-center gap-0.5"
                  style={{ color: activeTab ? PLUM : '#b39aa1' }}
                >
                  <TabIcon name={t} />
                  <span className="text-[10px] font-semibold">{label}</span>
                </button>
              )
            })}
          </nav>
        )}

        {toast && (
          <p className="sr-only" aria-live="polite">
            {toast}
          </p>
        )}
      </div>
    </PhoneFrame>
  )
}
