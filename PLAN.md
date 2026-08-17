# Pixel Archive Navigation Plan

## Objective

Transform the entire portfolio into an original 16-bit pixel-game experience. The selected role becomes a corresponding pixel avatar and can move between signpost-style project or media destinations before opening the selected content.

## Scope

The existing `SideScrollSelect` component remains the navigation engine. The lobby, archives, project-detail shell, fixed controls, and content frames use pixel environments and hard-edge HUD components. Project case studies, video lightboxes, and translated content remain their existing destinations, but their chrome is converted from modern cards to pixel-console framing.

## Verification criteria

- Choosing Player 01 enters a cyan archive with the designer pixel avatar.
- Choosing Player 02 enters an orange archive with the dancer pixel avatar.
- Arrow keys move the avatar; Up jumps; Down crouches; Enter selects the nearest signpost.
- The signpost map opens design projects, video activities, About, and Contact destinations as already defined.
- The stage has a visible original arcade-style environment and readable player feedback.
- The lobby contains no real portraits or photography-led panels.
- Desktop and mobile UI controls, panels, and case-study shells share the same pixel border, type, and shadow language.

## Risk slices

1. Keep keyboard event cleanup and animation-frame disposal correct.
2. Keep generated assets external to the source tree and use stable Manus storage paths.
3. Preserve existing route callbacks so no project, video, or translated content becomes inaccessible.
4. Keep text readable while replacing conventional card and panel surfaces.
