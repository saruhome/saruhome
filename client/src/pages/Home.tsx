/*
 * Design Philosophy: Neo-Arcade Brutalism
 * Home delegates to the KOF-inspired role selection intro so the first viewport feels like
 * a decisive character select screen rather than a conventional portfolio landing page.
 */
import RoleSelectIntro from "@/components/RoleSelectIntro";

export default function Home() {
  const projectId = new URLSearchParams(window.location.search).get("project");
  const sharedProjectId = projectId && ["01", "02", "03", "04", "05"].includes(projectId) ? projectId : undefined;
  return <RoleSelectIntro initialProjectId={sharedProjectId} />;
}
