import { writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = join(__dirname, "../client/src/index.css");
const GOOD_SHA = "b45ce9041a88eaf2c08deefe771ca4c7a30020e9";
const RAW_URL = `https://raw.githubusercontent.com/saruhome/saruhome/${GOOD_SHA}/client/src/index.css`;
const PATCH_PATH = join(__dirname, "archive-priority.css");

async function main() {
  let core = "";
  try {
    const res = await fetch(RAW_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    core = await res.text();
    if (!core.includes("@import") || core.trim() === "PLACEHOLDER") {
      throw new Error("Fetched CSS looks invalid");
    }
  } catch (err) {
    console.warn("Could not fetch CSS from GitHub raw:", err.message);
    if (existsSync(target)) {
      const existing = readFileSync(target, "utf8");
      if (existing.includes("@import \"tailwindcss\"") && existing.length > 500) {
        console.warn("Keeping existing local index.css");
        return;
      }
    }
    // Minimal emergency fallback so the app still builds
    core = `/* emergency fallback */\n@import "tailwindcss";\n@import "tw-animate-css";\n`;
  }

  const patch = existsSync(PATCH_PATH) ? readFileSync(PATCH_PATH, "utf8") : "";
  writeFileSync(target, core.trimEnd() + "\n\n" + patch.trimStart());
  console.log(`Restored client/src/index.css (${core.length} + ${patch.length} chars)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
