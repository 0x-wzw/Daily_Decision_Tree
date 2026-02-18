export const CARDINAL_DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
export type CardinalDirection = (typeof CARDINAL_DIRECTIONS)[number];

const DIRECTION_DEGREES: Record<CardinalDirection, [number, number]> = {
  N: [337.5, 22.5],
  NE: [22.5, 67.5],
  E: [67.5, 112.5],
  SE: [112.5, 157.5],
  S: [157.5, 202.5],
  SW: [202.5, 247.5],
  W: [247.5, 292.5],
  NW: [292.5, 337.5],
};

const ELEMENT_BY_DIRECTION: Record<CardinalDirection, string> = {
  N: 'Water',
  NE: 'Earth',
  E: 'Wood',
  SE: 'Wood',
  S: 'Fire',
  SW: 'Earth',
  W: 'Metal',
  NW: 'Metal',
};

export function normalizeBearing(degrees: number): number {
  const normalized = degrees % 360;
  return normalized >= 0 ? normalized : normalized + 360;
}

export function getDirectionFromBearing(degrees: number): CardinalDirection {
  const bearing = normalizeBearing(degrees);

  if (bearing >= DIRECTION_DEGREES.N[0] || bearing < DIRECTION_DEGREES.N[1]) {
    return 'N';
  }

  for (const direction of CARDINAL_DIRECTIONS.filter((d) => d !== 'N')) {
    const [start, end] = DIRECTION_DEGREES[direction];
    if (bearing >= start && bearing < end) {
      return direction;
    }
  }

  return 'N';
}

export function getFengShuiElementForDirection(direction: CardinalDirection): string {
  return ELEMENT_BY_DIRECTION[direction];
}
