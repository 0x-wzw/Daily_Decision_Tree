export type Severity = "low" | "med" | "high";

export type InterpretationCard = {
  id: string;
  title: string;
  why: string;
  whatToDo: string[];
  tags: string[];
  severity: Severity;
};

export type InterpretationReport = {
  summary: string[];
  dominant: { element: string; score: number }[];
  weakest: { element: string; score: number }[];
  balanceIndex: number; // 0..100
  cards: InterpretationCard[];
  notes: string[];
};
