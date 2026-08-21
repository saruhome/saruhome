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

## 2026-08-21: Portfolio-First Arcade Recomposition

### Audit Findings

The live lobby correctly communicates the Designer/Dancer dual path, but its start overlay and four-step tutorial create two consecutive attention gates before visitors can evaluate work. The active-role arrival animation can also compete with the lower role copy. In the Archive, the wide viewport has a workable vertical order, but its direct list is visually subordinate to the game world, while the compact mobile state requires a stronger reserved lane for the touch dock and lower utility rail. The supplied achievement screenshot additionally confirmed that transient feedback must never participate in world positioning.

### Implementation Contract

1. **One-entry orientation.** The start card will state the portfolio quest in one sentence and expose a true direct-project action. Detailed controls move to the contextual Help surface rather than blocking role selection.
2. **Five deterministic Archive lanes.** HUD, title/portfolio context, project rail, character-plus-dialogue, and touch/utility controls will use distinct vertical zones. Project cards will be the first visual object after the title; dialogue remains tied to the character and does not cover a card.
3. **Portfolio-first direct access.** Both Skip and Quick Menu will offer ordered, plain-language project destinations. Progress will be labelled as an exploration status rather than compete with primary actions.
4. **Responsive role safety.** Desktop role previews may move inward, but mobile avatars retain a dedicated sprite lane separate from the role title and CTA. Every important touch target remains at least 44px tall.
5. **Bilingual interaction model.** The existing language state will also control character dialogue. EN, KR, and DE copy will preserve the Designer’s calm observational tone and the Dancer’s energetic voice.
6. **Exhibition contrast.** Case Study remains a dark command shell around a high-luminance project display, with project images, captions, and evidence panels held above the decorative game layer.
