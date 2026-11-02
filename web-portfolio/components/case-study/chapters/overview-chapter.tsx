import { useTranslations } from 'next-intl';
import { BentoLink } from '@/components/bento/bento-link';
import { ChapterHeading, type ChapterInfo } from '@/components/case-study/chapter-heading';
import { OverviewIntro } from '@/components/case-study/overview-intro';
import { Steps } from '@/components/case-study/steps';
import type { ProjectContent } from '@/lib/projects';

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
      <OverviewIntro
        overview={overview}
        facts={[
          ...facts.map((fact) => ({ label: t(fact.label), value: overview.facts[fact.key] })),
          { label: t('factAvailability'), value: new URL(link.href).host },
        ]}
      >
        <BentoLink
          href={link.href}
          external
          className="project-plaque mt-6 px-[18px] py-3 text-(--project-text) transition-[filter] hover:text-(--project-text)"
        >
          {link.label}
        </BentoLink>
      </OverviewIntro>
      <div className="mt-12">
        <ChapterHeading chapter={chapter}>{overview.pillars.heading}</ChapterHeading>
        <Steps items={overview.pillars.items} className="mt-8 lg:grid-cols-3" />
      </div>
    </>
  );
}
