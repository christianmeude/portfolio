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
    tagline: 'Research app for NU-Dasmariñas',
    stack: ['Expo', 'React Native', 'Supabase'],
    outcome:
      'Shipped with sign-in, paper discovery, drafts, and faculty reviews on Supabase.',
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
    tagline: 'Scent-bar bookings for events',
    stack: ['Landing', 'Flutter App', 'Laravel + Inertia Admin'],
    outcome:
      'Landing, Flutter app, and Laravel admin — shipped end to end.',
    status: 'shipped',
    links: [],
    parts: [
      {
        label: 'Landing',
        detail: 'Brand and inquiry site',
        url: gh('https://github.com/christianmeude/inea-scents-landing.git'),
      },
      {
        label: 'Flutter App',
        detail: 'Customer booking app',
        url: gh('https://github.com/christianmeude/inea-scents-client.git'),
      },
      {
        label: 'Admin',
        detail: 'Bookings, packages, inquiries. Polling, no realtime',
        url: gh('https://github.com/christianmeude/inea-scents.git'),
      },
    ],
  },
  {
    slug: 'budgetrax',
    title: 'BudgeTrax',
    tagline: 'Pay-cutoff budgeting tracker',
    stack: ['Expo', 'React Native', 'expo-router'],
    outcome:
      'Cutoff allotments, bill payoff, and a to-spare balance.',
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
    tagline: 'Outcome-based tracking concept',
    stack: ['Product Design', 'Prototype'],
    outcome:
      'Tracking model and metrics, no code yet.',
    status: 'text-only',
    links: [],
  },
]
