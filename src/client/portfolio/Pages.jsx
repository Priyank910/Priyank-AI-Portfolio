import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projects, personal, categories, shortDescriptions } from "./content";
import { Action, Arrow, Reveal, SectionRule } from "./Primitives";
import { AboutSection, ProjectRow, LedgerStory } from "./HomeSections";
import ContactForm from "./ContactForm";

export function ProjectsPage() {
  const [category, setCategory] = useState("All projects");
  const visible =
    category === "All projects"
      ? projects
      : projects.filter((p) => p.category === category);
  return (
    <div className="projects-page shell page-space">
      <div className="page-intro">
        <span className="mono">THE PROJECT ARCHIVE</span>
        <h1>
          Things I’ve
          <br />
          <em>put into the world.</em>
        </h1>
        <p>
          From a language model trained from scratch to an app for my father.
          Different problems, one ongoing practice.
        </p>
      </div>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} projects shown
      </p>
      <div className="archive-rows">
        {visible.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={projects.indexOf(project) + 1}
          />
        ))}
      </div>
      <div className="archive-foot">
        <p>Want the short version?</p>
        <Action href="/resume.html" external>
          View résumé
        </Action>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="standalone-about">
      <h1 className="sr-only">About Priyank Chavda</h1>
      <AboutSection expanded />
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="contact-page shell page-space">
      <div className="contact-page-intro">
        <span className="mono">A CONVERSATION IS A GOOD START</span>
        <h1>
          Something
          <br />
          <em>in mind?</em>
        </h1>
        <p>
          I’m based in Gujarat, India. Email is the simplest way to reach me.
        </p>
        <Action href={`mailto:${personal.email}`}>Email me directly</Action>
        <div className="contact-page-socials">
          <Action href={personal.github} external>
            GitHub
          </Action>
          <Action href={personal.linkedin} external>
            LinkedIn
          </Action>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}

export function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  if (id === "daily-ledger")
    return (
      <>
        <h1 className="sr-only">Daily Ledger — built for my father</h1>
        <div className="shell detail-back">
          <Link to="/projects">
            <ArrowLeft size={17} aria-hidden="true" />
            All projects
          </Link>
        </div>
        <LedgerStory />
        <div className="shell ledger-case section-space">
          <SectionRule number="THE STORY" />
          <div className="case-grid">
            <h2>
              Software starts
              <br />
              with <em>someone.</em>
            </h2>
            <div>
              <h3>The problem</h3>
              <p>
                My father maintained his daily ledger in a book. Recording
                entries, calculating totals, and keeping everything up to date
                took time and effort.
              </p>
              <h3>What I built</h3>
              <p>
                I made Daily Ledger around that everyday problem: an app to help
                him maintain his ledger more easily.
              </p>
              <h3>The outcome</h3>
              <p>
                My first user is my father. He now uses the app and says it
                helps him a lot. That direct feedback is why this project
                matters to me.
              </p>
              <h3>The engineering</h3>
              <p>{project.architecture}</p>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="detail-actions">
                <Action href={project.repoUrl} external>
                  View source code
                </Action>
                <Action href={project.releaseUrl} external>
                  Release notes
                </Action>
              </div>
              <p className="case-note">
                Records stay on the device. PDF and CSV exports provide backups;
                clearing app data or uninstalling removes local records.
              </p>
            </div>
          </div>
          <NextProject project={next} />
        </div>
      </>
    );
  return (
    <article className="project-detail shell page-space">
      <Link className="back-link" to="/projects">
        <ArrowLeft size={17} aria-hidden="true" />
        All projects
      </Link>
      <Reveal className="project-detail-heading">
        <span className="mono">
          {project.category.toUpperCase()} / {project.status.toUpperCase()}
        </span>
        <h1>{project.title}</h1>
        <p className="detail-deck">{shortDescriptions[id]}</p>
        <div className="detail-actions">
          {project.repoUrl && (
            <Action href={project.repoUrl} variant="primary" external>
              View source code
            </Action>
          )}
          {project.liveUrl && (
            <Action href={project.liveUrl} external>
              Visit website
            </Action>
          )}
        </div>
      </Reveal>
      <div className="project-facts">
        <div>
          <span className="mono">MY ROLE</span>
          <p>{project.role}</p>
        </div>
        <div>
          <span className="mono">BUILT WITH</span>
          <p>{project.techStack.join(" · ")}</p>
        </div>
      </div>
      {project.image && (
        <Reveal
          className={`case-image ${id === "isoliq-inno" ? "isoliq-case-image" : ""}`}
        >
          <img
            src={project.image}
            width="1440"
            height="1000"
            alt={`${project.title} website interface`}
          />
        </Reveal>
      )}
      <div className="case-grid">
        <h2>
          {id === "isoliq-inno" ? (
            <>
              Small model.
              <br />
              <em>Real lessons.</em>
            </>
          ) : (
            <>
              Behind
              <br />
              <em>the build.</em>
            </>
          )}
        </h2>
        <div>
          <section>
            <h3>The idea</h3>
            <p>{project.description}</p>
          </section>
          <section>
            <h3>What I built</h3>
            <ul>
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>The engineering</h3>
            <p>{project.architecture}</p>
          </section>
          <section>
            <h3>
              {id === "isoliq-inno" ? "The important lesson" : "The challenge"}
            </h3>
            <p>{project.challengesSolved}</p>
          </section>
          {project.outcome && (
            <section>
              <h3>The outcome</h3>
              <p>{project.outcome}</p>
            </section>
          )}
          {id === "isoliq-inno" && (
            <>
              <div className="model-facts">
                <div>
                  <strong>3M</strong>
                  <span>trainable parameters</span>
                </div>
                <div>
                  <strong>6</strong>
                  <span>transformer layers</span>
                </div>
                <div>
                  <strong>1,280</strong>
                  <span>token vocabulary</span>
                </div>
              </div>
              <p className="case-note">
                An educational research project with limited language capacity.
                The repository documents the configurations, data audits,
                checkpoints, and limitations. Built on Andrej Karpathy’s
                nanoGPT.
              </p>
              <Action
                href="https://github.com/Priyank910/Isoliq-Inno-1/blob/main/USER-GUIDE.md"
                external
              >
                Read the reproducible guide
              </Action>
            </>
          )}
        </div>
      </div>
      <NextProject project={next} />
    </article>
  );
}

function NextProject({ project }) {
  return (
    <Link className="next-project" to={`/projects/${project.id}`}>
      <div>
        <span className="mono">NEXT PROJECT</span>
        <h2>{project.title}</h2>
      </div>
      <Arrow size={48} />
    </Link>
  );
}

export function NotFound() {
  return (
    <section className="not-found shell page-space">
      <span className="mono">404 / A SMALL DETOUR</span>
      <h1>
        Nothing here.
        <br />
        <em>Plenty to explore.</em>
      </h1>
      <p>That page doesn’t exist. My work is just one click away.</p>
      <Action to="/" variant="primary">
        Back to the portfolio
      </Action>
    </section>
  );
}
