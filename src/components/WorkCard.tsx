import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Project } from '../data/projects'
import { resolveLinks } from '../data/projects'
import { PhoneFrame } from './mockups/frames'
import { LalatrackerScene } from './mockups/scenes'
import { NucleusEmu } from './mockups/NucleusEmu'
import { BudgeTraxEmu } from './mockups/BudgeTraxEmu'
import { IneaAdminEmu } from './mockups/IneaAdminEmu'
import { IneaAppEmu } from './mockups/IneaAppEmu'
import { IneaLandingEmu } from './mockups/IneaLandingEmu'

function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function RepoLink({ label, url }: { label: string; url: string }) {
  const display = url.replace(/^https?:\/\//, '')
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="repo-link inline-flex max-w-full min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-(--color-border) px-5 font-semibold transition-colors duration-200 hover:border-(--color-accent) hover:text-(--color-accent)"
    >
      <GithubMark />
      <span className="repo-short">{label}</span>
      <span className="repo-url">{display}</span>
    </a>
  )
}

/** Plain stack tag (strings only) — same pill dialect as the brand-mark Logo chip in Stack (44px, label ramp), minus the mark. */
function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-[44px] items-center rounded-full border border-(--color-border) bg-(--color-muted) px-4 text-sm font-medium text-(--color-foreground)">
      {children}
    </span>
  )
}

/**
 * Inea trio as a tabbed shell: one surface visible at a time.
 * The three stacked devices (~15 interactive zones, three nested scroll
 * regions) crushed the scan rhythm; tabs cut the card ~60% while the
 * per-surface detail list below stays whole for scanners and readers.
 */
const INEA_SURFACES = [
  { id: 'admin', label: 'Admin' },
  { id: 'landing', label: 'Landing' },
  { id: 'client', label: 'Flutter app' },
] as const

type IneaSurface = (typeof INEA_SURFACES)[number]['id']

function IneaTrio() {
  const [surface, setSurface] = useState<IneaSurface>('admin')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (index + 1) % INEA_SURFACES.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + INEA_SURFACES.length) % INEA_SURFACES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = INEA_SURFACES.length - 1
    if (next !== null) {
      e.preventDefault()
      setSurface(INEA_SURFACES[next].id)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div role="tablist" aria-label="Inea Scents surfaces" className="flex flex-wrap justify-center gap-2">
        {INEA_SURFACES.map((s, i) => {
          const active = surface === s.id
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`inea-tab-${s.id}`}
              aria-selected={active}
              aria-controls={`inea-panel-${s.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSurface(s.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-5 font-semibold transition-colors duration-200 ${
                active
                  ? 'bg-(--color-accent) text-(--color-on-accent)'
                  : 'border border-(--color-border) bg-(--color-card) hover:border-(--color-accent)'
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </div>
      <div className="flex w-full justify-center">
        {surface === 'admin' && (
          <div role="tabpanel" id="inea-panel-admin" aria-labelledby="inea-tab-admin" className="w-full">
            <IneaAdminEmu />
          </div>
        )}
        {surface === 'landing' && (
          <div role="tabpanel" id="inea-panel-landing" aria-labelledby="inea-tab-landing" className="w-full">
            <IneaLandingEmu />
          </div>
        )}
        {surface === 'client' && (
          <div role="tabpanel" id="inea-panel-client" aria-labelledby="inea-tab-client" className="mx-auto">
            <IneaAppEmu />
          </div>
        )}
      </div>
    </div>
  )
}

/** Sighted equivalent of the screen-reader "interactive app preview" label:
 *  one try-line per emulator so scanners know the box is playable. */
const TRY_LINES: Record<string, string> = {
  'nucleus-mobile':
    'Interactive preview — try signing in, then browsing the repository. Sample data.',
  'inea-scents':
    'Interactive preview — try the Admin ledger, the Landing inquiry form, or booking a scent in the app. Sample data.',
  budgetrax: 'Interactive preview — try switching pay cutoffs, then opening a bill. Sample data.',
}

function SlideMockup({ project }: { project: Project }) {
  const tryLine = TRY_LINES[project.slug]
  let emulator: ReactNode
  switch (project.slug) {
    case 'nucleus-mobile':
      emulator = <NucleusEmu />
      break
    case 'inea-scents':
      emulator = <IneaTrio />
      break
    case 'budgetrax':
      emulator = <BudgeTraxEmu />
      break
    default:
      emulator = (
        <PhoneFrame label="Lalatracker concept mockup">
          <LalatrackerScene />
        </PhoneFrame>
      )
  }
  return (
    <div className="flex w-full flex-col items-center gap-3">
      {tryLine && <p className="text-center text-sm text-(--color-muted-foreground)">{tryLine}</p>}
      {emulator}
    </div>
  )
}

export default function WorkCard({ project, index }: { project: Project; index: string }) {
  const trio = project.slug === 'inea-scents'
  const links = resolveLinks(project)
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={`reveal grid w-full gap-8 rounded-2xl border border-(--color-border) bg-(--color-card) p-6 sm:p-10 lg:gap-12 ${
        trio ? 'lg:grid-cols-1' : 'lg:min-h-[70vh] lg:grid-cols-[0.95fr_1.05fr] lg:items-center'
      }`}
    >
      <div className="flex items-center justify-center">
        <SlideMockup project={project} />
      </div>
      <div className={trio ? 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start' : undefined}>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--color-muted-foreground)">
            {index} — {project.status === 'wip' ? 'Work in progress' : project.status === 'text-only' ? 'Concept' : 'Shipped'}
          </p>
          <h3 id={`${project.slug}-title`} className="font-display mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {project.title}
          </h3>
          <p className="mt-2 text-lg font-medium text-(--color-foreground)">{project.tagline}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-(--color-muted-foreground)">{project.outcome}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:pt-1">
          {project.parts ? (
            <ul className="flex flex-col gap-5">
              {project.parts.map((part) => (
                <li key={part.label}>
                  <p className="font-semibold text-(--color-foreground)">{part.label}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-(--color-muted-foreground)">
                    {part.detail}
                  </p>
                  {part.url && (
                    <div className="mt-2">
                      <RepoLink label={part.label} url={part.url} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : links.length > 0 ? (
            links.map((l) => (
              <div key={l.url}>
                <RepoLink label={l.label} url={l.url} />
              </div>
            ))
          ) : (
            <p className="text-sm leading-relaxed text-(--color-muted-foreground)">
              Text-only outcome — no public repository.
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
