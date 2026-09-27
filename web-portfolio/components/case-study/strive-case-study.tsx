import { useTranslations } from 'next-intl';
import { BentoLink } from '@/components/bento/bento-link';
import { CatalogList } from '@/components/case-study/catalog-list';
import { ChapterHeading } from '@/components/case-study/chapter-heading';
import { FigurePlate, Plate } from '@/components/case-study/figure-plate';
import { PullQuote } from '@/components/case-study/pull-quote';
import { SampleChips } from '@/components/case-study/sample-chips';
import { SectionLabel } from '@/components/case-study/section-label';
import { SpecList, SpecRow } from '@/components/case-study/spec-list';
import { StackCapsules } from '@/components/case-study/stack-capsules';
import { Steps } from '@/components/case-study/steps';
import {
  InsightCards,
  MomentumWindow,
  momentumWindows,
} from '@/components/case-study/strive-visuals';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import type { ProjectContent, ProjectMeta } from '@/lib/projects';
import { cn, toOrdinal } from '@/lib/utils';

const chapters = [
  { value: 'overview', label: 'tabOverview' },
  { value: 'product', label: 'tabProduct' },
  { value: 'engineering', label: 'tabEngineering' },
  { value: 'buildLog', label: 'tabBuildLog' },
] as const;

const facts = [
  { key: 'role', label: 'factRole' },
  { key: 'timeline', label: 'factTimeline' },
  { key: 'platform', label: 'factPlatform' },
  { key: 'status', label: 'factStatus' },
] as const;

const bodyText = 'text-[15px] leading-relaxed text-foreground/90';

type Chapter = (typeof chapters)[number]['value'];

interface StriveCaseStudyProps {
  meta: ProjectMeta;
  content: ProjectContent;
}

export function StriveCaseStudy({ meta, content }: StriveCaseStudyProps) {
  const t = useTranslations('CaseStudy');
  const { overview, product, engineering, buildLog } = content;
  const figureLabel = (index: number) => `${t('figureLabel')} ${toOrdinal(index)}`;
  const chapterIndex = (value: Chapter) => chapters.findIndex((chapter) => chapter.value === value);
  const chapterNumber = (value: Chapter) => toOrdinal(chapterIndex(value));
  const chapterHeading = (value: Chapter, title: string) => {
    const number = chapterNumber(value);
    const name = t(chapters[chapterIndex(value)].label);

    return (
      <ChapterHeading number={number} kicker={t('chapterKicker', { number, name })}>
        {title}
      </ChapterHeading>
    );
  };

  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label={t('tabsLabel')}>
        {chapters.map((chapter, index) => (
          <TabsTab key={chapter.value} value={chapter.value}>
            <span className="mr-2.5 text-accent" aria-hidden="true">
              {toOrdinal(index)}
            </span>
            {t(chapter.label)}
          </TabsTab>
        ))}
      </TabsList>

      <TabsPanel value="overview">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <p className="font-display text-lg text-muted-foreground italic">{overview.problem}</p>
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
              <SpecRow label={t('factAvailability')}>{new URL(meta.url).host}</SpecRow>
            </SpecList>
            <BentoLink
              href={meta.url}
              external
              className="project-plaque mt-6 px-[18px] py-3 text-(--project-text) transition-[filter] hover:text-(--project-text)"
            >
              {t('liveCta')}
            </BentoLink>
          </div>
        </div>
        <div className="mt-12">
          {chapterHeading('overview', overview.pillars.heading)}
          <Steps items={overview.pillars.items} className="mt-8 lg:grid-cols-3" />
        </div>
      </TabsPanel>

      <TabsPanel value="product">
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
            {chapterHeading('product', product.insights.heading)}
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
      </TabsPanel>

      <TabsPanel value="engineering">
        <p className="max-w-3xl font-display text-xl leading-snug font-bold tracking-tight md:text-2xl">
          {engineering.intro}
        </p>
        <SampleChips
          items={engineering.numbers}
          code={chapterNumber('engineering')}
          className="mt-8"
        />
        <div className="mt-12">
          <SectionLabel>{t('stack')}</SectionLabel>
          <div className="mt-4">
            <StackCapsules groups={engineering.stack} />
          </div>
        </div>
        <div className="mt-12">
          {chapterHeading('engineering', engineering.pipeline.heading)}
          <Steps
            items={engineering.pipeline.steps}
            className="mt-8 sm:grid-cols-2 lg:grid-cols-4"
          />
        </div>
        <div className="mt-12">
          <SectionLabel>{t('keyDecisions')}</SectionLabel>
          <Steps items={engineering.decisions} className="mt-4 lg:grid-cols-3" />
        </div>
      </TabsPanel>

      <TabsPanel value="buildLog">
        <SectionLabel>{t('inNumbers')}</SectionLabel>
        <SampleChips items={buildLog.stats} code={chapterNumber('buildLog')} className="mt-3" />
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
            {chapterHeading('buildLog', buildLog.story.heading)}
            {buildLog.story.paragraphs.map((paragraph) => (
              <p key={paragraph} className={cn('mt-5', bodyText)}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid content-start gap-8">
            <div className="grid gap-5 rounded-[4px] border border-border p-5">
              {(['before', 'after'] as const).map((key) => (
                <div key={key} className="grid gap-3">
                  <p className="text-sm">
                    <span className="mr-2 font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
                      {t(key)}
                    </span>
                    {buildLog.story[key]}
                  </p>
                  <MomentumWindow {...momentumWindows[key]} />
                </div>
              ))}
            </div>
            <PullQuote>{buildLog.story.quote}</PullQuote>
          </div>
        </div>
      </TabsPanel>
    </Tabs>
  );
}
