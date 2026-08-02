import { useState, useEffect } from "react";

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
      "Foreign learners study Korean from textbooks, but real Koreans speak in slang and neologisms — expressions like ㄱㄱ, 노잼, and 갬성 — that no textbook teaches, leaving learners lost in everyday conversation and pop culture.",
    solution:
      "Designed Sokdak, a Korean slang dictionary app fronted by a friendly tiger mascot, that surfaces trending expressions with plain-language meanings and real cultural context (for example, tracing '리즈' back to Leeds United), plus a community feed for practicing new slang in context.",
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
        title: "Home Feed",
        description:
          "A scannable card feed of trending and newly coined slang terms, each tagged by category (drama/movie references, in-group expressions, community picks).",
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
    },
    designShowcase: [
      {
        title: "Hero & Core Value Proposition",
        description:
          "Rebuilt the hero to lead with the core benefit — digital customer acquisition for mobile service and delivery providers — instead of a generic company introduction.",
      },
      {
        title: "Free Report Lead-Gen Module",
        description:
          "A dedicated module for the free \"Expertenreport\" download, isolated from every other call-to-action on the page to remove decision friction.",
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
      "Designed Smart Wash, a washing machine app that reads local weather data and recommends a wash mode automatically, while still offering a full manual mode and an energy-savings monitor for people who want control. The visual direction moved from a flat baseline to a soft neumorphic style — described internally as Smart, Soft, Friendly — so the app feels less like an industrial control panel.",
    research: [
      {
        title: "As-Is / To-Be Direction",
        description:
          "Started from a flat, generic \"smart app\" baseline and moved deliberately toward neumorphism — soft shadows and rounded surfaces designed to make the app feel inviting enough to want to keep tapping.",
      },
      {
        title: "Visual Research",
        description:
          "Explored 3D and neumorphic reference work, then built out the supporting logo, icon set, color palette (light blues, grey, black), and typography before touching final screens.",
      },
      {
        title: "Wireframing",
        description:
          "Wireframed the full flow — home, manual mode, temperature and rinse settings, favorites, and notification settings — before applying visual design.",
      },
    ],
    infoArchitecture: {
      title: "Information Architecture",
      description:
        "Structured the app around three entry points from the home screen — Weather Tracking (automatic recommendation), Manual Mode (full user control), and Energy Monitor (usage feedback) — so a first-time user can start a wash in one tap while power users can still dig into manual settings.",
    },
    designShowcase: [
      {
        title: "Weather Tracking",
        description:
          "The home screen surfaces the day's forecast and automatically recommends a wash mode based on it — the app's main point of difference from a standard washing machine app.",
      },
      {
        title: "Manual Mode",
        description:
          "A full manual flow (temperature, rinse count, spin speed) for users who'd rather set their own wash style than take the recommendation.",
      },
      {
        title: "Energy Monitor",
        description:
          "A simple usage view showing how much electricity a wash cycle used, encouraging more efficient habits without hiding control from the user.",
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
    subtitle: "Ökologie neu erleben — Sustainable Brand Identity",
    role: "Brand & UI/UX Designer",
    deliverables: [
      "Logo & Brand Identity",
      "Color & Typography System",
      "Marketing Website Design",
    ],
    timeline: "School Project (2023)",
    tools: "Illustrator, Photoshop, Figma",
    client: "Digital Campus Vorarlberg (Personal Project)",
    problem:
      "As a brand-design exercise at Digital Campus Vorarlberg, the brief called for a fictional sustainability-focused company that needed a complete visual identity built from the ground up — not just a logo, but a full marketing website carrying that identity.",
    solution:
      "Created ecotek, a nature-inspired brand built around a tree-and-cloud mark and the tagline \"Ökologie neu erleben\" (Experience ecology anew), then extended the identity into a full marketing website and supporting visual system rather than treating it as a logo-only exercise.",
    research: [
      {
        title: "Brand Concept",
        description:
          "Built the identity around organic, rounded forms and a green/grey palette to signal sustainability without leaning on cliché leaf-and-globe imagery.",
      },
      {
        title: "Identity System",
        description:
          "Extended the mark into a cohesive typography and color system, applied consistently across the website and supporting marketing collateral.",
      },
    ],
    infoArchitecture: {
      title: "Website Structure",
      description:
        "Designed the marketing site to carry the brand story from logo and mission through product/service messaging into a consistent visual system, matching the structure of a real company website rather than a portfolio mockup.",
    },
    designShowcase: [
      {
        title: "Logo & Mark",
        description:
          "A tree-and-cloud mark paired with a clean wordmark, designed to read clearly at small sizes across web and print.",
      },
      {
        title: "Marketing Website",
        description:
          "A full website built around the brand system, translating the identity into real page layouts rather than stopping at a style guide.",
      },
    ],
    takeaways: [
      "A strong, simple mark (tree + cloud) does more brand work than an elaborate one when it has to scale across an entire website.",
      "Treating a school brief like a real client project — a full site, not just a logo — was the most useful part of the exercise.",
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

function HeroSection({ project }: { project: CaseStudyProject }) {
  return (
    <section className="relative w-full min-h-screen bg-black pt-20">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-black to-black"
        style={{
          backgroundAttachment: "fixed",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-30 arcade-scanline" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="mb-6">
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm">
            PROJECT {project.id}
          </p>
        </div>
        <h1 className="skew-x-[-8deg] font-bebas text-[clamp(2.6rem,7.2vw,7.2rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade mb-4">
          {project.title}
        </h1>
        <p className="font-rajdhani text-base md:text-lg text-white/70 max-w-2xl mb-8">
          {project.subtitle}
        </p>

        {project.metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="border-2 border-cyan-300/30 rounded-lg p-6 bg-slate-950/50 backdrop-blur-sm"
              >
                <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-2">
                  {metric.label}
                </p>
                <p className="font-bebas text-3xl font-bold text-cyan-300">{metric.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectMetaBar({ project }: { project: CaseStudyProject }) {
  return (
    <section className="relative w-full bg-black border-t border-cyan-500/20 py-12">
      <div className="pointer-events-none absolute inset-0 opacity-20 arcade-scanline" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-2">
              Role
            </p>
            <p className="font-rajdhani text-sm text-white/80">{project.role}</p>
          </div>
          <div>
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-2">
              Timeline
            </p>
            <p className="font-rajdhani text-sm text-white/80">{project.timeline}</p>
          </div>
          {project.client && (
            <div>
              <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-2">
                Client
              </p>
              <p className="font-rajdhani text-sm text-white/80">{project.client}</p>
            </div>
          )}
          {project.tools && (
            <div>
              <p className="font-rajdhani text-xs font-black uppercase tracking-[0.18em] text-cyan-200 mb-2">
                Tools
              </p>
              <p className="font-rajdhani text-sm text-white/80">{project.tools}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProblemSolutionSection({ project }: { project: CaseStudyProject }) {
  return (
    <section className="relative w-full bg-black py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20 arcade-scanline" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-white mb-6 text-shadow-cyan">
              The Challenge
            </h2>
            <p className="font-rajdhani text-base text-white/70 leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div>
            <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-cyan-300 mb-6 text-shadow-cyan">
              The Solution
            </h2>
            <p className="font-rajdhani text-base text-white/70 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchProcessSection({ project }: { project: CaseStudyProject }) {
  return (
    <section className="relative w-full bg-black py-16 md:py-24 border-t border-cyan-500/20">
      <div className="pointer-events-none absolute inset-0 opacity-20 arcade-scanline" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-white mb-12 text-shadow-cyan">
          Research & Process
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {project.research.map((item, idx) => (
            <div
              key={idx}
              className="border-2 border-cyan-300/30 rounded-lg p-6 bg-slate-950/50 backdrop-blur-sm hover:border-cyan-300/60 transition-all duration-300"
            >
              <h3 className="font-bebas text-xl font-bold text-cyan-300 mb-3">
                {item.title}
              </h3>
              <p className="font-rajdhani text-sm text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {project.infoArchitecture && (
          <div className="mt-16">
            <h3 className="skew-x-[-8deg] font-bebas text-2xl md:text-3xl font-bold text-white mb-6 text-shadow-cyan">
              {project.infoArchitecture.title}
            </h3>
            <p className="font-rajdhani text-base text-white/70 leading-relaxed max-w-3xl">
              {project.infoArchitecture.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function DesignShowcaseSection({ project }: { project: CaseStudyProject }) {
  return (
    <section className="relative w-full bg-black py-16 md:py-24 border-t border-cyan-500/20">
      <div className="pointer-events-none absolute inset-0 opacity-20 arcade-scanline" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="skew-x-[-8deg] font-bebas text-3xl md:text-4xl font-bold text-white mb-12 text-shadow-cyan">
          Design Showcase
        </h2>
        <div className="space-y-16">
          {project.designShowcase.map((showcase, idx) => (
            <div
              key={idx}
              className={`grid gap-8 items-center ${
                showcase.imageUrl ? "md:grid-cols-2" : "max-w-3xl"
              } ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={idx % 2 === 1 && showcase.imageUrl ? "md:order-2" : ""}>
                <h3 className="font-bebas text-2xl font-bold text-cyan-300 mb-4">
                  {showcase.title}
                </h3>
                <p className="font-rajdhani text-base text-white/70 leading-relaxed">
                  {showcase.description}
                </p>
              </div>
              {showcase.imageUrl && (
                <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                  <div className="relative overflow-hidden rounded-lg border-2 border-cyan-300/30 bg-slate-950">
                    <FadeInImage
                      src={showcase.imageUrl}
                      alt={showcase.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TakeawaysSection({ project }: { project: CaseStudyProject }) {
  return (
    <section className="relative w-full bg-black py-16 md:py-24 border-t border-cyan-500/20">
      <div className="pointer-events-none absolute inset-0 opacity-20 arcade-scanline" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
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
              <p className="font-rajdhani text-base text-white/70 leading-relaxed">
                {takeaway}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection({ onBack }: { onBack: () => void }) {
  return (
    <section className="relative w-full bg-black border-t border-cyan-500/20 py-12">
      <div className="pointer-events-none absolute inset-0 opacity-20 arcade-scanline" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <p className="font-rajdhani text-sm text-white/60">End of Case Study</p>
        <button
          onClick={onBack}
          className="skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-4 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
        >
          <span className="inline-block skew-x-[12deg]">← BACK TO WORKS</span>
        </button>
      </div>
    </section>
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

  return (
    <div className="relative w-full bg-black text-white overflow-y-auto">
      <StickyNavigation onBack={onBack} />
      <HeroSection project={project} />
      <ProjectMetaBar project={project} />
      <ProblemSolutionSection project={project} />
      <ResearchProcessSection project={project} />
      <DesignShowcaseSection project={project} />
      <TakeawaysSection project={project} />
      <FooterSection onBack={onBack} />
    </div>
  );
}
