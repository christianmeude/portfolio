---
name: Christian Meude Portfolio
description: Dark-first chrome portfolio — name, proof, contact.
colors:
  paper: "#08080A"
  ink: "#FAFAFA"
  card-dark: "#101014"
  mist-dark: "#1A1A20"
  slate-light: "#CBD5E1"
  hairline-dark: "#26262E"
  calm-operations-sky: "#60A5FA"
  on-accent-dark: "#08080A"
  chrome-silver: "#C3CCD9"
  chrome-steel: "#67718A"
  paper-light: "#FAFAFA"
  ink-light: "#09090B"
  calm-operations-blue: "#1E40AF"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.2em"
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

**Creative North Star: "Midnight Chrome"**

Dark first, minimal text, proof you can see. The visitor lands on a name dead center over slow liquid chrome — then scrolls into a carousel where each project shows its actual surface in a device frame, a stack section wearing real brand marks, and one email action to end it. Every claim resolves to a repo, a mockup of the real surface, or an honest label (WIP, concept, text-only).

The chrome is atmosphere, never content: fixed behind everything, frozen under reduced-motion, invisible to assistive tech. Type stays Archivo display against Space Grotesk body; the single blue accent survives the dark shift as sky. Shadows still don't exist — depth comes from the chrome glow and hairline borders.

**Key Characteristics:**
- Dark-first minimalism — name, proof, contact
- Device mockups carry the evidence, not paragraphs
- Fixed liquid-chrome ambient, calm and slow
- One accent, real brand marks, no invented claims

## Colors

Near-black paper with silvery chrome and a single sky accent.

