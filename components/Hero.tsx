import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { SURFACES } from '../lib/site'

const CV_PATH = '/cv.pdf'
const hasCV = existsSync(join(process.cwd(), 'public', 'cv.pdf'))

export default function Hero() {
  return (
    <section id="top" className="border-b-[3px] border-[#0a0a0a]">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
        <div className="flex flex-col gap-5 px-6 py-12 md:gap-6 md:px-12 md:py-20">
          <span data-hero-entrance className="type-mono-label inline-block w-fit border-[3px] border-[#0a0a0a] bg-white px-3 py-2 shadow-brutal">
            ★ Open to roles &amp; freelance
          </span>
          <h1 data-hero-entrance className="font-display text-[clamp(3.5rem,10vw,7.5rem)] font-extrabold uppercase leading-[0.9]">
            Christian
            <br />
            <span className="type-outline">Meude</span>
          </h1>
          <p data-hero-entrance className="font-body mt-2 max-w-md text-lg">
            Mobile, web &amp; systems developer open to remote roles and freelance — Expo
            apps, Flutter clients, and Laravel dashboards, shipped end to end.
          </p>
          <div data-hero-entrance className="mt-6 flex flex-wrap gap-3">
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
        </div>
        <div data-hero-entrance className="relative hidden min-h-[320px] overflow-hidden bg-[#0a0a0a] text-[#f5f2ee] md:block md:border-l-[3px]">
          {/* Desktop: seamless vertical loop. */}
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
      {/* Mobile: horizontal surfaces marquee below the hero. Desktop untouched. */}
      <div data-hero-entrance className="overflow-hidden border-t-[3px] border-[#0a0a0a] bg-[#0a0a0a] py-3 text-[#f5f2ee] md:hidden">
        <div
          className="animate-marquee flex w-max whitespace-nowrap will-change-transform"
          aria-label="Surfaces shipped"
        >
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
              {SURFACES.map((s) => (
                <span
                  key={`${half}-${s}`}
                  className="mx-5 font-mono text-xs font-bold uppercase tracking-[0.2em]"
                >
                  ★ {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
