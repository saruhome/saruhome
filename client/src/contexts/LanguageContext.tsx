import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "kr" | "de";

export const translations = {
  en: {
    // Main page
    player01: "PLAYER 01",
    uxuiDesigner: "UX/UI DESIGNER",
    designerSubtitle: "Systems, interfaces, flow, precision",
    player02: "PLAYER 02",
    dancer: "DANCER",
    dancerSubtitle: "Rhythm, presence, battle energy",
    exploreDesignerPortfolio: "Explore UX/UI Designer portfolio",
    exploreDancerPortfolio: "Explore Dancer portfolio",

    // Navigation
    backToWorks: "Back to Works",
    back: "Back",
    caseStudy: "Case Study",

    // Projects
    kslang: "K-Slang",
    kslangSubtitle: "Korean Neologism Learning Platform",
    sokdak: "Sok-Dak",
    sokdakSubtitle: "Mental Health Counseling Platform",
    smartWash: "Smart Wash",
    smartWashSubtitle: "Smart Home Appliance UX/UI",
    seekAndSight: "Seek and Sight",
    seekAndSightSubtitle: "Inclusive STEAM Literacy Platform",
    locaverse: "Locaverse",
    locaverseSubtitle: "Spatial Collaboration Platform",
    ecotek: "ecotek",
    ecotekSubtitle: "Sustainable Brand & Digital Experience",

    // Case Study sections
    problem: "The Challenge",
    solution: "The Solution",
    role: "Role",
    deliverables: "Deliverables",
    timeline: "Timeline",
    tools: "Tools",
    client: "Client",
    research: "Research & Discovery",
    process: "Design Process",
    infoArchitecture: "Information Architecture",
    designShowcase: "Design Showcase",
    finalTakeaways: "Key Takeaways",
    nextProject: "Next Project",
    backToPortfolio: "Back to Portfolio",

    // About section
    aboutMe: "About Me",
    bio: "Sunghee Im, a UX/UI Designer based in Vienna, originally from South Korea. With a unique background in movement and choreography, I specialize in embodied interaction, gesture-based UX, and spatial computing. My dance experience taught me how the body naturally interacts with space and technology — this insight drives my design process to create intuitive, human-centered digital experiences. Currently freelancing as UI/UX Designer & Visual Strategist (2+ years), I am applying to the Master's in Interaction Design at FH Joanneum to deepen my research in movement-based design and immersive experiences.",

    // Skills section
    skills: "Skills",
    interactionDesignTools: "Interaction Design Tools",
    coreExpertise: "Core Expertise",
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
    email: "Email",
    linkedin: "LinkedIn",
    behance: "Behance",
    downloadCV: "Download CV",
    sendMessage: "Send Message",
    message: "Message",
    send: "Send",

    // Slider navigation
    aboutNav: "About",
    worksNav: "Works",
    contactNav: "Contact",
  },
  kr: {
    // Main page
    player01: "플레이어 01",
    uxuiDesigner: "UX/UI 디자이너",
    designerSubtitle: "시스템, 인터페이스, 흐름, 정밀함",
    player02: "플레이어 02",
    dancer: "댄서",
    dancerSubtitle: "리듬, 존재감, 배틀 에너지",
    exploreDesignerPortfolio: "UX/UI 디자이너 포트폴리오 탐색",
    exploreDancerPortfolio: "댄서 포트폴리오 탐색",

    // Navigation
    backToWorks: "작품으로 돌아가기",
    back: "뒤로",
    caseStudy: "케이스 스터디",

    // Projects
    kslang: "K-Slang",
    kslangSubtitle: "한국 신조어 학습 플랫폼",
    sokdak: "속닥",
    sokdakSubtitle: "정신 건강 상담 플랫폼",
    smartWash: "Smart Wash",
    smartWashSubtitle: "스마트 홈 가전 UX/UI",
    seekAndSight: "Seek and Sight",
    seekAndSightSubtitle: "포용적 STEAM 문해력 플랫폼",
    locaverse: "Locaverse",
    locaverseSubtitle: "공간 협업 플랫폼",
    ecotek: "ecotek",
    ecotekSubtitle: "지속 가능한 브랜드 & 디지털 경험",

    // Case Study sections
    problem: "문제점",
    solution: "해결책",
    role: "역할",
    deliverables: "결과물",
    timeline: "기간",
    tools: "도구",
    client: "클라이언트",
    research: "리서치 & 발견",
    process: "디자인 프로세스",
    infoArchitecture: "정보 구조",
    designShowcase: "디자인 쇼케이스",
    finalTakeaways: "핵심 배운 점",
    nextProject: "다음 프로젝트",
    backToPortfolio: "포트폴리오로 돌아가기",

    // About section
    aboutMe: "소개",
    bio: "오스트리아 비엔나를 기반으로 활동하는 UX/UI 디자이너 임성희입니다. 무용과 안무 배경을 바탕으로 embodied interaction, gesture-based UX, spatial computing을 전문으로 합니다. 제 무용 경험은 신체가 공간과 기술과 어떻게 자연스럽게 상호작용하는지 이해하게 해주었고, 이는 직관적이고 인간 중심의 디지털 경험을 만드는 제 디자인 프로세스를 이끕니다. 현재 UI/UX 디자이너 & 비주얼 스트래티지스트로 프리랜싱 중이며(2년+), FH Joanneum의 Interaction Design 석사 과정에 지원하여 movement-based design과 immersive experiences에 대한 연구를 심화하고자 합니다.",

    // Skills section
    skills: "스킬",
    interactionDesignTools: "인터랙션 디자인 도구",
    coreExpertise: "핵심 전문성",
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
    email: "이메일",
    linkedin: "LinkedIn",
    behance: "Behance",
    downloadCV: "CV 다운로드",
    sendMessage: "메시지 보내기",
    message: "메시지",
    send: "보내기",

    // Slider navigation
    aboutNav: "소개",
    worksNav: "작품",
    contactNav: "연락처",
  },
  de: {
    // Main page
    player01: "SPIELER 01",
    uxuiDesigner: "UX/UI-DESIGNER",
    designerSubtitle: "Systeme, Schnittstellen, Fluss, Präzision",
    player02: "SPIELER 02",
    dancer: "TÄNZER",
    dancerSubtitle: "Rhythmus, Präsenz, Battle-Energie",
    exploreDesignerPortfolio: "UX/UI-Designer-Portfolio erkunden",
    exploreDancerPortfolio: "Tänzer-Portfolio erkunden",

    // Navigation
    backToWorks: "Zurück zu Werken",
    back: "Zurück",
    caseStudy: "Fallstudie",

    // Projects
    kslang: "K-Slang",
    kslangSubtitle: "Koreanische Neologismus-Lernplattform",
    sokdak: "Sok-Dak",
    sokdakSubtitle: "Plattform für psychische Gesundheit",
    smartWash: "Smart Wash",
    smartWashSubtitle: "Smart-Home-Geräte-UX/UI",
    seekAndSight: "Seek and Sight",
    seekAndSightSubtitle: "Inklusive STEAM-Literaturplattform",
    locaverse: "Locaverse",
    locaverseSubtitle: "Räumliche Kollaborationsplattform",
    ecotek: "ecotek",
    ecotekSubtitle: "Nachhaltige Marke & digitale Erfahrung",

    // Case Study sections
    problem: "Die Herausforderung",
    solution: "Die Lösung",
    role: "Rolle",
    deliverables: "Ergebnisse",
    timeline: "Zeitraum",
    tools: "Werkzeuge",
    client: "Kunde",
    research: "Forschung & Entdeckung",
    process: "Designprozess",
    infoArchitecture: "Informationsarchitektur",
    designShowcase: "Design-Präsentation",
    finalTakeaways: "Wichtigste Erkenntnisse",
    nextProject: "Nächstes Projekt",
    backToPortfolio: "Zurück zum Portfolio",

    // About section
    aboutMe: "Über mich",
    bio: "Sunghee Im, UX/UI-Designerin mit Sitz in Wien, ursprünglich aus Südkorea. Mit einem einzigartigen Hintergrund in Bewegung und Choreografie spezialisiere ich mich auf embodied interaction, gesturebasierte UX und spatial computing. Meine Tanzerfahrung hat mir gelehrt, wie der Körper natürlich mit Raum und Technologie interagiert – diese Erkenntnis treibt meinen Designprozess an, um intuitive, menschenzentrierte digitale Erfahrungen zu schaffen. Ich arbeite derzeit freiberuflich als UI/UX-Designerin & Visual Strategistin (2+ Jahre) und bewerbe mich um den Master in Interaction Design an der FH Joanneum, um meine Forschung in bewegungsbasiertem Design und immersiven Erfahrungen zu vertiefen.",

    // Skills section
    skills: "Fähigkeiten",
    interactionDesignTools: "Interaction-Design-Tools",
    coreExpertise: "Kernkompetenzen",
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
    email: "E-Mail",
    linkedin: "LinkedIn",
    behance: "Behance",
    downloadCV: "CV herunterladen",
    sendMessage: "Nachricht senden",
    message: "Nachricht",
    send: "Senden",

    // Slider navigation
    aboutNav: "Über",
    worksNav: "Werke",
    contactNav: "Kontakt",
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
