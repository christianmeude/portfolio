import type { ReactNode } from 'react'

function MockBar({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`rounded-full bg-(--color-muted) ${className}`} />
}

function MockDot({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`rounded-full ${className}`} />
}

export function PhoneFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative w-[230px] shrink-0 rounded-[2.2rem] border border-(--color-border) bg-(--color-card) p-2 shadow-none sm:w-[250px]"
    >
      <div className="relative overflow-hidden rounded-[1.7rem] bg-(--color-background)">
        <div aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-(--color-foreground)" />
        <div className="flex min-h-[420px] flex-col gap-3 p-4 pt-10 sm:min-h-[450px]">{children}</div>
        <div aria-hidden="true" className="mx-auto mb-2 h-1 w-16 rounded-full bg-(--color-border)" />
      </div>
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
