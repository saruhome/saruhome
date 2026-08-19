# Visual Verification Notes

## 2026-08-19 — Reference Walk Cycle Review

`WalkCycle_01c.png` is a 420×105px, four-step horizontal strip. Its relevant motion principle is the readable alternation of an extended stride and a passing step, with the forward leg always counterbalanced by the opposite arm. The existing Designer 2×2 run sheet already contains four full-body side-profile poses that match this rhythm: two opposite extended strides plus two passing/high-knee positions. The rebuilt archive animation will normalize all four into a shared transparent canvas and play them in a clear `stride A → pass A → stride B → pass B` loop without a floor bar beneath the feet.

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

## 2026-08-18 — Archive Spawn and Left-Guide Alignment

Both archives now use a shared 32px desktop left guide, the same guide used by the `BACK TO SELECT` HUD. The first project centre is x=160 for both Designer and Dancer, while the 256px chibi player begins at x=32 and therefore centres at x=160. Browser measurements confirm the exact match in both archives: Back left edge x=32, character left edge x=32, first project centre x=160, and character centre x=160.

## 2026-08-18 — Dancer Leftward Motion and Wall Collision

The Dancer hover GIF now contains five left-facing frames at the Designer-matched 940ms cadence. The single full V pose uses an enlarged 960px safe canvas and retains every fingertip; the problematic source pose is excluded from the loop. In the Dancer archive, ArrowLeft at the minimum boundary mounts both the Orange left-wall impact emitter and the transparent falling-frame asset together; the live DOM confirmed both are present during the 720ms collision state before returning to idle.

## 2026-08-18 — Selected Role Full-Screen Cover

When a role is confirmed, the selected lobby panel removes its diagonal clipping and expands to the full screen while the unselected panel collapses to zero space. The resulting archive wrapper, stage section, world background, gradient, and scanline layers all report the exact viewport dimensions (1280×1100 in desktop verification), confirming no exposed split-panel or body-background edge remains after Dancer selection.

## 2026-08-18 — Archive Crouch Input

In both archives, pressing ArrowDown selects the bottom-left source pose at background position `0% 100%`. The render transform remains uniform (`matrix(1,0,0,1,0,0)` for Designer; a facing-only `matrix(-1,0,0,1,0,0)` for Dancer), confirming the frame itself—not vertical scale compression—creates the crouch. Releasing ArrowDown restores the regular idle state.

## 2026-08-18 — Lobby GIF Cleanup and Directional Trail

The current Designer hover source is the cleaned five-frame GIF, with its exterior red/purple edge pixels removed while the hair, cyan streak, face, glasses, jacket, and full-body silhouette remain intact. The desktop hover render reports the intended 1.5× transform, and the Designer’s cyan speed lines now use a left-anchored, mirrored trajectory so the effect comes from behind the left-to-right arrival rather than borrowing the Dancer’s direction.

## 2026-08-19 — Dedicated Crouch and Butt-Sit Frames

The previous jump-sprite reuse has been removed. Designer and Dancer now load separate PNG assets for ArrowDown crouch and maximum-boundary seated stumble. Browser checks confirmed `designer-crouch_ff8e0f7d.png` and `dancer-crouch_5e4d23c2.png` are used for ArrowDown, while boundary collisions use `designer-wall-sit_042877db.png` and `dancer-wall-sit_e2918a65.png`. These are distinct assembled pixel poses, preserving the source chibi proportions without the former airborne jump silhouette.

## 2026-08-19 — FH Joanneum Application Upgrade

Desktop verification confirms that the lobby keeps the split Cyan/Orange player-select world while adding a hard-edged `QUICK MENU`. Its menu exposes `SKIP TO PROJECTS` and direct Player 01/Player 02 archive access without triggering the role-selection game animation. The selected Designer archive retains its character, signposts, fixed sound/language HUDs, and `SKIP TO PROJECTS` control; the archive menu directly lists SokDak, Locaverse GmbH, Smart Wash, Campy, Seek and Sight, and About.

The Campy Quick Menu destination opened the new pixel command-console case-study shell directly. The first slide presents Project Overview, My Role, Project type, Timeline, and a verified Behance link; the subsequent visible route contains The Challenge, Research & Insights, IA → Wireframes → High-fidelity → Prototype → Testing, Key Features & Interactions, Results & Impact, and Tools. The next-slide control rendered the Research & Insights layout correctly. The Language HUD was added to the case study and verified through EN → KR → DE: labels, Overview copy, challenge, research, process, interaction, impact, and project button text all switched with the same console layout.

