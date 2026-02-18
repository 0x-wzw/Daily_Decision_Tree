import { getHexagramByLines, type Hexagram } from "./hexagrams64";
import type { YinYangLine } from "./trigrams";

export type CoinLineValue = 6 | 7 | 8 | 9;

export interface CastLine {
  value: CoinLineValue;
  isChanging: boolean;
  yinYang: YinYangLine;
}

export interface HexagramCastResult {
  original: Hexagram;
  relating: Hexagram;
  changingLineIndexes: number[];
  lines: [CastLine, CastLine, CastLine, CastLine, CastLine, CastLine];
}

export function lineFromCoinTosses(tosses: [2 | 3, 2 | 3, 2 | 3]): CastLine {
  const value = (tosses[0] + tosses[1] + tosses[2]) as CoinLineValue;
  const isChanging = value === 6 || value === 9;
  const yinYang: YinYangLine = value === 7 || value === 9 ? 1 : 0;

  return { value, isChanging, yinYang };
}

export function castHexagramFromCoinLines(
  values: [CoinLineValue, CoinLineValue, CoinLineValue, CoinLineValue, CoinLineValue, CoinLineValue],
): HexagramCastResult {
  const lines = values.map((value) => ({
    value,
    isChanging: value === 6 || value === 9,
    yinYang: (value === 7 || value === 9 ? 1 : 0) as YinYangLine,
  })) as HexagramCastResult["lines"];

  const originalLines = lines.map((line) => line.yinYang) as Hexagram["lines"];
  const relatingLines = lines.map((line) => (line.isChanging ? (line.yinYang === 1 ? 0 : 1) : line.yinYang)) as Hexagram["lines"];

  const original = getHexagramByLines(originalLines);
  const relating = getHexagramByLines(relatingLines);

  if (!original || !relating) {
    throw new Error("Failed to resolve cast lines into hexagrams.");
  }

  return {
    original,
    relating,
    lines,
    changingLineIndexes: lines.flatMap((line, idx) => (line.isChanging ? [idx] : [])),
  };
}
