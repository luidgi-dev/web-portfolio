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

// A textile band: each day is a stamped oval, the counted window is stitched round.
export function MomentumWindow({ from, to }: { from: number; to: number }) {
  return (
    <div className="swatch-2 grid grid-cols-14" aria-hidden="true">
      {loggedDays.map((logged, day) => (
        <span
          key={day}
          className="row-start-1 grid h-10 place-items-center"
          style={{ gridColumn: day + 1 }}
        >
          <span
            className={cn(
              'h-7 w-[58%] rounded-full border-[1.5px] sm:h-8',
              day > TODAY
                ? 'border-dotted border-foreground/35'
                : logged
                  ? 'border-transparent bg-(--swatch)'
                  : 'border-foreground/45'
            )}
          />
        </span>
      ))}
      <span
        className="pointer-events-none row-start-1 rounded-[14px] border-2 border-dashed border-primary"
        style={{ gridColumn: `${from + 1} / ${to + 2}` }}
      />
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
