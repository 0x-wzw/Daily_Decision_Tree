export type Element = "Wood" | "Fire" | "Earth" | "Metal" | "Water";

export type ElementScoreMap = Record<Element, number>;

export type RankedElement = {
  element: Element;
  score: number;
};

export type ReportCard = {
  id: string;
  title: string;
  why: string;
  whatToDo: string[];
  tags: string[];
  severity: "low" | "med" | "high";
};

export type InterpretationReport = {
  summary: string[];
  dominant: RankedElement[];
  weakest: RankedElement[];
  balanceIndex: number;
  cards: ReportCard[];
  notes: string[];
};
