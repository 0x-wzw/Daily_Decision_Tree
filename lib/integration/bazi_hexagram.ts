import { getLiuNianYear } from '../cycles/liunian';

export interface BaziProfile {
  dayMaster: string;
  favorableElements: string[];
  unfavorableElements: string[];
}

export interface HexagramProfile {
  number: number;
  name: string;
  upperTrigram: string;
  lowerTrigram: string;
  element: string;
}

export interface BaziHexagramInsight {
  year: number;
  yearPillar: string;
  supportScore: number;
  alignment: 'high' | 'moderate' | 'low';
  rationale: string[];
}

export function combineBaziAndHexagram(
  bazi: BaziProfile,
  hexagram: HexagramProfile,
  year: number,
): BaziHexagramInsight {
  const liuNian = getLiuNianYear(year);
  let score = 0;
  const rationale: string[] = [];

  if (bazi.favorableElements.includes(hexagram.element)) {
    score += 40;
    rationale.push(`Hexagram element (${hexagram.element}) supports the favorable element set.`);
  }

  if (bazi.unfavorableElements.includes(hexagram.element)) {
    score -= 30;
    rationale.push(`Hexagram element (${hexagram.element}) appears in the unfavorable element set.`);
  }

  if (hexagram.upperTrigram === hexagram.lowerTrigram) {
    score += 15;
    rationale.push('Matching upper/lower trigram indicates stable thematic expression.');
  }

  if (liuNian.stem.startsWith(bazi.dayMaster[0])) {
    score += 10;
    rationale.push(`LiuNian stem (${liuNian.stem}) resonates with Day Master initials.`);
  }

  const normalized = Math.max(0, Math.min(100, score + 50));
  const alignment: BaziHexagramInsight['alignment'] =
    normalized >= 75 ? 'high' : normalized >= 45 ? 'moderate' : 'low';

  return {
    year,
    yearPillar: liuNian.pillar,
    supportScore: normalized,
    alignment,
    rationale,
  };
}
