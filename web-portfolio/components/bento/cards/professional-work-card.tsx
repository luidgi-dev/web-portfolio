import { getFormatter, getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { experienceStats } from '@/lib/experience';

const CASES = [
  {
    label: 'professionalCase1Label',
    body: 'professionalCase1Body',
    badge: 'professionalCase1Badge',
  },
  { label: 'professionalCase2Label', body: 'professionalCase2Body' },
] as const;

export async function ProfessionalWorkCard() {
  const [t, format] = await Promise.all([getTranslations('HomePage'), getFormatter()]);

  return (
    <BentoCard colSpan={2} rowSpan={2} label={t('professionalWorkLabel')}>
      <div className="flex h-full flex-col" data-testid="professional-work-card">
        <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
          {t('professionalWorkTitle')}
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/90">
          {t('professionalWorkIntro')}
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {CASES.map((item) => (
            <article key={item.label} className="border-l-2 border-primary/50 pl-3">
              <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                {t(item.label)}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/90">
                {t(item.body)}
              </p>
              {'badge' in item ? <span className="bento-chip mt-3">{t(item.badge)}</span> : null}
            </article>
          ))}
        </div>
        <dl
          aria-label={t('professionalStatsLabel')}
          className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-4 md:grid-cols-4"
        >
          {experienceStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 font-sans text-[11px] leading-snug text-muted-foreground">
                {t(stat.label)}
              </dt>
              <dd className="font-display text-2xl font-bold tracking-tight">
                {'prefix' in stat ? stat.prefix : null}
                {format.number(stat.value)}
                {'suffix' in stat ? stat.suffix : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </BentoCard>
  );
}
