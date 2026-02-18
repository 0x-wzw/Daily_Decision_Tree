from interpretation_layer import InterpretationInput, interpret


def test_interpretation_happy_path():
    payload = InterpretationInput(
        day_master="Yang Wood",
        element_scores={"wood": 8.0, "fire": 6.0, "earth": 4.0, "metal": 3.0, "water": 5.0},
        favorable_elements=["water", "wood"],
        unfavorable_elements=["metal"],
        hexagram_name="䷂ Zhun",
        hexagram_theme="Initial difficulty that benefits from disciplined beginnings",
        luck_phase="Growth",
        seasonal_bias="Spring support",
    )

    result = interpret(payload)

    assert "Zhun" in result.title
    assert "Day Master: Yang Wood." in result.summary
    assert any("water, wood" in item for item in result.opportunities)


def test_interpretation_rejects_invalid_element_name():
    payload = InterpretationInput(
        day_master="Yin Fire",
        element_scores={"aether": 10.0},
        favorable_elements=["wood"],
        unfavorable_elements=["water"],
        hexagram_name="䷀ Qian",
        hexagram_theme="Creative force",
        luck_phase="Peak",
    )

    try:
        interpret(payload)
        assert False, "Expected ValueError"
    except ValueError as exc:
        assert "Invalid elements" in str(exc)
