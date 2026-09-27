import { materialClass, swatchClass } from '@/components/case-study/swatch';
import type { Stat } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface SampleChipsProps {
  items: Stat[];
  /** Printed before the chip letter, e.g. the chapter number: 04-A, 04-B… */
  code: string;
  className?: string;
}

// Key figures as sample chips. The label comes first for screen readers; `order`
// puts the value first on screen.
export function SampleChips({ items, code, className }: SampleChipsProps) {
  return (
    <dl className={cn('grid grid-cols-2 gap-4 md:grid-cols-4', className)}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            'sample-chip material flex min-h-48 flex-col px-4 pt-9 pb-3.5',
            swatchClass(index),
            materialClass(index)
          )}
        >
          <span
            className="absolute top-2.5 left-4 font-mono text-[9px] tracking-[0.15em] text-foreground/70"
            aria-hidden="true"
          >
            {code}-{String.fromCharCode(65 + index)}
          </span>
          <dt className="order-2 mt-2 font-mono text-[9px] tracking-[0.25em] uppercase">
            {item.label}
          </dt>
          <dd className="order-1 mt-auto font-display text-4xl leading-none font-bold tracking-tight">
            {item.value}
          </dd>
          <dd className="order-3 mt-3 border-t border-foreground/25 pt-2 font-mono text-[8px] tracking-[0.15em] text-foreground/75 uppercase">
            {item.note}
          </dd>
        </div>
      ))}
    </dl>
  );
}
