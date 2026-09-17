import { MockBar } from './frames'

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
