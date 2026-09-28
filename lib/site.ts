export const EMAIL = 'christianmeude17@gmail.com'
export const GITHUB_PROFILE = 'https://github.com/christianmeude'

export type ProjectStatus = 'shipped' | 'wip' | 'concept'

export interface Project {
  slug: string
  index: string
  title: string
  tagline: string
  stack: string[]
  outcome: string
  status: ProjectStatus
  statusLabel: string
  links: { label: string; url: string }[]
  parts?: { label: string; detail: string; url?: string }[]
}

function gh(url: string): string {
  return url.endsWith('.git') ? url.slice(0, -4) : url
}

export const PROJECTS: Project[] = [
  {
    slug: 'nucleus-mobile',
    index: '01',
    title: 'Nucleus Mobile Capstone',
    tagline: 'Research app for NU-Dasmariñas',
    stack: ['Expo', 'React Native', 'Supabase'],
    outcome: 'Shipped with sign-in, paper discovery, drafts, and faculty reviews on Supabase.',
    status: 'shipped',
    statusLabel: 'Live',
    links: [
      { label: 'Repository', url: gh('https://github.com/christianmeude/capstone-nucleus-rn.git') },
    ],
  },
  {
    slug: 'inea-scents',
    index: '02',
    title: 'Inea Scents System',
    tagline: 'Scent-bar bookings for events',
    stack: ['Landing', 'Flutter App', 'Laravel + Inertia Admin'],
    outcome: 'Landing, Flutter app, and Laravel admin — shipped end to end.',
    status: 'shipped',
    statusLabel: 'Live',
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
    index: '03',
    title: 'BudgeTrax',
    tagline: 'Pay-cutoff budgeting tracker',
    stack: ['Expo', 'React Native', 'expo-router'],
    outcome: 'Cutoff allotments, bill payoff, and a to-spare balance.',
    status: 'wip',
    statusLabel: 'WIP',
    links: [{ label: 'Repository', url: gh('https://github.com/christianmeude/BudgeTrax.git') }],
  },
  {
    slug: 'lalatracker',
    index: '04',
    title: 'Lalatracker',
    tagline: 'Offline delivery-earnings ledger',
    stack: ['Expo', 'expo-router', 'expo-sqlite'],
    outcome:
      'Expo rebuild of a native delivery tracker: peso totals, date filters, recycle bin, and wallet ledger — offline, verified on emulator.',
    status: 'wip',
    statusLabel: 'WIP',
    links: [{ label: 'Repository', url: gh('https://github.com/christianmeude/lalatracker.git') }],
  },
]

export function resolveLinks(p: Project): { label: string; url: string }[] {
  if (p.links.length > 0) return p.links
  return p.parts?.filter((x) => x.url).map((x) => ({ label: x.label, url: x.url as string })) ?? []
}

export const SURFACES = [
  'Mobile apps',
  'Flutter apps',
  'Admin dashboards',
  'Landing sites',
  'Supabase backends',
  'Offline-first SQLite',
  'REST APIs',
  'EAS builds',
  'Design systems',
  'Expo Router apps',
]

export const PROFICIENT = [
  'React',
  'React Native',
  'Expo',
  'TypeScript',
  'Tailwind',
  'Supabase',
  'Git',
]
export const FAMILIAR = ['Flutter', 'Dart', 'Laravel', 'Inertia', 'PostgreSQL', 'Vercel', 'Neon']

export const FACTS = [
  { k: 'Focus', v: 'Mobile, web & systems — Expo + Supabase apps to Laravel operations dashboards' },
  { k: 'Location', v: 'Philippines — open to remote roles and freelance' },
  { k: 'Contact', v: EMAIL },
  { k: 'Proof', v: 'Every claim resolves to a repo, a WIP label, or an explicit concept tag' },
]
