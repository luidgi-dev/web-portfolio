# Design System Specification: Portfolio MCM

Mid-Century Modern, Bento Grid architecture, dark warm theme.
Version 1.1, production-ready spec.

---

## 1. Aesthetic Foundations and Guardrails

This design system translates the warmth, texture, and architectural proportions of Mid-Century Modern (MCM) interior design (circa 1950s to 1970s) into a digital workspace. The core directive is to build an environment that mirrors a curated Eames or Knoll interior, completely bypassing generic SaaS dashboard tropes.

### Banned elements

To protect the authenticity of this design system, the following are hard banned:

- SaaS or tech palettes: no neon purples, tech blues (#0066FF), or high contrast corporate gradients.
- Generic components: no sharp white cards on sterile light gray backgrounds.
- Tech cliches: no generic utility icons (rocket ships, AI brains, gear icons).
- Overused fonts: Inter (for headings), IBM Plex, Space Grotesk, Bebas Neue.

---

## 2. Design Tokens: Colors

Color tokens map authentic MCM materials (teak, brass, smoked oak) to Shadcn CSS variables. Values are stored as RGB channels (space separated, no `rgb()` wrapper) so Tailwind opacity modifiers such as `bg-primary/40` work correctly.

### Core structural palette (dark theme, default and only theme)

| Token | RGB | Hex reference | Material | Usage |
|---|---|---|---|---|
| `--background` | 31 17 8 | #1F1108 | Dark Chocolate | Main app background canvas |
| `--card` | 39 21 9 | #271509 | Deep Walnut | Bento grid card surfaces and panels |
| `--foreground` | 240 230 208 | #F0E6D0 | Warm Cream | High contrast body copy and primary typography |
| `--primary` | 200 150 62 | #C8963E | Brass Gold | Interactive accents, CTAs, italic highlights |
| `--primary-foreground` | 31 17 8 | #1F1108 | - | Text on solid `--primary` surfaces |
| `--secondary` | 58 34 16 | #3A2210 | Walnut Brown | Secondary surfaces, nested containers |
| `--secondary-foreground` | 240 230 208 | #F0E6D0 | - | Text on `--secondary` surfaces |
| `--muted` | 44 26 9 | #2C1A09 | Smoked Oak | Low priority surfaces, inactive tabs, form inputs |
| `--muted-foreground` | 156 139 110 | #9C8B6E | Aged Parchment | Editorial labels, captions, metadata |
| `--accent` | 155 98 64 | #9B6240 | Aged Leather | Secondary accents, hover backgrounds |
| `--accent-foreground` | 240 230 208 | #F0E6D0 | - | Text on `--accent` surfaces |
| `--border` | 200 150 62 (at 14% opacity) | rgba(200,150,62,0.14) | Brass Hairline | Structural lines and grid dividers |
| `--ring` | 200 150 62 | #C8963E | Brass | Focus indicator for keyboard accessibility |
| `--destructive` | 160 78 48 | #A04E30 | Terracotta | Destructive actions, error states |
| `--destructive-foreground` | 240 230 208 | #F0E6D0 | - | Text on `--destructive` surfaces |

### Utility accent palette (badges and content tags only, not core surface tokens)

| Name | RGB | Hex | Usage |
|---|---|---|---|
| Mustard Yellow | 212 137 42 | #D4892A | High energy, active status badges |
| Olive Green | 74 88 48 | #4A5830 | Operational tags, secondary metrics |
| Terracotta | 160 78 48 | #A04E30 | Soft error alerts, destructive actions |
| Teak Accent | 92 58 30 | #5C3A1E | Purely decorative borders and backgrounds |

Accessibility note: if `--background` (31 17 8) feels too heavy in user testing, swap to Option Mid (40 22 10 / #28160A) to preserve the warm register while raising mid tone contrast.

### Contrast check (WCAG, against background 31 17 8)

| Pair | Ratio | Result |
|---|---|---|
| foreground on background | ~14.8:1 | Passes AAA |
| primary on background | ~6.9:1 | Passes AA (normal text) |
| muted-foreground on background | ~5.5:1 | Passes AA (normal text) |
| card on background | ~1.05:1 | Nearly invisible, separation relies on border, not on contrast |

Recommendation: whenever a component needs a visible surface break (not just a nested container), add a `border-hairline` rather than relying on the background shift alone.

---

## 3. Typography Architecture

Three Google Fonts, loaded via `next/font`, with the `latin-ext` subset enabled for correct rendering of French accented characters (bilingual FR/EN content).

```typescript
// tailwind.config.ts, fontFamily extension
fontFamily: {
  display: ["var(--font-display)", "Georgia", "serif"],
  sans: ["var(--font-sans)", "system-ui", "sans-serif"],
  mono: ["var(--font-mono)", "Courier New", "monospace"],
},
```

### Semantic roles

- **Playfair Display** (display font): exclusively for h1, h2, h3. Always Bold (700) or Black (900). Use `font-style: italic` on exactly one critical keyword per hero line, mimicking vintage editorial layouts (for example, "Crafting Digital Experiences"). Tight tracking (`tracking-tight` or -0.02em) required above 32px.
- **DM Sans** (body font): long form paragraphs, descriptions, UI controls. Light (300), Regular (400), or Medium (500). Readable line height (`leading-relaxed`, 1.6 to 1.7).
- **DM Mono** (code and metadata font): technical details, timestamps, tags, small labels. Mandatory uppercase and wide tracking (`tracking-[0.3em]`) when used as a top level card tag.

### Typographic scale matrix

| Use | Token | Tailwind classes | Tracking |
|---|---|---|---|
| Page hero | h1 | `text-display font-bold text-5xl md:text-7xl` | -0.02em |
| Section header | h2 | `text-display font-bold text-2xl md:text-4xl` | -0.01em |
| Bento card title | h3 | `text-display font-semibold text-lg md:text-xl` | 0 |
| Body / paragraph | p | `text-sans font-normal text-base leading-relaxed` | 0 |
| Small metadata / label | span | `text-mono font-normal text-[10px] uppercase` | 0.35em |
| Code snippet | code | `text-mono font-normal text-xs` | 0 |

---

## 4. Structural Layout and Spacing

### The asymmetric bento grid

Explicit 4 column asymmetric CSS grid container. Layouts must never look uniform, vary column and row spans to control visual interest and flow.

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px; /* Tailwind gap-3 */
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
```

### Spacing scale

| Tailwind variable | Value | Usage |
|---|---|---|
| `gap-1` | 4px | Micro spacing (inner chip layout, icon spacing) |
| `gap-2` | 8px | Inner cell structural layout (label to title) |
| `gap-3` | 12px | Canonical bento grid gutter |
| `p-4` | 16px | Inner padding for compact bento units |
| `p-6` | 24px | Canonical inner padding for standard bento units |
| `p-8` | 32px | Hero / feature showcase padding |
| `mb-10` | 40px | Structural distance between major layout sections |

### Corner radii policy

To replicate the soft, organic lines of Mid Century wooden furniture:

- Main bento cards: fixed at `rounded-2xl` (1rem / 16px).
- Sub elements, chips, buttons: `rounded-lg` (0.5rem) or `rounded-full`.

### Elevation and motion tokens (recommended addition)

The original spec used ad hoc `duration-200` values with no shared scale. Standardizing avoids drift as more components are built.

```css
:root {
  /* motion */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 150ms;
  --duration-standard: 200ms;
  --duration-slow: 320ms;

  /* elevation, used sparingly, MCM favors flat surfaces over drop shadows */
  --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-modal: 0 12px 32px rgba(0, 0, 0, 0.45);
}
```

Guidance: reserve `--shadow-modal` for the full screen modal (LUI-130) only. Bento cards rely on the border token for separation, not shadows.

---

## 5. Primitive Component Specifications

### Component A: Core Bento Grid Cell (`BentoCard.tsx`)

```tsx
import React from "react";

interface BentoCardProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ label, children, className = "" }) => {
  return (
    <section
      className={`group relative rounded-2xl border border-border bg-card p-6 flex flex-col overflow-hidden transition-all duration-200 ease-out hover:border-primary/40 ${className}`}
    >
      {/* Structural label, mandatory system rule */}
      <span className="font-mono text-[9px] tracking-[0.4em] text-muted-foreground uppercase mb-4 block">
        // {label}
      </span>
      <div className="flex-1 w-full">{children}</div>
    </section>
  );
};
```

### Component B: Editorial Category Badge (`McmTag.tsx`)

```tsx
import React from "react";

