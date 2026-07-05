import { getTranslations } from 'next-intl/server';
import { RadarOrnament } from '@/components/bento/decor/radar-ornament';
import { BentoCard } from '@/components/bento/bento-card';

export async function AtelierCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} padded={false} className="min-h-[180px]">
      <div className="relative flex h-full min-h-[180px] flex-col" data-testid="atelier-card">
        <div className="atelier-material absolute inset-0 opacity-90" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/15 via-transparent to-background/75"
          aria-hidden="true"
        />
        <RadarOrnament className="pointer-events-none absolute -top-2 -right-2 h-20 w-20 opacity-[0.1]" />
        <div className="relative mt-auto p-3">
          <p className="font-mono text-[8px] tracking-[0.3em] text-foreground/75 uppercase">
            {t('atelierLabel')}
          </p>
          <p className="mt-2 font-mono text-[8px] tracking-[0.15em] text-foreground/90 uppercase">
            {t('profileMetaFrance')} · {t('profileMetaRemote')} · {t('profileMetaOpen')}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
