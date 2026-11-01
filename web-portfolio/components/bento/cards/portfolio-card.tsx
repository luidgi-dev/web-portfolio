import { getLocale, getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { CaseStudyCta, CaseStudyModal } from '@/components/bento/case-study-modal';
import { PortfolioCaseStudy } from '@/components/case-study/portfolio-case-study';
import { getProject } from '@/lib/projects';
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
  const [t, tCaseStudy, locale] = await Promise.all([
    getTranslations('HomePage'),
    getTranslations('CaseStudy'),
    getLocale(),
  ]);
  const { meta, content, number } = getProject('portfolio', locale);

  return (
    <BentoCard
      colSpan={1}
      rowSpan={2}
      interactive
      label={content.type}
      labelStyle="chip"
      className="relative overflow-hidden"
    >
      <div className="relative flex h-full flex-col" data-testid="portfolio-card">
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
          {content.tags.map((tag) => (
            <li key={tag}>
              <span className="bento-chip">{tag}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-4 font-display text-xl font-bold tracking-tight">{content.title}</h2>
        <p className="mt-2 font-sans text-sm font-semibold tracking-tight text-foreground/90">
          {content.tagline}
        </p>
        <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-foreground/90">
          {content.summary}
        </p>
        <CaseStudyCta />
      </div>
      <CaseStudyModal
        openLabel={t('portfolioOpenLabel')}
        title={content.title}
        kicker={tCaseStudy('kicker', { number, type: content.type })}
        description={content.tagline}
      >
        <PortfolioCaseStudy meta={meta} content={content} />
      </CaseStudyModal>
    </BentoCard>
  );
}
