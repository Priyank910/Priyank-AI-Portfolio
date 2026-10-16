import fs from "fs";
import path from "path";

function resolvePortfolioContextPath() {
  const source = path.join(process.cwd(), "src", "data", "portfolioContext.json");
  const built = path.join(process.cwd(), "dist", "data", "portfolioContext.json");
  const candidates = process.env.NODE_ENV === "production" ? [built, source] : [source, built];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    "portfolioContext.json not found. Run npm run build:server or ensure src/data/portfolioContext.json exists.",
  );
}

const jsonPath = resolvePortfolioContextPath();
const portfolioContext = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

export default portfolioContext;
