/**
 * Design Philosophy: Neo-Arcade Interaction Evidence.
 * Every entry foregrounds research, interaction decisions, prototype thinking, and embodied/spatial sensitivity.
 */
import type { Language } from "../contexts/LanguageContext";

export type CaseStudyProcess = {
  informationArchitecture: string;
  wireframes: string;
  highFidelity: string;
  prototype: string;
  testing: string;
};

export type ApplicationCaseStudy = {
  id: string;
  title: string;
  kicker: string;
  overview: string;
  role: string;
  projectType: string;
  timeline: string;
  tools: string[];
  link?: string;
  challenge: string;
  researchInsights: string[];
  process: CaseStudyProcess;
  keyInteractions: string[];
  impact: string[];
};

export const applicationCaseStudyContent: Record<Language, ApplicationCaseStudy[]> = {
  en: [
    {
      id: "01",
      title: "SokDak",
      kicker: "LIVE APP / KOREAN LANGUAGE & COMMUNITY",
      overview: "SokDak is an ongoing, live-app-focused Korean neologism and community experience for learners who need more than a literal dictionary definition. It translates the social meaning, tone, and cultural context of contemporary expressions into an approachable mobile flow.",
      role: "UX/UI Designer · Concept & character design · Brand identity · Interactive prototype",
      projectType: "Team project · Ongoing",
      timeline: "Ongoing",
      tools: ["Figma", "Prototype design", "Content architecture"],
      link: "https://www.behance.net/gallery/251527199/UXUI-Design-(SokDak)",
      challenge: "Textbook Korean and lived Korean are separated by slang, abbreviations, and cultural references. Learners need to understand when an expression is appropriate, not merely what it translates to.",
      researchInsights: [
        "A flat definition does not explain a word's social temperature, origin, or context of use.",
        "Learners benefit from moving between discovery, a plain-language explanation, example use, and low-pressure community practice.",
        "A warm character-led system can make unfamiliar native-language culture feel less intimidating to enter.",
      ],
      process: {
        informationArchitecture: "Mapped the experience as Discover → Expression detail → Cultural context → Example → Community practice, with browsing routes for trending, new, and socially situated language.",
        wireframes: "Reduced early flows to a scannable feed, a single expression-detail pattern, and one clear next action per screen before styling the product.",
        highFidelity: "Built a friendly visual system around a tiger mascot, conversation-like cards, category signals, and readable Korean/English hierarchy.",
        prototype: "Connected discovery, detail, saved context, and community paths so the app could be tested as a continuous learning loop rather than a set of isolated screens.",
        testing: "Reviewed whether a learner could explain both the meaning and the social use of an expression after one flow; insights informed content hierarchy and cue placement.",
      },
      keyInteractions: [
        "Micro-interaction: category and tone cues make a dense expression feed easier to scan without flattening cultural nuance.",
        "Context-first detail: meaning, origin, and sample use are sequenced as a paced learning interaction rather than a dictionary dump.",
        "Community hand-off: an expression can move from private comprehension to social practice, connecting language learning to embodied everyday conversation.",
      ],
      impact: [
        "Defined a release-oriented app experience that treats Korean slang as situated social interaction, not detached vocabulary.",
        "Created a reusable content and interaction pattern that can scale across new expressions while preserving cultural context.",
      ],
    },
    {
      id: "02",
      title: "Locaverse GmbH",
      kicker: "SPATIAL COLLABORATION / SERVICE ECOSYSTEM",
      overview: "A UX/UI redesign for Business.Locaverse.at, the business-facing route into a local mobile-service ecosystem. The work turns a dense acquisition page into a spatially legible path from value proposition to trust signals to one focused lead-generation action.",
      role: "UX/UI Designer · Internship · Landing-page redesign · Conversion flow prototype",
      projectType: "Client project · Locaverse GmbH",
      timeline: "3 months · Jul–Sep 2023",
      tools: ["Figma", "Photoshop", "Interactive prototype"],
      link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH",
      challenge: "Independent mobile-service providers had to understand both the Locaverse network and the value of the free expert report, yet the existing page dispersed attention across competing messages and actions.",
      researchInsights: [
        "A before/after audit exposed where competing calls-to-action interrupted the decision path.",
        "Business visitors needed a visible relationship between local reach, credibility, and the next commitment.",
        "Trust information works best when it appears at the moment a visitor is deciding whether to continue, not as disconnected decoration.",
      ],
      process: {
        informationArchitecture: "Sequenced Hero value → service relevance → proof → onboarding steps → founder credibility → expert report request, treating the page as a guided spatial journey.",
        wireframes: "Tested hierarchy through low-fidelity modules, reducing parallel CTAs to one deliberate conversion path.",
        highFidelity: "Applied a clear B2B interface system with scannable trust blocks, step markers, and contrast between information zones.",
        prototype: "Linked the main page and report route to test the continuity of the lead-generation hand-off.",
        testing: "Used the before/after prototype to review whether the main value and next action could be identified without explanation.",
      },
      keyInteractions: [
        "Spatial hierarchy: progressive vertical zones orient visitors through a long-form decision journey.",
        "Micro-interaction: repeated action labels and step states make the lead path feel consistent rather than promotional noise.",
        "Trust choreography: social proof, founder context, and value evidence are positioned to support decision-making at specific moments.",
      ],
      impact: [
        "Delivered an interaction-led redesign rationale and prototype for a more focused business acquisition route.",
        "Made the page's information architecture and conversion logic explicit enough to align design discussion with the client team.",
      ],
    },
    {
      id: "03",
      title: "Smart Wash",
      kicker: "MOBILE UX / CONTEXT-AWARE HOME APPLIANCE",
      overview: "Smart Wash is a weather-aware mobile companion for a washing machine. It explores how a domestic interface can turn ambient context into a reassuring recommendation while protecting manual control for people who want to decide for themselves.",
      role: "UX Designer · Research · Wireframes · Visual system · Interactive prototype",
      projectType: "Personal project",
      timeline: "2022",
      tools: ["Figma", "Interactive prototype"],
      link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash",
      challenge: "Appliance apps often expose every setting at once. The challenge was to transform a technical, repetitive task into a clear decision that responds to the user's immediate environment without removing agency.",
      researchInsights: [
        "Weather is meaningful context when planning laundry, but it must support—not override—the user's own preferences.",
        "First-time use requires a single confident route; experienced users require transparent access to temperature, rinse, spin, and favourites.",
        "A tactile visual language can reinforce that appliance control is an active, understandable interaction.",
      ],
      process: {
        informationArchitecture: "Organised the home around Weather Tracking, Manual Mode, and Energy Monitor so automatic recommendation and personal control remain equal, discoverable paths.",
        wireframes: "Mapped splash, home, recommended start, running state, side menu, energy monitor, and manual-setting states before visual styling.",
        highFidelity: "Developed a soft, tactile UI with a limited palette, custom icons, and readable state changes that support the product's smart-but-friendly character.",
        prototype: "Connected weather-aware recommendation, cycle progression, and manual fallback into one testable appliance-control loop.",
        testing: "Checked whether people could accept, understand, or override a recommendation without losing their sense of control.",
      },
      keyInteractions: [
        "Context-aware recommendation: weather becomes an input to a visible recommendation, not a hidden automation rule.",
        "Embodied feedback: the dial, state changes, and cycle progress make an otherwise invisible machine process feel legible in the hand.",
        "Agency-preserving controls: one-tap start and detailed manual configuration coexist without competing for attention.",
      ],
      impact: [
        "Produced a complete mobile control model that balances ambient intelligence with user agency.",
        "Demonstrated how interaction states, not just aesthetics, can make a smart-home experience feel approachable.",
      ],
    },
    {
      id: "04",
      title: "Campy",
      kicker: "MOBILE UX RESEARCH / REDESIGN PROPOSAL",
      overview: "Campy is a 2024 UX research and mobile-app redesign case study. The project is presented as a process-led proposal: research, case-study framing, interface redesign, visual identity, and mobile mockups are treated as one coherent interaction-design investigation.",
      role: "UX/UI Designer · UX research · App redesign proposal · Brand and interface direction",
      projectType: "UX research case study · 2024",
      timeline: "2024",
      tools: ["Figma", "UX research", "Mobile UI design"],
      link: "https://www.behance.net/gallery/197225963/UIUX-Design-Campy",
      challenge: "The design challenge was to convert research findings into a mobile experience whose information, interface language, and brand direction feel coherent from first encounter through task completion.",
      researchInsights: [
        "A redesign proposal needs a visible line from research signal to interface decision so visual direction is not mistaken for decoration.",
        "Mobile concepts become easier to evaluate when the user journey is represented as connected states rather than a collection of showcase screens.",
        "Brand identity can guide attention and feedback when it is embedded in interaction patterns, not applied after the flow is complete.",
      ],
      process: {
        informationArchitecture: "Outlined a focused mobile journey that establishes entry, task-relevant information, decision points, and completion as connected states.",
        wireframes: "Used low-fidelity flows to prioritise information and reduce ambiguity before making visual commitments.",
        highFidelity: "Translated the proposed brand direction into mobile screens with consistent hierarchy, spacing, and feedback language.",
        prototype: "Connected representative states into a walkthrough for evaluating sequence, clarity, and interaction continuity.",
        testing: "Reviewed the proposal as a case-study flow: can a reviewer trace each interface decision back to a research or task rationale?",
      },
      keyInteractions: [
        "State continuity: connected prototype states make the mobile journey readable as an interaction, not a static gallery.",
        "Micro-feedback: hierarchy and response cues clarify where attention should move at each decision point.",
        "Research-to-interface traceability: the case study exposes the reasoning that connects a user insight to an interface choice.",
      ],
      impact: [
        "Produced a documented UX research and redesign proposal that demonstrates an end-to-end mobile design process.",
        "Established a reusable method for presenting research, UI decisions, brand direction, and prototype logic as one coherent narrative.",
      ],
    },
    {
      id: "05",
      title: "Seek and Sight",
      kicker: "INCLUSIVE EDTECH / ADAPTIVE LEARNING",
      overview: "Seek and Sight is an ongoing inclusive STEAM literacy platform for young learners. The work connects a multi-audience product story with a character system and adaptive-learning interaction model designed to make participation feel supported rather than assessed.",
      role: "UX/UI Designer · Landing-page UX · Character & brand system · Ongoing content design",
      projectType: "EdTech · Ongoing",
      timeline: "2025–present",
      tools: ["Figma", "Content system", "Interactive prototype"],
      challenge: "Parents, educators, and childcare providers need different evidence before they can trust an inclusive learning product. The challenge was to explain adaptive, game-based learning while keeping the child experience warm, legible, and non-stigmatising.",
      researchInsights: [
        "Different stakeholder groups need distinct entry points, but all need to understand the same core value: supportive adaptive learning.",
        "A recurring character system can give children orientation across repeated learning moments and content formats.",
        "Side-by-side comparison can help non-technical audiences understand how an adaptive alternative differs from worksheet-based learning.",
      ],
      process: {
        informationArchitecture: "Structured the product story as What it is → Who it supports → Why adaptive learning matters → How it differs → How to begin, with dedicated paths for parents, educators, and providers.",
        wireframes: "Reduced the initial landing flow to clear audience routes, a concise value story, and understandable proof before creating visual illustration and motion layers.",
        highFidelity: "Built an accessible, friendly visual language around recurring characters, simple comparison modules, and generous content rhythm.",
        prototype: "Connected audience routes, comparison moments, and conversion steps to validate the hand-off from product understanding to action.",
        testing: "Reviewed language, hierarchy, and character cues for whether they support confidence and inclusion rather than signal deficiency.",
      },
      keyInteractions: [
        "Inclusive feedback: character and content states are designed to encourage progression without framing learning differences as failure.",
        "Audience-aware navigation: information shifts with the visitor's role while preserving a coherent product story.",
        "Embodied learning potential: the interface makes room for game-based prompts, responsive feedback, and paced participation rather than passive worksheet consumption.",
      ],
      impact: [
        "Created a product-facing UX and character-system foundation for ongoing inclusive-learning communication.",
        "Made the adaptive-learning proposition legible to both child-focused and institution-focused audiences through one connected information system.",
      ],
    },
  ],
  kr: [
    {
      id: "01", title: "속닥", kicker: "라이브 앱 / 한국어 신조어·커뮤니티", overview: "속닥은 단순한 사전 정의 이상의 이해가 필요한 학습자를 위한 진행형 한국어 신조어·커뮤니티 앱입니다. 동시대 표현의 사회적 의미, 뉘앙스, 문화적 맥락을 친근한 모바일 플로우로 번역합니다.", role: "UX/UI 디자이너 · 컨셉·캐릭터 디자인 · 브랜드 아이덴티티 · 인터랙티브 프로토타입", projectType: "팀 프로젝트 · 진행 중", timeline: "진행 중", tools: ["Figma", "프로토타입 디자인", "콘텐츠 아키텍처"], link: "https://www.behance.net/gallery/251527199/UXUI-Design-(SokDak)", challenge: "교과서 한국어와 실제 한국어 사이에는 슬랭, 줄임말, 문화적 참조가 존재합니다. 학습자는 번역만이 아니라 표현을 언제 어떻게 써야 하는지를 이해해야 합니다.", researchInsights: ["단순 정의만으로는 표현의 사회적 온도, 유래, 사용 맥락을 설명할 수 없습니다.", "학습자는 발견→쉬운 설명→예문→부담 없는 커뮤니티 연습을 오갈 수 있어야 합니다.", "따뜻한 캐릭터 중심 시스템은 낯선 원어민 문화에 진입하는 부담을 낮춥니다."], process: { informationArchitecture: "발견 → 표현 상세 → 문화적 맥락 → 예문 → 커뮤니티 연습의 루프로 구조화하고, 트렌딩·신조어·사회적 맥락을 기준으로 탐색 경로를 만들었습니다.", wireframes: "스타일링 전에는 스캔 가능한 피드, 일관된 표현 상세 패턴, 화면당 하나의 다음 행동으로 초기 플로우를 단순화했습니다.", highFidelity: "호랑이 마스코트, 대화형 카드, 카테고리 신호, 읽기 쉬운 한국어·영어 위계를 중심으로 친근한 비주얼 시스템을 구축했습니다.", prototype: "발견·상세·저장된 맥락·커뮤니티 경로를 연결해, 고립된 화면이 아닌 연속 학습 루프로 검토했습니다.", testing: "한 플로우 이후 학습자가 의미와 사회적 사용 맥락을 함께 설명할 수 있는지 확인하고 콘텐츠 위계와 신호 배치를 조정했습니다." }, keyInteractions: ["마이크로 인터랙션: 카테고리와 뉘앙스 신호로 문화적 밀도를 낮추지 않고 피드를 빠르게 훑게 합니다.", "맥락 우선 상세: 의미·유래·예문을 사전 나열이 아닌 속도감 있는 학습 상호작용으로 배치합니다.", "커뮤니티 전환: 개인적 이해가 사회적 연습으로 이동해 언어 학습을 실제 몸의 대화와 연결합니다."], impact: ["한국어 슬랭을 분리된 어휘가 아닌 상황적 사회 상호작용으로 다루는 릴리스 지향 앱 경험을 정의했습니다.", "새 표현으로 확장되어도 문화적 맥락을 유지하는 재사용 가능한 콘텐츠·인터랙션 패턴을 만들었습니다."]
    },
    {
      id: "02", title: "Locaverse GmbH", kicker: "공간적 협업 / 서비스 생태계", overview: "Business.Locaverse.at의 UX/UI 리디자인입니다. 지역 기반 모바일 서비스 생태계의 사업자 진입 경로를, 가치 제안에서 신뢰 신호를 거쳐 하나의 집중된 리드 제너레이션 행동으로 이어지는 공간적으로 읽기 쉬운 여정으로 바꿉니다.", role: "UX/UI 디자이너 · 인턴십 · 랜딩 페이지 리디자인 · 전환 플로우 프로토타입", projectType: "클라이언트 프로젝트 · Locaverse GmbH", timeline: "3개월 · 2023년 7–9월", tools: ["Figma", "Photoshop", "인터랙티브 프로토타입"], link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH", challenge: "독립 출장 서비스 제공자는 Locaverse 네트워크와 무료 전문가 리포트의 가치를 이해해야 했지만, 기존 페이지는 경쟁하는 메시지와 행동이 주의를 분산시켰습니다.", researchInsights: ["비포/애프터 감사는 경쟁하는 CTA가 의사결정 경로를 방해하는 지점을 드러냈습니다.", "사업자 방문자는 지역 도달, 신뢰도, 다음 약속 사이의 관계를 눈에 보여야 했습니다.", "신뢰 정보는 분리된 장식이 아니라 계속 진행할지 결정하는 순간에 배치될 때 효과적입니다."], process: { informationArchitecture: "히어로 가치 → 서비스 관련성 → 증거 → 온보딩 단계 → 창업자 신뢰 → 리포트 요청으로 순서를 만들고, 페이지를 안내된 공간적 여정으로 다뤘습니다.", wireframes: "로우파이 모듈로 위계를 검토하고 여러 CTA를 하나의 의도적인 전환 경로로 줄였습니다.", highFidelity: "스캔 가능한 신뢰 블록, 단계 표식, 정보 영역의 대비로 명확한 B2B 인터페이스 시스템을 적용했습니다.", prototype: "메인 페이지와 리포트 경로를 연결해 리드 제너레이션 전환의 연속성을 확인했습니다.", testing: "설명 없이도 핵심 가치와 다음 행동을 파악할 수 있는지 비포/애프터 프로토타입으로 검토했습니다." }, keyInteractions: ["공간적 위계: 점진적인 세로 영역이 긴 의사결정 여정을 안내합니다.", "마이크로 인터랙션: 반복되는 행동 라벨과 단계 상태가 리드 경로를 홍보성 노이즈가 아닌 일관된 흐름으로 만듭니다.", "신뢰의 안무: 소셜 증거, 창업자 맥락, 가치 증거가 특정 의사결정 순간을 지원하도록 배치됩니다."], impact: ["더 집중된 사업자 유치 경로를 위한 인터랙션 중심 리디자인 근거와 프로토타입을 제공했습니다.", "정보 구조와 전환 로직을 명시해 클라이언트 팀과의 디자인 논의를 정렬했습니다."]
    },
    {
      id: "03", title: "Smart Wash", kicker: "모바일 UX / 맥락 인지형 홈 어플라이언스", overview: "Smart Wash는 세탁기를 위한 날씨 인지형 모바일 동반자입니다. 주변 맥락을 안심되는 추천으로 바꾸면서도, 스스로 결정하고 싶은 사용자의 수동 제어권을 지키는 방식을 탐구합니다.", role: "UX 디자이너 · 리서치 · 와이어프레임 · 비주얼 시스템 · 인터랙티브 프로토타입", projectType: "개인 프로젝트", timeline: "2022", tools: ["Figma", "인터랙티브 프로토타입"], link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash", challenge: "가전 앱은 많은 설정을 한꺼번에 노출합니다. 실제 환경에 반응하면서도 사용자의 주도권을 빼앗지 않는 명확한 결정으로 기술적이고 반복적인 일을 바꾸는 것이 과제였습니다.", researchInsights: ["날씨는 세탁 계획에 의미 있는 맥락이지만 사용자의 선호를 대체해서는 안 됩니다.", "처음 사용하는 사람에게는 하나의 확신 있는 경로가, 숙련 사용자에게는 온도·헹굼·탈수·즐겨찾기에 대한 투명한 접근이 필요합니다.", "촉각적인 비주얼 언어는 가전 제어가 능동적이고 이해 가능한 상호작용임을 강화할 수 있습니다."], process: { informationArchitecture: "날씨 트래킹, 수동 모드, 에너지 모니터를 홈의 세 진입점으로 구성해 자동 추천과 개인 제어를 동등하고 발견 가능하게 했습니다.", wireframes: "비주얼 스타일링 전, 스플래시·홈·추천 시작·실행 상태·사이드 메뉴·에너지 모니터·수동 설정 상태를 맵핑했습니다.", highFidelity: "제한된 팔레트, 커스텀 아이콘, 읽기 쉬운 상태 변화를 사용한 부드럽고 촉각적인 UI를 개발했습니다.", prototype: "날씨 기반 추천, 세탁 진행, 수동 전환을 하나의 테스트 가능한 가전 제어 루프로 연결했습니다.", testing: "사용자가 통제감을 잃지 않고 추천을 수용·이해·재정의할 수 있는지 확인했습니다." }, keyInteractions: ["맥락 인지 추천: 날씨는 숨은 자동화 규칙이 아닌 보이는 추천의 입력값이 됩니다.", "신체적 피드백: 다이얼, 상태 변화, 진행률이 보이지 않는 기계 과정을 손에서 읽을 수 있게 합니다.", "주도권 보존 제어: 원탭 시작과 상세 수동 설정이 주의를 두고 경쟁하지 않고 공존합니다."], impact: ["주변 지능과 사용자 주도권의 균형을 잡는 완전한 모바일 제어 모델을 만들었습니다.", "미학뿐 아니라 인터랙션 상태가 스마트홈 경험을 친근하게 만드는 방식을 보여주었습니다."]
    },
    {
      id: "04", title: "Campy", kicker: "모바일 UX 리서치 / 리디자인 제안", overview: "Campy는 2024년 UX 리서치와 모바일 앱 리디자인 케이스 스터디입니다. 리서치, 케이스 스터디 프레이밍, 인터페이스 리디자인, 브랜드 아이덴티티, 모바일 목업을 하나의 일관된 Interaction Design 탐구로 다룹니다.", role: "UX/UI 디자이너 · UX 리서치 · 앱 리디자인 제안 · 브랜드·인터페이스 방향", projectType: "UX 리서치 케이스 스터디 · 2024", timeline: "2024", tools: ["Figma", "UX 리서치", "모바일 UI 디자인"], link: "https://www.behance.net/gallery/197225963/UIUX-Design-Campy", challenge: "리서치 발견을 첫 인상부터 과업 완료까지 정보, 인터페이스 언어, 브랜드 방향이 일관된 모바일 경험으로 바꾸는 것이 과제였습니다.", researchInsights: ["리디자인 제안은 비주얼 방향이 장식으로 보이지 않도록 리서치 신호에서 인터페이스 결정까지의 연결을 보여줘야 합니다.", "사용자 여정을 쇼케이스 화면의 모음이 아니라 연결된 상태로 보여줄 때 모바일 컨셉을 더 쉽게 검토할 수 있습니다.", "브랜드 아이덴티티는 플로우 뒤에 적용되는 것이 아니라 인터랙션 패턴에 포함될 때 주의와 피드백을 이끕니다."], process: { informationArchitecture: "진입, 과업 관련 정보, 의사결정 지점, 완료를 연결된 상태로 만드는 집중된 모바일 여정을 개요화했습니다.", wireframes: "비주얼 결정을 하기 전 로우파이 플로우로 정보를 우선순위화하고 모호함을 줄였습니다.", highFidelity: "제안된 브랜드 방향을 일관된 위계, 여백, 피드백 언어를 가진 모바일 화면으로 번역했습니다.", prototype: "대표 상태를 워크스루로 연결해 순서, 명확성, 인터랙션 연속성을 검토했습니다.", testing: "리뷰어가 각 인터페이스 결정을 리서치 또는 과업 근거까지 추적할 수 있는지 케이스 스터디 플로우로 검토했습니다." }, keyInteractions: ["상태 연속성: 연결된 프로토타입 상태가 모바일 여정을 정적 갤러리가 아닌 상호작용으로 읽게 합니다.", "마이크로 피드백: 위계와 반응 신호가 각 의사결정 지점에서 주의가 이동할 곳을 분명히 합니다.", "리서치-인터페이스 추적성: 사용자 인사이트가 인터페이스 선택으로 이어지는 근거를 드러냅니다."], impact: ["엔드투엔드 모바일 디자인 프로세스를 보여주는 문서화된 UX 리서치·리디자인 제안을 만들었습니다.", "리서치, UI 결정, 브랜드 방향, 프로토타입 로직을 하나의 일관된 서사로 제시하는 방법을 확립했습니다."]
    },
    {
      id: "05", title: "Seek and Sight", kicker: "포용적 에듀테크 / 적응형 학습", overview: "Seek and Sight는 어린 학습자를 위한 진행형 포용적 STEAM 문해력 플랫폼입니다. 여러 대상의 제품 서사와 캐릭터 시스템, 적응형 학습 상호작용 모델을 연결하여 참여가 평가가 아닌 지원으로 느껴지게 합니다.", role: "UX/UI 디자이너 · 랜딩 페이지 UX · 캐릭터·브랜드 시스템 · 지속 콘텐츠 디자인", projectType: "에듀테크 · 진행 중", timeline: "2025–현재", tools: ["Figma", "콘텐츠 시스템", "인터랙티브 프로토타입"], challenge: "부모, 교육자, 보육 제공자는 포용적 학습 제품을 신뢰하기 전에 서로 다른 증거를 필요로 합니다. 아이 경험을 따뜻하고 명확하며 비낙인적으로 유지하면서 적응형·게임 기반 학습을 설명해야 했습니다.", researchInsights: ["서로 다른 이해관계자에게는 별도의 진입점이 필요하지만, 모두 지원적 적응 학습이라는 핵심 가치를 이해해야 합니다.", "반복되는 캐릭터 시스템은 반복 학습 순간과 콘텐츠 형식에서 아이에게 방향감을 줄 수 있습니다.", "나란한 비교는 비기술적 대상이 적응형 대안과 워크시트 기반 학습의 차이를 이해하게 돕습니다."], process: { informationArchitecture: "무엇인가 → 누구를 지원하는가 → 왜 적응형 학습인가 → 어떻게 다른가 → 어떻게 시작하는가로 제품 스토리를 구성하고, 부모·교육자·제공자별 경로를 만들었습니다.", wireframes: "일러스트와 모션 레이어 전, 초기 랜딩 플로우를 명확한 대상 경로, 간결한 가치 스토리, 이해 가능한 근거로 축소했습니다.", highFidelity: "반복 캐릭터, 단순 비교 모듈, 넉넉한 콘텐츠 리듬을 중심으로 접근 가능하고 친근한 비주얼 언어를 구축했습니다.", prototype: "대상 경로, 비교 순간, 전환 단계를 연결해 제품 이해에서 행동으로의 전환을 검토했습니다.", testing: "언어, 위계, 캐릭터 신호가 결핍을 드러내기보다 자신감과 포용성을 지원하는지 확인했습니다." }, keyInteractions: ["포용적 피드백: 캐릭터와 콘텐츠 상태가 학습 차이를 실패로 규정하지 않고 진전을 격려합니다.", "대상 인지형 내비게이션: 방문자의 역할에 따라 정보가 달라지지만 일관된 제품 스토리를 유지합니다.", "신체적 학습 가능성: 수동적 워크시트 소비가 아닌 게임 기반 프롬프트, 반응형 피드백, 속도 조절 참여를 위한 여지를 만듭니다."], impact: ["지속적인 포용 학습 커뮤니케이션을 위한 제품 UX·캐릭터 시스템 기반을 만들었습니다.", "연결된 하나의 정보 시스템으로 아동 중심·기관 중심 대상 모두에게 적응형 학습 가치를 명확히 전달했습니다."]
    },
  ],
  de: [
    {
      id: "01", title: "SokDak", kicker: "LIVE-APP / KOREANISCHE NEOLOGISMEN & COMMUNITY", overview: "SokDak ist eine laufende koreanische Neologismen- und Community-App für Lernende, die mehr als eine wörtliche Wörterbuchdefinition brauchen. Sie übersetzt soziale Bedeutung, Ton und kulturellen Kontext zeitgenössischer Ausdrücke in einen zugänglichen mobilen Flow.", role: "UX/UI-Designerin · Konzept- & Character Design · Brand Identity · Interaktiver Prototyp", projectType: "Teamprojekt · Laufend", timeline: "Laufend", tools: ["Figma", "Prototyping", "Content Architecture"], link: "https://www.behance.net/gallery/251527199/UXUI-Design-(SokDak)", challenge: "Zwischen Lehrbuchkoreanisch und gelebtem Koreanisch liegen Slang, Abkürzungen und kulturelle Referenzen. Lernende müssen verstehen, wann ein Ausdruck angemessen ist, nicht nur, was er übersetzt bedeutet.", researchInsights: ["Eine flache Definition erklärt weder soziale Temperatur, Ursprung noch Verwendungskontext.", "Lernende profitieren von einem Weg zwischen Entdeckung, verständlicher Erklärung, Beispiel und niedrigschwelliger Community-Praxis.", "Ein warmes character-basiertes System kann den Zugang zu unbekannter muttersprachlicher Kultur weniger einschüchternd machen."], process: { informationArchitecture: "Die Erfahrung wurde als Entdecken → Ausdrucksdetail → kultureller Kontext → Beispiel → Community-Praxis strukturiert, mit Routen für Trends, Neues und soziale Situationen.", wireframes: "Frühe Flows wurden auf einen scannbaren Feed, ein konsistentes Ausdrucksdetail und eine klare nächste Aktion pro Screen reduziert.", highFidelity: "Ein freundliches System aus Tiger-Maskottchen, konversationsartigen Karten, Kategorie-Signalen und lesbarer koreanisch/englischer Hierarchie wurde entwickelt.", prototype: "Entdeckung, Detail, gespeicherter Kontext und Community wurden verbunden, damit die App als kontinuierliche Lernschleife geprüft werden konnte.", testing: "Geprüft wurde, ob Lernende nach einem Flow sowohl Bedeutung als auch soziale Verwendung erklären können; daraus wurden Hierarchie und Hinweise angepasst." }, keyInteractions: ["Micro-Interaction: Kategorie- und Ton-Signale machen einen dichten Feed scannbar, ohne kulturelle Nuance zu vereinfachen.", "Kontext zuerst: Bedeutung, Ursprung und Beispiel werden als getaktete Lerninteraktion statt als Wörterbuchliste angeordnet.", "Community-Handoff: Ein Ausdruck kann von privatem Verständnis zu sozialer Praxis wechseln und verbindet Lernen mit alltäglicher verkörperter Konversation."], impact: ["Eine release-orientierte App-Erfahrung wurde definiert, die koreanischen Slang als situierte soziale Interaktion behandelt.", "Ein wiederverwendbares Content- und Interaktionsmuster ermöglicht Wachstum mit neuen Ausdrücken bei erhaltenem kulturellen Kontext."]
    },
    {
      id: "02", title: "Locaverse GmbH", kicker: "RÄUMLICHE KOLLABORATION / SERVICE-ÖKOSYSTEM", overview: "Ein UX/UI-Redesign für Business.Locaverse.at, den Business-Einstieg in ein lokales Mobile-Service-Ökosystem. Die Arbeit verwandelt eine dichte Akquisitionsseite in einen räumlich lesbaren Weg von Value Proposition über Vertrauenssignale zu einer fokussierten Lead-Action.", role: "UX/UI-Designerin · Praktikum · Landing-Page-Redesign · Conversion-Flow-Prototyp", projectType: "Kundenprojekt · Locaverse GmbH", timeline: "3 Monate · Jul–Sep 2023", tools: ["Figma", "Photoshop", "Interaktiver Prototyp"], link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH", challenge: "Unabhängige mobile Dienstleister mussten sowohl das Locaverse-Netzwerk als auch den Wert des kostenlosen Expertenreports verstehen, doch die bestehende Seite verteilte Aufmerksamkeit auf konkurrierende Botschaften und Aktionen.", researchInsights: ["Ein Vorher/Nachher-Audit zeigte, wo konkurrierende CTAs den Entscheidungsweg unterbrechen.", "Business-Besucher:innen brauchten eine sichtbare Beziehung zwischen lokaler Reichweite, Glaubwürdigkeit und dem nächsten Commitment.", "Vertrauensinformationen funktionieren am besten im Moment der Entscheidung, nicht als losgelöste Dekoration."], process: { informationArchitecture: "Hero-Value → Service-Relevanz → Evidence → Onboarding-Schritte → Founder Credibility → Expertenreport wurde als geführte räumliche Reise aufgebaut.", wireframes: "Hierarchie wurde mit Low-Fidelity-Modulen geprüft und parallele CTAs auf einen bewussten Conversion-Pfad reduziert.", highFidelity: "Ein klares B2B-System mit scannbaren Trust-Blöcken, Schrittmarkern und kontrastierenden Informationszonen wurde angewendet.", prototype: "Hauptseite und Report-Route wurden verbunden, um die Kontinuität des Lead-Handoffs zu prüfen.", testing: "Am Vorher/Nachher-Prototyp wurde geprüft, ob Hauptnutzen und nächste Aktion ohne Erklärung erkennbar sind." }, keyInteractions: ["Räumliche Hierarchie: progressive vertikale Zonen orientieren durch eine lange Entscheidungsreise.", "Micro-Interaction: wiederholte Aktionslabels und Schritt-Zustände halten den Lead-Pfad konsistent statt werblich laut.", "Trust-Choreografie: Social Proof, Founder-Kontext und Value Evidence erscheinen an spezifischen Entscheidungsmomenten."], impact: ["Eine interaktionsgeleitete Redesign-Begründung und ein Prototyp für einen fokussierteren Business-Akquisitionsweg wurden geliefert.", "Informationsarchitektur und Conversion-Logik wurden sichtbar gemacht, um die Design-Diskussion mit dem Kundenteam auszurichten."]
    },
    {
      id: "03", title: "Smart Wash", kicker: "MOBILE UX / KONTEXTSENSITIVES HOME APPLIANCE", overview: "Smart Wash ist ein wetterbewusster mobiler Begleiter für eine Waschmaschine. Das Projekt untersucht, wie ein Domestic Interface Umgebungskontext in eine beruhigende Empfehlung übersetzen kann, ohne manuelle Kontrolle zu nehmen.", role: "UX-Designerin · Research · Wireframes · Visual System · Interaktiver Prototyp", projectType: "Persönliches Projekt", timeline: "2022", tools: ["Figma", "Interaktiver Prototyp"], link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash", challenge: "Geräte-Apps zeigen häufig alle Einstellungen auf einmal. Die Herausforderung war, eine technische Routine in eine klare, auf die unmittelbare Umgebung reagierende Entscheidung zu verwandeln, ohne Handlungsmacht zu entziehen.", researchInsights: ["Wetter ist ein relevanter Kontext für Wäscheplanung, darf aber Präferenzen nicht ersetzen.", "Erstnutzung braucht einen sicheren Weg; erfahrene Nutzer:innen brauchen transparenten Zugriff auf Temperatur, Spülen, Schleudern und Favoriten.", "Eine taktile visuelle Sprache kann Steuerung als aktive, verständliche Interaktion stärken."], process: { informationArchitecture: "Weather Tracking, Manual Mode und Energy Monitor wurden als drei gleichwertige, auffindbare Einstiegspunkte organisiert.", wireframes: "Splash, Home, empfohlener Start, laufender Zyklus, Seitenmenü, Energy Monitor und manuelle Zustände wurden vor dem Styling abgebildet.", highFidelity: "Ein weiches, taktiles UI mit begrenzter Palette, eigenen Icons und lesbaren Zustandswechseln wurde entwickelt.", prototype: "Wetterempfehlung, Zyklusfortschritt und manueller Fallback wurden zu einer testbaren Appliance-Control-Schleife verbunden.", testing: "Geprüft wurde, ob Menschen eine Empfehlung annehmen, verstehen oder überschreiben können, ohne Kontrolle zu verlieren." }, keyInteractions: ["Kontextsensitive Empfehlung: Wetter wird sichtbarer Input statt unsichtbarer Automationsregel.", "Verkörpertes Feedback: Dial, Statuswechsel und Progress machen einen unsichtbaren Maschinenprozess in der Hand lesbar.", "Agency-preserving Controls: One-Tap-Start und detaillierte manuelle Konfiguration koexistieren ohne Aufmerksamkeitskonflikt."], impact: ["Ein vollständiges mobiles Control-Modell balanciert Ambient Intelligence mit User Agency.", "Das Projekt zeigt, wie Interaktionszustände eine Smart-Home-Erfahrung zugänglich machen können."]
    },
    {
      id: "04", title: "Campy", kicker: "MOBILE UX RESEARCH / REDESIGN-PROPOSAL", overview: "Campy ist eine UX-Research- und Mobile-App-Redesign-Fallstudie aus 2024. Research, Case-Study-Framing, Interface-Redesign, Brand Identity und Mobile Mockups werden als eine kohärente Interaction-Design-Untersuchung behandelt.", role: "UX/UI-Designerin · UX Research · App-Redesign-Proposal · Brand- und Interface-Richtung", projectType: "UX Research Case Study · 2024", timeline: "2024", tools: ["Figma", "UX Research", "Mobile UI Design"], link: "https://www.behance.net/gallery/197225963/UIUX-Design-Campy", challenge: "Die Herausforderung war, Research-Erkenntnisse in eine mobile Erfahrung zu übersetzen, deren Information, Interface-Sprache und Brand-Richtung vom ersten Kontakt bis zum Abschluss kohärent wirken.", researchInsights: ["Ein Redesign-Proposal muss die Verbindung vom Research-Signal zur Interface-Entscheidung sichtbar machen.", "Mobile Konzepte sind besser bewertbar, wenn die Journey als verbundene Zustände und nicht als Screen-Sammlung erscheint.", "Brand Identity lenkt Aufmerksamkeit und Feedback, wenn sie in Interaktionsmuster eingebettet ist."], process: { informationArchitecture: "Eine fokussierte Mobile Journey aus Einstieg, aufgabenrelevanter Information, Entscheidungspunkten und Abschluss wurde als verbundene Zustände skizziert.", wireframes: "Low-Fidelity-Flows priorisierten Information und reduzierten Unklarheit, bevor visuelle Entscheidungen getroffen wurden.", highFidelity: "Die Brand-Richtung wurde in Mobile Screens mit konsistenter Hierarchie, Spacing und Feedback-Sprache übersetzt.", prototype: "Repräsentative Zustände wurden zu einem Walkthrough verbunden, um Reihenfolge, Klarheit und Interaktionskontinuität zu prüfen.", testing: "Die Fallstudie wurde darauf geprüft, ob ein:e Reviewer:in jede Interface-Entscheidung zu Research- oder Task-Rationale zurückverfolgen kann." }, keyInteractions: ["State Continuity: verbundene Prototyp-Zustände machen die Mobile Journey als Interaktion lesbar.", "Micro-Feedback: Hierarchie und Response-Cues zeigen an jedem Entscheidungspunkt, wohin Aufmerksamkeit gehen soll.", "Research-to-Interface-Traceability: die Case Study zeigt die Begründung zwischen User Insight und Interface-Wahl."], impact: ["Eine dokumentierte UX-Research- und Redesign-Proposal demonstriert einen End-to-End-Mobile-Designprozess.", "Eine wiederverwendbare Methode verbindet Research, UI-Entscheidungen, Brand-Richtung und Prototyp-Logik zu einer Narration."]
    },
    {
      id: "05", title: "Seek and Sight", kicker: "INKLUSIVE EDTECH / ADAPTIVES LERNEN", overview: "Seek and Sight ist eine laufende inklusive STEAM-Literacy-Plattform für junge Lernende. Die Arbeit verbindet eine Multi-Audience-Produktstory mit Character-System und adaptivem Lernmodell, damit Teilhabe unterstützend statt bewertend wirkt.", role: "UX/UI-Designerin · Landing-Page-UX · Character- & Brand-System · Ongoing Content Design", projectType: "EdTech · Laufend", timeline: "2025–heute", tools: ["Figma", "Content System", "Interaktiver Prototyp"], challenge: "Eltern, Pädagog:innen und Childcare-Anbieter benötigen unterschiedliche Evidenz, bevor sie einem inklusiven Lernprodukt vertrauen. Adaptives, spielbasiertes Lernen musste erklärt werden, ohne die Kind-Erfahrung zu stigmatisieren.", researchInsights: ["Verschiedene Stakeholder brauchen eigene Einstiegspunkte, müssen aber denselben Kernwert unterstützenden adaptiven Lernens verstehen.", "Ein wiederkehrendes Character-System kann Kindern in wiederholten Lernmomenten und Content-Formaten Orientierung geben.", "Ein direkter Vergleich hilft nicht-technischen Zielgruppen, ein adaptives Angebot von Worksheet-Lernen zu unterscheiden."], process: { informationArchitecture: "Was es ist → Wen es unterstützt → Warum adaptives Lernen wichtig ist → Wie es sich unterscheidet → Wie man beginnt wurde mit Routen für Eltern, Pädagog:innen und Anbieter strukturiert.", wireframes: "Der erste Landing Flow wurde auf klare Zielgruppenrouten, eine prägnante Value Story und verständliche Evidence reduziert.", highFidelity: "Eine zugängliche, freundliche Sprache mit wiederkehrenden Characters, einfachen Vergleichsmodulen und großzügigem Content-Rhythmus wurde aufgebaut.", prototype: "Zielgruppenrouten, Vergleichsmomente und Conversion-Schritte wurden verbunden, um den Übergang von Verständnis zu Handlung zu prüfen.", testing: "Sprache, Hierarchie und Character-Cues wurden darauf geprüft, ob sie Sicherheit und Inklusion statt Defizit signalisieren." }, keyInteractions: ["Inklusives Feedback: Character- und Content-Zustände fördern Fortschritt, ohne Lernunterschiede als Versagen zu framen.", "Audience-aware Navigation: Information verändert sich mit der Rolle der Besuchenden, bewahrt aber eine kohärente Produktstory.", "Embodied-Learning-Potenzial: Die Schnittstelle lässt Raum für spielbasierte Prompts, responsives Feedback und getaktete Teilhabe statt passivem Worksheet-Konsum."], impact: ["Eine UX- und Character-System-Grundlage für laufende Kommunikation inklusiven Lernens wurde geschaffen.", "Die adaptive Lernproposition wurde für kinder- und institutionsorientierte Zielgruppen durch ein verbundenes Informationssystem lesbar gemacht."]
    },
  ],
};
