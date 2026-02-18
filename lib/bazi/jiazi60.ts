export const HEAVENLY_STEMS = ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"] as const;
export const EARTHLY_BRANCHES = ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"] as const;

export type Stem = (typeof HEAVENLY_STEMS)[number];
export type Branch = (typeof EARTHLY_BRANCHES)[number];

export interface JiaZi {
  index: number;
  stem: Stem;
  branch: Branch;
  zh: string;
}

const STEM_ZH: Record<Stem, string> = {
  Jia: "甲", Yi: "乙", Bing: "丙", Ding: "丁", Wu: "戊", Ji: "己", Geng: "庚", Xin: "辛", Ren: "壬", Gui: "癸",
};
const BRANCH_ZH: Record<Branch, string> = {
  Zi: "子", Chou: "丑", Yin: "寅", Mao: "卯", Chen: "辰", Si: "巳", Wu: "午", Wei: "未", Shen: "申", You: "酉", Xu: "戌", Hai: "亥",
};

export const JIAZI_60: JiaZi[] = Array.from({ length: 60 }, (_, idx) => {
  const stem = HEAVENLY_STEMS[idx % 10];
  const branch = EARTHLY_BRANCHES[idx % 12];
  return {
    index: idx + 1,
    stem,
    branch,
    zh: `${STEM_ZH[stem]}${BRANCH_ZH[branch]}`,
  };
});

export function getJiaZi(index1to60: number): JiaZi {
  const normalized = ((index1to60 - 1) % 60 + 60) % 60;
  return JIAZI_60[normalized];
}

export function getJiaZiByStemBranch(stem: Stem, branch: Branch): JiaZi | undefined {
  return JIAZI_60.find((item) => item.stem === stem && item.branch === branch);
}
