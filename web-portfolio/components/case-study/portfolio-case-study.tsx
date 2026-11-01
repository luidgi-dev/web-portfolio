import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CaseStudyShell } from '@/components/case-study/case-study-shell';
import { BuildLogChapter } from '@/components/case-study/chapters/build-log-chapter';
import { EngineeringChapter } from '@/components/case-study/chapters/engineering-chapter';
import { OverviewChapter } from '@/components/case-study/chapters/overview-chapter';
import { DesignChapter } from '@/components/case-study/design-chapter';
import { evidenceShots } from '@/components/case-study/portfolio-visuals';
import type { PortfolioContent, ProjectMeta } from '@/lib/projects';
import { toOrdinal } from '@/lib/utils';

interface PortfolioCaseStudyProps {
  meta: ProjectMeta;
  content: PortfolioContent;
}

export function PortfolioCaseStudy({ meta, content }: PortfolioCaseStudyProps) {
  const t = useTranslations('CaseStudy');
  const { overview, design, engineering, buildLog } = content;
  // Engineering is the third chapter; its chips are coded 03-A, 03-B in both places.
  const engineeringNumber = toOrdinal(2);
  // The caption above each shot already describes it.
  const evidence = (key: keyof typeof evidenceShots) => (
    <Image
      src={evidenceShots[key].src}
      alt=""
      width={evidenceShots[key].width}
      height={evidenceShots[key].height}
      sizes="(min-width: 1024px) 35vw, 90vw"
      className="w-full rounded-[2px] border border-border"
    />
  );

  return (
    <CaseStudyShell
      chapters={[
        {
          value: 'overview',
          label: 'tabOverview',
          render: (chapter) => (
            <OverviewChapter
              chapter={chapter}
              overview={overview}
              link={{ href: meta.url, label: t('codeCta') }}
            />
          ),
        },
        {
          value: 'design',
          label: 'tabDesign',
          render: (chapter) => (
            <DesignChapter
              chapter={chapter}
              design={design}
              chips={{ items: engineering.numbers, code: engineeringNumber }}
            />
          ),
        },
        {
          value: 'engineering',
          label: 'tabEngineering',
          render: (chapter) => <EngineeringChapter chapter={chapter} engineering={engineering} />,
        },
        {
          value: 'buildLog',
          label: 'tabBuildLog',
          render: (chapter) => (
            <BuildLogChapter
              chapter={chapter}
              buildLog={buildLog}
              evidence={{ before: evidence('before'), after: evidence('after') }}
            />
          ),
        },
      ]}
    />
  );
}
