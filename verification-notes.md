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
