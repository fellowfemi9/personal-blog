"use client";

import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "a reader"} via Femi9 Power`);
    const body = encodeURIComponent(
      `Hi Janane,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`
    );
    window.location.href = `mailto:femi9power@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "linear-gradient(135deg, #0a0414 0%, #130828 50%, #0a0414 100%)" }}>
      <PageHeader title="Contact the Author" accent="text-amber-400" />

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

        {/* Intro */}
        <div className="text-center mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
            style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.25)" }}
          >
            ✉️
          </div>
          <h1
            className="text-white font-black text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Say Hello
          </h1>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed">
            Have a question, topic suggestion, or just want to share your journey?
            I'd love to hear from you.
          </p>
        </div>

        {sent ? (
          /* Thank-you state */
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="text-4xl mb-4">💌</div>
            <p className="text-white font-bold text-lg mb-2">Your email app should have opened!</p>
            <p className="text-white/50 text-sm mb-6">
              If it didn't, you can reach me directly at{" "}
              <a href="mailto:femi9power@gmail.com" className="text-amber-400 underline underline-offset-2">
                femi9power@gmail.com
              </a>
            </p>
            <button
              onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              Send another message
            </button>
          </div>
        ) : (
          /* Contact form */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 sm:p-8 space-y-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Name */}
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(251,191,36,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(251,191,36,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts, ask a question, or request a topic..."
                rows={5}
                required
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all resize-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(251,191,36,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-black transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(90deg, #fbbf24, #f59e0b)" }}
            >
              Send Message ✉️
            </button>

            <p className="text-white/25 text-xs text-center">
              This will open your email app with the message pre-filled.
            </p>
          </form>
        )}

        {/* Direct email fallback */}
        <div className="mt-8 text-center">
          <p className="text-white/30 text-xs mb-2">Or reach out directly</p>
          <a
            href="mailto:femi9power@gmail.com"
            className="text-amber-400/70 hover:text-amber-400 text-sm font-medium transition-colors"
          >
            femi9power@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom spacer for mobile nav */}
      <div className="h-20 md:h-0" />
    </div>
  );
}
