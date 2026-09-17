export type ProjectStatus = 'shipped' | 'wip' | 'text-only'

export interface ProjectPart {
  label: string
  detail: string
  url?: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  stack: string[]
  outcome: string
  status: ProjectStatus
  links: { label: string; url: string }[]
  parts?: ProjectPart[]
}

export const EMAIL = 'christianmeude17@gmail.com'
export const GITHUB_PROFILE = 'https://github.com/christianmeude'

/** Single links first; multi-surface projects (Inea) resolve their part repos. */
export function resolveLinks(project: Project): { label: string; url: string }[] {
  if (project.links.length > 0) return project.links
  return project.parts
    ?.filter((p) => p.url)
    .map((p) => ({ label: p.label, url: p.url as string })) ?? []
}

function gh(url: string): string {
  return url.endsWith('.git') ? url.slice(0, -4) : url
}

export const PROJECTS: Project[] = [
  {
    slug: 'nucleus-mobile',
    title: 'Nucleus Mobile Capstone',
    tagline: 'Cross-platform mobile capstone with live backend sync',
    stack: ['Expo', 'React Native', 'Supabase'],
    outcome:
      'Shipped: auth, data sync, and offline-tolerant UI on Supabase.',
    status: 'shipped',
    links: [
      {
        label: 'Repository',
        url: gh('https://github.com/christianmeude/capstone-nucleus-rn.git'),
      },
    ],
  },
  {
    slug: 'inea-scents',
    title: 'Inea Scents System',
    tagline: 'One product, three surfaces — landing, app, and admin',
    stack: ['Landing', 'Flutter App', 'Laravel + Inertia Admin'],
    outcome:
      'Landing, Flutter client, and Laravel admin — one coherent system, end to end.',
    status: 'shipped',
    links: [],
    parts: [
      {
        label: 'Landing',
        detail: 'Marketing site for brand + conversion',
        url: gh('https://github.com/christianmeude/inea-scents-landing.git'),
      },
      {
        label: 'Flutter App',
        detail: 'Customer-facing mobile experience',
        url: gh('https://github.com/christianmeude/inea-scents-client.git'),
      },
      {
        label: 'Admin',
        detail: 'Laravel + Inertia operations dashboard',
        url: gh('https://github.com/christianmeude/inea-scents.git'),
      },
    ],
  },
  {
    slug: 'budgetrax',
    title: 'BudgeTrax',
    tagline: 'Personal budgeting tracker — in active development',
    stack: ['React', 'Vite', 'Tailwind'],
    outcome:
      'In progress: expense tracking with budgets and visual summaries.',
    status: 'wip',
    links: [
      {
        label: 'Repository',
        url: gh('https://github.com/christianmeude/BudgeTrax.git'),
      },
    ],
  },
  {
    slug: 'lalatracker',
    title: 'Lalatracker',
    tagline: 'Outcome-focused tracking concept',
    stack: ['Product Design', 'Prototype'],
    outcome:
      'No public repo — tracking model and success metrics, defined without code.',
    status: 'text-only',
    links: [],
  },
]
