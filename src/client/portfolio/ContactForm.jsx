import { useEffect, useRef, useState } from "react";
import { Loader2, ArrowUpRight, Check } from "lucide-react";
import { apiUrl } from "../config/api";
import { personal } from "./content";

export default function ContactForm() {
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
  const abort = useRef(null);
  useEffect(() => () => abort.current?.abort(), []);
  async function submit(e) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (
      !data.name.trim() ||
      !data.email.trim() ||
      data.message.trim().length < 10
    ) {
      setState("error");
      setMessage(
        "Add your name, email, and a message of at least 10 characters.",
      );
      return;
    }
    setState("sending");
    setMessage("Sending your message…");
    const controller = new AbortController();
    abort.current = controller;
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("delivery");
      setState("success");
      setMessage("Your message is on its way. Thank you for reaching out.");
      form.reset();
    } catch {
      if (!form.isConnected) return;
      setState("error");
      setMessage(
        "Your message couldn’t be sent. You can email me directly using the link below.",
      );
    } finally {
      clearTimeout(timeout);
      abort.current = null;
    }
  }
  return (
    <div className="contact-form-wrap">
      <h2 className="form-title">
        Say <em>hello.</em>
      </h2>
      <p>
        Have a role, an idea, or something interesting in mind? I’d like to hear
        about it.
      </p>
      <form onSubmit={submit} className="contact-form">
        <div className="form-pair">
          <div>
            <label htmlFor="contact-name">
              Your name <span>(required)</span>
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="contact-email">
              Email <span>(required)</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@company.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject">What’s it about?</label>
          <input
            id="contact-subject"
            name="subject"
            maxLength={200}
            placeholder="A role, a project, an idea…"
          />
        </div>
        <div>
          <label htmlFor="contact-message">
            Your message <span>(required)</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={4}
            placeholder="Tell me a little about it."
          />
        </div>
        <div
          className={`form-feedback ${state}`}
          role="status"
          aria-live="polite"
        >
          {state === "success" && <Check size={18} aria-hidden="true" />}
          {message}
        </div>
        <button
          type="submit"
          className="action action-primary"
          disabled={state === "sending"}
        >
          {state === "sending" ? (
            <>
              <Loader2 className="spin" size={18} aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight size={20} aria-hidden="true" />
            </>
          )}
        </button>
      </form>
      <a className="form-email" href={`mailto:${personal.email}`}>
        {personal.email}
      </a>
    </div>
  );
}
