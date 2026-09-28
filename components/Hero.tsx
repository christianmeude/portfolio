import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { EMAIL, SURFACES } from '../lib/site'

const CV_PATH = '/cv.pdf'
const hasCV = existsSync(join(process.cwd(), 'public', 'cv.pdf'))

export default function Hero() {
  return (
    <section id="top" className="border-b-[3px] border-[#0a0a0a]">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
        <div className="flex flex-col gap-4 px-6 py-10 md:px-12 md:py-14">
          <span className="type-mono-label inline-block w-fit border-[3px] border-[#0a0a0a] bg-white px-3 py-2 shadow-brutal">
            ★ Open to roles &amp; freelance
          </span>
          <h1 className="font-display text-[clamp(3.5rem,10vw,7.5rem)] font-extrabold uppercase leading-[0.9]">
            Christian
            <br />
            <span className="type-outline">Meude</span>
          </h1>
          <p className="font-body mt-2 max-w-md text-lg">
            Mobile, web &amp; systems developer. Landing, app, and admin — shipped end to end.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="#projects" className="btn-brutal btn-primary-brutal">
              View my work
            </a>
            <a href="#contact" className="btn-brutal btn-ghost-brutal">
              Get in touch
            </a>
            {hasCV && (
              <a href={CV_PATH} download className="btn-brutal btn-ghost-brutal">
                Download CV
              </a>
            )}
          </div>
          <dl className="mt-6 grid grid-cols-1 gap-3 border-t-[3px] border-[#0a0a0a] pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="type-mono-label text-[#555]">Location</dt>
              <dd className="mt-1 font-bold">Philippines · Remote</dd>
            </div>
            <div>
              <dt className="type-mono-label text-[#555]">Status</dt>
              <dd className="mt-1 font-bold">Open to roles &amp; freelance</dd>
            </div>
            <div>
              <dt className="type-mono-label text-[#555]">Email</dt>
              <dd className="mt-1 font-bold">
                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                  {EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative min-h-[320px] overflow-hidden border-t-[3px] border-[#0a0a0a] bg-[#0a0a0a] text-[#f5f2ee] md:border-l-[3px] md:border-t-0">
          {/* Mobile: static grid. Desktop: seamless vertical loop. */}
          <ul className="grid grid-cols-2 gap-3 p-6 md:hidden" aria-label="Surfaces shipped">
            {SURFACES.map((s) => (
              <li
                key={s}
                className="border-2 border-[#f5f2ee]/30 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#f5f2ee]/80"
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="hidden h-full max-h-[560px] flex-col overflow-hidden p-8 opacity-40 md:flex md:p-12">
            <div
              className="animate-marquee-y flex shrink-0 flex-col will-change-transform"
              aria-label="Surfaces shipped"
            >
              {[0, 1].map((half) => (
                <div key={half} className="flex shrink-0 flex-col" aria-hidden={half === 1}>
                  {SURFACES.map((s) => (
                    <span
                      key={`${half}-${s}`}
                      className="font-display py-3 text-3xl font-bold uppercase tracking-wide md:text-4xl"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
