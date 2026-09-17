import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { BrowserFrame } from './frames'

gsap.registerPlugin(useGSAP)

/**
 * Inea Scents admin — faithful interactive preview of the real Laravel +
 * Inertia (Vue 3) dashboard, rebuilt from the repo's own routes and layout:
 * sidebar Dashboard / Bookings / Inquiries / Calendar / Packages / Customers /
 * Payments (+ disabled Settings) with a bookings ledger, package grid, and
 * dashboard metrics.
 *
 * Content is illustrative sample data (badged as such); flows, IA, and
 * branding (plum #6A4053, cream #FDF4F5, Figtree) mirror the real admin.
 */

const PLUM = '#6A4053'
const PLUM_DARK = '#4B2738'
const CREAM = '#FDF4F5'
const MUTED = '#99868C'

type Tab = 'dashboard' | 'bookings' | 'packages'
type Period = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'

interface Booking {
  id: string
  name: string
  pkg: string
  date: string
  status: 'Pending' | 'Confirmed' | 'Cancelled'
}

interface Pack {
  id: string
  name: string
  price: string
  pax: string
}

const INITIAL_BOOKINGS: Booking[] = [
  { id: 'IN-1042', name: 'Althea Ramos', pkg: 'Rose Bar · 70 pax', date: 'Sat, Sep 27', status: 'Pending' },
  { id: 'IN-1041', name: 'Miguel Torres', pkg: 'Citrus Bar · 50 pax', date: 'Fri, Sep 26', status: 'Confirmed' },
  { id: 'IN-1040', name: 'Bianca Lim', pkg: 'Musk Bar · 100 pax', date: 'Sun, Sep 21', status: 'Confirmed' },
  { id: 'IN-1039', name: 'Jose Cruz', pkg: 'Rose Bar · 50 pax', date: 'Sat, Sep 20', status: 'Cancelled' },
]

const PACKAGES: Pack[] = [
  { id: 'k1', name: 'Rose Bar', price: 'Php 6,399', pax: '70 pax' },
  { id: 'k2', name: 'Citrus Bar', price: 'Php 4,499', pax: '50 pax' },
  { id: 'k3', name: 'Musk Bar', price: 'Php 8,799', pax: '100 pax' },
]

const PERIOD_METRICS: Record<Period, { bookings: string; revenue: string; confirmed: string }> = {
  Daily: { bookings: '3', revenue: 'Php 18.2k', confirmed: '2 events' },
  Weekly: { bookings: '11', revenue: 'Php 74.6k', confirmed: '8 events' },
  Monthly: { bookings: '42', revenue: 'Php 289k', confirmed: '31 events' },
  Yearly: { bookings: '486', revenue: 'Php 3.4m', confirmed: '372 events' },
}

/** Every real sidebar entry; only the tracer tabs are wired, the rest say so. */
const NAV: { key: Tab | 'inquiries' | 'calendar' | 'customers' | 'payments' | 'settings'; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'inquiries', label: 'Inquiries' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'packages', label: 'Packages' },
  { key: 'customers', label: 'Customers' },
  { key: 'payments', label: 'Payments' },
  { key: 'settings', label: 'Settings' },
]

const VIEW_TITLES: Record<Tab, string> = {
  dashboard: 'Admin dashboard',
  bookings: 'Bookings ledger',
  packages: 'Packages',
}

function StatusChip({ status }: { status: Booking['status'] }) {
  const style =
    status === 'Confirmed'
      ? { background: PLUM, color: '#fff' }
      : status === 'Pending'
        ? { background: '#C4ACAC', color: PLUM_DARK }
        : { background: '#e5dedf', color: '#7a6a6e' }
  return (
    <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold" style={style}>
      {status}
    </span>
  )
}

