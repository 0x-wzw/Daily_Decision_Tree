import { Line, trigramFromLines } from "./trigrams";

export interface Hexagram {
  index: number;
  unicode: string;
  binary: [Line, Line, Line, Line, Line, Line]; // bottom -> top
  upperTrigram: string;
  lowerTrigram: string;
}

const HEXAGRAM_UNICODE_START = 0x4dc0;

export const HEXAGRAMS_64: Hexagram[] = Array.from({ length: 64 }, (_, index) => {
  const bits = index
    .toString(2)
    .padStart(6, "0")
    .split("")
    .reverse()
    .map((bit) => Number(bit) as Line) as [Line, Line, Line, Line, Line, Line];

  const lowerTrigram = trigramFromLines([bits[0], bits[1], bits[2]]);
  const upperTrigram = trigramFromLines([bits[3], bits[4], bits[5]]);

  return {
    index: index + 1,
    unicode: String.fromCodePoint(HEXAGRAM_UNICODE_START + index),
    binary: bits,
    upperTrigram: upperTrigram.pinyin,
    lowerTrigram: lowerTrigram.pinyin,
  };
});
