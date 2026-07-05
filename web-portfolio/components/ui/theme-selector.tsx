'use client';

import { useLocale } from 'next-intl';
import { useTheme } from '@/components/theme-provider';
import { themes } from '@/lib/themes';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const locale = useLocale();
  const { themeId, setThemeId } = useTheme();

  return (
    <div
      className="grid grid-cols-2 gap-2"
      role="radiogroup"
      aria-label={locale === 'fr' ? 'Ambiances' : 'Ambiances'}
      data-testid="theme-selector"
    >
      {themes.map((theme) => {
        const isActive = themeId === theme.id;
        const label = locale === 'fr' ? theme.nameFr : theme.nameEn;

        return (
          <button
            key={theme.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${theme.number} ${label}`}
            onClick={() => setThemeId(theme.id)}
            className={cn(
              'flex min-h-[44px] flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              isActive
                ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]'
                : 'border-border hover:border-primary/40'
            )}
          >
            <span
              className="h-5 w-5 rounded-full border border-border"
              style={{ backgroundColor: theme.swatch }}
              aria-hidden="true"
            />
            <span className="font-mono text-[8px] tracking-wider uppercase">
              {theme.number} · {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
