import { describe, expect, it } from 'vitest';
import { localeAlternates, SITE_URL } from './site';

describe('SITE_URL', () => {
  it('falls back to the production domain', () => {
    expect(SITE_URL).toBe('https://luidgi.dev');
  });
});

describe('localeAlternates', () => {
  it.each(['en', 'fr'] as const)('points the %s canonical to its own path', (locale) => {
    expect(localeAlternates(locale)).toEqual({
      canonical: `/${locale}`,
      languages: { en: '/en', fr: '/fr', 'x-default': '/en' },
    });
  });
});
