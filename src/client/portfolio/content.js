import context from "../../data/portfolioContext.json";

export const personal = context.personal;
export const projects = context.projects;
export const isoliq = projects.find((p) => p.id === "isoliq-inno");
export const ledger = projects.find((p) => p.id === "daily-ledger");
export const selectedIds = ["signal-ai", "mixtape", "plant-analysis-ai"];
export const shortDescriptions = {
  "gym-ai-personal-trainer":
    "Workout planning and progress tracking with an AI fitness coach.",
  "signal-ai":
    "From live news to a first draft. An AI-powered desktop workspace.",
  mixtape: "Artist discovery, liked songs, and a player that stays with you.",
  "plant-analysis-ai":
    "A plant photo becomes practical insights and a downloadable report.",
  "personal-chrome-extension":
    "A more personal home for every new browser tab.",
  "portfolio-assistant":
    "A recruiter assistant grounded in my actual portfolio.",
  "blog-platform":
    "A complete publishing workflow, from sign-in to the comments.",
  "price-tracker":
    "Gold and silver prices, brought into one focused dashboard.",
  "expense-tracker": "A clearer view of everyday income and expenses.",
  "isoliq-inno": "A small language model. A big learning curve.",
  "daily-ledger": "Less time calculating. More time for everything else.",
};
export const categories = [
  "All projects",
  "AI & Research",
  "Web & Apps",
  "Real-world tools",
];
export const skills = [
  {
    title: "Full stack",
    text: "React, TypeScript, Node.js, Express, MongoDB, Django",
  },
  { title: "AI & research", text: "Python, PyTorch, Gemini API, nanoGPT" },
  { title: "Tools", text: "Git, GitHub, Shopify, Vite" },
];
export const experience = [
  {
    date: "2025",
    title: "E-commerce Developer & Manager",
    company: "Shopify e-commerce work",
    description:
      "Built and launched storefronts, configured domains and hosting, and worked on the shopping experience.",
  },
  {
    date: "Jun 2025 — Feb 2026",
    title: "Payment Poster",
    company: "Ifedora Services Pvt. Ltd.",
    description:
      "Posted payments for a US medical billing business, with a focus on accuracy and careful handling of records.",
  },
];
export const certifications = context.certifications;
