# Visual Verification Notes

## 2026-08-17 — Character Lobby Pixel Motion

Desktop lobby verification confirmed that the previous CSS tablet and arm overlays are no longer present. Both hover states now load role-specific GIF files assembled from the existing chibi pixel-sprite frames: `designer-arcade-pixel-loop_be985bda.gif` and `dancer-arcade-pixel-loop_ee9766f6.gif`. The characters retain a full-body chibi pixel silhouette, while cyan and orange arcade floor highlights remain beneath the corresponding character without crossing the title or HUD areas.

The first headless mobile capture was taken before remote image loading had settled and therefore showed only the floor highlights. A delayed mobile capture is required before accepting the responsive visual check.

The delayed 390×844 capture completed after the remote media loaded. It shows both original full-body chibi pixel sprites at their intended mobile scale, with a cyan designer floor highlight and orange dancer floor highlight. Neither character overlaps the mobile header, role title, support controls, or language control.

## 2026-08-17 — Archive Opposite Walk Frame

Both role sprite sheets already contain a full-body forward-stride walk frame in the top-right quadrant. The opposing stride can preserve the same pixel identity by horizontally flipping that exact frame: the forward/back leg and arm relationship reverses without introducing a vector overlay or a mismatched generated character.

The designer archive was opened and held in rightward keyboard movement. During the active loop, consecutive measurements alternated the sprite background from `200% 200%` (the original top-right forward-stride cell) to `100% 100%` (the new opposite-stride image), confirming that both physical pixel frames—not only CSS limb transforms—are used in the walk cycle.

## 2026-08-17 — Side Run Sheet Review

The first generated side-run sheets contain four side-profile positions, but they include an unacceptable green-key/noisy background and two stride phases are too visually similar. They are not accepted as the final GIF source. The replacement must preserve the 2×2 layout while making all four phase silhouettes distinct and cleanly isolated before conversion to GIF.

The lobby was rechecked after moving the cyan and orange floor bars upward and thinning them; each bar now sits directly beneath the matching chibi character's shoes. The designer archive then opened normally after the GIF source replacement.

The designer archive was tested during active rightward movement after replacing the walk image with the final GIF. The running character rendered as a right-facing full-body pixel side profile rather than the previous front-facing walk frame, and the archive exposed the uploaded `designer-side-run-loop_9ff2817f.gif` as the active media source. The movement input was then released and the character returned to idle.

The dancer archive was tested through the same movement path. During active movement it exposed `dancer-side-run-loop_236084fb.gif` and rendered the dancer as a side-view pixel runner with alternating arm and leg poses; releasing the input returned the character to the original idle sprite.

The final 390×844 lobby capture confirms the updated floor-highlight center aligns beneath each chibi's shoes: the cyan bar sits under the designer and the orange bar under the dancer. The reduced bar height keeps the effect close to the feet without overlapping the role copy or bottom controls.

## 2026-08-17 — Input Release to Idle

The designer archive was tested with a real ArrowRight keydown and keyup sequence. During the held input, the archive mounted the run GIF. Forty milliseconds after keyup, the run GIF was absent and the original designer idle sprite background was mounted, confirming that the character now returns to standing immediately when directional input ends.

While rightward movement was active, ArrowUp was triggered and the run GIF immediately unmounted. This verifies that the jump state overrides the running GIF rather than leaving the running animation active in mid-air.
