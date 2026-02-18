import { FiveElement } from "../bazi/element_scoring";

export function getDominantAndWeakest(elements: Record<FiveElement, number>) {
  const sorted = (Object.entries(elements) as Array<[FiveElement, number]>).sort((a, b) => b[1] - a[1]);
  return {
    dominantElement: sorted[0][0],
    weakestElement: sorted[sorted.length - 1][0],
  };
}

export function getBalanceScore(elements: Record<FiveElement, number>): number {
  const values = Object.values(elements);
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total === 0) return 0;

  const mean = total / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  const std = Math.sqrt(variance);

  return Number(Math.max(0, 100 - std * 25).toFixed(2));
}
