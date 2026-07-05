export function BotanicalOrnament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <path
        d="M8 96 C 28 72, 44 88, 58 64 C 72 40, 88 52, 112 28"
        fill="none"
        stroke="var(--ornament-color)"
        strokeWidth="1.2"
      />
      <path
        d="M18 108 C 34 84, 52 92, 68 72 C 84 52, 96 60, 108 44"
        fill="none"
        stroke="var(--ornament-color)"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path
        d="M24 82 C 30 68, 38 72, 44 58 C 50 44, 58 48, 66 36"
        fill="none"
        stroke="var(--ornament-color)"
        strokeWidth="0.6"
        opacity="0.55"
      />
      <ellipse
        cx="34"
        cy="78"
        rx="10"
        ry="5"
        transform="rotate(-28 34 78)"
        fill="none"
        stroke="var(--ornament-color)"
        strokeWidth="0.7"
        opacity="0.65"
      />
      <ellipse
        cx="78"
        cy="48"
        rx="12"
        ry="6"
        transform="rotate(18 78 48)"
        fill="none"
        stroke="var(--ornament-color)"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <circle cx="92" cy="34" r="2.5" fill="var(--ornament-color)" opacity="0.35" />
    </svg>
  );
}
