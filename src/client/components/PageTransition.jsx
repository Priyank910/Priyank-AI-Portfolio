import React from "react";
import { motion } from "motion/react";
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 14,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1],
};

export default function PageTransition() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
