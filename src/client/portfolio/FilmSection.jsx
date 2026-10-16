import { useState } from "react";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Action, Arrow, Dialog, Reveal, SectionRule } from "./Primitives";
import { personal, films } from "./content";

export default function FilmSection() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const film = films[0];
  return (
    <section
      className="film-section shell section-space"
      id="videos"
      aria-labelledby="film-title"
    >
      <SectionRule number="03">THE PROCESS, OUT LOUD</SectionRule>
      <Reveal className="film-heading">
        <h2 id="film-title">
          Building it.
          <br />
          <em>Sharing it.</em>
        </h2>
        <p>
          I make videos about AI and the model I’m building. The experiments,
          the decisions, and what I learn along the way.
        </p>
      </Reveal>
      <div className="film-grid">
        <motion.button
          type="button"
          className="film-poster"
          onClick={() => setOpen(true)}
          whileHover={reduced ? undefined : { y: -5 }}
        >
          <img
            src="/images/isoliq-screen.webp"
            width="1440"
            height="1000"
            alt=""
            loading="lazy"
          />
          <div className="film-poster-shade" />
          <div className="film-poster-top mono" aria-hidden="true">
            <span>ISOLIQ / INNO 1</span>
            <span>THE BUILD STORY</span>
          </div>
          <span className="film-play">
            <Play fill="currentColor" size={26} aria-hidden="true" />
          </span>
          <span className="film-poster-bottom">
            Watch the Isoliq build story <Arrow size={26} />
          </span>
        </motion.button>
        <Reveal className="film-copy">
          <span className="mono">FROM MY YOUTUBE CHANNEL</span>
          <h3>{film.heading}</h3>
          <p>{film.description}</p>
          <Action onClick={() => setOpen(true)}>Watch the video</Action>
          <Action href={personal.youtube} external>
            Explore my channel
          </Action>
          <span className="film-byline">
            Priyank Chavda / AI & building in public
          </span>
        </Reveal>
      </div>
      {open && (
        <Dialog
          title="The Isoliq build story"
          className="video-dialog"
          onClose={() => setOpen(false)}
        >
          <div className="video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0`}
              title="Priyank Chavda — Isoliq Inno 1 build story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="video-dialog-foot">
            <p>Trouble playing? Open the video on YouTube.</p>
            <Action href={film.url} external>
              Watch on YouTube
            </Action>
          </div>
        </Dialog>
      )}
    </section>
  );
}
