import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Mail } from "lucide-react";
import { Action, Arrow, Reveal, SectionRule } from "./Primitives";
import Portrait from "./Portrait";
import AboutDetails from "./AboutDetails";
import ProjectShowcase from "./ProjectShowcase";
import LedgerTour from "./LedgerTour";
import { personal, projects, ledger, shortDescriptions } from "./content";

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero shell">
      <div className="hero-main">
        <motion.div
          className="hero-heading"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>
            <span>Priyank</span>{" "}
            <span className="hero-surname">
              Chavda.
              <svg
                viewBox="0 0 580 18"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M7 11 Q275 -1 573 9 M130 16 Q335 3 520 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                />
              </svg>
            </span>
          </h1>
          <p className="hero-role">Developer & AI builder.</p>
        </motion.div>
        <Portrait />
        <div className="hero-intro">
          <p>
            From training my own language model to making my dad’s bookkeeping
            easier. I build things, then learn from what happens.
          </p>
          <div className="hero-actions">
            <Action to="/#work" variant="primary" arrow="right">
              Explore my work
            </Action>
            <Action href="/resume.html" external>
              View résumé
            </Action>
          </div>
        </div>
      </div>
      <div className="hero-baseline">
        <span>Based in Gujarat, India</span>
        <span>Full-stack development × AI experiments</span>
      </div>
    </section>
  );
}

export function SelectedWork() {
  return (
    <section
      className="selected-work shell section-space"
      id="work"
      aria-labelledby="work-title"
    >
      <Reveal className="section-heading">
        <h2 id="work-title">Selected work.</h2>
        <p>
          Different problems.
          <br />
          The same curiosity.
        </p>
      </Reveal>
      <ProjectShowcase />
      <div className="archive-link">
        <Action to="/projects" arrow="right">
          Explore all {projects.length} projects
        </Action>
      </div>
    </section>
  );
}

export function ProjectRow({ project, index }) {
  return (
    <Link to={`/projects/${project.id}`} className="project-row">
      <span className="row-number mono">{String(index).padStart(2, "0")}</span>
      <h3>
        {project.title === "MixTape Music Streaming App"
          ? "MixTape"
          : project.title}
      </h3>
      <p>{shortDescriptions[project.id] || project.description}</p>
      <span className="row-tech">
        {project.techStack.slice(0, 3).join(" · ") || "Built for my father"}
      </span>
      <Arrow className="row-arrow" />
    </Link>
  );
}

export function LedgerStory() {
  return (
    <section
      className="ledger-section"
      id="daily-ledger"
      aria-labelledby="ledger-title"
    >
      <div className="shell ledger-grid">
        <Reveal className="ledger-copy">
          <SectionRule number="02">BUILT FOR SOMEONE</SectionRule>
          <h2 id="ledger-title">
            My first user?
            <br />
            <span>My dad.</span>
          </h2>
          <div className="ledger-story-text">
            <p>
              He kept his daily ledger in a book. Every entry meant more
              calculations, more time. So I built him an app.
            </p>
            <p>
              Now <strong>Daily Ledger</strong> helps him keep track with less
              effort.
            </p>
          </div>
          <div className="ledger-actions">
            <Action to="/projects/daily-ledger" variant="dark" arrow="right">
              Read the story
            </Action>
            <Action href={ledger.downloadUrl} external>
              Download Android
            </Action>
          </div>
          <p className="ledger-release">Android 7.0+ · v1.0.0 · APK, 5 MB</p>
        </Reveal>
        <Reveal className="ledger-tour-wrap" delay={0.08}>
          <LedgerTour />
        </Reveal>
      </div>
    </section>
  );
}

export function AboutSection({ expanded = false }) {
  return (
    <section
      className={`about-section shell section-space ${expanded ? "about-expanded" : ""}`}
      id="about"
      aria-labelledby="about-title"
    >
      <Reveal>
        <h2 id="about-title">A little about me.</h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-photo">
          <Portrait compact />
        </Reveal>
        <Reveal className="about-bio" delay={0.06}>
          <p>
            I’m Priyank, a developer from Gujarat, India. I work across
            full-stack applications, practical AI integrations, and language
            models trained from scratch.
          </p>
          <AboutDetails expanded={expanded} />
          <Action href="/resume.html" external>
            View résumé
          </Action>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection({ onMessage, onAssistant }) {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="shell contact-content">
        <Reveal className="contact-copy">
          <h2 id="contact-title">
            Have something
            <br />
            in mind?
          </h2>
          <p className="contact-deck">Let’s talk about it.</p>
          <a href={`mailto:${personal.email}`} className="contact-email">
            <Mail size={25} strokeWidth={1.5} aria-hidden="true" />
            {personal.email}
            <Arrow />
          </a>
          <div className="social-links">
            <Action href={personal.github} external>
              <img src="/icons/github.svg" width="20" height="20" alt="" />
              GitHub
            </Action>
            <Action href={personal.linkedin} external>
              <img src="/icons/linkedin.svg" width="20" height="20" alt="" />
              LinkedIn
            </Action>
            <Action href={personal.youtube} external>
              <img src="/icons/youtube.svg" width="20" height="20" alt="" />
              YouTube
            </Action>
            <Action href="/resume.html" external>
              View résumé
            </Action>
          </div>
        </Reveal>
        <Reveal className="contact-buttons" delay={0.08}>
          <Action variant="primary" onClick={onMessage} arrow="right">
            Send a message
          </Action>
          <button
            type="button"
            className="assistant-link"
            onClick={onAssistant}
          >
            Or ask my portfolio assistant
            <Arrow size={17} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
