import { FiveElement } from "../bazi/element_scoring";

const SUPPORT_SUGGESTIONS: Record<FiveElement, string[]> = {
  Wood: ["Invest in learning and long-term planning.", "Spend time in growth-oriented activities."],
  Fire: ["Take visible action and communicate clearly.", "Use momentum but avoid impulsive overreach."],
  Earth: ["Build routines and consistency.", "Focus on reliability and practical execution."],
  Metal: ["Refine systems and boundaries.", "Prioritize precision, contracts, and standards."],
  Water: ["Research deeply before decisions.", "Allow reflection and strategic flexibility."],
};

export function suggestionsForWeakElement(element: FiveElement): string[] {
  return SUPPORT_SUGGESTIONS[element];
}
