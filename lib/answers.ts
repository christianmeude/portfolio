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
    text: 'Christian Meude is a mobile, web & systems developer from the Philippines, open to remote roles and freelance work. He builds the whole system — landing, app, and admin — building and deploying end to end.',
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
    text: 'Proficient: React Native, Expo, EAS Build, Flutter, Dart, JavaScript, TypeScript, React, Tailwind CSS, HTML/CSS, Laravel, PHP, Inertia, Supabase, PostgreSQL, Git, Vercel, Render. Familiar: Next.js, REST APIs, expo-sqlite, Node.js/Express, Java, Python, MySQL, Firebase.',
  },
  {
    id: 'nucleus',
    match: ['nucleus', 'capstone', 'research', 'nu-dasma', 'dasmariñas', 'papers', 'live', 'testing', 'defense', 'pending'],
    text: 'NUcleus Mobile is a solo-built capstone research app for NU-Dasmariñas students and faculty — in testing, defense pending. It covers research browsing and submission, a faculty review queue (approve, reject, or request revisions), status tracking, co-author invitations, and publication requests with DOI assignment. Built with Expo, React Native, TypeScript, and Supabase; repo: github.com/christianmeude/capstone-nucleus-rn.',
  },
  {
    id: 'inea',
    match: ['inea', 'scent', 'booking', 'flutter', 'laravel', 'admin', 'events', 'live', 'website', 'delivered', 'prelaunch', 'test', 'paymongo'],
    text: 'Inea Scents System is a client booking platform, delivered and pre-launch: a landing site with inquiry form (live at ineascents.vercel.app), a Flutter customer app with packages, time slots, and checkout (live at ineascents-app.vercel.app, PayMongo in test mode), and a Laravel + Inertia admin/API for bookings, packages, and inquiries. Three repos: ineascents-landing, ineascents-app, and ineascents-backend on github.com/christianmeude.',
  },
  {
    id: 'budgetrax',
    match: ['budgetrax', 'budget', 'payoff', 'cutoff', 'bills', 'spare'],
    text: 'BudgeTrax (work in progress) is a pay-cutoff budgeting tracker: cutoff allotments, bill payoff, a due-date calendar, and a to-spare balance. Built with Expo, React Native, and expo-router. Repo: github.com/christianmeude/BudgeTrax.',
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
    text: "Christian studies BS IT (Mobile & Web) at NU-Dasmariñas (2023–2026, expected 2026) — Dean's Lister, 10 consecutive terms. SHS with High Honors at DLSU-D (2019–2021).",
  },
  {
    id: 'overview',
    match: ['projects', 'project', 'live', 'shipped', 'built', 'builds', 'portfolio', 'websites', 'status', 'wip', 'deployed', 'testing', 'prelaunch', 'defense'],
    text: 'Christian has 4 projects: NUcleus Mobile (capstone, solo-built — in testing, defense pending) and the Inea Scents System (delivered, pre-launch) — the Inea landing site is live at ineascents.vercel.app and its booking app at ineascents-app.vercel.app. BudgeTrax and Lalatracker are work in progress, and all code is on github.com/christianmeude.',
  },
  {
    id: 'certifications',
    match: ['certification', 'certifications', 'certified', 'certificate', 'credly', 'credential', 'packet', 'tracer'],
    text: 'Christian holds IT Specialist — HTML and CSS (Certiport, Jun 2026) and Introduction to Packet Tracer (Cisco, Jun 2025), both verifiable on Credly — see the Certifications section on this page.',
  },
  {
    id: 'services',
    match: ['service', 'services', 'offer', 'offers', 'process', 'engage', 'pricing', 'cost', 'timeline'],
    text: 'Christian takes full-time roles, freelance projects, and collaborations across mobile apps, web apps, and systems. Pick an intent and scope in the contact section and it composes the email for you.',
  },
  {
    id: 'cv',
    match: ['cv', 'resume', 'download'],
    text: 'You can download Christian\u2019s CV with the "Download CV" button in the hero section. If the button is not there, email him at christianmeude17@gmail.com and ask for a copy.',
  },
]

export const REFUSAL =
  'I only answer questions about Christian, his projects, and his work. For anything else, email him at christianmeude17@gmail.com.'
