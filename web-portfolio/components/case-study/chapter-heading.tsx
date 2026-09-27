interface ChapterHeadingProps {
  number: string;
  kicker: string;
  children: string;
}

// The chapter number sits on a small sample chip, the title stays large beside it.
export function ChapterHeading({ number, kicker, children }: ChapterHeadingProps) {
  return (
    <div className="flex items-center gap-5">
      <span
        className="sample-chip material material-linen swatch-primary grid h-[78px] w-[60px] shrink-0 items-end px-2.5 pb-2 font-display text-2xl leading-none font-bold"
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
          {kicker}
        </p>
        <h3 className="mt-1.5 font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">
          {children}
        </h3>
      </div>
    </div>
  );
}
