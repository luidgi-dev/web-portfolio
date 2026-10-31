import { useId } from 'react';

// One block: a round opening with a quarter opening at each corner, as in mid-century breeze block screens.
const OPENINGS = [
  { cx: 32, cy: 32, r: 17 },
  { cx: 0, cy: 0, r: 10 },
  { cx: 64, cy: 0, r: 10 },
  { cx: 0, cy: 64, r: 10 },
  { cx: 64, cy: 64, r: 10 },
];

export function BreezeBlockSunlight() {
  const patternId = useId();

  return (
    <div className="sunlight-breeze" aria-hidden>
      <svg>
        <defs>
          {/* Skewed and tilted like afternoon sun hitting the wall at an angle. */}
          <pattern
            id={patternId}
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
            patternTransform="skewX(-24) rotate(-6)"
          >
            <rect width="64" height="64" fill="var(--sunlight-shade)" />
            {OPENINGS.map(({ cx, cy, r }) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="var(--sunlight)" />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
