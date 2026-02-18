import { FiveElement } from "../bazi/element_scoring";

export interface InterpretationInput {
  question?: string;
  elements: Record<FiveElement, number>;
  hexagramIndex?: number;
}

export interface InterpretationResult {
  dominantElement: FiveElement;
  weakestElement: FiveElement;
  balanceScore: number;
  summary: string;
  recommendations: string[];
}
