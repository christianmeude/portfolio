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
