import { useEffect, useState } from "react";
import "./SunriseLoader.css";

export default function SunriseLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
      else onComplete?.();
    };
    requestAnimationFrame(tick);
  }, []);

  const pct = Math.round(progress * 100);

  // Sky transitions: midnight → dawn → golden → blue
  const skyTop = interpolateColor(
    [
      [5, 5, 20],
      [20, 10, 50],
      [255, 120, 50],
      [80, 160, 230],
    ],
    progress,
  );
  const skyBottom = interpolateColor(
    [
      [10, 10, 35],
      [180, 80, 40],
      [255, 180, 80],
      [135, 206, 250],
    ],
    progress,
  );

  // Sun rises from below horizon (progress 0) to ~35% up (progress 1)
  const sunY = 92 - progress * 52;
  const sunOpacity = Math.min(progress * 3, 1);
  const sunRadius = 28 + progress * 10;

  // Glow intensity
  const glowSize = 10 + progress * 60;
  const glowOpacity = progress * 0.6;

  // Stars fade out
  const starOpacity = Math.max(0, 1 - progress * 3);

  // Horizon glow
  const horizonOpacity = Math.min(progress * 2, 1) * 0.8;

  return (
    <div className="sunrise-loader">
      <svg
        className="sunrise-svg"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgb(${skyTop.join(",")})`} />
            <stop offset="100%" stopColor={`rgb(${skyBottom.join(",")})`} />
          </linearGradient>

          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,220,80,0.9)" />
            <stop offset="40%" stopColor="rgba(255,160,40,0.4)" />
            <stop offset="100%" stopColor="rgba(255,100,0,0)" />
          </radialGradient>

          <radialGradient id="horizonGlow" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="rgba(255,180,60,0.8)" />
            <stop offset="100%" stopColor="rgba(255,100,0,0)" />
          </radialGradient>

          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="400" height="260" fill="url(#skyGrad)" />

        {/* Horizon atmospheric glow */}
        <ellipse
          cx="200"
          cy="185"
          rx="300"
          ry="80"
          fill="url(#horizonGlow)"
          opacity={horizonOpacity}
        />

        {/* Stars */}
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="white"
            opacity={starOpacity * s.o}
          />
        ))}

        {/* Sun glow halo */}
        <ellipse
          cx="200"
          cy={`${sunY}%`}
          rx={glowSize * 2.5}
          ry={glowSize * 2.5}
          fill="url(#sunGlow)"
          opacity={glowOpacity}
        />

        {/* Sun */}
        <circle
          cx="200"
          cy={`${sunY}%`}
          r={sunRadius}
          fill={`rgb(${interpolateColor(
            [
              [255, 220, 80],
              [255, 200, 60],
              [255, 180, 40],
            ],
            progress,
          ).join(",")})`}
          opacity={sunOpacity}
        />
        {/* Sun inner highlight */}
        <circle
          cx="194"
          cy={`${sunY - 1}%`}
          r={sunRadius * 0.45}
          fill="rgba(255,255,220,0.35)"
          opacity={sunOpacity}
        />

        {/* Horizon line */}
        <line
          x1="0"
          y1="185"
          x2="400"
          y2="185"
          stroke={`rgba(255,200,120,${horizonOpacity * 0.6})`}
          strokeWidth="1"
        />

        {/* Ground / silhouette strip */}
        <rect
          x="0"
          y="185"
          width="400"
          height="75"
          fill={`rgb(${interpolateColor(
            [
              [5, 5, 15],
              [15, 10, 25],
              [30, 20, 10],
              [40, 60, 20],
            ],
            progress,
          ).join(",")})`}
        />

        {/* Rolling hills silhouette */}
        <path
          d="M0 200 Q50 175 100 190 Q150 205 200 182 Q250 160 300 185 Q350 200 400 178 L400 260 L0 260 Z"
          fill={`rgb(${interpolateColor(
            [
              [8, 8, 20],
              [20, 12, 30],
              [25, 18, 8],
              [30, 50, 15],
            ],
            progress,
          ).join(",")})`}
        />

        {/* Birds — appear after 60% */}
        {progress > 0.6 &&
          BIRDS.map((b, i) => {
            const bProgress = (progress - 0.6) / 0.4;
            const x = b.startX + bProgress * b.dx;
            const y = b.y + Math.sin(bProgress * Math.PI * 2 + b.phase) * 4;
            const opacity = Math.min((progress - 0.6) * 5, 1);
            const scale = b.scale;
            return (
              <g
                key={i}
                transform={`translate(${x}, ${y}) scale(${scale})`}
                opacity={opacity}
              >
                <Bird />
              </g>
            );
          })}
      </svg>

      {/* HUD overlay */}
      <div className="sunrise-hud">
        <span className="sunrise-status">
          {STATUS[Math.floor(progress * (STATUS.length - 0.01))]}
        </span>
        <span className="sunrise-pct">{pct}%</span>
      </div>
    </div>
  );
}

// Simple bird silhouette — two curved wings
function Bird() {
  return (
    <path
      d="M0 0 C-6 -4 -12 -2 -14 0 M0 0 C6 -4 12 -2 14 0"
      stroke="rgba(20,20,40,0.85)"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  );
}

// Helpers
const interpolateColor = (stops, t) => {
  const n = stops.length - 1;
  const scaled = Math.min(t * n, n - 0.001);
  const i = Math.floor(scaled);
  const f = scaled - i;
  return stops[i].map((c, j) => Math.round(c + (stops[i + 1][j] - c) * f));
};

const STATUS = [
  "reading the sky...",
  "checking clouds...",
  "sunrise incoming...",
  "clear skies ahead.",
];

// Static star positions
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 137.5) % 400,
  y: (i * 97.3) % 160,
  r: 0.5 + (i % 3) * 0.4,
  o: 0.4 + (i % 5) * 0.12,
}));

// Bird flock configs
const BIRDS = [
  { startX: -20, dx: 180, y: 60, phase: 0, scale: 1.1 },
  { startX: -40, dx: 200, y: 50, phase: 0.8, scale: 0.85 },
  { startX: -10, dx: 160, y: 72, phase: 1.6, scale: 0.9 },
  { startX: -60, dx: 220, y: 44, phase: 2.4, scale: 0.75 },
  { startX: -30, dx: 190, y: 80, phase: 3.2, scale: 1.0 },
  { startX: 10, dx: 170, y: 56, phase: 0.4, scale: 0.8 },
  { startX: -50, dx: 210, y: 65, phase: 1.2, scale: 0.95 },
];
