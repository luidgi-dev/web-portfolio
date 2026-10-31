import { cn } from '@/lib/utils';
import { colSpanClasses, rowSpanClasses, type ColSpan, type RowSpan } from './bento-grid-spans';

interface BentoCardProps {
  colSpan?: ColSpan;
  rowSpan?: RowSpan;
  label?: string;
  labelStyle?: 'block' | 'chip';
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function BentoCard({
  colSpan = 1,
  rowSpan = 1,
  label,
  labelStyle = 'block',
  padded = true,
  className,
  children,
}: BentoCardProps) {
  return (
    <section
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 ease-out hover:border-primary/40 focus-within:border-primary/40',
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        padded && 'p-4 md:p-5',
        className
      )}
    >
      {label && labelStyle === 'block' ? (
        // Title-block line of an architectural drawing: name, then a hairline.
        <span className="mb-4 flex items-center gap-3 font-sans text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase">
          {label}
          <span aria-hidden className="h-px flex-1 bg-border" />
        </span>
      ) : null}
      {label && labelStyle === 'chip' ? (
        // Name written next to a paint sample.
        <span className="mb-4 flex items-center gap-2 font-sans text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase">
          <span aria-hidden className="swatch-primary h-3 w-3 rounded-[3px] bg-(--swatch)" />
          {label}
        </span>
      ) : null}
      <div className="w-full flex-1">{children}</div>
    </section>
  );
}
