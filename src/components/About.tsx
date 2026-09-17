export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad border-t border-(--color-border)">
      <div className="mx-auto w-full max-w-6xl px-5 text-center sm:px-8">
        <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">About</p>
        <h2 id="about-heading" className="reveal font-display mt-3 text-4xl font-bold sm:text-5xl">
          Calm interfaces, solid systems
        </h2>
        <p className="reveal mx-auto mt-4 max-w-xl text-lg leading-relaxed text-(--color-muted-foreground)">
          I&apos;m Christian Meude. I work across mobile and web — minimal surfaces,
          readable code, accessible defaults.
        </p>
      </div>
    </section>
  )
}
