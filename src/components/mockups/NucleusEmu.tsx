import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { PhoneFrame } from './frames'

gsap.registerPlugin(useGSAP)

/**
 * NUcleus Mobile — faithful interactive preview of the real student app
 * (Expo + React Navigation + Supabase), rebuilt from the repo's own routes:
 * Login (sign-in only) → bottom tabs Home / Papers / Browse / Profile,
 * plus a paper detail with workflow timeline, bookmark, and DOI request.
 *
 * Content is illustrative sample data (badged as such); flows, IA, and
 * branding (navy #1B3A8C, gold #CDA434, Inter) mirror the real app.
 */

const NAVY = '#1B3A8C'
const GOLD = '#CDA434'

interface Paper {
  id: string
  title: string
  category: string
  status: 'Published' | 'Under review' | 'Draft' | 'Revision requested'
}

const PAPERS: Paper[] = [
  { id: 'p1', title: 'Solar-Powered Drip Irrigation for Cavite Farms', category: 'Engineering', status: 'Under review' },
  { id: 'p2', title: 'Mangrove Restoration Along Bacoor Bay', category: 'Environmental Science', status: 'Published' },
  { id: 'p3', title: 'QR-Based Attendance for Large Lecture Halls', category: 'Information Technology', status: 'Draft' },
  { id: 'p4', title: 'Waste Segregation Compliance in San Agustin', category: 'Social Science', status: 'Revision requested' },
]

const CATEGORIES = ['All', 'Engineering', 'Environmental Science', 'Information Technology', 'Social Science']

type Tab = 'home' | 'papers' | 'browse' | 'profile'
type View = { name: 'login' } | { name: 'tab'; tab: Tab } | { name: 'detail'; paperId: string }

const VIEW_TITLES: Record<string, string> = {
  login: 'Sign in',
  home: 'Home dashboard',
  papers: 'My papers',
  browse: 'Browse repository',
  profile: 'Profile and settings',
  detail: 'Paper detail',
}

function viewKey(view: View): string {
  return view.name === 'tab' ? view.tab : view.name
}

/* ---------- tiny tab icons (stroke) ---------- */

