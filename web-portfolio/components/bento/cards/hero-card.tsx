import { getTranslations } from 'next-intl/server';
import { HeroArcOrnament } from '@/components/bento/decor/hero-arc-ornament';
import { BentoCard } from '@/components/bento/bento-card';
import { WarmAmbientGlow } from '@/components/warm-ambient-glow';

export async function HeroCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard
      colSpan={2}
      rowSpan={2}
      label={t('heroLabel')}
      className="relative min-h-[280px] md:min-h-[340px]"
    >
      <WarmAmbientGlow />
      <HeroArcOrnament className="pointer-events-none absolute -top-8 -right-10 h-56 w-56 md:-right-6 md:h-64 md:w-64" />
      <div className="relative flex h-full flex-col justify-between" data-testid="hero-card">
        <p className="font-mono text-[9px] tracking-[0.45em] text-muted-foreground uppercase">
          {t('heroName')}
        </p>
        <div>
          <h1 className="font-display text-3xl leading-[1.05] font-bold tracking-tight md:text-5xl">
            {t('heroLine1')}
            <br />
            <span>
              {t('heroLine2Before')}
              <span className="text-primary italic">{t('heroLine2Accent')}</span>
              {t('heroLine2After')}
            </span>
          </h1>
          <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-foreground/85 md:text-base">
            {t('heroDescription')}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
