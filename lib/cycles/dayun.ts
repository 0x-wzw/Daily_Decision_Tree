export type DayunDirection = "forward" | "backward";

export interface DayunCycle {
  /** Zero-based cycle index (0 = first 10-year cycle). */
  index: number;
  /** Inclusive starting age for the cycle. */
  startAge: number;
  /** Inclusive ending age for the cycle. */
  endAge: number;
  /** Stem-branch label for this cycle (if provided). */
  pillar?: string;
}

export interface BuildDayunCyclesOptions {
  /** Age when the first 10-year cycle begins. */
  startAge: number;
  /** Number of 10-year cycles to generate. */
  count?: number;
  /** Optional ordered pillar labels used to annotate cycles. */
  pillars?: readonly string[];
  /**
   * How to walk `pillars` from the first cycle onward.
   * - `forward`: 0,1,2...
   * - `backward`: 0,-1,-2... (wrapped)
   */
  direction?: DayunDirection;
}

const DEFAULT_CYCLE_COUNT = 8;

const normalizeIndex = (index: number, length: number): number => {
  const normalized = index % length;
  return normalized >= 0 ? normalized : normalized + length;
};

/**
 * Build Da Yun (大运) cycles using a configurable start age and optional pillar sequence.
 */
export const buildDayunCycles = ({
  startAge,
  count = DEFAULT_CYCLE_COUNT,
  pillars = [],
  direction = "forward",
}: BuildDayunCyclesOptions): DayunCycle[] => {
  if (!Number.isInteger(startAge) || startAge < 0) {
    throw new Error("`startAge` must be a non-negative integer.");
  }

  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("`count` must be a positive integer.");
  }

  const hasPillars = pillars.length > 0;
  const step = direction === "backward" ? -1 : 1;

  return Array.from({ length: count }, (_, index): DayunCycle => {
    const cycleStartAge = startAge + index * 10;
    const cycleEndAge = cycleStartAge + 9;

    const pillar = hasPillars
      ? pillars[normalizeIndex(index * step, pillars.length)]
      : undefined;

    return {
      index,
      startAge: cycleStartAge,
      endAge: cycleEndAge,
      pillar,
    };
  });
};
