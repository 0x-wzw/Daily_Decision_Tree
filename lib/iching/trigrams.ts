export type Line = 0 | 1;

export interface Trigram {
  id: number;
  name: string;
  pinyin: string;
  symbol: string;
  lines: [Line, Line, Line]; // bottom -> top
  element: "Wood" | "Fire" | "Earth" | "Metal" | "Water";
}

export const TRIGRAMS: Trigram[] = [
  { id: 0, name: "坤", pinyin: "Kun", symbol: "☷", lines: [0, 0, 0], element: "Earth" },
  { id: 1, name: "震", pinyin: "Zhen", symbol: "☳", lines: [1, 0, 0], element: "Wood" },
  { id: 2, name: "坎", pinyin: "Kan", symbol: "☵", lines: [0, 1, 0], element: "Water" },
  { id: 3, name: "兑", pinyin: "Dui", symbol: "☱", lines: [1, 1, 0], element: "Metal" },
  { id: 4, name: "艮", pinyin: "Gen", symbol: "☶", lines: [0, 0, 1], element: "Earth" },
  { id: 5, name: "离", pinyin: "Li", symbol: "☲", lines: [1, 0, 1], element: "Fire" },
  { id: 6, name: "巽", pinyin: "Xun", symbol: "☴", lines: [0, 1, 1], element: "Wood" },
  { id: 7, name: "乾", pinyin: "Qian", symbol: "☰", lines: [1, 1, 1], element: "Metal" },
];

export function trigramFromLines(lines: [Line, Line, Line]): Trigram {
  const trigram = TRIGRAMS.find((t) => t.lines.every((line, i) => line === lines[i]));
  if (!trigram) {
    throw new Error(`Unknown trigram lines: ${lines.join("")}`);
  }
  return trigram;
}
