import { useState, useEffect, ReactNode } from "react";
import HorizontalSlider from "./HorizontalSlider";

/**
 * Design System — "Precision in Motion"
 * Dark mode base with Electric Cyan (#00F0FF) + Magenta (#FF00AA) accents
 * Minimalist, premium, energetic aesthetic
 * Butter-smooth 60fps animations, generous whitespace, excellent hierarchy
 */

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
    isMockup?: boolean;
  }[];
  takeaways: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
};

const caseStudyData: Record<string, CaseStudyProject> = {
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
};

function FadeInImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      onLoad={() => setIsLoaded(true)}
    />
  );
}

function StickyNavigation({ onBack }: { onBack: () => void }) {
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
          ? "bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
        >
          <span className="inline-block skew-x-[12deg]">← BACK TO WORKS</span>
        </button>
        <div className="text-white/60 text-sm">Case Study</div>
      </div>
    </nav>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full w-full items-center bg-black px-6 py-24 md:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-20 arcade-scanline" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function OverviewPage({ project }: { project: CaseStudyProject }) {
  return (
    <PageShell>
      <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm mb-6">
        PROJECT {project.id}
      </p>
      <h1 className="skew-x-[-8deg] font-bebas text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade mb-4">
        {project.title}
      </h1>
      <p className="font-rajdhani text-base md:text-lg text-white/70 max-w-2xl mb-8">
        {project.subtitle}
      </p>

      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12">
        <div>
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-1">Role</p>
          <p className="font-rajdhani text-sm text-white/80">{project.role}</p>
        </div>
        <div>
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-1">Timeline</p>
          <p className="font-rajdhani text-sm text-white/80">{project.timeline}</p>
        </div>
        {project.client && (
          <div>
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-1">Client</p>
            <p className="font-rajdhani text-sm text-white/80">{project.client}</p>
          </div>
        )}
        {project.tools && (
          <div>
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-1">Tools</p>
            <p className="font-rajdhani text-sm text-white/80">{project.tools}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="skew-x-[-8deg] font-bebas text-2xl md:text-3xl font-bold text-white mb-4 text-shadow-cyan">
            Problem
          </h2>
          <p className="font-rajdhani text-base text-white/70 leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <h2 className="skew-x-[-8deg] font-bebas text-2xl md:text-3xl font-bold text-cyan-300 mb-4 text-shadow-cyan">
            Solution
          </h2>
          <p className="font-rajdhani text-base text-white/70 leading-relaxed">{project.solution}</p>
        </div>
      </div>
    </PageShell>
  );
}

function ResearchPage({ project }: { project: CaseStudyProject }) {
  return (
    <PageShell>
      <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-white mb-12 text-shadow-cyan">
        Research & Process
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {project.research.map((item, idx) => (
          <div
            key={idx}
            className="border-2 border-cyan-300/30 rounded-lg p-6 bg-slate-950/50 backdrop-blur-sm hover:border-cyan-300/60 transition-all duration-300"
          >
            <h3 className="font-bebas text-xl font-bold text-cyan-300 mb-3">{item.title}</h3>
            <p className="font-rajdhani text-sm text-white/70 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function InfoArchitecturePage({ project }: { project: CaseStudyProject }) {
  const ia = project.infoArchitecture;
  return (
    <PageShell>
      <div className={`grid gap-8 items-center ${ia.imageUrl ? "md:grid-cols-2" : "max-w-3xl"}`}>
        <div>
          <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-white mb-6 text-shadow-cyan">
            {ia.title}
          </h2>
          <p className="font-rajdhani text-base md:text-lg text-white/70 leading-relaxed">
            {ia.description}
          </p>
        </div>
        {ia.imageUrl && (
          <div className="relative overflow-hidden rounded-lg border-2 border-cyan-300/30 bg-slate-950">
            <FadeInImage src={ia.imageUrl} alt={ia.title} className="w-full h-auto" />
          </div>
        )}
      </div>
    </PageShell>
  );
}

function DesignShowcasePage({
  showcase,
}: {
  showcase: CaseStudyProject["designShowcase"][number];
}) {
  return (
    <PageShell>
      <div className={`grid gap-8 items-center ${showcase.imageUrl ? "md:grid-cols-2" : "max-w-3xl"}`}>
        <div>
          <h3 className="font-bebas text-2xl md:text-3xl font-bold text-cyan-300 mb-4">{showcase.title}</h3>
          <p className="font-rajdhani text-base text-white/70 leading-relaxed">{showcase.description}</p>
        </div>
        {showcase.imageUrl && (
          <div className="relative overflow-hidden rounded-lg border-2 border-cyan-300/30 bg-slate-950">
            <FadeInImage src={showcase.imageUrl} alt={showcase.title} className="w-full h-auto" />
          </div>
        )}
      </div>
    </PageShell>
  );
}

function TakeawaysPage({ project }: { project: CaseStudyProject }) {
  return (
    <PageShell>
      <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-white mb-12 text-shadow-cyan">
        Key Takeaways
      </h2>
      <div className="space-y-4">
        {project.takeaways.map((takeaway, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-4 border-l-4 border-cyan-300/50 bg-slate-950/30 rounded-r-lg"
          >
            <span className="text-cyan-300 font-bold text-lg flex-shrink-0">→</span>
            <p className="font-rajdhani text-base text-white/70 leading-relaxed">{takeaway}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function BusinessImpactPage({ project }: { project: CaseStudyProject }) {
  return (
    <PageShell>
      <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-white mb-12 text-shadow-cyan">
        Business Impact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {project.metrics!.map((metric, idx) => (
          <div key={idx} className="border-2 border-cyan-300/30 rounded-lg p-6 bg-slate-950/50 backdrop-blur-sm">
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-2">
              {metric.label}
            </p>
            <p className="font-bebas text-3xl font-bold text-cyan-300">{metric.value}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function FooterPage({ onBack }: { onBack: () => void }) {
  return (
    <PageShell>
      <p className="font-rajdhani text-sm text-white/60 mb-6">End of Case Study</p>
      <button
        onClick={onBack}
        className="skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-4 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
      >
        <span className="inline-block skew-x-[12deg]">← BACK TO WORKS</span>
      </button>
    </PageShell>
  );
}

export default function CaseStudy({
  projectId,
  onBack,
}: {
  projectId: string;
  onBack: () => void;
}) {
  const project = caseStudyData[projectId];

  if (!project) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-rajdhani text-white/60 mb-4">Project not found</p>
          <button
            onClick={onBack}
            className="skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-4 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
          >
            <span className="inline-block skew-x-[12deg]">← BACK</span>
          </button>
        </div>
      </div>
    );
  }

  const pages = [
    <OverviewPage key="overview" project={project} />,
    <ResearchPage key="research" project={project} />,
    <InfoArchitecturePage key="ia" project={project} />,
    ...project.designShowcase.map((showcase) => (
      <DesignShowcasePage key={showcase.title} showcase={showcase} />
    )),
    <TakeawaysPage key="takeaways" project={project} />,
    ...(project.metrics ? [<BusinessImpactPage key="impact" project={project} />] : []),
    <FooterPage key="footer" onBack={onBack} />,
  ];

  return (
    <div className="relative h-auto min-h-dvh overflow-visible bg-black text-white md:h-dvh md:overflow-hidden">
      <StickyNavigation onBack={onBack} />
      <HorizontalSlider showDots showArrows>
        {pages}
      </HorizontalSlider>
    </div>
  );
}
