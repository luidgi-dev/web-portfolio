import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { professionalDisciplines } from '@/lib/professional-work';

export async function ProfessionalWorkCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={2} label={t('professionalWorkLabel')}>
      <div data-testid="professional-work-card">
        <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
          {t('professionalWorkTitle')}
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/90">
          {t('professionalWorkDescription')}
        </p>
        <ul
          className="mt-5 flex flex-wrap gap-2"
          aria-label={t('professionalWorkDisciplinesLabel')}
        >
          {professionalDisciplines.map((discipline) => (
            <li key={discipline.key}>
              <span className="bento-chip">{t(discipline.labelKey)}</span>
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  );
}
