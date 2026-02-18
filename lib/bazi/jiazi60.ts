export const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number];
export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number];

export interface JiaZiItem {
  index: number;
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  label: `${HeavenlyStem}${EarthlyBranch}`;
}

export const JIAZI_60: readonly JiaZiItem[] = Array.from({ length: 60 }, (_, i) => {
  const stem = HEAVENLY_STEMS[i % HEAVENLY_STEMS.length];
  const branch = EARTHLY_BRANCHES[i % EARTHLY_BRANCHES.length];
  return {
    index: i,
    stem,
    branch,
    label: `${stem}${branch}`,
  };
});

export function getJiaZiByIndex(index: number): JiaZiItem {
  const normalized = ((index % 60) + 60) % 60;
  return JIAZI_60[normalized];
}

export function getStemIndex(stem: HeavenlyStem): number {
  return HEAVENLY_STEMS.indexOf(stem);
}

export function getBranchIndex(branch: EarthlyBranch): number {
  return EARTHLY_BRANCHES.indexOf(branch);
}
