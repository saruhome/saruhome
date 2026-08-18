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

## 2026-08-17 — Chibi-Proportion Run GIF Review

Both rebuilt GIFs retain a deliberately large, rounded head and compact torso/limbs rather than the earlier elongated running silhouette. The designer preserves oversized glasses, navy hair, cyan jacket, and short body; the dancer preserves her large blonde-haired head, compact black-and-orange outfit, and short limbs. The GIF builder measured all adjacent frame pairs as visually distinct before export.

## 2026-08-17 — Dust Burst and Compact Run Verification

During a real ArrowRight press, the designer archive mounted the rebuilt compact-proportion GIF (`designer-side-run-loop_8043e6f7.gif`) together with a `pixel-dust-start` burst. On release, the run image unmounted, the idle sprite remounted, and a `pixel-dust-stop` burst rendered. This verifies the required movement start/stop particle timing and idle transition.

## 2026-08-17 — Full Pixel UI Conversion Checkpoint

The lobby now renders as a split cyan design lab and orange dance arena with no portrait photography; each chibi player remains visible against its role world. The first archive capture confirms its generated stage path is wired, but the stage is too dark under the existing opacity and overlay stack. Increase stage visibility before final acceptance so environment details are legible behind signposts without affecting HUD readability.

After lifting the environment layer opacity, the Designer archive shows its cyan blueprint workshop and floor details clearly behind the signposts. The Dancer archive independently renders its orange speaker-and-pipe battle venue with the chibi player, signposts, floor, and HUD remaining legible. Both primary archive routes now visually match the pixel game lobby rather than the former generic dark background.

The Dancer performance screen now replaces the former photo thumbnail surface with a square, orange equalizer-console panel and cartridge-like activity cards. The bottom-right language menu has been restyled as a hard-edged role-colour HUD: its active language and border use Player 02 orange here, with no blur treatment or rounded glass surface.

The Sokdak case-study overview was opened from the Player 01 archive. Its generated pixel command-console now appears as a visible cyan-and-magenta circuitry environment around the content panel, while the semi-opaque square data panel retains high reading contrast. This confirms the detailed project pages carry the same arcade-world language as the lobby and archives.

At 390×844, the lobby switches to its two-tier mobile composition: the cyan design lab occupies the upper half and the orange dance arena the lower half. Both large-head chibi characters, role labels, hover prompts, floor highlights, Sound, Support, and Language HUD controls are visible without overlap. The first immediate capture lacked remote assets, but the five-second capture confirmed normal media settling and the intended final layout.

Role-specific 390×844 archive captures confirm the same responsive discipline beyond the lobby. The cyan blueprint workshop and orange battle venue remain visible behind their respective active signpost and chibi character. Back navigation stays in the upper HUD zone, while the character position, language control, sound control, left/right movement, Jump, and Select tiles occupy distinct lower safe areas without collision.

The Designer archive now uses sharply clipped, hard-shadowed signpost faces with separated pixel metadata and striped anchor poles, matching the supplied reference’s visual language. The About screen restores the existing Sunghee Im profile image inside a cyan player-ID frame with scanlines, cut corners, status tags, and a grid overlay; the photo remains recognisable while its surrounding UI stays fully pixel-oriented.

The final archive composition removes the vertical signpost poles and moves desktop signposts into a dedicated upper lane. Direct DOM measurement in the Dancer archive confirms a 16px vertical gap between the active project signpost and the chibi character, with no overlapping rectangles. At 390×844, the Sound, Help, and Language controls now share one lower HUD row at the same 40px height; the mobile movement and Jump/Select controls are lifted into the row above, leaving no collisions. The idle lobby no longer renders a HOVER TO PREVIEW prompt.

Designer archive project names now remain fixed: their interaction no longer applies X-axis push, rotation, or active scaling, and the stack uses an exact Tailwind `gap-2` (8px) between the square project label and supporting text. The Designer About view places ABOUT ME and its square Back control in one header row, then continues through Skills into a fully integrated Contact section with square link cards, fields, and send control. Desktop visual inspection confirms the complete Contact block appears within the About scroll surface.

Existing dancer hover sheets were reviewed before the new jump asset: the prior 2×2 sheet contains sideways kick and pose variations, while the select-wave sheet contains static greeting gestures. Neither provides the requested vertical multi-pose jump sequence, so a dedicated four-pose jump sprite sheet is being generated for the lobby GIF.

The new six-frame dancer hover GIF is successfully requested from the lobby during hover, but the browser screenshot shows only the floor highlight rather than the dancer body. The visual issue is being corrected before release; the asset must display as a real multi-pose character loop rather than a loaded-but-invisible image.

