import { Branch, Stem } from "./jiazi60";

export type FiveElement = "Wood" | "Fire" | "Earth" | "Metal" | "Water";

const STEM_ELEMENT: Record<Stem, FiveElement> = {
  Jia: "Wood", Yi: "Wood", Bing: "Fire", Ding: "Fire", Wu: "Earth", Ji: "Earth", Geng: "Metal", Xin: "Metal", Ren: "Water", Gui: "Water",
};

const HIDDEN_STEMS: Record<Branch, Array<{ stem: Stem; weight: number }>> = {
  Zi: [{ stem: "Gui", weight: 1 }],
  Chou: [{ stem: "Ji", weight: 0.6 }, { stem: "Gui", weight: 0.2 }, { stem: "Xin", weight: 0.2 }],
  Yin: [{ stem: "Jia", weight: 0.6 }, { stem: "Bing", weight: 0.2 }, { stem: "Wu", weight: 0.2 }],
  Mao: [{ stem: "Yi", weight: 1 }],
  Chen: [{ stem: "Wu", weight: 0.6 }, { stem: "Yi", weight: 0.2 }, { stem: "Gui", weight: 0.2 }],
  Si: [{ stem: "Bing", weight: 0.6 }, { stem: "Wu", weight: 0.2 }, { stem: "Geng", weight: 0.2 }],
  Wu: [{ stem: "Ding", weight: 0.7 }, { stem: "Ji", weight: 0.3 }],
  Wei: [{ stem: "Ji", weight: 0.6 }, { stem: "Yi", weight: 0.2 }, { stem: "Ding", weight: 0.2 }],
  Shen: [{ stem: "Geng", weight: 0.6 }, { stem: "Ren", weight: 0.2 }, { stem: "Wu", weight: 0.2 }],
  You: [{ stem: "Xin", weight: 1 }],
  Xu: [{ stem: "Wu", weight: 0.6 }, { stem: "Xin", weight: 0.2 }, { stem: "Ding", weight: 0.2 }],
  Hai: [{ stem: "Ren", weight: 0.7 }, { stem: "Jia", weight: 0.3 }],
};

const BASE_SCORES: Record<FiveElement, number> = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

export function scoreElements(stems: Stem[], branches: Branch[]): Record<FiveElement, number> {
  const scores = { ...BASE_SCORES };

  for (const stem of stems) {
    scores[STEM_ELEMENT[stem]] += 1;
  }

  for (const branch of branches) {
    for (const hidden of HIDDEN_STEMS[branch]) {
      scores[STEM_ELEMENT[hidden.stem]] += hidden.weight;
    }
  }

  return scores;
}
