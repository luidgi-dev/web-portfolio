# TIL — web-portfolio

A running log of things I learn while building this project. Short entries, newest on top.

## How to use this file

- One entry per thing learned, dated.
- Keep it short: the problem, what I did, the takeaway.
- Add tags in parentheses to make entries searchable later.

## Entries

### 2026-07-04 — CI, Vitest, and next-intl bootstrap (ci, vitest, i18n, next-intl)

Three bootstrap issues landed together. Key patterns for this subfolder repo:

**GitHub Actions CI** — workflow at repo root, app in `web-portfolio/`:

```yaml
defaults:
  run:
    working-directory: web-portfolio
# setup-node cache-dependency-path: web-portfolio/package-lock.json
```

Steps: `npm ci` → `npm run lint` → `npm run test:run`. Use `test:run` (not `test`) in CI — Vitest watch mode hangs in CI.

**Branch protection (manual):** GitHub → Settings → Branches → rule on `main` → require status check **quality** (the CI job name). YAML alone does not block merges.

**Vitest smoke test:** Extract UI into a sync Client Component (`components/home-page-content.tsx`). Vitest cannot render async Server Components. Mock `next/image` and `next/navigation` in `vitest.setup.ts`.

**next-intl routing:** `i18n/routing.ts` + `i18n/request.ts` + `proxy.ts` + `app/[locale]/layout.tsx`. Default locale `en`; `/` redirects to `/en`. Root `app/layout.tsx` is pass-through only; `<html>` / `<body>` live in `[locale]/layout.tsx`.

**Testing translations:** Wrap component in `NextIntlClientProvider` with locale + messages JSON in tests:

```tsx
<NextIntlClientProvider locale="fr" messages={frMessages}>
  <HomePageContent />
</NextIntlClientProvider>
```

**Next.js 16 note:** Locale routing lives in `proxy.ts` (formerly `middleware.ts`). Use a named `export function proxy` (not only a default export). Same `createMiddleware` from next-intl.

**Vercel 404 on `/`:** With only `app/[locale]/page.tsx`, the root path has no page unless the proxy redirects. On Vercel, if the proxy edge layer fails, `/` returns 404. Fixes: (1) set **Root Directory** to `web-portfolio` in Vercel project settings, (2) add `app/page.tsx` with `redirect('/en')` and/or `redirects` in `next.config.ts` as fallbacks, (3) redeploy after proxy fixes. Check build logs for `ƒ Proxy` and routes `/en`, `/fr`.

Takeaway: Vitest before CI (needs `test:run` script); i18n last (moves routes and updates tests). Point CI at the app subfolder explicitly.

### 2026-07-04 — ESLint, Prettier, Husky in a subfolder app (eslint, prettier, husky, lint-staged)

Set up code quality tooling for LUI-116. The app lives in `web-portfolio/` while `.git` is at the repo root, so a few patterns differ from a standard single-folder Next.js project.

**Prettier + ESLint (flat config):** Next.js 16 already uses ESLint 9 flat config (`eslint.config.mjs`). Do not rewrite it with `FlatCompat`. Add Prettier as the last config entry only:

```js
import eslintConfigPrettier from 'eslint-config-prettier/flat';
// ...after next configs and globalIgnores:
eslintConfigPrettier,
```

`eslint-config-prettier` disables ESLint formatting rules that conflict with Prettier. Prettier still runs separately (via lint-staged), not through `eslint-plugin-prettier`.

**Husky in a subfolder:** Husky will not install into a parent directory by default. From the app `package.json`:

```json
"prepare": "cd .. && husky web-portfolio/.husky"
```

Pre-commit hook (`web-portfolio/.husky/pre-commit`):

```sh
cd web-portfolio
npx lint-staged
```

Git `core.hooksPath` points to `web-portfolio/.husky/_`; the hook in `.husky/pre-commit` is what actually runs.

**GUI commits (Cursor / VS Code):** Hooks run outside the terminal, so fnm/nvm is not loaded and `npx` may fail with `command not found`. Fix once in `~/.config/husky/init.sh`:

```sh
export PATH="/usr/local/bin:$HOME/.local/bin:$PATH"
eval "$(fnm env --shell bash)"
```

Note: fnm does not accept `--shell sh`; use `bash` (or `zsh`).

**lint-staged:** Runs `eslint --fix` then `prettier --write` on staged JS/TS; Prettier only on JSON/CSS/MD. Prettier auto-fixes at commit. ESLint **errors** block the commit; Next.js defaults treat many rules (e.g. unused vars) as **warnings**, which do not block — only exit code ≠ 0 stops the commit.

Useful scripts from `web-portfolio/`:

```bash
npm run lint
npm run format
npm run format:check
```

Takeaway: subfolder app → custom Husky `prepare` + `cd` in pre-commit; flat ESLint → `eslint-config-prettier/flat` last; GUI commits → `~/.config/husky/init.sh` with your Node version manager.

### 2026-07-04 — A Next.js app can live in a subfolder, not the repo root (nextjs, repo, ci)

Running `npx create-next-app@latest web-portfolio` from inside the repo creates the app in a `web-portfolio/` subfolder, so the app is at `web-portfolio/web-portfolio/`. That is fine: an app does not have to sit at the repo root. Repo root and app root are independent, so I can keep the root clean:

```
web-portfolio/          # git repo root
├── web-portfolio/      # the Next.js app (package.json lives here)
├── docs/
├── design/
└── README.md
```

Gotchas when the app is not at the root: any tool that expects `package.json` at the repo root needs the path set explicitly.

- Vercel: set Root Directory to `web-portfolio` in the project settings.
- GitHub Actions: add `working-directory: web-portfolio` to the job steps (or a `defaults.run.working-directory`).
- Also run `npm install` and other commands from inside the app folder, not the repo root.

Takeaway: subfolder layout keeps the repo tidy, but point every build and CI tool at the app path.

### 2026-07-04 — Check git identity before working on a new repo (git, setup)

Reminder checklist before starting a new repo and before the first commit:

- Decide which identity applies: personal (luidgi-dev / luidgi.dev@gmail.com) or work (Voltaire).
- Personal projects live under `~/perso/` or `~/strive/`. The `includeIf` blocks in `~/.gitconfig` load the personal identity automatically based on the folder, so location matters.
- Verify the active identity inside the repo before committing:
  ```bash
  git config user.email   # expect luidgi.dev@gmail.com for personal repos
  ```
- Confirm the remote uses the personal SSH host alias, not plain github.com:
  ```bash
  git remote -v           # expect git@github.com-perso:luidgi-dev/<repo>.git
  ```
- If a commit landed with the wrong author, fix it before pushing:
  ```bash
  git commit --amend --reset-author --no-edit
  ```

Takeaway: identity is driven by the folder (`includeIf`) and GitHub auth by the remote alias (`github.com-perso`). Both need to be right, and they are independent.