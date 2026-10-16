import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import TabList from "./TabList";
import { skills, experience, certifications } from "./content";

const tabs = [
  { key: "approach", label: "My approach" },
  { key: "experience", label: "Experience" },
  { key: "toolbox", label: "Toolbox" },
];
export default function AboutDetails({ expanded = false }) {
  const [selected, setSelected] = useState(1);
  const id = useId(),
    reduced = useReducedMotion();
  return (
    <div className="about-details">
      <TabList
        id={id}
        label="About Priyank"
        items={tabs}
        active={selected}
        onChange={setSelected}
        className="about-tabs"
      />
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${selected}`}
        tabIndex={0}
        className="about-panel"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
          >
            {selected === 0 ? (
              <div className="approach-copy">
                <h3>Start with a person. Stay curious.</h3>
                <p>
                  I like the whole process: understanding a problem, making
                  something, and learning from what happens when someone uses
                  it.
                </p>
                <p>
                  Daily Ledger started with my dad’s routine. Isoliq started
                  with wanting to understand a language model from the inside
                  out. Both keep teaching me.
                </p>
              </div>
            ) : selected === 1 ? (
              <div className="experience-list">
                {experience.map((item) => (
                  <article className="experience-item" key={item.title}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.company}</p>
                      {expanded && (
                        <p className="experience-description">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <p className="experience-date">{item.date}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="about-toolbox">
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
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
