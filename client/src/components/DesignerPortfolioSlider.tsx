import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import HorizontalSlider from "./HorizontalSlider";
import CaseStudy from "./CaseStudy";

type DesignProject = {
  id: string;
  title: string;
  tag: string;
  description: string;
  link?: string | null;
};

const designProjects: DesignProject[] = [
  {
    id: "01",
    title: "Sokdak",
    tag: "TEAM PROJECT / ONGOING",
    description:
      "Korean Slang & Neologism App — A friendly dictionary app teaching foreign learners the real Korean textbooks skip.",
    link: "https://www.behance.net/gallery/251527199/UXUI-Design-(SokDak)",
  },
  {
    id: "02",
    title: "Seek and Sight",
    tag: "EDTECH / ONGOING",
    description:
      "Inclusive STEAM Literacy Platform for Children — Landing page, character system, and weekly content design for a nonprofit learning platform.",
    link: null,
  },
  {
    id: "03",
    title: "Locaverse GmbH",
    tag: "CLIENT PROJECT / 2023",
    description:
      "Business.Locaverse.at Redesign — Lead-generation landing page redesign for a mobile-service marketplace.",
    link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH",
  },
  {
    id: "04",
    title: "Smart Wash",
    tag: "PERSONAL PROJECT / 2022",
    description:
      "Smart Home Appliance UX/UI — Weather-aware washing machine app that recommends the right wash mode.",
    link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash",
  },
  {
    id: "05",
    title: "ecotek",
    tag: "SCHOOL PROJECT / 2023",
    description:
      "Sustainable Brand Identity — Logo, brand system, and marketing website for a fictional sustainability company.",
    link: "https://www.behance.net/gallery/167813977/Brand-Design-ecotek",
  },
];

