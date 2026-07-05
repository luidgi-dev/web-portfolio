import { getTranslations } from 'next-intl/server';
import { BauhausGeometryArt } from '@/components/bento/decor/bauhaus-geometry-art';
import { BentoCard } from '@/components/bento/bento-card';
import { siteLinks } from '@/lib/site';
import { cn } from '@/lib/utils';

export async function BauhausGeometryCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={2} padded={false} className="min-h-[180px]">
      <div
        className="relative flex h-full min-h-[180px] flex-col"
        data-testid="bauhaus-geometry-card"
      >
        <BauhausGeometryArt
          className="absolute inset-0 h-full w-full"
          aria-label={t('bauhausArtLabel')}
        />
        <div
          className="relative mt-auto border-t border-border/50 bg-card/85 px-4 py-3 backdrop-blur-[2px]"
          aria-hidden="false"
        >
          <nav
            className="flex flex-wrap items-center gap-x-2 gap-y-1"
            aria-label={t('bauhausNavLabel')}
          >
            <a
              href={siteLinks.privacy}
              className={cn(
                'font-mono text-[9px] tracking-[0.18em] text-foreground/80 uppercase transition-colors hover:text-primary'
              )}
            >
              {t('bauhausPrivacy')}
            </a>
            <span className="text-foreground/35" aria-hidden="true">
              ·
            </span>
            <a
              href={siteLinks.terms}
              className={cn(
                'font-mono text-[9px] tracking-[0.18em] text-foreground/80 uppercase transition-colors hover:text-primary'
              )}
            >
              {t('bauhausTerms')}
            </a>
            <span className="text-foreground/35" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground uppercase">
              © 2026
            </span>
          </nav>
        </div>
      </div>
    </BentoCard>
  );
}
