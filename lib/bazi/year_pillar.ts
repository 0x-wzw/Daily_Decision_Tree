import { getJiaZiByIndex, type JiaZiItem } from "./jiazi60";

export interface YearPillarInput {
  year: number;
  /**
   * If true, year switches at Li Chun. Otherwise uses lunar new year style input already adjusted externally.
   */
  useLiChunBoundary?: boolean;
  isBeforeLiChun?: boolean;
}

/**
 * 1984 is 甲子 (index 0).
 */
export function getYearPillar(input: YearPillarInput): JiaZiItem {
  const effectiveYear =
    input.useLiChunBoundary && input.isBeforeLiChun ? input.year - 1 : input.year;
  return getJiaZiByIndex(effectiveYear - 1984);
}
