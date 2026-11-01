'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { CtaLink } from '@/components/ui/cta-link';
import { ErrorPoster, type ErrorCode } from './error-poster';

interface ErrorPageProps {
  code: ErrorCode;
  title: string;
  body: string;
  home: { href: string; label: string };
  retry?: { label: string; onRetry: () => void };
  /** Printed on the poster for 500 (e.g. "Ref. <digest>"). A 404 always prints the requested path. */
  reference?: string;
}

/** Shared layout of the 404, error and global error pages. Takes plain strings: two of them have no intl provider. */
export function ErrorPage({ code, title, body, home, retry, reference }: ErrorPageProps) {
  const pathname = usePathname();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Screen reader and keyboard users land on what happened, not on the top of a page they didn't ask for.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-[minmax(0,1fr)] content-center items-center gap-7 px-5 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-12 md:px-12 md:py-12">
      <meta name="robots" content="noindex" />
      <ErrorPoster code={code} reference={code === '404' ? pathname : reference} />
      <div>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.1] font-bold tracking-[-0.02em] outline-none"
        >
          {title}
        </h1>
        <p className="mt-4 max-w-[40ch] text-[0.95rem] leading-relaxed text-muted-foreground">
          {body}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-7">
          {retry && <CtaLink onClick={retry.onRetry} text={retry.label} />}
          <CtaLink href={home.href} text={home.label} />
        </div>
      </div>
    </main>
  );
}
