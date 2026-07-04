<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

## Working rules

- **Do not auto commit or push.** Make the changes, then let me review and commit myself. Never run `git commit` or `git push` unless I explicitly ask.
- **Write everything in English** — code, identifiers, comments, commit messages, docs.
- **Avoid em-dashes (`—`).** This matters most in user-facing copy (UI strings, translations); in internal docs it is less critical but still preferred. Use a colon, a comma, or parentheses instead.
- **Follow clean-code conventions:** KISS and DRY, keep functions small and single-purpose, add tests for new behavior, and keep the CI green (lint + tests) before considering a change done.

## Repo layout

- The app lives in the `web-portfolio/` subfolder; `.git` is at the repo root. Run all commands (`npm install`, `dev`, `build`, tests) from inside `web-portfolio/`.
- Any tool expecting `package.json` at the repo root needs the path set explicitly (Vercel Root Directory, GitHub Actions `working-directory`).

## Testing & CI

- Use `npm run test:run` (single run) in CI and scripts — `npm run test` stays in watch mode and hangs CI.
- Vitest cannot render async Server Components. Keep renderable UI in sync Client Components (e.g. `components/home-page-content.tsx`) so it is testable.

## i18n & routing

- Locale routing lives in `proxy.ts` (Next.js 16 renamed `middleware.ts` → `proxy.ts`); use a named `export function proxy`.
- Locales and default are defined in `i18n/routing.ts`. Add a locale by extending `routing.locales` and adding a matching `messages/<locale>.json`.
- `app/[locale]/layout.tsx` owns `<html>`/`<body>`; the root `app/layout.tsx` is pass-through only.
