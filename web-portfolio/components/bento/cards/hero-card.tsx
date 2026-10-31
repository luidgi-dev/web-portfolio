import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { BreezeBlockSunlight } from '@/components/bento/decor/breeze-block-sunlight';

export async function HeroCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={2} rowSpan={2} className="relative min-h-[280px] md:min-h-[340px]">
      <BreezeBlockSunlight />
      <div className="relative flex h-full flex-col justify-between gap-6" data-testid="hero-card">
        <p className="font-sans text-sm font-medium text-muted-foreground">{t('heroName')}</p>
        <div>
          <h1 className="font-display text-3xl leading-[1.05] font-bold tracking-tight md:text-5xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-foreground/85 md:text-base">
            {t('heroDescription')}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
