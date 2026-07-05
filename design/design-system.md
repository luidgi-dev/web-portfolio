# Design System — Portfolio MCM
**Mid-Century Modern · Bento Grid · Warm Ambiances**
*Version 0.2 — July 2025*

---

## Aesthetic Direction

The portfolio draws from **Mid-Century Modern** interiors (1950s–70s) — not generic SaaS design. Guiding idea: a showcase space that feels like an Eames apartment, not a Notion dashboard. Warmth, texture, material, controlled proportions.

**Visual references:** teak and walnut furniture, aged cognac leather, polished brass, Nelson lamps, Danish sideboards, Bauhaus geometry, warm golden light.

**What we absolutely avoid:**
- SaaS blue `#0066FF` or purple
- White cards on gray backgrounds
- "Rocket" or "AI brain" icons
- Magenta/cyan gradients
- Overused Google Fonts: IBM Plex, Space Grotesk, Bebas Neue

---

## Ambiance System — 4 MCM Tones

The portfolio offers 4 interchangeable ambiances via a "timeline" selector. Same aesthetic, same typographic logic — only the tones change. From lightest to deepest.

```
○━━━━●━━━━○━━━━○
01    02    03    04
```

| # | Name | Background | Primary | Interior Inspiration |
|---|------|-----------|---------|----------------------|
| **01** | White Plaster | `#F4EFE6` | `#6B8060` Sage | Mediterranean white, arches, linen |
| **02** | Terracotta Sand | `#F5EAD8` | `#C4472A` Terracotta | Moroccan kitchen, sand tadelakt |
| **03** | Amber Chocolate | `#271608` | `#C8963E` Brass | MCM living room, olive sofa, pendant light |
| **04** | Oxblood Night | `#160606` | `#922828` Oxblood | Burgundy bathroom, tiling, aged brass |

### React / CSS Implementation

Themes are defined in [`web-portfolio/app/styles/tokens/themes.css`](../web-portfolio/app/styles/tokens/themes.css) as four CSS classes:

| Class | Ambiance | Mode | Default |
|-------|----------|------|---------|
| `.theme-01` | Plâtre Blanc | light | |
| `.theme-02` | Sable Terracotta | light | |
| `.theme-03` | Chocolat Ambré | dark | yes |
| `.theme-04` | Oxblood Nuit | dark | |

Apply the active class on `<html>`. Shadcn components read standard tokens (`--background`, `--primary`, etc.) automatically. Extended MCM tokens (`--glow-color`, `--ornament-color`, `--project-gradient`, `--art-*`) are theme-scoped for decoration and future project cards.

```tsx
// ThemeProvider (web-portfolio/components/theme-provider.tsx)
// - Applies .theme-01 … .theme-04 on document.documentElement
// - Persists choice in localStorage (key: mcm-theme)
// - Default: theme-03 (Chocolat Ambré)
```

Each theme block defines:

- **Shadcn standard tokens**: `--background`, `--card`, `--foreground`, `--primary`, `--border`, `--ring`, etc.
- **Extended MCM tokens**: `--glow-color`, `--glow-color-strong`, `--ornament-color`, `--card-frosted`, `--project-gradient`, `--tech-bg-start`, `--art-*`, …

Transition on theme switch: `background-color 0.55s ease`, `color 0.4s ease` on `<html>`.

### Ambiance Selector

`ThemeSelector` lives inside a bento cell (2×2 grid of swatches) for local testing and contrast validation:

```tsx
<BentoCard label="Ambiance">
  <ThemeSelector />
</BentoCard>
```

Each swatch shows the theme primary color, number, and localized name. Active state: `border-primary`, `bg-primary/5`, focus ring. Layout is flexible (timeline or bento grid); current implementation uses a compact 2×2 square.

Reference moodboards: [`design/moodboards/`](moodboards/) (one folder per ambiance).

---

## Colors

Token values are **per theme** (see `themes.css`). Below: summary per ambiance. Full values live in code and moodboards.

### 01 · Plâtre Blanc (light)

| Token | Hex | Notes |
|-------|-----|-------|
| `--background` | `#F4EFE6` | Mediterranean plaster |
| `--primary` | `#6B8060` | Sage green |
| `--foreground` | `#2A1E0E` | Dark espresso text |
| `--border` | `rgba(107,128,96,0.20)` | Sage hairline |

Accents: Honey `#A07840`, Stone `#C4B090`, Olive `#7A9070`.

### 02 · Sable Terracotta (light)

