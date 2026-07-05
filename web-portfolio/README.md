# web-portfolio — app

The Next.js application behind my personal portfolio: a modern, ultra-clean, i18n-ready
front end built with an emphasis on architecture and design detail.

> This is the app folder. The project vision and repo layout live in the
> [root README](../README.md).

## Tech stack

| Area      | Choice                                                     |
| --------- | ---------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack)   |
| Language  | TypeScript 5                                               |
| UI        | React 19                                                   |
| Styling   | Tailwind CSS 4, [Geist](https://vercel.com/font) fonts     |
| i18n      | [next-intl](https://next-intl.dev) — `en` (default) & `fr` |
| Testing   | Vitest 4 + Testing Library (jsdom)                         |
| Quality   | ESLint 9 (flat config) + Prettier, Husky + lint-staged     |
| CI        | GitHub Actions (lint + tests)                              |
| Hosting   | Vercel                                                     |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects `/` → `/en`;
localized pages live at `/en` and `/fr`.

## Scripts

```bash
npm run dev           # dev server (Turbopack)
npm run build         # production build
npm run start         # serve the production build
npm run lint          # ESLint
npm run format        # Prettier --write
npm run test          # Vitest (watch)
npm run test:run      # Vitest (single run, used in CI)
```

## Project structure

```
app/
├── layout.tsx            # root pass-through layout
├── page.tsx              # redirects / → /en
└── [locale]/
    ├── layout.tsx        # <html>/<body>, fonts, NextIntlClientProvider
    └── page.tsx          # home page
components/
└── home-page-content.tsx # sync Client Component (renders the home UI)
i18n/
├── routing.ts            # locales + default locale
└── request.ts            # per-request messages
messages/
├── en.json               # English strings
└── fr.json               # French strings
proxy.ts                  # locale routing (Next 16 renamed middleware → proxy)
```

### Internationalization

Routing is driven by `i18n/routing.ts` and applied in `proxy.ts` (Next.js 16 renamed
`middleware.ts` → `proxy.ts`). Add a locale by extending `routing.locales` and adding a
matching `messages/<locale>.json`. UI is extracted into a sync Client Component so it can
render translations both in the app and in Vitest (which cannot render async Server
Components).

## Deployment

Deployed on Vercel. Since the app is nested in the repo, set **Framework Preset →
`Next.js`**, **Root Directory → `web-portfolio`**, and **Production Branch → `main`**.
A build that "succeeds" but 404s on every route usually means the Framework Preset is
still `Other` — see [`../TIL.md`](../TIL.md).
