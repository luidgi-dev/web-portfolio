'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type AppLocale = (typeof routing.locales)[number];

const localeOptions: {
  code: AppLocale;
  endonym: string;
  codeLabel: string;
}[] = [
  { code: 'en', endonym: 'English', codeLabel: 'EN' },
  { code: 'fr', endonym: 'Français', codeLabel: 'FR' },
];

export function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('HomePage');

  function switchLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) {
      return;
    }

    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-border"
      role="radiogroup"
      aria-label={t('localeSwitcherLabel')}
      data-testid="locale-switcher"
    >
      {localeOptions.map(({ code, endonym, codeLabel }, index) => {
        const isActive = locale === code;

        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={endonym}
            onClick={() => switchLocale(code)}
            className={cn(
              'flex min-h-[52px] flex-col items-center justify-center gap-0.5 px-3 transition-all duration-200 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              index > 0 && 'border-t border-border',
              isActive
                ? 'lang-toggle-active text-primary-foreground'
                : 'bg-transparent text-muted-foreground opacity-50 hover:bg-muted/40 hover:text-foreground hover:opacity-100'
            )}
          >
            <span className="font-mono text-[8px] tracking-[0.35em]">{codeLabel}</span>
            <span className={cn('font-sans text-sm', isActive ? 'font-medium' : 'font-normal')}>
              {endonym}
            </span>
          </button>
        );
      })}
    </div>
  );
}
