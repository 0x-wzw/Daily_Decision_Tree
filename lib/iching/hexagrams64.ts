import { TRIGRAMS, type YinYangLine } from "./trigrams";

export interface Hexagram {
  index: number;
  id: string;
  nameZh: string;
  nameEn: string;
  upperTrigramKey: string;
  lowerTrigramKey: string;
  /** Six lines from bottom (index 0) to top (index 5). */
  lines: [YinYangLine, YinYangLine, YinYangLine, YinYangLine, YinYangLine, YinYangLine];
}

const BINARY_ORDER_NAMES: readonly [string, string][] = [
  ["乾", "The Creative"], ["夬", "Breakthrough"], ["大有", "Great Possession"], ["大壯", "Great Power"],
  ["小畜", "Small Taming"], ["需", "Waiting"], ["大畜", "Great Taming"], ["泰", "Peace"],
  ["履", "Treading"], ["兌", "The Joyous"], ["睽", "Opposition"], ["歸妹", "Marrying Maiden"],
  ["中孚", "Inner Truth"], ["節", "Limitation"], ["損", "Decrease"], ["臨", "Approach"],
  ["同人", "Fellowship"], ["革", "Revolution"], ["離", "The Clinging"], ["豐", "Abundance"],
  ["家人", "Family"], ["既濟", "After Completion"], ["賁", "Grace"], ["明夷", "Darkening of the Light"],
  ["無妄", "Innocence"], ["隨", "Following"], ["噬嗑", "Biting Through"], ["震", "The Arousing"],
  ["益", "Increase"], ["屯", "Difficulty at the Beginning"], ["頤", "Nourishment"], ["復", "Return"],
  ["姤", "Coming to Meet"], ["大過", "Great Exceeding"], ["鼎", "The Cauldron"], ["恆", "Duration"],
  ["巽", "The Gentle"], ["井", "The Well"], ["蠱", "Work on the Decayed"], ["升", "Pushing Upward"],
  ["訟", "Conflict"], ["困", "Oppression"], ["未濟", "Before Completion"], ["解", "Deliverance"],
  ["渙", "Dispersion"], ["坎", "The Abysmal"], ["蒙", "Youthful Folly"], ["師", "The Army"],
  ["遯", "Retreat"], ["咸", "Influence"], ["旅", "The Wanderer"], ["小過", "Small Exceeding"],
  ["漸", "Development"], ["蹇", "Obstruction"], ["艮", "Keeping Still"], ["謙", "Modesty"],
  ["否", "Standstill"], ["萃", "Gathering Together"], ["晉", "Progress"], ["豫", "Enthusiasm"],
  ["觀", "Contemplation"], ["比", "Holding Together"], ["剝", "Splitting Apart"], ["坤", "The Receptive"],
] as const;

export const HEXAGRAMS_64: readonly Hexagram[] = TRIGRAMS.flatMap((upper, upperIdx) =>
  TRIGRAMS.map((lower, lowerIdx) => {
    const index = upperIdx * 8 + lowerIdx + 1;
    const [nameZh, nameEn] = BINARY_ORDER_NAMES[index - 1] ?? ["未命名", "Unnamed"];

    return {
      index,
      id: `H${String(index).padStart(2, "0")}`,
      nameZh,
      nameEn,
      upperTrigramKey: upper.key,
      lowerTrigramKey: lower.key,
      lines: [...lower.lines, ...upper.lines] as Hexagram["lines"],
    };
  }),
);

const HEXAGRAM_BY_LINES = new Map(HEXAGRAMS_64.map((h) => [h.lines.join(""), h]));
const HEXAGRAM_BY_ID = new Map(HEXAGRAMS_64.map((h) => [h.id, h]));

export function getHexagramByLines(lines: Hexagram["lines"]): Hexagram | undefined {
  return HEXAGRAM_BY_LINES.get(lines.join(""));
}

export function getHexagramById(id: string): Hexagram | undefined {
  return HEXAGRAM_BY_ID.get(id);
}
