import { useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Action, Arrow } from "./Primitives";
import { isoliq, ledger, projects } from "./content";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TabList from "./TabList";

const MotionLink = motion.create(Link);

const features = [
  {
    project: isoliq,
    name: "Isoliq Inno 1",
    category: "AI RESEARCH",
    deck: "A small language model. A big learning curve.",
    description:
      "A 3M-parameter model trained from scratch, from tokenizer to honest evaluation.",
    image: "/images/isoliq-screen.webp",
    alt: "Isoliq website introducing the open-source Inno 1 language model",
    url: "isoliq.com",
    action: "Visit Isoliq",
    color: "mint",
  },
  {
    project: ledger,
    name: "Daily Ledger",
    category: "OFFLINE-FIRST / ANDROID",
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
function subscribeDesktop(callback) {
  const query = window.matchMedia("(min-width: 900px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const isDesktop = () => window.matchMedia("(min-width: 900px)").matches;

export default function ProjectShowcase() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const desktop = useSyncExternalStore(subscribeDesktop, isDesktop, () => true);
  const item = features[selected];
  return (
    <div className="project-showcase">
      <div className="showcase-nav-wrap">
        <TabList
          id="featured-project"
          label="Featured projects"
          className="showcase-tabs"
          orientation={desktop ? "vertical" : "horizontal"}
          active={selected}
          onChange={setSelected}
          items={features.map((feature, index) => ({
            key: feature.name,
            label: (
              <>
                <span className="showcase-number">0{index + 1}</span>
                <span className="showcase-tab-copy">
                  <span className="showcase-name">{feature.name}</span>
                  <span className="showcase-category">{feature.category}</span>
                </span>
                <Arrow size={22} />
              </>
            ),
          }))}
        />
        <div className="gallery-controls">
          <button
            type="button"
            aria-label="Previous featured project"
            onClick={() =>
              setSelected((selected + features.length - 1) % features.length)
            }
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next featured project"
            onClick={() => setSelected((selected + 1) % features.length)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
          <span className="gallery-position" aria-live="polite">
            0{selected + 1} / 03
          </span>
        </div>
      </div>
      <div
        role="tabpanel"
        id="featured-project-panel"
        aria-labelledby={`featured-project-tab-${selected}`}
        tabIndex={0}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.name}
            className="showcase-panel"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <div
              className={`showcase-media showcase-${item.color} ${item.portrait ? "showcase-portrait" : ""}`}
            >
              <MotionLink
                to={`/projects/${item.project.id}`}
                className="showcase-screen-link"
                initial={false}
                whileHover={reduced ? undefined : { y: -6, scale: 1.015 }}
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
              {item.portrait && (
                <span className="showcase-media-caption">
                  Actual app interface · sample data
                </span>
              )}
            </div>
            <div className="showcase-copy">
              <h3 className="project-deck">{item.deck}</h3>
              <div className="showcase-description">
                <p>{item.description}</p>
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
                  <Action href={item.project.repoUrl} external>
                    View source
                  </Action>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
