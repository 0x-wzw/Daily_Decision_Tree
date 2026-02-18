export type YinYangLine = 0 | 1;

export interface Trigram {
  /** Traditional Chinese character (e.g., 乾). */
  character: string;
  /** Hanyu pinyin transliteration (e.g., Qian). */
  pinyin: string;
  /** Common English name. */
  english: string;
  /** Three lines from bottom to top: 1 = yang (solid), 0 = yin (broken). */
  lines: [YinYangLine, YinYangLine, YinYangLine];
  /** Elemental or natural correspondence. */
  element: string;
  /** Cardinal direction correspondence. */
  direction: string;
}

export const TRIGRAMS: readonly Trigram[] = [
  {
    character: '乾',
    pinyin: 'Qian',
    english: 'Heaven',
    lines: [1, 1, 1],
    element: 'Heaven / Metal',
    direction: 'Northwest',
  },
  {
    character: '兌',
    pinyin: 'Dui',
    english: 'Lake',
    lines: [1, 1, 0],
    element: 'Lake / Metal',
    direction: 'West',
  },
  {
    character: '離',
    pinyin: 'Li',
    english: 'Fire',
    lines: [1, 0, 1],
    element: 'Fire',
    direction: 'South',
  },
  {
    character: '震',
    pinyin: 'Zhen',
    english: 'Thunder',
    lines: [1, 0, 0],
    element: 'Wood / Thunder',
    direction: 'East',
  },
  {
    character: '巽',
    pinyin: 'Xun',
    english: 'Wind',
    lines: [0, 1, 1],
    element: 'Wood / Wind',
    direction: 'Southeast',
  },
  {
    character: '坎',
    pinyin: 'Kan',
    english: 'Water',
    lines: [0, 1, 0],
    element: 'Water',
    direction: 'North',
  },
  {
    character: '艮',
    pinyin: 'Gen',
    english: 'Mountain',
    lines: [0, 0, 1],
    element: 'Earth / Mountain',
    direction: 'Northeast',
  },
  {
    character: '坤',
    pinyin: 'Kun',
    english: 'Earth',
    lines: [0, 0, 0],
    element: 'Earth',
    direction: 'Southwest',
  },
] as const;

const lineKey = (lines: readonly YinYangLine[]): string => lines.join('');

const trigramByLineKey = new Map(
  TRIGRAMS.map((trigram) => [lineKey(trigram.lines), trigram]),
);

/**
 * Finds a trigram by its line pattern.
 *
 * @param lines Three lines represented from bottom to top.
 */
export const getTrigramByLines = (
  lines: [YinYangLine, YinYangLine, YinYangLine],
): Trigram | undefined => trigramByLineKey.get(lineKey(lines));

/**
 * Finds a trigram by either character, pinyin, or English name.
 */
export const getTrigramByName = (name: string): Trigram | undefined => {
  const normalized = name.trim().toLowerCase();

  return TRIGRAMS.find(
    ({ character, pinyin, english }) =>
      character === name ||
      pinyin.toLowerCase() === normalized ||
      english.toLowerCase() === normalized,
  );
};
