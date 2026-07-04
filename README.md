# web-portfolio

A high-end, highly curated personal portfolio designed to showcase my development
projects, technical stack, and professional profile.

Unlike generic developer templates or corporate SaaS dashboards, the goal is to marry a
modern, ultra-clean layout with a distinct visual identity inspired by non-technical
aesthetics. It doubles as a showcase of my work and a testament to attention to detail,
front-end architecture, and design sensibility.

## Repository layout

The Next.js app lives in a subfolder; the repo root stays clean for docs and tooling.

```
web-portfolio/            # git repo root
├── web-portfolio/        # the Next.js app  ← package.json lives here
├── .github/workflows/    # CI (lint + tests)
├── TIL.md                # running log of things learned building this
└── README.md             # you are here
```

> **Working on the app?** Everything (install, dev, build, tests) runs from
> `web-portfolio/`, not the repo root. See [`web-portfolio/README.md`](./web-portfolio/README.md).

## Deployment

Deployed on [Vercel](https://vercel.com). Because the app is nested, three project
settings must be set explicitly:

| Setting           | Value           |
| ----------------- | --------------- |
| Framework Preset  | `Next.js`       |
| Root Directory    | `web-portfolio` |
| Production Branch | `main`          |

Setup and deployment gotchas are logged in [`TIL.md`](./TIL.md).
