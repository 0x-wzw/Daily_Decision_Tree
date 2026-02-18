import { getJiaZiByIndex, getStemIndex, type HeavenlyStem, type JiaZiItem } from "./jiazi60";

/**
 * Solar month index from 1..12 where 1 starts at 寅月 (around Li Chun).
 */
export function getMonthPillar(yearStem: HeavenlyStem, solarMonthIndex: number): JiaZiItem {
  if (solarMonthIndex < 1 || solarMonthIndex > 12) {
    throw new RangeError("solarMonthIndex must be in 1..12");
  }

  const monthBranchOffset = solarMonthIndex + 1; // 寅 starts from branch index 2
  const yearStemIndex = getStemIndex(yearStem);

  // 寅月 stem mapping: 甲己起丙, 乙庚起戊, 丙辛起庚, 丁壬起壬, 戊癸起甲
  const yinMonthStemStart = [2, 4, 6, 8, 0][Math.floor(yearStemIndex / 2)];
  const stem = (yinMonthStemStart + solarMonthIndex - 1) % 10;

  // Build month pillar by matching computed stem & branch cycle position.
  const monthCycleIndex = (stem + (monthBranchOffset % 12) * 5) % 60;
  return getJiaZiByIndex(monthCycleIndex);
}
