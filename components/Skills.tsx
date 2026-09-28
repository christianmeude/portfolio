import { FAMILIAR, PROFICIENT } from '../lib/site'

function Group({ title, items, dark }: { title: string; items: string[]; dark?: boolean }) {
  return (
    <div
      data-reveal
      className={`border-[3px] border-[#0a0a0a] p-6 shadow-brutal ${dark ? 'bg-[#0a0a0a] text-[#f5f2ee]' : 'bg-white'}`}
    >
      <h3 className="type-mono-label opacity-70">{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2.5" aria-label={title}>
        {items.map((s) => (
          <li
            key={s}
            className={`inline-flex min-h-[44px] items-center rounded-full border-[3px] px-4 text-sm font-bold ${
              dark ? 'border-[#f5f2ee] text-[#f5f2ee]' : 'border-[#0a0a0a]'
            }`}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="border-b-[3px] border-[#0a0a0a] bg-[#f5f2ee]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <p className="type-mono-label">02 — Skills</p>
        <h2 data-reveal className="font-display mt-3 text-5xl font-extrabold uppercase md:text-7xl">Stack</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Group title="Proficient" items={PROFICIENT} />
          <Group title="Familiar" items={FAMILIAR} dark />
        </div>
      </div>
    </section>
  )
}
