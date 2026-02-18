import type { InterpretationCard } from "./types";
import type { ElementVector } from "../bazi/element_scoring";

export function elementCards(v: ElementVector): InterpretationCard[] {
  const entries = Object.entries(v).sort((a, b) => (b[1] as number) - (a[1] as number));

  if (entries.length === 0) {
    return [];
  }

  const [topEl, topScore] = entries[0] as [string, number];
  const [lowEl, lowScore] = entries[entries.length - 1] as [string, number];

  const cards: InterpretationCard[] = [];

  // Dominant element card
  cards.push({
    id: `dominant-${topEl}`,
    title: `${topEl} is dominant`,
    why: `Your element score shows ${topEl} is comparatively strongest (${topScore.toFixed(2)}). This usually becomes your default operating mode under stress.`,
    whatToDo: dominantPlaybook(topEl),
    tags: ["elements", "strength"],
    severity: "med",
  });

  // Weakest element card
  cards.push({
    id: `weakest-${lowEl}`,
    title: `${lowEl} is under-supplied`,
    why: `${lowEl} is your lowest score (${lowScore.toFixed(2)}). This can show up as a “blind spot” (energy, skills, habits, environment) depending on your life context.`,
    whatToDo: weakestPlaybook(lowEl),
    tags: ["elements", "gap"],
    severity: "high",
  });

  // Over-imbalance warning
  const ratio = topScore / Math.max(lowScore, 0.0001);
  if (ratio >= 1.8) {
    cards.push({
      id: `imbalance-${topEl}-${lowEl}`,
      title: `High imbalance: ${topEl} outweighs ${lowEl}`,
      why: `Your strongest element is ~${ratio.toFixed(1)}× your weakest. This often creates swings: bursts of action followed by recovery, or strong conviction but weaker follow-through systems.`,
      whatToDo: [
        "Design constraints: routines, checklists, time-boxing.",
        "Add the missing-element habits 3×/week for 6 weeks.",
        "Track fatigue and decision quality; adjust workload.",
      ],
      tags: ["elements", "risk"],
      severity: "high",
    });
  }

  return cards;
}

function dominantPlaybook(el: string): string[] {
  switch (el) {
    case "Fire":
      return [
        "Lean into visibility: publish, pitch, present weekly.",
        "Add recovery boundaries: stop-time, sleep, cooldown walks.",
        "Turn inspiration into process: weekly review + KPI scoreboard.",
      ];
    case "Water":
      return [
        "Use research as leverage, not procrastination: set decision deadlines.",
        "Build optionality: 2–3 parallel paths with small bets.",
        "Protect deep work blocks; reduce reactive messaging.",
      ];
    case "Wood":
      return [
        "Channel growth into focus: pick 1–2 bets per quarter.",
        "Invest in learning loops and mentorship.",
        "Avoid over-expansion: define a ‘no list’.",
      ];
    case "Metal":
      return [
        "Codify standards: SOPs, templates, governance.",
        "Watch rigidity: schedule creativity/experiments.",
        "Delegate execution; keep yourself at strategy + quality.",
      ];
    case "Earth":
      return [
        "Build stability: ops cadence, cashflow discipline, stakeholder alignment.",
        "Beware stagnation: ship small changes weekly.",
        "Create clear boundaries—don’t become the “dumping ground.”",
      ];
    default:
      return ["Turn your strength into a repeatable system."];
  }
}

function weakestPlaybook(el: string): string[] {
  switch (el) {
    case "Fire":
      return [
        "Increase outward momentum: 1 public output per week.",
        "Train courage reps: small asks, small pitches, daily.",
        "Sunlight + movement: 20 minutes daily to lift energy.",
      ];
    case "Water":
      return [
        "Add reflection time: journaling 10 minutes/day.",
        "Improve information flow: weekly reading + synthesis.",
        "Reduce chaos: batch comms, stop context switching.",
      ];
    case "Wood":
      return [
        "Build growth structures: courses, coaching, skill plans.",
        "Make time for ideation: 2 hours/week uninterrupted.",
        "Add ‘start’ energy: ship prototypes, not perfect plans.",
      ];
    case "Metal":
      return [
        "Add structure: SOPs, checklists, clear definitions.",
        "Cut noise: delete/automate low-value tasks.",
        "Track quality metrics weekly.",
      ];
    case "Earth":
      return [
        "Stabilize basics: budgeting, routines, consistent sleep.",
        "Strengthen support network: 2 meaningful touchpoints/week.",
        "Avoid over-commitment; say no earlier.",
      ];
    default:
      return ["Strengthen the weakest element via habits + environment."];
  }
}
