import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { Action, Arrow, Reveal, SectionRule } from "./Primitives";
import {
  personal,
  projects,
  isoliq,
  shortDescriptions,
  selectedIds,
  skills,
  experience,
  certifications,
} from "./content";

export function Hero() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 60, damping: 22 });
  const rotateY = useSpring(x, { stiffness: 60, damping: 22 });
  const art = useRef(null);
  function move(e) {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
    y.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8);
  }
  return (
    <section
      className="hero shell"
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="hero-art" ref={art} aria-hidden="true">
        <motion.img
          src="/images/hero-art.webp"
          alt=""
          width="1024"
          height="1024"
          fetchPriority="high"
          style={{ rotateX, rotateY }}
        />
      </div>
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
      <div className="featured-project">
        <Reveal className="featured-media">
          <Link to="/projects/isoliq-inno">
            <div className="browser-frame">
              <div className="browser-top">
                <span />
                <span />
                <span />
                <span className="browser-address">isoliq.com</span>
                <Arrow size={13} />
              </div>
              <img
                src="/images/isoliq-screen.webp"
                width="1440"
                height="1000"
                loading="lazy"
                alt="Isoliq website showing the open-source Inno 1 model and its Small models. Real understanding. introduction"
              />
            </div>
            <div className="media-caption">
              <span>ISOLIQ / INNO 1</span>
              <span>
                From scratch, in the open
                <Arrow size={17} />
              </span>
            </div>
          </Link>
        </Reveal>
        <Reveal className="featured-copy" delay={0.08}>
          <span className="mono">01 / AI RESEARCH</span>
          <h3>Isoliq Inno 1</h3>
          <p className="project-deck">
            A small language model.
            <br />A big learning curve.
          </p>
          <p>
            Training a 3M-parameter GPT-style model from scratch, from tokenizer
            to honest evaluation.
          </p>
          <p className="tech-line">
            Python<span>/</span>PyTorch<span>/</span>nanoGPT
          </p>
          <div className="project-actions">
            <Action to="/projects/isoliq-inno" variant="primary">
              Explore project
            </Action>
            <Action href={isoliq.liveUrl} external>
              Visit Isoliq
            </Action>
          </div>
        </Reveal>
      </div>
      <div className="selected-rows">
        {selectedIds.map((id, index) => {
          const project = projects.find((p) => p.id === id);
          return <ProjectRow key={id} project={project} index={index + 3} />;
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
          <Action to="/projects/daily-ledger" variant="dark">
            Read the story
          </Action>
        </Reveal>
        <Reveal className="ledger-photo" delay={0.08}>
          <img
            src="/images/ledger-art.webp"
            srcSet="/images/ledger-art-480.webp 480w, /images/ledger-art-800.webp 800w, /images/ledger-art.webp 1122w"
            sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 899px) calc((100vw - 88px) / 2), calc((100vw - 188px) / 2)"
            width="1024"
            height="1280"
            loading="lazy"
            alt="An orange accounting notebook, receipts and a pen, illustrating the paper bookkeeping that inspired Daily Ledger"
          />
          <p>
            <span />A real problem. A personal project.
            <span />
          </p>
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
      <SectionRule number="03" />
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
        <SectionRule number="04" />
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
