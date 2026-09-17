import { MockBar, MockDot } from './frames'

function LiveMockDot() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-muted) px-2.5 py-1 text-[11px] font-semibold text-(--color-foreground)">
      <MockDot className="size-1.5 bg-(--color-accent)" />
      Live sync
    </span>
  )
}

function AppRow({ title, sub, right }: { title: string; sub: string; right?: string }) {
  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-card) p-3">
      <p className="text-[13px] font-semibold text-(--color-foreground)">{title}</p>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <p className="text-[11px] text-(--color-muted-foreground)">{sub}</p>
        {right && <p className="text-[11px] font-semibold text-(--color-accent)">{right}</p>}
      </div>
    </div>
  )
}

/** BudgeTrax — budgeting tracker in active development, on a phone. */
export function BudgeTraxScene() {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold text-(--color-foreground)">BudgeTrax</p>
        <span className="rounded-full bg-(--color-accent) px-2.5 py-1 text-[11px] font-semibold text-(--color-on-accent)">
          WIP
        </span>
      </div>
      <div className="rounded-xl border border-(--color-border) bg-(--color-card) p-3">
        <p className="text-[11px] text-(--color-muted-foreground)">Expense tracking</p>
        <MockBar className="mt-2 h-2.5 w-full" />
        <MockBar className="mt-1.5 h-2.5 w-3/4" />
      </div>
      <AppRow title="Budgets" sub="Monthly limits per category" />
      <AppRow title="Visual summaries" sub="Charts of spend over time" />
      <div className="mt-auto">
        <MockBar className="h-9 w-full !rounded-full border border-(--color-border) !bg-transparent" />
      </div>
    </>
  )
}

/** Lalatracker — outcome concept as a wireframe phone (dashed = not built). */
export function LalatrackerScene() {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold text-(--color-foreground)">Lalatracker</p>
        <span className="rounded-full border border-dashed border-(--color-border) px-2.5 py-1 text-[11px] font-semibold text-(--color-muted-foreground)">
          Concept
        </span>
      </div>
      {[['Tracking model', 'Metrics that matter'], ['Success states', 'Defined up front'], ['Interaction states', 'Empty, partial, complete']].map(
        ([title, sub]) => (
          <div key={title} className="rounded-xl border border-dashed border-(--color-border) p-3">
            <p className="text-[13px] font-semibold text-(--color-foreground)">{title}</p>
            <p className="mt-1 text-[11px] text-(--color-muted-foreground)">{sub}</p>
          </div>
        ),
      )}
      <div className="mt-auto rounded-full border border-dashed border-(--color-border) p-2 text-center text-[11px] text-(--color-muted-foreground)">
        No public repository
      </div>
    </>
  )
}

/** Inea admin dashboard — Laravel + Inertia operations surface on desktop. */
export function IneaAdminScene() {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-display text-base font-bold text-(--color-foreground)">Inea Admin</p>
        <LiveMockDot />
      </div>
      <div className="grid grid-cols-[72px_1fr] gap-3">
        <div className="flex flex-col gap-2 rounded-lg border border-(--color-border) bg-(--color-card) p-2">
          {['Orders', 'Stock', 'Staff'].map((item) => (
            <p key={item} className="rounded-md bg-(--color-muted) px-2 py-1.5 text-[10px] font-semibold text-(--color-foreground)">
              {item}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {['Latest orders', 'Low stock alerts', 'Team activity'].map((row) => (
            <div key={row} className="rounded-lg border border-(--color-border) bg-(--color-card) p-2.5">
              <p className="text-[11px] font-semibold text-(--color-foreground)">{row}</p>
              <MockBar className="mt-1.5 h-1.5 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/** Inea landing — marketing surface on a laptop. */
export function IneaLandingScene() {
  return (
    <>
      <div className="flex items-center justify-between">
        <MockBar className="h-2.5 w-16" />
        <div className="flex gap-1.5">
          <MockBar className="h-2.5 w-10" />
          <MockBar className="h-2.5 w-10" />
        </div>
      </div>
      <div className="mt-2 flex flex-col items-center gap-2 py-4 text-center">
        <p className="font-display text-xl font-bold text-(--color-foreground)">Inea Scents</p>
        <MockBar className="h-2 w-3/4" />
        <MockBar className="h-2 w-1/2" />
        <div className="mt-1 h-8 w-28 rounded-full bg-(--color-accent)" />
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-(--color-border) bg-(--color-card) p-2">
            <MockBar className="h-8 w-full !rounded-md" />
            <MockBar className="mt-1.5 h-1.5 w-4/5" />
          </div>
        ))}
      </div>
    </>
  )
}

/** Inea customer app — Flutter client on a phone. */
export function IneaAppScene() {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold text-(--color-foreground)">Shop</p>
        <MockDot className="size-6 border border-(--color-border)" />
      </div>
      <MockBar className="h-7 w-full !rounded-full border border-(--color-border) !bg-transparent" />
      {['New arrivals', 'Bestsellers'].map((row) => (
        <div key={row} className="rounded-xl border border-(--color-border) bg-(--color-card) p-3">
          <p className="text-[13px] font-semibold text-(--color-foreground)">{row}</p>
          <div className="mt-2 flex gap-2">
            <MockBar className="h-10 w-10 !rounded-lg" />
            <div className="flex-1">
              <MockBar className="h-2 w-4/5" />
              <MockBar className="mt-1.5 h-2 w-3/5" />
            </div>
          </div>
        </div>
      ))}
      <div className="mt-auto flex justify-around rounded-full border border-(--color-border) bg-(--color-card) py-2.5">
        {[0, 1, 2].map((i) => (
          <MockDot key={i} className={`size-2 ${i === 0 ? 'bg-(--color-accent)' : 'bg-(--color-border)'}`} />
        ))}
      </div>
    </>
  )
}
