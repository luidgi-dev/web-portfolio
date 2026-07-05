export function RadarOrnament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="var(--ornament-color)"
        strokeWidth="0.75"
      />
      <circle
        cx="60"
        cy="60"
        r="36"
        fill="none"
        stroke="var(--ornament-color)"
        strokeWidth="0.75"
      />
      <circle
        cx="60"
        cy="60"
        r="20"
        fill="none"
        stroke="var(--ornament-color)"
        strokeWidth="0.75"
      />
      <line x1="60" y1="8" x2="60" y2="112" stroke="var(--ornament-color)" strokeWidth="0.5" />
      <line x1="8" y1="60" x2="112" y2="60" stroke="var(--ornament-color)" strokeWidth="0.5" />
    </svg>
  );
}
