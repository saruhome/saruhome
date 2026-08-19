import { useState, useEffect, ReactNode } from "react";
import HorizontalSlider from "./HorizontalSlider";
import { useRoleTheme } from "../contexts/RoleContext";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { assetUrl } from "../lib/assetUrl";
import { applicationCaseStudyContent, type ApplicationCaseStudy } from "../lib/applicationCaseStudyContent";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useGameProgress } from "../contexts/GameProgressContext";

/**
 * Design System — Pixel Command Console
 * Hard-edge 16-bit game panels with Cyan / Magenta signal light and readable project data.
 */

const CASE_STUDY_CONSOLE = assetUrl("pixel-case-study-console_be8cc839.png", "pixel-case-study-console.png");

function useTerminalText(text: string, speed = 11) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let index = 0;
    setTyped("");
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [speed, text]);
  return typed;
}

function TerminalText({ text, speed = 11 }: { text: string; speed?: number }) {
  const typed = useTerminalText(text, speed);
  const isTyping = typed.length < text.length;
  return <span aria-label={text}><span aria-hidden="true">{typed}{isTyping && <i className="terminal-cursor">▌</i>}</span></span>;
}

type CaseStudyProject = {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  deliverables: string[];
  timeline: string;
  tools?: string;
  client?: string;
  problem: string;
  solution: string;
  research: {
    title: string;
    description: string;
  }[];
  infoArchitecture: {
    title: string;
    description: string;
    imageUrl?: string;
  };
  designShowcase: {
    title: string;
    description: string;
    imageUrl?: string;
  }[];
  takeaways: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
};

