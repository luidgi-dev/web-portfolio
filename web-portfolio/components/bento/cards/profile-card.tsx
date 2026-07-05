import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';

export async function ProfileCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} label={t('profileLabel')}>
      <div data-testid="profile-card">
        <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
          {t('profileTitle')}
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/90">
          {t('profileDescription')}
        </p>
      </div>
    </BentoCard>
  );
}
