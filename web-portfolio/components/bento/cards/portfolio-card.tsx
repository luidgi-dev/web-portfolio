import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { cn } from '@/lib/utils';

// Spans of the home grid, in DOM order: the map is the page itself, this card lit up.
const PAGE_MAP = [
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 2, self: true },
  { col: 2, row: 2 },
];

export async function PortfolioCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} rowSpan={2} label={t('portfolioType')} labelStyle="chip">
      <div className="flex h-full flex-col" data-testid="portfolio-card">
        <div
          role="img"
          aria-label={t('portfolioMapLabel')}
          className="hidden h-24 grid-cols-4 md:grid grid-rows-5 gap-1 rounded-xl border border-border/60 p-1.5"
        >
          {PAGE_MAP.map(({ col, row, self }, index) => (
            <span
              key={index}
              className={cn('rounded-[3px]', self ? 'bg-primary' : 'bg-foreground/10')}
              style={{ gridColumn: `span ${col}`, gridRow: `span ${row}` }}
            />
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t('projectTagsLabel')}>
          {(t.raw('portfolioTags') as string[]).map((tag) => (
            <li key={tag}>
              <span className="bento-chip">{tag}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-4 font-display text-xl font-bold tracking-tight">
          {t('portfolioTitle')}
        </h2>
        <p className="mt-2 font-sans text-sm font-semibold tracking-tight text-foreground/90">
          {t('portfolioTagline')}
        </p>
        <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-foreground/90">
          {t('portfolioSummary')}
        </p>
        <p className="mt-4 font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
          {t('portfolioSoon')}
        </p>
      </div>
    </BentoCard>
  );
}
