---
name: Christian Meude Portfolio
description: Cream-first brutalist portfolio — badge, proof, contact.
colors:
  paper: "#f5f2ee"
  ink: "#0a0a0a"
  cream: "#f5f2ee"
  soot: "#0a0a0a"
  grey: "#cccccc"
  smoke: "#777777"
  muted-fill: "#444444"
  card-cream: "#FFFFFF"
  card-dark: "#0a0a0a"
  accent-ink: "#0a0a0a"
  on-accent-cream: "#f5f2ee"
typography:
  display:
    fontFamily: "Barlow Condensed, Bebas Neue, Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 12vw, 9rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Barlow Condensed, Archivo, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Barlow Condensed, Archivo, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "Montserrat, Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Mono, system-ui, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.25em"
rounded:
  full: "9999px"
  2xl: "16px"
  xl: "12px"
  device: "35px"
  focus: "4px"
spacing:
  section: "clamp(64px, 10vw, 144px)"
  container: "72rem"
  gutter: "20px"
  gutter-sm: "32px"
  gap: "32px"
  gap-lg: "48px"
components:
  button-primary:
    backgroundColor: "{colors.calm-operations-sky}"
    textColor: "{colors.on-accent-dark}"
    rounded: "{rounded.full}"
    padding: "12px 32px"
  button-secondary:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  stack-chip:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "9px 18px"
  repo-link:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  card-work:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
---

# Design System: Christian Meude Portfolio

## Overview

**Creative North Star: "Cream Brutalism" — ADR 0007.**

Cream first, loud borders, honest proof. The visitor lands on a sticky nav + badge + giant condensed name with an outline surname + info ledger (Location / Status / Email) — then scrolls an About fact-grid, Proficient/Familiar stack cards, numbered projects 01–04 with Live/WIP pills and always-visible repo pills, and ends in an intent-select mailto composer. A marquee strip divides Skills from Projects; a 000/100 preloader opens the page. Every claim resolves to a repo, a WIP label, or an explicit concept tag.

**Key Characteristics:**
- Cream-first neo-brutalism — 3px ink borders, hard `3px 3px 0` shadows, outline display type
- Hero renders settled on first paint — no entrance animation, no stats row
- Numbered project cards carry the evidence, not mockups or carousels
- Three motions only: preloader + marquee + scroll reveal

## Colors

Ink on cream, inverted to cream on ink for the Projects section. No hue accent — contrast is the accent.

