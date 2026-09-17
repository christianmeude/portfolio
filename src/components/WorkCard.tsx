import type { Project } from '../data/projects'

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-[28px] items-center rounded-full border border-(--color-border) bg-(--color-muted) px-3 text-[13px] font-medium text-(--color-foreground)">
      {children}
    </span>
  )
}

export default function WorkCard({ project, index }: { project: Project; index: string }) {
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="reveal grid w-full gap-6 rounded-2xl border border-(--color-border) bg-(--color-card) p-6 sm:p-10 lg:min-h-[70vh] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12"
    >
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
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
        <p className="mt-5 max-w-xl leading-relaxed text-(--color-muted-foreground)">{project.outcome}</p>
      </div>
      <div className="flex flex-col gap-3">
        {project.parts ? (
          <div className="flex flex-col gap-3" role="group" aria-label={`${project.title} parts`}>
            {project.parts.map((part, idx) => (
              <details
                key={part.label}
                open={idx === 0}
                className="rounded-xl border border-(--color-border) bg-(--color-background)"
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 p-4 font-semibold [&::-webkit-details-marker]:hidden">
                  <span>
                    {part.label}
                    <span className="mt-0.5 block text-sm font-normal text-(--color-muted-foreground)">
                      {part.detail}
                    </span>
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-200 [[open]_&]:rotate-90"
                  >
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                {part.url && (
                  <div className="px-4 pb-4">
                    <a
                      href={part.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center font-semibold text-(--color-accent) underline-offset-4 hover:underline"
                    >
                      View {part.label} repo
                      <span aria-hidden="true" className="ml-1">↗</span>
                    </a>
                  </div>
                )}
              </details>
            ))}
          </div>
        ) : project.status === 'text-only' ? (
          <div className="rounded-xl border border-dashed border-(--color-border) bg-(--color-background) p-5">
            <p className="font-semibold">Text-only outcome</p>
            <p className="mt-1 text-sm leading-relaxed text-(--color-muted-foreground)">
              No public repository. This card documents scope, decisions, and measurable outcomes instead of code.
            </p>
          </div>
        ) : null}
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-(--color-border) px-5 font-semibold transition-colors duration-200 hover:border-(--color-accent) hover:text-(--color-accent)"
              >
                {l.label}
                <span aria-hidden="true" className="ml-1">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
