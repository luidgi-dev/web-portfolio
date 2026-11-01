import { cn } from '@/lib/utils';

export function BauhausGeometryArt({
  className,
  'aria-label': ariaLabel,
}: {
  className?: string;
  'aria-label'?: string;
}) {
  return (
    <svg
      className={cn('bauhaus-art', className)}
      viewBox="0 0 200 220"
      preserveAspectRatio="xMidYMid slice"
      role={ariaLabel ? 'img' : undefined}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
    >
      <rect width="200" height="220" fill="var(--art-bg)" />
      <rect x="0" y="140" width="200" height="80" fill="var(--art-block-bold)" opacity="0.35" />
      <circle cx="100" cy="95" r="70" fill="var(--art-circle-1)" />
      <circle cx="100" cy="78" r="48" fill="var(--art-circle-2)" />
      <path className="bauhaus-arc" d="M 52 78 A 48 48 0 0 1 148 78" fill="var(--art-arc)" />
      <circle className="bauhaus-sun" cx="100" cy="60" r="22" fill="var(--art-divider)" />
      <rect
        className="bauhaus-block"
        x="0"
        y="155"
        width="90"
        height="65"
        fill="var(--art-block-olive)"
      />
      <line x1="100" y1="0" x2="100" y2="220" stroke="var(--art-divider)" strokeWidth="3" />
    </svg>
  );
}