export function IneaAdminEmu() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [period, setPeriod] = useState<Period>('Weekly')
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [removedIds, setRemovedIds] = useState<string[]>([])
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const frameRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const toastTimer = useRef<number | undefined>(undefined)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        screenRef.current,
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.32, ease: 'power2.out' },
      )
    },
    { dependencies: [tab], scope: frameRef },
  )

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    titleRef.current?.focus({ preventScroll: true })
  }, [tab])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const say = (message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }

  const goNav = (key: (typeof NAV)[number]['key']) => {
    if (key === 'dashboard' || key === 'bookings' || key === 'packages') {
      setTab(key)
      return
    }
    if (key === 'settings') {
      say('Settings is marked Coming soon in the full admin.')
      return
    }
    const label = NAV.find((n) => n.key === key)?.label ?? 'That section'
    say(`${label} lives in the full admin — this preview covers Dashboard, Bookings, Packages.`)
  }

  const approve = (id: string) => {
    setBookings((b) => b.map((row) => (row.id === id ? { ...row, status: 'Confirmed' } : row)))
    say(`Booking ${id} approved and confirmed.`)
  }

  const removePack = (id: string) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id)
      return
    }
    setRemovedIds((r) => [...r, id])
    setConfirmDeleteId(null)
    say('Package deleted in this preview (sample data).')
  }

  const visibleBookings = bookings.filter(
    (b) =>
      b.id.toLowerCase().includes(query.trim().toLowerCase()) ||
      b.name.toLowerCase().includes(query.trim().toLowerCase()),
  )
  const metrics = PERIOD_METRICS[period]
  const visiblePackages = PACKAGES.filter((p) => !removedIds.includes(p.id))
  const selected = bookings.find((b) => b.id === selectedId) ?? null

  return (
    <BrowserFrame label="Inea Scents admin dashboard interactive preview — sample content" url="inea-scents / admin" interactive>
      <div
        ref={frameRef}
        className="[font-family:Figtree,system-ui,sans-serif]"
        style={{ background: CREAM, color: PLUM_DARK }}
      >
        <p aria-live="polite" className="sr-only">
          {VIEW_TITLES[tab]}
          {toast ? `. ${toast}` : ''}
        </p>

        {/* Topbar */}
        <div className="flex items-center justify-between gap-2 border-b px-4 py-2.5" style={{ borderColor: '#ecdfe1', background: CREAM }}>
          <p className="text-[15px] font-bold tracking-wide">
            INEA <span className="font-normal italic">Scents</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: '#C4ACAC', color: PLUM_DARK }}>
              Sample data
            </span>
            <button
              type="button"
              onClick={() => say('The full admin polls notifications every 30 seconds.')}
              aria-label="Notifications, 3 unread in this preview"
              className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-[15px]"
              style={{ color: PLUM }}
            >
              <span aria-hidden="true">🔔</span>
              <span aria-hidden="true" className="-ml-2 -mt-4 rounded-full px-1 text-[9px] font-bold text-white" style={{ background: PLUM }}>
                3
              </span>
            </button>
          </div>
        </div>

        <div className="flex min-h-[430px] flex-col md:flex-row">
          {/* Sidebar */}
          <nav aria-label="Admin sections" className="flex gap-1.5 overflow-x-auto border-b p-2.5 md:w-36 md:shrink-0 md:flex-col md:border-b-0 md:border-r" style={{ borderColor: '#ecdfe1' }}>
            {NAV.map((item) => {
              const active = tab === item.key
              const disabled = item.key === 'settings'
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => goNav(item.key)}
                  aria-current={active ? 'page' : undefined}
                  className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center rounded-full px-3.5 text-[12px] font-semibold md:w-full"
                  style={
                    active
                      ? { background: PLUM, color: '#fff' }
                      : { background: 'transparent', color: disabled ? MUTED : PLUM_DARK }
                  }
                >
                  {item.label}
                  {disabled && (
                    <span className="ml-1.5 text-[9px] font-normal" style={{ color: MUTED }}>
                      soon
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Screen */}
          <div ref={screenRef} data-lenis-prevent className="flex min-h-[380px] min-w-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
            <h3 ref={titleRef} tabIndex={-1} className="sr-only">
              {VIEW_TITLES[tab]}
            </h3>

            {tab === 'dashboard' && (
              <>
                <p className="text-[17px] font-bold">Good afternoon, Admin</p>
                <div className="flex gap-1.5 overflow-x-auto pb-0.5" role="group" aria-label="Metrics period">
                  {(Object.keys(PERIOD_METRICS) as Period[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriod(p)}
                      aria-pressed={period === p}
                      className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center rounded-full border px-3 text-[11px] font-semibold"
                      style={
                        period === p
                          ? { background: PLUM, borderColor: PLUM, color: '#fff' }
                          : { borderColor: '#e0cfd3', color: PLUM_DARK }
                      }
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2" aria-live="polite">
                  {[
                    { label: 'Bookings', value: metrics.bookings },
                    { label: 'Revenue', value: metrics.revenue },
                    { label: 'Confirmed', value: metrics.confirmed },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl border bg-white p-2.5" style={{ borderColor: '#ecdfe1' }}>
                      <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
                        {m.label}
                      </p>
                      <p className="mt-0.5 text-[14px] font-bold">{m.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
                  Upcoming · needs a decision
                </p>
                {bookings.filter((b) => b.status === 'Pending').map((b) => (
                  <div key={b.id} className="flex items-center justify-between gap-2 rounded-xl border bg-white p-3" style={{ borderColor: '#ecdfe1' }}>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold">{b.name}</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>
                        {b.pkg} · {b.date}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => approve(b.id)}
                      className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center rounded-full px-4 text-[12px] font-semibold text-white"
                      style={{ background: PLUM }}
                    >
                      Approve
                    </button>
                  </div>
                ))}
                {bookings.every((b) => b.status !== 'Pending') && (
                  <p className="py-4 text-center text-[12px]" style={{ color: MUTED }}>
                    Queue clear — nothing awaiting review.
                  </p>
                )}
              </>
            )}

            {tab === 'bookings' && (
              <>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[17px] font-bold">Bookings</p>
                  <button
                    type="button"
                    onClick={() => say('The stepped booking form lives in the full admin.')}
                    className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-4 text-[12px] font-semibold text-white"
                    style={{ background: PLUM }}
                  >
                    + New Booking
                  </button>
                </div>
                <label className="flex h-11 items-center rounded-full border bg-white px-4" style={{ borderColor: '#e0cfd3' }}>
                  <span className="sr-only">Search by reference or name</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search reference or name…"
                    className="w-full bg-transparent text-[13px] outline-none"
                    style={{ color: PLUM_DARK }}
                  />
                </label>
                <p className="text-[11px]" style={{ color: MUTED }} aria-live="polite">
                  {visibleBookings.length} result{visibleBookings.length === 1 ? '' : 's'} (sample)
                </p>
                {visibleBookings.map((b) => (
                  <div key={b.id} className="rounded-xl border bg-white p-3" style={{ borderColor: '#ecdfe1' }}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12px] font-semibold">
                        {b.id} · {b.name}
                      </p>
                      <StatusChip status={b.status} />
                    </div>
                    <p className="mt-0.5 text-[11px]" style={{ color: MUTED }}>
                      {b.pkg} · {b.date}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedId(selectedId === b.id ? null : b.id)}
                        aria-expanded={selectedId === b.id}
                        className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-full border text-[12px] font-semibold"
                        style={{ borderColor: '#e0cfd3', color: PLUM }}
                      >
                        {selectedId === b.id ? 'Hide details' : 'View details'}
                      </button>
                      {b.status === 'Pending' && (
                        <button
                          type="button"
                          onClick={() => approve(b.id)}
                          className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-full text-[12px] font-semibold text-white"
                          style={{ background: PLUM }}
                        >
                          Approve
                        </button>
                      )}
                    </div>
                    {selectedId === b.id && selected && (
                      <dl className="mt-2 grid grid-cols-2 gap-1.5 rounded-lg p-2.5 text-[11px]" style={{ background: CREAM }}>
                        <div>
                          <dt style={{ color: MUTED }}>Reference</dt>
                          <dd className="font-semibold">{selected.id}</dd>
                        </div>
                        <div>
                          <dt style={{ color: MUTED }}>Status</dt>
                          <dd className="font-semibold">{selected.status}</dd>
                        </div>
                        <div>
                          <dt style={{ color: MUTED }}>Package</dt>
                          <dd className="font-semibold">{selected.pkg}</dd>
                        </div>
                        <div>
                          <dt style={{ color: MUTED }}>Event date</dt>
                          <dd className="font-semibold">{selected.date}</dd>
                        </div>
                      </dl>
                    )}
                  </div>
                ))}
                {visibleBookings.length === 0 && (
                  <p className="py-6 text-center text-[12px]" style={{ color: MUTED }}>
                    No bookings match “{query}”.
                  </p>
                )}
              </>
            )}

            {tab === 'packages' && (
              <>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[17px] font-bold">Active Packages</p>
                  <button
                    type="button"
                    onClick={() => say('The package builder lives in the full admin.')}
                    className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-4 text-[12px] font-semibold text-white"
                    style={{ background: PLUM }}
                  >
                    + Add Package
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2.5 min-[560px]:grid-cols-3">
                  {visiblePackages.map((p) => (
                    <div key={p.id} className="rounded-xl border bg-white p-3" style={{ borderColor: '#ecdfe1' }}>
                      <div className="flex h-16 items-center justify-center rounded-lg text-[11px] font-semibold" style={{ background: '#f3e7ea', color: PLUM }}>
                        Image placeholder
                      </div>
                      <p className="mt-2 text-[13px] font-bold">{p.name}</p>
                      <p className="text-[11px]" style={{ color: MUTED }}>
                        {p.price} · {p.pax}
                      </p>
                      <div className="mt-2 flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => say('The Modify form lives in the full admin.')}
                          className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-full border text-[11px] font-semibold"
                          style={{ borderColor: '#e0cfd3', color: PLUM }}
                        >
                          Modify
                        </button>
                        <button
                          type="button"
                          onClick={() => removePack(p.id)}
                          aria-label={confirmDeleteId === p.id ? `Confirm deletion of ${p.name}` : `Delete ${p.name}`}
                          className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border text-[13px]"
                          style={{ borderColor: '#e0cfd3', color: confirmDeleteId === p.id ? '#fff' : '#B3261E', background: confirmDeleteId === p.id ? '#B3261E' : 'transparent' }}
                        >
                          <span aria-hidden="true">{confirmDeleteId === p.id ? '✓' : '🗑'}</span>
                        </button>
                      </div>
                      {confirmDeleteId === p.id && (
                        <p role="alert" className="mt-1.5 text-center text-[11px] font-semibold" style={{ color: '#B3261E' }}>
                          Tap 🗑 again — deletion cannot be undone.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {visiblePackages.length === 0 && (
                  <p className="py-6 text-center text-[12px]" style={{ color: MUTED }}>
                    All sample packages removed — reset by reloading this preview.
                  </p>
                )}
              </>
            )}
          </div>
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
