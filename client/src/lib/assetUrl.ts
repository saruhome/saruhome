/**
 * Chooses Manus File Storage locally and Vercel-hosted fallback media in the
 * Git deployment, keeping the same component source valid in both previews.
 */
const isVercel = () =>
  typeof window !== "undefined" && window.location.hostname.endsWith("vercel.app");

export function assetUrl(manusPath: string, vercelFile: string) {
  return isVercel() ? `/vercel-assets/${vercelFile}` : `/manus-storage/${manusPath}`;
}
