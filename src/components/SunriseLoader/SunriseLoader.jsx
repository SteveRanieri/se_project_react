import { useEffect, useState } from "react";
import "./SunriseLoader.css";

// Helpers — defined before component so they're never undefined
const lerp = (a, b, t) => Math.round(a + (b - a) * t);

function interpolateColor(stops, t) {
  if (!Array.isArray(stops) || stops.length < 2) return [0, 0, 0];
  const safe = Math.max(0, Math.min(isNaN(t) ? 0 : t, 0.9999));
  const n = stops.length - 1;
  const scaled = safe * n;
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = stops[i];
  const b = stops[i + 1];
  if (!Array.isArray(a) || !Array.isArray(b)) return [0, 0, 0];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f)];
}

function rgb(arr) {
  return `rgb(${arr[0]},${arr[1]},${arr[2]})`;
}

// Static data — outside component, never re-created
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 137.5) % 400,
  y: (i * 97.3) % 160,
  r: 0.5 + (i % 3) * 0.4,
  o: 0.4 + (i % 5) * 0.12,
}));

const BIRDS = [
  { startX: -20, dx: 180, y: 60, phase: 0, scale: 1.1 },
  { startX: -40, dx: 200, y: 50, phase: 0.8, scale: 0.85 },
  { startX: -10, dx: 160, y: 72, phase: 1.6, scale: 0.9 },
  { startX: -60, dx: 220, y: 44, phase: 2.4, scale: 0.75 },
  { startX: -30, dx: 190, y: 80, phase: 3.2, scale: 1.0 },
  { startX: 10, dx: 170, y: 56, phase: 0.4, scale: 0.8 },
  { startX: -50, dx: 210, y: 65, phase: 1.2, scale: 0.95 },
];

const STATUS = [
  "reading the sky...",
  "checking clouds...",
  "sunrise incoming...",
  "clear skies ahead.",
];

const SKY_TOP = [
  [5, 5, 20],
  [20, 10, 50],
  [255, 120, 50],
  [80, 160, 230],
];
const SKY_BOTTOM = [
  [10, 10, 35],
  [180, 80, 40],
  [255, 180, 80],
  [135, 206, 250],
];
const SUN_COLOR = [
  [255, 220, 80],
  [255, 200, 60],
  [255, 180, 40],
];
const GROUND_COL = [
  [5, 5, 15],
  [15, 10, 25],
  [30, 20, 10],
  [40, 60, 20],
];
const HILL_COL = [
  [8, 8, 20],
  [20, 12, 30],
  [25, 18, 8],
  [30, 50, 15],
];

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

export default function SunriseLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const start = performance.now();
    let raf;
    let timeout;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => onComplete?.(), 5000);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  const p = progress;
  const pct = Math.round(p * 100);

  const skyTop = rgb(interpolateColor(SKY_TOP, p));
  const skyBottom = rgb(interpolateColor(SKY_BOTTOM, p));
  const sunColor = rgb(interpolateColor(SUN_COLOR, p));
  const groundColor = rgb(interpolateColor(GROUND_COL, p));
  const hillColor = rgb(interpolateColor(HILL_COL, p));

  const sunY = 92 - p * 52;
  const sunOpacity = Math.min(p * 3, 1);
  const sunRadius = 28 + p * 10;
  const glowSize = 10 + p * 60;
  const glowOpacity = p * 0.6;
  const starOpacity = Math.max(0, 1 - p * 3);
  const horizOpacity = Math.min(p * 2, 1) * 0.8;
  const statusIndex = Math.min(
    Math.floor(p * STATUS.length),
    STATUS.length - 1,
  );

  return (
    <div className="sunrise-loader">
      <svg
        className="sunrise-svg"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="100%" stopColor={skyBottom} />
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
        </defs>

        <rect width="400" height="260" fill="url(#skyGrad)" />

        <ellipse
          cx="200"
          cy="185"
          rx="300"
          ry="80"
          fill="url(#horizonGlow)"
          opacity={horizOpacity}
        />

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

        <ellipse
          cx="200"
          cy={`${sunY}%`}
          rx={glowSize * 2.5}
          ry={glowSize * 2.5}
          fill="url(#sunGlow)"
          opacity={glowOpacity}
        />

        <circle
          cx="200"
          cy={`${sunY}%`}
          r={sunRadius}
          fill={sunColor}
          opacity={sunOpacity}
        />

        <circle
          cx="194"
          cy={`${sunY - 1}%`}
          r={sunRadius * 0.45}
          fill="rgba(255,255,220,0.35)"
          opacity={sunOpacity}
        />

        <line
          x1="0"
          y1="185"
          x2="400"
          y2="185"
          stroke={`rgba(255,200,120,${horizOpacity * 0.6})`}
          strokeWidth="1"
        />

        <rect x="0" y="185" width="400" height="75" fill={groundColor} />

        <path
          d="M0 200 Q50 175 100 190 Q150 205 200 182 Q250 160 300 185 Q350 200 400 178 L400 260 L0 260 Z"
          fill={hillColor}
        />

        {p > 0.6 &&
          BIRDS.map((b, i) => {
            const bp = (p - 0.6) / 0.4;
            const x = b.startX + bp * b.dx;
            const y = b.y + Math.sin(bp * Math.PI * 2 + b.phase) * 4;
            return (
              <g
                key={i}
                transform={`translate(${x},${y}) scale(${b.scale})`}
                opacity={Math.min((p - 0.6) * 5, 1)}
              >
                <Bird />
              </g>
            );
          })}
      </svg>

      <div className="sunrise-hud">
        <span className="sunrise-status">{STATUS[statusIndex]}</span>
        <span className="sunrise-pct">{pct}%</span>
      </div>
    </div>
  );
}
