import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const parts = readdirSync(__dirname)
  .filter((f) => f.startsWith("css-part-") && f.endsWith(".txt"))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
const b64 = parts.map((f) => readFileSync(join(__dirname, f), "utf8")).join("");
writeFileSync(join(__dirname, "../client/src/index.css"), Buffer.from(b64, "base64"));
console.log("Restored client/src/index.css from", parts.length, "chunks");
