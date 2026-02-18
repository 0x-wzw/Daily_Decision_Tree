import { HEXAGRAMS_64, Hexagram } from "./hexagrams64";
import { Line } from "./trigrams";

export interface HexagramResult {
  primary: Hexagram;
  changingLines: number[];
  relating: Hexagram;
}

export function getHexagramByLines(lines: [Line, Line, Line, Line, Line, Line]): Hexagram {
  const key = lines.join("");
  const hexagram = HEXAGRAMS_64.find((h) => h.binary.join("") === key);
  if (!hexagram) {
    throw new Error(`Hexagram not found for lines ${key}`);
  }
  return hexagram;
}

export function buildHexagramResult(
  primaryLines: [Line, Line, Line, Line, Line, Line],
  changingLines: number[] = [],
): HexagramResult {
  const normalizedChangingLines = changingLines
    .map((line) => Math.trunc(line))
    .filter((line) => line >= 1 && line <= 6);

  const relatingLines = [...primaryLines] as [Line, Line, Line, Line, Line, Line];
  for (const line of normalizedChangingLines) {
    relatingLines[line - 1] = relatingLines[line - 1] === 1 ? 0 : 1;
  }

  return {
    primary: getHexagramByLines(primaryLines),
    changingLines: normalizedChangingLines,
    relating: getHexagramByLines(relatingLines),
  };
}
