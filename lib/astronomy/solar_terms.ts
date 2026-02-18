export interface SolarTerm {
  index: number;
  nameZh: string;
  approximateDateUTC: Date;
}

const NAMES_24 = [
  "小寒", "大寒", "立春", "雨水", "驚蟄", "春分", "清明", "穀雨",
  "立夏", "小滿", "芒種", "夏至", "小暑", "大暑", "立秋", "處暑",
  "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至",
] as const;

// Mean-term coefficients used for rough calendar-grade approximation (1901..2100)
const C20 = [6.11, 20.84, 4.6295, 19.4599, 6.3826, 21.4155, 5.59, 20.888, 6.318, 21.86, 6.5, 22.2, 7.928, 23.65, 8.35, 23.95, 8.44, 23.822, 9.098, 24.218, 8.218, 23.08, 7.9, 22.6] as const;
const C21 = [5.4055, 20.12, 3.87, 18.73, 5.63, 20.646, 4.81, 20.1, 5.52, 21.04, 5.678, 21.37, 7.108, 22.83, 7.5, 23.13, 7.646, 23.042, 8.318, 23.438, 7.438, 22.36, 7.18, 21.94] as const;

export function getSolarTermsForYear(year: number): SolarTerm[] {
  if (year < 1901 || year > 2100) {
    throw new RangeError("Supported range is 1901..2100");
  }

  const y = year % 100;
  const coeffs = year <= 2000 ? C20 : C21;

  return NAMES_24.map((nameZh, index) => {
    const month = Math.floor(index / 2);
    const c = coeffs[index];
    const day = Math.floor(y * 0.2422 + c) - Math.floor((y - 1) / 4);

    return {
      index,
      nameZh,
      approximateDateUTC: new Date(Date.UTC(year, month, day, 12, 0, 0)),
    };
  });
}

export function getCurrentSolarTerm(year: number, atUTC: Date): SolarTerm {
  const terms = getSolarTermsForYear(year);

  let current = terms[0];
  for (const term of terms) {
    if (atUTC >= term.approximateDateUTC) {
      current = term;
    } else {
      break;
    }
  }

  return current;
}
