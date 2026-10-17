import fs from "node:fs";
import path from "node:path";

const readData = (name) =>
  JSON.parse(
    fs.readFileSync(
      new URL(`../src/data/${name}.json`, import.meta.url),
      "utf8",
    ),
  );
const data = readData("portfolioContext");
const resume = readData("resume");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
const bullets = (items) =>
  `<ul>${items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>`;
const selected = resume.projects.map((entry) => {
  const project = data.projects.find((p) => p.id === entry.id);
  if (!project) throw new Error(`Unknown résumé project: ${entry.id}`);
  return { ...project, bullets: entry.bullets };
});
const personal = data.personal;
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Priyank Chavda — full-stack developer and AI builder. Selected projects, experience, skills and contact details.">
<title>Priyank Chavda — Résumé</title>
<style>
*{box-sizing:border-box}
body{font:14px/1.5 Arial,Helvetica,sans-serif;color:#202622;background:#edf1ee;margin:0}
main{max-width:850px;margin:24px auto 40px;background:white;padding:46px 54px;box-shadow:0 5px 30px #15201b0a}
h1{font-size:34px;line-height:1.1;margin:0 0 6px;letter-spacing:-.7px;color:#163e2d}
h2{font-size:12px;text-transform:uppercase;letter-spacing:1.3px;border-bottom:1px solid #acbcb2;padding-bottom:4px;margin:20px 0 8px;color:#163e2d}
h3{font-size:14px;line-height:1.35;margin:0}
p{margin:4px 0}
a{color:inherit;text-underline-offset:3px}
.subtitle{font-size:16px;margin-bottom:9px}
.contact{font-size:12px;line-height:1.65}
.row{display:flex;justify-content:space-between;gap:12px;align-items:baseline}
.date,.links{font-size:11px;white-space:nowrap}
.stack{font-size:12px;color:#47514a;margin:2px 0 4px}
article+article{margin-top:12px}
ul{padding-left:17px;margin:3px 0 0}
li{padding-left:1px;margin:3px 0}
.compact{font-size:12px}
.actions{max-width:850px;margin:24px auto 0;display:flex;flex-wrap:wrap;gap:16px;align-items:center;padding:0 16px}
.actions button,.download{background:#163e2d;color:white;border:0;padding:11px 16px;font:14px Arial;cursor:pointer;text-decoration:none}
.actions button{background:transparent;color:#163e2d;border:1px solid #a6b4ab}
a:focus-visible,button:focus-visible{outline:2px solid #24664a;outline-offset:4px}
@page{size:A4;margin:12mm 14mm}
@media print{
 body{background:white;font-size:10.2pt;line-height:1.32;color:#171b18}
 main{padding:0;margin:0;max-width:none;box-shadow:none}
 .actions{display:none}
 h1{font-size:25pt}
 h2{font-size:9pt;margin:9px 0 5px;padding-bottom:3px;letter-spacing:1px}
 h3{font-size:10.2pt}
 .subtitle{font-size:11pt;margin-bottom:6px}
 .contact{font-size:9pt;line-height:1.5}
 .date,.links,.stack,.compact{font-size:9pt}
 .stack{margin:1px 0 3px}
 p{margin:3px 0}
 li{margin:2px 0}
 article+article{margin-top:7px}
 article{break-inside:avoid}
 h2,.row{break-after:avoid}
 a{text-decoration:none}
}
@media(max-width:600px){
 main{margin:18px 10px;padding:28px 20px}
 h1{font-size:30px}
 .row{flex-wrap:wrap;gap:2px 12px}
 .actions{gap:12px}
 .contact{overflow-wrap:anywhere}
}
</style>
</head>
<body>
<nav class="actions" aria-label="Résumé actions">
<a class="download" href="/priyank-chavda-resume.pdf" download="Priyank-Chavda-Resume.pdf">Download PDF</a>
<button id="print">Print / Save as PDF</button>
<a href="/">Back to portfolio</a>
</nav>
<main>
<header>
<h1>${escape(personal.name)}</h1>
<p class="subtitle">${escape(personal.title)}</p>
<p class="contact">${escape(personal.location)} · ${link(`tel:${personal.phone.replace(/\s/g, "")}`, personal.phone)} · ${link(`mailto:${personal.email}`, personal.email)}<br>
${link(personal.website, "priyankchavda.info")} · ${link(personal.github, "github.com/Priyank910")} · ${link(personal.linkedin, "linkedin.com/in/priyank-chavda-ai")}</p>
</header>
<section><h2>Professional summary</h2><p>${escape(resume.summary)}</p></section>
<section><h2>Technical skills</h2>
${resume.skillGroups.map((group) => `<p><strong>${escape(group.label)}:</strong> ${escape(group.items)}</p>`).join("\n")}
</section>
<section><h2>Selected projects</h2>
${selected
  .map(
    (p) => `<article>
<div class="row"><h3>${escape(p.title)}</h3><span class="links">${link(p.repoUrl, "GitHub")}${p.liveUrl ? ` · ${link(p.liveUrl, "Website")}` : ""}${p.releaseUrl ? ` · ${link(p.releaseUrl, "Android release")}` : ""}</span></div>
<p class="stack">${escape(p.techStack.join(" · "))}${p.id === "isoliq-inno" ? " · Ongoing research" : ""}</p>
${bullets(p.bullets)}
</article>`,
  )
  .join("\n")}
</section>
<section><h2>Experience</h2>
${data.experience
  .map(
    (job) => `<article>
<div class="row"><h3>${escape(job.role)}</h3><span class="date">${escape(job.period)}</span></div>
<p class="stack">${escape(job.company)}</p>
${bullets(job.highlights)}
</article>`,
  )
  .join("\n")}
</section>
<section><h2>Education & certifications</h2>
${data.education.map((item) => `<p><strong>${escape(item.degree)}</strong> · ${escape(item.institution)} · ${escape(item.period)}</p>`).join("\n")}
<p class="compact">${resume.certificates.map((c) => link(c.url, c.label)).join(" · ")}</p>
</section>
<section><h2>Public work & languages</h2>
<p>${link(personal.youtube, "YouTube / @priyankchavdaofficial")} — ${escape(resume.publicWork)}</p>
<p class="compact"><strong>Languages:</strong> ${escape(resume.languages)}</p>
</section>
</main>
<script>document.getElementById('print').addEventListener('click',()=>window.print());</script>
</body></html>`;
fs.writeFileSync(path.resolve("public/resume.html"), html);
console.log(
  "Generated printable résumé from shared portfolio and résumé data.",
);

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
