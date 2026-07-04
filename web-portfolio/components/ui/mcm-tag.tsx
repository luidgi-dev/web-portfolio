import { cn } from '@/lib/utils';

interface McmTagProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function McmTag({ children, variant = 'default', className }: McmTagProps) {
  return (
    <span
      className={cn(
        'rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-wider uppercase transition-colors duration-200',
        variant === 'accent'
          ? 'border-primary/30 bg-primary/5 text-primary'
          : 'border-border bg-transparent text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  );
}