function ProjectsSlide({ onViewCaseStudy }: { onViewCaseStudy: (projectId: string) => void }) {
  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-[#07111f] px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40 arcade-scanline" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-3 shrink-0 md:mb-5">
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm">PLAYER 01 ARCHIVE</p>
          <h1 className="skew-x-[-8deg] font-bebas text-[clamp(2.6rem,7.2vw,7.2rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
            DESIGN PORTFOLIO
          </h1>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
          {designProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onViewCaseStudy(project.id)}
              className="group relative flex min-h-[220px] flex-col cursor-pointer overflow-hidden border-2 border-cyan-100/18 bg-slate-950 shadow-[6px_6px_0_rgba(34,211,238,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/80 hover:shadow-[10px_10px_0_rgba(34,211,238,0.22)] md:hover:-translate-y-2 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start p-4 md:p-6"
            >
              <div className="inline-block w-fit skew-x-[-12deg] bg-cyan-300 px-2 py-1 font-rajdhani text-[0.62rem] font-black tracking-[0.18em] text-slate-950 md:px-3 md:text-xs">
                <span className="inline-block skew-x-[12deg]">PROJECT {project.id}</span>
              </div>
              <div className="mt-4 flex flex-1 flex-col justify-end">
                <p className="font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.22em] text-cyan-200 md:text-xs">{project.tag}</p>
                <h2 className="mt-1 skew-x-[-8deg] font-bebas text-[clamp(1.45rem,5.2vw,2.7rem)] leading-none tracking-[0.04em] text-white md:mt-2">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-3 font-rajdhani text-xs font-medium leading-snug text-white/68 md:line-clamp-4 md:text-sm lg:text-base">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutMeSkillsSlide() {
  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-dark-primary px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40 arcade-scanline" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* About Me Section */}
        <div className="mb-12">
          <p className="font-rajdhani text-xs font-black uppercase tracking-widest text-cyan-300 mb-4">
            About Me
          </p>
          <h2 className="font-bebas text-4xl font-bold text-light-primary mb-6 text-shadow-cyan">
            Designer & Dancer
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 mb-8">
            <div className="flex items-center justify-center">
              <div className="relative h-80 w-64 overflow-hidden border-2 border-cyan-400/50 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <img
                  src="/manus-storage/Gemini_Generated_Image_s30zdos30zdos30z_28271392.png"
                  alt="Designer Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-rajdhani text-base leading-relaxed text-light-secondary mb-4">
                Sunghee Im, a UX Designer based in Vienna, originally from South Korea. With a unique background in movement and choreography, I specialize in embodied interaction, gesture-based UX, and spatial computing.
              </p>
              <p className="font-rajdhani text-base leading-relaxed text-light-secondary mb-4">
                My dance experience taught me how the body naturally interacts with space and technology — this insight drives my design process to create intuitive, human-centered digital experiences.
              </p>
              <p className="font-rajdhani text-base leading-relaxed text-light-secondary">
                Currently freelancing as UX Designer & Visual Strategist (2+ years), I am applying to the Master's in Interaction Design at FH Joanneum to deepen my research in movement-based design and immersive experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="border-t-2 border-cyan-300/30 pt-12">
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm mb-4">SKILLS</p>
          <h3 className="font-bebas text-3xl font-bold text-light-primary mb-8 text-shadow-cyan">Core Competencies</h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-2 border-cyan-300/30 rounded-lg p-6 bg-slate-950/50">
              <h4 className="font-bebas text-2xl font-bold text-cyan-300 mb-4">Design Tools</h4>
              <ul className="space-y-2 font-rajdhani text-light-secondary">
                <li>• Figma</li>
                <li>• Framer</li>
                <li>• Protopie</li>
                <li>• Principle</li>
              </ul>
            </div>
            <div className="border-2 border-cyan-300/30 rounded-lg p-6 bg-slate-950/50">
              <h4 className="font-bebas text-2xl font-bold text-cyan-300 mb-4">Core Expertise</h4>
              <ul className="space-y-2 font-rajdhani text-light-secondary">
                <li>• Interaction Design</li>
                <li>• Embodied Interaction</li>
                <li>• User Research</li>
                <li>• Visual Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSlide() {
  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-[#07111f] px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40 arcade-scanline" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm mb-4">CONTACT</p>
        <h2 className="font-bebas text-4xl font-bold text-light-primary mb-8 text-shadow-cyan">Get in Touch</h2>
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <a 
            href="mailto:yimsungh@gmail.com" 
            className="border-2 border-cyan-300/30 rounded-lg p-6 text-center transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-950/50"
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">Email</p>
            <p className="font-bebas text-lg text-cyan-300 break-all">yimsungh@gmail.com</p>
          </a>
          <a 
            href="https://www.linkedin.com/in/sunghee-im/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border-2 border-cyan-300/30 rounded-lg p-6 text-center transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-950/50"
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">LinkedIn</p>
            <p className="font-bebas text-lg text-cyan-300">sunghee-im</p>
          </a>
          <a 
            href="/resume.pdf" 
            download 
            className="border-2 border-cyan-300/30 rounded-lg p-6 text-center transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-950/50 cursor-pointer"
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">Resume</p>
            <p className="font-bebas text-lg text-cyan-300">Download CV</p>
          </a>
        </div>

        <div className="border-t-2 border-cyan-300/30 pt-8">
          <h3 className="font-bebas text-2xl font-bold text-light-primary mb-6">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block font-rajdhani text-sm font-semibold text-light-secondary mb-2">Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-950/50 border-2 border-cyan-300/30 rounded px-4 py-2 font-rajdhani text-light-primary focus:outline-none focus:border-cyan-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-sm font-semibold text-light-secondary mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-slate-950/50 border-2 border-cyan-300/30 rounded px-4 py-2 font-rajdhani text-light-primary focus:outline-none focus:border-cyan-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-sm font-semibold text-light-secondary mb-2">Message</label>
              <textarea 
                className="w-full bg-slate-950/50 border-2 border-cyan-300/30 rounded px-4 py-2 font-rajdhani text-light-primary focus:outline-none focus:border-cyan-300 resize-none"
                rows={4}
                placeholder="Your message..."
              />
            </div>
            <button 
              type="submit"
              className="w-full skew-x-[-12deg] border-2 border-cyan-300/50 bg-cyan-300/20 px-4 py-2 font-rajdhani text-sm font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:bg-cyan-300 hover:text-[#06101e]"
            >
              <span className="inline-block skew-x-[12deg]">Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function DesignerPortfolioSlider({
  onBack,
}: {
  onBack: () => void;
}) {
  const [view, setView] = useState<"slider" | { type: "caseStudy"; projectId: string }>("slider");

  const handleViewCaseStudy = (projectId: string) => {
    setView({ type: "caseStudy", projectId });
  };

  const handleBackFromCaseStudy = () => {
    setView("slider");
  };

  if (view !== "slider") {
    return (
      <CaseStudy
        projectId={view.projectId}
        onBack={handleBackFromCaseStudy}
      />
    );
  }

  return (
    <div className="relative h-auto min-h-dvh overflow-visible md:h-[100dvh] md:overflow-hidden bg-black">
      <LanguageSwitcher theme="cyan" />
      <button
        onClick={onBack}
        className="absolute left-4 top-4 z-50 skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e] md:left-8 md:top-8 md:px-4 md:text-sm"
      >
        <span className="inline-block skew-x-[12deg]">&lt; BACK TO SELECT</span>
      </button>
      
      <HorizontalSlider showDots showArrows>
        <ProjectsSlide onViewCaseStudy={handleViewCaseStudy} />
        <AboutMeSkillsSlide />
        <ContactSlide />
      </HorizontalSlider>
    </div>
  );
}
