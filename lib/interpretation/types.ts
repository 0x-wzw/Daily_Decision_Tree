export type Severity = "low" | "med" | "high";

export interface InterpretationCard {
  id: string;
  title: string;
  why: string;
  whatToDo: string[];
  tags: string[];
  severity: Severity;
}
