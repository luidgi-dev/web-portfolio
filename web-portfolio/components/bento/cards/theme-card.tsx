import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { ThemeSelector } from '@/components/ui/theme-selector';

export async function ThemeCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} label={t('themeLabel')}>
      <ThemeSelector />
    </BentoCard>
  );
}
