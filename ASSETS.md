# Pixel Archive Assets

**Art direction:** An original premium 2D arcade archive with sharp square-pixel rendering, a clean side-view stage, an industrial interface corridor, and restrained neon color systems. Player 01 uses deep navy and cyan; Player 02 uses dark maroon and orange. The visual language evokes the *interaction pattern* of a 1990s side-scrolling arcade stage without reproducing any pre-existing game character, logo, HUD, environment, or enemy.

**Expanded direction:** The lobby, archives, content frames, fixed controls, and project-detail shell share the same hard-edge 16-bit environment. Photography is reserved for the Designer About profile inside a pixel player-ID frame; player identity elsewhere remains chibi sprites and role-specific game worlds.

| Asset | Use | Storage URL |
|---|---|---|
| Pixel archive reference | Visual QA target and style reference | `/manus-storage/portfolio-arcade-reference_17bb7219.png` |
| Designer pixel runner | Player 01 role-specific avatar | `/manus-storage/designer-pixel-runner_6b00f051.png` |
| Dancer pixel runner | Player 02 role-specific avatar | `/manus-storage/dancer-pixel-runner_e6499923.png` |
| Cyan archive stage | Shared side-scrolling level backdrop | `/manus-storage/portfolio-arcade-stage_9f866b47.png` |
| Designer chibi sprite sheet | Player 01 idle, walk, jump, celebrate frames | `/manus-storage/designer-chibi-sprite-sheet_011ed7b7.png` |
| Dancer chibi sprite sheet | Player 02 idle, walk, jump, celebrate frames | `/manus-storage/dancer-chibi-sprite-sheet_e9dd17a4.png` |
| Character-select arcade lobby | Game-lobby background for the initial selection screen | `/manus-storage/character-select-arcade-lobby_99fb11d2.png` |
| Designer portrait | Player 01 main lobby and bio portrait, migrated from local public assets | `/manus-storage/Gemini_Generated_Image_s30zdos30zdos30z_28271392_722495d2.png` |
| Designer archive loop | Player 01 focused 16-bit electronic background music | `/manus-storage/designer-archive-loop_da115ca8.mp3` |
| Dancer archive loop | Player 02 energetic arcade dance background music | `/manus-storage/dancer-archive-loop_084713db.mp3` |
| Pixel portfolio lobby | Split design-lab / dance-arena role selection environment | `/manus-storage/pixel-portfolio-lobby-reference_c2b7d5df.png` |
| Pixel designer archive | Cyan design workshop archive environment | `/manus-storage/pixel-designer-archive-stage_95952f5a.png` |
| Pixel dancer archive | Orange dance battle archive environment | `/manus-storage/pixel-dancer-archive-stage_f52ebca6.png` |
| Pixel case-study console | Shared command-console backdrop for project detail | `/manus-storage/pixel-case-study-console_be8cc839.png` |
| Dancer central hover loop | Player 02 five-pose left-facing hover GIF; full V-pose fingertip safe area and 940ms Player 01-matched cadence | `/manus-storage/dancer-hover-jump-loop_639a60f2.gif` |
| Dancer left run loop | Player 02 four-pose mirrored leftward archive run | `/manus-storage/dancer-side-run-left-loop_f29c9af5.gif` |
| Designer wall fall | Player 01 collision and falling-frame sprite | `/manus-storage/designer-wall-fall_cc620221.png` |
| Dancer wall fall | Player 02 collision and falling-frame sprite | `/manus-storage/dancer-wall-fall_922eac76.png` |

## Role palette specification

| Role | Base | Primary | Secondary | Highlight | Application |
|---|---|---|---|---|---|
| Player 01 — Designer | `#06101E` | `#37E7FF` | `#00B8D4` | `#EAFBFF` | HUD, glasses, jacket, selection panel, archive markers |
| Player 02 — Dancer | `#200806` | `#FF6B17` | `#FFC258` | `#FF3D81` | HUD, belt, sneakers, selection panel, archive markers |

## Character state specification

| State | Trigger | Motion treatment |
|---|---|---|
| Idle | No directional input or inactive selection panel | Gentle 1.35-second bob with a slight squash-and-stretch |
| Walk | Hover preview or horizontal movement | Two-frame 0.22-second stepped bounce |
| Jump | Up-arrow input | 0.38-second upward arc with a soft landing squash |
| Celebrate | Role selected before archive handoff | Repeating upward bounce with alternating rotation |

## Interface guardrails

- No photographic portraits or photography-led covers appear in the primary lobby, archive, or UI chrome; the intentionally placed About profile stays inside a pixel player-ID frame.
- Use hard square corners, stepped offset shadows, pixel borders, and bitmap-scale visual hierarchy; avoid rounded default cards, glassmorphism, and diffuse blobs.
- Generated environmental art is stored externally and used through Manus storage URLs; Vercel receives matching small deployment copies.
