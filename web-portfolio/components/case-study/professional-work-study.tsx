import { useFormatter, useTranslations } from 'next-intl';
import { bodyText, CaseStudyShell } from '@/components/case-study/case-study-shell';
import { ChapterHeading, type ChapterInfo } from '@/components/case-study/chapter-heading';
import { Plate } from '@/components/case-study/figure-plate';
import { FlowDiagram } from '@/components/case-study/flow-diagram';
import { OverviewIntro } from '@/components/case-study/overview-intro';
import { SampleChips } from '@/components/case-study/sample-chips';
import { SectionLabel } from '@/components/case-study/section-label';
import { Steps } from '@/components/case-study/steps';
import { experienceStats, formatStat, type ExperienceContent } from '@/lib/experience';
import type { TitledItem } from '@/lib/projects';
import { cn, toOrdinal } from '@/lib/utils';

const projectRows = ['problem', 'built', 'result'] as const;

export function ProfessionalWorkStudy({ content }: { content: ExperienceContent }) {
  const t = useTranslations('CaseStudy');
  const { overview, projects, method, takeaways } = content;

  return (
    <CaseStudyShell
      chapters={[
        {
          value: 'overview',
          label: 'tabOverview',
          render: () => (
            <OverviewIntro
              overview={overview}
              facts={[
                { label: t('factRole'), value: overview.facts.role },
                { label: t('factTimeline'), value: overview.facts.timeline },
                { label: t('factTeams'), value: overview.facts.teams },
                { label: t('stack'), value: overview.facts.stack },
              ]}
            />
          ),
        },
        {
          value: 'projects',
          label: 'tabProjects',
          render: (chapter) => <ProjectsChapter chapter={chapter} projects={projects} />,
        },
        {
          value: 'method',
          label: 'tabMethod',
          render: (chapter) => (
            <>
              <TitledProse items={[method.planning, method.delivery]} />
              <div className="mt-12">
                <ChapterHeading chapter={chapter}>{method.choices.heading}</ChapterHeading>
                <Steps items={method.choices.items} className="mt-8 lg:grid-cols-3" />
              </div>
            </>
          ),
        },
        {
          value: 'takeaways',
          label: 'tabTakeaways',
          render: () => <TitledProse items={[takeaways.learned, takeaways.today]} />,
        },
      ]}
    />
  );
}

interface ProjectsChapterProps {
  chapter: ChapterInfo;
  projects: ExperienceContent['projects'];
}

function ProjectsChapter({ chapter, projects }: ProjectsChapterProps) {
  const t = useTranslations('CaseStudy');
  const tHome = useTranslations('HomePage');
  const format = useFormatter();
  const stats = experienceStats.map((stat) => ({
    value: formatStat(stat, (value) => format.number(value)),
    label: tHome(stat.label),
  }));

  return (
    <>
      <SectionLabel>{t('inNumbers')}</SectionLabel>
      <SampleChips items={stats} code={chapter.number} className="mt-3" />
      {projects.map((project, index) => {
        // Figures are numbered across the chapter, skipping projects without one.
        const figure = toOrdinal(projects.slice(0, index).filter((item) => item.flow).length);

        return (
          <article key={project.title} className="mt-12 border-t border-border pt-8">
            <h3 className="font-display text-2xl leading-tight font-bold tracking-tight md:text-3xl">
              {project.title}
            </h3>
            <dl className="mt-5 grid gap-6 md:grid-cols-3 md:gap-8">
              {projectRows.map((row) => (
                <div key={row}>
                  <dt className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
                    {t(row)}
                  </dt>
                  <dd className={cn('mt-2', bodyText)}>{project[row]}</dd>
                </div>
              ))}
            </dl>
            {project.flow ? (
              <div className="mt-8">
                <Plate label={`${t('figureLabel')} ${figure}`} caption={project.flow.caption}>
                  <FlowDiagram steps={project.flow.steps} code={figure} />
                </Plate>
              </div>
            ) : null}
          </article>
        );
      })}
    </>
  );
}

function TitledProse({ items }: { items: TitledItem[] }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
      {items.map((item) => (
        <section key={item.title}>
          <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">
            {item.title}
          </h3>
          <p className={cn('mt-3', bodyText)}>{item.body}</p>
        </section>
      ))}
    </div>
  );
}
