import data from '@/content/experience.json';
import { resolveLocale, type Locale } from '@/i18n/routing';
import type { TitledItem } from '@/lib/projects';

export interface ExperienceProject {
  title: string;
  problem: string;
  built: string;
  result: string;
  // A generic drawing of the flow, with no internal names.
  flow?: { caption: string; steps: string[] };
}

// Professional work prose for one locale. Its chapters differ from a case
// study's (no pillars, build log or live link), so it does not extend
// ProjectContent.
export interface ExperienceContent {
  overview: {
    problem: string;
    lead: string;
    paragraphs: string[];
    facts: { role: string; timeline: string; teams: string; stack: string };
  };
  projects: ExperienceProject[];
  method: {
    planning: TitledItem;
    delivery: TitledItem;
    choices: { heading: string; items: TitledItem[] };
  };
  takeaways: {
    learned: TitledItem;
    today: TitledItem;
  };
}

// Counts as numbers so each locale gets its own separator (1,100 in EN, 1 100 in FR).
// The card and the detail modal both read them; labels are HomePage messages.
export const experienceStats = [
  { value: 1100, suffix: '+', label: 'professionalStatOrders' },
  { value: 1500, prefix: '~', label: 'professionalStatMessages' },
  { value: 450, prefix: '~', label: 'professionalStatTodos' },
  { value: 4, label: 'professionalStatBrands' },
] as const;

// The annotation is what makes tsc validate content/experience.json.
export const experience: Record<Locale, ExperienceContent> = data;

export function getExperience(locale: string): ExperienceContent {
  return experience[resolveLocale(locale)];
}
