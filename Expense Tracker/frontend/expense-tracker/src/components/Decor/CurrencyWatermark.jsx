const INK = "#0f172a";

const TICKS = Array.from({ length: 48 }, (_, i) => (i * 360) / 48);

// Coin-edge seal, used large in a corner or small inside a card.
export const CurrencySeal = ({
  className = "",
  opacity = 0.05,
  label = true,
  color = INK,
}) => (
  <svg
    viewBox="0 0 240 240"
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
    style={{ opacity }}
    fill="none"
    stroke={color}
  >
    <circle cx="120" cy="120" r="113" strokeWidth="2" />
    <circle cx="120" cy="120" r="99" strokeWidth="1" />
    <circle cx="120" cy="120" r="70" strokeWidth="1.5" />
    {TICKS.map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return (
        <line
          key={deg}
          x1={120 + 101 * Math.cos(rad)}
          y1={120 + 101 * Math.sin(rad)}
          x2={120 + 111 * Math.cos(rad)}
          y2={120 + 111 * Math.sin(rad)}
          strokeWidth="2"
        />
      );
    })}
    {label && (
      <>
        <text
          x="120"
          y="136"
          textAnchor="middle"
          fontSize="54"
          fontWeight="700"
          letterSpacing="4"
          fill={color}
          stroke="none"
        >
          ETB
        </text>
        <text
          x="120"
          y="166"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          letterSpacing="8"
          fill={color}
          stroke="none"
        >
          BIRR
        </text>
      </>
    )}
  </svg>
);

// One banknote per tile, so it reads as security paper rather than confetti.
export const CurrencyPattern = ({
  className = "",
  opacity = 0.03,
  tileId,
  rotate = -8,
  color = INK,
}) => (
  <svg
    aria-hidden="true"
    className={`pointer-events-none select-none absolute inset-0 h-full w-full ${className}`}
    style={{ opacity }}
  >
    <defs>
      <pattern
        id={tileId}
        width="210"
        height="210"
        patternUnits="userSpaceOnUse"
        patternTransform={`rotate(${rotate})`}
      >
        <g fill="none" stroke={color} strokeWidth="1">
          <rect x="77" y="92" width="56" height="30" rx="5" />
          <rect x="83" y="98" width="44" height="18" rx="3" />
          <circle cx="105" cy="107" r="5" />
          <line x1="114" y1="103" x2="123" y2="103" />
          <line x1="114" y1="107" x2="123" y2="107" />
          <line x1="114" y1="111" x2="121" y2="111" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${tileId})`} />
  </svg>
);