| Token | Hex | Notes |
|-------|-----|-------|
| `--background` | `#F5EAD8` | Warm sand |
| `--primary` | `#C4472A` | Terracotta |
| `--foreground` | `#2C1408` | Dark walnut text |
| `--accent` | `#5A6B30` | Olive green |
| `--border` | `rgba(196,71,42,0.16)` | Terracotta hairline |

Accents: Sunset `#D4892A`, Chile Rojo `#A03020`.

### 03 · Chocolat Ambré (dark, default)

| Token | Hex | Notes |
|-------|-----|-------|
| `--background` | `#271608` | MCM lounge |
| `--primary` | `#C8963E` | Brass gold |
| `--foreground` | `#F0E2C8` | Warm cream |
| `--accent` | `#9B6240` | Cognac leather |
| `--border` | `rgba(200,150,62,0.16)` | Brass hairline |

Accents: Mustard `#D4892A`, Olive `#4A5828`.

### 04 · Oxblood Nuit (dark)

| Token | Hex | Notes |
|-------|-----|-------|
| `--background` | `#160606` | Deep burgundy shadow |
| `--primary` | `#922828` | Oxblood |
| `--foreground` | `#E8D4B8` | Aged parchment |
| `--secondary` | `#5A1818` | Deep bordeaux |
| `--accent` | `#C08030` | Aged brass |
| `--border` | `rgba(146,40,40,0.22)` | Oxblood hairline |

### Shared token rules

- Components must use semantic classes: `bg-background`, `bg-card`, `text-foreground`, `text-primary`, `border-border`.
- Never hardcode hex in components; change ambiance via `.theme-0X` on `<html>`.
- `--glow-color` / `--glow-color-strong` drive `WarmAmbientGlow` and hero halos.
- `--ornament-color` drives SVG strokes and decorative lines (use `var(--ornament-color)`, not fixed brass).

---

## Typography

### Font stack

```
Display  →  Playfair Display (Google Fonts)
Body     →  DM Sans (Google Fonts)
Mono     →  DM Mono (Google Fonts)
```

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400;500&display=swap');
```

**Custom Tailwind classes:**
```css
.font-display { font-family: "Playfair Display", Georgia, serif; }
.font-body    { font-family: "DM Sans", system-ui, sans-serif; }
.font-code    { font-family: "DM Mono", "Courier New", monospace; }
```

### Role of each font

**Playfair Display** → All H1–H3 headings. Always bold (700) or extra-bold (900). Italic is a weapon: use it on one keyword to make it shine (e.g. *Digital*, *Craft*, *Studio*). Negative letter-spacing: `-0.02em`.

**DM Sans** → Body copy, descriptions, paragraphs. Weights 400 (normal) and 500 (medium). Generous line-height: `1.6–1.7`. It's the neutral backdrop that lets the serif headings breathe.

**DM Mono** → Labels, captions, metadata, tags, code snippets, timestamps. Always uppercase + wide letter-spacing (`0.3em–0.5em`) when used as a label. Weight 400 or 300 for secondary information.

### Typographic scale (recommended)

| Usage | Size | Font | Weight | Tracking |
|-------|--------|------|-------|---------|
| Hero H1 | `clamp(3rem, 6vw, 6rem)` | Playfair Display | 700 | `-0.02em` |
| Section H2 | `clamp(1.8rem, 3vw, 2.8rem)` | Playfair Display | 700 | `-0.01em` |
| Card Title H3 | `1.25rem–1.5rem` | Playfair Display | 600 | `0` |
| Body | `0.875rem–1rem` | DM Sans | 400 | `0` |
| Small metadata / Label | `0.625rem–0.75rem` | DM Mono | 400 | `0.35em` |
| Code | `0.75rem` | DM Mono | 400 | `0` |

---

## Spacing & Layout

### Grid — Bento

The page structure is an **asymmetric CSS Grid**, not a grid of identical cards. Cells have varied sizes (`col-span`, `row-span`) to create visual rhythm.

```css
/* Base bento grid */
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 12px; /* Tailwind gap-3 */
```

**Composition principles:**
- 1 large "hero" cell (2–3 columns) always present
- Mix heights and widths — never a 100% uniform grid
- Important cells = more surface area
- Breathing room: minimum inner padding `1.25rem` (p-5), typically `1.5rem` (p-6)

### Recurring spacing values

| Value | Usage |
|--------|-------|
| `4px` (gap-1) | Very tight inner spacing (tags, chips) |
| `8px` (gap-2) | Between elements within the same cell |
| `12px` (gap-3) | Gap between bento cells |
| `16px` (p-4) | Padding for compact cells |
| `24px` (p-6) | Padding for standard cells |
| `36px` (p-9) | Padding for hero cells |
| `40px` (mb-10) | Separation between major sections |

### Border-radius

```css
--radius: 1rem; /* 16px — standard border-radius */
/* Main cards: rounded-2xl (1rem) */
/* Tags / chips: rounded-lg or rounded-full */
/* Color swatches: rounded-lg */
```

---

## Components

### BentoCard shell

Reusable server component at [`web-portfolio/components/bento/bento-card.tsx`](../web-portfolio/components/bento/bento-card.tsx). All bento tiles compose this shell with their own `children` (text, interactive controls, or decorative SVG). No generic `title`/`content` props.

```tsx
<BentoCard colSpan={2} rowSpan={1} label="Featured Work" padded>
  {/* card-specific layout */}
