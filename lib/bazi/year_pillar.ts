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

export interface YearPillarOptions {
  /**
   * Approximate Li Chun cutoff month (1-12). Defaults to 2 (February).
   */
  liChunMonth?: number;
  /**
   * Approximate Li Chun cutoff day (1-31). Defaults to 4.
   */
  liChunDay?: number;
  /**
   * Use UTC date components when determining whether date is before Li Chun.
   */
  useUTC?: boolean;
}

export interface YearPillarResult {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  stemIndex: number;
  branchIndex: number;
  cycleIndex: number;
  sexagenaryName: `${HeavenlyStem}${EarthlyBranch}`;
  adjustedYear: number;
  usedLiChun: {
    month: number;
    day: number;
  };
}

const REFERENCE_JIA_ZI_YEAR = 1984;

function mod(value: number, base: number): number {
  return ((value % base) + base) % base;
}

function asDate(input: Date | string | number): Date {
  return input instanceof Date ? input : new Date(input);
}

/**
 * Returns true when the date is earlier than the configured Li Chun cutoff.
 */
function isBeforeLiChun(date: Date, month: number, day: number, useUTC = false): boolean {
  const currentMonth = useUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1;
  const currentDay = useUTC ? date.getUTCDate() : date.getDate();

  if (currentMonth < month) return true;
  if (currentMonth > month) return false;
  return currentDay < day;
}

/**
 * Calculate the BaZi year pillar from a Gregorian date using a Li Chun cutoff.
 *
 * Note: This uses an approximate Li Chun date (default February 4).
 */
export function getYearPillar(
  input: Date | string | number,
  options: YearPillarOptions = {},
): YearPillarResult {
  const date = asDate(input);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date input provided to getYearPillar.");
  }

  const liChunMonth = options.liChunMonth ?? 2;
  const liChunDay = options.liChunDay ?? 4;
  const useUTC = options.useUTC ?? false;

  const rawYear = useUTC ? date.getUTCFullYear() : date.getFullYear();
  const adjustedYear = isBeforeLiChun(date, liChunMonth, liChunDay, useUTC)
    ? rawYear - 1
    : rawYear;

  const cycleIndex = mod(adjustedYear - REFERENCE_JIA_ZI_YEAR, 60);
  const stemIndex = mod(cycleIndex, 10);
  const branchIndex = mod(cycleIndex, 12);

  const stem = HEAVENLY_STEMS[stemIndex];
  const branch = EARTHLY_BRANCHES[branchIndex];

  return {
    stem,
    branch,
    stemIndex,
    branchIndex,
    cycleIndex,
    sexagenaryName: `${stem}${branch}`,
    adjustedYear,
    usedLiChun: {
      month: liChunMonth,
      day: liChunDay,
    },
  };
}
