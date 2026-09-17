import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { PhoneFrame } from './frames'

gsap.registerPlugin(useGSAP)

/**
 * BudgeTrax — faithful interactive preview of the real Expo + expo-router app,
 * rebuilt from the repo's own tabs and ledger math: Cutoffs (pay-cutoff pills,
 * income card, allotment rows, To Spare total, running balance) and Bills
 * (Outstanding / Paid / Due This Week chips, bill cards with payoff progress).
 *
 * Content mirrors the repo's sample ledger (badged as such); flows, math, and
 * branding (near-black #0D0D14 glass, violet #7C6FFF, system type) mirror the
 * real app. To Spare = income − allotments; remaining = totalDue − payments.
 */

const BG = '#0D0D14'
const ACCENT = '#7C6FFF'
const SUCCESS = '#4ADE80'
const WARNING = '#FBBF24'
const DANGER = '#F87171'
const TO_SPARE = '#A78BFA'
const INK = '#F0F0F8'
const SECONDARY = 'rgba(240,240,248,0.55)'
const MUTED = 'rgba(240,240,248,0.3)'
const SURFACE = 'rgba(255,255,255,0.05)'
const HAIRLINE = 'rgba(255,255,255,0.08)'

interface Contribution {
  id: string
  source: string
  category: string
  amount: number
}

interface Allotment {
  id: string
  type: 'savings' | 'bill' | 'allowance'
  name: string
  amount: number
  billId?: string
}

interface Cutoff {
  id: string
  label: string
  salaryAmount: number
  contributions: Contribution[]
  allotments: Allotment[]
}

interface BillPayment {
  cutoffLabel: string
  amount: number
}

interface Bill {
  id: string
  name: string
  type: 'credit_card' | 'loan'
  totalDue: number
  dueDate: string
  payments: BillPayment[]
}

const CUTOFFS: Cutoff[] = [
  { id: 'may-8', label: 'May 8', salaryAmount: 10852, contributions: [], allotments: [] },
  {
    id: 'may-23',
    label: 'May 23',
    salaryAmount: 12959,
    contributions: [{ id: 'c1', source: 'Baby', category: 'Gas', amount: 1000 }],
    allotments: [
      { id: 'a1', type: 'savings', name: 'Savings', amount: 3000 },
      { id: 'a2', type: 'bill', name: 'Maya Black', amount: 4000, billId: 'maya-black' },
      { id: 'a3', type: 'bill', name: 'Maya Credit', amount: 2000, billId: 'maya-credit' },
      { id: 'a4', type: 'bill', name: 'Atome', amount: 1141, billId: 'atome' },
      { id: 'a5', type: 'allowance', name: 'Gas', amount: 1000 },
    ],
  },
  {
    id: 'jun-8',
    label: 'Jun 8',
    salaryAmount: 0,
    contributions: [],
    allotments: [{ id: 'a6', type: 'bill', name: 'Maya Credit', amount: 3000, billId: 'maya-credit' }],
  },
]

const BILLS: Bill[] = [
  {
    id: 'maya-black',
    name: 'Maya Black',
    type: 'credit_card',
    totalDue: 8226,
    dueDate: 'Jun 3',
    payments: [{ cutoffLabel: 'May 23', amount: 4000 }],
  },
  {
    id: 'maya-credit',
    name: 'Maya Credit',
    type: 'loan',
    totalDue: 7598,
    dueDate: 'Jun 26',
    payments: [
      { cutoffLabel: 'May 23', amount: 2000 },
      { cutoffLabel: 'Jun 8', amount: 3000 },
    ],
  },
  {
    id: 'atome',
    name: 'Atome',
    type: 'credit_card',
    totalDue: 2432,
    dueDate: 'Jul 3',
    payments: [{ cutoffLabel: 'May 23', amount: 1141 }],
  },
]

const peso = (n: number) => `₱${n.toLocaleString('en-PH')}`
const incomeOf = (c: Cutoff) =>
  c.salaryAmount + c.contributions.reduce((s, x) => s + x.amount, 0)
const toSpareOf = (c: Cutoff) =>
  incomeOf(c) - c.allotments.reduce((s, a) => s + a.amount, 0)
