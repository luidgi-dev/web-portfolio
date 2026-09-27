import Image from 'next/image';
import type { ProjectFigure } from '@/lib/projects';

interface PlateProps {
  label: string;
  caption: string;
  children: React.ReactNode;
}

// A figure framed like a print: frame, card-colored mat, then the content.
export function Plate({ label, caption, children }: PlateProps) {
  return (
    <figure>
      <div className="rounded-[4px] border border-(--border-strong) bg-card p-2.5 shadow-(--shadow-card)">
        {children}
      </div>
      <figcaption className="mt-2.5 text-xs leading-relaxed text-foreground/85">
        <span className="mr-2 font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
          {label}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

interface FigurePlateProps extends Omit<PlateProps, 'children'> {
  figure: ProjectFigure;
  alt: string;
  sizes: string;
}

// Both variants render; the `dark:` variant follows the portfolio theme.
export function FigurePlate({ figure, alt, sizes, ...plate }: FigurePlateProps) {
  const imageProps = { width: figure.width, height: figure.height, sizes };

  return (
    <Plate {...plate}>
      <div className="aspect-[7/12] overflow-hidden rounded-[2px] border border-border">
        <Image
          src={figure.src.light}
          alt={alt}
          className="size-full object-cover object-top dark:hidden"
          {...imageProps}
        />
        <Image
          src={figure.src.dark}
          alt={alt}
          className="hidden size-full object-cover object-top dark:block"
          {...imageProps}
        />
      </div>
    </Plate>
  );
}
