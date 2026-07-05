import { cn } from '@/lib/utils';
import { colSpanClasses, rowSpanClasses, type ColSpan, type RowSpan } from './bento-grid-spans';

interface BentoCardProps {
  colSpan?: ColSpan;
  rowSpan?: RowSpan;
  label?: string;
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function BentoCard({
  colSpan = 1,
  rowSpan = 1,
  label,
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
        padded && 'p-6',
        className
      )}
    >
      {label ? (
        <span className="mb-4 block font-mono text-[9px] tracking-[0.4em] text-muted-foreground uppercase">
          {'// '}
          {label}
        </span>
      ) : null}
      <div className="w-full flex-1">{children}</div>
    </section>
  );
}
