import Image from 'next/image';
import type { ProjectFigure } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface PlateProps {
  label: string;
  caption: React.ReactNode;
  children: React.ReactNode;
  /**
   * Shares the rows of a parent grid (mat, then caption) so plates side by side
   * keep mats of the same height whatever their content or caption length.
   */
  paired?: boolean;
}

// A figure framed like a print: frame, card-colored mat, then the content.
export function Plate({ label, caption, children, paired }: PlateProps) {
  return (
    <figure className={cn(paired && 'row-span-2 grid grid-rows-subgrid gap-y-0')}>
      <div
        className={cn(
          'rounded-[4px] border border-(--border-strong) bg-card p-2.5 shadow-(--shadow-card)',
          // Items with an aspect ratio don't stretch by default in a grid, and a
          // stretched height alone would widen them past the mat.
          paired && 'grid *:min-h-0 *:place-self-stretch'
        )}
      >
        {children}
      </div>
      <figcaption className="mt-2.5 text-xs leading-relaxed text-foreground/85">
        <span className="mr-2 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
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
