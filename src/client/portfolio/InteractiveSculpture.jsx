import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw, MoveUpRight } from "lucide-react";

// Probe before loading Three.js. Software graphics and data-saving devices get
// the poster plus an explicit, paused opt-in instead of expensive autoplay.
function canAutoplay3D() {
  if (navigator.connection?.saveData) return false;
  const probe = document.createElement("canvas");
  let gl;
  try {
    gl = probe.getContext("webgl2", {
      failIfMajorPerformanceCaveat: true,
      powerPreference: "low-power",
    });
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : "";
    return !/swiftshader|llvmpipe|lavapipe|software|softpipe/i.test(renderer);
  } catch {
    return false;
  } finally {
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
}

export default function InteractiveSculpture() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [manual, setManual] = useState(false);
  const [status, setStatus] = useState("idle");
  const [paused, setPaused] = useState(Boolean(reduced));
  const [shape, setShape] = useState("Knot");
  const host = useRef(null),
    engine = useRef(null),
    pointer = useRef(null);
  // Let the text and poster paint first. Reduced-motion visitors opt in.
  useEffect(() => {
    if (reduced) return;
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (entry.isIntersecting)
        timer = setTimeout(() => {
          if (canAutoplay3D()) setEnabled(true);
          observer.disconnect();
        }, 650);
    });
    observer.observe(host.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [reduced]);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setStatus("loading");
    import("./sculpture")
      .then(({ createSculpture }) => {
        if (cancelled) return;
        try {
          engine.current = createSculpture(host.current, {
            paused: Boolean(reduced) || manual,
            onFailure: () => {
              engine.current?.dispose();
              engine.current = null;
              setStatus("unavailable");
            },
          });
          setPaused(Boolean(reduced) || manual);
          setShape("Knot");
          setStatus("ready");
        } catch {
          host.current?.replaceChildren();
          setStatus("unavailable");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });
    return () => {
      cancelled = true;
      engine.current?.dispose();
      engine.current = null;
    };
  }, [enabled, reduced, manual]);
  function rotate(event) {
    if (!pointer.current || pointer.current.id !== event.pointerId) return;
    engine.current?.rotate(
      (event.clientX - pointer.current.x) * 0.009,
      (event.clientY - pointer.current.y) * 0.009,
    );
    pointer.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  }
  function release() {
    pointer.current = null;
    engine.current?.drag(false);
  }
  function keyboard(event) {
    const directions = {
      ArrowLeft: [-0.18, 0],
      ArrowRight: [0.18, 0],
      ArrowUp: [0, -0.18],
      ArrowDown: [0, 0.18],
    };
    if (directions[event.key]) {
      event.preventDefault();
      engine.current?.rotate(...directions[event.key]);
    }
    if (event.key === "Home") {
      event.preventDefault();
      engine.current?.reset();
    }
  }
  return (
    <div className={`sculpture sculpture-${status}`}>
      <div
        className="sculpture-stage"
        role="group"
        aria-label="Interactive 3D sculpture"
        aria-describedby="sculpture-help"
        tabIndex={status === "ready" ? 0 : -1}
        onKeyDown={keyboard}
        onPointerDown={(event) => {
          if (status !== "ready") return;
          if (event.pointerType === "mouse")
            event.currentTarget.focus({ preventScroll: true });
          event.currentTarget.setPointerCapture(event.pointerId);
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
          engine.current?.drag(true);
        }}
        onPointerMove={rotate}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
      >
        <img
          className="sculpture-poster"
          src="/images/hero-art.webp"
          alt=""
          width="1024"
          height="1024"
          fetchPriority="high"
          aria-hidden="true"
        />
        <div ref={host} className="sculpture-canvas" />
      </div>
      <div className="sculpture-dock">
        {status === "ready" ? (
          <>
            <span className="sculpture-hint" id="sculpture-help">
              <MoveUpRight size={13} aria-hidden="true" /> Drag to rotate
              <span className="sr-only">
                . Use arrow keys to rotate, Home to reset.
              </span>
            </span>
            <div
              className="shape-options"
              role="group"
              aria-label="Sculpture shape"
            >
              {["Knot", "Orbit", "Wave"].map((item) => (
                <button
                  key={item}
                  aria-pressed={shape === item}
                  onClick={() => {
                    setShape(item);
                    engine.current?.shape(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="sculpture-icon"
              aria-label={paused ? "Animate sculpture" : "Pause sculpture"}
              onClick={() => {
                setPaused(!paused);
                engine.current?.pause(!paused);
              }}
            >
              {paused ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
            </button>
            <button
              className="sculpture-icon"
              aria-label="Reset sculpture rotation"
              onClick={() => engine.current?.reset()}
            >
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          </>
        ) : (
          <>
            <span id="sculpture-help">
              {status === "unavailable"
                ? "Sculpture preview · 3D unavailable on this device"
                : status === "loading"
                  ? "Opening the sculpture…"
                  : "A little room to play."}
            </span>
            {status === "idle" && (
              <button
                className="enable-sculpture"
                onClick={() => {
                  setManual(true);
                  setEnabled(true);
                }}
              >
                Enable 3D <Play size={13} aria-hidden="true" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
