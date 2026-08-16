# Pixel Archive Navigation Plan

## Objective

Transform each selected portfolio path into an original side-scrolling arcade archive. The selected role becomes a corresponding pixel avatar and can move between signpost-style project or media destinations before opening the selected content.

## Scope

The existing `SideScrollSelect` component remains the navigation engine. This iteration strengthens the visual world, replaces the abstract block avatar with role-specific pixel artwork, and adds an arcade HUD and interaction cues. Project case studies, video lightboxes, and translated content remain their existing destinations.

## Verification criteria

- Choosing Player 01 enters a cyan archive with the designer pixel avatar.
- Choosing Player 02 enters an orange archive with the dancer pixel avatar.
- Arrow keys move the avatar; Up jumps; Down crouches; Enter selects the nearest signpost.
- The signpost map opens design projects, video activities, About, and Contact destinations as already defined.
- The stage has a visible original arcade-style environment and readable player feedback.

## Risk slices

1. Keep keyboard event cleanup and animation-frame disposal correct.
2. Keep generated assets external to the source tree and use stable Manus storage paths.
3. Preserve existing route callbacks so no project, video, or translated content becomes inaccessible.
