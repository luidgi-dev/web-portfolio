import type { Stat } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface StatStripProps {
  stats: Stat[];
  className?: string;
}

export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <dl
      className={cn(
        'grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-(--border-strong) bg-border md:grid-cols-4',
        className
      )}
    >
      {stats.map((stat) => (
        // Label first for screen readers, value first on screen.
        <div key={stat.label} className="flex flex-col-reverse gap-2 bg-card px-4 py-5">
          <dt className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
            {stat.label}
          </dt>
          <dd className="font-display text-4xl leading-none font-bold tracking-tight">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