const cumulativeTo = (upToId: string) => {
  let total = 0
  for (const c of CUTOFFS) {
    total += toSpareOf(c)
    if (c.id === upToId) break
  }
  return total
}
const paidOf = (b: Bill) => b.payments.reduce((s, p) => s + p.amount, 0)
const remainingOf = (b: Bill) => b.totalDue - paidOf(b)

type Tab = 'cutoffs' | 'bills'
type View = { name: 'tab'; tab: Tab } | { name: 'bill'; billId: string }

const VIEW_TITLES: Record<string, string> = {
  cutoffs: 'Pay cutoffs',
  bills: 'Bills and loans',
  bill: 'Bill detail',
}

function viewKey(view: View): string {
  return view.name === 'tab' ? view.tab : view.name
}

function TabIcon({ name }: { name: Tab }) {
  const paths: Record<string, string> = {
    cutoffs: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm16 4h-4a1 1 0 0 0 0 2h4v-2z',
    bills: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3zm3 5h6M9 11h6',
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border p-3.5" style={{ background: SURFACE, borderColor: HAIRLINE }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: SECONDARY }}>
      {children}
    </p>
  )
}

export function BudgeTraxEmu() {
  const [view, setView] = useState<View>({ name: 'tab', tab: 'cutoffs' })
  const [cutoffId, setCutoffId] = useState(CUTOFFS[CUTOFFS.length - 1].id)
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
    { dependencies: [key, cutoffId], scope: frameRef },
  )

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    titleRef.current?.focus({ preventScroll: true })
  }, [key, cutoffId])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const say = (message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }

  const cutoff = CUTOFFS.find((c) => c.id === cutoffId) ?? CUTOFFS[0]
  const income = incomeOf(cutoff)
  const toSpare = toSpareOf(cutoff)
  const cumulative = cumulativeTo(cutoffId)

  const outstanding = BILLS.reduce((s, b) => s + remainingOf(b), 0)
  const paidTotal = BILLS.reduce((s, b) => s + paidOf(b), 0)
  const detailBill = view.name === 'bill' ? BILLS.find((b) => b.id === view.billId) : undefined

  const goTab = (tab: Tab) => setView({ name: 'tab', tab })

  return (
    <PhoneFrame label="BudgeTrax budgeting app interactive preview — sample content" interactive>
      <div
        ref={frameRef}
        className="flex h-[500px] flex-col [font-family:system-ui,sans-serif] sm:h-[540px]"
        style={{ background: BG, color: INK }}
      >
        <p aria-live="polite" className="sr-only">
          {VIEW_TITLES[key]}
          {toast ? `. ${toast}` : ''}
        </p>

        {/* Brand bar */}
        <div className="flex items-center justify-between px-4 pb-2 pt-9" style={{ background: BG }}>
          <p className="text-[16px] font-extrabold tracking-tight">BudgeTrax</p>
          <span className="flex items-center gap-1.5">
            <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'rgba(124,111,255,0.15)', color: ACCENT }}>
              WIP
            </span>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: SURFACE, color: SECONDARY }}>
              Sample data
            </span>
          </span>
        </div>

        {/* Screen */}
        <div ref={screenRef} data-lenis-prevent className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 pb-4">
          <h3 ref={titleRef} tabIndex={-1} className="sr-only">
            {VIEW_TITLES[key]}
          </h3>

          {view.name === 'tab' && view.tab === 'cutoffs' && (
            <>
              <div>
                <p className="text-[24px] font-extrabold tracking-tight">BudgeTrax</p>
                <p className="text-[12px]" style={{ color: SECONDARY }}>
                  Pay-cutoff budgeting · sample ledger
                </p>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-0.5" role="group" aria-label="Pick a pay cutoff">
                {CUTOFFS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCutoffId(c.id)}
                    aria-pressed={cutoffId === c.id}
                    className="min-h-[44px] shrink-0 cursor-pointer rounded-full border px-4 text-[13px] font-semibold"
                    style={
                      cutoffId === c.id
                        ? { background: 'rgba(124,111,255,0.15)', borderColor: ACCENT, color: ACCENT }
                        : { background: SURFACE, borderColor: HAIRLINE, color: MUTED }
                    }
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <GlassCard>
                <SectionLabel>Income · {cutoff.label}</SectionLabel>
                <div className="flex justify-between text-[12px]">
                  <span style={{ color: SECONDARY }}>Salary</span>
                  <span className="font-semibold">{peso(cutoff.salaryAmount)}</span>
                </div>
                {cutoff.contributions.map((c) => (
                  <div key={c.id} className="mt-1 flex justify-between text-[12px]">
                    <span style={{ color: SECONDARY }}>{c.source} · {c.category}</span>
                    <span className="font-semibold" style={{ color: '#34D399' }}>+{peso(c.amount)}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t pt-2 text-[13px]" style={{ borderColor: HAIRLINE }}>
                  <span className="font-semibold">Total in</span>
                  <span className="font-extrabold">{peso(income)}</span>
                </div>
              </GlassCard>

              <GlassCard>
                <SectionLabel>Allotments</SectionLabel>
                {cutoff.allotments.length > 0 ? (
                  <>
                    {cutoff.allotments.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => {
                          if (a.billId) setView({ name: 'bill', billId: a.billId })
                          else say(`“${a.name}” is tracked per cutoff in the full app.`)
                        }}
                        className="flex w-full cursor-pointer items-center justify-between py-2 text-left"
                      >
                        <span className="text-[13px] font-medium">
                          {a.name}
                          <span className="ml-1.5 text-[10px] uppercase" style={{ color: MUTED }}>
                            {a.type === 'bill' ? 'bill →' : a.type}
                          </span>
                        </span>
                        <span className="text-[13px] font-semibold">{peso(a.amount)}</span>
                      </button>
                    ))}
                    <div className="mt-1 flex items-center justify-between border-t pt-2.5" style={{ borderColor: HAIRLINE }}>
                      <span className="text-[14px] font-semibold" style={{ color: TO_SPARE }}>To Spare</span>
                      <span className="text-[20px] font-extrabold" style={{ color: toSpare < 0 ? DANGER : TO_SPARE }}>
                        {peso(toSpare)}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="py-2 text-center text-[12px]" style={{ color: MUTED }}>
                      {income === 0 ? 'No income received yet for this cutoff' : 'No allotments set for this cutoff'}
                    </p>
                    <div className="flex items-center justify-between border-t pt-2.5" style={{ borderColor: HAIRLINE }}>
                      <span className="text-[14px] font-semibold" style={{ color: TO_SPARE }}>To Spare</span>
                      <span className="text-[20px] font-extrabold" style={{ color: toSpare < 0 ? DANGER : TO_SPARE }}>
                        {peso(toSpare)}
                      </span>
                    </div>
                  </>
                )}
              </GlassCard>

              <GlassCard>
                <SectionLabel>Running balance</SectionLabel>
                {CUTOFFS.map((c) => {
                  const upto = c.id === cutoffId
                  return (
                    <div key={c.id} className="flex justify-between py-1 text-[12px]">
                      <span style={{ color: upto ? INK : SECONDARY, fontWeight: upto ? 700 : 400 }}>
                        {c.label}{upto ? ' · current' : ''}
                      </span>
                      <span className="font-semibold" style={{ color: cumulativeTo(c.id) < 0 ? DANGER : TO_SPARE }}>
                        {peso(cumulativeTo(c.id))}
                      </span>
                    </div>
                  )
                })}
                <p className="mt-1.5 text-[11px]" style={{ color: MUTED }} aria-live="polite">
                  {peso(cumulative)} carried through {cutoff.label} (sample).
                </p>
              </GlassCard>
            </>
          )}

          {view.name === 'tab' && view.tab === 'bills' && (
            <>
              <div>
                <p className="text-[24px] font-extrabold tracking-tight">Bills & Loans</p>
                <p className="text-[12px]" style={{ color: SECONDARY }}>
                  {BILLS.length} active obligations
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2" aria-live="polite">
                {[
                  { label: 'Outstanding', value: peso(outstanding), color: DANGER },
                  { label: 'Paid', value: peso(paidTotal), color: SUCCESS },
                  { label: 'Due soon', value: `${BILLS.length} bills`, color: WARNING },
                ].map((chip) => (
                  <div key={chip.label} className="rounded-[20px] border p-2.5" style={{ background: SURFACE, borderColor: HAIRLINE }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
                      {chip.label}
                    </p>
                    <p className="mt-0.5 text-[13px] font-bold" style={{ color: chip.color }}>
                      {chip.value}
                    </p>
                  </div>
                ))}
              </div>
              {BILLS.map((b) => {
                const paid = paidOf(b)
                const remaining = remainingOf(b)
                const progress = b.totalDue > 0 ? paid / b.totalDue : 0
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setView({ name: 'bill', billId: b.id })}
                    className="w-full cursor-pointer rounded-[20px] border p-3.5 text-left"
                    style={{ background: SURFACE, borderColor: HAIRLINE }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[14px] font-bold">{b.name}</p>
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.06)', color: SECONDARY }}>
                        {b.type === 'credit_card' ? 'Credit Card' : 'Loan'}
                      </span>
                    </div>
                    <p className="mt-1 text-[18px] font-extrabold">{peso(b.totalDue)}</p>
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: MUTED }}>Total due · {b.dueDate}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} role="img" aria-label={`${b.name} ${Math.round(progress * 100)} percent paid`}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(progress * 100, 100)}%`, background: progress >= 1 ? SUCCESS : ACCENT }} />
                    </div>
                    <div className="mt-1.5 flex justify-between text-[11px]">
                      <span style={{ color: SECONDARY }}>Paid {peso(paid)}</span>
                      <span className="font-semibold" style={{ color: remaining === 0 ? SUCCESS : DANGER }}>
                        Remaining {peso(remaining)}
                      </span>
                    </div>
                  </button>
                )
              })}
            </>
          )}

          {view.name === 'bill' && detailBill && (
            <>
              <button
                type="button"
                onClick={() => goTab('bills')}
                className="inline-flex min-h-[44px] cursor-pointer items-center self-start text-[12px] font-semibold"
                style={{ color: SECONDARY }}
              >
                ← Back to Bills
              </button>
              <p className="text-[19px] font-extrabold">{detailBill.name}</p>
              <GlassCard>
                <SectionLabel>Payoff progress</SectionLabel>
                <p className="text-[22px] font-extrabold">{peso(remainingOf(detailBill))}</p>
                <p className="text-[11px]" style={{ color: SECONDARY }}>
                  remaining of {peso(detailBill.totalDue)} · due {detailBill.dueDate}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min((paidOf(detailBill) / detailBill.totalDue) * 100, 100)}%`, background: ACCENT }}
                  />
                </div>
              </GlassCard>
              <GlassCard>
                <SectionLabel>Payments by cutoff</SectionLabel>
                {detailBill.payments.map((p, i) => (
                  <div key={`${p.cutoffLabel}-${i}`} className="flex justify-between py-1.5 text-[13px]">
                    <span style={{ color: SECONDARY }}>{p.cutoffLabel} cutoff</span>
                    <span className="font-semibold" style={{ color: SUCCESS }}>{peso(p.amount)}</span>
                  </div>
                ))}
              </GlassCard>
              <button
                type="button"
                onClick={() => say('Logging a payment lives in the full app.')}
                className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold"
                style={{ background: ACCENT, color: '#fff' }}
              >
                + Log a payment
              </button>
            </>
          )}
        </div>

        {/* Bottom tabs */}
        <nav aria-label="BudgeTrax sections" className="flex border-t px-1 pb-4 pt-1" style={{ borderColor: HAIRLINE, background: 'rgba(13,13,20,0.95)' }}>
          {(['cutoffs', 'bills'] as const).map((t) => {
            const activeTab = (view.name === 'tab' && view.tab === t) || (view.name === 'bill' && t === 'bills')
            const label = t === 'cutoffs' ? 'Cutoffs' : 'Bills'
            return (
              <button
                key={t}
                type="button"
                onClick={() => goTab(t)}
                aria-current={activeTab ? 'page' : undefined}
                className="flex min-h-[52px] flex-1 cursor-pointer flex-col items-center justify-center gap-0.5"
                style={{ color: activeTab ? ACCENT : MUTED }}
              >
                <TabIcon name={t} />
                <span className="text-[10px] font-semibold">{label}</span>
              </button>
            )
          })}
        </nav>

        {toast && (
          <p className="sr-only" aria-live="polite">
            {toast}
          </p>
        )}
      </div>
    </PhoneFrame>
  )
}
