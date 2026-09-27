import type { ProjectContent } from '@/lib/projects';
import { cn } from '@/lib/utils';

type Product = ProjectContent['product'];

// Two weeks of a daily ritual, today being the second Thursday. The calendar week
// only counts since Monday; the rolling window always counts the last seven days.
const TODAY = 10;
const loggedDays = [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0];

export const momentumWindows = {
  before: { from: 7, to: TODAY },
  after: { from: TODAY - 6, to: TODAY },
} as const;

export function MomentumWindow({ from, to }: { from: number; to: number }) {
  return (
    <div className="grid grid-cols-14" aria-hidden="true">
      {loggedDays.map((logged, day) => {
        const inWindow = day >= from && day <= to;

        return (
          <span
            key={day}
            className={cn(
              'grid h-7 place-items-center',
              // Week boundary: the calendar window restarts here.
              day === 7 && 'shadow-[inset_1px_0_0_var(--border-strong)]',
              inWindow && 'bg-accent/15',
              day === from && 'rounded-l-full',
              day === to && 'rounded-r-full'
            )}
          >
            <span
              className={cn(
                'size-2.5 rounded-full border border-foreground/70',
                logged && 'bg-foreground/80',
                day > TODAY && 'border-dashed opacity-40',
                day <= TODAY && !inWindow && 'opacity-35'
              )}
            />
          </span>
        );
      })}
    </div>
  );
}

// Insight cards redrawn in Strive's own type, on a screen-colored backing.
export function InsightCards({ cards }: { cards: Product['insights']['cards'] }) {
  return (
    <div className="grid gap-3 rounded-[2px] border border-border bg-background p-3 sm:grid-cols-2">
      {cards.map((card) => (
        <div key={card.title} className="rounded-lg border border-border bg-card p-4">
          <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
            {card.kind}
          </p>
          <p className="mt-2 font-strive text-[15px] leading-snug font-semibold">{card.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{card.body}</p>
          <p className="mt-3 font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
            {card.period}
          </p>
        </div>
      ))}
    </div>
  );
}