interface McmTagProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export const McmTag: React.FC<McmTagProps> = ({ children, variant = "default" }) => {
  const baseStyle =
    "font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors duration-200";
  const styles =
    variant === "accent"
      ? `${baseStyle} border-primary/30 text-primary bg-primary/5`
      : `${baseStyle} border-border text-muted-foreground bg-transparent`;

  return <span className={styles}>{children}</span>;
};
```

### Component C: Typographic Call to Action Link (`CtaLink.tsx`)

```tsx
import React from "react";

interface CtaLinkProps {
  href: string;
  text: string;
}

export const CtaLink: React.FC<CtaLinkProps> = ({ href, text }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 min-h-[44px] text-foreground/80 group hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200"
    >
      <span className="font-mono uppercase tracking-widest text-[9px]">{text}</span>
      <span
        className="font-sans text-xs transform transition-transform duration-200 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      >
        &#8594;
      </span>
    </a>
  );
};
```

Note: `min-h-[44px]` added to meet the project's touch target requirement. The original spec had no minimum size on this interactive element.

### Component D: Primary Button (`Button.tsx`, recommended addition)

The original spec had no button, despite CTAs being a core part of the flagship and contact sections.

```tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", children, ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:pointer-events-none";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
```

### Component E: Form Input (`Input.tsx`, recommended addition)

The original spec assigned `--muted` to form inputs but never specified the component.

```tsx
import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...props }) => {
  return (
    <input
      className={`min-h-[44px] w-full rounded-lg border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive ${className}`}
      {...props}
    />
  );
};
```

---

## 6. Micro-Interactions and CSS Materials

### Behavioral state table

| Target UI node | Trigger | Animation blueprint |
|---|---|---|
| BentoCard box | mouseenter / focus-within | Smooth border color interpolation to `primary/40`. `duration-200 ease-out`. No scaling. |
| CtaLink indicator | mouseenter / focus-visible | Horizontal translation: `transform: translateX(4px)` applied to the arrow character only. |
| Color swatch component | mouseenter | Vector scaling `scale(1.06)` combined with a soft warm ambient drop shadow. |
| Any interactive element | focus-visible | 2px `--ring` outline, never removed via `outline-none` without a replacement ring. |

Note: hover only interactions do not work on touch devices. Every hover effect above must have a `focus-visible` equivalent, already reflected in the `CtaLink`, `Button`, and `Input` components.

### Teak wood texture (SVG/CSS hybrid)

```css
.bg-texture-teak {
  background: repeating-linear-gradient(
    89deg,
    #4a2e12 0px,
    #5c3a1e 2px,
    #6b4520 4px,
    #5c3a1e 6px,
    #4a2e12 10px,
    #563518 12px,
    #4a2e12 16px
  );
}
```

### Matte textured film overlay (global page overlay)

Place at the core layout root (`layout.tsx`), right beneath the opening body tag:

```tsx
export const FilmNoiseOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.022]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
);
```

### Warm architectural ambient glow (inner highlights)

```tsx
export const WarmAmbientGlow = () => (
  <div
    className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none mix-blend-screen opacity-20 filter blur-xl"
    style={{ background: "radial-gradient(circle, rgba(214,137,42,0.4), transparent 70%)" }}
  />
);
```

---

## 7. Icon System (recommended addition)

The original spec banned generic utility icons but did not specify a replacement system, which risks inconsistent choices later (LUI-132 tech stack tile, LUI-130 modal tabs).

Recommendation: `lucide-react` (already available in the stack) restricted to a small, curated subset. Do not use icons for decoration, only for genuine affordances (close, external link, locale switch). Size fixed at `16px` or `20px`, colored with `text-muted-foreground` by default, `text-primary` on hover or active state, never a filled/solid icon style (keeps the line based, architectural feel).

---

## 8. Accessibility Requirements

- All interactive elements: minimum `44px` touch target (`min-h-[44px]`, matched with adequate horizontal padding).
- All interactive elements: visible `focus-visible` ring using the `--ring` token, never suppressed without replacement.
- All hover only effects must have a keyboard or touch equivalent (`focus-visible`, `focus-within`, or an active state).
- ARIA roles required on the modal (LUI-130) and tabs, per the project's technical constraints.
- Verify diacritic rendering (French accents) for Playfair Display and DM Sans using the `latin-ext` subset.

---

## 9. QA Checklist

Before shipping any UI component, confirm every item:

- [ ] The block leads with a small DM Mono label styled as an uppercase, tracked string.
- [ ] Primary copy uses Playfair Display for headlines and DM Sans for paragraphs.
- [ ] All container structures use theme variables (`bg-background`, `bg-card`, `border-border`).
- [ ] Curves are restricted to `rounded-2xl` on structural cells.
- [ ] No high contrast tech gradients or banned utility icon styles.
- [ ] Every interactive element has a `focus-visible` state and a `min-h-[44px]` touch target.
- [ ] Component supports `next-intl` localization without text clipping (test with the longer of the two locales).