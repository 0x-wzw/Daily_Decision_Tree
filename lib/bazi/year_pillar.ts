import { getJiaZi, JiaZi } from "./jiazi60";
import { getLiChunUTC } from "../astronomy/solar_terms";

const BASE_YEAR = 1984; // JiaZi year anchor for LiChun boundary logic

export function getYearPillar(dateUtc: Date): JiaZi {
  const year = dateUtc.getUTCFullYear();
  const liChun = getLiChunUTC(year);
  const effectiveYear = dateUtc >= liChun ? year : year - 1;
  return getJiaZi(effectiveYear - BASE_YEAR + 1);
}
