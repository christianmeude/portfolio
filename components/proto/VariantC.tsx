import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { EMAIL } from '../../lib/site'

const hasCV = existsSync(join(process.cwd(), 'public', 'cv.pdf'))

// PROTOTYPE Variant C — Ink Editorial: full-bleed black hero, oversized name,
// mono meta ledger, one cream action. Same content, opposite posture to A and B.
export default function VariantC() {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#f5f2ee]/15 bg-[#0a0a0a] text-[#f5f2ee]">
        <div className="flex items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="font-mono text-sm font-bold tracking-[0.3em]">
            C.MEUDE
          </a>
          <ul className="flex items-center gap-6 md:gap-9">
            {[
              ['About', '#about'],
              ['Skills', '#skills'],
              ['Projects', '#projects'],
            ].map(([label, href]) => (
              <li key={href} className="hidden sm:list-item">
                <a
                  href={href}
                  className="flex min-h-[44px] items-center font-mono text-xs tracking-[0.25em] text-[#f5f2ee]/60 hover:text-[#f5f2ee]"
                >
                  {label.toUpperCase()}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="flex min-h-[44px] items-center bg-[#f5f2ee] px-5 font-mono text-xs font-bold tracking-[0.25em] text-[#0a0a0a]"
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <section id="top" className="bg-[#0a0a0a] text-[#f5f2ee]">
        <div className="px-6 pb-10 pt-14 md:px-10 md:pt-20">
          <p data-entrance className="font-mono text-xs tracking-[0.3em] text-[#f5f2ee]/50">
            PORTFOLIO — VOL. 01
          </p>
          <h1
            data-entrance
            className="font-display mt-4 text-[clamp(4rem,15vw,13rem)] font-extrabold uppercase leading-[0.85] tracking-tight"
          >
            Christian
            <br />
            Meude<span className="text-[#f5f2ee]/40">.</span>
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-[#f5f2ee]/15 pt-8 md:grid-cols-3 md:items-end">
            <p data-entrance className="max-w-md text-base leading-relaxed text-[#f5f2ee]/75 md:col-span-1">
              Mobile, web &amp; systems developer. Landing, app, and admin — shipped end to end.
            </p>
            <dl data-entrance className="space-y-2 font-mono text-xs tracking-[0.2em] text-[#f5f2ee]/60">
              <div className="flex justify-between gap-6 border-b border-[#f5f2ee]/10 pb-2">
                <dt>BASE</dt>
                <dd className="text-[#f5f2ee]">PH · REMOTE</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-[#f5f2ee]/10 pb-2">
                <dt>STATUS</dt>
                <dd className="text-[#f5f2ee]">OPEN TO WORK</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt>MAIL</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`} className="text-[#f5f2ee] underline underline-offset-4">
                    {EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
            <div data-entrance className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex min-h-[52px] items-center bg-[#f5f2ee] px-8 text-sm font-bold uppercase tracking-[0.15em] text-[#0a0a0a]"
              >
                Selected work ↓
              </a>
              {hasCV && (
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex min-h-[52px] items-center border border-[#f5f2ee]/40 px-8 text-sm font-bold uppercase tracking-[0.15em] hover:border-[#f5f2ee]"
                >
                  CV
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
