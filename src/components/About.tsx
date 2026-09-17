export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad border-t border-(--color-border)">
      <div className="mx-auto w-full max-w-6xl px-5 text-center sm:px-8">
        <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-(--color-muted-foreground)">About</p>
        <h2 id="about-heading" className="reveal font-display mt-3 text-3xl font-bold sm:text-4xl">
          Calm interfaces, solid systems
        </h2>
        <p className="reveal mx-auto mt-4 max-w-xl text-lg leading-relaxed text-(--color-muted-foreground)">
          I&apos;m Christian Meude. I work across mobile and web — minimal surfaces,
          readable code, accessible defaults.{' '}
          <a href="#work" className="font-semibold text-(--color-foreground) underline decoration-(--color-accent) decoration-2 underline-offset-4">
            See the work
          </a>{' '}
          or{' '}
          <a href="#contact" className="font-semibold text-(--color-foreground) underline decoration-(--color-accent) decoration-2 underline-offset-4">
            get in touch
          </a>
          .
        </p>
      </div>
    </section>
  )
}
