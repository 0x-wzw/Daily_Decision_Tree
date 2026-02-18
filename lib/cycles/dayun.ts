import { getJiaZiByIndex, type JiaZiItem } from "../bazi/jiazi60";

export interface DaYunBlock {
  startAge: number;
  endAge: number;
  pillar: JiaZiItem;
}

export interface DaYunInput {
  monthPillar: JiaZiItem;
  yearStemYinYang: "Yang" | "Yin";
  gender: "Male" | "Female";
  /** starting age in years, rounded, often from day-difference to nearest solar term. */
  startAge: number;
  count?: number;
}

export function buildDaYun(input: DaYunInput): DaYunBlock[] {
  const count = input.count ?? 8;
  const isForward =
    (input.gender === "Male" && input.yearStemYinYang === "Yang") ||
    (input.gender === "Female" && input.yearStemYinYang === "Yin");

  return Array.from({ length: count }, (_, i) => {
    const cycleStep = i + 1;
    const jiaZiIndex = input.monthPillar.index + (isForward ? cycleStep : -cycleStep);

    return {
      startAge: input.startAge + i * 10,
      endAge: input.startAge + i * 10 + 9,
      pillar: getJiaZiByIndex(jiaZiIndex),
    };
  });
}