function TabIcon({ name }: { name: 'home' | 'papers' | 'browse' | 'profile' }) {
  const paths: Record<string, string> = {
    home: 'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z',
    papers: 'M4 5h16v14H4z M4 9h16 M9 13h6',
    browse: 'M11 5a6 6 0 1 0 4.2 10.3L20 20l-1.4 1.4-4.8-4.8A6 6 0 0 0 11 5zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
    profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0v1H5v-1z',
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

/* ---------- shared bits ---------- */

function StatusPill({ status }: { status: Paper['status'] }) {
  const style =
    status === 'Published'
      ? { background: NAVY, color: '#fff' }
      : status === 'Under review'
        ? { background: GOLD, color: '#1a1405' }
        : status === 'Revision requested'
          ? { background: '#B3261E', color: '#fff' }
          : { background: '#6b7280', color: '#fff' }
  return (
    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={style}>
      {status}
    </span>
  )
}

function PaperCard({ paper, onOpen, dark }: { paper: Paper; onOpen: () => void; dark: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`w-full rounded-xl border p-3 text-left ${dark ? 'border-white/10 bg-[#131c33]' : 'border-[#dbe2ef] bg-white'}`}
    >
      <p className={`text-[12px] font-semibold leading-snug ${dark ? 'text-[#EDF1F7]' : 'text-[#101828]'}`}>{paper.title}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <p className={`text-[10px] ${dark ? 'text-[#9AA6C0]' : 'text-[#5b6478]'}`}>{paper.category}</p>
        <StatusPill status={paper.status} />
      </div>
    </button>
  )
}

function Field({
  label,
  value,
  onChange,
  secret = false,
  dark,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  secret?: boolean
  dark: boolean
}) {
  return (
    <label className="block">
      <span className={`mb-1 block text-[11px] font-semibold ${dark ? 'text-[#9AA6C0]' : 'text-[#5b6478]'}`}>{label}</span>
      <input
        type={secret ? 'password' : 'email'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={secret ? '••••••••' : 'you@nu-dasma.edu.ph'}
        className={`h-11 w-full rounded-lg border px-3 text-[13px] outline-none focus:border-[#1B3A8C] ${
          dark ? 'border-white/15 bg-[#0A1226] text-[#EDF1F7] placeholder:text-[#5b6880]' : 'border-[#c9d3e6] bg-white text-[#101828]'
        }`}
      />
    </label>
  )
}

/* ---------- emulator ---------- */

export function NucleusEmu() {
  const [view, setView] = useState<View>({ name: 'login' })
  const [dark, setDark] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [signingIn, setSigningIn] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [segment, setSegment] = useState<'All' | 'Active' | 'Published' | 'Action'>('All')
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [doiDone, setDoiDone] = useState(false)
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
    setSigningIn(true)
    window.setTimeout(() => {
      setSigningIn(false)
      setView({ name: 'tab', tab: 'home' })
    }, 900)
  }

  const matchQuery = (p: Paper) =>
    (category === 'All' || p.category === category) &&
    p.title.toLowerCase().includes(query.trim().toLowerCase())

  const matchSegment = (p: Paper) =>
    segment === 'All' ||
    (segment === 'Published' && p.status === 'Published') ||
    (segment === 'Active' && (p.status === 'Under review' || p.status === 'Draft')) ||
    (segment === 'Action' && p.status === 'Revision requested')

  const detailPaper = view.name === 'detail' ? PAPERS.find((p) => p.id === view.paperId) : undefined
  const related = detailPaper ? PAPERS.filter((p) => p.id !== detailPaper.id).slice(0, 3) : []

  const ink = dark ? 'text-[#EDF1F7]' : 'text-[#101828]'
  const muted = dark ? 'text-[#9AA6C0]' : 'text-[#5b6478]'
  const card = dark ? 'border-white/10 bg-[#131c33]' : 'border-[#dbe2ef] bg-white'

  const goTab = (tab: Tab) => setView({ name: 'tab', tab })

  return (
    <PhoneFrame label="NUcleus research app interactive preview — sample content" interactive>
      <div
        ref={frameRef}
        className={`flex h-[500px] flex-col [font-family:Inter,system-ui,sans-serif] sm:h-[540px] ${dark ? 'bg-[#0A1226]' : 'bg-[#F1F4FA]'}`}
      >
        <p aria-live="polite" className="sr-only">
          {VIEW_TITLES[key]}
          {toast ? `. ${toast}` : ''}
        </p>

        {/* App bar */}
        <div className={`flex items-center justify-between px-4 pb-2 pt-9 ${dark ? 'bg-[#0A1226]' : 'bg-[#F1F4FA]'}`}>
          <p className="text-[17px] font-bold tracking-tight" style={{ color: dark ? '#EDF1F7' : NAVY }}>
            NUcleus
          </p>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: GOLD, color: '#1a1405' }}>
            Sample data
          </span>
        </div>

        {/* Screen */}
        <div ref={screenRef} data-lenis-prevent className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-4 pb-3">
          <h3 ref={titleRef} tabIndex={-1} className="sr-only">
            {VIEW_TITLES[key]}
          </h3>

          {view.name === 'login' && (
            <div className="flex flex-1 flex-col justify-center gap-3 py-6">
              <p className={`text-[22px] font-bold leading-tight ${ink}`}>Research, in your pocket</p>
              <p className={`text-[12px] leading-relaxed ${muted}`}>National University – Dasmariñas. Sample preview — any email and password signs in.</p>
              <Field label="Email" value={email} onChange={setEmail} dark={dark} />
              <Field label="Password" value={password} onChange={setPassword} secret dark={dark} />
              {loginError && (
                <p role="alert" className="text-[12px] font-semibold text-[#B3261E]">
                  {loginError}
                </p>
              )}
              <button
                type="button"
                onClick={signIn}
                disabled={signingIn}
                className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-full text-[14px] font-semibold text-white disabled:opacity-70"
                style={{ background: NAVY }}
              >
                {signingIn ? 'Signing in…' : 'Sign in'}
              </button>
              <button
                type="button"
                onClick={() => say('Password reset uses a one-time code in the full app.')}
                className={`min-h-[44px] text-[12px] font-semibold ${muted}`}
              >
                Forgot password?
              </button>
            </div>
          )}

          {view.name === 'tab' && view.tab === 'home' && (
            <>
              <p className={`text-[19px] font-bold ${ink}`}>Welcome back</p>
              <div className="rounded-xl p-3 text-white" style={{ background: NAVY }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Up next</p>
                <p className="mt-1 text-[13px] font-semibold leading-snug">Revision requested on your submission</p>
                <button
                  type="button"
                  onClick={() => setView({ name: 'detail', paperId: 'p4' })}
                  className="mt-2 inline-flex min-h-[44px] items-center rounded-full px-4 text-[12px] font-semibold"
                  style={{ background: GOLD, color: '#1a1405' }}
                >
                  Open paper →
                </button>
              </div>
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${muted}`}>Recent activity</p>
              {[
                { title: 'Your paper was assigned a reviewer', sub: '2h ago' },
                { title: 'Co-author invite accepted', sub: 'Yesterday' },
              ].map((n) => (
                <button
                  key={n.title}
                  type="button"
                  onClick={() => setView({ name: 'detail', paperId: 'p1' })}
                  className={`w-full rounded-xl border p-3 text-left ${card}`}
                >
                  <p className={`text-[12px] font-semibold ${ink}`}>{n.title}</p>
                  <p className={`mt-0.5 text-[10px] ${muted}`}>{n.sub} — tap to view paper</p>
                </button>
              ))}
            </>
          )}

          {view.name === 'tab' && view.tab === 'papers' && (
            <>
              <div className="flex items-center justify-between">
                <p className={`text-[19px] font-bold ${ink}`}>My Papers</p>
                <button
                  type="button"
                  onClick={() => say('The stepped submission form lives in the full app.')}
                  className="inline-flex min-h-[44px] items-center rounded-full px-4 text-[12px] font-semibold text-white"
                  style={{ background: NAVY }}
                >
                  + Submit
                </button>
              </div>
              <div className={`flex rounded-full p-1 ${dark ? 'bg-[#131c33]' : 'bg-[#e2e8f2]'}`} role="group" aria-label="Filter papers">
                {(['All', 'Active', 'Published', 'Action'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSegment(s)}
                    aria-pressed={segment === s}
                    className={`min-h-[36px] flex-1 rounded-full text-[11px] font-semibold ${
                      segment === s ? 'text-white' : muted
                    }`}
                    style={segment === s ? { background: NAVY } : undefined}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {PAPERS.filter(matchSegment).map((p) => (
                <PaperCard key={p.id} paper={p} dark={dark} onOpen={() => setView({ name: 'detail', paperId: p.id })} />
              ))}
              {PAPERS.filter(matchSegment).length === 0 && (
                <p className={`py-6 text-center text-[12px] ${muted}`}>No papers in this view.</p>
              )}
            </>
          )}

          {view.name === 'tab' && view.tab === 'browse' && (
            <>
              <p className={`text-[19px] font-bold ${ink}`}>Browse</p>
              <label className={`flex h-11 items-center gap-2 rounded-full border px-4 ${dark ? 'border-white/15 bg-[#131c33]' : 'border-[#c9d3e6] bg-white'}`}>
                <span aria-hidden="true" className={muted}>
                  <TabIcon name="browse" />
                </span>
                <span className="sr-only">Search published papers</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles…"
                  className={`w-full bg-transparent text-[13px] outline-none ${ink}`}
                />
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Filter by field">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`min-h-[36px] shrink-0 rounded-full border px-3 text-[11px] font-semibold ${
                      category === c ? 'border-transparent text-white' : `${muted} ${dark ? 'border-white/15' : 'border-[#c9d3e6]'}`
                    }`}
                    style={category === c ? { background: NAVY } : undefined}
                  >
                    {c === 'All' ? 'All fields' : c}
                  </button>
                ))}
              </div>
              <p className={`text-[11px] ${muted}`} aria-live="polite">
                {PAPERS.filter(matchQuery).length} result{PAPERS.filter(matchQuery).length === 1 ? '' : 's'} (sample)
              </p>
              {PAPERS.filter(matchQuery).map((p) => (
                <PaperCard key={p.id} paper={p} dark={dark} onOpen={() => setView({ name: 'detail', paperId: p.id })} />
              ))}
            </>
          )}

          {view.name === 'tab' && view.tab === 'profile' && (
            <>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full text-[15px] font-bold text-white"
                  style={{ background: NAVY }}
                >
                  SS
                </span>
                <div>
                  <p className={`text-[15px] font-bold ${ink}`}>Sample Student</p>
                  <p className={`text-[11px] ${muted}`}>BS Information Technology</p>
                </div>
              </div>
              {[
                { label: 'Recovery email', sub: 'sample@nu-dasma.edu.ph' },
                { label: 'Password', sub: 'Changed 2 months ago (sample)' },
              ].map((row) => (
                <div key={row.label} className={`rounded-xl border p-3 ${card}`}>
                  <p className={`text-[12px] font-semibold ${ink}`}>{row.label}</p>
                  <p className={`mt-0.5 text-[11px] ${muted}`}>{row.sub}</p>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDark((d) => !d)}
                aria-pressed={dark}
                className={`flex min-h-[44px] w-full items-center justify-between rounded-xl border p-3 ${card}`}
              >
                <span className={`text-[12px] font-semibold ${ink}`}>Dark mode</span>
                <span
                  aria-hidden="true"
                  className="flex h-6 w-11 items-center rounded-full px-0.5"
                  style={{ background: dark ? NAVY : '#c9d3e6', justifyContent: dark ? 'flex-end' : 'flex-start' }}
                >
                  <span className="size-5 rounded-full bg-white" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('')
                  setPassword('')
                  setView({ name: 'login' })
                }}
                className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-full border border-[#B3261E] text-[13px] font-semibold text-[#B3261E]"
              >
                Sign out
              </button>
            </>
          )}

          {view.name === 'detail' && detailPaper && (
            <>
              <button
                type="button"
                onClick={() => goTab('browse')}
                className={`inline-flex min-h-[44px] items-center self-start text-[12px] font-semibold ${muted}`}
              >
                ← Back to Browse
              </button>
              <div className="flex gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${dark ? 'bg-[#131c33] text-[#9AA6C0]' : 'bg-[#e2e8f2] text-[#3d4761]'}`}>
                  {detailPaper.category}
                </span>
                <StatusPill status={detailPaper.status} />
              </div>
              <p className={`text-[16px] font-bold leading-snug ${ink}`}>{detailPaper.title}</p>
              <div className={`rounded-xl border p-3 ${card}`}>
                <p className={`text-[11px] font-semibold uppercase tracking-wider ${muted}`}>Review progress</p>
                <ol className="mt-2 flex flex-col gap-2">
                  {['Submitted', 'Under faculty review', 'Decision'].map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: i < 2 ? NAVY : dark ? '#33405e' : '#c9d3e6', color: i < 2 ? '#fff' : dark ? '#9AA6C0' : '#5b6478' }}
                      >
                        {i < 2 ? '✓' : '·'}
                      </span>
                      <span className={`text-[12px] ${i === 1 ? `font-semibold ${ink}` : muted}`}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setBookmarks((b) => (b.includes(detailPaper.id) ? b.filter((id) => id !== detailPaper.id) : [...b, detailPaper.id]))
                    say(bookmarks.includes(detailPaper.id) ? 'Removed from your library.' : 'Saved to your library.')
                  }}
                  aria-pressed={bookmarks.includes(detailPaper.id)}
                  className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-full border text-[12px] font-semibold"
                  style={
                    bookmarks.includes(detailPaper.id)
                      ? { background: NAVY, borderColor: NAVY, color: '#fff' }
                      : { borderColor: dark ? 'rgba(255,255,255,0.2)' : '#c9d3e6', color: dark ? '#EDF1F7' : NAVY }
                  }
                >
                  {bookmarks.includes(detailPaper.id) ? '★ Saved' : '☆ Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDoiDone(true)
                    say('DOI request drafted. The full app submits it for approval.')
                  }}
                  className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: doiDone ? '#6b7280' : NAVY }}
                >
                  {doiDone ? 'DOI drafted ✓' : 'Request DOI'}
                </button>
              </div>
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${muted}`}>Related (sample)</p>
              {related.map((p) => (
                <PaperCard key={p.id} paper={p} dark={dark} onOpen={() => setView({ name: 'detail', paperId: p.id })} />
              ))}
            </>
          )}
        </div>

        {/* Bottom tabs */}
        {view.name !== 'login' && (
          <nav aria-label="NUcleus sections" className={`flex border-t px-1 pb-4 pt-1 ${dark ? 'border-white/10 bg-[#0A1226]' : 'border-[#dbe2ef] bg-white'}`}>
            {(['home', 'papers', 'browse', 'profile'] as const).map((t) => {
              const activeTab = view.name === 'tab' && view.tab === t
              const label = t === 'home' ? 'Home' : t === 'papers' ? 'Papers' : t === 'browse' ? 'Browse' : 'Profile'
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => goTab(t)}
                  aria-current={activeTab ? 'page' : undefined}
                  className="flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5"
                  style={{ color: activeTab ? NAVY : dark ? '#7d8aa5' : '#8a94a8' }}
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
