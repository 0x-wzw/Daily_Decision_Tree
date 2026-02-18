/**
 * Sexagenary cycle data used by BaZi day pillar calculations.
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

export interface DayPillar {
  /** 0-based index in the 60 JiaZi cycle. */
  index: number;
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  /** Combined pillar label such as "JiaZi". */
  name: string;
}

const JIA_ZI_OFFSET = 49;

/**
 * Convert a Gregorian calendar date to a Julian day number.
 *
 * Uses the date portion only, based on UTC to keep deterministic behavior
 * across runtimes and host timezones.
 */
export function toJulianDayNumber(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/**
 * Calculate the day pillar in the 60-stem-branch cycle.
 *
 * Formula reference:
 *   dayPillarIndex = (JDN + 49) % 60
 */
export function getDayPillar(date: Date): DayPillar {
  const jdn = toJulianDayNumber(date);
  const index = ((jdn + JIA_ZI_OFFSET) % 60 + 60) % 60;
  const stem = HEAVENLY_STEMS[index % 10];
  const branch = EARTHLY_BRANCHES[index % 12];

  return {
    index,
    stem,
    branch,
    name: `${stem}${branch}`,
  };
}
