import type { ElementVector } from "@/lib/bazi/element_scoring";

export type Severity = "low" | "med" | "high";

export type InterpretationCard = {
  id: string;
  title: string;
  severity: Severity;
  why: string;
  whatToDo: string[];
  tags: string[];
};

export type InterpretationReport = {
  elementVector: ElementVector;
  normalized: ElementVector;
  balanceIndex: number;
  cards: InterpretationCard[];
  notes: string[];
};
