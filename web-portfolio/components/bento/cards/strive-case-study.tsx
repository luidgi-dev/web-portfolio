'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BentoLink } from '@/components/bento/bento-link';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { siteLinks } from '@/lib/site';
import { striveTags } from '@/lib/strive';

export function StriveCaseStudy() {
  const t = useTranslations('HomePage');

  return (
    <Tabs defaultValue="visuals">
      <TabsList aria-label={t('striveTabsLabel')}>
        <TabsTab value="visuals">{t('striveTabVisuals')}</TabsTab>
        <TabsTab value="technical">{t('striveTabTechnical')}</TabsTab>
      </TabsList>
      <TabsPanel value="visuals">
        <p className="font-sans text-sm leading-relaxed text-foreground/90">
          {t('striveVisualsHint')}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Image
            src="/strive/logo-dark.svg"
            alt={t('striveLogoAlt')}
            width={72}
            height={72}
            className="rounded-xl border border-border/40"
          />
          <Image
            src="/strive/logo.svg"
            alt={t('striveLogoAlt')}
            width={72}
            height={72}
            className="rounded-xl border border-border/40 bg-card"
          />
        </div>
      </TabsPanel>
      <TabsPanel value="technical">
        <p className="font-sans text-sm leading-relaxed text-foreground/90">
          {t('striveDescription')}
        </p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t('striveTagsLabel')}>
          {striveTags.map((tag) => (
            <li key={tag}>
              <span className="bento-chip">{tag}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
          {t('striveAvailability')}
        </p>
        <div className="mt-4">
          <BentoLink href={siteLinks.strive} external>
            {t('striveLiveCta')}
          </BentoLink>
        </div>
      </TabsPanel>
    </Tabs>
  );
}
