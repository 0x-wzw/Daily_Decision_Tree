"""Rule-based interpretation layer for Daily Decision Tree outputs.

This module converts structured outputs from the completed engines
(BaZi pillars, hexagram analysis, element scoring, luck cycles, and
other time-cycle signals) into concise human-readable guidance.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Mapping, Optional

ELEMENTS = ("wood", "fire", "earth", "metal", "water")


@dataclass(frozen=True)
class InterpretationInput:
    """Normalized input expected from upstream engines."""

    day_master: str
    element_scores: Mapping[str, float]
    favorable_elements: List[str]
    unfavorable_elements: List[str]
    hexagram_name: str
    hexagram_theme: str
    luck_phase: str
    seasonal_bias: Optional[str] = None


@dataclass(frozen=True)
class InterpretationOutput:
    """Final interpretation payload for app/UI consumption."""

    title: str
    summary: str
    opportunities: List[str]
    cautions: List[str]
    action_focus: str


def _dominant_element(element_scores: Mapping[str, float]) -> str:
    if not element_scores:
        return "unknown"
    return max(element_scores, key=element_scores.get)


def _validate(input_data: InterpretationInput) -> None:
    if not input_data.day_master.strip():
        raise ValueError("day_master must not be empty")
    if not input_data.hexagram_name.strip():
        raise ValueError("hexagram_name must not be empty")
    if not input_data.hexagram_theme.strip():
        raise ValueError("hexagram_theme must not be empty")

    invalid_elements = [
        key for key in input_data.element_scores.keys() if key.lower() not in ELEMENTS
    ]
    if invalid_elements:
        raise ValueError(f"Invalid elements in scores: {', '.join(invalid_elements)}")


def interpret(input_data: InterpretationInput) -> InterpretationOutput:
    """Generate a structured interpretation from deterministic rules."""

    _validate(input_data)

    dominant = _dominant_element(input_data.element_scores)
    favorable = ", ".join(input_data.favorable_elements) or "none"
    unfavorable = ", ".join(input_data.unfavorable_elements) or "none"

    title = f"{input_data.hexagram_name} | {input_data.luck_phase} phase"

    summary_parts = [
        f"Day Master: {input_data.day_master}.",
        f"Dominant elemental tone: {dominant}.",
        f"Hexagram theme: {input_data.hexagram_theme}.",
        f"Supportive elements: {favorable}; draining elements: {unfavorable}.",
    ]
    if input_data.seasonal_bias:
        summary_parts.append(f"Seasonal bias: {input_data.seasonal_bias}.")
    summary = " ".join(summary_parts)

    opportunities = [
        f"Prioritize activities aligned with {favorable} qualities.",
        f"Use the '{input_data.hexagram_theme}' motif as a decision filter.",
        "Make high-leverage decisions early in the day when clarity is highest.",
    ]

    cautions = [
        f"Avoid overcommitting in contexts dominated by {unfavorable} dynamics.",
        "Do not force outcomes; follow sequence and timing signals from the cycle.",
    ]

    action_focus = (
        "Take one concrete step that strengthens your favorable element profile "
        "before initiating new commitments."
    )

    return InterpretationOutput(
        title=title,
        summary=summary,
        opportunities=opportunities,
        cautions=cautions,
        action_focus=action_focus,
    )


__all__ = [
    "InterpretationInput",
    "InterpretationOutput",
    "interpret",
]
