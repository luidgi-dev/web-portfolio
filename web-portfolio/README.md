# web-portfolio app

The Next.js application behind my personal site.

> This is the app folder. What the site is, its design and the repo layout live in the
> [root README](../README.md).

## Tech stack

| Area      | Choice                                                      |
| --------- | ----------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack)    |
| Language  | TypeScript 5                                                |
| UI        | React 19                                                    |
| Styling   | Tailwind CSS 4, Playfair Display, DM Sans, DM Mono          |
| i18n      | [next-intl](https://next-intl.dev), `en` (default) and `fr` |
| Testing   | Vitest 4 + Testing Library (jsdom)                          |
| Quality   | ESLint 9 (flat config) + Prettier, Husky + lint-staged      |
| CI        | GitHub Actions (lint, typecheck, tests)                     |
| Hosting   | Vercel                                                      |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects `/` to `/en`;
localized pages live at `/en` and `/fr`.

## Scripts

```bash
npm run dev           # dev server (Turbopack)
npm run build         # production build
npm run start         # serve the production build
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm run format        # Prettier --write
npm run format:check  # Prettier --check
npm run test          # Vitest (watch)
npm run test:run      # Vitest (single run, used in CI)
```

## Project structure

```
app/
├── layout.tsx            # root pass-through layout
├── page.tsx              # redirects / to /en
├── not-found.tsx         # static fallbacks outside a locale
├── global-error.tsx
├── fonts.ts              # next/font setup
├── styles/               # tokens (four themes, type, radius, motion) and materials
└── [locale]/             # localized home, not-found and error pages
components/
├── bento/                # homepage cards, decor and the grid
├── case-study/           # modal shell, chapters and blocks of the three case studies
├── error/                # error poster and page layout
└── ui/                   # modal, tabs, CTA
content/                  # typed project and experience data (EN and FR)
lib/                      # site links, themes, stack, content loaders
i18n/                     # routing, navigation, per-request messages
messages/                 # en.json, fr.json
proxy.ts                  # locale routing (Next 16 renamed middleware to proxy)
```

### Internationalization

Routing is driven by `i18n/routing.ts` and applied in `proxy.ts` (Next.js 16 renamed
`middleware.ts` to `proxy.ts`). Add a locale by extending `routing.locales` and adding a
matching `messages/<locale>.json`. UI is extracted into a sync Client Component so it can
render translations both in the app and in Vitest (which cannot render async Server
Components).

## Deployment

Deployed on Vercel. Since the app is nested in the repo, set **Framework Preset: `Next.js`**,
**Root Directory: `web-portfolio`** and **Production Branch: `main`**.
A build that "succeeds" but 404s on every route usually means the Framework Preset is
still `Other`: see [`../docs/TIL.md`](../docs/TIL.md).