## 2026-08-19 — Arcade Exploration, Feedback, and Onboarding

On the refreshed Designer archive, the first signpost now shows a role-coloured down arrow, bright near-state, and Designer dialogue while the player is in selection radius. The HUD shows `PROJECTS EXPLORED 0/6`, the shared collectible counter, a trophy button, `SKIP TO PROJECTS`, ambient dust, a distant moving silhouette, and three distinct hidden collectible glyphs. Selecting SokDak reached the new case-study route through the automatic selection path, where a project data-chip collectible is mounted in the Overview.

The first-visit overlay visibly blocks the lobby with `PRESS ANY KEY TO START // PORTFOLIO QUEST`. After click-through, a German-language four-step pixel tutorial rendered and advanced correctly through ArrowRight, ArrowUp, ArrowDown, and Enter; its final Enter interaction removed the tutorial. This confirms the first-run game onboarding, keyboard progression, and recurrence-friendly local state hand-off without covering the existing Quick Menu on normal visits.

## 2026-08-19 — Role Achievement Icons and Any-Key Entry

The start overlay now listens in the capture phase on `window` and on its focused button, so any physical key advances the first-visit screen before other lobby interactions consume it. The Designer achievement panel rendered a Cyan pixel interface/cursor module for its `DESIGNER BADGES`; the Dancer panel rendered a distinct Orange equalizer-and-rhythm-disc module for `DANCER BADGES`. Both header and every locked/unlocked achievement row retain role-specific silhouette, palette, and reduced opacity for locked states.

## 2026-08-19 — Neutral Onboarding HUD

The initial `PRESS ANY KEY` view now uses only black, white, and grey: a neutral dark backdrop, white hard-edge border, pale-grey secondary line, and the same compact HUD contrast as the Sound control. The tutorial prompt uses the matching neutral border and heading instead of Cyan or Orange. After resetting first-visit storage, a real `a` key input dismissed the overlay immediately and displayed the neutral Tutorial 1/4 card while Designer and Dancer retained their respective Cyan and Orange lobby worlds.

## 2026-08-19 — Centered Tutorial and Default Pixel Speech Bubble

On desktop, all four tutorial steps now occupy the viewport midpoint rather than the lower third; the central card retains its neutral HUD styling and leaves both player titles and bottom controls visible. In the Designer archive, the dialogue moved into a dedicated safety zone above the signpost row with enough vertical separation from the SokDak title and subtitle. It now renders as a white, black-outlined, hard-shadowed default dot-game speech bubble with a black pixel tail and white inner tail, rather than a role-coloured HUD panel.

## 2026-08-19 — Character-Head Dialogue Anchor

The dialogue anchor now compensates for the chibi sprite's transparent top margin, placing its pixel tail immediately above the actual head silhouette instead of using the signpost as a reference. The Designer and Dancer archives both keep the white dot speech bubble horizontally centred on the character while the character moves through the archive.

## 2026-08-19 — Tutorial Input Isolation

The tutorial is now a modal input layer. Its capture-phase keyboard listener prevents propagation and default browser/game handling before it advances its own step. After resetting first-visit state, the initial `a` opened Tutorial 1/4 without selecting either role, and ArrowRight advanced only to Tutorial 2/4 while both Cyan and Orange player panels remained in their neutral lobby state. The modal also intercepts pointer input, preventing background role and Quick Menu activation until the final tutorial confirmation closes it.

## 2026-08-19 — ESC Tutorial Skip

The Tutorial 1/4 modal displays the current-language skip cue in its upper-right corner. In the German locale, `ESC drücken zum Überspringen` rendered above the modal. Pressing Escape dismissed the tutorial instantly from the first step and returned to the neutral, unselected player lobby without triggering any role, Quick Menu, or archive action.

## 2026-08-19 — Mobile Tutorial X Close

The tutorial modal now presents a 40px square, keyboard-accessible X button alongside the existing upper-right ESC cue. It uses the same neutral hard-edge HUD appearance. In the first-visit flow, activating the X button closed Tutorial 1/4 immediately and returned only to the unselected lobby, confirming the touch equivalent of ESC does not select a player or activate the Quick Menu.
