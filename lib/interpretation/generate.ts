import { InterpretationInput, InterpretationResult } from "./types";
import { getBalanceScore, getDominantAndWeakest } from "./scoring";
import { suggestionsForWeakElement } from "./rules";

export function generateInterpretation(input: InterpretationInput): InterpretationResult {
  const { dominantElement, weakestElement } = getDominantAndWeakest(input.elements);
  const balanceScore = getBalanceScore(input.elements);

  const summary = [
    input.question ? `Question focus: ${input.question}.` : "General energy reading.",
    `Dominant element is ${dominantElement}, while ${weakestElement} needs support.`,
    `Overall balance score: ${balanceScore}/100.`,
    input.hexagramIndex ? `Hexagram reference #${input.hexagramIndex} can be used as thematic context.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    dominantElement,
    weakestElement,
    balanceScore,
    summary,
    recommendations: suggestionsForWeakElement(weakestElement),
  };
}
