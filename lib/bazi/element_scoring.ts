import type { EarthlyBranch, HeavenlyStem } from "./jiazi60";

export type WuXing = "Wood" | "Fire" | "Earth" | "Metal" | "Water";

export interface ElementScore {
  Wood: number;
  Fire: number;
  Earth: number;
  Metal: number;
  Water: number;
}

export const STEM_TO_ELEMENT: Record<HeavenlyStem, WuXing> = {
  甲: "Wood",
  乙: "Wood",
  丙: "Fire",
  丁: "Fire",
  戊: "Earth",
  己: "Earth",
  庚: "Metal",
  辛: "Metal",
  壬: "Water",
  癸: "Water",
};

const BRANCH_HIDDEN_STEMS: Record<EarthlyBranch, readonly HeavenlyStem[]> = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "庚", "戊"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"],
};

const EMPTY_SCORE: ElementScore = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

export function scoreElements(pillars: { stem: HeavenlyStem; branch: EarthlyBranch }[]): ElementScore {
  const score: ElementScore = { ...EMPTY_SCORE };

  for (const pillar of pillars) {
    score[STEM_TO_ELEMENT[pillar.stem]] += 5;

    for (const hiddenStem of BRANCH_HIDDEN_STEMS[pillar.branch]) {
      score[STEM_TO_ELEMENT[hiddenStem]] += 1;
    }
  }

  return score;
}
