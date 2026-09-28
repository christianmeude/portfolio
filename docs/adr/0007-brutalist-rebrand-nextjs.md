# 0007 — Cream brutalism rebrand on Next.js (Victor IA + YM spice)

Date: 2026-09-27. Supersedes Midnight Chrome (DESIGN.md), ADRs 0001/0003/0004/0006 in part.

## Context

Portfolio converts a short recruiter scan into email/GitHub. Inspiration teardown (2026-09):
both refs are Next.js on Vercel (`*.vercel-dns-017.com`, `/_next/static`, `next/image`).
Victor gives structure (numbered projects, fact-grid About, Proficient/Familiar skills,
Live pills, blog-as-proof, one-email close). YM gives voice (cream `#f5f2ee` + ink
`#0a0a0a`, 3px borders, hard `3px 3px 0` shadows, condensed display + mono labels,
preloader 000/100, marquee, tier cards, booking calc).

## Decision

Full rewrite to Next.js App Router on Vercel, single-page anchors, `next/font` +
`next/image`, static-first. New visual world: cream-first brutalism (dark sections for
contrast only). Condensed display + mono uppercase labels. Motions: preloader + marquee
+ reveal-on-scroll (GSAP/Lenis kept). IA: Hero (badge+outline+stats) / About (fact-grid)
 / Skills (Proficient/Familiar) / Projects (01-04 numbered + Live/WIP pills) /
 Credentials-only-if-real / Contact (intent-select mailto composer) + marquee dividers.
No vanity metrics; stats are honest counts. Contact stays `mailto:` composer — no Resend
until explicitly requested.

## Consequences

Midnight Chrome, One Accent Rule, Flat-By-Default, chrome ambient are retired. Brand-mark
color still never leaves the 18px chip. Repo URLs stay always-visible. 44px targets,
visible focus, `prefers-reduced-motion` freeze remain. Vite files removed on cutover.
