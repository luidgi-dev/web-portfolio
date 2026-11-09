import { routing, type Locale } from '@/i18n/routing';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luidgi.dev';

export const siteLinks = {
  linkedin: 'https://www.linkedin.com/in/luidgi-joseph/',
  github: 'https://github.com/luidgi-dev',
  email: 'mailto:luidgi.dev@gmail.com',
  cv: '/cv/CV_JOSEPH_Luidgi.pdf',
  privacy: '/privacy',
  terms: '/terms',
} as const;

export function localeAlternates(locale: Locale) {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}`]));

  return {
    canonical: `/${locale}`,
    languages: { ...languages, 'x-default': `/${routing.defaultLocale}` },
  };
}
