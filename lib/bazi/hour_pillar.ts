import { getJiaZiByIndex, getStemIndex, type HeavenlyStem, type JiaZiItem } from "./jiazi60";

/**
 * Hour in 0..23 local solar time.
 */
export function getHourPillar(dayStem: HeavenlyStem, hour: number): JiaZiItem {
  if (hour < 0 || hour > 23) {
    throw new RangeError("hour must be in 0..23");
  }

  const branchIndex = Math.floor((hour + 1) / 2) % 12;
  const dayStemIndex = getStemIndex(dayStem);

  // 子时 stem starts: 甲己日甲子、乙庚日丙子、丙辛日戊子、丁壬日庚子、戊癸日壬子
  const ziHourStemStart = [0, 2, 4, 6, 8][Math.floor(dayStemIndex / 2)];
  const stemIndex = (ziHourStemStart + branchIndex) % 10;

  const hourCycleIndex = (stemIndex + branchIndex * 5) % 60;
  return getJiaZiByIndex(hourCycleIndex);
}
