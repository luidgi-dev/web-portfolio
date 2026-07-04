import { cn } from '@/lib/utils';

interface BentoCardProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function BentoCard({ label, children, className }: BentoCardProps) {
  return (
    <section
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 ease-out hover:border-primary/40 focus-within:border-primary/40',
        className
      )}
    >
      <span className="mb-4 block font-mono text-[9px] tracking-[0.4em] text-muted-foreground uppercase">
        {'// '}
        {label}
      </span>
      <div className="w-full flex-1">{children}</div>
    </section>
  );
}
