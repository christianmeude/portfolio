# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters / hiring managers and freelance clients evaluating Christian Meude for roles or project work. Situation: time-constrained scan of selected work on desktop or mobile, then direct contact. Job: verify capability across mobile + web + systems quickly, then email or review code.

Secondary (confirmed open): peers / collaborators reviewing repos and stack depth.

## Product Purpose

Single-page developer portfolio for Christian Meude presenting selected work, background, and contact. Exists to convert a short scan into contact via email or a move to GitHub repos. Success means a recruiter or client views 1–4 projects, follows a real repo link, and emails.

## Positioning

Full-stack developer across mobile, web, and systems — calm, spacious interfaces backed by solid systems, from Expo + Supabase mobile apps to Flutter clients to Laravel + Inertia operations dashboards. End-to-end ownership (landing + client + admin, e.g. Inea Scents) rather than single-surface output.

## Operating Context

Static single-page site with anchored sections: Hero (`#top`), Selected work (`#work`), About (`#about`), Contact footer (`#contact`). Entry `src/main.tsx`, App composition in `src/App.tsx`. Local dev: `npm run dev` (Vite); build: `npm run build` (tsc + vite build). Evaluation happens in browser on desktop and mobile web; no accounts, no backend, `mailto:` is the fastest path.

## Capabilities and Constraints

Confirmed functionality:

- 4 projects defined in `src/data/projects.ts`: Nucleus Mobile Capstone (shipped, Expo/React Native/Supabase), Inea Scents System (shipped, 3 parts: landing / Flutter app / Laravel + Inertia admin), BudgeTrax (WIP, Expo/React Native/expo-router), Lalatracker (text-only concept, no public repo).
- Real links only: repo URLs via GitHub + `mailto:christianmeude17@gmail.com`; empty link lists mean no link is rendered.
- Light/dark theme toggle (`data-theme`), reveal-on-scroll, hero canvas backdrop, responsive stacked mobile / focused desktop layout, 44px minimum touch targets.
- Static deployable SPA; no router, no CMS, no analytics confirmed.

Explicitly undecided / allowed to expand: adding projects, resume/CV, additional socials, or blog sections later. No decision yet on which comes first.

## Brand Commitments

Name: Christian Meude. Voice: minimal, content-first, calm ("Let's build something calm", "Short and to the point"). Confirmed assets: email `christianmeude17@gmail.com`, GitHub `https://github.com/christianmeude`. No binding visual direction recorded in init.

## Evidence on Hand

Real proof in repo: project outcomes + repo links in `src/data/projects.ts`, About capabilities list (`src/components/About.tsx`), contact actions (`src/components/Contact.tsx`). No testimonials, customers, case studies, press, benchmarks, pricing, or deployment claims on hand — future work must not fabricate them.

## Product Principles

1. Proof over claims: every capability ties to a shipped repo or an explicit WIP / concept label.
2. Fast recruiter scan: one idea per viewport, outcomes and links visible without hover.
3. Readable systems: reviewable codebases and accessible defaults over effects.
4. Static and reachable: single page that loads fast and ends in one email action.

## Accessibility & Inclusion

Current defaults (not a certified standard): semantic landmarks (`main`, section labelled headings, footer), visible focus ring, `prefers-reduced-motion` disables smooth scroll/reveal, 44px targets, no hover-dependent information. No product-specific accessibility requirement established beyond keeping these defaults.
