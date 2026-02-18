export interface SolarTerm {
  name: string;
  longitude: number;
  approxUtc: Date;
}

const SOLAR_TERMS = [
  "LiChun", "YuShui", "JingZhe", "ChunFen", "QingMing", "GuYu",
  "LiXia", "XiaoMan", "MangZhong", "XiaZhi", "XiaoShu", "DaShu",
  "LiQiu", "ChuShu", "BaiLu", "QiuFen", "HanLu", "ShuangJiang",
  "LiDong", "XiaoXue", "DaXue", "DongZhi", "XiaoHan", "DaHan",
] as const;

const BASE_UTC = Date.UTC(2000, 0, 1, 12, 0, 0);
const TROPICAL_YEAR_DAYS = 365.2422;

function solarLongitudeDegrees(dateUtc: Date): number {
  const daysSinceBase = (dateUtc.getTime() - BASE_UTC) / 86400000;
  const meanLongitude = (280.46646 + 0.98564736 * daysSinceBase) % 360;
  return (meanLongitude + 360) % 360;
}

export function getSolarTermsUTC(year: number): SolarTerm[] {
  const jan1 = Date.UTC(year, 0, 1, 0, 0, 0);

  return SOLAR_TERMS.map((name, i) => {
    const targetLongitude = (315 + i * 15) % 360;
    const roughDayOfYear = ((targetLongitude - solarLongitudeDegrees(new Date(jan1)) + 360) % 360) / 360 * TROPICAL_YEAR_DAYS;
    const approxUtc = new Date(jan1 + roughDayOfYear * 86400000);

    return {
      name,
      longitude: targetLongitude,
      approxUtc,
    };
  });
}

export function getLiChunUTC(year: number): Date {
  return getSolarTermsUTC(year).find((term) => term.name === "LiChun")!.approxUtc;
}
