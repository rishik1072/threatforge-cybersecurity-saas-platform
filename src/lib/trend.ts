// Deterministic pseudo-random generator so server and client render identical
// chart data (avoids hydration mismatches from Math.random()).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface TrendPoint {
  label: string;
  detected: number;
  resolved: number;
}

export function buildThreatTrend(days = 14, seed = 42): TrendPoint[] {
  const rand = mulberry32(seed);
  const points: TrendPoint[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const base = 18 + Math.round(rand() * 22);
    const detected = base + Math.round(rand() * 10);
    const resolved = Math.max(4, detected - Math.round(rand() * 12));

    points.push({
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      detected,
      resolved,
    });
  }

  return points;
}
