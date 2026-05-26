import fs from "fs";
import path from "path";

const source = path.join(process.cwd(), "src", "server", "data", "portfolioContext.json");
const destDir = path.join(process.cwd(), "dist", "data");
const dest = path.join(destDir, "portfolioContext.json");

if (!fs.existsSync(source)) {
  console.error("Missing source:", source);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(source, dest);
console.log("Copied portfolioContext.json to dist/data/");
