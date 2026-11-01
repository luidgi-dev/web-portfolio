import { useTranslations } from 'next-intl';
import { ChapterHeading, type ChapterInfo } from '@/components/case-study/chapter-heading';
import { SampleChips } from '@/components/case-study/sample-chips';
import { SectionLabel } from '@/components/case-study/section-label';
import { StackCapsules } from '@/components/case-study/stack-capsules';
import { Steps } from '@/components/case-study/steps';
import type { ProjectContent } from '@/lib/projects';

interface EngineeringChapterProps {
  chapter: ChapterInfo;
  engineering: ProjectContent['engineering'];
}

export function EngineeringChapter({ chapter, engineering }: EngineeringChapterProps) {
  const t = useTranslations('CaseStudy');

  return (
    <>
      <p className="max-w-3xl font-display text-xl leading-snug font-bold tracking-tight md:text-2xl">
        {engineering.intro}
      </p>
      <SampleChips items={engineering.numbers} code={chapter.number} className="mt-8" />
      <div className="mt-12">
        <SectionLabel>{t('stack')}</SectionLabel>
        <div className="mt-4">
          <StackCapsules groups={engineering.stack} />
        </div>
      </div>
      <div className="mt-12">
        <ChapterHeading chapter={chapter}>{engineering.pipeline.heading}</ChapterHeading>
        <Steps items={engineering.pipeline.steps} className="mt-8 sm:grid-cols-2 lg:grid-cols-4" />
      </div>
      <div className="mt-12">
        <SectionLabel>{t('keyDecisions')}</SectionLabel>
        <Steps items={engineering.decisions} className="mt-4 lg:grid-cols-3" />
      </div>
    </>
  );
}
