/** Technical schematic linework. Paths use pathLength=1 so GSAP can draw them. */
export function Schematic({
  className = "",
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "card";
}) {
  const paths =
    variant === "hero"
      ? [
          "M0 78 H98 V34 H210 V86 H330 V42 H440",
          "M0 142 H58 V188 H154 V132 H256 V202 H440",
          "M0 248 H118 V216 H218 V276 H332 V238 H440",
          "M0 340 H82 V292 H186 V354 H286 V312 H440",
          "M28 460 V410 H128 V382 H248 V430 H390",
          "M98 34 V0 H164",
          "M210 86 V54 H292 V0",
          "M154 188 V230 H92 V266 H34",
          "M256 202 V162 H356 V122 H440",
          "M332 238 V278 H408 V330",
          "M186 354 V398 H320 V440",
          "M82 292 V252 H24",
        ]
      : [
          "M10 70 H90 V20 H190",
          "M10 130 H60 V100 H150 V160 H230",
          "M190 20 V90 H230",
          "M150 160 V190",
        ];
  const nodes: [number, number][] =
    variant === "hero"
      ? [
          [98, 78],
          [210, 86],
          [330, 42],
          [154, 188],
          [256, 202],
          [332, 238],
          [82, 292],
          [186, 354],
          [248, 430],
          [356, 122],
          [408, 330],
        ]
      : [
          [90, 70],
          [190, 20],
          [150, 100],
          [230, 160],
        ];
  const vb = variant === "hero" ? "0 0 440 460" : "0 0 240 200";
  return (
    <svg viewBox={vb} className={className} fill="none" aria-hidden="true" data-draw>
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className="draw-path"
          data-path
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {nodes.map(([x, y]) => (
        <g key={`${x}-${y}`} data-node>
          <circle cx={x} cy={y} r={variant === "hero" ? 3 : 3} fill="var(--background)" stroke="currentColor" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  );
}
