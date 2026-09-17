import {
  siDart,
  siExpo,
  siFlutter,
  siGit,
  siInertia,
  siLaravel,
  siNeon,
  siPostgresql,
  siReact,
  siRender,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from 'simple-icons'

export interface SkillMark {
  /** Brand mark path data (24x24 viewBox). Null → initial-letter tile. */
  path: string | null
  /** Brand hex without '#'. Used for the mark; falls back to foreground when too dark. */
  hex: string | null
  /** 1–2 letter fallback when no brand mark exists. */
  initials: string
}

export interface Skill {
  label: string
  mark: SkillMark
}

function brand(icon: SimpleIcon): SkillMark {
  return { path: icon.path, hex: icon.hex, initials: icon.title.slice(0, 1) }
}

function letters(initials: string): SkillMark {
  return { path: null, hex: null, initials }
}

export const TECH_SKILLS: Skill[] = [
  { label: 'React', mark: brand(siReact) },
  { label: 'React Native', mark: letters('RN') },
  { label: 'Expo', mark: brand(siExpo) },
  { label: 'Supabase', mark: brand(siSupabase) },
  { label: 'Flutter', mark: brand(siFlutter) },
  { label: 'Dart', mark: brand(siDart) },
  { label: 'Laravel', mark: brand(siLaravel) },
  { label: 'Inertia', mark: brand(siInertia) },
  { label: 'Tailwind', mark: brand(siTailwindcss) },
  { label: 'Vite', mark: brand(siVite) },
  { label: 'TypeScript', mark: brand(siTypescript) },
  { label: 'PostgreSQL', mark: brand(siPostgresql) },
  { label: 'Git', mark: brand(siGit) },
]

export const TOOL_SKILLS: Skill[] = [
  { label: 'Render', mark: brand(siRender) },
  { label: 'Vercel', mark: brand(siVercel) },
  { label: 'Neon', mark: brand(siNeon) },
]
