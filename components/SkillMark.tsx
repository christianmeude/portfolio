import { SKILL_ICON_PATHS } from '../lib/skillIcons'

/** Generic stroke glyphs for skills with no brand mark. Monochrome by design. */
function GenericMark({ skill }: { skill: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    className: 'shrink-0',
  } as const
  if (skill === 'React Native') {
    // Handset slab with screen cutout.
    return (
      <svg {...common}>
        <path d="M7 2.5h10a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z" />
        <path d="M10.5 18.5h3" />
      </svg>
    )
  }
  if (skill === 'EAS Build') {
    // Shipping box.
    return (
      <svg {...common}>
        <path d="M12 2.5 3.5 7v10L12 21.5 20.5 17V7L12 2.5z" />
        <path d="M3.5 7 12 11.5 20.5 7" />
        <path d="M12 11.5V21.5" />
      </svg>
    )
  }
  // REST APIs and any future mark-less skill: code brackets.
  return (
    <svg {...common}>
      <path d="M14.5 6 8.5 12l6 6" />
      <path d="M9.5 6l6 6-6 6" />
    </svg>
  )
}

/** 18px monochrome mark for a stack chip. Decorative — the chip text names it. */
export default function SkillMark({ skill }: { skill: string }) {
  const path = SKILL_ICON_PATHS[skill]
  if (!path) return <GenericMark skill={skill} />
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d={path} />
    </svg>
  )
}
