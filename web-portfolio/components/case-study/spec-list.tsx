import { cn } from '@/lib/utils';

export function SpecList({ className, ...props }: React.ComponentProps<'dl'>) {
  return (
    <dl className={cn('divide-y divide-border border-y border-border', className)} {...props} />
  );
}

export function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3">
      <dt className="shrink-0 font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-right text-sm">{children}</dd>
    </div>
  );
}
