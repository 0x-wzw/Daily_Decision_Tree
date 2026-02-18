import type { ElementVector } from "@/lib/bazi/element_scoring";

const ELEMENTS: Array<keyof ElementVector> = ["Wood", "Fire", "Earth", "Metal", "Water"];

type ElementRank = {
  element: keyof ElementVector;
  value: number;
};

const entries = (vector: ElementVector): ElementRank[] =>
  ELEMENTS.map((element) => ({ element, value: Number(vector[element] ?? 0) }));

export const normalize = (vector: ElementVector): ElementVector => {
  const total = entries(vector).reduce((acc, cur) => acc + Math.max(cur.value, 0), 0);
  if (total <= 0) {
    return { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  }

  return entries(vector).reduce(
    (acc, cur) => ({ ...acc, [cur.element]: Number((Math.max(cur.value, 0) / total).toFixed(4)) }),
    { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 } as ElementVector,
  );
};

export const topN = (vector: ElementVector, count = 1): ElementRank[] => {
  return entries(vector)
    .sort((a, b) => b.value - a.value)
    .slice(0, Math.max(0, count));
};

export const bottomN = (vector: ElementVector, count = 1): ElementRank[] => {
  return entries(vector)
    .sort((a, b) => a.value - b.value)
    .slice(0, Math.max(0, count));
};

export const balanceIndex = (vector: ElementVector): number => {
  const values = entries(normalize(vector)).map((entry) => entry.value);
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  return Number((1 - (max - min)).toFixed(4));
};
