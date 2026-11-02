import { useTranslations } from 'next-intl';
import { bodyText, CaseStudyShell } from '@/components/case-study/case-study-shell';
import { CatalogList } from '@/components/case-study/catalog-list';
import { ChapterHeading, type ChapterInfo } from '@/components/case-study/chapter-heading';
import { BuildLogChapter } from '@/components/case-study/chapters/build-log-chapter';
import { EngineeringChapter } from '@/components/case-study/chapters/engineering-chapter';
import { OverviewChapter } from '@/components/case-study/chapters/overview-chapter';
import { FigurePlate, Plate } from '@/components/case-study/figure-plate';
import { SectionLabel } from '@/components/case-study/section-label';
import {
  InsightCards,
  MomentumWindow,
  momentumWindows,
} from '@/components/case-study/strive-visuals';
import type { ProjectMeta, StriveContent } from '@/lib/projects';
import { cn, toOrdinal } from '@/lib/utils';

interface StriveCaseStudyProps {
  meta: ProjectMeta;
  content: StriveContent;
}

export function StriveCaseStudy({ meta, content }: StriveCaseStudyProps) {
  const t = useTranslations('CaseStudy');
  const { overview, product, engineering, buildLog } = content;

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
              link={{ href: meta.url, label: t('liveCta') }}
            />
          ),
        },
        {
          value: 'product',
          label: 'tabProduct',
          render: (chapter) => <ProductChapter chapter={chapter} meta={meta} product={product} />,
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
              evidence={{
                before: <MomentumWindow {...momentumWindows.before} />,
                after: <MomentumWindow {...momentumWindows.after} />,
              }}
            />
          ),
        },
      ]}
    />
  );
}

interface ProductChapterProps {
  chapter: ChapterInfo;
  meta: ProjectMeta;
  product: StriveContent['product'];
}

function ProductChapter({ chapter, meta, product }: ProductChapterProps) {
  const t = useTranslations('CaseStudy');
  const figureLabel = (index: number) => `${t('figureLabel')} ${toOrdinal(index)}`;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {meta.figures.map((figure, index) => (
          <FigurePlate
            key={figure.id}
            figure={figure}
            alt={product.figures[figure.id].alt}
            caption={product.figures[figure.id].caption}
            label={figureLabel(index)}
            sizes="(min-width: 768px) 20vw, 45vw"
          />
        ))}
      </div>
      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
        <div>
          <ChapterHeading chapter={chapter}>{product.insights.heading}</ChapterHeading>
          <p className={cn('mt-6', bodyText)}>{product.insights.body}</p>
        </div>
        <Plate label={figureLabel(meta.figures.length)} caption={product.insights.caption}>
          <InsightCards cards={product.insights.cards} />
        </Plate>
      </div>
      <div className="mt-12">
        <SectionLabel>{t('alsoShipped')}</SectionLabel>
        <CatalogList items={product.features} prefix={t('itemPrefix')} className="mt-3" />
      </div>
    </>
  );
}
