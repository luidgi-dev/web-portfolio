import { getTranslations } from 'next-intl/server';
import { BauhausGeometryArt } from '@/components/bento/decor/bauhaus-geometry-art';
import { BauhausFooterNav } from '@/components/bento/bauhaus-footer-nav';
import { BentoCard } from '@/components/bento/bento-card';

export async function BauhausGeometryCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} rowSpan={2} padded={false} className="min-h-[180px]">
      <div
        className="relative flex h-full min-h-[180px] flex-col"
        data-testid="bauhaus-geometry-card"
      >
        <BauhausGeometryArt
          className="absolute inset-0 h-full w-full"
          aria-label={t('bauhausArtLabel')}
        />
        <div
          className="relative mt-auto border-t border-border/50 bg-card/90 px-4 py-0.5"
          aria-hidden="false"
        >
          <BauhausFooterNav />
        </div>
      </div>
    </BentoCard>
  );
}
