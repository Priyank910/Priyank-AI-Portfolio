import fs from "node:fs";
import path from "node:path";
const data = JSON.parse(
  fs.readFileSync(
    new URL("../src/data/portfolioContext.json", import.meta.url),
    "utf8",
  ),
);
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const selected = [
  "isoliq-inno",
  "daily-ledger",
  "signal-ai",
  "blog-platform",
].map((id) => data.projects.find((p) => p.id === id));
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Priyank Chavda — full-stack developer and AI builder. Experience, projects, skills and contact details."><title>Priyank Chavda — Résumé</title><style>*{box-sizing:border-box}body{font:14px/1.55 Arial,sans-serif;color:#20201c;background:#eeeae3;margin:0}main{max-width:850px;margin:35px auto;background:white;padding:50px 60px}h1{font-size:36px;line-height:1.1;margin:0 0 7px;letter-spacing:-1.5px}h2{font-size:14px;text-transform:uppercase;letter-spacing:1.4px;border-bottom:1px solid #ccc;padding-bottom:5px;margin:25px 0 12px}h3{font-size:14px;margin:14px 0 3px}p{margin:5px 0}a{color:#303030;text-underline-offset:3px}.subtitle{font-size:17px}.contact{font-size:12px;line-height:1.8;margin-top:12px}.row{display:flex;justify-content:space-between;gap:20px;align-items:baseline}.date{font-size:11px;white-space:nowrap}.stack{font-size:11px;color:#555}.links{font-size:11px}.actions{max-width:850px;margin:25px auto 0;display:flex;gap:20px;align-items:center;padding-inline:20px}.actions button{background:#20201c;color:white;border:0;padding:12px 20px;font:14px Arial;cursor:pointer}.actions a{font-size:13px}.note{font-size:12px;color:#555}ul{padding-left:18px;margin:5px 0}li{margin:3px 0}a:focus-visible,button:focus-visible{outline:2px solid #e65b2e;outline-offset:4px}@page{size:A4;margin:15mm}@media print{body{background:white;font-size:10px;line-height:1.4}main{padding:0;margin:0;max-width:none}.actions{display:none}h1{font-size:28px}h2{font-size:11px;margin-top:15px;margin-bottom:8px}h3{font-size:11px;margin-top:8px}.subtitle{font-size:13px}.contact{font-size:9px;margin-top:8px}.stack,.links,.date,.note{font-size:9px}p{margin:3px 0}.project{break-inside:avoid}.row{break-after:avoid}a{text-decoration:none}}@media(max-width:600px){main{margin:20px 12px;padding:30px 22px}h1{font-size:32px}.row{flex-direction:column;gap:0}}</style></head><body><nav class="actions" aria-label="Résumé actions"><button id="print">Print / Save as PDF</button><a href="/priyank-chavda-resume.pdf" download>Download PDF</a><a href="/">Back to portfolio</a></nav><main><header><h1>${escape(data.personal.name)}</h1><p class="subtitle">Full-stack Developer & AI Builder</p><p class="contact">Gujarat, India · <a href="mailto:${data.personal.email}">${data.personal.email}</a> · ${escape(data.personal.phone)}<br><a href="${data.personal.website}">priyankchavda.info</a> · <a href="${data.personal.github}">github.com/Priyank910</a> · <a href="${data.personal.linkedin}">LinkedIn</a> · <a href="${data.personal.youtube}">YouTube</a></p></header><section><h2>Profile</h2><p>Full-stack developer building web applications, practical AI integrations, and small language-model experiments. Currently developing Isoliq Inno 1, a 3M-parameter model trained from scratch. Built Daily Ledger for my first user, my father, to simplify his everyday bookkeeping. I also share AI experiments and my model-building process on YouTube.</p></section><section><h2>Technical skills</h2><p><strong>Full stack:</strong> JavaScript, TypeScript, React, Node.js, Express, MongoDB, Python, Django, HTML, CSS</p><p><strong>AI & research:</strong> PyTorch, nanoGPT, Gemini API, OpenAI API, tokenizer preparation, pretraining, supervised fine-tuning, dataset auditing</p><p><strong>Tools:</strong> Git, GitHub, Vite, Shopify</p></section><section><h2>Selected projects</h2>${selected.map((p) => `<article class="project"><div class="row"><h3>${escape(p.title)}</h3><span class="date">${escape(p.status)}</span></div>${p.techStack.length ? `<p class="stack">${escape(p.techStack.join(" · "))}</p>` : ""}<p>${escape(p.description)}</p>${p.id === "isoliq-inno" ? "<p>Built a custom BPE tokenizer and reproducible training pipeline; audited datasets and evaluated the limitations of unbalanced fine-tuning data.</p>" : ""}<p class="links">${p.repoUrl ? `<a href="${p.repoUrl}">${p.repoUrl.replace("https://", "")}</a>` : '<a href="https://priyankchavda.info/projects/daily-ledger">Read the project story</a>'}${p.liveUrl ? ` · <a href="${p.liveUrl}">${p.liveUrl.replace("https://", "")}</a>` : ""}</p></article>`).join("")}</section><section><h2>Experience</h2><article><div class="row"><h3>E-commerce Developer & Manager · Shopify e-commerce work</h3><span class="date">2025</span></div><p>Built and launched storefronts; configured domains and hosting; worked on storefront presentation and the shopping experience.</p></article><article><div class="row"><h3>Payment Poster · Ifedora Services Pvt. Ltd.</h3><span class="date">Jun 2025 – Feb 2026</span></div><p>Posted payments for a US medical billing business, with a focus on accuracy and careful handling of records.</p></article></section><section><h2>Education & learning</h2><p><strong>Diploma in Computer Engineering</strong> · Government Polytechnic Jamnagar · 2025</p><p class="note">${data.certifications.map(escape).join(" · ")}</p></section></main><script>document.getElementById('print').addEventListener('click',()=>window.print());</script></body></html>`;
fs.writeFileSync(path.resolve("public/resume.html"), html);
console.log("Generated printable résumé from shared portfolio data.");

const routes = [
  "/",
  "/projects",
  "/about",
  "/experience",
  "/contact",
  ...data.projects.map((p) => `/projects/${p.id}`),
];
fs.writeFileSync(
  path.resolve("public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>https://priyankchavda.info${route}</loc></url>`).join("")}</urlset>\n`,
);
