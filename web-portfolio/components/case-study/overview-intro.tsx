import type { ReactNode } from 'react';
import { bodyText } from '@/components/case-study/case-study-shell';
import { SpecList, SpecRow } from '@/components/case-study/spec-list';
import { cn } from '@/lib/utils';

interface OverviewIntroProps {
  overview: { problem: string; lead: string; paragraphs: string[] };
  facts: { label: string; value: string }[];
  // Shown under the facts, e.g. a link to the live project.
  children?: ReactNode;
}

// The opening of an overview chapter: the problem, the lead and the key facts.
export function OverviewIntro({ overview, facts, children }: OverviewIntroProps) {
  return (
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
            <SpecRow key={fact.label} label={fact.label}>
              {fact.value}
            </SpecRow>
          ))}
        </SpecList>
        {children}
      </div>
    </div>
  );
}
