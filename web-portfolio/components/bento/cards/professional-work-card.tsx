import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { CaseStudyCta, CaseStudyModal } from '@/components/bento/case-study-modal';
import { ProfessionalWorkStudy } from '@/components/case-study/professional-work-study';
import { experienceStats, formatStat, getExperience } from '@/lib/experience';

const CASES = [
  {
    label: 'professionalCase1Label',
    body: 'professionalCase1Body',
    badge: 'professionalCase1Badge',
  },
  { label: 'professionalCase2Label', body: 'professionalCase2Body' },
] as const;

export async function ProfessionalWorkCard() {
  const [t, tCaseStudy, format, locale] = await Promise.all([
    getTranslations('HomePage'),
    getTranslations('CaseStudy'),
    getFormatter(),
    getLocale(),
  ]);

  return (
    <BentoCard
      colSpan={2}
      rowSpan={2}
      interactive
      label={t('professionalWorkLabel')}
      labelStyle="chip"
      className="relative"
    >
      <div className="flex h-full flex-col" data-testid="professional-work-card">
        <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
          {t('professionalWorkTitle')}
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/90">
          {t('professionalWorkIntro')}
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {CASES.map((item) => (
            <article key={item.label} className="border-t border-border pt-3">
              <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                {t(item.label)}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/90">
                {t(item.body)}
              </p>
              {'badge' in item ? (
                <p className="mt-3 flex items-center gap-2 font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {t(item.badge)}
                </p>
              ) : null}
            </article>
          ))}
        </div>
        <dl
          aria-label={t('professionalStatsLabel')}
          className="mt-auto mb-2 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-4 md:grid-cols-4"
        >
          {experienceStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 font-sans text-[11px] leading-snug text-muted-foreground">
                {t(stat.label)}
              </dt>
              <dd className="font-display text-2xl font-bold tracking-tight">
                {formatStat(stat, (value) => format.number(value))}
              </dd>
            </div>
          ))}
        </dl>
        <CaseStudyCta />
      </div>
      <CaseStudyModal
        openLabel={t('professionalOpenLabel')}
        title={t('professionalWorkTitle')}
        kicker={tCaseStudy('workKicker')}
        description={t('professionalWorkIntro')}
      >
        <ProfessionalWorkStudy content={getExperience(locale)} />
      </CaseStudyModal>
    </BentoCard>
  );
}
