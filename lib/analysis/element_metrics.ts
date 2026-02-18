import type { ElementVector } from "../bazi/element_scoring";

const ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"] as const;
type FE = (typeof ELEMENTS)[number];

export function normalize(v: ElementVector) {
  const total = ELEMENTS.reduce((s, e) => s + v[e], 0) || 1;
  const out: Record<FE, number> = {} as any;
  for (const e of ELEMENTS) out[e] = v[e] / total;
  return out;
}

export function topN(v: ElementVector, n = 2) {
  return Object.entries(v)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, n)
    .map(([element, score]) => ({ element, score: Number(score) }));
}

export function bottomN(v: ElementVector, n = 2) {
  return Object.entries(v)
    .sort((a, b) => (a[1] as number) - (b[1] as number))
    .slice(0, n)
    .map(([element, score]) => ({ element, score: Number(score) }));
}

/**
 * Balance index: 100 is perfectly even; 0 is extremely uneven.
 * Uses L1 distance from uniform distribution.
 */
export function balanceIndex(v: ElementVector): number {
  const nv = normalize(v);
  const target = 1 / 5;
  let dist = 0;
  for (const e of ELEMENTS) dist += Math.abs(nv[e] - target);
  // dist max is < 1.6 in practice; scale to 0..100
  const score = Math.max(0, 1 - dist / 1.6) * 100;
  return Math.round(score);
}
