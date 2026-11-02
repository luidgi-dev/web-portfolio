import { cn } from '@/lib/utils';

export function SectionLabel({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase',
        className
      )}
      {...props}
    />
  );
}
