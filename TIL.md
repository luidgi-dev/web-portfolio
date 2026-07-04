# TIL — web-portfolio

A running log of things I learn while building this project. Short entries, newest on top.

## How to use this file

- One entry per thing learned, dated.
- Keep it short: the problem, what I did, the takeaway.
- Add tags in parentheses to make entries searchable later.

## Entries

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