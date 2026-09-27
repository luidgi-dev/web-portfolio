import { hasLocale } from 'next-intl';
import data from '@/content/projects.json';
import { routing } from '@/i18n/routing';
import { toOrdinal } from '@/lib/utils';

export type Locale = (typeof routing.locales)[number];

export interface TitledItem {
  title: string;
  body: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProjectFigure {
  id: string;
  width: number;
  height: number;
  src: { light: string; dark: string };
}

export interface ProjectMeta {
  url: string;
  year: number;
  figures: ProjectFigure[];
}

// Case study prose for one locale. Chapters are fixed keys, not a discriminated
// array: JSON imports widen string literals, so tsc could not check a union.
export interface ProjectContent {
  title: string;
  tagline: string;
  summary: string;
  type: string;
  tags: string[];
  overview: {
    problem: string;
    lead: string;
    paragraphs: string[];
    pillars: { heading: string; items: TitledItem[] };
    facts: { role: string; timeline: string; platform: string; status: string };
  };
  product: {
    figures: Record<string, { alt: string; caption: string }>;
    insights: {
      heading: string;
      body: string;
      caption: string;
      cards: { kind: string; title: string; body: string; period: string }[];
    };
    features: string[];
  };
  engineering: {
    intro: string;
    numbers: Stat[];
    stack: { label: string; items: string[] }[];
    pipeline: { heading: string; steps: TitledItem[] };
    decisions: TitledItem[];
  };
  buildLog: {
    stats: Stat[];
    story: { heading: string; paragraphs: string[]; before: string; after: string; quote: string };
    results: string[];
    lessons: TitledItem[];
  };
}

export interface Project {
  meta: ProjectMeta;
  content: Record<Locale, ProjectContent>;
}

export type ProjectSlug = keyof typeof data;

// The annotation is what makes tsc validate content/projects.json.
export const projects: Record<ProjectSlug, Project> = data;

export function getProject(slug: ProjectSlug, locale: string) {
  const { meta, content } = projects[slug];
  const index = Object.keys(projects).indexOf(slug);

  return {
    meta,
    content: content[hasLocale(routing.locales, locale) ? locale : routing.defaultLocale],
    number: toOrdinal(index),
  };
}
