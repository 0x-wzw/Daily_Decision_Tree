const HEAVENLY_STEMS = [
  'Jia',
  'Yi',
  'Bing',
  'Ding',
  'Wu',
  'Ji',
  'Geng',
  'Xin',
  'Ren',
  'Gui',
] as const;

const EARTHLY_BRANCHES = [
  'Zi',
  'Chou',
  'Yin',
  'Mao',
  'Chen',
  'Si',
  'Wu',
  'Wei',
  'Shen',
  'You',
  'Xu',
  'Hai',
] as const;

export type HeavenlyStem = (typeof HEAVENLY_STEMS)[number];
export type EarthlyBranch = (typeof EARTHLY_BRANCHES)[number];

export interface LiuNianYear {
  year: number;
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  pillar: `${HeavenlyStem}-${EarthlyBranch}`;
  cycleIndex: number;
}

/**
 * Returns the sexagenary-year marker for a Gregorian year.
 * 1984 is used as the base (Jia-Zi, start of a 60-year cycle).
 */
export function getLiuNianYear(year: number): LiuNianYear {
  if (!Number.isInteger(year)) {
    throw new Error('Year must be an integer.');
  }

  const offset = year - 1984;
  const cycleIndex = ((offset % 60) + 60) % 60;
  const stem = HEAVENLY_STEMS[cycleIndex % 10];
  const branch = EARTHLY_BRANCHES[cycleIndex % 12];

  return {
    year,
    stem,
    branch,
    pillar: `${stem}-${branch}`,
    cycleIndex,
  };
}

export function getLiuNianRange(startYear: number, span: number): LiuNianYear[] {
  if (!Number.isInteger(span) || span <= 0) {
    throw new Error('Span must be a positive integer.');
  }

  return Array.from({ length: span }, (_, index) => getLiuNianYear(startYear + index));
}
