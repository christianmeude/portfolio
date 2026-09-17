# Light is first-class

Supersedes the freeze clause of `0001-dark-first-light-frozen.md`: light is no
longer "exactly as it was" — it is retuned and held to the same bar as dark.
Dark remains the default; the toggle and both token sets stay.

## What changed

- **Chrome dimmed, not redesigned** (`src/index.css`): the same three blobs and
  sheen render at roughly half opacity under `[data-theme="light"]`
  (0.16 / 0.14 / 0.12 + sheen at 0.5). Same shapes, less ink.
- **Tokens verified, hue untouched**: Calm Operations Blue `#1E40AF` stays the
  light accent (8.36:1 on paper). Spot-checks: muted `#334155` 9.92:1 on paper,
  10.35:1 on card; accent 7.35:1 on muted fills; white on accent 8.72:1.
  All AA, most AAA.
- **No-flash init** (`index.html`): a pre-paint script reads `meude-theme`
  (same key as `useTheme`) so stored-light visitors never flash dark.

## Deliberately untouched

- **Emulator screens** keep their app-brand palettes (Navy/gold, plum/cream,
  near-black/violet) — they are evidence of the real surfaces, verified
  theme-independent (inline-style palettes, no portfolio vars).
- **Device hardware** keeps its dark photorealistic bezel in both themes —
  it depicts a physical object (Flat-By-Default exemption in DESIGN.md).
- **Frames and surrounds** (`frames.tsx`, Lalatracker wireframe) use portfolio
  vars and adapt automatically — no code needed.

## Considered options

- **Near-flat light (no chrome)**: rejected — the toggle would feel like a
  different site; dimmed wash keeps Midnight Chrome identity.
- **New light accent hue**: rejected as a rebrand decision, not a retune.
- **Recoloring emulator screens for light**: rejected — falsifies evidence.
