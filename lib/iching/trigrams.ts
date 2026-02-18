export type YinYangLine = 0 | 1;

export interface Trigram {
  key: string;
  nameZh: string;
  nameEn: string;
  symbol: string;
  /**
   * Three lines from bottom (index 0) to top (index 2).
   * 1 = yang (solid), 0 = yin (broken)
   */
  lines: [YinYangLine, YinYangLine, YinYangLine];
  element: "Wood" | "Fire" | "Earth" | "Metal" | "Water";
}

export const TRIGRAMS: readonly Trigram[] = [
  { key: "qian", nameZh: "乾", nameEn: "Heaven", symbol: "☰", lines: [1, 1, 1], element: "Metal" },
  { key: "dui", nameZh: "兌", nameEn: "Lake", symbol: "☱", lines: [1, 1, 0], element: "Metal" },
  { key: "li", nameZh: "離", nameEn: "Fire", symbol: "☲", lines: [1, 0, 1], element: "Fire" },
  { key: "zhen", nameZh: "震", nameEn: "Thunder", symbol: "☳", lines: [1, 0, 0], element: "Wood" },
  { key: "xun", nameZh: "巽", nameEn: "Wind", symbol: "☴", lines: [0, 1, 1], element: "Wood" },
  { key: "kan", nameZh: "坎", nameEn: "Water", symbol: "☵", lines: [0, 1, 0], element: "Water" },
  { key: "gen", nameZh: "艮", nameEn: "Mountain", symbol: "☶", lines: [0, 0, 1], element: "Earth" },
  { key: "kun", nameZh: "坤", nameEn: "Earth", symbol: "☷", lines: [0, 0, 0], element: "Earth" },
] as const;

const TRIGRAM_BY_KEY = new Map(TRIGRAMS.map((t) => [t.key, t]));
const TRIGRAM_BY_SYMBOL = new Map(TRIGRAMS.map((t) => [t.symbol, t]));
const TRIGRAM_BY_LINES = new Map(TRIGRAMS.map((t) => [t.lines.join(""), t]));

export function getTrigramByKey(key: string): Trigram | undefined {
  return TRIGRAM_BY_KEY.get(key);
}

export function getTrigramBySymbol(symbol: string): Trigram | undefined {
  return TRIGRAM_BY_SYMBOL.get(symbol);
}

export function getTrigramByLines(
  lines: [YinYangLine, YinYangLine, YinYangLine],
): Trigram | undefined {
  return TRIGRAM_BY_LINES.get(lines.join(""));
}
