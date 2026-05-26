import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle, Store, ShieldCheck } from "lucide-react";
import portfolioContext from "../../server/data/portfolioContext.json";

export default function PageExperience() {
  const experiences = portfolioContext.experience;

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-4">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white">Professional Experience</h2>
        <p className="text-zinc-400 text-xs sm:text-sm">
          A track record of engineering scalable e-commerce systems, deploying Shopify stores, and managing high-compliance billing data.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-white/5 pl-6 sm:pl-8 space-y-12 ml-4">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative space-y-4">
            {/* Timeline Dot Icon */}
            <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-[#050505] border border-white/10 text-cyan-400">
              {idx === 0 ? <Store className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </span>

            {/* Time / Heading Block */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                {exp.period}
              </span>
              <h3 className="text-zinc-100 font-sans font-bold text-lg sm:text-xl">
                {exp.role}
              </h3>
              <div className="text-cyan-400 font-sans font-semibold text-xs sm:text-sm flex flex-wrap items-center gap-2">
                <span>{exp.company}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span className="text-zinc-500 font-normal flex items-center gap-1 font-sans text-xs">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  India (Remote/Hybrid)
                </span>
              </div>
            </div>

            {/* Bullet Highlights */}
            <ul className="space-y-3 pt-2">
              {exp.highlights.map((bullet, i) => (
                <li key={i} className="text-zinc-400 text-xs sm:text-sm leading-relaxed flex items-start gap-3 font-sans">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                  <p>{bullet}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Strengths Callout banner */}
      <div className="p-5 sm:p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <Briefcase className="w-10 h-10 text-cyan-400 flex-shrink-0" />
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-zinc-200 font-sans font-semibold text-xs sm:text-sm">Skills summary for e-commerce contracts:</h4>
          <p className="text-zinc-400 text-xs">Shopify Liquid coding, CSS styling, DNS mapping, Payment gateways integrations (Stripe, Paypal), bulk CSV parsing algorithms, automated email webhooks configuration.</p>
        </div>
      </div>
    </div>
  );
}
