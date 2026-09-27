import { useTranslations } from 'next-intl';
import { BentoLink } from '@/components/bento/bento-link';
import { FigurePlate, Plate } from '@/components/case-study/figure-plate';
import { PullQuote } from '@/components/case-study/pull-quote';
import { SectionLabel } from '@/components/case-study/section-label';
import { SpecList, SpecRow } from '@/components/case-study/spec-list';
import { StatStrip } from '@/components/case-study/stat-strip';
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

function EditorialHeading({ children }: { children: string }) {
  return (
    <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">{children}</h3>
  );
}

interface StriveCaseStudyProps {
  meta: ProjectMeta;
  content: ProjectContent;
}

export function StriveCaseStudy({ meta, content }: StriveCaseStudyProps) {
  const t = useTranslations('CaseStudy');
  const { overview, product, engineering, buildLog } = content;
  const figureLabel = (index: number) => `${t('figureLabel')} ${toOrdinal(index)}`;

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
          <EditorialHeading>{overview.pillars.heading}</EditorialHeading>
          <Steps items={overview.pillars.items} className="mt-5 lg:grid-cols-3" />
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
            <EditorialHeading>{product.insights.heading}</EditorialHeading>
            <p className={cn('mt-4', bodyText)}>{product.insights.body}</p>
          </div>
          <Plate label={figureLabel(meta.figures.length)} caption={product.insights.caption}>
            <InsightCards cards={product.insights.cards} />
          </Plate>
        </div>
        <div className="mt-12">
          <SectionLabel>{t('alsoShipped')}</SectionLabel>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="border-b border-border py-2.5 text-sm">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </TabsPanel>

      <TabsPanel value="engineering">
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <p className="font-display text-xl leading-snug font-bold tracking-tight md:text-2xl">
            {engineering.intro}
          </p>
          <StatStrip stats={engineering.numbers} className="md:grid-cols-2" />
        </div>
        <div className="mt-12">
          <SectionLabel>{t('stack')}</SectionLabel>
          <dl className="mt-3 grid gap-x-8 gap-y-5 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {engineering.stack.map((group) => (
              <div key={group.label}>
                <dt className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
                  {group.label}
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <span className="bento-chip">{item}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-12">
          <EditorialHeading>{engineering.pipeline.heading}</EditorialHeading>
          <Steps
            items={engineering.pipeline.steps}
            className="mt-5 sm:grid-cols-2 lg:grid-cols-4"
          />
        </div>
        <div className="mt-12">
          <SectionLabel>{t('keyDecisions')}</SectionLabel>
          <Steps items={engineering.decisions} className="mt-4 lg:grid-cols-3" />
        </div>
      </TabsPanel>

      <TabsPanel value="buildLog">
        <SectionLabel>{t('inNumbers')}</SectionLabel>
        <StatStrip stats={buildLog.stats} className="mt-3" />
        <div className="mt-12">
          <SectionLabel>{t('whereItStands')}</SectionLabel>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {buildLog.results.map((result) => (
              <li key={result} className="border-t border-border py-3 text-sm leading-relaxed">
                {result}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12">
          <SectionLabel>{t('lessons')}</SectionLabel>
          <Steps items={buildLog.lessons} className="mt-4 sm:grid-cols-2 lg:grid-cols-4" />
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <EditorialHeading>{buildLog.story.heading}</EditorialHeading>
            {buildLog.story.paragraphs.map((paragraph) => (
              <p key={paragraph} className={cn('mt-4', bodyText)}>
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
