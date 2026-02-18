import type { ElementVector } from "@/lib/bazi/element_scoring";
import type { InterpretationCard } from "@/lib/interpretation/types";
import { bottomN, topN } from "@/lib/interpretation/scoring";

const cnLabel = (element: keyof ElementVector): string => {
  const map: Record<keyof ElementVector, string> = {
    Wood: "木",
    Fire: "火",
    Earth: "土",
    Metal: "金",
    Water: "水",
  };
  return map[element];
};

export const dominantPlaybook = (element: keyof ElementVector): string[] => {
  const base: Record<keyof ElementVector, string[]> = {
    Wood: [
      "Set strict weekly priorities to avoid over-expansion.",
      "Use short execution sprints before opening new projects.",
      "Build in recovery blocks to prevent decision fatigue.",
    ],
    Fire: [
      "Pair major decisions with a cooling-off checkpoint.",
      "Favor written plans to stabilize emotional momentum.",
      "Balance social exposure with solo deep-work windows.",
    ],
    Earth: [
      "Audit routines monthly to avoid stagnation.",
      "Delegate low-impact obligations and keep core commitments.",
      "Introduce one growth experiment per week.",
    ],
    Metal: [
      "Use “good-enough” thresholds to reduce perfection loops.",
      "Schedule brainstorming before evaluation.",
      "Practice flexibility by testing alternate approaches.",
    ],
    Water: [
      "Convert ideas into one concrete action every day.",
      "Use accountability check-ins to maintain momentum.",
      "Avoid over-analysis by setting clear decision deadlines.",
    ],
  };

  return base[element];
};

export const weakestPlaybook = (element: keyof ElementVector): string[] => {
  const base: Record<keyof ElementVector, string[]> = {
    Wood: [
      "Do mobility or nature-based activity to boost growth energy.",
      "Break long goals into visible milestones.",
      "Practice saying yes to one strategic opportunity each week.",
    ],
    Fire: [
      "Increase warm social interactions and expressive activities.",
      "Use quick wins to build confidence momentum.",
      "Present your ideas aloud before finalizing choices.",
    ],
    Earth: [
      "Create consistent sleep, meal, and work anchors.",
      "Use checklists to stabilize execution quality.",
      "Revisit long-term commitments before taking on new tasks.",
    ],
    Metal: [
      "Define decision criteria in writing before acting.",
      "Declutter one physical/digital area weekly.",
      "Review outcomes and extract a clear lesson loop.",
    ],
    Water: [
      "Add reflection windows for strategic thinking.",
      "Stay hydrated and protect deep-rest periods.",
      "Track signal patterns from past decisions to guide timing.",
    ],
  };

  return base[element];
};

export const elementCards = (vector: ElementVector): InterpretationCard[] => {
  const strongest = topN(vector, 1)[0];
  const weakest = bottomN(vector, 1)[0];
  const cards: InterpretationCard[] = [];

  if (strongest) {
    cards.push({
      id: "dominant-element",
      title: `Dominant element: ${strongest.element} (${cnLabel(strongest.element)})`,
      severity: "med",
      why: `${strongest.element} is currently the strongest influence in your profile, shaping your default response style and pacing.`,
      whatToDo: dominantPlaybook(strongest.element),
      tags: ["dominant", strongest.element, "strategy"],
    });
  }

  if (weakest) {
    cards.push({
      id: "weakest-element",
      title: `Weakest element: ${weakest.element} (${cnLabel(weakest.element)})`,
      severity: "med",
      why: `${weakest.element} appears underrepresented and may become a blind spot in decision quality under stress.`,
      whatToDo: weakestPlaybook(weakest.element),
      tags: ["weakness", weakest.element, "stability"],
    });
  }

  if (strongest && weakest) {
    const safeWeakest = Math.max(weakest.value, 0.0001);
    const ratio = strongest.value / safeWeakest;
    if (ratio >= 1.8) {
      cards.push({
        id: "imbalance-ratio",
        title: `Element imbalance ratio ${ratio.toFixed(2)}x`,
        severity: ratio >= 2.2 ? "high" : "med",
        why: "A larger spread between strongest and weakest elements can increase bias and reduce flexibility in high-pressure choices.",
        whatToDo: [
          "Use a 2-step decision rule: intuition first, verification second.",
          "When timing major decisions, prioritize periods with steadier routines.",
          "Add a counter-style advisor (different mindset) for critical calls.",
        ],
        tags: ["imbalance", "risk-control", "timing"],
      });
    }
  }

  return cards;
};
