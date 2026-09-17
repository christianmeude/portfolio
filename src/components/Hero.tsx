import HeroCanvas from './HeroCanvas'

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <HeroCanvas />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="hero-scrim max-w-3xl rounded-2xl p-6 sm:p-10">
          <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
            Developer Portfolio
          </p>
          <h1
            id="hero-heading"
            className="reveal font-display hero-display mt-4 font-extrabold text-(--color-foreground)"
          >
            Christian Meude
          </h1>
          <p className="reveal mt-4 text-xl font-medium text-(--color-foreground) sm:text-2xl">
            Full-stack developer — mobile, web &amp; systems.
          </p>
          <p className="reveal mt-4 max-w-xl text-base leading-relaxed text-(--color-muted-foreground) sm:text-lg">
            I build calm, spacious interfaces backed by solid systems — from
            Expo mobile apps to Laravel operations dashboards.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full bg-(--color-accent) px-7 font-semibold text-(--color-on-accent) transition-transform duration-200 hover:-translate-y-0.5"
            >
              View selected work
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-(--color-border) bg-(--color-card) px-7 font-semibold text-(--color-foreground) transition-colors duration-200 hover:border-(--color-accent)"
            >
              Contact
            </a>
          </div>
          <ul
            aria-label="Proof highlights"
            className="reveal mt-8 flex flex-col gap-2 border-t border-(--color-border) pt-5 text-sm text-(--color-muted-foreground) sm:flex-row sm:flex-wrap sm:gap-x-6"
          >
            {[
              ['Nucleus', 'live backend sync'],
              ['Inea Scents', 'landing, app & admin'],
              ['BudgeTrax', 'in active development'],
            ].map(([name, detail]) => (
              <li key={name} className="flex items-baseline gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 shrink-0 translate-y-[-1px] rounded-full bg-(--color-accent)"
                />
                <span>
                  <strong className="font-semibold text-(--color-foreground)">{name}</strong>
                  {' — '}
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p aria-hidden="true" className="mt-10 text-sm text-(--color-muted-foreground) md:mt-16">
          Scroll for selected work
        </p>
      </div>
    </section>
  )
}
