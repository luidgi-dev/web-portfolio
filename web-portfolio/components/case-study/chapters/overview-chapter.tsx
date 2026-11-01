import { useTranslations } from 'next-intl';
import { BentoLink } from '@/components/bento/bento-link';
import { bodyText } from '@/components/case-study/case-study-shell';
import { ChapterHeading, type ChapterInfo } from '@/components/case-study/chapter-heading';
import { SpecList, SpecRow } from '@/components/case-study/spec-list';
import { Steps } from '@/components/case-study/steps';
import type { ProjectContent } from '@/lib/projects';
import { cn } from '@/lib/utils';

const facts = [
  { key: 'role', label: 'factRole' },
  { key: 'timeline', label: 'factTimeline' },
  { key: 'platform', label: 'factPlatform' },
  { key: 'status', label: 'factStatus' },
] as const;

interface OverviewChapterProps {
  chapter: ChapterInfo;
  overview: ProjectContent['overview'];
  // Where the project lives; its host doubles as the Availability fact.
  link: { href: string; label: string };
}

export function OverviewChapter({ chapter, overview, link }: OverviewChapterProps) {
  const t = useTranslations('CaseStudy');

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <p className="font-display text-lg text-muted-foreground">{overview.problem}</p>
          <p className="mt-4 font-display text-2xl leading-snug font-bold tracking-tight md:text-3xl">
            {overview.lead}
          </p>
          {overview.paragraphs.map((paragraph) => (
            <p key={paragraph} className={cn('mt-4', bodyText)}>
              {paragraph}
            </p>
          ))}
        </div>
        <div>
          <SpecList>
            {facts.map((fact) => (
              <SpecRow key={fact.key} label={t(fact.label)}>
                {overview.facts[fact.key]}
              </SpecRow>
            ))}
            <SpecRow label={t('factAvailability')}>{new URL(link.href).host}</SpecRow>
          </SpecList>
          <BentoLink
            href={link.href}
            external
            className="project-plaque mt-6 px-[18px] py-3 text-(--project-text) transition-[filter] hover:text-(--project-text)"
          >
            {link.label}
          </BentoLink>
        </div>
      </div>
      <div className="mt-12">
        <ChapterHeading chapter={chapter}>{overview.pillars.heading}</ChapterHeading>
        <Steps items={overview.pillars.items} className="mt-8 lg:grid-cols-3" />
      </div>
    </>
  );
}
