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
    backToSelect: "Back to Select",

    // Navigation
    backToWorks: "Back to Works",
    back: "Back",
    caseStudy: "Case Study",
    player01Archive: "Player 01 Archive",
    designPortfolio: "Design Portfolio",
    project: "Project",

    // Case Study sections
    problem: "The Challenge",
    solution: "The Solution",
    role: "Role",
    timeline: "Timeline",
    tools: "Tools",
    client: "Client",
    researchProcess: "Research & Process",
    finalTakeaways: "Key Takeaways",
    endOfCaseStudy: "End of Case Study",
    projectNotFound: "Project not found",

    // About section
    aboutMe: "About Me",
    designerAndDancer: "Designer & Dancer",
    bio: "Sunghee Im, a UX Designer based in Vienna, originally from South Korea. With a unique background in movement and choreography, I specialize in embodied interaction, gesture-based UX, and spatial computing. My dance experience taught me how the body naturally interacts with space and technology — this insight drives my design process to create intuitive, human-centered digital experiences. Currently freelancing as UX Designer & Visual Strategist (2+ years), I am applying to the Master's in Interaction Design at FH Joanneum to deepen my research in movement-based design and immersive experiences.",

    // Skills section
    skills: "Skills",
    coreCompetencies: "Core Competencies",
    designTools: "Design Tools",
    coreExpertise: "Core Expertise",
    interactionDesign: "Interaction Design",
    userResearch: "User Research",
    embodiedInteraction: "Embodied Interaction",
    visualDesign: "Visual Design",

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
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Your message...",

    // Slider navigation
    aboutNav: "About",
    contactNav: "Contact",

    // Side-scroll run/select screen
    controls: "Controls",
    moveHint: "Move",
    jumpHint: "Jump",
    crouchHint: "Crouch",
    pressToSelect: "Press ENTER to select",
  },
  kr: {
    // Main page
    player01: "플레이어 01",
    uxuiDesigner: "UX 디자이너",
    designerSubtitle: "시스템, 인터페이스, 흐름, 정밀함",
    player02: "플레이어 02",
    dancer: "댄서",
    dancerSubtitle: "리듬, 존재감, 배틀 에너지",
    backToSelect: "선택으로 돌아가기",

    // Navigation
    backToWorks: "작품으로 돌아가기",
    back: "뒤로",
    caseStudy: "케이스 스터디",
    player01Archive: "플레이어 01 아카이브",
    designPortfolio: "디자인 포트폴리오",
    project: "프로젝트",

    // Case Study sections
    problem: "문제점",
    solution: "해결책",
    role: "역할",
    timeline: "기간",
    tools: "도구",
    client: "클라이언트",
    researchProcess: "리서치 & 프로세스",
    finalTakeaways: "핵심 배운 점",
    endOfCaseStudy: "케이스 스터디 끝",
    projectNotFound: "프로젝트를 찾을 수 없습니다",

    // About section
    aboutMe: "소개",
    designerAndDancer: "디자이너 & 댄서",
    bio: "오스트리아 비엔나를 기반으로 활동하는 UX 디자이너 임성희입니다. 무용과 안무 배경을 바탕으로 embodied interaction, gesture-based UX, spatial computing을 전문으로 합니다. 제 무용 경험은 신체가 공간과 기술과 어떻게 자연스럽게 상호작용하는지 이해하게 해주었고, 이는 직관적이고 인간 중심의 디지털 경험을 만드는 제 디자인 프로세스를 이끕니다. 현재 UX 디자이너 & 비주얼 스트래티지스트로 프리랜싱 중이며(2년+), FH Joanneum의 Interaction Design 석사 과정에 지원하여 movement-based design과 immersive experiences에 대한 연구를 심화하고자 합니다.",

    // Skills section
    skills: "스킬",
    coreCompetencies: "핵심 역량",
    designTools: "디자인 도구",
    coreExpertise: "핵심 전문성",
    interactionDesign: "인터랙션 디자인",
    userResearch: "사용자 리서치",
    embodiedInteraction: "Embodied Interaction",
    visualDesign: "비주얼 디자인",

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
    namePlaceholder: "이름을 입력하세요",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "메시지를 입력하세요...",

    // Slider navigation
    aboutNav: "소개",
    contactNav: "연락처",

    // Side-scroll run/select screen
    controls: "조작법",
    moveHint: "이동",
    jumpHint: "점프",
    crouchHint: "숙이기",
    pressToSelect: "엔터를 눌러 선택",
  },
  de: {
    // Main page
    player01: "SPIELER 01",
    uxuiDesigner: "UX-DESIGNER",
    designerSubtitle: "Systeme, Schnittstellen, Fluss, Präzision",
    player02: "SPIELER 02",
    dancer: "TÄNZER",
    dancerSubtitle: "Rhythmus, Präsenz, Battle-Energie",
    backToSelect: "Zurück zur Auswahl",

    // Navigation
    backToWorks: "Zurück zu Werken",
    back: "Zurück",
    caseStudy: "Fallstudie",
    player01Archive: "Spieler-01-Archiv",
    designPortfolio: "Design-Portfolio",
    project: "Projekt",

    // Case Study sections
    problem: "Die Herausforderung",
    solution: "Die Lösung",
    role: "Rolle",
    timeline: "Zeitraum",
    tools: "Werkzeuge",
    client: "Kunde",
    researchProcess: "Forschung & Prozess",
    finalTakeaways: "Wichtigste Erkenntnisse",
    endOfCaseStudy: "Ende der Fallstudie",
    projectNotFound: "Projekt nicht gefunden",

    // About section
    aboutMe: "Über mich",
    designerAndDancer: "Designerin & Tänzerin",
    bio: "Sunghee Im, UX-Designerin mit Sitz in Wien, ursprünglich aus Südkorea. Mit einem einzigartigen Hintergrund in Bewegung und Choreografie spezialisiere ich mich auf embodied interaction, gesturebasierte UX und spatial computing. Meine Tanzerfahrung hat mir gelehrt, wie der Körper natürlich mit Raum und Technologie interagiert – diese Erkenntnis treibt meinen Designprozess an, um intuitive, menschenzentrierte digitale Erfahrungen zu schaffen. Ich arbeite derzeit freiberuflich als UX-Designerin & Visual Strategistin (2+ Jahre) und bewerbe mich um den Master in Interaction Design an der FH Joanneum, um meine Forschung in bewegungsbasiertem Design und immersiven Erfahrungen zu vertiefen.",

    // Skills section
    skills: "Fähigkeiten",
    coreCompetencies: "Kernkompetenzen",
    designTools: "Design-Tools",
    coreExpertise: "Kernkompetenzen",
    interactionDesign: "Interaction Design",
    userResearch: "Benutzerforschung",
    embodiedInteraction: "Embodied Interaction",
    visualDesign: "Visuelles Design",

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
    namePlaceholder: "Dein Name",
    emailPlaceholder: "deine@email.com",
    messagePlaceholder: "Deine Nachricht...",

    // Slider navigation
    aboutNav: "Über",
    contactNav: "Kontakt",

    // Side-scroll run/select screen
    controls: "Steuerung",
    moveHint: "Bewegen",
    jumpHint: "Springen",
    crouchHint: "Ducken",
    pressToSelect: "ENTER drücken zum Auswählen",
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
