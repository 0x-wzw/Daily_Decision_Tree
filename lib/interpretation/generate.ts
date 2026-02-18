import { getBaziCore } from "@/lib/bazi/bazi_core";
import { generateDaYun } from "@/lib/cycles/dayun";
import { balanceIndex, normalize } from "@/lib/interpretation/scoring";
import { elementCards } from "@/lib/interpretation/rules";
import type { InterpretationReport } from "@/lib/interpretation/types";

type Gender = "male" | "female";

type GenerateMvpReportParams = {
  birthUtc: Date;
  gender: Gender;
  tzOffsetMinutes?: number;
  dayStartHourLocal?: 23 | 0;
};

type MvpPayload = {
  bazi: ReturnType<typeof getBaziCore>;
  dayun: ReturnType<typeof generateDaYun>;
  report: InterpretationReport;
};

export const generateMvpReport = ({
  birthUtc,
  gender,
  tzOffsetMinutes = 480,
  dayStartHourLocal = 23,
}: GenerateMvpReportParams): MvpPayload => {
  const bazi = getBaziCore(birthUtc, {
    tzOffsetMinutes,
    dayStartHourLocal,
    elementSeason: true,
  });

  const dayun = generateDaYun(birthUtc, gender, {
    tzOffsetMinutes,
    count: 8,
  });

  const elements = bazi.elements;
  const normalized = normalize(elements);
  const cards = elementCards(elements);

  const report: InterpretationReport = {
    elementVector: elements,
    normalized,
    balanceIndex: balanceIndex(elements),
    cards,
    notes: [
      "This MVP interpretation is a deterministic heuristic layer on top of BaZi core outputs.",
      "Treat this report as reflective guidance, not medical, legal, or financial advice.",
      "For higher precision, verify birth location and daylight-saving history separately.",
    ],
  };

  return {
    bazi,
    dayun,
    report,
  };
};
