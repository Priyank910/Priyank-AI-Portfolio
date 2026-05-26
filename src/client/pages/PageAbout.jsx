import React from "react";
import { Sparkles, Award, Code, BookOpen, Layers, Terminal } from "lucide-react";

export default function PageAbout() {
  const categories = [
    {
      title: "Full Stack MERN",
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      items: ["React.js", "Node.js", "Express.js", "MongoDB", "Vite", "RESTful APIs", "MVC Patterns"],
    },
    {
      title: "Generative AI",
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      items: ["Gemini API", "OpenAI API", "OpenRouter API", "Prompt Engineering", "Multimodal Vision AI", "Context Injection"],
    },
    {
      title: "Languages & Tools",
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      items: ["JavaScript (ES6+)", "Python", "C", "C++", "PHP", "Shopify Storefronts", "Git & GitHub"],
    },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-4">
      {/* Bio / Heading */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
          Priyank's Story & Tech Philosophy
        </h2>
        
        {/* Core Passion Highlight Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0B0C] border border-white/5 space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900/50">
            CURRENT TECH FOCUS
          </span>
          <h3 className="text-zinc-100 font-sans font-semibold text-lg">
            "Building AI-first MERN applications using LLMs."
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Standard web applications are static. By introducing semantic search, automated LLM routers, context-aware memory pools, and intelligent vision analysis directly inside the model-view-controller layer, we can create SaaS products that adapt dynamically to user actions.
          </p>
        </div>
      </section>

      {/* Developer Journey */}
      <section className="space-y-4">
        <h3 className="text-zinc-200 font-sans font-semibold text-lg flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          The Engineering Journey
        </h3>
        <div className="text-zinc-400 text-xs sm:text-sm space-y-4 leading-relaxed font-sans">
          <p>
            Priyank Chavda is a full-stack engineer from Gujarat, India, with a thorough foundation built on a{" "}
            <strong className="text-zinc-300 font-medium">Diploma in Computer Engineering</strong> from Government Polytechnic Jamnagar (graduating in 2025). Rather than stopping at standard MERN stack templates, Priyank quickly expanded into the high-demand ecosystem of Generative AI integration.
          </p>
          <p>
            In 2025, Priyank took on end-to-end responsibilities architecting and launching scalable Shopify storefronts, managing domain architectures, global DNS alignments, payment channel operations, and conversion analytics. 
          </p>
          <p>
            This was accompanied by professional payment posting operations for state-side medical billing processes at Ifedora Services, establishing his strict commitment to high data integrity, strict privacy controls, and adherence to professional specifications.
          </p>
        </div>
      </section>

      {/* Skill Matrix Grid */}
      <section className="space-y-4">
        <h3 className="text-zinc-200 font-sans font-semibold text-lg flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          Skill Matrix & Stack
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="p-5 bg-[#0B0B0C] border border-white/5 rounded-xl space-y-3.5">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                {cat.icon}
                <span className="text-zinc-200 font-semibold text-xs font-mono">{cat.title}</span>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="text-zinc-400 text-xs flex items-center gap-2 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications and Studies */}
      <section className="space-y-4 pt-4 border-t border-white/5">
        <h3 className="text-zinc-200 font-sans font-semibold text-lg flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          Certifications & Education
        </h3>
        <div className="space-y-3.5">
          <div className="p-4 bg-[#0B0B0C] border border-white/5 rounded-xl flex flex-col sm:flex-row justify-between gap-2">
            <div>
              <h4 className="text-zinc-200 font-sans font-medium text-xs sm:text-sm">
                Diploma in Computer Engineering
              </h4>
              <p className="text-zinc-500 text-xs">Government Polytechnic Jamnagar</p>
            </div>
            <span className="text-[11px] font-mono text-zinc-400 py-0.5 sm:text-right">Class of 2025</span>
          </div>

          <div className="p-4 bg-[#0B0B0C] border border-white/5 rounded-xl space-y-2">
            <h4 className="text-zinc-200 font-sans font-medium text-xs sm:text-sm">Verified Credentials:</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-[#050505] border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg font-mono text-[11px]">
                Full Stack Web Development (MERN & GenAI) — 90 Hours
              </span>
              <span className="bg-[#050505] border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg font-mono text-[11px]">
                Generative AI Mastermind
              </span>
              <span className="bg-[#050505] border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg font-mono text-[11px]">
                Claude 101 Certificate
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
