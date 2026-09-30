import RepoPill from './RepoPill'
import { PROJECTS, resolveLinks } from '../lib/site'

export default function Projects() {
  return (
    <section id="projects" className="border-b-[3px] border-[#0a0a0a] bg-[#0a0a0a] text-[#f5f2ee]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <p className="type-mono-label text-[#cccccc]">03 — Projects</p>
        <div data-reveal className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl font-extrabold uppercase md:text-7xl">
            Selected work
          </h2>
        </div>
        <ol className="mt-10 space-y-6">
          {PROJECTS.map((p) => (
            <li
              key={p.slug}
              data-reveal
              className="border-[3px] border-[#f5f2ee] bg-card p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-sm text-[#777]">{p.index}</span>
                <span
                  className={`type-mono-label border-2 px-3 py-1 ${
                    p.status === 'shipped'
                      ? 'border-[#f5f2ee] bg-[#f5f2ee] text-[#0a0a0a]'
                      : 'border-[#f5f2ee] text-[#f5f2ee]'
                  }`}
                >
                  {p.statusLabel}
                </span>
              </div>
              <h3 className="font-display mt-3 text-4xl font-extrabold uppercase md:text-5xl">
                {p.title}
              </h3>
              <p className="mt-1 font-semibold text-[#cccccc]">{p.tagline}</p>
              <p className="mt-3 max-w-2xl leading-relaxed">{p.outcome}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${p.title} stack`}>
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="inline-flex min-h-[44px] items-center rounded-full border-2 border-[#f5f2ee]/40 px-4 text-xs font-bold uppercase tracking-widest"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              {p.parts && (
                <ul className="mt-4 space-y-2 text-sm">
                  {p.parts.map((part) => (
                    <li key={part.label} className="flex flex-wrap gap-2">
                      <span className="font-bold">{part.label}:</span>
                      <span className="text-[#cccccc]">{part.detail}</span>
                    </li>
                  ))}
                </ul>
              )}
              {(p.parts ?? []).some((part) => part.liveUrl) && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {(p.parts ?? [])
                    .filter((part) => part.liveUrl)
                    .map((part) => (
                      <a
                        key={part.liveUrl}
                        href={part.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex min-h-[44px] items-center gap-2 border-[3px] border-[#f5f2ee] bg-[#f5f2ee] px-5 text-sm font-bold text-[#0a0a0a]"
                        aria-label={`Visit live ${part.label} (opens in new tab)`}
                      >
                        Visit {part.label} ↗
                      </a>
                    ))}
                </div>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                {(p.parts ?? []).some((part) => part.liveUrl) && (
                  <span className="w-full font-mono text-xs tracking-[0.15em] text-[#777] uppercase">
                    Code
                  </span>
                )}
                {resolveLinks(p).map((l) => (
                  <RepoPill key={l.url} label={l.label} url={l.url} />
                ))}
                {resolveLinks(p).length === 0 && (
                  <span className="text-sm text-[#777]">No public repo — concept only.</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
