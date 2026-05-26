import fs from "fs";
import path from "path";

function resolvePortfolioContextPath() {
  const candidates = [
    path.join(process.cwd(), "dist", "data", "portfolioContext.json"),
    path.join(process.cwd(), "src", "server", "data", "portfolioContext.json"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    "portfolioContext.json not found. Run npm run build or ensure src/server/data/portfolioContext.json exists.",
  );
}

const jsonPath = resolvePortfolioContextPath();
const portfolioContext = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

export default portfolioContext;
