/** Curated knowledge for the portfolio chatbot. The bot may ONLY answer from these
 * entries. Edit freely — every answer below is shown to visitors nearly verbatim. */

export interface Answer {
  id: string
  /** Match phrases (lowercase). The route scores questions against these. */
  match: string[]
  text: string
}

export const ANSWERS: Answer[] = [
  {
    id: 'who',
    match: ['who', 'christian', 'about you', 'yourself', 'name', 'introduce'],
    text: 'Christian Meude is a mobile, web & systems developer from the Philippines, open to remote roles and freelance work. He builds the whole system — landing, app, and admin — and ships end to end.',
  },
  {
    id: 'availability',
    match: ['available', 'hire', 'freelance', 'job', 'role', 'work with', 'open to'],
    text: 'Yes — Christian is open to full-time roles, freelance projects, and collaborations. Email is fastest: christianmeude17@gmail.com, or use the contact form on this page to compose a message.',
  },
  {
    id: 'contact',
    match: ['contact', 'email', 'reach', 'github', 'social', 'touch'],
    text: 'Email Christian at christianmeude17@gmail.com, or see his code at github.com/christianmeude. Use the intent + scope picker in the contact section and it will compose the email for you.',
  },
  {
    id: 'stack',
    match: ['stack', 'technologies', 'tech', 'tools', 'languages', 'framework'],
    text: 'Proficient: React, React Native, Expo, TypeScript, Tailwind, Supabase, Git. Familiar: Flutter, Dart, Laravel, Inertia, PostgreSQL, expo-router, expo-sqlite, REST APIs, Vercel, Neon. Foundations from his degree — Java, Python, Kotlin, PHP, Node/Express, MySQL, MongoDB, Firebase — stay in the CV.',
  },
  {
    id: 'nucleus',
    match: ['nucleus', 'capstone', 'research', 'nu-dasma', 'dasmariñas', 'papers'],
    text: 'Nucleus Mobile Capstone is a research app for NU-Dasmariñas (shipped): sign-in, paper discovery, drafts, and faculty reviews on Supabase. Built with Expo, React Native, and Supabase. Repo: github.com/christianmeude/capstone-nucleus-rn.',
  },
  {
    id: 'inea',
    match: ['inea', 'scent', 'booking', 'flutter', 'laravel', 'admin', 'events'],
    text: 'Inea Scents System (shipped) is an end-to-end scent-bar booking system: a brand/landing site, a Flutter customer booking app, and a Laravel + Inertia admin for bookings, packages, and inquiries. Three repos: inea-scents-landing, inea-scents-client, and inea-scents — all on github.com/christianmeude.',
  },
  {
    id: 'budgetrax',
    match: ['budgetrax', 'budget', 'payoff', 'cutoff', 'bills', 'spare'],
    text: 'BudgeTrax (work in progress) is a pay-cutoff budgeting tracker: cutoff allotments, bill payoff, and a to-spare balance. Built with Expo, React Native, and expo-router. Repo: github.com/christianmeude/BudgeTrax.',
  },
  {
    id: 'lalatracker',
    match: ['lalatracker', 'lala', 'delivery', 'earnings', 'ledger', 'sqlite', 'rider', 'lalamove'],
    text: 'Lalatracker (work in progress) is an offline delivery-earnings ledger for riders: peso totals, date filters, a recycle bin with restore, and a wallet ledger — all local via expo-sqlite, verified on an emulator. It rebuilds a native delivery tracker from its recovered data. Repo: github.com/christianmeude/lalatracker.',
  },
  {
    id: 'experience',
    match: ['experience', 'years', 'senior', 'junior', 'background', 'history'],
    text: 'Christian has 4+ years of professional experience across customer-facing and technical support roles (2022–2026), and now builds full-stack mobile and web systems — Expo + Supabase apps to Laravel operations dashboards.',
  },
  {
    id: 'location',
    match: ['where', 'location', 'based', 'philippines', 'remote', 'timezone'],
    text: 'Christian is based in the Philippines and open to remote roles and freelance work worldwide.',
  },
  {
    id: 'education',
    match: ['education', 'study', 'studied', 'school', 'university', 'college', 'degree', 'dean', 'lister', 'honors', 'nu-dasma', 'dlsu'],
    text: "Christian studies BS IT (Mobile & Web) at NU-Dasmariñas (2023–2026) — Dean's Lister, 7 consecutive terms. SHS with High Honors at DLSU-D (2019–2021).",
  },
  {
    id: 'cv',
    match: ['cv', 'resume', 'download'],
    text: 'You can download Christian\u2019s CV with the "Download CV" button in the hero section. If the button is not there, email him at christianmeude17@gmail.com and ask for a copy.',
  },
]

export const REFUSAL =
  'I only answer questions about Christian, his projects, and his work. For anything else, email him at christianmeude17@gmail.com.'
