import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "./SmoothScroll.jsx";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { duration: 0.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, lenis]);

  return null;
}
