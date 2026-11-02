import { hasLocale } from 'next-intl';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];

export function resolveLocale(locale: string | undefined): Locale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}
