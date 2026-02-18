import { scoreElements, type ElementScore } from "./element_scoring";
import { getDayPillar } from "./day_pillar";
import { getHourPillar } from "./hour_pillar";
import { getMonthPillar } from "./month_pillar";
import { getYearPillar } from "./year_pillar";
import type { JiaZiItem } from "./jiazi60";
import { getCurrentSolarTerm } from "../astronomy/solar_terms";

export interface BaZiChart {
  year: JiaZiItem;
  month: JiaZiItem;
  day: JiaZiItem;
  hour: JiaZiItem;
  elementScore: ElementScore;
  solarTermName: string;
}

export interface BuildBaZiInput {
  date: Date;
  /** Minutes offset from UTC for local civil time. Default: +480 (UTC+8). */
  timezoneOffsetMinutes?: number;
}

function toLocalDate(date: Date, timezoneOffsetMinutes: number): Date {
  return new Date(date.getTime() + timezoneOffsetMinutes * 60_000);
}

function solarMonthIndexFromTerm(termIndex: number): number {
  // 寅月 starts from Li Chun (index 2). 12 months across 24 terms.
  return (((Math.floor((termIndex - 2 + 24) % 24 / 2)) % 12) + 1);
}

export function buildBaZiChart(input: BuildBaZiInput): BaZiChart {
  const timezoneOffsetMinutes = input.timezoneOffsetMinutes ?? 480;
  const localDate = toLocalDate(input.date, timezoneOffsetMinutes);

  const solarTerm = getCurrentSolarTerm(localDate.getUTCFullYear(), localDate);
  const isBeforeLiChun = solarTerm.index < 2;

  const year = getYearPillar({
    year: localDate.getUTCFullYear(),
    useLiChunBoundary: true,
    isBeforeLiChun,
  });

  const monthIndex = solarMonthIndexFromTerm(solarTerm.index);
  const month = getMonthPillar(year.stem, monthIndex);
  const day = getDayPillar(localDate);
  const hour = getHourPillar(day.stem, localDate.getUTCHours());

  const elementScore = scoreElements([year, month, day, hour]);

  return {
    year,
    month,
    day,
    hour,
    elementScore,
    solarTermName: solarTerm.nameZh,
  };
}