</BentoCard>

/* Edge-to-edge decorative art (future MCMArt cards) */
<BentoCard colSpan={1} padded={false}>
  <McmGeometryArt />
</BentoCard>
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `colSpan` | `1–4` | `1` | Desktop grid span via literal Tailwind lookup |
| `rowSpan` | `1–2` | `1` | Desktop row span via lookup |
| `label` | `string?` | — | DM Mono `// LABEL` header; omit for unlabeled cells |
| `padded` | `boolean` | `true` | `false` for edge-to-edge decorative content |
| `className` | `string?` | — | Extra classes merged with `cn()` |
| `children` | `ReactNode` | — | Composed content (Client Components allowed as children) |

Grid span classes live in [`bento-grid-spans.ts`](../web-portfolio/components/bento/bento-grid-spans.ts) (no template-string interpolation).

Concrete cards live under [`web-portfolio/components/bento/cards/`](../web-portfolio/components/bento/cards/).

**Base shell styles:** `rounded-2xl border border-border bg-card transition-colors duration-200`, hover/focus-within `border-primary/40`.

**Decorative cards:** use `padded={false}` and theme tokens `--art-*`, `--ornament-color` inside children (see moodboards).

### Card / Bento Cell (legacy markup reference)

```tsx
<div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
  <span className="font-code text-[9px] tracking-[0.4em] text-muted-foreground uppercase mb-4">
    Label Section
  </span>
  {/* content */}
</div>
```

**Rule:** Every cell starts with a small `DM Mono uppercase tracking-wide` label in `muted-foreground`. It's the design system's signature.

### Tag / Chip

```tsx
<span className="font-code text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-muted-foreground">
  Next.js
</span>

/* Brass accent variant */
<span className="... border-primary/30 text-primary/80">
  Featured
</span>
```

### CTA Button

```tsx
<button className="flex items-center gap-2 text-foreground/80 text-xs group hover:text-primary transition-colors">
  <span className="font-code uppercase tracking-widest text-[9px]">View Project</span>
  <span className="transition-transform group-hover:translate-x-1">→</span>
</button>
```

No solid-filled rectangular button except in exceptional cases. CTAs are discreet and typographic — the `→` arrow is the only affordance.

### Section Divider

```tsx
<div className="flex items-center gap-3">
  <span className="font-code text-[9px] tracking-[0.4em] text-primary/70 uppercase">Featured Work</span>
  <div className="flex-1 h-px bg-border" />
  <span className="font-code text-[9px] text-muted-foreground">2024</span>
</div>
```

---

## Textures & Materials (CSS)

### Teak Wood Grain

```css
background: repeating-linear-gradient(
  89deg,
  #4A2E12 0px, #5C3A1E 2px, #6B4520 4px,
  #5C3A1E 6px, #4A2E12 10px, #563518 12px, #4A2E12 16px
);
```

### Leather (aged)

```css
background-color: #7A4828;
background-image:
  radial-gradient(ellipse at 25% 35%, rgba(255,255,255,0.12) 0%, transparent 55%),
  radial-gradient(ellipse at 75% 65%, rgba(0,0,0,0.2) 0%, transparent 50%),
  repeating-linear-gradient(120deg, transparent 0px, rgba(0,0,0,0.04) 1px, transparent 2px);
```

### Brass (gradient)

```css
background: linear-gradient(145deg, #D4A83A 0%, #A87B2E 40%, #C8963E 70%, #8B6422 100%);
```

### Noise grain (full-page overlay)

