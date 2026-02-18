import { getMonthPillar } from "../bazi/month_pillar";
import { JIAZI_60 } from "../bazi/jiazi60";
import { getSolarTermsUTC } from "../astronomy/solar_terms";

export type Gender = "male" | "female";

function isYangStem(stem: string): boolean {
  return ["Jia", "Bing", "Wu", "Geng", "Ren"].includes(stem);
}

export function generateDaYun(dateUtc: Date, gender: Gender, count = 8) {
  const monthPillar = getMonthPillar(dateUtc);
  const yearTerms = getSolarTermsUTC(dateUtc.getUTCFullYear());
  const nextTerm = yearTerms.find((term) => term.approxUtc >= dateUtc) ?? yearTerms[0];
  const daysToStart = Math.max(1, (nextTerm.approxUtc.getTime() - dateUtc.getTime()) / 86400000);
  const startAge = Math.max(1, Math.round(daysToStart / 3));

  const forward = (gender === "male" && isYangStem(monthPillar.stem)) || (gender === "female" && !isYangStem(monthPillar.stem));
  const monthIdx = JIAZI_60.findIndex((item) => item.index === monthPillar.index);

  const periods = Array.from({ length: count }, (_, i) => {
    const cycleOffset = forward ? i + 1 : -(i + 1);
    const pillar = JIAZI_60[(monthIdx + cycleOffset + 60) % 60];
    const ageStart = startAge + i * 10;
    return {
      ageStart,
      ageEnd: ageStart + 10,
      pillar,
    };
  });

  return { startAge, periods, direction: forward ? "forward" : "backward" };
}
