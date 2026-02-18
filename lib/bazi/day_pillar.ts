import { JiaZi, getJiaZi } from "./jiazi60";

const DAY_MS = 86400000;
const BASE_DAY_UTC = Date.UTC(1984, 1, 2, 12, 0, 0); // commonly used JiaZi day anchor

export function getDayPillar(dateUtc: Date): JiaZi {
  const noonUtc = Date.UTC(
    dateUtc.getUTCFullYear(),
    dateUtc.getUTCMonth(),
    dateUtc.getUTCDate(),
    12,
    0,
    0,
  );
  const offsetDays = Math.floor((noonUtc - BASE_DAY_UTC) / DAY_MS);
  return getJiaZi(offsetDays + 1);
}
