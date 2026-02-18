import type { ElementScoreMap, ReportCard } from "./types";
import { topN, bottomN } from "./scoring";

export function elementCards(elements: ElementScoreMap): ReportCard[] {
  const dominant = topN(elements, 1)[0];
  const weak = bottomN(elements, 1)[0];

  const cards: ReportCard[] = [];

  if (dominant) {
    cards.push({
      id: `dominant-${dominant.element.toLowerCase()}`,
      title: `Strong ${dominant.element} influence`,
      why: `${dominant.element} is currently your highest-scoring element (${dominant.score.toFixed(2)}).`,
      whatToDo: [
        `Use ${dominant.element.toLowerCase()} strengths when planning your weekly priorities.`,
        "Avoid over-indexing on one pattern; keep one balancing habit in place.",
      ],
      tags: ["elements", "strength"],
      severity: "low",
    });
  }

  if (weak) {
    cards.push({
      id: `weak-${weak.element.toLowerCase()}`,
      title: `Support weaker ${weak.element}`,
      why: `${weak.element} is your lowest element score (${weak.score.toFixed(2)}), which may create blind spots over time.`,
      whatToDo: [
        `Choose one simple routine each week that reflects ${weak.element.toLowerCase()} qualities.`,
        "Review monthly and adjust gradually instead of making abrupt shifts.",
      ],
      tags: ["elements", "balance"],
      severity: "med",
    });
  }

  return cards;
}
