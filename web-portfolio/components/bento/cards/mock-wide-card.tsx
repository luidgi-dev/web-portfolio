import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';

export async function MockWideCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={2} label={t('mockWideLabel')}>
      <h2 className="text-display text-2xl leading-tight font-bold tracking-tight md:text-4xl">
        {t('mockWideTitleBefore')}{' '}
        <span className="text-primary italic">{t('mockWideKeyword')}</span>{' '}
        {t('mockWideTitleAfter')}
      </h2>
      <p className="mt-4 font-sans text-base leading-relaxed text-foreground/90">
        {t('mockWideDescription')}
      </p>
    </BentoCard>
  );
}
