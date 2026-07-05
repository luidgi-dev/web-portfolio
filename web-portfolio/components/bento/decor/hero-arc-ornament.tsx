export function HeroArcOrnament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true">
      <circle
        cx="180"
        cy="180"
        r="120"
        fill="none"
        stroke="var(--hero-arc-color)"
        strokeWidth="1"
        opacity="var(--hero-arc-opacity)"
      />
      <circle
        cx="180"
        cy="180"
        r="88"
        fill="none"
        stroke="var(--hero-arc-color)"
        strokeWidth="0.75"
        opacity="var(--hero-arc-opacity)"
      />
      <circle
        cx="180"
        cy="180"
        r="56"
        fill="none"
        stroke="var(--hero-arc-color)"
        strokeWidth="0.75"
        opacity="var(--hero-arc-opacity)"
      />
    </svg>
  );
}
