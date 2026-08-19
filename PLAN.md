# FH Joanneum Interaction Design 지원형 포트폴리오 계획

## 목표

기존의 **Player 01 UX Designer / Player 02 Dancer** 이중 경로와 16-bit 픽셀 게임 내비게이션을 유지하되, 심사자가 게임 조작 없이도 Sunghee Im의 Interaction Design 역량과 다섯 개 핵심 프로젝트를 빠르게 파악할 수 있도록 지원형 정보 구조를 강화한다.

## 범위

`SideScrollSelect`는 기존 횡스크롤·키보드·자동 보행 선택 엔진으로 유지한다. 로비, 두 아카이브, 픽셀 콘솔 케이스 스터디, 고정 HUD는 하드엣지 아케이드 언어를 공유한다. 이 위에 다음 지원형 레이어를 추가한다.

| 레이어 | 강화 내용 |
| --- | --- |
| Designer About | Vienna 기반 UX/UI·Visual Designer, 한국 출신, 댄서 경험에서 embodied interaction·gesture UX·spatial design으로 이어지는 관점, 2+년 프리랜스, FH Joanneum 지원 의도 |
| Main archive | SokDak, Locaverse GmbH, Smart Wash, Campy, Seek and Sight를 Interaction/UX/Spatial 중심으로 선별 |
| Case Study | Overview, Role, Challenge, Research, IA→Wireframes→Hi-Fi→Prototype→Testing, Key Interactions, Impact, Tools 공통 구조 |
| Quick access | 로비와 아카이브에 게임을 건너뛰는 Quick Menu / Skip to Projects HUD 추가 |
| Contact | Email, LinkedIn, Behance, CV 다운로드를 단일 픽셀 콘솔 블록으로 정리 |

## 검증 기준

1. Player 01은 Cyan, Player 02는 Orange로 유지되며 기존 게임 선택 경로가 유지된다.
2. Arrow keys move the avatar; Up jumps; Down crouches; Enter selects the nearest signpost.
3. 로비와 두 아카이브에는 키보드 없이도 프로젝트를 열 수 있는 Quick Menu가 있다.
4. 우선순위 다섯 프로젝트가 같은 지원형 섹션 구조와 명확한 Interaction Design 서사를 제공한다.
5. EN·KR·DE의 About, Contact, Quick Menu, 주요 케이스 스터디 제목이 전환된다.
6. 데스크톱과 390px 모바일에서 게임 컨트롤과 빠른 진입 HUD가 겹치지 않는다.

## 위험 우선 작업

1. SideScrollSelect의 이벤트 정리·requestAnimationFrame·자동 입장 흐름을 훼손하지 않는다.
2. Quick Menu는 별도 HUD 접근점으로 추가하고, 게임 탐험을 대체하지 않는다.
3. 지원자 서사는 사실로 제공된 범위 내에서만 작성하며 검증되지 않은 결과 수치를 만들지 않는다.
4. 생성 자산은 저장소 밖에서 보관하고 Manus 저장소 URL로만 참조한다.
