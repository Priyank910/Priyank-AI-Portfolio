import { useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Action } from "./Primitives";
import { personal } from "./content";

function subscribePreference(callback) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const currentPreference = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Portrait({ compact = false }) {
  // Motion's preference hook snapshots on mount; this also handles live changes.
  const reduced = useSyncExternalStore(
    subscribePreference,
    currentPreference,
    () => true,
  );
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 24 });
  const springY = useSpring(y, { stiffness: 120, damping: 24 });
  function move(event) {
    if (reduced || compact || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 10);
  }
  const photo = (
    <img
      src={personal.portrait}
      width="460"
      height="460"
      alt="Priyank Chavda"
      fetchPriority={compact ? "auto" : "high"}
      loading={compact ? "lazy" : "eager"}
    />
  );
  return (
    <figure
      className={`portrait ${compact ? "portrait-compact" : ""}`}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="portrait-mount"
        style={
          compact
            ? undefined
            : { x: reduced ? 0 : springX, y: reduced ? 0 : springY, rotate: -3 }
        }
      >
        {compact ? (
          photo
        ) : (
          <Link to="/#about" aria-label="About Priyank Chavda">
            {photo}
          </Link>
        )}
      </motion.div>
      {!compact && (
        <figcaption>
          <span className="portrait-note">
            That’s me. Usually building something.
          </span>
          <Action to="/#about" arrow="right">
            A little more about me
          </Action>
        </figcaption>
      )}
    </figure>
  );
}