### Primary
- **Calm Operations Sky** (#60A5FA): primary actions, eyebrows, focus, live-sync dots on dark. Light theme keeps Calm Operations Blue (#1E40AF); light is frozen, scheduled for retune.

### Secondary (optional; omit if the project has only one accent)
- **Chrome Silver** (#C3CCD9): the light edge of the metallic washes — ambient only, never text or actions.
- **Chrome Steel** (#67718A): the dark edge of the metallic washes — ambient only.

### Neutral
- **Paper** (#08080A): dark page background; light theme Paper Light (#FAFAFA, frozen).
- **Ink** (#FAFAFA): dark foreground text; light theme Ink Light (#09090B, frozen).
- **Card Dark** (#101014): cards, chips, repo links, frames on dark.
- **Mist Dark** (#1A1A20): muted fills and mockup bars on dark.
- **Slate Light** (#CBD5E1): secondary body copy on dark.
- **Hairline Dark** (#26262E): all borders and dividers on dark.
- **On-Accent Dark** (#08080A): text on sky actions.

### Named Rules (optional, powerful)
**The One Accent Rule.** Sky blue is the sole meaningful accent. Chrome silvers never carry meaning, and brand-mark colors stay inside their 18px chips.

## Typography

**Display Font:** Archivo (with system-ui, -apple-system, Segoe UI fallback)
**Body Font:** Space Grotesk (with system-ui, -apple-system, Segoe UI fallback)

**Character:** Oversized centered display once (the name), then quiet confident headlines. Body copy is cut to proof lines — one outcome sentence per project, two lines of About.

### Hierarchy
- **Display** (800, clamp(3rem, 10vw, 8rem), 0.95): hero name only, centered, balanced.
- **Headline** (700, 2.25rem rising to 3rem on sm, 1.1): section titles (Selected work, Stack, About, Contact).
- **Title** (700, 1.875rem rising to 2.25rem / 3rem, 1.2 tight): carousel project titles.
- **Body** (400, 1rem, 1.6 relaxed): proof lines, About lines, part details.
- **Label** (600, 0.875rem, 0.2em tracking, uppercase): eyebrows and card index lines.

### Named Rules (optional)
**The Type Does the Work Rule.** Hierarchy comes from size, weight, and whitespace — never from extra colors or decoration.

## Layout

Centered hero filling the first viewport (name, profession line, one CTA). Work is a horizontal snap carousel: one slide per view, full-bleed track with container padding, arrows beside the section title, dots below, screen-reader announcements on change. Standard slides split mockup / text in two columns on desktop (70vh minimum); the Inea slide stacks its device trio above a two-column text row. Stack groups Tech then Tools in wrapping rows. About is centered text. All inside a 72rem container with 20px gutters (32px on sm+), breathing on the fluid section rhythm (`clamp(64px, 10vw, 144px)`).

## Elevation & Depth

Flat surfaces over a glowing depth. Cards, chips, and frames stay shadowless with 1px hairline borders; the sense of depth comes from the blurred chrome layer fixed behind everything — never from `box-shadow`. Chrome wash gradients blend freely between Chrome Silver (#C3CCD9) and Chrome Steel (#67718A); intermediate stops are atmosphere, not tokens.

### Named Rules (optional)
**The Flat-By-Default Rule.** Surfaces stay flat. The only lift is a 2px rise on the primary action; everything else changes border color, never shadow. The chrome may glow; components may not.

## Shapes

Pills for actions, soft rectangles for evidence, tall rounds for devices. Primary/secondary actions, stack chips, repo links, and carousel arrows are fully rounded pills (9999px). Work slides are large soft rectangles (16px); browser mockups smaller ones (12px); phone frames tall rounds (~35px outer, ~27px screen). Focus is a sharp 3px ring with 3px offset and 4px corner.

## Components

Dark, restrained, evidence-led. Brand-mark color lives only inside stack chips.

### Buttons
- **Shape:** fully rounded pill (9999px)
- **Primary:** sky fill with near-black text, 32px horizontal / 12px vertical padding, 44px minimum height, semibold; hover lifts 2px
- **Hover / Focus:** primary lifts on hover; all actions show a 3px sky focus ring with 3px offset; secondary shifts border to accent
- **Secondary / Ghost / Tertiary (if applicable):** card fill with hairline border and ink text (copy-email, carousel arrows, GitHub)

### Chips
- **Style:** card fill, ink text, hairline border, pill shape, 44px minimum height, 0.95rem medium label; 18px brand mark in brand color (near-black marks resolve to foreground) or an 18px initials tile (5px radius, 10px bold accent type on muted)
- **State:** static only — no selected/unselected treatment

### Cards / Containers
- **Corner Style:** large soft rectangle (16px)
- **Background:** card surface over the fixed chrome
- **Shadow Strategy:** none — see Elevation & Depth
- **Border:** 1px hairline
- **Internal Padding:** 24px mobile, 40px on sm+

### Repo Links
- **Style:** pill with 16px GitHub mark and short label (surface name); on fine-pointer hover or keyboard focus the label swaps for the full `github.com/…` URL truncated to 240px; on touch the full URL always shows
- **State:** hover shifts border and text to accent; nothing is hover-only — touch and keyboard always reach the URL

### Navigation
- Sticky top header, 64px height, blurred paper at 90% with hairline bottom border. Wordmark `CM.` in Archivo extrabold 18px with accent period. Work / About / Contact always visible at 44px targets, tighter tracking on mobile. Theme toggle is a 44px pill with sun/moon glyph and `aria-pressed`. Skip-to-content link appears on focus in accent fill. Footer repeats contact actions with a hairline top rule, copyright line, and back-to-top link.

### Carousel
- Scroll-snap track (`x mandatory`, hidden scrollbar), one full-width slide per view, arrow buttons (44px pills) beside the title, 44px dot tabs below with `aria-selected`, polite live-region announcement of the current project. No autoplay.

### Device Mockups
- **Phone:** 230–250px frame, ~35px outer radius, island notch, home indicator; `role="img"` with a named label so readers hear one summary, not bars
- **Browser (laptop/desktop):** traffic dots plus URL pill, 12px radius; desktop variant wider (fluid in trios)
- **Scenes:** abstract bars, pills, and live dots with real product words (surface names, statuses); micro-type (10–13px) is reserved for mockup screens and never appears in page content; wireframe dashed treatment reserved for unbuilt concepts (Lalatracker)

## Do's and Don'ts

Concrete guardrails grounded in the shipped implementation.

### Do:
- **Do** keep the hero to name, profession, one action — nothing else above the fold.
- **Do** give every project a mockup of its real surface; wireframe treatment only for concepts.
- **Do** keep repo URLs reachable on touch and keyboard, never hover-only.
- **Do** freeze chrome motion under `prefers-reduced-motion` and keep the static wash.
- **Do** keep landmarks, a visible 3px focus ring, and 44px targets on everything interactive.

### Don't:
- **Don't** add a second accent or let brand-mark colors leak outside chips.
- **Don't** add shadows, autoplay, or hover-dependent information.
- **Don't** invent screenshots, metrics, testimonials, or product copy the repos don't support.
- **Don't** put light-theme work in this pass — light tokens are frozen until the retune.
- **Don't** replace Archivo / Space Grotesk or introduce a third family without an explicit rebrand decision.
