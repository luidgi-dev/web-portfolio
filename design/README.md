# design/

This folder is the source of truth for the visual direction of the portfolio. It exists so design decisions are made and documented before any component gets built in `web-portfolio`, not the other way around.

## Contents

```
design/
  inspirations/       reference images collected for the Bento / MCM aesthetic
  design-system.md     the design system spec (tokens, typography, components, QA checklist)
  README.md            this file
```

### `inspirations/`

Reference material used to build the moodboard and lock the aesthetic direction: layout references, color/material studies, typography pairings, and anything else that shaped the MCM Bento Grid direction.

For now this holds saved screenshots (PNGs). More will be added over time.

Note on Pinterest: avoid linking directly to Pinterest posts or pins. Links can break or disappear, and the images themselves aren't ours to redistribute by reference. Save a local copy of the image instead (screenshot or download) and, if useful, add a short caption noting what it was used for (palette, layout, texture, etc). Treat this folder as private working reference, not something meant to be published as-is.

### `design-system.md`

The production-ready design system spec: color tokens, typography scale, spacing/grid rules, component specs, micro-interactions, accessibility requirements, and a QA checklist. This is the document that gets translated into actual code (`globals.css`, `tailwind.config.ts`, component files) in `web-portfolio`.

## How this connects to the code

`web-portfolio` should never invent visual decisions on the fly. The rule is:

1. Visual direction is explored and locked here first (moodboard, references, `design-system.md`).
2. Implementation in `web-portfolio` (tokens, components, layout) follows what's written here.
3. If something needs to change during implementation (a token doesn't work in practice, a component needs an addition), update `design-system.md` first, then the code, so this folder stays the accurate reference rather than going stale.

In short: `design/` is the why and what, `web-portfolio` is the how.