import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { MotionConfig } from "motion/react";
import SiteHeader from "./portfolio/SiteHeader";
import {
  Hero,
  SelectedWork,
  LedgerStory,
  AboutSection,
  ContactSection,
} from "./portfolio/HomeSections";
import {
  ProjectsPage,
  AboutPage,
  ProjectPage,
  ContactPage,
  NotFound,
} from "./portfolio/Pages";
import { Dialog } from "./portfolio/Primitives";
import ContactForm from "./portfolio/ContactForm";
import FilmSection from "./portfolio/FilmSection";
import { motion, useScroll } from "motion/react";
import { projects } from "./portfolio/content";
const Assistant = lazy(() => import("./portfolio/Assistant"));

function NavigationEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    let id;
    const frame = requestAnimationFrame(() => {
      if (hash) {
        id = setTimeout(
          () =>
            document.getElementById(hash.slice(1))?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
              block: "start",
            }),
          20,
        );
      } else window.scrollTo({ top: 0, behavior: "instant" });
      const main = document.getElementById("main");
      if (main && !hash) main.focus({ preventScroll: true });
    });
    const project = pathname.startsWith("/projects/")
      ? projects.find((p) => p.id === pathname.split("/")[2])
      : null;
    const title = project
      ? `${project.title} — Priyank Chavda`
      : pathname === "/projects"
        ? "Selected projects — Priyank Chavda"
        : pathname === "/about" || pathname === "/experience"
          ? "About — Priyank Chavda"
          : pathname === "/contact"
            ? "Contact — Priyank Chavda"
            : "Priyank Chavda — Full-stack Developer & AI Builder";
    document.title = title;
    const description =
      project?.description ||
      "Priyank Chavda builds full-stack applications, practical AI tools, and Isoliq Inno, a small language model trained from scratch. Explore the work and get in touch.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        `https://priyankchavda.info${pathname === "/" ? "/" : pathname}`,
      );
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(id);
    };
  }, [pathname, hash]);
  return null;
}

function Home({ onMessage, onAssistant }) {
  return (
    <>
      <Hero />
      <SelectedWork />
      <LedgerStory />
      <FilmSection />
      <AboutSection />
      <ContactSection onMessage={onMessage} onAssistant={onAssistant} />
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <Link to="/" className="footer-name">
        Priyank Chavda
      </Link>
      <p>Built with care, in Gujarat.</p>
      <button
        className="action action-text"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
          document.querySelector(".brand")?.focus({ preventScroll: true });
        }}
      >
        Back to top
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 20V4m-7 7 7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

function AppShell() {
  const [modal, setModal] = useState(null);
  const location = useLocation();
  useEffect(() => setModal(null), [location.pathname]);
  return (
    <MotionConfig reducedMotion="user">
      <NavigationEffects />
      <ReadingProgress />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onMessage={() => setModal("message")}
                onAssistant={() => setModal("assistant")}
              />
            }
          />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      {modal && (
        <Dialog
          title={modal === "message" ? "Send a message" : "Portfolio assistant"}
          onClose={() => setModal(null)}
          className={modal === "assistant" ? "assistant-dialog" : ""}
        >
          {modal === "message" ? (
            <ContactForm />
          ) : (
            <Suspense
              fallback={
                <p className="assistant-loading" role="status">
                  Opening the assistant…
                </p>
              }
            >
              <Assistant />
            </Suspense>
          )}
        </Dialog>
      )}
    </MotionConfig>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
