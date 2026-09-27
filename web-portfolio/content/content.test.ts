import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { routing } from '@/i18n/routing';
import { getProject, projects, type ProjectSlug } from '@/lib/projects';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

// Keys, array lengths and value types, without the values themselves.
function shapeOf(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shapeOf);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, shapeOf(item)])
    );
  }
  return typeof value;
}

function stringsOf(value: unknown, at = ''): [string, string][] {
  if (typeof value === 'string') return [[at, value]];
  if (Array.isArray(value))
    return value.flatMap((item, index) => stringsOf(item, `${at}[${index}]`));
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      stringsOf(item, at ? `${at}.${key}` : key)
    );
  }
  return [];
}

const copyRules = {
  empty: /^\s*$/,
  dash: /[\u2013\u2014]/,
  placeholder: /lorem|coming soon|à venir|\b(?:TODO|TBD|FIXME)\b/i,
  buzzword: /\b(?:leverage|seamless|cutting-edge|disrupt|synergy|game-changing)/i,
};

type CopyRule = keyof typeof copyRules;

function copyIssues(value: unknown, rules = Object.keys(copyRules) as CopyRule[]) {
  return stringsOf(value).flatMap(([at, text]) =>
    rules.filter((rule) => copyRules[rule].test(text)).map((rule) => `${rule} at ${at}`)
  );
}

const slugs = Object.keys(projects) as ProjectSlug[];

describe('content/projects.json', () => {
  describe.each(slugs)('%s', (slug) => {
    const { meta, content } = projects[slug];

    it('has content for every locale and nothing else', () => {
      expect(Object.keys(content).sort()).toEqual([...routing.locales].sort());
    });

    it('has the same shape in every locale', () => {
      for (const locale of routing.locales) {
        expect(shapeOf(content[locale])).toEqual(shapeOf(content[routing.defaultLocale]));
      }
    });

    it('has complete copy with no dash, placeholder or buzzword', () => {
      expect(copyIssues(content)).toEqual([]);
    });

    it('keeps tech names identical across locales', () => {
      const itemsOf = (locale: (typeof routing.locales)[number]) =>
        content[locale].engineering.stack.map((group) => group.items);

      for (const locale of routing.locales) {
        expect(itemsOf(locale)).toEqual(itemsOf(routing.defaultLocale));
      }
    });

    it('captions every figure in every locale', () => {
      const ids = meta.figures.map((figure) => figure.id).sort();

      for (const locale of routing.locales) {
        expect(Object.keys(content[locale].product.figures).sort()).toEqual(ids);
      }
    });

    it('points to screens that exist under public/', () => {
      const sources = meta.figures.flatMap((figure) => [figure.src.light, figure.src.dark]);

      for (const src of sources) {
        expect(existsSync(path.join(process.cwd(), 'public', src)), src).toBe(true);
      }
    });

    it('links to an https URL', () => {
      expect(new URL(meta.url).protocol).toBe('https:');
    });
  });
});

describe('getProject', () => {
  it('resolves the locale content and the case study number', () => {
    const project = getProject('strive', 'fr');

    expect(project.content).toBe(projects.strive.content.fr);
    expect(project.meta).toBe(projects.strive.meta);
    expect(project.number).toBe('01');
  });

  it('falls back to the default locale', () => {
    expect(getProject('strive', 'de').content).toBe(projects.strive.content.en);
  });
});

describe('messages', () => {
  it('has the same keys in both locales', () => {
    expect(shapeOf(frMessages)).toEqual(shapeOf(enMessages));
  });

  it('has no empty string, dash or placeholder', () => {
    const rules: CopyRule[] = ['empty', 'dash', 'placeholder'];

    expect(copyIssues(enMessages, rules)).toEqual([]);
    expect(copyIssues(frMessages, rules)).toEqual([]);
  });
});
