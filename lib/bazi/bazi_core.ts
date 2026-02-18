import type { ElementScoreMap } from "../interpretation/types";

type BaziCoreOptions = {
  tzOffsetMinutes?: number;
  dayStartHourLocal?: number;
  elementSeason?: boolean;
};

export type BaziCoreResult = {
  elements: ElementScoreMap;
  meta: {
    tzOffsetMinutes: number;
    dayStartHourLocal: number;
    elementSeason: boolean;
  };
};

const DEFAULT_ELEMENTS: ElementScoreMap = {
  Wood: 2,
  Fire: 2,
  Earth: 2,
  Metal: 2,
  Water: 2,
};

export function getBaziCore(_birthUtc: Date, options: BaziCoreOptions = {}): BaziCoreResult {
  return {
    elements: { ...DEFAULT_ELEMENTS },
    meta: {
      tzOffsetMinutes: options.tzOffsetMinutes ?? 480,
      dayStartHourLocal: options.dayStartHourLocal ?? 23,
      elementSeason: options.elementSeason ?? true,
    },
  };
}
