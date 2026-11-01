import type { ReactNode } from 'react';

export type ErrorCode = '404' | '500';

interface Palette {
  a: string;
  b: string;
}

// Each digit sits in a 96 × 150 cell, drawn with the shapes of the Bauhaus art.
const DIGITS: Record<string, (p: Palette) => ReactNode> = {
  '4': ({ a, b }) => (
    <>
      <rect x="62" width="26" height="150" fill={b} />
      <path d="M62 0 L62 100 L0 100 Z" fill={a} />
      <rect y="100" width="96" height="14" fill="var(--art-divider)" />
    </>
  ),
  '0': ({ a }) => (
    <>
      <rect width="96" height="150" rx="48" fill={a} />
      <path d="M0 48 A48 48 0 0 1 96 48 Z" fill="var(--art-arc)" />
      <rect x="30" y="30" width="36" height="90" rx="18" fill="var(--art-bg)" />
    </>
  ),
  // Same zero with the cap at the bottom, so 500 doesn't repeat itself.
  o: ({ a, b }) => (
    <>
      <rect width="96" height="150" rx="48" fill={a} />
      <path d="M0 102 A48 48 0 0 0 96 102 Z" fill={b} />
      <rect x="30" y="30" width="36" height="90" rx="18" fill="var(--art-bg)" />
    </>
  ),
  // The bowl is a single path with its hole traced in: abutting shapes left a hairline seam.
  '5': ({ a, b }) => (
    <>
      <path d="M0 0 H96 V24 H26 V60 H0 Z" fill={b} />
      <path d="M0 60 H44 A45 45 0 0 1 44 150 H0 V126 H44 A21 21 0 0 0 44 84 H0 Z" fill={a} />
    </>
  ),
};

const SEQUENCES: Record<ErrorCode, string[]> = {
  '404': ['4', '0', '4'],
  '500': ['5', '0', 'o'],
};

interface ErrorPosterProps {
  code: ErrorCode;
  /** Printed in the footer: the requested path or the error reference. */
  reference?: string;
}

/** A printed Bauhaus exhibition poster with the status code drawn in shapes. */
export function ErrorPoster({ code, reference }: ErrorPosterProps) {
  const palette = { a: `var(--error-${code}-a)`, b: `var(--error-${code}-b)` };

  return (
    <figure className="grid aspect-square w-full grid-rows-[1fr_auto] overflow-hidden rounded-[2px] border border-border bg-(--art-bg) md:aspect-[3/4] md:max-h-[520px]">
      <svg
        viewBox="0 0 360 380"
        preserveAspectRatio="xMidYMin slice"
        className="block h-full w-full"
        aria-hidden="true"
      >
        <circle cx="300" cy="380" r="120" fill="var(--art-arc)" opacity="0.85" />
        <rect y="300" width="150" height="80" fill={palette.b} />
        <line x1="180" y1="230" x2="180" y2="380" stroke="var(--art-divider)" strokeWidth="3" />
        <circle cx="92" cy="268" r="18" fill="var(--art-divider)" />
        {SEQUENCES[code].map((digit, index) => (
          <g key={index} transform={`translate(${24 + index * 108} 56)`}>
            {DIGITS[digit](palette)}
          </g>
        ))}
      </svg>
      <figcaption className="min-h-[2.4rem] truncate border-t-2 border-(--art-divider) px-4 py-2.5 font-mono text-[10px] text-muted-foreground">
        {reference}
      </figcaption>
    </figure>
  );
}
