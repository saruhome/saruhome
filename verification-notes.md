# Visual Verification Notes

## 2026-08-17 — Character Lobby Pixel Motion

Desktop lobby verification confirmed that the previous CSS tablet and arm overlays are no longer present. Both hover states now load role-specific GIF files assembled from the existing chibi pixel-sprite frames: `designer-arcade-pixel-loop_be985bda.gif` and `dancer-arcade-pixel-loop_ee9766f6.gif`. The characters retain a full-body chibi pixel silhouette, while cyan and orange arcade floor highlights remain beneath the corresponding character without crossing the title or HUD areas.

The first headless mobile capture was taken before remote image loading had settled and therefore showed only the floor highlights. A delayed mobile capture is required before accepting the responsive visual check.

The delayed 390×844 capture completed after the remote media loaded. It shows both original full-body chibi pixel sprites at their intended mobile scale, with a cyan designer floor highlight and orange dancer floor highlight. Neither character overlaps the mobile header, role title, support controls, or language control.
