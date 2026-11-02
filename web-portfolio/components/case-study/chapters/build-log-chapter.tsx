import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { bodyText } from '@/components/case-study/case-study-shell';
import { CatalogList } from '@/components/case-study/catalog-list';
import { ChapterHeading, type ChapterInfo } from '@/components/case-study/chapter-heading';
import { PullQuote } from '@/components/case-study/pull-quote';
import { SampleChips } from '@/components/case-study/sample-chips';
import { SectionLabel } from '@/components/case-study/section-label';
import { Steps } from '@/components/case-study/steps';
import type { ProjectContent } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface BuildLogChapterProps {
  chapter: ChapterInfo;
  buildLog: ProjectContent['buildLog'];
  // The visual under each before and after caption, drawn by the project.
  evidence: Record<'before' | 'after', ReactNode>;
}

export function BuildLogChapter({ chapter, buildLog, evidence }: BuildLogChapterProps) {
  const t = useTranslations('CaseStudy');

  return (
    <>
      <SectionLabel>{t('inNumbers')}</SectionLabel>
      <SampleChips items={buildLog.stats} code={chapter.number} className="mt-3" />
      <div className="mt-12">
        <SectionLabel>{t('whereItStands')}</SectionLabel>
        <CatalogList items={buildLog.results} prefix={t('itemPrefix')} className="mt-3" />
      </div>
      <div className="mt-12">
        <SectionLabel>{t('lessons')}</SectionLabel>
        <Steps items={buildLog.lessons} className="mt-4 sm:grid-cols-2 lg:grid-cols-4" />
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <ChapterHeading chapter={chapter}>{buildLog.story.heading}</ChapterHeading>
          {buildLog.story.paragraphs.map((paragraph) => (
            <p key={paragraph} className={cn('mt-5', bodyText)}>
              {paragraph}
            </p>
          ))}
          <PullQuote className="mt-10">{buildLog.story.quote}</PullQuote>
        </div>
        <div className="grid content-start gap-5 rounded-[4px] border border-border p-5">
          {(['before', 'after'] as const).map((key) => (
            <div key={key} className="grid gap-3">
              <p className="text-sm">
                <span className="mr-2 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
                  {t(key)}
                </span>
                {buildLog.story[key]}
              </p>
              {evidence[key]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
