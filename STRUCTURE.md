# Pixel Archive Structure

| Layer | Responsibility |
|---|---|
| `RoleSelectIntro` | Selects Player 01 or Player 02 and enters the relevant archive. |
| `DesignerPortfolioSlider` | Maps the designer archive signposts to project case studies, About, and Contact. |
| `DancerPortfolioSlider` | Maps the dancer archive signposts to performance media and dancer bio. |
| `SideScrollSelect` | Owns avatar movement, camera follow, keyboard input, signpost proximity, and selection. |
| `PixelCharacter` | Renders the role-specific generated avatar with movement, facing, crouch, and jump states. |
| `Signpost` | Renders an interactive archive destination and proximity response. |
| `CaseStudy` | Presents design project content inside a pixel command-console shell. |
| `LanguageSwitcher` and fixed controls | Use shared hard-edge pixel HUD styling. |

The experience is React-based and retains the existing portfolio routing. It deliberately uses a lightweight 2D DOM world rather than introducing a new game engine, because the requested navigation layer already exists and can be improved without replacing working case-study and media flows. Generated pixel environments become the visual base layer; the DOM remains responsible for accessible navigation and content.
