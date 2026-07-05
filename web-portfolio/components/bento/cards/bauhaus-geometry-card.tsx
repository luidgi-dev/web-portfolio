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
        <BauhausGeometryArt className="absolute inset-0 h-full w-full" />
        <div className="relative mt-auto flex items-end justify-between gap-3 px-4 py-3">
          <nav
            className="flex flex-wrap items-center gap-x-2 gap-y-1"
            aria-label={t('bauhausNavLabel')}
          >
            <a
              href={siteLinks.privacy}
              className={cn(
                'font-mono text-[8px] tracking-wider text-muted-foreground/80 uppercase transition-colors hover:text-primary'
              )}
            >
              {t('bauhausPrivacy')}
            </a>
            <span className="text-muted-foreground/40" aria-hidden="true">
              ·
            </span>
            <a
              href={siteLinks.terms}
              className={cn(
                'font-mono text-[8px] tracking-wider text-muted-foreground/80 uppercase transition-colors hover:text-primary'
              )}
            >
              {t('bauhausTerms')}
            </a>
            <span className="text-muted-foreground/40" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-[8px] tracking-wider text-muted-foreground/60 uppercase">
              © 2026
            </span>
          </nav>
        </div>
      </div>
    </BentoCard>
  );
}
