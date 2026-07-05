# design/

This folder is the source of truth for the visual direction of the portfolio. It exists so design decisions are made and documented before any component gets built in `web-portfolio`, not the other way around.

## Contents

```
design/
  inspirations/          layout, palette, and typography reference screenshots
  moodboards/            four ambiance boards (one folder per theme)
    white-plaster/       01 · Plâtre Blanc (light)
    terracota-sand/      02 · Sable Terracotta (light)
    amber-chocolate/     03 · Chocolat Ambré (dark, default)
    oxblood-night/       04 · Oxblood Nuit (dark)
  design-system.md       tokens, typography, components, multi-theme spec
  README.md              this file
```

### `inspirations/`

Reference material for layout, color studies, typography pairings, and MCM interior architecture. Saved as local PNG/JPEG copies (not hotlinked Pinterest URLs).

### `moodboards/`

One folder per ambiance. Each moodboard defines the palette, typography pairing, and component tone for that theme. Token values are transcribed into [`web-portfolio/app/styles/tokens/themes.css`](../web-portfolio/app/styles/tokens/themes.css).

### `design-system.md`

Production-ready spec: four interchangeable ambiances, Shadcn-compatible CSS variables, extended MCM tokens, typography, bento grid, components, and QA checklist.

## Multi-theme architecture

The portfolio uses **four CSS theme classes** (`.theme-01` … `.theme-04`) applied on `<html>`. Same components, same typography, different warm interior palettes.

| Class | Ambiance | Mode |
|-------|----------|------|
| `.theme-01` | Plâtre Blanc | light |
| `.theme-02` | Sable Terracotta | light |
| `.theme-03` | Chocolat Ambré | dark (default) |
| `.theme-04` | Oxblood Nuit | dark |

Local testing: `ThemeSelector` bento cell on the homepage switches themes and persists choice in `localStorage` (`mcm-theme`).

## How this connects to the code

`web-portfolio` should never invent visual decisions on the fly. The rule is:

1. Visual direction is explored and locked here first (moodboards, references, `design-system.md`).
2. Implementation in `web-portfolio` (tokens in `themes.css`, components, layout) follows what's written here.
3. If something needs to change during implementation (a token doesn't work in practice, contrast fails WCAG), update `design-system.md` and moodboards first, then the code.

In short: `design/` is the why and what, `web-portfolio` is the how.
