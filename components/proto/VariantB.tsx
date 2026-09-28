import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { EMAIL } from '../../lib/site'

const hasCV = existsSync(join(process.cwd(), 'public', 'cv.pdf'))

// PROTOTYPE Variant B — Victor-like quiet minimal: hairlines, whitespace,
// small caps nav, single-column hero. No shadows, no stats, no ticker.
export default function VariantB() {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#0a0a0a]/15 bg-[#f5f2ee]/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
            Christian Meude
          </a>
          <ul className="hidden items-center gap-7 sm:flex">
            {[
              ['About', '#about'],
              ['Skills', '#skills'],
              ['Projects', '#projects'],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex min-h-[44px] items-center text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a]/70 hover:text-[#0a0a0a]"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="flex min-h-[44px] items-center text-[13px] font-semibold uppercase tracking-[0.18em] underline underline-offset-8"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <section id="top" className="border-b border-[#0a0a0a]/15">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p data-entrance className="font-mono text-xs tracking-[0.25em] text-[#0a0a0a]/60">
            PORTFOLIO — 2026
          </p>
          <h1
            data-entrance
            className="font-display mt-5 text-[clamp(3rem,9vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight"
          >
            Christian Meude
          </h1>
          <p data-entrance className="mt-5 max-w-xl text-lg leading-relaxed text-[#0a0a0a]/75">
            Mobile, web &amp; systems developer. Landing, app, and admin — shipped end to end.
          </p>
          <div data-entrance className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-[48px] items-center border border-[#0a0a0a] bg-[#0a0a0a] px-7 text-sm font-semibold text-[#f5f2ee]"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[48px] items-center border border-[#0a0a0a]/30 px-7 text-sm font-semibold hover:border-[#0a0a0a]"
            >
              Get in touch
            </a>
            {hasCV && (
              <a
                href="/cv.pdf"
                download
                className="inline-flex min-h-[48px] items-center border border-[#0a0a0a]/30 px-7 text-sm font-semibold hover:border-[#0a0a0a]"
              >
                Download CV
              </a>
            )}
          </div>
          <dl data-entrance className="mt-14 grid grid-cols-1 gap-x-10 gap-y-3 border-t border-[#0a0a0a]/15 pt-6 text-sm sm:grid-cols-3">
            <div className="flex justify-between gap-4 sm:block">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/50">
                Location
              </dt>
              <dd className="mt-1 font-medium">Philippines · Remote</dd>
            </div>
            <div className="flex justify-between gap-4 sm:block">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/50">
                Status
              </dt>
              <dd className="mt-1 font-medium">Open to roles &amp; freelance</dd>
            </div>
            <div className="flex justify-between gap-4 sm:block">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/50">
                Email
              </dt>
              <dd className="mt-1 font-medium">
                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                  {EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
