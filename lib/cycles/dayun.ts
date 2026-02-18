export type DaYunResult = {
  start: {
    startAgeYears: number;
    startAgeDetail: {
      years: number;
      months: number;
    };
    direction: "forward" | "backward";
  };
};

export function generateDaYun(
  _birthUtc: Date,
  gender: "male" | "female",
  _options: { tzOffsetMinutes?: number; count?: number } = {},
): DaYunResult {
  return {
    start: {
      startAgeYears: 6,
      startAgeDetail: {
        years: 6,
        months: 0,
      },
      direction: gender === "male" ? "forward" : "backward",
    },
  };
}
