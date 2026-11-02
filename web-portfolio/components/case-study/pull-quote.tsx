import { cn } from '@/lib/utils';

export function PullQuote({ className, children }: { className?: string; children: string }) {
  return (
    <blockquote
      className={cn(
        'border-l-2 border-accent pl-5 font-display text-xl leading-snug text-foreground/90 italic md:text-2xl',
        className
      )}
    >
      <p>{children}</p>
    </blockquote>
  );
}
