# Dark-first, light frozen

The redesign targets dark as the default theme, but keeps the existing light tokens and toggle instead of going dark-only. Rationale: the toggle and light system already ship and some visitors prefer light, while every new surface (chrome, mockups, chips) is designed against dark. Light stays exactly as it was until a dedicated retune pass — see the Don't list in DESIGN.md.

## Considered Options

- **Dark-only**: smaller CSS, single truth — rejected because it deletes a working visitor preference for no proof gain.
- **Full dual-theme redesign**: rejected as double the scope; the brief asked for dark-first.
