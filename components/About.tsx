import { FACTS } from '../lib/site'

export default function About() {
  return (
    <section id="about" className="border-b-[3px] border-[#0a0a0a] bg-[#f5f2ee]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <p className="type-mono-label">01 — About</p>
        <h2 data-reveal className="font-display mt-3 text-5xl font-extrabold uppercase md:text-7xl">
          The whole system, shipped
        </h2>
        <p data-reveal className="mt-4 max-w-2xl text-lg leading-relaxed">
          I&apos;m Christian, a developer from the Philippines building for remote roles and
          freelance — from landing page to app to admin panel, shipped live. This page is
          my CV in motion: every project below links to live work or real code.
        </p>
        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FACTS.map((f) => (
            <div
              key={f.k}
              data-reveal
              className="border-[3px] border-[#0a0a0a] bg-white p-5 shadow-brutal"
            >
              <dt className="type-mono-label text-[#555]">{f.k}</dt>
              <dd className="mt-2 font-semibold leading-relaxed">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
