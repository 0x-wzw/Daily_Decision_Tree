import type { InterpretationReport } from "./types";
import { topN, bottomN, balanceIndex } from "./scoring";
import { elementCards } from "./rules";

import { getBaziCore } from "../bazi/bazi_core";
import { generateDaYun } from "../cycles/dayun";

export function generateMvpReport(input: {
  birthUtc: Date;
  gender: "male" | "female";
  tzOffsetMinutes?: number;
  dayStartHourLocal?: 0 | 23 | number;
}) {
  const tz = input.tzOffsetMinutes ?? 480;

  const bazi = getBaziCore(input.birthUtc, {
    tzOffsetMinutes: tz,
    dayStartHourLocal: input.dayStartHourLocal ?? 23,
    elementSeason: true,
  });

  const dayun = generateDaYun(input.birthUtc, input.gender, { tzOffsetMinutes: tz, count: 8 });

  const dom = topN(bazi.elements, 2);
  const low = bottomN(bazi.elements, 2);
  const bi = balanceIndex(bazi.elements);

  const cards = [
    ...elementCards(bazi.elements),
    {
      id: "dayun-start",
      title: "DaYun starts at",
      why: `Your luck cycles begin around age ${dayun.start.startAgeYears.toFixed(2)} (${dayun.start.startAgeDetail.years}y ${dayun.start.startAgeDetail.months}m). Direction: ${dayun.start.direction}.`,
      whatToDo: [
        "Use the first DaYun period to set a 10-year theme and operating rules.",
        "Align big moves near period boundaries; keep execution consistent inside periods.",
      ],
      tags: ["dayun", "cycles"],
      severity: "med" as const,
    },
  ];

  const notes: string[] = [];
  notes.push("If your birth time is very close to LiChun or a Jie boundary, pillar boundaries can shift by hours.");
  notes.push("For ultra-precision, add longitude-based true solar time correction later.");

  const report: InterpretationReport = {
    summary: [
      `Dominant elements: ${dom.map((d) => d.element).join(", ")}`,
      `Weakest elements: ${low.map((d) => d.element).join(", ")}`,
      `Balance index: ${bi}/100`,
    ],
    dominant: dom,
    weakest: low,
    balanceIndex: bi,
    cards,
    notes,
  };

  return { bazi, dayun, report };
}
