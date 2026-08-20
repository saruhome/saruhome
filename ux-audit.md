# Product UX Audit — Working Notes

## 2026-08-20: Lobby and Direct Access

The split-role lobby communicates the two portfolio paths immediately and retains a direct access route through Quick Menu. The project skip panel successfully provides a non-game path, which is important for evaluators who need to reach work quickly.

The audit will retain the dual-path pixel game concept while prioritizing a clearer hierarchy between the role choice, direct project access, and utility controls. In the next pass, the interaction labels and grouping will be reduced to the minimum needed for first-visit comprehension, and persistent state feedback will be made more discoverable without competing with the project content.

## 2026-08-20: Archive and Case Study

The archive makes projects tactile and presents a consistent selected state, but its HUD and collectible signals compete with the portfolio task on first view. The Case Study has a strong contrast model: dark console shell outside a bright project exhibition field. However, its technical/game labels repeat at the same hierarchy as the project narrative and the viewer has no concise orientation cue such as reading time, case-study map, or explicit link back to the next project.

Priority improvements: simplify non-essential archive UI at rest; make the first project and the direct list visibly primary; add a compact, accessible case-study progress/navigation system; and strengthen focus behavior and motion preferences without weakening the pixel language.

## Chosen Implementation Scope

1. **Reduce cognitive friction, not game identity.** Keep the archive world, character movement, sound, collectibles, and Player 01/02 concept. Make the project path visually and semantically primary through clear navigation status and stronger action labels.
2. **Make case studies orientable.** Replace dots-only navigation with a compact labeled progress rail, an accessible live status, and clearer next/previous affordances. On mobile, preserve the long-form reading flow rather than introducing horizontal traps.
3. **Raise the accessibility floor.** Add robust focus-visible treatment, respect reduced-motion preferences, enlarge crucial compact controls to a 44px minimum where practical, and ensure global keyboard navigation does not hijack typing or interactive controls.
4. **Preserve quiet utility areas.** Keep the agreed bottom menu order and do not reintroduce a top-right Quick Menu. Utility controls must recede visually from project content.

5. **Use device-neutral action language.** Where an action works with pointer, keyboard, and touch input, prefer an outcome-oriented label such as `Enter Archive` over desktop-only terms such as `Click`.
