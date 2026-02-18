export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export type HeavenlyStem =
  | 'jia'
  | 'yi'
  | 'bing'
  | 'ding'
  | 'wu'
  | 'ji'
  | 'geng'
  | 'xin'
  | 'ren'
  | 'gui';

export type EarthlyBranch =
  | 'zi'
  | 'chou'
  | 'yin'
  | 'mao'
  | 'chen'
  | 'si'
  | 'wu'
  | 'wei'
  | 'shen'
  | 'you'
  | 'xu'
  | 'hai';

export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
}

export interface ElementScore {
  raw: number;
  normalized: number;
}

export type ElementScores = Record<Element, ElementScore>;

const STEM_ELEMENT: Record<HeavenlyStem, Element> = {
  jia: 'wood',
  yi: 'wood',
  bing: 'fire',
  ding: 'fire',
  wu: 'earth',
  ji: 'earth',
  geng: 'metal',
  xin: 'metal',
  ren: 'water',
  gui: 'water',
};

const BRANCH_PRIMARY_ELEMENT: Record<EarthlyBranch, Element> = {
  zi: 'water',
  chou: 'earth',
  yin: 'wood',
  mao: 'wood',
  chen: 'earth',
  si: 'fire',
  wu: 'fire',
  wei: 'earth',
  shen: 'metal',
  you: 'metal',
  xu: 'earth',
  hai: 'water',
};

export interface ScoreOptions {
  stemWeight?: number;
  branchWeight?: number;
  decimals?: number;
}

const ELEMENTS: Element[] = ['wood', 'fire', 'earth', 'metal', 'water'];

export function scoreElements(
  pillars: Pillar[],
  options: ScoreOptions = {},
): ElementScores {
  const stemWeight = options.stemWeight ?? 1;
  const branchWeight = options.branchWeight ?? 1;
  const decimals = options.decimals ?? 4;

  const rawScores: Record<Element, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  for (const pillar of pillars) {
    rawScores[STEM_ELEMENT[pillar.stem]] += stemWeight;
    rawScores[BRANCH_PRIMARY_ELEMENT[pillar.branch]] += branchWeight;
  }

  const total = ELEMENTS.reduce((sum, element) => sum + rawScores[element], 0);
  const out = {} as ElementScores;

  for (const element of ELEMENTS) {
    const normalized = total === 0 ? 0 : rawScores[element] / total;
    out[element] = {
      raw: rawScores[element],
      normalized: Number(normalized.toFixed(decimals)),
    };
  }

  return out;
}

export function strongestElements(scores: ElementScores): Element[] {
  const highest = Math.max(...ELEMENTS.map((element) => scores[element].raw));
  return ELEMENTS.filter((element) => scores[element].raw === highest);
}

export function weakestElements(scores: ElementScores): Element[] {
  const lowest = Math.min(...ELEMENTS.map((element) => scores[element].raw));
  return ELEMENTS.filter((element) => scores[element].raw === lowest);
}
