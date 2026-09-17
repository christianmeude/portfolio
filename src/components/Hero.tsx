export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24">
        <h1
          id="hero-heading"
          className="reveal font-display hero-display font-extrabold text-(--color-foreground)"
        >
          Christian Meude
        </h1>
        <p className="reveal mt-5 text-xl font-medium text-(--color-muted-foreground) sm:text-2xl">
          Full-stack developer — mobile, web &amp; systems.
        </p>
        <div className="reveal mt-10 flex justify-center">
          <a
            href="#work"
            className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full bg-(--color-accent) px-8 font-semibold text-(--color-on-accent) transition-transform duration-200 hover:-translate-y-0.5"
          >
            View selected work
          </a>
        </div>
      </div>
    </section>
  )
}
