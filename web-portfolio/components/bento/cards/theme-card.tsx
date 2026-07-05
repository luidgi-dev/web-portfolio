import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { ThemeSelector } from '@/components/ui/theme-selector';

export async function ThemeCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} label={t('themeLabel')}>
      <p className="mb-3 font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
        {t('themeHint')}
      </p>
      <ThemeSelector />
    </BentoCard>
  );
}
