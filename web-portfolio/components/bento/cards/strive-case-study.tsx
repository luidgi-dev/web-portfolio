'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BentoLink } from '@/components/bento/bento-link';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { siteLinks } from '@/lib/site';
import { striveTags } from '@/lib/strive';

const tabs = [
  { value: 'visuals', label: 'striveTabVisuals' },
  { value: 'technical', label: 'striveTabTechnical' },
] as const;

const figures = [
  { src: '/strive/logo-dark.svg', caption: 'striveFigLogoDark' },
  { src: '/strive/logo.svg', caption: 'striveFigLogoLight' },
] as const;

const toOrdinal = (index: number) => String(index + 1).padStart(2, '0');

function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-right text-sm">{children}</dd>
    </div>
  );
}

export function StriveCaseStudy() {
  const t = useTranslations('HomePage');

  return (
    <Tabs defaultValue="visuals">
      <TabsList aria-label={t('striveTabsLabel')}>
        {tabs.map((tab, index) => (
          <TabsTab key={tab.value} value={tab.value}>
            <span className="mr-2.5 text-accent" aria-hidden="true">
              {toOrdinal(index)}
            </span>
            {t(tab.label)}
          </TabsTab>
        ))}
      </TabsList>
      <TabsPanel value="visuals">
        <p className="font-sans text-sm leading-relaxed text-foreground/90">
          {t('striveVisualsHint')}
        </p>
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
          {figures.map((figure, index) => (
            <figure key={figure.src}>
              <div className="grid aspect-[4/3] place-items-center rounded-[4px] border border-(--border-strong) bg-background shadow-[inset_0_0_0_10px_var(--card)]">
                <Image
                  src={figure.src}
                  alt={t('striveLogoAlt')}
                  width={96}
                  height={96}
                  className="rounded-2xl"
                />
              </div>
              <figcaption className="mt-2.5 text-xs text-foreground/85">
                <span className="mr-2 font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
                  {t('figureLabel')} {toOrdinal(index)}
                </span>
                {t(figure.caption)}
              </figcaption>
            </figure>
          ))}
        </div>
      </TabsPanel>
      <TabsPanel value="technical">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <p className="font-sans text-[15px] leading-relaxed text-foreground/90">
            {t('striveDescription')}
          </p>
          <div>
            <dl className="divide-y divide-border border-y border-border">
              <SpecRow label={t('striveSpecType')}>{t('striveLabel')}</SpecRow>
              <SpecRow label={t('striveTagsLabel')}>
                <ul className="flex flex-wrap justify-end gap-1.5">
                  {striveTags.map((tag) => (
                    <li key={tag}>
                      <span className="bento-chip">{tag}</span>
                    </li>
                  ))}
                </ul>
              </SpecRow>
              <SpecRow label={t('striveSpecAvailability')}>
                {new URL(siteLinks.strive).host}
              </SpecRow>
            </dl>
            <BentoLink
              href={siteLinks.strive}
              external
              className="project-plaque mt-6 px-[18px] py-3 text-(--project-text) transition-[filter] hover:text-(--project-text)"
            >
              {t('striveLiveCta')}
            </BentoLink>
          </div>
        </div>
      </TabsPanel>
    </Tabs>
  );
}
