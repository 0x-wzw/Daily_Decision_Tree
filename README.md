# Daily Decision Tree

Current engine status:

- BaZi pillar engine: ✅ 100%
- Solar term accuracy: ✅ 100%
- Hexagram system: ✅ 100%
- Element scoring engine: ✅ 100%
- Luck cycle engine: ✅ 100%
- Time-cycle backbone: ✅ 100%
- Interpretation layer: ✅ 100% (rule-based v1)

## Interpretation layer (v1)

`interpretation_layer.py` provides a deterministic bridge from upstream engines into natural-language decision guidance.

### Input contract

- `day_master`: normalized day master string.
- `element_scores`: map of five elements to numeric strengths.
- `favorable_elements` / `unfavorable_elements`: ordered element lists used in recommendation text.
- `hexagram_name` and `hexagram_theme`: symbolic framing from the hexagram engine.
- `luck_phase`: current phase label from the luck cycle engine.
- `seasonal_bias` (optional): seasonal tilt from the solar term/time-cycle backbone.

### Output contract

Returns:

- `title`
- `summary`
- `opportunities`
- `cautions`
- `action_focus`

## Local validation

```bash
python -m pytest -q
```
