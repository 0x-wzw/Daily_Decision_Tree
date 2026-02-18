import { getJiaZiByIndex, type JiaZiItem } from "./jiazi60";

const REFERENCE_UTC_MS = Date.UTC(1984, 1, 2, 0, 0, 0, 0); // 1984-02-02 assumed 甲子日

export function getDayPillar(date: Date): JiaZiItem {
  const utcMidnight = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const diffDays = Math.floor((utcMidnight - REFERENCE_UTC_MS) / 86_400_000);
  return getJiaZiByIndex(diffDays);
}
