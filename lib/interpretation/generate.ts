export type MvpReportInput = {
  birthUtc: Date;
  gender: "male" | "female";
  tzOffsetMinutes?: number;
  dayStartHourLocal?: number;
};

export type MvpReport = {
  birthIsoUtc: string;
  gender: "male" | "female";
  tzOffsetMinutes: number;
  dayStartHourLocal: number;
};

export function generateMvpReport(input: MvpReportInput): MvpReport {
  return {
    birthIsoUtc: input.birthUtc.toISOString(),
    gender: input.gender,
    tzOffsetMinutes: input.tzOffsetMinutes ?? 480,
    dayStartHourLocal: input.dayStartHourLocal ?? 23,
  };
}
