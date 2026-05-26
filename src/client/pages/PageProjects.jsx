import React, { useState } from "react";
import { Sparkles, Brain, Check, Github, Loader2, X } from "lucide-react";
import portfolioContext from "../../server/data/portfolioContext.json";

export default function PageProjects() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [aiExplanation, setAiExplanation] = useState(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleExplainProject = async (projectId) => {
    setSelectedProjectId(projectId);
    setIsExplaining(true);
    setAiExplanation(null);

    try {
      const res = await fetch("/api/ai/explain-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "The AI review service is temporarily unavailable. Please try again shortly.",
        );
      }

      if (data?.explanation) {
        setAiExplanation(data.explanation);
      } else {
        setAiExplanation(
          "Could not generate a project review. Please try again in a moment.",
        );
      }
    } catch (err) {
      console.error(err);
      setAiExplanation(
        err.message ||
          "Something went wrong while connecting to the AI review service.",
      );
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4 relative">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white">Engineering Portfolio</h2>
        <p className="text-zinc-400 text-xs sm:text-sm">
          A showcase of full-stack MERN, Generative AI nodes, and responsive e-commerce programs.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioContext.projects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-[#0B0B0C] border border-white/5 hover:border-white/10 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 group"
          >
            <div className="space-y-4">
              {/* Badge & Links */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded uppercase">
                  {project.techStack.join(" • ")}
                </span>
                <span className="text-[10px] uppercase font-mono text-zinc-500">{project.status}</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3 className="text-zinc-100 font-sans font-semibold text-base sm:text-lg group-hover:text-cyan-400 duration-200">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Core Features */}
              <div className="space-y-2">
                <span className="text-[10px] text-zinc-500 font-mono block">HIGHLIGHTED FEATURES:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-400">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5 font-sans leading-tight">
                       <Check className="w-3.5 h-3.5 mt-0.5 text-cyan-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges and Architecture Summary */}
              <div className="p-3.5 rounded-xl bg-[#050505] border border-white/5 text-xs text-zinc-400 space-y-2">
                <div className="space-y-1">
                  <span className="font-semibold text-zinc-200 block text-[11px]">Challenges Solved:</span>
                  <p className="font-sans leading-relaxed text-zinc-400">{project.challengesSolved}</p>
                </div>
                <div className="space-y-1 pt-1 border-t border-white/5">
                  <span className="font-semibold text-zinc-200 block text-[11px]">Architecture:</span>
                  <p className="font-mono leading-relaxed text-[10px] text-zinc-400">{project.architecture}</p>
                </div>
              </div>
            </div>

            {/* AI Explainer Call to Action */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-zinc-400 hover:text-white font-mono text-[11px] duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 rounded"
                >
                  <Github className="w-3.5 h-3.5" />
                  View Code
                </a>
              ) : null}

              <button
                onClick={() => handleExplainProject(project.id)}
                className="flex items-center gap-1.5 bg-cyan-950/60 border border-cyan-800/50 hover:bg-cyan-900/60 text-cyan-400 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI to Explain
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Architectural Overlay Panel */}
      {selectedProjectId && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] border border-white/10 max-w-2xl w-full h-[550px] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-zinc-900/50 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Brain className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-zinc-100 font-sans font-semibold text-sm">
                    AI Tech Lead Architecture Review
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase">
                    Model: gemini-2.5-flash
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedProjectId(null);
                  setAiExplanation(null);
                }}
                className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                aria-label="Close project review"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanation / LLM Output Viewport */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#09090b] text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {isExplaining ? (
                <div className="flex flex-col items-center justify-center h-full space-y-3.5 text-center px-4">
                  <Loader2 className="w-7 h-7 text-cyan-500 animate-spin" />
                  <div>
                    <p className="text-zinc-200 font-sans font-medium text-xs">
                      Consulting local portfolio knowledge schema...
                    </p>
                    <p className="text-zinc-500 font-mono text-[10px]">
                      Analyzing code models & integrations
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-zinc-300">
                    {aiExplanation}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#0F0F0F] border-t border-white/5 flex items-center justify-between text-zinc-500 text-[11px] font-mono">
              <span>Strict anti-hallucination guard active</span>
              <button
                onClick={() => {
                  setSelectedProjectId(null);
                  setAiExplanation(null);
                }}
                className="text-cyan-400 hover:text-cyan-300 font-sans font-medium cursor-pointer"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
