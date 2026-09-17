import { PROJECTS } from '../data/projects'
import WorkCard from './WorkCard'

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section-pad">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
          Selected work
        </p>
        <h2 id="work-heading" className="reveal font-display mt-3 text-4xl font-bold sm:text-5xl">
          Selected work, proven in code
        </h2>
        <p className="reveal mt-3 max-w-2xl text-(--color-muted-foreground)">
          Each project links to its real repository — or says so when there isn&apos;t one.
          In-progress and concept work is labeled, never dressed up.
        </p>
        <div className="mt-10 flex flex-col gap-8 lg:gap-12">
          {PROJECTS.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={String(i + 1).padStart(2, '0')} />
          ))}
        </div>
      </div>
    </section>
  )
}
