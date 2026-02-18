import { EARTHLY_BRANCHES, HEAVENLY_STEMS, JiaZi, getJiaZiByStemBranch } from "./jiazi60";
import { getSolarTermsUTC } from "../astronomy/solar_terms";
import { getYearPillar } from "./year_pillar";

const YEAR_STEM_TO_FIRST_MONTH_STEM_INDEX: Record<string, number> = {
  Jia: 2, Ji: 2,
  Yi: 4, Geng: 4,
  Bing: 6, Xin: 6,
  Ding: 8, Ren: 8,
  Wu: 0, Gui: 0,
};

export function getMonthPillar(dateUtc: Date): JiaZi {
  const terms = getSolarTermsUTC(dateUtc.getUTCFullYear());
  const jieTerms = terms.filter((_, i) => i % 2 === 0);

  let monthIndex = jieTerms.findIndex((term, idx) => {
    const start = term.approxUtc;
    const end = jieTerms[idx + 1]?.approxUtc ?? new Date(Date.UTC(dateUtc.getUTCFullYear() + 1, 0, 1));
    return dateUtc >= start && dateUtc < end;
  });

  if (monthIndex < 0) monthIndex = 11;

  const yearStem = getYearPillar(dateUtc).stem;
  const firstMonthStemIndex = YEAR_STEM_TO_FIRST_MONTH_STEM_INDEX[yearStem];
  const stem = HEAVENLY_STEMS[(firstMonthStemIndex + monthIndex) % 10];
  const branch = EARTHLY_BRANCHES[(2 + monthIndex) % 12]; // Tiger month starts at Yin

  const pillar = getJiaZiByStemBranch(stem, branch);
  if (!pillar) throw new Error("Failed to derive month pillar from stem/branch");
  return pillar;
}
