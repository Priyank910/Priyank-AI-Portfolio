import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Action, Arrow } from "./Primitives";
import { isoliq, ledger, projects } from "./content";

const MotionLink = motion.create(Link);

const features = [
  {
    project: isoliq,
    name: "Isoliq Inno 1",
    category: "AI RESEARCH",
    deck: "A small language model. A big learning curve.",
    description:
      "Training a 3M-parameter GPT-style model from scratch, from tokenizer to honest evaluation.",
    image: "/images/isoliq-screen.webp",
    alt: "Isoliq website introducing the open-source Inno 1 language model",
    url: "isoliq.com",
    action: "Visit Isoliq",
    color: "copper",
  },
  {
    project: ledger,
    name: "Daily Ledger",
    category: "BUILT FOR SOMEONE",
    deck: "Less time calculating. More time for life.",
    description:
      "An offline-first Android app that turns my dad’s paper bookkeeping into a simpler daily routine.",
    image: "/images/ledger-overview.webp",
    alt: "Daily Ledger overview with sample income, expenses and running balance",
    url: "Android · offline-first",
    action: "Download Android",
    color: "green",
    portrait: true,
  },
  {
    project: projects.find((p) => p.id === "mixtape"),
    name: "MixTape",
    category: "WEB APPLICATION",
    deck: "A place to find your next favourite song.",
    description:
      "Artist discovery, liked songs, and a persistent player. A full-stack exploration of music and playback.",
    image: "/images/mixtape-screen.webp",
    alt: "MixTape music application with artist discovery and a persistent player",
    url: "mixtape-neon.vercel.app",
    action: "Open MixTape",
    color: "violet",
  },
];
export default function ProjectShowcase() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const item = features[selected];
  function selectWithKey(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % features.length;
    if (event.key === "ArrowLeft")
      next = (index + features.length - 1) % features.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = features.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setSelected(next);
      document.getElementById(`project-tab-${next}`)?.focus();
    }
  }
  return (
    <div className="project-showcase">
      <div
        role="tablist"
        aria-label="Featured projects"
        className="showcase-tabs"
      >
        {features.map((feature, index) => (
          <button
            key={feature.name}
            id={`project-tab-${index}`}
            role="tab"
            aria-selected={selected === index}
            aria-controls="featured-project-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => selectWithKey(event, index)}
          >
            <span className="mono">0{index + 1}</span>
            <span>{feature.name}</span>
            <Arrow size={18} />
            {selected === index && (
              <motion.span
                className="tab-underline"
                layoutId="project-underline"
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 350, damping: 35 }
                }
              />
            )}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="featured-project-panel"
        aria-labelledby={`project-tab-${selected}`}
        tabIndex={0}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="showcase-panel"
            key={item.name}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0 : 0.22 }}
          >
            <div
              className={`showcase-media showcase-${item.color} ${item.portrait ? "showcase-portrait" : ""}`}
            >
              <MotionLink
                to={`/projects/${item.project.id}`}
                className="showcase-screen-link"
                whileHover={
                  reduced ? undefined : { rotate: 0, y: -8, scale: 1.025 }
                }
                initial={false}
              >
                {item.portrait ? (
                  <img
                    src={item.image}
                    alt={item.alt}
                    width="390"
                    height="844"
                    loading="lazy"
                  />
                ) : (
                  <div className="browser-frame">
                    <div className="browser-top" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span className="browser-address">{item.url}</span>
                      <Arrow size={12} />
                    </div>
                    <img
                      src={item.image}
                      alt={item.alt}
                      width="1440"
                      height="1000"
                      loading="lazy"
                    />
                  </div>
                )}
              </MotionLink>
              <div className="showcase-media-caption mono">
                <span>
                  {item.portrait
                    ? "ACTUAL INTERFACE · SAMPLE DATA"
                    : "EXPLORE THE BUILD"}
                </span>
                <span>0{selected + 1} / 03</span>
              </div>
            </div>
            <div className="showcase-copy">
              <span className="mono">{item.category}</span>
              <h3>{item.name}</h3>
              <p className="project-deck">{item.deck}</p>
              <p>{item.description}</p>
              <p className="showcase-stack">
                {item.project.techStack.slice(0, 3).join(" / ")}
              </p>
              <div className="project-actions">
                <Action to={`/projects/${item.project.id}`} variant="primary">
                  Explore project
                </Action>
                <Action
                  href={item.project.downloadUrl || item.project.liveUrl}
                  external
                >
                  {item.action}
                </Action>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