After rebuilding the GIF with a shared palette and explicit transparent index, the browser still requests the latest asset URL while the hover screenshot shows only the orange floor highlight. This isolates the remaining issue to visual compositing or GIF frame representation rather than routing; release is paused until the character is visibly rendered.

Directly opening the latest storage GIF confirms that its dancer frames exist, but the current disposal mode accumulates multiple poses and leaves a green palette fringe. The asset pipeline must preserve only the connected background as transparent and use non-accumulating frames before the GIF can replace the lobby character.

After preserving the dancer character core during background cleanup and placing the active Dancer avatar inside the expanded panel’s clipping-safe area, the desktop lobby visibly renders the multi-pose dancer GIF on hover. The displayed frame shows a distinct raised-arm movement and no X-axis wiggle; the GIF is now visibly distinct from the static idle sprite.

## 2026-08-18 — Central Hover Timing Revision

The regenerated dancer source GIF is a 640×900 full-body canvas: the dancer’s hair, hands, legs, and shoes all remain inside its bounds. Its five frame durations are now exactly `220, 160, 180, 220, 160ms` (940ms total), matching the designer GIF frame-for-frame. The desktop hover DOM requests the new storage asset and positions the active avatar from the viewport midpoint. The initial immediate capture retained the centered orange floor anchor but did not yet display the GIF body, so an additional settled-frame visual verification is required before release.

The revised desktop capture renders the active dancer as a complete visible silhouette at the viewport midpoint, outside both role panels and therefore outside their diagonal clip paths. Switching to the designer confirms the same midpoint anchor for Player 01. The central hover layer now sits below the role copy layer, preserving the readable PLAYER labels and titles while maintaining the requested centered character placement.

After the final stack-order refinement, the active designer GIF remains fully visible at the exact horizontal midpoint with the cyan floor highlight directly beneath it. The inactive role retains its own panel-local idle character, so the hover layer only ever shows one active player and no character is cropped by a role panel edge.

## 2026-08-18 — Slide-Synced Direct GIF Revision

The fixed global hover overlay has been removed. The active character now remains inside its expanding role panel and transitions its left/right offset with the same 500ms easing as the panel flex change, arriving at the viewport midpoint as the selected panel slides open. The dancer hover source is now a direct `IMG` element whose computed `animationName` is `none` and whose computed `transform` is `none`; the source GIF provides the only frame motion, with no added vertical bounce. During desktop dancer hover its measured centre X is exactly the viewport centre X.

The Designer hover path uses the same panel-local slide system. Its direct GIF image also reports `animationName: none`, `transform: none`, and an exact midpoint centre X after the panel transition. The obsolete `chibi-preview-jump` keyframes have been removed from the style layer so no dormant vertical bounce treatment can be applied to the Dancer path.

## 2026-08-18 — Dancer Frame Safe-Area Review

The dancer source sheet places the running and V poses close to their visual cell boundaries. The existing GIF crop used a narrow 630px window and a protective cleanup zone that excluded the extended right-hand and shoe regions from consistent background processing. The generated frame contact sheet confirms that the running and V frames have substantially less right-side safety margin than the idle frame. The rebuild will use wider per-pose source windows, a larger shared canvas, and a connected-background pass that preserves the complete purple-outlined silhouette.

The rebuilt GIF uses a 840×960 shared canvas and pose-specific crops up to 900px wide. Its final contact sheet confirms that the runner’s forward shoe and the V pose’s raised hand both remain inside the cyan frame boundary, with transparent safety room on their right edges. The matched 5-frame cadence remains 940ms total (`220, 160, 180, 220, 160ms`).

In the desktop dancer hover capture, the expanded orange bar flares beneath the character while the V frame appears with both raised arms and the right outline intact. The player image remains aligned at the centre boundary as the Dancer panel opens; the bar follows the identical left/right transition path rather than appearing as a fixed overlay.

Computed desktop hover styles confirm that the Dancer GIF and its orange bar both use `cubic-bezier(0.22, 1, 0.36, 1)` for `0.65s`. Their measured centre X values are both exactly the viewport centre, so the bar does not lag or detach while the panel slide is settling.

The Designer path was then checked with the same slide. Its cyan bar widens and brightens under the direct GIF at the central arrival point, while the Dancer retains the orange version. This verifies that the feedback is role-colour driven rather than a dancer-only treatment and that the bar follows each role’s directional slide.

## 2026-08-18 — Hover Timeline Effects

Hover now triggers the role sound at timeline start, the bar flare peak at the matching 375ms high-tone cue, and a final impact tone at the 650ms central arrival. A desktop Dancer inspection confirms three non-blurring pixel speed lines render during the slide and a five-particle orange landing-dust emitter is mounted after arrival. The bar animation has a 650ms duration, while the dust runs only 340ms, preserving a short landing accent rather than a persistent trail.
