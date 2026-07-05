import { cn } from '@/lib/utils';

interface CtaLinkProps {
  href: string;
  text: string;
  className?: string;
}

export function CtaLink({ href, text, className }: CtaLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex min-h-[44px] items-center gap-2 text-foreground/80 transition-colors duration-200 hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        className
      )}
    >
      <span className="font-mono text-[9px] tracking-widest uppercase">{text}</span>
      <span
        className="transform font-sans text-xs transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
        aria-hidden="true"
      >
        &#8594;
      </span>
    </a>
  );
}
