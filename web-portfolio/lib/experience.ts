import data from '@/content/experience.json';
import { resolveLocale, type Locale, type TitledItem } from '@/lib/projects';

export interface ExperienceProject {
  title: string;
  problem: string;
  built: string;
  result: string;
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

// The annotation is what makes tsc validate content/experience.json.
export const experience: Record<Locale, ExperienceContent> = data;

export function getExperience(locale: string): ExperienceContent {
  return experience[resolveLocale(locale)];
}