### Primary
- **Cream Paper** (#f5f2ee): page ground, hero and section grounds, ghost-button fill.
- **Ink** (#0a0a0a): text, 3px borders, primary-button fill, hard shadows, Projects section ground.

### Neutral
- **Card White** (#FFFFFF): About fact cards, Skills Proficient card, Contact composer cards.
- **Card Ink** (#0a0a0a): Skills Familiar card, project cards sit on the ink section ground.
- **Grey** (#cccccc): muted mono labels on dark, preloader sub-copy.
- **Smoke** (#777777): secondary mono labels on light (ledgers, fact keys), mobile overlay numerals.
- **Coal** (#444444): preloader track, muted fills.

### Named Rules (optional, powerful)
**The Contrast-Is-The-Accent Rule.** No sky blue, no chrome wash. Meaning comes from ink↔cream inversion and border weight, never from a hue accent.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, system-ui fallback)
**Body Font:** Montserrat (with system-ui fallback)
**Label/Mono Font:** Space Mono (with ui-monospace fallback)

**Character:** Oversized condensed uppercase display once per section, calm geometric body, tracked-out mono labels for eyebrows and ledgers. Outline surnames via 3px text-stroke.

### Hierarchy
- **Display** (800, clamp(3.5rem, 10vw, 7.5rem), 0.9): hero name and section closers, uppercase, tight.
- **Headline** (800, 2.5rem rising to 3rem+ on sm, 1.0): section titles (About, Stack, Selected work, Let's build).
- **Title** (700, 2rem, 1.05): project names inside cards.
- **Body** (400, 1rem, 1.6 relaxed): proof lines, outcomes, About copy.
- **Label** (700, 0.72rem, 0.25em tracking, uppercase): eyebrows (`01 — About`), badges, ledger keys, pills.

### Named Rules (optional)
**The Type Does The Work Rule.** Hierarchy comes from size, weight, and whitespace — never from extra colors or decoration.

## Layout

Single-page anchors: Hero (`#top`), About (`#about`), Skills (`#skills`), Projects (`#projects`), Contact footer (`#contact`). Content lives in a centered 72rem container with 20px gutters (32px on sm+), sections padded 64px mobile / 96px desktop.

Hero is a 2-column split on desktop (content left, ink surfaces panel right with 3px left border) and single-column stacked on mobile (static 2-col surfaces grid replaces the desktop vertical loop). About fact-grid is 1 column mobile / 2 columns sm+. Skills is 1 column / 2 columns md. Projects is a vertically stacked card list (`space-y-6`). Contact composer is 1 column / 2 columns md (intent+scope card, details+actions card). Sticky nav carries an 84px anchor offset (`scroll-margin-top`).

## Elevation & Depth

Hard offset shadows only — depth is structural, never ambient glow.

### Shadow Vocabulary (if applicable)
- **Brutal** (`box-shadow: 3px 3px 0 #0a0a0a`): cards, badges, ghost buttons, nav toggle on light grounds.
- **Brutal smoke** (`box-shadow: 3px 3px 0 #555`): primary buttons on light grounds.
- **Press** (translate 2px + collapse to `1px 1px 0`): button hover/active feedback.

### Named Rules (optional)
**The Hard-Shadow-Only Rule.** Surfaces lift by exactly one hard offset. No blur, no glow, no `box-shadow` larger than the 3px grid.

## Shapes

Squared brutal containers, pill actions. Section cards, fact cards, composer cards, and project cards are square (3px ink border, no radius). Buttons are square 3px-bordered bars; chips, repo pills, intent/scope toggles, and stack tags are fully rounded pills (9999px). Focus is a sharp 3px ring with 3px offset (cream ring on the dark Projects ground).

## Components

Honest, tactile, evidence-led. Ink borders everywhere; pills for actions, squares for evidence.

### Buttons
- **Shape:** square bar (3px ink border), 44px minimum height
- **Primary:** ink fill with cream text, smoke hard shadow; hover presses (translate + shadow collapse)
- **Hover / Focus:** press on hover; 3px focus ring with 3px offset on all actions
- **Secondary / Ghost:** cream fill with ink text and ink hard shadow (`btn-ghost-brutal`)

### Chips
- **Style:** pill, 3px border, 44px minimum height, bold 14px label; white pill on light, ink pill with cream text on dark
- **State:** static on Skills; `aria-pressed` ink-fill toggle on Contact intent/scope

### Cards / Containers
- **Corner Style:** square
- **Background:** white cards on cream grounds; ink cards for Familiar skills and all project cards
- **Shadow Strategy:** hard 3px offset — see Elevation & Depth
- **Border:** 3px ink (cream 3px on the dark Projects ground)
- **Internal Padding:** 20–24px mobile, 32–40px on sm+

### Navigation
- Sticky top bar, 3px bottom border, cream ground; wordmark `CM.` in display extrabold. Desktop: numbered links + `Hire me` primary button. Mobile: 44px hamburger opens a fullscreen ink overlay dialog (numbered 48px+ links, `Hire me`, email) with ESC close, focus moved to the close button, body scroll locked. Skip-to-content link on focus.

### Hero
- Badge (`★ Open to roles & freelance`), giant `Christian` + outline `Meude`, one proof line, `View my work` / `Get in touch` / conditional `Download CV` (hidden until `public/cv.pdf` lands). Info ledger below CTAs: Location / Status / Email. Right panel: ink ground, vertical surfaces loop on desktop, static 2-col grid on mobile. No entrance animation, no stats row, no divider marquee in the hero.

### Projects
- Stacked numbered cards 01–04: index numeral, Live/WIP status pill, display title, tagline, outcome line, stack pills, per-part label/detail rows (Inea trio), repo pills with always-visible URLs. No grid, no carousel, no emulators (see ADR-0006 supersede notice).

### Repo Links
- **Style:** pill with 18px GitHub mark, short label, full URL revealed on hover/focus/toggle (expand `+` affordance always visible on touch), copy button with 2s confirmation + live region
- **State:** hover/focus inverts to cream on ink; nothing is hover-only

### Contact + Chatbot
- Contact is an intent-select mailto composer: intent pills (Full-time / Freelance / Collaboration / Hi) + scope pills compose the subject/body of a `mailto:` with a free-text details field; `Compose email` + `GitHub` actions beside the selectable email address. Chatbot answers from curated `lib/answers.ts` via `/api/chat` (Gemini key in env); unconfigured or unmatched questions fall back to the refusal / email redirect, never invented copy.

## Do's and Don'ts

Concrete guardrails grounded in the shipped implementation.

### Do:
- **Do** keep 3px ink borders, hard shadows, and 44px targets on everything interactive.
- **Do** keep repo URLs always visible or one toggle away — never hover-only, never truncated beyond recognition.
- **Do** keep the hero settled on first paint; reserve motion for preloader, marquee, and scroll reveals.
- **Do** freeze all motion under `prefers-reduced-motion` and keep content in its final state.
- **Do** keep landmarks, a visible 3px focus ring, and a skip link.

### Don't:
- **Don't** add a second accent, gradient wash, glow, or shadow outside the 3px hard grid.
- **Don't** add stats, metrics, testimonials, or product copy the repos don't support.
- **Don't** invent mockups, screenshots, emulators, or carousels for projects — cards + repo links are the evidence.
- **Don't** wire the chatbot to anything but the curated answers file; no free-form generation.
- **Don't** replace Barlow Condensed / Montserrat / Space Mono without an explicit rebrand decision.
