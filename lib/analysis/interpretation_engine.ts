import {
  combineBaziAndHexagram,
  type BaziHexagramInsight,
  type BaziProfile,
  type HexagramProfile,
} from '../integration/bazi_hexagram';
import {
  getDirectionFromBearing,
  getFengShuiElementForDirection,
  type CardinalDirection,
} from '../fengshui/directions';

export interface InterpretationInput {
  year: number;
  homeFacingBearing: number;
  bazi: BaziProfile;
  hexagram: HexagramProfile;
}

export interface InterpretationReport {
  direction: CardinalDirection;
  directionElement: string;
  baziHexagramInsight: BaziHexagramInsight;
  recommendation: string;
}

export function buildInterpretationReport(input: InterpretationInput): InterpretationReport {
  const direction = getDirectionFromBearing(input.homeFacingBearing);
  const directionElement = getFengShuiElementForDirection(direction);
  const baziHexagramInsight = combineBaziAndHexagram(input.bazi, input.hexagram, input.year);

  const recommendation =
    baziHexagramInsight.alignment === 'high' &&
    input.bazi.favorableElements.includes(directionElement)
      ? 'Proceed with high-priority decisions; timing and spatial qi are supportive.'
      : baziHexagramInsight.alignment === 'low'
        ? 'Adopt a conservative strategy and avoid irreversible commitments this cycle.'
        : 'Move forward incrementally while reinforcing supportive elemental conditions.';

  return {
    direction,
    directionElement,
    baziHexagramInsight,
    recommendation,
  };
}
