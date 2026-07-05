export const stackGroups = [
  {
    key: 'languages',
    labelKey: 'stackLanguages',
    items: ['Python', 'TypeScript', 'SQL'],
  },
  {
    key: 'frontend',
    labelKey: 'stackFrontend',
    items: ['React', 'Next.js', 'Tailwind'],
  },
  {
    key: 'backend',
    labelKey: 'stackBackend',
    items: ['Supabase', 'PostgreSQL', 'APIs'],
  },
  {
    key: 'cloud',
    labelKey: 'stackCloud',
    items: ['GCP', 'Vercel'],
  },
] as const;

export type StackGroupKey = (typeof stackGroups)[number]['key'];
