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

export interface HourPillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  stemIndex: number;
  branchIndex: number;
}

function isInteger(value: number): boolean {
  return isFinite(value) && Math.floor(value) === value;
}

/**
 * Converts a clock hour to the corresponding earthly branch index.
 *
 * Bazi hour branches are 2-hour windows with Zi hour starting at 23:00.
 */
export function getHourBranchIndex(hour: number): number {
  if (!isInteger(hour) || hour < 0 || hour > 23) {
    throw new RangeError('hour must be an integer between 0 and 23');
  }

  return Math.floor(((hour + 1) % 24) / 2);
}

/**
 * Returns the hour pillar from a day stem index and 24-hour clock hour.
 *
 * Day stem index uses Jia=0 ... Gui=9.
 */
export function getHourPillar(dayStemIndex: number, hour: number): HourPillar {
  if (!isInteger(dayStemIndex) || dayStemIndex < 0 || dayStemIndex > 9) {
    throw new RangeError('dayStemIndex must be an integer between 0 and 9');
  }

  const branchIndex = getHourBranchIndex(hour);
  const ziHourStemIndex = ((dayStemIndex % 5) * 2) % 10;
  const stemIndex = (ziHourStemIndex + branchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    stemIndex,
    branchIndex,
  };
}
