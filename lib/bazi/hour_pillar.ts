import { EARTHLY_BRANCHES, HEAVENLY_STEMS, JiaZi, getJiaZiByStemBranch } from "./jiazi60";
import { getDayPillar } from "./day_pillar";

const DAY_STEM_TO_ZI_HOUR_STEM_INDEX: Record<string, number> = {
  Jia: 0, Ji: 0,
  Yi: 2, Geng: 2,
  Bing: 4, Xin: 4,
  Ding: 6, Ren: 6,
  Wu: 8, Gui: 8,
};

export function getHourPillar(dateUtc: Date): JiaZi {
  const dayStem = getDayPillar(dateUtc).stem;
  const ziHourStemStart = DAY_STEM_TO_ZI_HOUR_STEM_INDEX[dayStem];

  const hour = dateUtc.getUTCHours();
  const hourBranchIndex = Math.floor(((hour + 1) % 24) / 2);
  const hourBranch = EARTHLY_BRANCHES[hourBranchIndex];
  const hourStem = HEAVENLY_STEMS[(ziHourStemStart + hourBranchIndex) % 10];

  const pillar = getJiaZiByStemBranch(hourStem, hourBranch);
  if (!pillar) throw new Error("Failed to derive hour pillar from stem/branch");
  return pillar;
}
