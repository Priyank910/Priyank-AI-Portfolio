import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Loader2 } from "lucide-react";
import portfolioContext from "../../data/portfolioContext.json";
import { apiUrl } from "../config/api.js";

export default function PageContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      return "Please fill out all required fields.";
    }
    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }
    if (message.length < 10) {
      return "Message must be at least 10 characters.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      setSuccessMsg(null);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Message sent successfully");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white">Get in Touch</h2>
        <p className="text-zinc-400 text-xs sm:text-sm">
          Have an opportunity or question? Send a secure message and it will be delivered to Priyank by email.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Sidebar Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-5 bg-[#0B0B0C] border border-white/5 rounded-2xl space-y-4">
            <h3 className="text-zinc-100 font-sans font-bold text-md flex items-center gap-2">
              Contact Information
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <span className="block text-zinc-500 font-mono text-[10px] uppercase">Email</span>
                  <a href={`mailto:${portfolioContext.personal.email}`} className="text-zinc-300 hover:text-white duration-200">
                    {portfolioContext.personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <span className="block text-zinc-500 font-mono text-[10px] uppercase">Phone</span>
                  <span className="text-zinc-300">{portfolioContext.personal.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <span className="block text-zinc-500 font-mono text-[10px] uppercase">Location</span>
                  <span className="text-zinc-300">{portfolioContext.personal.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick AI Alert Info */}
          <div className="p-4 bg-cyan-950/15 border border-cyan-500/20 rounded-xl flex items-start gap-3 text-cyan-400 text-xs">
            <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <p className="leading-relaxed">
              Messages are sent securely to Priyank's inbox. For quick background on skills and projects, use the AI recruiter assistant on the home page.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl space-y-4">
            {/* Success and Error Indicators */}
            {successMsg && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-950 text-emerald-400 text-xs rounded-xl flex items-start gap-2.5">
                <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed font-sans">{successMsg}</p>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-red-950/40 border border-red-950 text-red-400 text-xs rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed font-sans">{errorMsg}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Full Stack Developer Opening"
                className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Priyank, we're building an AI-powered SaaS product and would love to chat over a call."
                className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition text-xs sm:text-sm shadow-md shadow-cyan-950/10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Sending message...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