const caseStudyDataByLang: Record<Language, Record<string, CaseStudyProject>> = {
  en: {
    "01": {
      id: "01",
      title: "Sokdak",
      subtitle: "Korean Slang & Neologism Learning App",
      role: "UX/UI Designer",
      deliverables: [
        "Concept & Character Design",
        "Brand Identity",
        "UI Design",
        "Interactive Prototype",
      ],
      timeline: "Ongoing",
      tools: "Figma",
      client: "Team Project",
      problem:
        "Foreign learners study Korean from textbooks, but real Koreans speak in slang and neologisms — ㄱㄱ, 노잼, 갬성, 존맛, 갓생, 두쫀쿠, 알잘딱깔센 — that no textbook teaches, leaving learners staring at a phone full of words they've never seen and no idea what any of it means.",
      solution:
        "Designed Sokdak, a Korean slang dictionary app fronted by a friendly tiger mascot, that surfaces trending expressions with plain-language meanings and real cultural context (for example, tracing '리즈' back to Leeds United, since the term for someone at the peak of their looks literally comes from the football club), plus a community feed for practicing new slang in context.",
      research: [
        {
          title: "Slang & Neologism Curation",
          description:
            "Structured entries around meaning, cultural context, and example usage instead of a flat dictionary definition, since most slang only makes sense with the story behind it.",
        },
        {
          title: "Character & Brand Identity",
          description:
            "Designed a tiger mascot and wordmark to give the app a warm, approachable identity for a topic (slang) that can otherwise feel intimidating to learners.",
        },
        {
          title: "Conversational UI Patterns",
          description:
            "Built the interface around chat-style word cards and a community tab, mirroring how slang actually gets used and shared rather than a static reference list.",
        },
      ],
      infoArchitecture: {
        title: "App Structure",
        description:
          "Structured the home feed around 스불재 (trending expressions), 새로운 신조어 (new coinages), 인싸 표현 (in-group expressions), and 커뮤니티 (community), so learners can browse by how current or social an expression is rather than alphabetically.",
      },
      designShowcase: [
        {
          title: "Home Feed & Background",
          description:
            "The landing view opens on the problem itself: a scattered cloud of real slang words (레전드, 존맛, 노잼, 두쫀쿠, 알잘딱깔센, 갓생) around a confused learner, before dropping into a scannable feed of trending and newly coined terms tagged by category.",
          imageUrl: "/images/sokdak-hero.jpg",
        },
        {
          title: "Word Detail View",
          description:
            "Each entry pairs the plain-language meaning with real cultural context — for example, explaining that '리즈' (\"Leez\") originated from Leeds United and now means someone at the peak of their looks.",
        },
        {
          title: "Community Tab",
          description:
            "A space for learners to see and discuss slang used in real conversations, turning a static dictionary into an ongoing feed.",
        },
      ],
      takeaways: [
        "Slang only lands when it comes with the cultural story attached — a bare definition isn't enough.",
        "A mascot-led, chat-style presentation makes an intimidating topic (native slang) feel approachable.",
        "Framing the app around a community feed rather than a lookup tool matches how slang actually spreads.",
      ],
    },
    "02": {
      id: "02",
      title: "Seek and Sight",
      subtitle: "Inclusive STEAM Literacy Platform for Children",
      role: "UX/UI Designer, Social Media Designer",
      deliverables: [
        "Landing Page UX/UI Design",
        "Character & Brand System",
        "Weekly Social Media Content",
      ],
      timeline: "Ongoing (2025–present)",
      tools: "Figma",
      client: "Hope For Tomorrow / Seek and Sight",
      problem:
        "Children with learning differences are often underserved by generic edtech products that aren't built for accessibility or personalized engagement. Founder Paula Johnson, a social worker with 27+ years of experience, saw firsthand how kids get left behind when literacy tools don't adapt to them.",
      solution:
        "Designed the Seek and Sight landing page and product UX around three audiences — parents, educators, and childcare providers — anchored by a direct comparison between traditional worksheet-based learning and Seek and Sight's adaptive, game-based, AI-guided approach, plus a cast of friendly mascot characters carried across the app and weekly social content.",
      research: [
        {
          title: "Audience Segmentation",
          description:
            "Structured messaging and entry points around three distinct audiences — parents, educators, and childcare providers — each with different needs and decision criteria.",
        },
        {
          title: "Character & Brand System",
          description:
            "Designed a set of mascot characters (Ellie, Tim, Nova, Echo, Sunny, Math), each with multiple emotional/gesture states, used consistently across the app and social channels to build recognition with young learners.",
        },
        {
          title: "Ongoing Content Design",
          description:
            "Produced weekly social media content kits (carousels, spotlight posts, Instagram assets) to support continuous community engagement and keep the brand consistent week to week.",
        },
      ],
      infoArchitecture: {
        title: "Landing Page Structure",
        description:
          "Structured the site as What is Seek and Sight → Who it's for (Parents / Educators / Childcare Providers) → Mission (Break Down Barriers, Promote Inclusivity, Unlock Potential) → Why Choose Seek and Sight (a direct Traditional Learning vs. Seek and Sight comparison) → Testimonials → App download, giving both parents and institutional buyers a clear path to understanding the product.",
      },
      designShowcase: [
        {
          title: "Landing Page Hero & Mission",
          description:
            "\"Empowering Young Learners Through STEAM and Sight Words\" — an inclusive, game-based literacy platform for children ages 2–7, built around game-based learning, critical thinking, personalized paths, and real-time progress tracking.",
          imageUrl: "/images/seekandsight-hifi.jpg",
        },
        {
          title: "Traditional vs. Seek and Sight",
          description:
            "A side-by-side comparison table contrasting one-size-fits-all worksheets against Seek and Sight's adaptivity, engagement, support, and progress monitoring — built to persuade non-technical stakeholders quickly.",
        },
        {
          title: "Character System",
          description:
            "A consistent cast of mascot characters used across the product and every week's social content, giving young learners familiar faces to follow.",
        },
      ],
      takeaways: [
        "Designing for three audiences at once (parents, educators, providers) forces a clearer information hierarchy than a single-persona product needs.",
        "A consistent character system carries brand recognition further than one-off illustration when content ships weekly.",
        "A direct before/after comparison table communicates value to non-technical stakeholders faster than a feature list.",
      ],
    },
    "03": {
      id: "03",
      title: "Locaverse GmbH",
      subtitle: "Business.Locaverse.at — Lead-Gen Landing Page Redesign",
      role: "UX/UI Designer, Intern",
      deliverables: [
        "Landing Page UX/UI Redesign",
        "Before & After Comparison",
        "Lead-Gen Funnel Design",
        "Interactive Prototype",
      ],
      timeline: "3 months (Jul–Sep 2023)",
      tools: "Figma, Photoshop",
      client: "Locaverse GmbH",
      problem:
        "Locaverse.at helps independent mobile-service and delivery providers get discovered locally, but its business-acquisition landing page wasn't converting — the value of the free lead-generation report wasn't clear, and the page's structure and visual hierarchy were working against sign-ups.",
      solution:
        "Redesigned the Business.Locaverse.at landing page end to end around a single clear call-to-action (a free \"Expertenreport\" download): restructured the value proposition into scannable modules — trust stats (130+ industries, 1,200+ unique listings, 40,000+ monthly visitors), founder credibility, and a clear step-by-step onboarding path — and produced a full before/after comparison and interactive prototype in Figma.",
      research: [
        {
          title: "Before/After Audit",
          description:
            "Compared the existing landing page against the redesign to identify exactly where copy, hierarchy, and visual noise were losing potential leads.",
        },
        {
          title: "Conversion-Focused Layout",
          description:
            "Rebuilt the page around a single lead-capture form (the free report download) instead of several competing calls-to-action.",
        },
        {
          title: "Founder Credibility Section",
          description:
            "Added dedicated founder profiles (Mario Märzinger, Michael Pisnyachevskiy) alongside recognizable partner logos (REWE, Home24, ROCKET INTERNET) to build trust with prospective business partners.",
        },
      ],
      infoArchitecture: {
        title: "Landing Page Structure",
        description:
          "Restructured the page into a clear funnel: Hero value proposition → Core services (Mobile Dienstleister / Lieferservices) → Trust stats → Concrete steps to get started → Founder credibility → Free report lead magnet → Video overview → Social proof (Trustpilot, press badges).",
        imageUrl: "/images/locaverse-hero.jpg",
      },
      designShowcase: [
        {
          title: "Hero & Core Value Proposition",
          description:
            "Rebuilt the hero to lead with the core benefit — digital customer acquisition for mobile service and delivery providers — instead of a generic company introduction.",
        },
        {
          title: "Free Report Lead-Gen Module (\"Kostenloser Expertenreport\")",
          description:
            "A dedicated landing page for the free lead-magnet ebook, isolated from the rest of the site, built around four scannable benefit points: the top 3 marketing mistakes independent providers make, how to win free visibility in your service area via Locaverse.at, the biggest challenges mobile-service and delivery providers face, and how to extend reach through Locaverse.at's add-ons without extra budget or expertise.",
          imageUrl: "/images/locaverse-report.jpg",
        },
        {
          title: "Before & After Comparison",
          description:
            "A direct side-by-side of the original and redesigned landing page, used to communicate the redesign rationale to the Locaverse team.",
        },
      ],
      takeaways: [
        "A single, clearly-labeled call-to-action outperforms several competing ones on a lead-gen landing page.",
        "Stacking concrete numbers (130+ industries, 40,000+ monthly visitors) next to the value proposition builds trust faster than descriptive copy alone.",
        "Founder faces and recognizable partner logos matter as much as UI polish for B2B trust.",
      ],
    },
    "04": {
      id: "04",
      title: "Smart Wash",
      subtitle: "Smart Home Appliance UX/UI Design",
      role: "UX Designer",
      deliverables: [
        "Visual Research",
        "Wireframing",
        "Visual Design",
        "Interactive Prototype",
      ],
      timeline: "Personal Project (2022)",
      tools: "Figma",
      client: "Personal Project",
      problem:
        "Washing machine apps typically dump every setting on the user at once, requiring people to manually pick a wash mode without any help from real-world context like the weather or fabric type.",
      solution:
        "Designed Smart Wash, a washing machine app that reads local weather data and recommends a wash mode automatically, while still offering a full manual mode and an energy-savings monitor for people who want control. The visual direction deliberately moved from the flat style common to existing smart-home apps toward neumorphism — soft, tactile shadows meant to make the interface feel worth pressing, \"like a cute game.\"",
      research: [
        {
          title: "As Is → To Be",
          description:
            "As Is: flat design, the common feeling across existing smart apps. To Be: neumorphism, designed so users want to keep pressing it like a cute game. Keywords guiding the shift: Smart, Soft, Friendly.",
        },
        {
          title: "Visual Research",
          description:
            "Explored 3D and neumorphic reference work (weather cards, dashboard modules) to define the soft-shadow language, then built the supporting logo, icon set, color palette, and typography before touching final screens.",
        },
        {
          title: "Wireframing",
          description:
            "Wireframed the full flow — splash, home with weather-linked START button, running state with countdown, side menu, energy monitor, manual mode (temperature/rinse/spin/favorites), and settings — before applying visual design.",
        },
      ],
      infoArchitecture: {
        title: "Information Architecture",
        description:
          "Structured the app around three entry points from the home screen — Weather Tracking (automatic recommendation), Manual Mode (full user control), and Energy Monitor (usage feedback) — so a first-time user can start a wash in one tap while power users can still dig into manual settings. UI elements: logo, a 4-color palette (#5FBFFF, #CAEAFF, #ECECEC, #000000), a custom icon set, and Rubik typography.",
      },
      designShowcase: [
        {
          title: "Home & Weather Tracking",
          description:
            "The home screen greets the user by name and surfaces the day's forecast on a neumorphic dial, automatically recommending a wash mode based on it — the app's main point of difference from a standard washing machine app.",
          imageUrl: "/images/smartwash-hero.jpg",
        },
        {
          title: "Wireframe Flow",
          description:
            "Full wireframe flow from splash screen through the home dial, running state, side menu, and energy monitor, before manual-mode screens for temperature, rinse count, and spin speed.",
          imageUrl: "/images/smartwash-wireframe.jpg",
        },
        {
          title: "Manual Mode & Energy Monitor",
          description:
            "A full manual flow (temperature, rinse count, spin speed, favorites) for users who'd rather set their own wash style than take the recommendation, plus a usage view showing electricity saved per cycle.",
        },
      ],
      takeaways: [
        "Pulling in one piece of real-world context (weather) turned a routine settings screen into something that feels genuinely smart.",
        "Neumorphism reinforced the \"soft, friendly\" positioning, but needed a disciplined, limited color palette to stay legible.",
        "Keeping a full manual mode alongside the automatic recommendation preserved user trust instead of forcing a single \"smart\" path.",
      ],
    },
    "05": {
      id: "05",
      title: "ecotek",
      subtitle: "Ökologie neu erleben — Rebrand for an Eco-Architecture Firm",
      role: "Brand & UI/UX Designer",
      deliverables: [
        "Naming & Rebrand Strategy",
        "Logo & Brand Identity",
        "Color & Typography System",
        "Marketing Website Design",
        "Print Ad Campaign",
      ],
      timeline: "School Project (2023)",
      tools: "Illustrator, Photoshop, Figma",
      client: "Digital Campus Vorarlberg (based on Arslan.Fenkart, a real Vorarlberg architecture firm)",
      problem:
        "The brief: rebrand Arslan.Fenkart, an ecological architecture firm founded in Kennelbach in 2015 by Dilek Arslan and Johanna Fenkart. By 2022 the firm had grown to 15–20 employees and multiple national and international eco-construction awards, but its name gave no sense of what it actually stood for — and most eco-architects in its home region of Vorarlberg lean on curves and rounded forms that don't match the firm's own straight-lined, wood-first style.",
      solution:
        "Renamed the firm ecotek — ECO + TEK/TECH, for ecology, architecture, and nature-conscious technology — under the tagline \"Ökologie neu erleben\" (Experience ecology anew). Built a house-shaped, tree-integrated logo in green/yellow/blue (health, warmth, trust), then carried the identity through a squarelike, minimalist marketing website, a three-subject print ad campaign, and supporting brand guidelines.",
      research: [
        {
          title: "About the Company",
          description:
            "Arslan.Fenkart: founded 2015 in Kennelbach, became a GmbH in 2017. By 2022, 15 employees and multiple national/international architecture and eco-construction awards. Core market in western Austria, with projects in Switzerland, Germany, and Italy. Moved into its own self-designed building in 2022, growing to 20 employees; four-day work week; runs a shared day-care with neighboring companies.",
        },
        {
          title: "Visual Language Audit",
          description:
            "Existing eco-architecture tends toward curves, but Vorarlberg's eco-architects favor straight lines, squares, triangles, and wood as the primary material. ecotek's direction leans into that regional style while proposing buildings that visibly integrate trees and plants — using daytime photography to foreground the ecological angle.",
        },
        {
          title: "Naming & Logo Rationale",
          description:
            "ecotek combines ECO (ecology) + TEK/TECH (architecture and technology), signaling that the firm's technology is nature-conscious, sustainable, and energy-efficient. The logo reads as a house block with an integrated tree; green/yellow/blue were chosen specifically for health, warmth, and trust.",
        },
      ],
      infoArchitecture: {
        title: "Website Structure",
        description:
          "Logo & Menu (Start / Über uns / Portfolio / Jobs / Kontakt) → Main Banner (\"Die Welt verändern\") → Company Introduction (\"Wir machen einen Unterschied\") → Work Process (Kunden → Ideen → Umsetzung) → Promotional Video → Portfolio grid of real eco-architecture references → Company News (three articles pulled straight from the firm's real history, including 2023 partner Maria Rukavina) → Footer with contact details and newsletter signup. Square, unrounded UI throughout — a deliberate match to the firm's straight-lined architectural style.",
        imageUrl: "/images/ecotek-website.jpg",
      },
      designShowcase: [
        {
          title: "Print Ad Campaign — \"Zwischen Mensch und Natur\"",
          description:
            "A three-subject magazine campaign (Familie / Firma / Single-Paar) built around the line \"Zwischen Mensch und Natur\" (Between people and nature), each paired with a different building type — family home, office building, residential complex — to convey that living or working in an ecotek building is a new, better experience through symbiosis with nature.",
          imageUrl: "/images/ecotek-campaign.jpg",
        },
        {
          title: "Marketing Website",
          description:
            "A full company website — not just a style guide — with a portfolio grid, a three-step work process (Kunden, Ideen, Umsetzung), and a news section built from the firm's real milestones, all rendered in the squarelike, minimalist system the brand called for.",
        },
      ],
      takeaways: [
        "A rebrand only lands if the new visual language reflects the client's real regional context — copying generic \"eco\" curves would have fought against Vorarlberg's own straight-lined, wood-first architectural style.",
        "Naming that visibly combines the client's two core ideas (ecology + technology) does more explaining than a purely abstract name would.",
        "Treating a school brief like a real rebrand — full site, ad campaign, and brand guidelines, not just a logo — was the most useful part of the exercise.",
      ],
    },
  },
  kr: {
    "01": {
      id: "01",
      title: "속닥",
      subtitle: "한국어 신조어·슬랭 학습 앱",
      role: "UX/UI 디자이너",
      deliverables: ["컨셉 & 캐릭터 디자인", "브랜드 아이덴티티", "UI 디자인", "인터랙티브 프로토타입"],
      timeline: "진행 중",
      tools: "Figma",
      client: "팀 프로젝트",
      problem:
        "외국인 학습자는 교과서로 한국어를 배우지만, 실제 한국인들은 ㄱㄱ, 노잼, 갬성, 존맛, 갓생, 두쫀쿠, 알잘딱깔센 같은 어떤 교과서도 가르쳐주지 않는 슬랭과 신조어로 대화합니다. 그 결과 학습자들은 한 번도 본 적 없는 단어로 가득한 화면 앞에서 무슨 뜻인지 전혀 알 수 없는 상황에 놓입니다.",
      solution:
        "친근한 호랑이 마스코트가 안내하는 한국어 슬랭 사전 앱 '속닥'을 디자인했습니다. 트렌디한 표현을 쉬운 설명과 실제 문화적 맥락(예: '리즈'라는 말이 축구 클럽 Leeds United에서 유래해 전성기의 모습을 뜻하게 된 이야기)과 함께 보여주고, 새로 배운 슬랭을 실제 맥락에서 연습할 수 있는 커뮤니티 피드도 함께 설계했습니다.",
      research: [
        {
          title: "슬랭 & 신조어 큐레이션",
          description:
            "대부분의 슬랭은 그 뒤에 숨은 이야기가 있어야 이해가 되기 때문에, 단순한 사전적 정의 대신 의미·문화적 맥락·예문을 중심으로 항목을 구조화했습니다.",
        },
        {
          title: "캐릭터 & 브랜드 아이덴티티",
          description:
            "학습자에게 위축감을 줄 수 있는 주제(슬랭)에 따뜻하고 친근한 정체성을 부여하기 위해 호랑이 마스코트와 워드마크를 디자인했습니다.",
        },
        {
          title: "대화형 UI 패턴",
          description:
            "정적인 참고 목록이 아니라 실제로 슬랭이 쓰이고 공유되는 방식을 반영해, 채팅 스타일의 단어 카드와 커뮤니티 탭을 중심으로 인터페이스를 구성했습니다.",
        },
      ],
      infoArchitecture: {
        title: "앱 구조",
        description:
          "학습자가 알파벳순이 아니라 표현의 화제성이나 사회성에 따라 탐색할 수 있도록 홈 피드를 스불재(트렌딩 표현), 새로운 신조어, 인싸 표현, 커뮤니티 네 가지로 구성했습니다.",
      },
      designShowcase: [
        {
          title: "홈 피드 & 배경",
          description:
            "랜딩 화면은 문제 상황 자체로 시작합니다 — 레전드, 존맛, 노잼, 두쫀쿠, 알잘딱깔센, 갓생 같은 실제 슬랭 단어들이 혼란스러운 학습자 주위에 흩어져 있는 모습을 보여준 뒤, 카테고리별로 태그된 트렌딩·신조어 피드로 이어집니다.",
          imageUrl: "/images/sokdak-hero.jpg",
        },
        {
          title: "단어 상세 화면",
          description:
            "각 항목은 쉬운 설명과 실제 문화적 맥락을 함께 보여줍니다 — 예를 들어 '리즈'가 Leeds United에서 유래해 지금은 전성기의 모습을 뜻하게 된 배경을 설명합니다.",
        },
        {
          title: "커뮤니티 탭",
          description:
            "학습자들이 실제 대화 속에서 쓰이는 슬랭을 보고 논의할 수 있는 공간으로, 정적인 사전을 지속적으로 업데이트되는 피드로 바꿔줍니다.",
        },
      ],
      takeaways: [
        "슬랭은 문화적 배경 이야기가 함께 있어야 와닿는다 — 단순한 정의만으로는 부족하다.",
        "마스코트 중심의 채팅 스타일 구성은 위축감을 줄 수 있는 주제(원어민 슬랭)를 훨씬 친근하게 만든다.",
        "단순 검색 도구가 아니라 커뮤니티 피드 중심으로 앱을 설계하는 것이 실제 슬랭이 퍼지는 방식과 더 잘 맞는다.",
      ],
    },
    "02": {
      id: "02",
      title: "Seek and Sight",
      subtitle: "아동을 위한 포용적 STEAM 문해력 플랫폼",
      role: "UX/UI 디자이너, 소셜 미디어 디자이너",
      deliverables: ["랜딩 페이지 UX/UI 디자인", "캐릭터 & 브랜드 시스템", "주간 소셜 미디어 콘텐츠"],
      timeline: "진행 중 (2025–현재)",
      tools: "Figma",
      client: "Hope For Tomorrow / Seek and Sight",
      problem:
        "학습 차이를 가진 아이들은 접근성이나 개인화된 참여를 고려하지 않은 일반적인 에듀테크 제품에서 소외되는 경우가 많습니다. 27년 이상의 경력을 가진 사회복지사인 창립자 Paula Johnson은 문해력 도구가 아이들에게 맞춰지지 않을 때 아이들이 어떻게 뒤처지는지 직접 목격했습니다.",
      solution:
        "부모, 교육자, 보육 제공자라는 세 가지 대상을 중심으로 Seek and Sight의 랜딩 페이지와 제품 UX를 디자인했습니다. 전통적인 워크시트 기반 학습과 Seek and Sight의 적응형·게임 기반·AI 안내 방식을 직접 비교하는 구성을 중심축으로 삼았고, 앱과 매주 발행되는 소셜 콘텐츠 전반에 등장하는 친근한 마스코트 캐릭터 세트를 함께 디자인했습니다.",
      research: [
        {
          title: "타깃 세분화",
          description:
            "부모, 교육자, 보육 제공자라는 서로 다른 니즈와 의사결정 기준을 가진 세 그룹을 중심으로 메시지와 진입점을 구성했습니다.",
        },
        {
          title: "캐릭터 & 브랜드 시스템",
          description:
            "Ellie, Tim, Nova, Echo, Sunny, Math 등 다양한 감정·제스처 상태를 가진 마스코트 캐릭터 세트를 디자인해 앱과 소셜 채널 전반에 일관되게 사용함으로써 어린 학습자들에게 친숙함을 만들었습니다.",
        },
        {
          title: "지속적인 콘텐츠 디자인",
          description:
            "지속적인 커뮤니티 참여를 지원하고 브랜드를 매주 일관되게 유지하기 위해 주간 소셜 미디어 콘텐츠 키트(캐러셀, 스포트라이트 게시물, 인스타그램 에셋)를 제작했습니다.",
        },
      ],
      infoArchitecture: {
        title: "랜딩 페이지 구조",
        description:
          "Seek and Sight란 무엇인가 → 누구를 위한 것인가(부모/교육자/보육 제공자) → 미션(장벽 허물기, 포용성 증진, 잠재력 발휘) → 왜 Seek and Sight를 선택해야 하는가(전통적 학습 vs. Seek and Sight 직접 비교) → 후기 → 앱 다운로드 순으로 사이트를 구성해, 부모와 기관 구매자 모두가 제품을 명확히 이해할 수 있는 경로를 제공했습니다.",
      },
      designShowcase: [
        {
          title: "랜딩 페이지 히어로 & 미션",
          description:
            "\"STEAM과 사이트 워드로 어린 학습자에게 힘을 실어주다\" — 게임 기반 학습, 비판적 사고, 개인화된 경로, 실시간 진도 추적을 중심으로 만든 2~7세 아동을 위한 포용적 게임 기반 문해력 플랫폼입니다.",
          imageUrl: "/images/seekandsight-hifi.jpg",
        },
        {
          title: "전통적 방식 vs. Seek and Sight",
          description:
            "획일적인 워크시트와 Seek and Sight의 적응성·몰입도·지원·진도 모니터링을 나란히 비교하는 표로, 비전문가 이해관계자를 빠르게 설득하기 위해 만들었습니다.",
        },
        {
          title: "캐릭터 시스템",
          description:
            "제품과 매주 소셜 콘텐츠 전반에 일관되게 등장하는 마스코트 캐릭터 세트로, 어린 학습자들이 친숙한 얼굴을 계속 따라갈 수 있게 합니다.",
        },
      ],
      takeaways: [
        "세 가지 대상(부모, 교육자, 제공자)을 동시에 고려해 디자인하면 단일 페르소나 제품보다 훨씬 명확한 정보 위계가 필요해진다.",
        "매주 콘텐츠를 발행할 때는 일관된 캐릭터 시스템이 일회성 일러스트보다 브랜드 인지도를 훨씬 멀리까지 전달한다.",
        "직접적인 비포/애프터 비교표는 기능 목록보다 비전문가 이해관계자에게 가치를 더 빠르게 전달한다.",
      ],
    },
    "03": {
      id: "03",
      title: "Locaverse GmbH",
      subtitle: "Business.Locaverse.at — 리드 제너레이션 랜딩 페이지 리디자인",
      role: "UX/UI 디자이너, 인턴",
      deliverables: ["랜딩 페이지 UX/UI 리디자인", "비포 & 애프터 비교", "리드젠 퍼널 디자인", "인터랙티브 프로토타입"],
      timeline: "3개월 (2023년 7월–9월)",
      tools: "Figma, Photoshop",
      client: "Locaverse GmbH",
      problem:
        "Locaverse.at은 독립 출장 서비스 및 배달 제공자들이 지역에서 발견될 수 있도록 돕는 서비스지만, 사업자 유치용 랜딩 페이지의 전환율이 낮았습니다. 무료 리드 제너레이션 리포트의 가치가 명확하지 않았고, 페이지의 구조와 시각적 위계가 오히려 가입을 방해하고 있었습니다.",
      solution:
        "Business.Locaverse.at 랜딩 페이지를 무료 \"Expertenreport\" 다운로드라는 단일하고 명확한 CTA를 중심으로 전면 리디자인했습니다. 가치 제안을 신뢰 지표(130개 이상 업종, 1,200개 이상의 고유 등록, 월 40,000명 이상 방문자), 창업자 신뢰도, 명확한 단계별 온보딩 경로로 스캔하기 쉬운 모듈로 재구성했고, Figma로 전체 비포/애프터 비교와 인터랙티브 프로토타입을 제작했습니다.",
      research: [
        {
          title: "비포/애프터 감사",
          description:
            "기존 랜딩 페이지와 리디자인을 비교해 카피, 위계, 시각적 노이즈가 정확히 어디서 잠재 리드를 놓치고 있는지 파악했습니다.",
        },
        {
          title: "전환 중심 레이아웃",
          description:
            "여러 개의 경쟁하는 CTA 대신 단일 리드 캡처 폼(무료 리포트 다운로드)을 중심으로 페이지를 재구성했습니다.",
        },
        {
          title: "창업자 신뢰도 섹션",
          description:
            "예비 비즈니스 파트너의 신뢰를 얻기 위해 창업자 프로필(Mario Märzinger, Michael Pisnyachevskiy)과 잘 알려진 파트너 로고(REWE, Home24, ROCKET INTERNET)를 추가했습니다.",
        },
      ],
      infoArchitecture: {
        title: "랜딩 페이지 구조",
        description:
          "히어로 가치 제안 → 핵심 서비스(Mobile Dienstleister / Lieferservices) → 신뢰 지표 → 시작을 위한 구체적인 단계 → 창업자 신뢰도 → 무료 리포트 리드 마그넷 → 영상 개요 → 소셜 증거(Trustpilot, 언론 배지) 순으로 명확한 퍼널을 재구성했습니다.",
        imageUrl: "/images/locaverse-hero.jpg",
      },
      designShowcase: [
        {
          title: "히어로 & 핵심 가치 제안",
          description:
            "일반적인 회사 소개 대신 출장 서비스 및 배달 제공자를 위한 디지털 고객 유치라는 핵심 이점을 앞세우도록 히어로를 재구성했습니다.",
        },
        {
          title: "무료 리포트 리드젠 모듈 (\"Kostenloser Expertenreport\")",
          description:
            "사이트의 나머지 부분과 분리된, 무료 리드 마그넷 이북을 위한 전용 랜딩 페이지로, 독립 제공자들이 흔히 저지르는 마케팅 실수 3가지, Locaverse.at을 통해 지역에서 무료로 노출도를 얻는 방법, 출장·배달 제공자들이 겪는 가장 큰 어려움, 추가 예산이나 전문성 없이 Locaverse.at의 애드온으로 도달 범위를 넓히는 방법이라는 4가지 스캔하기 쉬운 이점을 중심으로 만들었습니다.",
          imageUrl: "/images/locaverse-report.jpg",
        },
        {
          title: "비포 & 애프터 비교",
          description:
            "기존 랜딩 페이지와 리디자인을 나란히 직접 비교한 자료로, Locaverse 팀에게 리디자인의 근거를 전달하는 데 사용했습니다.",
        },
      ],
      takeaways: [
        "리드젠 랜딩 페이지에서는 명확하게 라벨링된 단일 CTA가 여러 개의 경쟁하는 CTA보다 성과가 좋다.",
        "구체적인 수치(130개 이상 업종, 월 40,000명 이상 방문자)를 가치 제안 옆에 배치하면 설명형 카피만 있을 때보다 신뢰가 더 빠르게 쌓인다.",
        "B2B 신뢰에는 UI 완성도만큼이나 창업자의 얼굴과 잘 알려진 파트너 로고가 중요하다.",
      ],
    },
    "04": {
      id: "04",
      title: "Smart Wash",
      subtitle: "스마트 홈 가전 UX/UI 디자인",
      role: "UX 디자이너",
      deliverables: ["비주얼 리서치", "와이어프레이밍", "비주얼 디자인", "인터랙티브 프로토타입"],
      timeline: "개인 프로젝트 (2022)",
      tools: "Figma",
      client: "개인 프로젝트",
      problem:
        "세탁기 앱은 대개 모든 설정을 사용자에게 한꺼번에 쏟아부어, 날씨나 원단 종류 같은 실제 상황의 도움 없이 사람들이 직접 세탁 모드를 골라야 합니다.",
      solution:
        "지역 날씨 데이터를 읽어 자동으로 세탁 모드를 추천해주는 세탁기 앱 Smart Wash를 디자인했습니다. 제어권을 원하는 사용자를 위해 전체 수동 모드와 에너지 절약 모니터도 함께 제공합니다. 비주얼 방향은 기존 스마트홈 앱에서 흔한 플랫 스타일에서 의도적으로 벗어나 뉴모피즘으로 향했습니다 — 인터페이스를 \"귀여운 게임처럼\" 누르고 싶게 만드는 부드럽고 촉각적인 그림자가 특징입니다.",
      research: [
        {
          title: "As Is → To Be",
          description:
            "As Is: 기존 스마트 앱 전반에서 흔히 느껴지는 플랫 디자인. To Be: 사용자가 귀여운 게임처럼 계속 누르고 싶어지도록 설계한 뉴모피즘. 이 전환을 이끈 키워드: Smart, Soft, Friendly.",
        },
        {
          title: "비주얼 리서치",
          description:
            "부드러운 그림자 언어를 정의하기 위해 3D 및 뉴모픽 레퍼런스(날씨 카드, 대시보드 모듈)를 탐구한 뒤, 최종 화면 작업에 들어가기 전 이를 뒷받침하는 로고, 아이콘 세트, 색상 팔레트, 타이포그래피를 구축했습니다.",
        },
        {
          title: "와이어프레이밍",
          description:
            "비주얼 디자인을 적용하기 전, 스플래시, 날씨와 연동된 START 버튼이 있는 홈, 카운트다운이 있는 실행 상태, 사이드 메뉴, 에너지 모니터, 수동 모드(온도/헹굼/탈수/즐겨찾기), 설정까지 전체 플로우를 와이어프레임으로 구성했습니다.",
        },
      ],
      infoArchitecture: {
        title: "정보 구조",
        description:
          "처음 사용하는 사용자도 한 번의 탭으로 세탁을 시작할 수 있고, 파워 유저는 수동 설정까지 깊이 들어갈 수 있도록 홈 화면에서 날씨 트래킹(자동 추천), 수동 모드(전체 사용자 제어), 에너지 모니터(사용량 피드백)라는 세 가지 진입점을 중심으로 앱을 구성했습니다. UI 요소: 로고, 4색 팔레트(#5FBFFF, #CAEAFF, #ECECEC, #000000), 커스텀 아이콘 세트, Rubik 타이포그래피.",
      },
      designShowcase: [
        {
          title: "홈 & 날씨 트래킹",
          description:
            "홈 화면은 사용자의 이름으로 인사를 건네고, 뉴모픽 다이얼 위에 그날의 날씨 예보를 보여주며 이를 기반으로 자동으로 세탁 모드를 추천합니다 — 일반적인 세탁기 앱과 이 앱을 구분 짓는 핵심 차별점입니다.",
          imageUrl: "/images/smartwash-hero.jpg",
        },
        {
          title: "와이어프레임 플로우",
          description:
            "스플래시 화면부터 홈 다이얼, 실행 상태, 사이드 메뉴, 에너지 모니터를 거쳐 온도, 헹굼 횟수, 탈수 속도를 위한 수동 모드 화면까지 이어지는 전체 와이어프레임 플로우입니다.",
          imageUrl: "/images/smartwash-wireframe.jpg",
        },
        {
          title: "수동 모드 & 에너지 모니터",
          description:
            "추천보다 직접 세탁 스타일을 설정하고 싶은 사용자를 위한 전체 수동 플로우(온도, 헹굼 횟수, 탈수 속도, 즐겨찾기)와, 사이클당 절약된 전력량을 보여주는 사용량 화면입니다.",
        },
      ],
      takeaways: [
        "실제 세계의 맥락(날씨) 하나를 끌어들이는 것만으로 평범한 설정 화면이 진짜 스마트하게 느껴지는 화면으로 바뀌었다.",
        "뉴모피즘은 \"부드럽고 친근한\" 포지셔닝을 강화했지만, 가독성을 유지하려면 절제되고 제한된 색상 팔레트가 필요했다.",
        "자동 추천과 함께 전체 수동 모드를 유지한 것이 단일한 \"스마트\" 경로를 강요하는 대신 사용자의 신뢰를 지켜주었다.",
      ],
    },
    "05": {
      id: "05",
      title: "ecotek",
      subtitle: "Ökologie neu erleben — 친환경 건축 회사 리브랜딩",
      role: "브랜드 & UI/UX 디자이너",
      deliverables: ["네이밍 & 리브랜딩 전략", "로고 & 브랜드 아이덴티티", "컬러 & 타이포그래피 시스템", "마케팅 웹사이트 디자인", "인쇄 광고 캠페인"],
      timeline: "학교 프로젝트 (2023)",
      tools: "Illustrator, Photoshop, Figma",
      client: "Digital Campus Vorarlberg (실제 포어아를베르크 건축 회사 Arslan.Fenkart 기반)",
      problem:
        "과제 내용: 2015년 Dilek Arslan과 Johanna Fenkart가 Kennelbach에서 설립한 생태 건축 회사 Arslan.Fenkart를 리브랜딩하는 것이었습니다. 2022년까지 이 회사는 15~20명 규모로 성장했고 여러 국내외 친환경 건축상을 수상했지만, 회사명만으로는 무엇을 지향하는지 전혀 알 수 없었습니다 — 게다가 본거지인 포어아를베르크 지역의 친환경 건축가들은 대부분 곡선과 둥근 형태를 선호하는데, 이는 이 회사 고유의 직선적이고 목재 중심적인 스타일과는 맞지 않았습니다.",
      solution:
        "생태·건축·자연친화적 기술을 뜻하는 ECO + TEK/TECH를 조합해 회사명을 ecotek으로 새로 지었고, \"Ökologie neu erleben\"(생태를 새롭게 경험하다)이라는 태그라인을 붙였습니다. 건강·따뜻함·신뢰를 상징하는 초록/노랑/파랑 색상으로 나무가 통합된 집 모양 로고를 제작한 뒤, 정사각형에 가까운 미니멀한 마케팅 웹사이트, 세 가지 주제의 인쇄 광고 캠페인, 지원 브랜드 가이드라인까지 이 아이덴티티를 일관되게 확장했습니다.",
      research: [
        {
          title: "회사 소개",
          description:
            "Arslan.Fenkart: 2015년 Kennelbach에서 설립, 2017년 GmbH로 전환. 2022년 기준 직원 15명, 여러 국내외 건축·친환경 건설상 수상. 주력 시장은 오스트리아 서부이며 스위스, 독일, 이탈리아에서도 프로젝트를 진행. 2022년 자체 설계한 건물로 이전하며 직원 20명 규모로 성장; 주 4일 근무; 인근 기업들과 공동 어린이집 운영.",
        },
        {
          title: "비주얼 언어 감사",
          description:
            "기존 친환경 건축은 대체로 곡선을 지향하지만, 포어아를베르크의 친환경 건축가들은 직선, 정사각형, 삼각형, 그리고 목재를 주재료로 선호합니다. ecotek의 방향성은 이러한 지역 스타일을 따르면서도 나무와 식물이 시각적으로 통합된 건물을 제안하며, 생태적 측면을 부각하기 위해 주간 촬영 사진을 활용합니다.",
        },
        {
          title: "네이밍 & 로고 근거",
          description:
            "ecotek은 ECO(생태) + TEK/TECH(건축과 기술)를 결합해, 회사의 기술이 자연친화적이고 지속가능하며 에너지 효율적임을 나타냅니다. 로고는 나무가 통합된 집 블록 형태로 읽히며, 초록/노랑/파랑은 건강·따뜻함·신뢰를 위해 특별히 선택되었습니다.",
        },
      ],
      infoArchitecture: {
        title: "웹사이트 구조",
        description:
          "로고 & 메뉴(Start / Über uns / Portfolio / Jobs / Kontakt) → 메인 배너(\"Die Welt verändern\") → 회사 소개(\"Wir machen einen Unterschied\") → 작업 프로세스(Kunden → Ideen → Umsetzung) → 홍보 영상 → 실제 친환경 건축 레퍼런스로 구성된 포트폴리오 그리드 → 회사 소식(2023년 파트너 Maria Rukavina를 포함해 실제 회사 연혁에서 가져온 세 개의 기사) → 연락처와 뉴스레터 가입이 담긴 푸터. 회사의 직선적인 건축 스타일에 의도적으로 맞춘, 각지고 둥글지 않은 UI가 전체에 일관되게 적용되었습니다.",
        imageUrl: "/images/ecotek-website.jpg",
      },
      designShowcase: [
        {
          title: "인쇄 광고 캠페인 — \"Zwischen Mensch und Natur\"",
          description:
            "\"Zwischen Mensch und Natur\"(사람과 자연 사이)라는 문구를 중심으로 한 세 가지 주제(Familie / Firma / Single-Paar)의 매거진 캠페인으로, 각각 다른 건물 유형 — 단독주택, 오피스 빌딩, 주거 단지 — 과 짝지어 ecotek 건물에서 살거나 일하는 것이 자연과의 공생을 통한 새롭고 더 나은 경험임을 전달합니다.",
          imageUrl: "/images/ecotek-campaign.jpg",
        },
        {
          title: "마케팅 웹사이트",
          description:
            "단순한 스타일 가이드가 아닌 완전한 회사 웹사이트로, 포트폴리오 그리드, 3단계 작업 프로세스(Kunden, Ideen, Umsetzung), 회사의 실제 이정표를 바탕으로 한 뉴스 섹션까지 브랜드가 요구한 정사각형에 가까운 미니멀한 시스템으로 모두 구현했습니다.",
        },
      ],
      takeaways: [
        "리브랜딩은 새로운 비주얼 언어가 클라이언트의 실제 지역적 맥락을 반영할 때만 성립한다 — 일반적인 '친환경' 곡선을 그대로 가져왔다면 포어아를베르크 고유의 직선적, 목재 중심 건축 스타일과 충돌했을 것이다.",
        "클라이언트의 두 핵심 개념(생태 + 기술)을 시각적으로 결합한 네이밍은 순수하게 추상적인 이름보다 더 많은 것을 설명해준다.",
        "학교 과제를 로고 하나가 아니라 전체 사이트, 광고 캠페인, 브랜드 가이드라인까지 갖춘 실제 리브랜딩처럼 다룬 것이 이 과제에서 가장 유익한 부분이었다.",
      ],
    },
  },
  de: {
    "01": {
      id: "01",
      title: "Sokdak",
      subtitle: "Lern-App für koreanischen Slang & Neologismen",
      role: "UX/UI-Designerin",
      deliverables: ["Konzept- & Charakterdesign", "Markenidentität", "UI-Design", "Interaktiver Prototyp"],
      timeline: "Laufend",
      tools: "Figma",
      client: "Teamprojekt",
      problem:
        "Ausländische Lernende lernen Koreanisch aus Lehrbüchern, aber echte Koreaner:innen sprechen in Slang und Neologismen — ㄱㄱ, 노잼, 갬성, 존맛, 갓생, 두쫀쿠, 알잘딱깔센 —, die kein Lehrbuch vermittelt. So starren Lernende auf ein Handy voller Wörter, die sie noch nie gesehen haben, ohne jede Ahnung, was sie bedeuten.",
      solution:
        "Ich habe Sokdak entworfen, eine App für koreanischen Slang mit einem freundlichen Tiger-Maskottchen, die trendige Ausdrücke mit einfachen Erklärungen und echtem kulturellem Kontext zeigt (zum Beispiel die Herkunft von '리즈' bei Leeds United, da der Begriff für jemanden auf dem Höhepunkt seines Aussehens buchstäblich vom Fußballverein stammt), ergänzt durch einen Community-Feed zum Üben neuer Slang-Begriffe im echten Kontext.",
      research: [
        {
          title: "Kuratierung von Slang & Neologismen",
          description:
            "Einträge wurden um Bedeutung, kulturellen Kontext und Beispielverwendung strukturiert statt um eine flache Wörterbuchdefinition, da die meisten Slang-Begriffe nur mit der dazugehörigen Geschichte Sinn ergeben.",
        },
        {
          title: "Charakter- & Markenidentität",
          description:
            "Ein Tiger-Maskottchen und ein Wordmark wurden entworfen, um der App für ein Thema (Slang), das für Lernende einschüchternd wirken kann, eine warme, zugängliche Identität zu geben.",
        },
        {
          title: "Konversationelle UI-Muster",
          description:
            "Die Oberfläche wurde um Chat-artige Wortkarten und einen Community-Tab herum aufgebaut, um widerzuspiegeln, wie Slang tatsächlich verwendet und geteilt wird, statt eine statische Referenzliste zu sein.",
        },
      ],
      infoArchitecture: {
        title: "App-Struktur",
        description:
          "Der Home-Feed wurde um 스불재 (trendige Ausdrücke), 새로운 신조어 (neue Wortschöpfungen), 인싸 표현 (Insider-Ausdrücke) und 커뮤니티 (Community) strukturiert, damit Lernende danach browsen können, wie aktuell oder sozial ein Ausdruck ist, statt alphabetisch.",
      },
      designShowcase: [
        {
          title: "Home-Feed & Hintergrund",
          description:
            "Die Landing-Ansicht beginnt mit dem Problem selbst: eine verstreute Wolke echter Slang-Wörter (레전드, 존맛, 노잼, 두쫀쿠, 알잘딱깔센, 갓생) um eine verwirrte lernende Person, bevor sie in einen überschaubaren Feed trendiger und neu geprägter, nach Kategorie getaggter Begriffe übergeht.",
          imageUrl: "/images/sokdak-hero.jpg",
        },
        {
          title: "Wortdetailansicht",
          description:
            "Jeder Eintrag verbindet die einfache Bedeutung mit echtem kulturellem Kontext — zum Beispiel wird erklärt, dass '리즈' (\"Leez\") von Leeds United stammt und heute jemanden auf dem Höhepunkt seines Aussehens bezeichnet.",
        },
        {
          title: "Community-Tab",
          description:
            "Ein Ort, an dem Lernende Slang aus echten Gesprächen sehen und diskutieren können — so wird aus einem statischen Wörterbuch ein fortlaufender Feed.",
        },
      ],
      takeaways: [
        "Slang funktioniert nur, wenn die kulturelle Geschichte mitgeliefert wird — eine reine Definition reicht nicht.",
        "Eine von einem Maskottchen geführte, chatartige Darstellung macht ein einschüchterndes Thema (muttersprachlicher Slang) zugänglich.",
        "Die App um einen Community-Feed statt um ein Nachschlagewerkzeug herum zu gestalten, entspricht eher der Art, wie sich Slang tatsächlich verbreitet.",
      ],
    },
    "02": {
      id: "02",
      title: "Seek and Sight",
      subtitle: "Inklusive STEAM-Lese- und Schreibplattform für Kinder",
      role: "UX/UI-Designerin, Social-Media-Designerin",
      deliverables: ["UX/UI-Design der Landingpage", "Charakter- & Markensystem", "Wöchentlicher Social-Media-Content"],
      timeline: "Laufend (2025–heute)",
      tools: "Figma",
      client: "Hope For Tomorrow / Seek and Sight",
      problem:
        "Kinder mit Lernunterschieden werden von generischen Edtech-Produkten, die nicht auf Barrierefreiheit oder personalisiertes Engagement ausgelegt sind, oft nicht ausreichend erreicht. Gründerin Paula Johnson, eine Sozialarbeiterin mit über 27 Jahren Erfahrung, sah aus erster Hand, wie Kinder zurückbleiben, wenn sich Lese-Tools nicht an sie anpassen.",
      solution:
        "Ich habe die Landingpage und die Produkt-UX von Seek and Sight um drei Zielgruppen herum gestaltet — Eltern, Pädagog:innen und Betreuungspersonal —, verankert durch einen direkten Vergleich zwischen traditionellem, arbeitsblattbasiertem Lernen und dem adaptiven, spielbasierten, KI-gestützten Ansatz von Seek and Sight, ergänzt durch eine Reihe freundlicher Maskottchen-Charaktere, die sich durch die App und den wöchentlichen Social-Content ziehen.",
      research: [
        {
          title: "Zielgruppensegmentierung",
          description:
            "Botschaften und Einstiegspunkte wurden um drei unterschiedliche Zielgruppen strukturiert — Eltern, Pädagog:innen und Betreuungspersonal —, jede mit eigenen Bedürfnissen und Entscheidungskriterien.",
        },
        {
          title: "Charakter- & Markensystem",
          description:
            "Ein Satz Maskottchen-Charaktere (Ellie, Tim, Nova, Echo, Sunny, Math) mit jeweils mehreren emotionalen Zuständen/Gesten wurde entworfen und konsistent über App und Social-Kanäle hinweg eingesetzt, um Wiedererkennung bei jungen Lernenden aufzubauen.",
        },
        {
          title: "Laufendes Content-Design",
          description:
            "Wöchentliche Social-Media-Content-Kits (Karussells, Spotlight-Posts, Instagram-Assets) wurden produziert, um kontinuierliches Community-Engagement zu unterstützen und die Marke Woche für Woche konsistent zu halten.",
        },
      ],
      infoArchitecture: {
        title: "Struktur der Landingpage",
        description:
          "Die Seite wurde strukturiert als: Was ist Seek and Sight → Für wen ist es (Eltern / Pädagog:innen / Betreuungspersonal) → Mission (Barrieren abbauen, Inklusion fördern, Potenzial entfalten) → Warum Seek and Sight wählen (ein direkter Vergleich Traditionelles Lernen vs. Seek and Sight) → Testimonials → App-Download — und gibt so sowohl Eltern als auch institutionellen Käufern einen klaren Weg zum Verständnis des Produkts.",
      },
      designShowcase: [
        {
          title: "Hero & Mission der Landingpage",
          description:
            "\"Junge Lernende durch STEAM und Sichtwörter stärken\" — eine inklusive, spielbasierte Lese- und Schreibplattform für Kinder von 2–7 Jahren, aufgebaut auf spielbasiertem Lernen, kritischem Denken, personalisierten Lernpfaden und Echtzeit-Fortschrittsverfolgung.",
          imageUrl: "/images/seekandsight-hifi.jpg",
        },
        {
          title: "Traditionell vs. Seek and Sight",
          description:
            "Eine Vergleichstabelle, die Einheitsarbeitsblätter der Anpassungsfähigkeit, dem Engagement, der Unterstützung und der Fortschrittsüberwachung von Seek and Sight gegenüberstellt — entwickelt, um fachfremde Stakeholder schnell zu überzeugen.",
        },
        {
          title: "Charaktersystem",
          description:
            "Ein konsistenter Satz von Maskottchen-Charakteren, der über das Produkt und jeden wöchentlichen Social-Content hinweg eingesetzt wird und jungen Lernenden vertraute Gesichter zum Folgen gibt.",
        },
      ],
      takeaways: [
        "Das gleichzeitige Design für drei Zielgruppen (Eltern, Pädagog:innen, Betreuungspersonal) erzwingt eine klarere Informationshierarchie, als ein Produkt mit nur einer Persona benötigt.",
        "Ein konsistentes Charaktersystem trägt Markenwiedererkennung weiter als Einzelillustrationen, wenn wöchentlich Content erscheint.",
        "Eine direkte Vorher-Nachher-Vergleichstabelle vermittelt fachfremden Stakeholdern Wert schneller als eine Funktionsliste.",
      ],
    },
    "03": {
      id: "03",
      title: "Locaverse GmbH",
      subtitle: "Business.Locaverse.at — Redesign der Lead-Gen-Landingpage",
      role: "UX/UI-Designerin, Praktikantin",
      deliverables: ["UX/UI-Redesign der Landingpage", "Vorher-Nachher-Vergleich", "Lead-Gen-Funnel-Design", "Interaktiver Prototyp"],
      timeline: "3 Monate (Jul–Sep 2023)",
      tools: "Figma, Photoshop",
      client: "Locaverse GmbH",
      problem:
        "Locaverse.at hilft unabhängigen mobilen Dienstleistern und Lieferdiensten, lokal entdeckt zu werden — doch die Landingpage zur Geschäftskundenakquise konvertierte nicht. Der Wert des kostenlosen Lead-Gen-Reports war nicht klar erkennbar, und Struktur sowie visuelle Hierarchie der Seite wirkten den Anmeldungen entgegen.",
      solution:
        "Ich habe die Landingpage Business.Locaverse.at komplett um einen einzigen klaren Call-to-Action (Download eines kostenlosen \"Expertenreports\") herum neu gestaltet: das Wertversprechen wurde in überschaubare Module gegliedert — Vertrauensstatistiken (130+ Branchen, 1.200+ eindeutige Einträge, 40.000+ monatliche Besucher:innen), Gründer-Glaubwürdigkeit und ein klarer, schrittweiser Onboarding-Pfad — dazu ein vollständiger Vorher-Nachher-Vergleich und ein interaktiver Prototyp in Figma.",
      research: [
        {
          title: "Vorher-Nachher-Audit",
          description:
            "Die bestehende Landingpage wurde mit dem Redesign verglichen, um genau zu identifizieren, wo Text, Hierarchie und visuelles Rauschen potenzielle Leads verloren.",
        },
        {
          title: "Konversionsorientiertes Layout",
          description:
            "Die Seite wurde um ein einziges Lead-Erfassungsformular (den kostenlosen Report-Download) herum neu aufgebaut, statt um mehrere konkurrierende Calls-to-Action.",
        },
        {
          title: "Bereich Gründer-Glaubwürdigkeit",
          description:
            "Eigene Gründerprofile (Mario Märzinger, Michael Pisnyachevskiy) neben bekannten Partner-Logos (REWE, Home24, ROCKET INTERNET) wurden hinzugefügt, um Vertrauen bei potenziellen Geschäftspartnern aufzubauen.",
        },
      ],
      infoArchitecture: {
        title: "Struktur der Landingpage",
        description:
          "Die Seite wurde zu einem klaren Funnel umstrukturiert: Hero-Wertversprechen → Kernleistungen (Mobile Dienstleister / Lieferservices) → Vertrauensstatistiken → konkrete Schritte zum Einstieg → Gründer-Glaubwürdigkeit → kostenloser Report als Lead-Magnet → Video-Überblick → Social Proof (Trustpilot, Presse-Badges).",
        imageUrl: "/images/locaverse-hero.jpg",
      },
      designShowcase: [
        {
          title: "Hero & Kern-Wertversprechen",
          description:
            "Der Hero-Bereich wurde neu aufgebaut, um mit dem Kernnutzen — digitale Kundengewinnung für mobile Dienstleister und Lieferdienste — statt mit einer generischen Unternehmensvorstellung zu beginnen.",
        },
        {
          title: "Kostenloses Report-Lead-Gen-Modul (\"Kostenloser Expertenreport\")",
          description:
            "Eine eigene, vom Rest der Seite losgelöste Landingpage für das kostenlose Lead-Magnet-E-Book, aufgebaut um vier leicht erfassbare Nutzenpunkte: die drei größten Marketingfehler unabhängiger Anbieter, wie man über Locaverse.at kostenlos Sichtbarkeit im eigenen Servicegebiet gewinnt, die größten Herausforderungen für mobile Dienstleister und Lieferdienste, und wie man die Reichweite über Locaverse.at-Zusatzfunktionen ohne zusätzliches Budget oder Fachwissen erweitert.",
          imageUrl: "/images/locaverse-report.jpg",
        },
        {
          title: "Vorher-Nachher-Vergleich",
          description:
            "Ein direkter Vergleich der ursprünglichen und der neu gestalteten Landingpage, genutzt, um dem Locaverse-Team die Beweggründe für das Redesign zu vermitteln.",
        },
      ],
      takeaways: [
        "Ein einzelner, klar beschrifteter Call-to-Action übertrifft mehrere konkurrierende auf einer Lead-Gen-Landingpage.",
        "Konkrete Zahlen (130+ Branchen, 40.000+ monatliche Besucher:innen) direkt neben dem Wertversprechen bauen Vertrauen schneller auf als beschreibender Text allein.",
        "Gründergesichter und bekannte Partner-Logos sind für B2B-Vertrauen genauso wichtig wie UI-Politur.",
      ],
    },
    "04": {
      id: "04",
      title: "Smart Wash",
      subtitle: "UX/UI-Design für ein smartes Haushaltsgerät",
      role: "UX-Designerin",
      deliverables: ["Visuelle Recherche", "Wireframing", "Visuelles Design", "Interaktiver Prototyp"],
      timeline: "Persönliches Projekt (2022)",
      tools: "Figma",
      client: "Persönliches Projekt",
      problem:
        "Waschmaschinen-Apps überhäufen Nutzer:innen in der Regel mit sämtlichen Einstellungen auf einmal und verlangen, dass der Waschmodus manuell gewählt wird — ohne jede Hilfe durch reale Kontextdaten wie Wetter oder Stoffart.",
      solution:
        "Ich habe Smart Wash entworfen, eine Waschmaschinen-App, die lokale Wetterdaten ausliest und automatisch einen Waschmodus empfiehlt, während sie weiterhin einen vollständigen manuellen Modus und einen Energiespar-Monitor für kontrollbedürftige Nutzer:innen bietet. Die visuelle Ausrichtung bewegte sich bewusst vom flachen Stil vieler bestehender Smart-Home-Apps hin zu Neumorphismus — weiche, fühlbare Schatten, die die Oberfläche „wie ein niedliches Spiel“ drückenswert machen sollen.",
      research: [
        {
          title: "As Is → To Be",
          description:
            "As Is: flaches Design, das übliche Gefühl bestehender Smart-Apps. To Be: Neumorphismus, gestaltet damit Nutzer:innen weiter darauf tippen möchten wie bei einem niedlichen Spiel. Leitende Schlüsselwörter für den Wandel: Smart, Soft, Friendly.",
        },
        {
          title: "Visuelle Recherche",
          description:
            "3D- und neumorphe Referenzarbeiten (Wetterkarten, Dashboard-Module) wurden erkundet, um die Sprache der weichen Schatten zu definieren, bevor Logo, Icon-Set, Farbpalette und Typografie als Grundlage für die finalen Screens entstanden.",
        },
        {
          title: "Wireframing",
          description:
            "Der gesamte Flow — Splash, Home mit wetterverknüpftem START-Button, laufender Zustand mit Countdown, Seitenmenü, Energiemonitor, manueller Modus (Temperatur/Spülgang/Schleuder/Favoriten) und Einstellungen — wurde vor dem visuellen Design als Wireframe angelegt.",
        },
      ],
      infoArchitecture: {
        title: "Informationsarchitektur",
        description:
          "Die App wurde um drei Einstiegspunkte vom Home-Screen herum strukturiert — Wetter-Tracking (automatische Empfehlung), manueller Modus (volle Nutzerkontrolle) und Energiemonitor (Nutzungs-Feedback) —, sodass Erstnutzer:innen eine Wäsche mit einem Tap starten können, während Power-User weiterhin in die manuellen Einstellungen eintauchen können. UI-Elemente: Logo, eine 4-Farb-Palette (#5FBFFF, #CAEAFF, #ECECEC, #000000), ein eigenes Icon-Set und die Typografie Rubik.",
      },
      designShowcase: [
        {
          title: "Home & Wetter-Tracking",
          description:
            "Der Home-Screen begrüßt Nutzer:innen namentlich und zeigt die Wettervorhersage des Tages auf einem neumorphen Drehregler, der automatisch einen Waschmodus empfiehlt — das zentrale Unterscheidungsmerkmal der App gegenüber einer Standard-Waschmaschinen-App.",
          imageUrl: "/images/smartwash-hero.jpg",
        },
        {
          title: "Wireframe-Flow",
          description:
            "Vollständiger Wireframe-Flow vom Splash-Screen über den Home-Drehregler, den laufenden Zustand, das Seitenmenü und den Energiemonitor bis zu den manuellen Screens für Temperatur, Spülgänge und Schleuderdrehzahl.",
          imageUrl: "/images/smartwash-wireframe.jpg",
        },
        {
          title: "Manueller Modus & Energiemonitor",
          description:
            "Ein vollständiger manueller Flow (Temperatur, Spülgänge, Schleuderdrehzahl, Favoriten) für Nutzer:innen, die lieber ihren eigenen Waschstil einstellen statt die Empfehlung zu übernehmen, plus eine Nutzungsansicht, die eingesparten Strom pro Zyklus zeigt.",
        },
      ],
      takeaways: [
        "Ein einziges Stück realer Kontext (Wetter) machte aus einem gewöhnlichen Einstellungsbildschirm etwas, das sich wirklich smart anfühlt.",
        "Neumorphismus verstärkte die „weiche, freundliche“ Positionierung, brauchte aber eine disziplinierte, begrenzte Farbpalette, um lesbar zu bleiben.",
        "Einen vollständigen manuellen Modus neben der automatischen Empfehlung zu erhalten, bewahrte das Nutzervertrauen, statt einen einzigen „smarten“ Weg zu erzwingen.",
      ],
    },
    "05": {
      id: "05",
      title: "ecotek",
      subtitle: "Ökologie neu erleben — Rebranding für ein Öko-Architekturbüro",
      role: "Brand- & UI/UX-Designerin",
      deliverables: ["Namensgebung & Rebranding-Strategie", "Logo & Markenidentität", "Farb- & Typografiesystem", "Marketing-Website-Design", "Print-Anzeigenkampagne"],
      timeline: "Schulprojekt (2023)",
      tools: "Illustrator, Photoshop, Figma",
      client: "Digital Campus Vorarlberg (basierend auf Arslan.Fenkart, einem realen Vorarlberger Architekturbüro)",
      problem:
        "Der Auftrag: das ökologische Architekturbüro Arslan.Fenkart neu zu branden, gegründet 2015 in Kennelbach von Dilek Arslan und Johanna Fenkart. Bis 2022 war das Büro auf 15–20 Mitarbeitende gewachsen und hatte mehrere nationale und internationale Öko-Bau-Auszeichnungen erhalten — doch der Name vermittelte kein Gefühl dafür, wofür das Unternehmen tatsächlich stand. Zudem setzen die meisten Öko-Architekt:innen in der Heimatregion Vorarlberg auf Kurven und runde Formen, die nicht zum geradlinigen, holzbetonten Stil des Büros passen.",
      solution:
        "Das Unternehmen wurde in ecotek umbenannt — ECO + TEK/TECH, für Ökologie, Architektur und naturbewusste Technologie — unter dem Slogan \"Ökologie neu erleben\". Ein hausförmiges, baumintegriertes Logo in Grün/Gelb/Blau (Gesundheit, Wärme, Vertrauen) wurde entwickelt und die Identität anschließend durch eine quadratische, minimalistische Marketing-Website, eine dreiteilige Print-Anzeigenkampagne und begleitende Markenrichtlinien weitergeführt.",
      research: [
        {
          title: "Über das Unternehmen",
          description:
            "Arslan.Fenkart: 2015 in Kennelbach gegründet, seit 2017 eine GmbH. Bis 2022 15 Mitarbeitende und mehrere nationale/internationale Architektur- und Öko-Bau-Auszeichnungen. Kernmarkt in Westösterreich, mit Projekten in der Schweiz, Deutschland und Italien. 2022 Umzug in ein selbst entworfenes Gebäude, Wachstum auf 20 Mitarbeitende; Vier-Tage-Woche; gemeinsame Kinderbetreuung mit benachbarten Unternehmen.",
        },
        {
          title: "Audit der visuellen Sprache",
          description:
            "Bestehende Öko-Architektur tendiert zu Kurven, doch Vorarlbergs Öko-Architekt:innen bevorzugen gerade Linien, Quadrate, Dreiecke und Holz als Hauptmaterial. Die Ausrichtung von ecotek folgt diesem regionalen Stil und schlägt gleichzeitig Gebäude vor, die sichtbar Bäume und Pflanzen integrieren — mit Tageslichtfotografie, um den ökologischen Aspekt in den Vordergrund zu stellen.",
        },
        {
          title: "Begründung von Name & Logo",
          description:
            "ecotek verbindet ECO (Ökologie) mit TEK/TECH (Architektur und Technologie) und signalisiert, dass die Technologie des Unternehmens naturbewusst, nachhaltig und energieeffizient ist. Das Logo liest sich als Hausblock mit integriertem Baum; Grün/Gelb/Blau wurden gezielt für Gesundheit, Wärme und Vertrauen gewählt.",
        },
      ],
      infoArchitecture: {
        title: "Website-Struktur",
        description:
          "Logo & Menü (Start / Über uns / Portfolio / Jobs / Kontakt) → Hauptbanner (\"Die Welt verändern\") → Unternehmensvorstellung (\"Wir machen einen Unterschied\") → Arbeitsprozess (Kunden → Ideen → Umsetzung) → Werbevideo → Portfolio-Raster mit echten Öko-Architektur-Referenzen → Unternehmensnews (drei Artikel direkt aus der echten Firmengeschichte, darunter die 2023 hinzugekommene Partnerin Maria Rukavina) → Footer mit Kontaktdaten und Newsletter-Anmeldung. Durchgehend eckige, ungerundete UI — eine bewusste Anlehnung an den geradlinigen Architekturstil des Unternehmens.",
        imageUrl: "/images/ecotek-website.jpg",
      },
      designShowcase: [
        {
          title: "Print-Anzeigenkampagne — \"Zwischen Mensch und Natur\"",
          description:
            "Eine dreiteilige Magazinkampagne (Familie / Firma / Single-Paar), aufgebaut um die Zeile \"Zwischen Mensch und Natur\", jeweils gepaart mit einem anderen Gebäudetyp — Einfamilienhaus, Bürogebäude, Wohnanlage —, um zu vermitteln, dass Leben oder Arbeiten in einem ecotek-Gebäude durch die Symbiose mit der Natur eine neue, bessere Erfahrung ist.",
          imageUrl: "/images/ecotek-campaign.jpg",
        },
        {
          title: "Marketing-Website",
          description:
            "Eine vollständige Unternehmenswebsite — nicht nur ein Styleguide — mit Portfolio-Raster, einem dreistufigen Arbeitsprozess (Kunden, Ideen, Umsetzung) und einem aus den echten Meilensteinen des Unternehmens aufgebauten News-Bereich, alles umgesetzt in dem quadratischen, minimalistischen System, das die Marke forderte.",
        },
      ],
      takeaways: [
        "Ein Rebranding funktioniert nur, wenn die neue visuelle Sprache den tatsächlichen regionalen Kontext der Kundschaft widerspiegelt — generische „Öko“-Kurven zu kopieren, hätte dem geradlinigen, holzbetonten Architekturstil Vorarlbergs widersprochen.",
        "Eine Namensgebung, die die zwei Kernideen der Kundschaft (Ökologie + Technologie) sichtbar verbindet, erklärt mehr als ein rein abstrakter Name.",
        "Ein Schulprojekt wie ein echtes Rebranding zu behandeln — vollständige Website, Anzeigenkampagne und Markenrichtlinien statt nur ein Logo — war der nützlichste Teil der Übung.",
      ],
    },
  },
};

function FadeInImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} [image-rendering:pixelated] transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      onLoad={() => setIsLoaded(true)}
    />
  );
}

function StickyNavigation({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#020711]/95 border-b-2 border-cyan-300/55 shadow-[0_4px_0_rgba(34,211,238,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
        >
          <span className="inline-block skew-x-[12deg]">&lt; {t("backToWorks").toUpperCase()}</span>
        </button>
        <div className="pixel-hud-panel border-cyan-300/55 px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-cyan-100">{t("caseStudy")}</div>
      </div>
    </nav>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full w-full items-center overflow-hidden bg-[#020711] px-6 py-24 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70 [image-rendering:pixelated]" style={{ backgroundImage: `url(${CASE_STUDY_CONSOLE})` }} />
      <div className="pointer-events-none absolute inset-0 bg-[#020711]/42" />
      <div className="pointer-events-none absolute inset-0 opacity-30 arcade-scanline" />
      <div className="relative z-10 mx-auto w-full max-w-6xl pixel-hud-panel !bg-[rgba(2,7,17,0.82)] border-cyan-300/55 p-5 md:p-8">{children}</div>
    </section>
  );
}

function OverviewPage({ project }: { project: CaseStudyProject }) {
  const { t } = useLanguage();
  return (
    <PageShell>
      <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm mb-6">
        {t("project").toUpperCase()} {project.id}
      </p>
      <h1 className="skew-x-[-8deg] font-bebas text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade mb-4">
        <TerminalText text={project.title} speed={70} />
      </h1>
      <p className="font-rajdhani text-base md:text-lg text-white/70 max-w-2xl mb-8">
        <TerminalText text={project.subtitle} speed={18} />
      </p>

      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12">
        <div>
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-1">{t("role")}</p>
          <p className="font-rajdhani text-sm text-white/80">{project.role}</p>
        </div>
        <div>
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-1">{t("timeline")}</p>
          <p className="font-rajdhani text-sm text-white/80">{project.timeline}</p>
        </div>
        {project.client && (
          <div>
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-1">{t("client")}</p>
            <p className="font-rajdhani text-sm text-white/80">{project.client}</p>
          </div>
        )}
        {project.tools && (
          <div>
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-1">{t("tools")}</p>
            <p className="font-rajdhani text-sm text-white/80">{project.tools}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="skew-x-[-8deg] font-bebas text-2xl md:text-3xl font-bold text-white mb-4 text-shadow-cyan">
            {t("problem")}
          </h2>
          <p className="font-rajdhani text-base text-white/70 leading-relaxed"><TerminalText text={project.problem} speed={7} /></p>
        </div>
        <div>
          <h2 className="skew-x-[-8deg] font-bebas text-2xl md:text-3xl font-bold text-cyan-300 mb-4 text-shadow-cyan">
            {t("solution")}
          </h2>
          <p className="font-rajdhani text-base text-white/70 leading-relaxed"><TerminalText text={project.solution} speed={7} /></p>
        </div>
      </div>
    </PageShell>
  );
}

function ResearchPage({ project }: { project: CaseStudyProject }) {
  const { t } = useLanguage();
  return (
    <PageShell>
      <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-white mb-12 text-shadow-cyan">
        {t("researchProcess")}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {project.research.map((item, idx) => (
          <div
            key={idx}
            className="pixel-hud-panel border-cyan-300/40 bg-[#020711e8] p-6 transition-all duration-300 hover:border-cyan-300/75"
          >
            <h3 className="font-bebas text-xl font-bold text-cyan-300 mb-3">{item.title}</h3>
            <p className="font-rajdhani text-sm text-white/70 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

// Legacy source material remains available during the content migration; the application dossier below is the rendered route.
void caseStudyDataByLang;
void FadeInImage;
void OverviewPage;
void ResearchPage;

function FooterPage({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  return (
    <PageShell>
      <p className="font-rajdhani text-sm text-white/60 mb-6">{t("endOfCaseStudy")}</p>
      <button
        onClick={onBack}
        className="skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-4 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
      >
        <span className="inline-block skew-x-[12deg]">&lt; {t("backToWorks").toUpperCase()}</span>
      </button>
    </PageShell>
  );
}

/** Application dossier pages: a readable evidence structure inside the existing 16-bit command-console shell. */
function ApplicationOverviewPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  const { collectItem, progress } = useGameProgress();
  const collectibleId = `case-study-${project.id}`;
  return (
    <PageShell>
      <p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200 md:text-sm">{project.kicker}</p>
      <h1 className="mt-5 font-bebas text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade"><TerminalText text={project.title} speed={65} /></h1>
      <div className="mt-8 grid gap-7 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{t("projectOverview")}</p>
          <p className="mt-3 max-w-3xl font-rajdhani text-base leading-relaxed text-white/80 md:text-lg">{project.overview}</p>
        </div>
        <div className="pixel-hud-panel border-cyan-300/40 bg-[#020711e8] p-5">
          <div className="space-y-4 font-rajdhani text-sm text-white/80">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{t("myRole")}</p><p className="mt-1 leading-relaxed">{project.role}</p></div>
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{t("project")}</p><p className="mt-1">{project.projectType}</p></div>
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{t("timeline")}</p><p className="mt-1">{project.timeline}</p></div>
            {project.link && <a className="inline-block border border-cyan-300/60 px-3 py-2 font-black uppercase tracking-[0.16em] text-cyan-100 transition-colors hover:bg-cyan-300 hover:text-[#06101e]" href={project.link} target="_blank" rel="noreferrer">↗ {t("openProject")}</a>}
          </div>
        </div>
      </div>
      {!progress.collected.includes(collectibleId) && <button type="button" onClick={() => collectItem(collectibleId)} aria-label="Collect hidden project data chip" title="Hidden project data chip" className="pixel-collectible mt-6 inline-block border border-cyan-300/45 bg-[#020711e8] px-3 py-1 font-bebas text-xl text-cyan-200">◆ DATA CHIP</button>}
    </PageShell>
  );
}

function ApplicationResearchPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  return <PageShell><div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]"><div><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">01 // {t("problem")}</p><h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">{t("problem")}</h2><p className="mt-6 font-rajdhani text-base leading-relaxed text-white/80">{project.challenge}</p></div><div><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">02 // {t("researchInsights")}</p><div className="mt-5 space-y-3">{project.researchInsights.map((insight, index) => <div key={insight} className="pixel-hud-panel border-l-4 border-cyan-300/65 bg-[#020711e8] p-4"><span className="font-bebas text-xl text-cyan-300">0{index + 1}</span><p className="mt-1 font-rajdhani leading-relaxed text-white/75">{insight}</p></div>)}</div></div></div></PageShell>;
}

function ApplicationProcessPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  const stages = [["01", "IA", project.process.informationArchitecture], ["02", "WIREFRAMES", project.process.wireframes], ["03", "HIGH-FIDELITY", project.process.highFidelity], ["04", "PROTOTYPE", project.process.prototype], ["05", "TESTING", project.process.testing]] as const;
  return <PageShell><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">03 // {t("designProcess")}</p><h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">IA → WIREFRAMES → HI-FI → PROTOTYPE → TEST</h2><div className="mt-8 grid gap-3 md:grid-cols-5">{stages.map(([step, label, description]) => <article key={step} className="pixel-hud-panel border-cyan-300/40 bg-[#020711e8] p-4"><p className="font-bebas text-2xl text-cyan-300">{step}</p><h3 className="mt-2 font-rajdhani text-xs font-black tracking-[0.14em] text-white">{label}</h3><p className="mt-3 font-rajdhani text-sm leading-relaxed text-white/70">{description}</p></article>)}</div></PageShell>;
}

function ApplicationInteractionsPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  return <PageShell><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">04 // {t("keyInteractions")}</p><h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">{t("keyInteractions")}</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{project.keyInteractions.map((interaction, index) => <article key={interaction} className="pixel-hud-panel border-cyan-300/45 bg-[#020711e8] p-5"><span className="font-bebas text-3xl text-cyan-300">{`0${index + 1}`}</span><p className="mt-4 font-rajdhani leading-relaxed text-white/75">{interaction}</p></article>)}</div></PageShell>;
}

function ApplicationImpactPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  return <PageShell><div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]"><div><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">05 // {t("resultsImpact")}</p><h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">{t("resultsImpact")}</h2><div className="mt-7 space-y-3">{project.impact.map((item) => <div key={item} className="pixel-hud-panel border-l-4 border-cyan-300/65 bg-[#020711e8] p-4 font-rajdhani leading-relaxed text-white/75">→ {item}</div>)}</div></div><div className="pixel-hud-panel self-end border-cyan-300/45 bg-[#020711e8] p-6"><p className="font-rajdhani text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{t("tools")}</p><ul className="mt-4 space-y-3">{project.tools.map((tool) => <li key={tool} className="border border-cyan-300/35 px-3 py-2 font-rajdhani text-sm font-bold text-cyan-100">{tool}</li>)}</ul></div></div></PageShell>;
}

export default function CaseStudy({
  projectId,
  onBack,
}: {
  projectId: string;
  onBack: () => void;
}) {
  const { t, language } = useLanguage();
  const { selectedRole, palette } = useRoleTheme();
  const project = applicationCaseStudyContent[language].find((item) => item.id === projectId);

  if (!project) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-rajdhani text-white/60 mb-4">{t("projectNotFound")}</p>
          <button
            onClick={onBack}
            className="skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-4 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
          >
            <span className="inline-block skew-x-[12deg]">&lt; {t("back").toUpperCase()}</span>
          </button>
        </div>
      </div>
    );
  }

  const pages = [
    <ApplicationOverviewPage key="overview" project={project} />,
    <ApplicationResearchPage key="research" project={project} />,
    <ApplicationProcessPage key="process" project={project} />,
    <ApplicationInteractionsPage key="interactions" project={project} />,
    <ApplicationImpactPage key="impact" project={project} />,
    <FooterPage key="footer" onBack={onBack} />,
  ];

  return (
    <div className="role-theme-scope relative h-auto min-h-dvh overflow-visible bg-black text-white md:h-dvh md:overflow-hidden" data-player-role={selectedRole}>
      <LanguageSwitcher elevated />
      <StickyNavigation onBack={onBack} />
      <HorizontalSlider showDots showArrows accentColor={palette.accentColor}>
        {pages}
      </HorizontalSlider>
    </div>
  );
}
