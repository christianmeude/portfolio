import type { ReactNode } from 'react'

function MockBar({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`rounded-full bg-(--color-muted) ${className}`} />
}

function MockDot({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`rounded-full ${className}`} />
}

export function PhoneFrame({
  label,
  children,
  interactive = false,
}: {
  label: string
  children: ReactNode
  /** Interactive emulator mode: exposed as a labelled region instead of one image summary. */
  interactive?: boolean
}) {
  return (
    <div className="relative w-[250px] shrink-0 sm:w-[270px]">
      {/* Side buttons */}
      <div aria-hidden="true" className="absolute -left-[2px] top-28 h-8 w-[3px] rounded-l-md bg-[#3a3f47]" />
      <div aria-hidden="true" className="absolute -left-[2px] top-40 h-12 w-[3px] rounded-l-md bg-[#3a3f47]" />
      <div aria-hidden="true" className="absolute -left-[2px] top-54 h-12 w-[3px] rounded-l-md bg-[#3a3f47]" />
      <div aria-hidden="true" className="absolute -right-[2px] top-36 h-16 w-[3px] rounded-r-md bg-[#3a3f47]" />
      {/* Bezel */}
      <div className="relative rounded-[3rem] bg-gradient-to-b from-[#33373e] via-[#141619] to-[#050607] p-[10px] shadow-[0_50px_100px_-24px_rgba(0,0,0,0.85)]">
        {/* Punch-hole camera */}
        <div aria-hidden="true" className="absolute left-1/2 top-[22px] z-10 size-2.5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/15">
          <div className="ml-[3px] mt-[3px] size-1 rounded-full bg-[#1a2340]" />
        </div>
        <div
          role={interactive ? 'region' : 'img'}
          aria-label={label}
          aria-roledescription={interactive ? 'interactive app preview' : undefined}
          className="relative overflow-hidden rounded-[2.5rem]"
        >
          {interactive ? (
            children
          ) : (
            <div className="flex min-h-[420px] flex-col gap-3 bg-(--color-background) p-4 pt-8 sm:min-h-[450px]">
              {children}
            </div>
          )}
          {/* Screen glare */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-[2.5rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_28%,transparent_45%)]"
          />
        </div>
      </div>
      {/* Floor reflection */}
      <div aria-hidden="true" className="mx-auto mt-3 h-6 w-2/3 rounded-[100%] bg-black/70 blur-xl" />
    </div>
  )
}

export function BrowserFrame({
  label,
  url,
  children,
  laptop = false,
  fluid = false,
}: {
  label: string
  url: string
  children: ReactNode
  laptop?: boolean
  fluid?: boolean
}) {
  return (
    <div className={`w-full shrink-0 ${fluid ? 'max-w-none' : 'max-w-[420px]'}`}>
      <div
        role="img"
        aria-label={label}
        className="relative w-full overflow-hidden rounded-xl rounded-b-none border border-(--color-border) bg-(--color-card)"
      >
      <div className="flex items-center gap-2 border-b border-(--color-border) px-3 py-2.5">
        <MockDot className="size-2 bg-(--color-border)" />
        <MockDot className="size-2 bg-(--color-border)" />
        <MockDot className="size-2 bg-(--color-border)" />
        <div className="ml-2 min-w-0 flex-1 truncate rounded-full bg-(--color-muted) px-3 py-1 text-[11px] text-(--color-muted-foreground)">
          {url}
        </div>
      </div>
      <div className="flex min-h-[300px] flex-col gap-3 bg-(--color-background) p-5 sm:min-h-[330px]">
        {children}
      </div>
      </div>
      {laptop && (
        <div aria-hidden="true" className="mx-auto h-2 w-3/4 rounded-b-xl border border-t-0 border-(--color-border) bg-(--color-muted)" />
      )}
    </div>
  )
}

export { MockBar, MockDot }
