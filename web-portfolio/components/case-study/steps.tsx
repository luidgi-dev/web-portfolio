import type { TitledItem } from '@/lib/projects';
import { cn, toOrdinal } from '@/lib/utils';

interface StepsProps {
  items: TitledItem[];
  className?: string;
}

export function Steps({ items, className }: StepsProps) {
  return (
    <ol className={cn('grid gap-x-8 gap-y-6', className)}>
      {items.map((item, index) => (
        <li key={item.title} className="border-t border-border pt-4">
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent" aria-hidden="true">
            {toOrdinal(index)}
          </span>
          <h4 className="mt-2 font-display text-lg leading-tight font-bold">{item.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
