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
              'group flex min-h-[44px] flex-col items-center gap-1.5 rounded-lg p-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              isActive
                ? 'ring-2 ring-primary ring-offset-1 ring-offset-card'
                : 'opacity-70 hover:opacity-100'
            )}
          >
            <span
              className={cn(
                'h-12 w-full rounded-xl border border-border/60 transition-transform duration-200',
                isActive && 'scale-[1.03] shadow-sm',
                !isActive && 'group-hover:scale-[1.02]'
              )}
              style={{ background: theme.swatchGradient }}
              aria-hidden="true"
            />
            <span
              className={cn(
                'w-full text-center font-mono text-[9px] leading-snug tracking-[0.18em] uppercase',
                isActive ? 'font-medium text-primary' : 'text-muted-foreground'
              )}
            >
              {theme.number} · {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
