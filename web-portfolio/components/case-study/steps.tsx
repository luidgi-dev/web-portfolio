import { swatchClass } from '@/components/case-study/swatch';
import type { TitledItem } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface StepsProps {
  items: TitledItem[];
  className?: string;
}

export function Steps({ items, className }: StepsProps) {
  return (
    <ol className={cn('grid gap-x-8 gap-y-8', className)}>
      {items.map((item, index) => (
        <li key={item.title} className={swatchClass(index)}>
          <span className="stamp-number" aria-hidden="true">
            {index + 1}
          </span>
          <h4 className="mt-4 font-display text-lg leading-tight font-bold">{item.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
