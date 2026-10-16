import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Action, Arrow, Reveal, SectionRule } from "./Primitives";
import InteractiveSculpture from "./InteractiveSculpture";
import ProjectShowcase from "./ProjectShowcase";
import LedgerTour from "./LedgerTour";
import {
  personal,
  projects,
  ledger,
  shortDescriptions,
  selectedIds,
  skills,
  experience,
  certifications,
} from "./content";

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero shell">
      <InteractiveSculpture />
      <div className="hero-content">
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>A little code.</span>
          <em>
            A real
            <br />
            difference.
          </em>
        </motion.h1>
        <p>
          I’m Priyank, a full-stack developer exploring AI from the inside out.
          I build things that make everyday life a little better.
        </p>
        <div className="hero-actions">
          <Link to="/#work" className="action action-primary">
            Explore my work
            <ArrowDown size={20} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Action href="/resume.html" external>
            View résumé
          </Action>
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
        <h2 id="work-title">
          Selected <em>work</em>
        </h2>
        <p>
          A few things I’ve put
          <br />
          into the world.
        </p>
      </Reveal>
      <ProjectShowcase />
      <div className="selected-rows">
        {selectedIds.map((id, index) => {
          const project = projects.find((p) => p.id === id);
          return <ProjectRow key={id} project={project} index={index + 4} />;
        })}
      </div>
      <div className="archive-link">
        <span>Different ideas. The same curiosity.</span>
        <Action to="/projects">Explore all {projects.length} projects</Action>
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
            My first
            <br />
            user?
            <br />
            <em>My dad.</em>
          </h2>
          <div className="ledger-story-text">
            <p>
              He used to keep his daily ledger in a book. Every entry meant more
              calculations, more time. So I built him an app.
            </p>
            <p>
              Now, <strong>Daily Ledger</strong> helps him manage his daily
              ledger with less effort.
            </p>
          </div>
          <div className="ledger-actions">
            <Action to="/projects/daily-ledger" variant="dark">
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
      <SectionRule number="04" />
      <div className="about-grid">
        <Reveal className="about-copy">
          <h2 id="about-title">
            Curious by
            <br />
            <em>
              default<span>.</span>
            </em>
          </h2>
          <p>
            I’m Priyank Chavda, a developer from Gujarat, India. I work across
            full-stack applications, practical AI integrations, and now,
            language models trained from scratch.
          </p>
          <p>
            I like the whole process: understanding a problem, making something,
            and learning from what happens when someone uses it.
          </p>
          <Action href="/resume.html" external>
            View résumé
          </Action>
        </Reveal>
        <Reveal className="about-details" delay={0.06}>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-item" key={item.title}>
                <p className="experience-date">{item.date}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.company}</p>
                  {expanded && (
                    <p className="experience-description">{item.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </div>
            ))}
          </div>
          <div className="education">
            <h3>Education</h3>
            <p>
              Diploma in Computer Engineering
              <br />
              Government Polytechnic Jamnagar, 2025
            </p>
          </div>
          {expanded && (
            <div className="education">
              <h3>Learning & certifications</h3>
              <ul>
                {certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
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
      <div className="contact-art" aria-hidden="true">
        <img
          src="/images/contact-art.webp"
          alt=""
          width="1536"
          height="1024"
          loading="lazy"
        />
      </div>
      <div className="shell contact-content">
        <SectionRule number="05" />
        <Reveal>
          <h2 id="contact-title">
            Good things
            <br />
            start with a<br />
            <em>
              conversation<span>.</span>
            </em>
          </h2>
          <Action href={`mailto:${personal.email}`} className="contact-email">
            {personal.email}
          </Action>
          <div className="social-links">
            <Action href={personal.github} external>
              GitHub
            </Action>
            <Action href={personal.linkedin} external>
              LinkedIn
            </Action>
            <Action href={personal.youtube} external>
              YouTube
            </Action>
            <Action href="/resume.html" external>
              View résumé
            </Action>
          </div>
          <div className="contact-buttons">
            <Action variant="outline" onClick={onMessage}>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
