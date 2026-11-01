import { cn } from '@/lib/utils';

type CtaLinkProps = {
  text: string;
  className?: string;
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

/** Typographic call to action: a link with `href`, a button with `onClick`. */
export function CtaLink({ href, onClick, text, className }: CtaLinkProps) {
  const classes = cn(
    'group inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-foreground/80 transition-colors duration-200 hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
    className
  );
  const content = (
    <>
      <span className="font-mono text-[9px] tracking-widest uppercase">{text}</span>
      <span
        className="transform font-sans text-xs transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
        aria-hidden="true"
      >
        &#8594;
      </span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
