import { cn } from '@/lib/utils';

interface BentoLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function BentoLink({ href, children, external = false, className }: BentoLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary',
        className
      )}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="font-mono text-[9px] tracking-widest uppercase">{children}</span>
      <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </a>
  );
}
