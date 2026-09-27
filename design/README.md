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
  mockups/               standalone HTML mockups to compare design directions
  design-system.md       tokens, typography, components, multi-theme spec
  README.md              this file
```

### `inspirations/`

Reference material for layout, color studies, typography pairings, and MCM interior architecture. Saved as local PNG/JPEG copies (not hotlinked Pinterest URLs).

### `moodboards/`

One folder per ambiance. Each moodboard defines the palette, typography pairing, and component tone for that theme. Token values are transcribed into [`web-portfolio/app/styles/tokens/themes.css`](../web-portfolio/app/styles/tokens/themes.css).

### `mockups/`

Throwaway-looking but kept on purpose: standalone HTML pages used to compare design directions before building them in `web-portfolio`. They link the real token and material CSS from `web-portfolio/app/styles/`, so open them straight in a browser (no server needed) and they follow the site's four themes.

- [`modal-directions.html`](mockups/modal-directions.html): the three MCM directions explored for the project modal (Nelson sideboard, Case Study House, Brass pill mirror), with a control bar to switch direction, theme, and tab style. Deep links such as `?variant=csh&theme=theme-01&tabs=folder&tab=technical&open` open a given state directly.
- [`case-study-blocks.html`](mockups/case-study-blocks.html): the reusable case study blocks (section heading, key figures, numbered sequence, stack, before/after diagram, short list) with the real Strive copy. Pass 1 compared three MCM directions (A Tiles, B Drawing set, C Design guide); the design guide won, and pass 2 adds two material variants (C2 Material, C3 Quiet, single hue). Pass 3 (`dir=p3`, the default view) consolidates the kept choices and compares alternatives only where the decision is open (headings, diagrams). Deep links: `?dir=p3&theme=theme-01&only=momentum` (`dir` is `p3`, `all`, `c`, `c2`, `c3`, or `a` / `b` for the set-aside directions; `only` shows a single block).

To start a new one, brainstorm a few directions by rereading `inspirations/` and `moodboards/` (the more complete they are, the better the ideas), then put them side by side in one page. Only the winning direction gets built.

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
