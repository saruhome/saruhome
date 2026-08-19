# FH Joanneum 지원형 포트폴리오 구조

| 계층 | 파일 | 책임 |
| --- | --- | --- |
| 로비 | `RoleSelectIntro.tsx` | Player 01/02 선택을 제공하고, 게임을 건너뛰는 Quick Menu에서 Designer 프로젝트와 About으로 바로 진입한다. |
| Designer Path | `DesignerPortfolioSlider.tsx` | Interaction/UX/Spatial 중심 프로젝트 목록, About·Contact, 케이스 스터디 라우팅을 관리한다. |
| Dancer Path | `DancerPortfolioSlider.tsx` | 공연 미디어·라이트박스·댄서 소개를 유지하며, 심사자가 빠르게 검토할 수 있는 메뉴 접근을 제공한다. |
| 아카이브 엔진 | `SideScrollSelect.tsx` | 아바타 이동·카메라·키보드·자동 보행 선택을 보존하고, 표지판과 병렬되는 Quick Menu HUD를 렌더한다. |
| 캐릭터 | `PixelCharacter` | 역할별 치비 아바타의 idle·walk·jump·crouch·wall-sit 상태를 렌더한다. |
| 표지판 | `Signpost` | 가까운 프로젝트를 선택 가능한 아케이드 목적지로 렌더한다. |
| 상세 콘텐츠 | `CaseStudy.tsx` | 다섯 우선순위 프로젝트를 지원형 공통 구조의 픽셀 커맨드 콘솔 화면으로 렌더한다. |
| 다국어·고정 HUD | `LanguageContext.tsx`, `LanguageSwitcher.tsx` | EN·KR·DE와 하드엣지 픽셀 HUD 일관성을 관리한다. |

경험은 React 기반의 가벼운 2D DOM 월드로 유지한다. Babylon이나 별도 3D 엔진을 도입하지 않는 이유는 현재 검증된 횡스크롤·프로젝트 라우팅·접근성 구조가 이미 요구에 맞고, 지원형 콘텐츠 밀도와 빠른 탐색을 강화하는 편이 목적에 더 직접적이기 때문이다.