```tsx
<div
  className="fixed inset-0 pointer-events-none z-50 opacity-[0.025]"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
  }}
/>
```

---

## MCM Decorative Elements

### Concentric circles (brass ornament)

Use SVGs of circles, arcs, and lines for background decoration. Always `opacity-[0.06]` to `opacity-10`. Never aggressive, never strongly colored.

```tsx
<svg className="absolute -bottom-16 -right-16 w-80 h-80 opacity-[0.06]" viewBox="0 0 300 300">
  <circle cx="200" cy="200" r="180" fill="none" stroke="#C8963E" strokeWidth="1.5" />
  <circle cx="200" cy="200" r="130" fill="none" stroke="#C8963E" strokeWidth="1" />
  <circle cx="200" cy="200" r="80" fill="#C8963E" opacity="0.5" />
  <line x1="0" y1="200" x2="300" y2="200" stroke="#C8963E" strokeWidth="0.75" />
  <line x1="200" y1="0" x2="200" y2="300" stroke="#C8963E" strokeWidth="0.75" />
</svg>
```

### MCM geometric art (Bauhaus)

Composition of half-circles, solid rectangles, dividing lines. Palette: Mustard + Brass + Cream + Olive. Inspiration: Bauhaus posters, Alexander Girard artworks.

```tsx
<svg viewBox="0 0 200 220">
  <rect width="200" height="220" fill="#1E1009" />
  <rect x="0" y="140" width="200" height="80" fill="#3A2210" />
  <circle cx="100" cy="95" r="70" fill="#D4892A" />
  <circle cx="100" cy="78" r="48" fill="#C8963E" />
  <path d="M 52 78 A 48 48 0 0 1 148 78" fill="#F0E6D0" />
  <circle cx="100" cy="60" r="22" fill="#130A04" />
  <rect x="0" y="155" width="90" height="65" fill="#4A5830" />
  <line x1="100" y1="0" x2="100" y2="220" stroke="#130A04" strokeWidth="4" />
</svg>
```

### Warm glow (ambiance halo)

Uses theme token `--glow-color-strong`:

```tsx
<div
  className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none blur-xl"
  style={{ background: "radial-gradient(circle, var(--glow-color-strong), transparent 70%)" }}
/>
```

---

## Micro-interactions

| Element | Behavior |
|---------|-------------|
| Color swatch | `scale(1.08)` on hover + displays name/hex |
| Card cell | `border-color` shifts to `primary/40` on hover |
| CTA arrow | `translateX(4px)` on hover on the `→` |
| Tech tag | `border-color` shifts to `primary/40`, `color` shifts to `primary` |
| Transitions | Always `duration-200`, `ease-out` — never a bounce |

---

## Editorial Rules (copy)

- **Headlines**: short, affirmative, never a verb — "Crafting Experiences", "Studio Platform", "Digital Craft"
- **Display italics**: 1 keyword per headline can be italicized in Playfair for an editorial effect
- **Mono labels**: always UPPERCASE + wide tracking. E.g.: `FEATURED PROJECT`, `STACK`, `2024`
- **Body**: conversational, direct, light — no tech buzzwords
- **Language**: mixing FR/EN is acceptable in this portfolio context

---

## Checklist Before Building a Component

- [ ] Does the component's label use `DM Mono uppercase tracking-wide muted-foreground`?
- [ ] Is the main heading in `Playfair Display`?
- [ ] Does the background use theme tokens `bg-background` / `bg-card`?
- [ ] Are borders `border-border` (brass rgba)?
- [ ] Is there a subtle MCM decorative element (circle, glow, line)?
- [ ] Are transitions `duration-200`?
- [ ] Is the density generous (no cramped content)?
- [ ] Does the component work on **all four ambiances** (light 01–02 and dark 03–04)?

---

## Upcoming / Design TODO

- [x] Four ambiance token sets (01–04) in `themes.css`
- [x] ThemeProvider + ThemeSelector for local validation
- [ ] WCAG contrast audit per ambiance (foreground/background, primary/background)
- [ ] Standardized `ProjectCard` component
- [ ] `TechBadge` component with variants per theme accent swatches
- [ ] Portfolio navigation / header
- [ ] Project detail page (editorial layout, MCM)
- [ ] Responsive mode: breakpoint 768px (2-column bento) and 480px (1 column)
- [ ] Bento cell entrance animation (light stagger, `motion`)
- [ ] Decide production default ambiance and whether to hide ThemeSelector