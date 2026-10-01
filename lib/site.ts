export const EMAIL = 'christianmeude17@gmail.com'
export const GITHUB_PROFILE = 'https://github.com/christianmeude'

export type ProjectStatus = 'testing' | 'prelaunch' | 'wip' | 'concept'

export interface Project {
  slug: string
  index: string
  title: string
  tagline: string
  stack: string[]
  outcome: string
  status: ProjectStatus
  statusLabel: string
  /** Full CV status string, shown as a subtitle line when present. */
  statusDetail?: string
  links: { label: string; url: string }[]
  parts?: { label: string; detail: string; url?: string; liveUrl?: string }[]
}

function gh(url: string): string {
  return url.endsWith('.git') ? url.slice(0, -4) : url
}

export const PROJECTS: Project[] = [
  {
    slug: 'nucleus-mobile',
    index: '01',
    title: 'NUcleus Mobile',
    tagline: 'Capstone research app for NU-Dasmariñas',
    stack: ['Expo', 'React Native', 'TypeScript', 'Supabase'],
    outcome:
      'Browse and submit research with a faculty review queue (approve, reject, or request revisions), status tracking, co-author invitations, and publication requests with DOI assignment. Documented with a domain glossary, design system, and product spec.',
    status: 'testing',
    statusLabel: 'In testing',
    statusDetail: 'Capstone, solo-built · In testing, defense pending',
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
    outcome: 'Landing, Flutter app, and Laravel admin — delivered end to end, pre-launch. Customer checkout via PayMongo in test mode.',
    status: 'prelaunch',
    statusLabel: 'Pre-launch',
    statusDetail: 'Client booking platform · Delivered, pre-launch',
    links: [],
    parts: [
      {
        label: 'Landing',
        detail: 'Brand and inquiry site',
        url: gh('https://github.com/christianmeude/ineascents-landing.git'),
        liveUrl: 'https://ineascents.vercel.app',
      },
      {
        label: 'Flutter App',
        detail: 'Customer booking app',
        url: gh('https://github.com/christianmeude/ineascents-app.git'),
        liveUrl: 'https://ineascents-app.vercel.app',
      },
      {
        label: 'Admin',
        detail: 'Bookings, packages, inquiries.',
        url: gh('https://github.com/christianmeude/ineascents-backend.git'),
      },
    ],
  },
  {
    slug: 'budgetrax',
    index: '03',
    title: 'BudgeTrax',
    tagline: 'Pay-cutoff budgeting tracker',
    stack: ['Expo', 'React Native', 'expo-router'],
    outcome: 'Cutoff allotments, bill payoff, due-date calendar, and a to-spare balance.',
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
      'Expo rebuild of a native delivery tracker: peso totals, date filters, recycle bin with restore, and wallet ledger — offline, verified on emulator.',
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
  'React Native',
  'Expo',
  'EAS Build',
  'Flutter',
  'Dart',
  'JavaScript',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'HTML/CSS',
  'Laravel',
  'PHP',
  'Inertia',
  'Supabase',
  'PostgreSQL',
  'Git',
  'Vercel',
  'Render',
]
export const FAMILIAR = ['Next.js', 'REST APIs', 'expo-sqlite', 'Node.js/Express', 'Java', 'Python', 'MySQL', 'Firebase']

export const FACTS = [
  { k: 'Focus', v: 'Mobile, web & systems — Expo + Supabase apps to Laravel operations dashboards' },
  { k: 'Location', v: 'Philippines — open to remote roles and freelance' },
  { k: 'Education', v: "BS IT Mobile & Web, NU-Dasmariñas — Dean's Lister, 10 consecutive terms (expected 2026)" },
  { k: 'Contact', v: EMAIL },
]
