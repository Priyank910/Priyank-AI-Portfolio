import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  Linkedin,
  Github,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const pages = [
  { id: "/", label: "Home" },
  { id: "/about", label: "About" },
  { id: "/projects", label: "Projects" },
  { id: "/experience", label: "Experience" },
  { id: "/contact", label: "Contact" },
];

export default function Navbar({ onOpenAIChat }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const navLinkClass = ({ isActive }) =>
    `relative px-4.5 py-1.5 text-xs font-medium rounded-full duration-300 cursor-pointer tracking-tight transition-colors ${
      isActive
        ? "text-zinc-100 font-semibold"
        : "text-zinc-400 hover:text-zinc-100"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 px-4 sm:px-6 py-4.5 transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/70 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_1px_0_0_rgba(34,211,238,0.08)]"
            : "bg-[#050505]/80 backdrop-blur-md border-b border-white/5"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-zinc-100 font-sans font-bold text-base sm:text-lg tracking-tight hover:text-cyan-400 duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              priyank.ai
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-950/45 border border-emerald-900/40 px-2 py-0.5 rounded-full text-[10px] text-emerald-400 font-mono tracking-tight font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Active
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 bg-zinc-900/50 p-1 rounded-full border border-zinc-800/80 relative">
            {pages.map((link) => (
              <NavLink
                key={link.id}
                to={link.id}
                end={link.id === "/"}
                className={navLinkClass}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-zinc-800 rounded-full border border-zinc-700/80 shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/Priyank910"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 hover:text-white duration-200 text-zinc-400 rounded-xl cursor-pointer hover:scale-105 transition-transform"
              title="GitHub"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/priyank-chavda-gj"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 hover:text-white duration-200 text-zinc-400 rounded-xl cursor-pointer hover:scale-105 transition-transform"
              title="LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <button
              onClick={() => onOpenAIChat()}
              className="bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800/80 hover:border-cyan-700 text-xs font-semibold px-4 py-2.5 rounded-xl duration-200 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] transition-transform"
            >
              AI Recruiter Chat
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenAIChat()}
              className="bg-cyan-950 text-cyan-400 border border-cyan-800/50 text-[11px] font-bold px-3 py-1.5 rounded-lg"
            >
              AI Assistant
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-zinc-100 rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-zinc-950/95 backdrop-blur-lg flex flex-col justify-center gap-8 px-8 border-b border-zinc-900"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <nav className="flex flex-col gap-6 text-center">
            {pages.map((link) => (
              <NavLink
                key={link.id}
                to={link.id}
                end={link.id === "/"}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-2xl font-semibold transition duration-200 ${
                    isActive
                      ? "text-cyan-400 font-bold"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex justify-center gap-6 text-zinc-500">
            <a
              href="https://github.com/Priyank910"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/priyank-chavda-gj"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
