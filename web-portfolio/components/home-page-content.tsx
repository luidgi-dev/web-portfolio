'use client';

import { useTranslations } from 'next-intl';
import { WarmAmbientGlow } from '@/components/warm-ambient-glow';
import { BentoCard } from '@/components/ui/bento-card';
import { Button } from '@/components/ui/button';
import { CtaLink } from '@/components/ui/cta-link';
import { Input } from '@/components/ui/input';
import { McmTag } from '@/components/ui/mcm-tag';

export function HomePageContent() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-1 flex-col bg-background px-4 py-10 md:px-8 md:py-16">
      <main className="bento-grid mx-auto w-full max-w-6xl" data-testid="bento-grid" role="main">
        <BentoCard label={t('heroLabel')} className="relative md:col-span-3 md:row-span-2">
          <WarmAmbientGlow />
          <h1 className="text-display text-5xl leading-tight font-bold tracking-tight md:text-7xl">
            {t('heroTitleBefore')} <span className="text-primary italic">{t('heroKeyword')}</span>{' '}
            {t('heroTitleAfter')}
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-foreground/90">
            {t('heroDescription')}
          </p>
        </BentoCard>

        <BentoCard label={t('aboutLabel')} className="md:col-span-1">
          <p className="font-sans text-base leading-relaxed text-foreground/90">
            {t('aboutDescription')}
          </p>
        </BentoCard>

        <BentoCard label={t('tagsLabel')} className="md:col-span-1">
          <div className="flex flex-wrap gap-2">
            <McmTag variant="accent">{t('tagDesign')}</McmTag>
            <McmTag>{t('tagEngineering')}</McmTag>
          </div>
        </BentoCard>

        <BentoCard label={t('contactLabel')} className="md:col-span-2">
          <p className="mb-4 font-sans text-base leading-relaxed text-foreground/90">
            {t('contactDescription')}
          </p>
          <CtaLink href="mailto:hello@example.com" text={t('ctaText')} />
        </BentoCard>

        <BentoCard label={t('formLabel')} className="md:col-span-2">
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Input type="email" name="email" placeholder={t('emailPlaceholder')} />
            <Button type="submit">{t('submitButton')}</Button>
          </form>
        </BentoCard>
      </main>
    </div>
  );
}
