import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Asterisk, Menu } from "lucide-react";
import { Action, Dialog } from "./Primitives";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header shell">
        <Link to="/" className="brand" aria-label="Priyank Chavda, home">
          Priyank Chavda
          <Asterisk size={23} strokeWidth={2.5} aria-hidden="true" />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          <Link to="/#work">Work</Link>
          <Link to="/#about">About</Link>
          <Link to="/#videos">Videos</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
        <Action to="/contact" className="header-contact">
          Let’s talk
        </Action>
        <button
          className="icon-button menu-toggle"
          aria-label="Open navigation"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" />
        </button>
      </header>
      {open && (
        <Dialog
          title="Navigation"
          className="menu-dialog"
          onClose={() => setOpen(false)}
        >
          <nav aria-label="Mobile navigation">
            <Link to="/#work">
              Work<sup>01</sup>
            </Link>
            <Link to="/#about">
              About<sup>04</sup>
            </Link>
            <Link to="/#videos">
              Videos<sup>03</sup>
            </Link>
            <Link to="/#contact">
              Contact<sup>05</sup>
            </Link>
            <Link to="/projects">All projects</Link>
          </nav>
          <Action href="/resume.html" external>
            View résumé
          </Action>
        </Dialog>
      )}
    </>
  );
}
