export type LineValue = 6 | 7 | 8 | 9;
export type LinePolarity = "yin" | "yang";

export interface HexagramLine {
  /**
   * Traditional I Ching line value.
   * 6 = old yin, 7 = young yang, 8 = young yin, 9 = old yang.
   */
  value: LineValue;
  polarity: LinePolarity;
  isChanging: boolean;
}

export interface Hexagram {
  /**
   * Six lines ordered bottom (index 0) to top (index 5).
   */
  lines: HexagramLine[];
  /**
   * Bit form of the hexagram where 1 = yang, 0 = yin (bottom to top).
   */
  binary: [number, number, number, number, number, number];
  /**
   * Decimal index from 0-63 using bottom-to-top bit order.
   */
  index: number;
  /**
   * Binary and index after applying all changing lines.
   */
  relating: {
    binary: [number, number, number, number, number, number];
    index: number;
  };
}

export interface HexagramOptions {
  /**
   * Optional RNG function. Should return a float between 0 (inclusive) and 1 (exclusive).
   */
  rng?: () => number;
}

const defaultRng = (): number => Math.random();

/**
 * Generates one line using the classic 3-coin method.
 * Tail counts as 2, head counts as 3; sum maps to 6/7/8/9.
 */
export function castLineWithCoins(rng: () => number = defaultRng): LineValue {
  const toss = (): 2 | 3 => (rng() < 0.5 ? 2 : 3);
  const total = toss() + toss() + toss();

  if (total === 6 || total === 7 || total === 8 || total === 9) {
    return total;
  }

  throw new Error(`Unexpected line total: ${total}`);
}

export function toPolarity(value: LineValue): LinePolarity {
  return value === 7 || value === 9 ? "yang" : "yin";
}

export function isChangingLine(value: LineValue): boolean {
  return value === 6 || value === 9;
}

export function normalizeLine(value: LineValue): 0 | 1 {
  return toPolarity(value) === "yang" ? 1 : 0;
}

export function transformChangingLine(value: LineValue): LineValue {
  switch (value) {
    case 6:
      return 7;
    case 9:
      return 8;
    default:
      return value;
  }
}

export function buildHexagram(lines: LineValue[]): Hexagram {
  if (lines.length !== 6) {
    throw new Error(`A hexagram must contain exactly 6 lines. Received ${lines.length}.`);
  }

  const typedLines = lines.map((value) => ({
    value,
    polarity: toPolarity(value),
    isChanging: isChangingLine(value),
  } satisfies HexagramLine));

  const binary = typedLines.map((line) => (line.polarity === "yang" ? 1 : 0)) as Hexagram["binary"];
  const index = binaryToIndex(binary);

  const relatingBinary = typedLines.map((line) => normalizeLine(transformChangingLine(line.value))) as Hexagram["relating"]["binary"];

  return {
    lines: typedLines,
    binary,
    index,
    relating: {
      binary: relatingBinary,
      index: binaryToIndex(relatingBinary),
    },
  };
}

export function castHexagram(options: HexagramOptions = {}): Hexagram {
  const rng = options.rng ?? defaultRng;
  const lines: LineValue[] = [];

  for (let i = 0; i < 6; i += 1) {
    lines.push(castLineWithCoins(rng));
  }

  return buildHexagram(lines);
}

/**
 * Converts 6 bottom-to-top bits to a decimal index from 0-63.
 */
export function binaryToIndex(binary: [number, number, number, number, number, number]): number {
  return binary.reduce((acc, bit, position) => acc + (bit === 1 ? 2 ** position : 0), 0);
}
