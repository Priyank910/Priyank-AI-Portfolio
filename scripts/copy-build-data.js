import fs from "fs";
import path from "path";

const sources = [
  path.join(process.cwd(), "src", "data", "portfolioContext.json"),
  path.join(process.cwd(), "src", "server", "data", "portfolioContext.json"),
];

const source = sources.find((p) => fs.existsSync(p));

if (!source) {
  console.error("Missing portfolioContext.json in src/data or src/server/data");
  process.exit(1);
}

const destDir = path.join(process.cwd(), "dist", "data");
const dest = path.join(destDir, "portfolioContext.json");

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(source, dest);
console.log("Copied portfolioContext.json to dist/data/");
