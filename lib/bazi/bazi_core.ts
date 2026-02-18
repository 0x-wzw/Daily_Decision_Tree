export const HEAVENLY_STEMS = [
  "Jia",
  "Yi",
  "Bing",
  "Ding",
  "Wu",
  "Ji",
  "Geng",
  "Xin",
  "Ren",
  "Gui",
] as const;

export const EARTHLY_BRANCHES = [
  "Zi",
  "Chou",
  "Yin",
  "Mao",
  "Chen",
  "Si",
  "Wu",
  "Wei",
  "Shen",
  "You",
  "Xu",
  "Hai",
] as const;

export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number];
export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number];

export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
}

/**
 * Builds a sexagenary pillar from a 0-based cycle index.
 *
 * 0 => Jia-Zi, 1 => Yi-Chou, ... 59 => Gui-Hai.
 */
export function pillarFromCycleIndex(index: number): Pillar {
  if (!Number.isInteger(index)) {
    throw new TypeError(`Cycle index must be an integer, received: ${index}`);
  }

  const normalized = ((index % 60) + 60) % 60;

  return {
    stem: HEAVENLY_STEMS[normalized % 10],
    branch: EARTHLY_BRANCHES[normalized % 12],
  };
}

/**
 * Returns the sexagenary pillar for a Gregorian year.
 *
 * The cycle anchor uses 1984 as Jia-Zi year.
 */
export function yearPillar(year: number): Pillar {
  if (!Number.isInteger(year)) {
    throw new TypeError(`Year must be an integer, received: ${year}`);
  }

  const cycleIndex = year - 1984;
  return pillarFromCycleIndex(cycleIndex);
}

export function formatPillar(pillar: Pillar): string {
  return `${pillar.stem}-${pillar.branch}`;
}
