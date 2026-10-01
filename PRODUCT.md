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

Next.js App Router single-page site with anchored sections: Hero (`#top`), About (`#about`), Skills (`#skills`), Projects (`#projects`), Contact footer (`#contact`). Entry `app/page.tsx`, layout in `app/layout.tsx`. Local dev: `npm run dev` (Next); build: `npm run build` (Next). Deploy: Vercel static-first. Evaluation happens in browser on desktop and mobile web; no accounts, intent-select `mailto:` composer is the fastest path. The only server surface is `/api/chat` (chatbot answers from the curated `lib/answers.ts`, key in env).

## Capabilities and Constraints

Confirmed functionality:

- 4 projects defined in `lib/site.ts`: NUcleus Mobile (in testing, Expo/React Native/TypeScript/Supabase), Inea Scents System (delivered, pre-launch, 3 parts: landing / Flutter app / Laravel + Inertia admin), BudgeTrax (WIP, Expo/React Native/expo-router), Lalatracker (WIP, Expo/expo-router/expo-sqlite offline ledger).
- Real links only: repo URLs via GitHub + `mailto:christianmeude17@gmail.com`; empty link lists mean no link is rendered.
- Cream-first brutalism: 3px ink borders, hard shadows, marquee dividers, responsive stacked mobile / split desktop hero, 44px minimum touch targets.
- Static-first Next.js on Vercel; no CMS, no analytics confirmed. Server code is limited to the `/api/chat` chatbot route.

Explicitly undecided / allowed to expand: adding projects, resume/CV, additional socials, or blog sections later. No decision yet on which comes first.

## Brand Commitments

Name: Christian Meude. Voice: minimal, content-first, calm ("Let's build something calm", "Short and to the point"). Confirmed assets: email `christianmeude17@gmail.com`, GitHub `https://github.com/christianmeude`. No binding visual direction recorded in init.

## Evidence on Hand

Real proof in repo: project outcomes + repo links in `lib/site.ts`, About fact-grid (`components/About.tsx`), contact composer (`components/Contact.tsx`). No testimonials, customers, case studies, press, benchmarks, pricing, or deployment claims on hand — future work must not fabricate them.

## Product Principles

1. Proof over claims: every capability ties to a deployed repo or an explicit testing / pre-launch / WIP label.
2. Fast recruiter scan: one idea per viewport, outcomes and links visible without hover.
3. Readable systems: reviewable codebases and accessible defaults over effects.
4. Static and reachable: single page that loads fast and ends in one email action.

## Accessibility & Inclusion

Current defaults (not a certified standard): semantic landmarks (`main`, section labelled headings, footer), visible focus ring, `prefers-reduced-motion` disables smooth scroll/reveal, 44px targets, no hover-dependent information. No product-specific accessibility requirement established beyond keeping these defaults.
