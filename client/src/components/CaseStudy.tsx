import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
    imageUrl: string;
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
    title: "Locaverse GmbH",
    subtitle: "Spatial Collaboration Platform for Global Business",
    role: "UX/UI Designer, Research Lead",
    deliverables: [
      "User Research & Persona Development",
      "Information Architecture",
      "Wireframes & Prototypes",
      "UI Design System",
      "Interactive Prototype",
    ],
    timeline: "3 months",
    tools: "Figma, Framer, Principle",
    client: "Locaverse GmbH",
    problem:
      "Global teams struggle with spatial collaboration and understanding complex business workflows across distributed locations. Existing platforms lack intuitive spatial representation and real-time collaboration features.",
    solution:
      "Designed a spatial collaboration platform that combines 3D spatial visualization with intuitive UI, enabling teams to collaborate seamlessly across geographic boundaries. The platform provides real-time interaction and spatial context for better decision-making.",
    research: [
      {
        title: "User Research",
        description:
          "Conducted in-depth interviews with 20 global team members and business leaders to identify key pain points in spatial collaboration.",
      },
      {
        title: "Competitive Analysis",
        description:
          "Analyzed existing collaboration tools (Figma, Miro, Gather) to identify strengths and differentiation opportunities.",
      },
      {
        title: "Persona Development",
        description:
          "Created detailed personas for remote teams, project managers, and spatial computing enthusiasts to guide design direction.",
      },
    ],
    infoArchitecture: {
      title: "Information Architecture & User Flow",
      description:
        "Designed a comprehensive user journey from onboarding through spatial workspace creation, team collaboration, and real-time interaction. Each section provides clear objectives and intuitive navigation.",
    },
    designShowcase: [
      {
        title: "Dashboard & Workspace Overview",
        description:
          "Central hub displaying team workspaces, recent projects, and spatial collaboration metrics in an accessible interface.",
        imageUrl: "/images/project-locaverse.jpg",
        isMockup: true,
      },
      {
        title: "Spatial Collaboration Interface",
        description:
          "Interactive 3D workspace where team members can place objects, annotate, and collaborate in real-time.",
        imageUrl: "/images/project-locaverse.jpg",
        isMockup: true,
      },
      {
        title: "Team Management & Permissions",
        description:
          "Intuitive controls for managing team members, setting permissions, and tracking collaboration history.",
        imageUrl: "/images/project-locaverse.jpg",
        isMockup: true,
      },
    ],
    takeaways: [
      "Spatial thinking enhances collaboration and reduces communication friction in distributed teams.",
      "Combining 3D visualization with familiar 2D UI patterns creates an accessible yet powerful experience.",
      "Real-time feedback and spatial context significantly improve team decision-making efficiency.",
    ],
    metrics: [
      { label: "Team Collaboration", value: "+85%" },
      { label: "Project Completion", value: "+72%" },
      { label: "User Satisfaction", value: "9.2/10" },
    ],
  },
  "02": {
    id: "02",
    title: "Smart Wash",
    subtitle: "Smart Home Appliance UX/UI Design",
    role: "UX/UI Designer",
    deliverables: [
      "User Research",
      "Wireframing",
      "Visual Design",
      "Prototype",
      "Design System",
    ],
    timeline: "2 months",
    tools: "Figma, Protopie",
    client: "Personal Project",
    problem:
      "Smart home appliance interfaces are often overly complex, requiring users to manually select wash modes without considering real-time environmental factors. Users struggle to optimize washing settings for different fabrics and weather conditions.",
    solution:
      "Designed an intelligent washing machine interface that analyzes real-time weather data and fabric types to recommend optimal wash modes. The UI prioritizes simplicity while providing advanced customization for power users.",
    research: [
      {
        title: "User Interviews",
        description:
          "Conducted interviews with 15 households to understand washing habits, pain points, and expectations for smart appliances.",
      },
      {
        title: "Market Research",
        description:
          "Analyzed existing smart appliance apps and IoT interfaces to identify best practices and gaps.",
      },
      {
        title: "Usability Testing",
        description:
          "Tested early prototypes with target users to validate recommendations and interface clarity.",
      },
    ],
    infoArchitecture: {
      title: "Information Architecture",
      description:
        "Structured the interface into three layers: quick-start recommendations, detailed mode selection, and advanced settings. Each layer is accessible but doesn't overwhelm casual users.",
    },
    designShowcase: [
      {
        title: "Smart Recommendation Screen",
        description:
          "AI-powered interface that suggests optimal wash modes based on fabric type, soil level, and current weather conditions.",
        imageUrl: "/images/project-smartwash.jpg",
        isMockup: true,
      },
      {
        title: "Mode Selection & Customization",
        description:
          "Intuitive controls for selecting wash modes, adjusting temperature, and monitoring cycle progress in real-time.",
        imageUrl: "/images/project-smartwash.jpg",
        isMockup: true,
      },
      {
        title: "Energy & Water Savings Dashboard",
        description:
          "Displays usage statistics, cost savings, and environmental impact to encourage sustainable washing habits.",
        imageUrl: "/images/project-smartwash.jpg",
        isMockup: true,
      },
    ],
    takeaways: [
      "Intelligent defaults significantly reduce cognitive load while maintaining user agency.",
      "Contextual recommendations based on real-world data create more intuitive experiences.",
      "Transparency about resource usage motivates sustainable behavior change.",
    ],
    metrics: [
      { label: "Water Savings", value: "+40%" },
      { label: "Energy Efficiency", value: "+35%" },
      { label: "User Satisfaction", value: "8.8/10" },
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
              className={`grid md:grid-cols-2 gap-8 items-center ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                <h3 className="font-bebas text-2xl font-bold text-cyan-300 mb-4">
                  {showcase.title}
                </h3>
                <p className="font-rajdhani text-base text-white/70 leading-relaxed">
                  {showcase.description}
                </p>
              </div>
              <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                <div className="relative overflow-hidden rounded-lg border-2 border-cyan-300/30 bg-slate-950">
                  <FadeInImage
                    src={showcase.imageUrl}
                    alt={showcase.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
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
