import type { Project } from '../data/projects'
import { resolveLinks } from '../data/projects'
import { BrowserFrame, PhoneFrame } from './mockups/frames'
import {
  BudgeTraxScene,
  IneaAdminScene,
  IneaAppScene,
  IneaLandingScene,
  LalatrackerScene,
} from './mockups/scenes'
import { NucleusEmu } from './mockups/NucleusEmu'

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
      rel="noreferrer"
      className="repo-link inline-flex max-w-full min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-(--color-border) px-5 font-semibold transition-colors duration-200 hover:border-(--color-accent) hover:text-(--color-accent)"
    >
      <GithubMark />
      <span className="repo-short">{label}</span>
      <span className="repo-url">{display}</span>
    </a>
  )
}

/** Plain stack tag (strings only) — distinct from the brand-mark Logo chip in Stack. */
function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-[28px] items-center rounded-full border border-(--color-border) bg-(--color-muted) px-3 text-[13px] font-medium text-(--color-foreground)">
      {children}
    </span>
  )
}

function IneaTrio() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <BrowserFrame fluid label="Inea admin dashboard mockup" url="inea-scents / admin">
        <IneaAdminScene />
      </BrowserFrame>
      <div className="grid w-full items-end gap-4 md:grid-cols-[1fr_auto]">
        <BrowserFrame fluid laptop label="Inea landing page mockup" url="inea-scents / landing">
          <IneaLandingScene />
        </BrowserFrame>
        <div className="mx-auto">
          <PhoneFrame label="Inea customer app mockup">
            <IneaAppScene />
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}

function SlideMockup({ project }: { project: Project }) {
  switch (project.slug) {
    case 'nucleus-mobile':
      return <NucleusEmu />
    case 'inea-scents':
      return <IneaTrio />
    case 'budgetrax':
      return (
        <PhoneFrame label="BudgeTrax app mockup">
          <BudgeTraxScene />
        </PhoneFrame>
      )
    default:
      return (
        <PhoneFrame label="Lalatracker concept mockup">
          <LalatrackerScene />
        </PhoneFrame>
      )
  }
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
            {index} — {project.status === 'wip' ? 'Work in progress' : project.status === 'text-only' ? 'Outcome card' : 'Case study'}
          </p>
          <h3 id={`${project.slug}-title`} className="font-display mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {project.title}
            {project.status === 'wip' && (
              <span className="ml-3 inline-flex items-center rounded-full bg-(--color-accent) px-3 py-1 align-middle text-sm font-semibold text-(--color-on-accent)">
                WIP
              </span>
            )}
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
