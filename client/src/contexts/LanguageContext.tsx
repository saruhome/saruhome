import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "kr" | "de";

export const translations = {
  en: {
    // Main page
    player01: "PLAYER 01",
    uxuiDesigner: "UX DESIGNER",
    designerSubtitle: "Systems, interfaces, flow, precision",
    player02: "PLAYER 02",
    dancer: "DANCER",
    dancerSubtitle: "Rhythm, presence, battle energy",
    exploreDesignerPortfolio: "Explore UX Designer portfolio",
    exploreDancerPortfolio: "Explore Dancer portfolio",
    backToSelect: "Back to Select",
    chooseYourPlayer: "Choose Your Player",
    hoverToPreview: "Hover to preview",
    ready: "Ready",
    loadingPlayer: "Loading player",
    archiveAccess: "Archive Access",

    // Navigation
    backToWorks: "Back to Works",
    back: "Back",
    caseStudy: "Case Study",
    player01Archive: "Player 01 Archive",
    player02Archive: "Player 02 Archive",
    designPortfolio: "Design Portfolio",
    dancePortfolio: "Dance Portfolio",
    project: "Project",

    // Case Study sections
    problem: "The Challenge",
    solution: "The Solution",
    role: "Role",
    deliverables: "Deliverables",
    timeline: "Timeline",
    tools: "Tools",
    client: "Client",
    research: "Research & Discovery",
    researchProcess: "Research & Process",
    process: "Design Process",
    infoArchitecture: "Information Architecture",
    designShowcase: "Design Showcase",
    finalTakeaways: "Key Takeaways",
    businessImpact: "Business Impact",
    endOfCaseStudy: "End of Case Study",
    nextProject: "Next Project",
    backToPortfolio: "Back to Portfolio",
    projectNotFound: "Project not found",
    projectOverview: "Project Overview",
    myRole: "My Role",
    researchInsights: "Research & Insights",
    designProcess: "Design Process",
    keyInteractions: "Key Features & Interactions",
    resultsImpact: "Results & Impact",
    openProject: "Open Project",
    copyProjectLink: "Copy Link",
    linkCopied: "Link Copied",
    copyLinkFailed: "Copy failed. Please copy the page URL from your browser.",

    // About section
    aboutMe: "About Me",
    designerAndDancer: "Designer & Dancer",
    bio: "Sunghee Im is a Korean UX/UI & Visual Designer based in Vienna. Her background as a dancer and choreographer informs a practice in embodied interaction, gesture UX, and spatial design: she studies how people move through space, read feedback through the body, and build trust with technology. With 2+ years of freelance UI/UX and visual-design experience, she is applying to the Interaction Design Master's programme at FH Joanneum to deepen movement-based, immersive, and human-centred interaction research.",
    basedIn: "BASE // VIENNA, AUSTRIA",
    origin: "ROOTS // SOUTH KOREA",
    practice: "FREELANCE UI/UX & VISUAL DESIGNER // 2+ YEARS",
    interactionFocus: "EMBODIED INTERACTION · GESTURE UX · SPATIAL DESIGN",
    mastersIntent: "FH JOANNEUM // INTERACTION DESIGN MASTER APPLICANT",

    // Skills section
    skills: "Skills",
    coreCompetencies: "Core Competencies",
    designTools: "Design Tools",
    interactionDesignTools: "Interaction Design Tools",
    coreExpertise: "Core Expertise",
    interactionDesign: "Interaction Design",
    figma: "Figma",
    framer: "Framer",
    protopie: "Protopie",
    principle: "Principle",
    prototyping: "Prototyping",
    userResearch: "User Research",
    embodiedInteraction: "Embodied Interaction",
    visualDesign: "Visual Design",
    spatialComputing: "Spatial Computing",
    gestureUX: "Gesture-based UX",
    designThinking: "Design Thinking",

    // Contact section
    contact: "Contact",
    getInTouch: "Get in Touch",
    email: "Email",
    linkedin: "LinkedIn",
    behance: "Behance",
    resume: "Resume",
    downloadCV: "Download CV",
    sendAMessage: "Send a Message",
    sendMessage: "Send Message",
    name: "Name",
    message: "Message",
    send: "Send",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Your message...",

    // Slider navigation
    aboutNav: "About",
    worksNav: "Works",
    contactNav: "Contact",
    quickMenu: "Quick Menu",
    skipToProjects: "Skip to Projects",
    designerQuickAccess: "Designer Quick Access",
    dancerQuickAccess: "Dancer Quick Access",
    tutorialLabel: "Tutorial",
    tutorialMove: "← → Move through the archive",
    tutorialJump: "↑ Jump // Double tap to select",
    tutorialCrouch: "↓ Crouch // Read the space",
    tutorialConfirm: "Enter confirms the active node",
    tutorialHint: "Follow the signals, or use Quick Menu at any time",
    tutorialSkip: "ESC // Skip tutorial",
    tutorialClose: "Close tutorial",
    tutorialMobileMove: "← → Move",
    tutorialMobileJump: "↑ Jump + select",
    tutorialMobileCrouch: "↓ Crouch",
    tutorialMobileConfirm: "ENTER Select",
    tutorialMobileHint: "Quick Menu anytime",
    entryGuide: "A portfolio quest: move to explore, or use Skip to view projects now.",

    // Side-scroll run/select screen
    controls: "Controls",
    moveHint: "Move",
    jumpHint: "Jump",
    crouchHint: "Crouch",
    pressToSelect: "Press ENTER to select",
    projectsExplored: "Projects explored",
  },
  kr: {
    // Main page
    player01: "플레이어 01",
    uxuiDesigner: "UX 디자이너",
    designerSubtitle: "시스템, 인터페이스, 흐름, 정밀함",
    player02: "플레이어 02",
    dancer: "댄서",
    dancerSubtitle: "리듬, 존재감, 배틀 에너지",
    exploreDesignerPortfolio: "UX 디자이너 포트폴리오 탐색",
    exploreDancerPortfolio: "댄서 포트폴리오 탐색",
    backToSelect: "선택으로 돌아가기",
    chooseYourPlayer: "플레이어를 선택하세요",
    hoverToPreview: "호버하여 미리 보기",
    ready: "준비 완료",
    loadingPlayer: "플레이어 로딩 중",
    archiveAccess: "아카이브 입장",

    // Navigation
    backToWorks: "작품으로 돌아가기",
    back: "뒤로",
    caseStudy: "케이스 스터디",
    player01Archive: "플레이어 01 아카이브",
    player02Archive: "플레이어 02 아카이브",
    designPortfolio: "디자인 포트폴리오",
    dancePortfolio: "댄스 포트폴리오",
    project: "프로젝트",

    // Case Study sections
    problem: "문제점",
    solution: "해결책",
    role: "역할",
    deliverables: "결과물",
    timeline: "기간",
    tools: "도구",
    client: "클라이언트",
    research: "리서치 & 발견",
    researchProcess: "리서치 & 프로세스",
    process: "디자인 프로세스",
    infoArchitecture: "정보 구조",
    designShowcase: "디자인 쇼케이스",
    finalTakeaways: "핵심 배운 점",
    businessImpact: "비즈니스 임팩트",
    endOfCaseStudy: "케이스 스터디 끝",
    nextProject: "다음 프로젝트",
    backToPortfolio: "포트폴리오로 돌아가기",
    projectNotFound: "프로젝트를 찾을 수 없습니다",
    projectOverview: "프로젝트 개요",
    myRole: "나의 역할",
    researchInsights: "리서치 & 인사이트",
    designProcess: "디자인 프로세스",
    keyInteractions: "핵심 기능 & 인터랙션",
    resultsImpact: "결과 & 임팩트",
    openProject: "프로젝트 열기",
    copyProjectLink: "링크 복사",
    linkCopied: "링크 복사됨",
    copyLinkFailed: "복사에 실패했습니다. 브라우저 주소를 직접 복사해 주세요.",

    // About section
    aboutMe: "소개",
    designerAndDancer: "디자이너 & 댄서",
    bio: "임성희는 오스트리아 비엔나를 기반으로 활동하는 한국 출신 UX/UI & 비주얼 디자이너입니다. 무용수와 안무가로서의 배경은 embodied interaction, gesture UX, spatial design 실천으로 이어집니다. 사람들이 공간을 이동하고, 신체로 피드백을 읽으며, 기술과 신뢰를 형성하는 방식을 관찰해 인간 중심의 인터랙션을 설계합니다. 프리랜스 UI/UX·비주얼 디자인 경력 2년 이상을 바탕으로, movement-based·immersive·human-centred interaction 연구를 심화하기 위해 FH Joanneum Interaction Design 석사 과정에 지원합니다.",
    basedIn: "BASE // 오스트리아 비엔나",
    origin: "ROOTS // 대한민국",
    practice: "프리랜스 UI/UX & 비주얼 디자이너 // 2년+",
    interactionFocus: "EMBODIED INTERACTION · GESTURE UX · SPATIAL DESIGN",
    mastersIntent: "FH JOANNEUM // INTERACTION DESIGN 석사 지원자",

    // Skills section
    skills: "스킬",
    coreCompetencies: "핵심 역량",
    designTools: "디자인 도구",
    interactionDesignTools: "인터랙션 디자인 도구",
    coreExpertise: "핵심 전문성",
    interactionDesign: "인터랙션 디자인",
    figma: "Figma",
    framer: "Framer",
    protopie: "Protopie",
    principle: "Principle",
    prototyping: "프로토타이핑",
    userResearch: "사용자 리서치",
    embodiedInteraction: "Embodied Interaction",
    visualDesign: "비주얼 디자인",
    spatialComputing: "공간 컴퓨팅",
    gestureUX: "제스처 기반 UX",
    designThinking: "디자인 씽킹",

    // Contact section
    contact: "연락처",
    getInTouch: "연락하기",
    email: "이메일",
    linkedin: "LinkedIn",
    behance: "Behance",
    resume: "이력서",
    downloadCV: "CV 다운로드",
    sendAMessage: "메시지 보내기",
    sendMessage: "메시지 보내기",
    name: "이름",
    message: "메시지",
    send: "보내기",
    namePlaceholder: "이름을 입력하세요",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "메시지를 입력하세요...",

    // Slider navigation
    aboutNav: "소개",
    worksNav: "작품",
    contactNav: "연락처",
    quickMenu: "빠른 메뉴",
    skipToProjects: "프로젝트 바로가기",
    designerQuickAccess: "디자이너 빠른 접근",
    dancerQuickAccess: "댄서 빠른 접근",
    tutorialLabel: "튜토리얼",
    tutorialMove: "← → 아카이브를 이동",
    tutorialJump: "↑ 점프 // 두 번 눌러 선택",
    tutorialCrouch: "↓ 앉기 // 공간을 읽기",
    tutorialConfirm: "Enter로 활성 노드 선택",
    tutorialHint: "신호를 따라가거나 언제든 빠른 메뉴를 사용하세요",
    tutorialSkip: "ESC를 눌러 건너뛰기",
    tutorialClose: "튜토리얼 닫기",
    tutorialMobileMove: "← → 이동",
    tutorialMobileJump: "↑ 점프·선택",
    tutorialMobileCrouch: "↓ 앉기",
    tutorialMobileConfirm: "ENTER 선택",
    tutorialMobileHint: "빠른 메뉴 이용 가능",
    entryGuide: "포트폴리오 퀘스트입니다. 움직여 탐색하거나 프로젝트 바로가기를 사용하세요.",

    // Side-scroll run/select screen
    controls: "조작법",
    moveHint: "이동",
    jumpHint: "점프",
    crouchHint: "숙이기",
    pressToSelect: "엔터를 눌러 선택",
    projectsExplored: "탐색한 프로젝트",
  },
  de: {
    // Main page
    player01: "SPIELER 01",
    uxuiDesigner: "UX-DESIGNER",
    designerSubtitle: "Systeme, Schnittstellen, Fluss, Präzision",
    player02: "SPIELER 02",
    dancer: "TÄNZER",
    dancerSubtitle: "Rhythmus, Präsenz, Battle-Energie",
    exploreDesignerPortfolio: "UX-Designer-Portfolio erkunden",
    exploreDancerPortfolio: "Tänzer-Portfolio erkunden",
    backToSelect: "Zurück zur Auswahl",
    chooseYourPlayer: "Wähle deinen Spieler",
    hoverToPreview: "Vorschau beim Darüberfahren",
    ready: "Bereit",
    loadingPlayer: "Spieler wird geladen",
    archiveAccess: "Archivzugang",

    // Navigation
    backToWorks: "Zurück zu Werken",
    back: "Zurück",
    caseStudy: "Fallstudie",
    player01Archive: "Spieler-01-Archiv",
    player02Archive: "Spieler-02-Archiv",
    designPortfolio: "Design-Portfolio",
    dancePortfolio: "Tanz-Portfolio",
    project: "Projekt",

    // Case Study sections
    problem: "Die Herausforderung",
    solution: "Die Lösung",
    role: "Rolle",
    deliverables: "Ergebnisse",
    timeline: "Zeitraum",
    tools: "Werkzeuge",
    client: "Kunde",
    research: "Forschung & Entdeckung",
    researchProcess: "Forschung & Prozess",
    process: "Designprozess",
    infoArchitecture: "Informationsarchitektur",
    designShowcase: "Design-Präsentation",
    finalTakeaways: "Wichtigste Erkenntnisse",
    businessImpact: "Business Impact",
    endOfCaseStudy: "Ende der Fallstudie",
    nextProject: "Nächstes Projekt",
    backToPortfolio: "Zurück zum Portfolio",
    projectNotFound: "Projekt nicht gefunden",
    projectOverview: "Projektüberblick",
    myRole: "Meine Rolle",
    researchInsights: "Research & Erkenntnisse",
    designProcess: "Designprozess",
    keyInteractions: "Kernfunktionen & Interaktionen",
    resultsImpact: "Ergebnisse & Wirkung",
    openProject: "Projekt öffnen",
    copyProjectLink: "Link kopieren",
    linkCopied: "Link kopiert",
    copyLinkFailed: "Kopieren fehlgeschlagen. Bitte kopiere die Seiten-URL im Browser.",

    // About section
    aboutMe: "Über mich",
    designerAndDancer: "Designerin & Tänzerin",
    bio: "Sunghee Im ist eine koreanische UX/UI- & Visual Designerin mit Sitz in Wien. Ihr Hintergrund als Tänzerin und Choreografin prägt eine Praxis in embodied interaction, Gesture UX und Spatial Design: Sie untersucht, wie Menschen sich durch Raum bewegen, Feedback über den Körper lesen und Vertrauen in Technologie aufbauen. Mit mehr als zwei Jahren freiberuflicher Erfahrung in UI/UX- und Visual Design bewirbt sie sich für den Master Interaction Design an der FH Joanneum, um bewegungsbasierte, immersive und menschenzentrierte Interaktionsforschung zu vertiefen.",
    basedIn: "BASE // WIEN, ÖSTERREICH",
    origin: "ROOTS // SÜDKOREA",
    practice: "FREELANCE UI/UX & VISUAL DESIGN // 2+ JAHRE",
    interactionFocus: "EMBODIED INTERACTION · GESTURE UX · SPATIAL DESIGN",
    mastersIntent: "FH JOANNEUM // INTERACTION DESIGN MASTER BEWERBUNG",

    // Skills section
    skills: "Fähigkeiten",
    coreCompetencies: "Kernkompetenzen",
    designTools: "Design-Tools",
    interactionDesignTools: "Interaction-Design-Tools",
    coreExpertise: "Kernkompetenzen",
    interactionDesign: "Interaction Design",
    figma: "Figma",
    framer: "Framer",
    protopie: "Protopie",
    principle: "Principle",
    prototyping: "Prototyping",
    userResearch: "Benutzerforschung",
    embodiedInteraction: "Embodied Interaction",
    visualDesign: "Visuelles Design",
    spatialComputing: "Spatial Computing",
    gestureUX: "Gesturebasierte UX",
    designThinking: "Design Thinking",

    // Contact section
    contact: "Kontakt",
    getInTouch: "Kontakt aufnehmen",
    email: "E-Mail",
    linkedin: "LinkedIn",
    behance: "Behance",
    resume: "Lebenslauf",
    downloadCV: "CV herunterladen",
    sendAMessage: "Nachricht senden",
    sendMessage: "Nachricht senden",
    name: "Name",
    message: "Nachricht",
    send: "Senden",
    namePlaceholder: "Dein Name",
    emailPlaceholder: "deine@email.com",
    messagePlaceholder: "Deine Nachricht...",

    // Slider navigation
    aboutNav: "Über",
    worksNav: "Werke",
    contactNav: "Kontakt",
    quickMenu: "Schnellmenü",
    skipToProjects: "Zu Projekten springen",
    designerQuickAccess: "Designer-Schnellzugriff",
    dancerQuickAccess: "Tänzer-Schnellzugriff",
    tutorialLabel: "Tutorial",
    tutorialMove: "← → Durch das Archiv bewegen",
    tutorialJump: "↑ Springen // Doppeltippen zum Auswählen",
    tutorialCrouch: "↓ Ducken // Den Raum lesen",
    tutorialConfirm: "Enter bestätigt den aktiven Knoten",
    tutorialHint: "Folge den Signalen oder nutze jederzeit das Schnellmenü",
    tutorialSkip: "ESC drücken zum Überspringen",
    tutorialClose: "Tutorial schließen",
    tutorialMobileMove: "← → Bewegen",
    tutorialMobileJump: "↑ Springen",
    tutorialMobileCrouch: "↓ Ducken",
    tutorialMobileConfirm: "ENTER wählen",
    tutorialMobileHint: "Schnellmenü verfügbar",
    entryGuide: "Eine Portfolio-Quest: Erkunden Sie mit Bewegung oder springen Sie direkt zu Projekten.",

    // Side-scroll run/select screen
    controls: "Steuerung",
    moveHint: "Bewegen",
    jumpHint: "Springen",
    crouchHint: "Ducken",
    pressToSelect: "ENTER drücken zum Auswählen",
    projectsExplored: "Erkundete Projekte",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("language") as Language | null;
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
