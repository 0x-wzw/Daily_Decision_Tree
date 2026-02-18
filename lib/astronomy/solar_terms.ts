export type SolarTermName =
  | 'Minor Cold'
  | 'Major Cold'
  | 'Start of Spring'
  | 'Rain Water'
  | 'Awakening of Insects'
  | 'Spring Equinox'
  | 'Pure Brightness'
  | 'Grain Rain'
  | 'Start of Summer'
  | 'Grain Full'
  | 'Grain in Ear'
  | 'Summer Solstice'
  | 'Minor Heat'
  | 'Major Heat'
  | 'Start of Autumn'
  | 'Limit of Heat'
  | 'White Dew'
  | 'Autumn Equinox'
  | 'Cold Dew'
  | 'Frost Descent'
  | 'Start of Winter'
  | 'Minor Snow'
  | 'Major Snow'
  | 'Winter Solstice';

export interface SolarTerm {
  name: SolarTermName;
  month: number;
  day: number;
}

/**
 * Approximate Gregorian dates for the 24 traditional East Asian solar terms.
 *
 * These dates can shift by up to one day depending on year and timezone.
 */
export const SOLAR_TERMS: ReadonlyArray<SolarTerm> = [
  { name: 'Minor Cold', month: 1, day: 5 },
  { name: 'Major Cold', month: 1, day: 20 },
  { name: 'Start of Spring', month: 2, day: 4 },
  { name: 'Rain Water', month: 2, day: 19 },
  { name: 'Awakening of Insects', month: 3, day: 6 },
  { name: 'Spring Equinox', month: 3, day: 21 },
  { name: 'Pure Brightness', month: 4, day: 5 },
  { name: 'Grain Rain', month: 4, day: 20 },
  { name: 'Start of Summer', month: 5, day: 6 },
  { name: 'Grain Full', month: 5, day: 21 },
  { name: 'Grain in Ear', month: 6, day: 6 },
  { name: 'Summer Solstice', month: 6, day: 21 },
  { name: 'Minor Heat', month: 7, day: 7 },
  { name: 'Major Heat', month: 7, day: 23 },
  { name: 'Start of Autumn', month: 8, day: 8 },
  { name: 'Limit of Heat', month: 8, day: 23 },
  { name: 'White Dew', month: 9, day: 8 },
  { name: 'Autumn Equinox', month: 9, day: 23 },
  { name: 'Cold Dew', month: 10, day: 8 },
  { name: 'Frost Descent', month: 10, day: 23 },
  { name: 'Start of Winter', month: 11, day: 7 },
  { name: 'Minor Snow', month: 11, day: 22 },
  { name: 'Major Snow', month: 12, day: 7 },
  { name: 'Winter Solstice', month: 12, day: 22 },
] as const;

export function findSolarTermByDate(date: Date): SolarTerm | undefined {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return SOLAR_TERMS.find((term) => term.month === month && term.day === day);
}

export function getCurrentSolarTerm(date: Date): SolarTerm {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (let i = SOLAR_TERMS.length - 1; i >= 0; i -= 1) {
    const term = SOLAR_TERMS[i];

    if (month > term.month || (month === term.month && day >= term.day)) {
      return term;
    }
  }

  return SOLAR_TERMS[SOLAR_TERMS.length - 1];
}
