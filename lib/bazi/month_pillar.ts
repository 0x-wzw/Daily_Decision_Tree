/**
 * Month pillar calculation for BaZi (Four Pillars).
 *
 * Input month index uses the traditional solar month mapping:
 *   1 = Tiger (寅), 2 = Rabbit (卯), ... 12 = Ox (丑)
 */

export const HEAVENLY_STEMS = [
  'Jia',
  'Yi',
  'Bing',
  'Ding',
  'Wu',
  'Ji',
  'Geng',
  'Xin',
  'Ren',
  'Gui',
] as const;

export const EARTHLY_BRANCHES = [
  'Zi',
  'Chou',
  'Yin',
  'Mao',
  'Chen',
  'Si',
  'Wu',
  'Wei',
  'Shen',
  'You',
  'Xu',
  'Hai',
] as const;

export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number];
export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number];

export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
}

/**
 * Month stem start index by year stem group.
 *
 * Jia/Ji   -> Bing (2)
 * Yi/Geng  -> Wu   (4)
 * Bing/Xin -> Geng (6)
 * Ding/Ren -> Ren  (8)
 * Wu/Gui   -> Jia  (0)
 */
const MONTH_START_STEM_BY_YEAR_STEM: Record<HeavenlyStem, number> = {
  Jia: 2,
  Yi: 4,
  Bing: 6,
  Ding: 8,
  Wu: 0,
  Ji: 2,
  Geng: 4,
  Xin: 6,
  Ren: 8,
  Gui: 0,
};

/**
 * Calculates the month pillar based on year heavenly stem and solar month index.
 *
 * @param yearStem - Year heavenly stem.
 * @param monthIndex - Traditional solar month index (1..12), where 1 = Yin month.
 */
export function getMonthPillar(yearStem: HeavenlyStem, monthIndex: number): Pillar {
  if (!Number.isInteger(monthIndex) || monthIndex < 1 || monthIndex > 12) {
    throw new RangeError(`monthIndex must be an integer between 1 and 12. Received: ${monthIndex}`);
  }

  const startStemIndex = MONTH_START_STEM_BY_YEAR_STEM[yearStem];
  const stemIndex = (startStemIndex + (monthIndex - 1)) % 10;

  // Yin month is branch index 2.
  const branchIndex = (2 + (monthIndex - 1)) % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
  };
}
