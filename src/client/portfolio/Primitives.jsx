import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Arrow(props) {
  return (
    <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" {...props} />
  );
}

export function Action({
  to,
  href,
  children,
  variant = "text",
  className = "",
  external = false,
  ...props
}) {
  const classes = `action action-${variant} ${className}`;
  const content = (
    <>
      {children}
      <Arrow />
    </>
  );
  if (to)
    return (
      <Link className={classes} to={to} {...props}>
        {content}
      </Link>
    );
  if (href)
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
      </a>
    );
  return (
    <button className={classes} type="button" {...props}>
      {content}
    </button>
  );
}

export function Reveal({ children, className = "", delay = 0, ...props }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionRule({ number, children }) {
  return (
    <div className="section-rule">
      <span>
        {number}
        {children ? ` / ${children}` : ""}
      </span>
      <div />
    </div>
  );
}

export function Dialog({ title, children, onClose, className = "" }) {
  const ref = useRef(null);
  const returnFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    if (!returnFocusRef.current)
      returnFocusRef.current = document.activeElement;
    const overflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    const close = () => onCloseRef.current();
    dialog.addEventListener("close", close);
    return () => {
      dialog.removeEventListener("close", close);
      // Removing the portal dismisses the native dialog. Calling close() here
      // queues a close event during StrictMode's setup/cleanup replay.
      document.body.style.overflow = overflow;
      const previous = returnFocusRef.current;
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={ref}
      aria-label={title}
      className={`dialog ${className}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span>{title}</span>
          <button
            type="button"
            className="icon-button"
            aria-label={`Close ${title}`}
            onClick={onClose}
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}
