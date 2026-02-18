import type { ElementScoreMap, RankedElement } from "./types";

function rankElements(elements: ElementScoreMap): RankedElement[] {
  const ranked: RankedElement[] = [];

  for (const element in elements) {
    if (Object.prototype.hasOwnProperty.call(elements, element)) {
      ranked.push({
        element: element as RankedElement["element"],
        score: elements[element as keyof ElementScoreMap],
      });
    }
  }

  return ranked.sort((a, b) => b.score - a.score);
}

export function topN(elements: ElementScoreMap, n: number): RankedElement[] {
  return rankElements(elements).slice(0, Math.max(0, n));
}

export function bottomN(elements: ElementScoreMap, n: number): RankedElement[] {
  return rankElements(elements)
    .reverse()
    .slice(0, Math.max(0, n));
}

export function balanceIndex(elements: ElementScoreMap): number {
  const values: number[] = [];

  for (const element in elements) {
    if (Object.prototype.hasOwnProperty.call(elements, element)) {
      values.push(elements[element as keyof ElementScoreMap]);
    }
  }

  const total = values.reduce((sum, value) => sum + value, 0);

  if (total <= 0 || values.length === 0) {
    return 0;
  }

  const mean = total / values.length;
  const averageDeviation =
    values.reduce((sum, value) => sum + Math.abs(value - mean), 0) / values.length;

  const normalized = Math.max(0, 1 - averageDeviation / mean);
  return Math.round(normalized * 100);
}
