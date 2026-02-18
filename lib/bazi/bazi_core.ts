import { getDayPillar } from "./day_pillar";
import { getHourPillar } from "./hour_pillar";
import { getMonthPillar } from "./month_pillar";
import { getYearPillar } from "./year_pillar";
import { scoreElements } from "./element_scoring";

export function getBaziCore(dateUtc: Date) {
  const year = getYearPillar(dateUtc);
  const month = getMonthPillar(dateUtc);
  const day = getDayPillar(dateUtc);
  const hour = getHourPillar(dateUtc);

  const elements = scoreElements(
    [year.stem, month.stem, day.stem, hour.stem],
    [year.branch, month.branch, day.branch, hour.branch],
  );

  return { year, month, day, hour, elements };
}
