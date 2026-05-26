import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Cpu, Server, AppWindow, ArrowUpRight } from "lucide-react";
import AIChatBot from "../components/AIChatBot.jsx";

export default function PageHome({ onOpenAI, inlineChatRequest }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-20 max-w-7xl mx-auto">
      
      {/* SaaS Landing Hero - Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 lg:py-8">
        
        {/* Left Column (Brand Statement & Actions) */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
          
          <div className="space-y-4">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-semibold">
                Full Stack MERN & GenAI
              </span>
            </motion.div>

            {/* Title / Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-display font-bold tracking-tighter text-white leading-[1.05] sm:leading-[0.95]"
            >
              Architecting<br/>Future <span className="text-white/40">AI</span><br/>Experiences.
            </motion.h1>
          </div>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed font-sans"
          >
            Building production-ready MERN applications integrated with LLMs. Specialized in Generative AI, high-compliance booking databases, Shopify Liquid integrations, and low-latency API proxy layers.
          </motion.p>

          {/* Core Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-all cursor-pointer font-sans duration-200 shadow-md"
            >
              Hire Priyank
            </button>
            
            <button
              onClick={() => onOpenAI("Summarize Priyank in 30 seconds.")}
              className="px-6 py-3.5 border border-white/20 hover:border-white/40 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer font-sans"
            >
              Summarize in 30s
            </button>

            <a
              href="mailto:priyankchavda910@gmail.com"
              className="px-6 py-3.5 border border-white/10 hover:border-white/25 text-zinc-400 hover:text-white text-xs font-semibold tracking-wide rounded-lg hover:bg-zinc-900/30 transition-all duration-200 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
          </motion.div>

          {/* Verification Badge with Tech Stack Circular Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6 border-t border-white/5 flex items-center space-x-6"
          >
            <div className="flex -space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-zinc-300">M</div>
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-zinc-300">E</div>
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-zinc-300">R</div>
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-zinc-300">N</div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold font-sans">
              Verified Tech Stack Expert
            </span>
          </motion.div>

        </div>

        {/* Right Column (Live Inline AI Assistant Widget) */}
        <div className="lg:col-span-6 relative flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/[0.03] to-transparent pointer-events-none rounded-2xl blur-xl"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <AIChatBot
              key={inlineChatRequest?.ts ?? "home-inline"}
              isInline={true}
              initialMessage={inlineChatRequest?.message}
            />
          </motion.div>
        </div>

      </section>

      {/* Grid of Core Capabilities */}
      <section className="space-y-6 max-w-7xl mx-auto pt-10 border-t border-white/5">
        <div className="space-y-1.5">
          <h2 className="text-zinc-100 font-display font-semibold text-lg tracking-tight uppercase tracking-[0.1em] text-white/80">
            Core Capabilities
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">Technical solutions engineered for scale and speed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl space-y-3 hover:border-white/10 duration-200">
            <div className="p-2.5 bg-blue-950/45 border border-blue-900/35 text-blue-400 w-fit rounded-xl">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-100 font-display font-semibold text-base">Generative AI Engineering</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              Connecting modern SDK nodes (Gemini AI, strict system prompt layouts) to produce clean full-stack services without hallucinations.
            </p>
          </div>

          <div className="p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl space-y-3 hover:border-white/10 duration-200">
            <div className="p-2.5 bg-purple-950/45 border border-purple-900/35 text-purple-400 w-fit rounded-xl">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-100 font-display font-semibold text-base">MERN Stack Architecture</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              Highly organized backend servers built with routing controllers, automated data failover, and elegant MongoDB models.
            </p>
          </div>

          <div className="p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl space-y-3 hover:border-white/10 duration-200">
            <div className="p-2.5 bg-cyan-950/45 border border-cyan-900/35 text-cyan-400 w-fit rounded-xl">
              <AppWindow className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-100 font-display font-semibold text-base">Shopify & E-commerce Tech</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              Expert in Liquid configurations, custom checkout logic, automated email webhooks with Twilio, and DNS mapping.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="space-y-6 max-w-7xl mx-auto pt-10 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-zinc-100 font-display font-semibold text-lg tracking-tight uppercase tracking-[0.1em] text-white/80">
              Featured Work
            </h2>
            <p className="text-zinc-400 text-xs">Dynamic e-commerce systems and contextual AI tools</p>
          </div>
          <button
            onClick={() => navigate("/projects")}
            className="text-xs text-white/65 hover:text-white font-semibold flex items-center gap-1 cursor-pointer duration-200"
          >
            Explore Portfolio
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl flex flex-col justify-between space-y-5 hover:border-white/10 duration-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-900/40 uppercase font-semibold">
                  MERN + GenAI
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40 font-semibold uppercase tracking-wider">
                  Active Demo
                </span>
              </div>
              <h3 className="text-zinc-100 font-display font-bold text-base sm:text-lg">Gym AI Personal Trainer</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                An intelligent workout builder and physical tracker featuring a live fitness AI coach that analyzes your progress to suggest customized daily exercise steps.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-mono bg-black border border-white/5 text-zinc-400 px-2.5 py-1 rounded-md">React & Express</span>
              <span className="text-[10px] font-mono bg-black border border-white/5 text-zinc-400 px-2.5 py-1 rounded-md">Gemini Engine</span>
              <span className="text-[10px] font-mono bg-black border border-white/5 text-zinc-400 px-2.5 py-1 rounded-md">MongoDB</span>
            </div>
          </div>

          <div className="p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl flex flex-col justify-between space-y-5 hover:border-white/10 duration-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-900/40 uppercase font-semibold">
                  Multimodal
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/40 font-semibold uppercase tracking-wider">
                  Production Built
                </span>
              </div>
              <h3 className="text-zinc-100 font-display font-bold text-base sm:text-lg">AI Plant Analysis Tool</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                An visual diag tool allowing agriculturalists to snap botanical photos to identify crop infections, delivering comprehensive reports within milliseconds.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-mono bg-black border border-white/5 text-zinc-400 px-2.5 py-1 rounded-md">Vite Server</span>
              <span className="text-[10px] font-mono bg-black border border-white/5 text-zinc-400 px-2.5 py-1 rounded-md">Vision Model</span>
              <span className="text-[10px] font-mono bg-black border border-white/5 text-zinc-400 px-2.5 py-1 rounded-md">Tailwind</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote / Recruiter CTA */}
      <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-tr from-cyan-950/10 via-zinc-950 to-zinc-950 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-zinc-100 font-display font-bold text-lg sm:text-xl">
            Let's build something exceptional together.
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl font-sans">
            Have an open requirement for a high-performing full-stack developer who understands both frontend details and robust servers? Let's chat.
          </p>
        </div>
        <button
          onClick={() => navigate("/contact")}
          className="bg-white hover:bg-gray-100 text-black font-bold uppercase tracking-widest text-xs px-6 py-4.5 rounded-lg whitespace-nowrap min-w-[160px] cursor-pointer transition duration-200"
        >
          Get in Touch
        </button>
      </section>

    </div>
  );
}
