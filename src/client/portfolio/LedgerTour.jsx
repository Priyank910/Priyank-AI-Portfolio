import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const screens = [
  {
    name: "Overview",
    image: "overview",
    description:
      "The day at a glance. Income, expenses, and a balance that adds itself up.",
  },
  {
    name: "Transactions",
    image: "transactions",
    description:
      "Every entry in one place. Search the history and keep the details close.",
  },
  {
    name: "Reports",
    image: "reports",
    description:
      "Choose a month or date range. Export a PDF or CSV when it’s time to share.",
  },
];
export default function LedgerTour() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const screen = screens[selected];
  function keySelect(event, index) {
    const key = event.key;
    const next =
      key === "ArrowRight"
        ? (index + 1) % 3
        : key === "ArrowLeft"
          ? (index + 2) % 3
          : key === "Home"
            ? 0
            : key === "End"
              ? 2
              : null;
    if (next !== null) {
      event.preventDefault();
      setSelected(next);
      event.currentTarget.parentElement.children[next].focus();
    }
  }
  return (
    <div className="ledger-tour">
      <div className="tour-header">
        <span className="mono">DAILY LEDGER</span>
        <span className="tour-availability">
          <span />
          Android · offline-first
        </span>
      </div>
      <div className="tour-stage">
        <div className="phone-frame">
          <motion.img
            key={screen.image}
            src={`/images/ledger-${screen.image}.webp`}
            alt={`Daily Ledger ${screen.name.toLowerCase()} screen, showing sample shop data`}
            width="390"
            height="844"
            loading="lazy"
            initial={reduced ? false : { opacity: 0.3, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="tour-side-note mono">BUILT AROUND A REAL ROUTINE</span>
      </div>
      <div
        className="tour-tabs"
        role="tablist"
        aria-label="Daily Ledger interface tour"
      >
        {screens.map((item, index) => (
          <button
            role="tab"
            key={item.name}
            aria-selected={selected === index}
            aria-controls="ledger-tour-panel"
            id={`ledger-tour-tab-${index}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(e) => keySelect(e, index)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div
        id="ledger-tour-panel"
        role="tabpanel"
        aria-labelledby={`ledger-tour-tab-${selected}`}
      >
        <p>{screen.description}</p>
        <span className="tour-disclaimer">
          Actual app interface · sample data
        </span>
      </div>
    </div>
  );
}
