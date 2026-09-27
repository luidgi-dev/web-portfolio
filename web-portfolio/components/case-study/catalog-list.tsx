import { cn, toOrdinal } from '@/lib/utils';

interface CatalogListProps {
  items: string[];
  /** Printed before each number, e.g. "No." */
  prefix: string;
  className?: string;
}

// A short list numbered like catalog entries: No. 01, No. 02…
export function CatalogList({ items, prefix, className }: CatalogListProps) {
  return (
    <ol className={cn('grid gap-x-8 sm:grid-cols-2', className)}>
      {items.map((item, index) => (
        <li
          key={item}
          className="grid grid-cols-[3.5rem_1fr] gap-3 border-t border-(--border-strong) py-3"
        >
          <span
            className="pt-0.5 font-mono text-[9px] tracking-[0.2em] text-accent uppercase"
            aria-hidden="true"
          >
            {prefix} {toOrdinal(index)}
          </span>
          <span className="text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  );
}
