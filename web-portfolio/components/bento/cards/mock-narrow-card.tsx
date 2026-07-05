import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';

export async function MockNarrowCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} label={t('mockNarrowLabel')}>
      <p className="font-sans text-base leading-relaxed text-foreground/90">
        {t('mockNarrowDescription')}
      </p>
    </BentoCard>
  );
}
