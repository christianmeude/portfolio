import { TECH_SKILLS, TOOL_SKILLS, type Skill } from '../data/skills'

/** Brand marks near-black (#1C2024, #000000…) vanish on dark chrome — set them in foreground instead. Threshold 0.25 relative luminance. */
function markColor(hex: string | null): string | undefined {
  if (!hex) return undefined
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance < 0.25 ? undefined : `#${hex}`
}

function Chip({ skill }: { skill: Skill }) {
  return (
    <li className="stack-chip">
      {skill.mark.path ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={markColor(skill.mark.hex) ?? 'currentColor'}
          aria-hidden="true"
          className="shrink-0"
        >
          <path d={skill.mark.path} />
        </svg>
      ) : (
        <span aria-hidden="true" className="stack-initials">
          {skill.mark.initials}
        </span>
      )}
      {skill.label}
    </li>
  )
}

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="section-pad border-t border-(--color-border)">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
          Stack
        </p>
        <h2 id="stack-heading" className="reveal font-display mt-3 text-4xl font-bold sm:text-5xl">
          Tools I reach for
        </h2>
        <h3 className="reveal mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-(--color-muted-foreground)">
          Tech
        </h3>
        <ul className="reveal mt-4 flex flex-wrap gap-2.5" aria-label="Technologies">
          {TECH_SKILLS.map((s) => (
            <Chip key={s.label} skill={s} />
          ))}
        </ul>
        <h3 className="reveal mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-(--color-muted-foreground)">
          Tools
        </h3>
        <ul className="reveal mt-4 flex flex-wrap gap-2.5" aria-label="Tools and platforms">
          {TOOL_SKILLS.map((s) => (
            <Chip key={s.label} skill={s} />
          ))}
        </ul>
      </div>
    </section>
  )
}
