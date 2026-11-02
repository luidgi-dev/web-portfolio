import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import type { ChapterInfo } from '@/components/case-study/chapter-heading';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { toOrdinal } from '@/lib/utils';

export interface CaseStudyChapter {
  value: string;
  // Key of the tab name in the CaseStudy messages.
  label: string;
  render: (chapter: ChapterInfo) => ReactNode;
}

export const bodyText = 'text-[15px] leading-relaxed text-foreground/90';

// Numbers the chapters once, so the tabs, the headings and the chip codes agree.
export function CaseStudyShell({ chapters }: { chapters: CaseStudyChapter[] }) {
  const t = useTranslations('CaseStudy');
  const numbered = chapters.map((chapter, index) => ({
    ...chapter,
    info: { number: toOrdinal(index), name: t(chapter.label) },
  }));

  return (
    <Tabs defaultValue={chapters[0].value}>
      <TabsList aria-label={t('tabsLabel')}>
        {numbered.map(({ value, info }) => (
          <TabsTab key={value} value={value}>
            <span className="mr-2.5 text-accent" aria-hidden="true">
              {info.number}
            </span>
            {info.name}
          </TabsTab>
        ))}
      </TabsList>
      {numbered.map(({ value, info, render }) => (
        <TabsPanel key={value} value={value}>
          {render(info)}
        </TabsPanel>
      ))}
    </Tabs>
  );
}
