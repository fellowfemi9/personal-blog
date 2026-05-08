"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";

const CATEGORIES = [
  { value: "", label: "Choose what feels closest..." },
  { value: "becoming", label: "The Becoming — identity, reinvention, self-discovery" },
  { value: "in-her-body", label: "In Her Body — health, motherhood, physical experience" },
  { value: "quiet-battles", label: "Quiet Battles — mental health, grief, invisible struggles" },
  { value: "she-built-it", label: "She Built It — career, ambition, entrepreneurship" },
  { value: "love-lessons", label: "Love & Its Lessons — relationships, divorce, chosen family" },
  { value: "threshold", label: "The Threshold — major transitions, loss, starting over" },
  { value: "raising-them", label: "Raising Them — parenting, fertility, the motherhood arc" },
  { value: "reclaimed", label: "Reclaimed — recovery, healing, resilience" },
];

const FAQ = [
  {
    q: "Will anyone know it's me?",
    a: "No. Your name is never published. We use a contributor label you write yourself — something like 'A woman who rebuilt from scratch' or 'Shared anonymously.' If you leave it blank, we'll write one that feels true to your story.",
  },
  {
    q: "Will you change my words?",
    a: "Only for clarity — never for voice. Your story will sound like you. We may gently restructure a sentence or two for readability, but the heart of what you wrote stays exactly as you gave it to us.",
  },
  {
    q: "What if I change my mind after submitting?",
    a: "Email us at any time and we'll remove your story immediately, no questions asked. You own your story always.",
  },
  {
    q: "How long does it take to be published?",
    a: "We aim to respond within 5 days. If your story is selected, you'll hear from us before it goes live.",
  },
  {
    q: "What if my story isn't 'big enough'?",
    a: "There's no such thing. Quiet stories change people just as much as dramatic ones. If it shaped you, it belongs here.",
  },
  {
    q: "Can I submit a voice note instead of writing?",
    a: "Yes. Record up to 4 minutes on your phone and attach it to the form. We'll transcribe it with your permission and can mask your voice if you'd prefer.",
  },
];

type FormData = {
  contributorLabel: string;
  category: string;
  oneLineSummary: string;
  story: string;
  letterToSelf: string;
  whatYouLearned: string;
  consentPublish: boolean;
  consentAnonymous: boolean;
  consentOwnership: boolean;
  contactEmail: string;
};

const EMPTY: FormData = {
  contributorLabel: "",
  category: "",
  oneLineSummary: "",
  story: "",
  letterToSelf: "",
  whatYouLearned: "",
  consentPublish: false,
  consentAnonymous: false,
  consentOwnership: false,
  contactEmail: "",
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-white/70 text-sm font-semibold">{label}</label>
      {hint && <p className="text-white/35 text-xs leading-relaxed">{hint}</p>}
      {children}
    </div>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
};

function inputClass(extra = "") {
  return `w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all ${extra}`;
}

export default function ShareStoryPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"intro" | "form">("intro");

  function set(field: keyof FormData, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function canSubmit() {
    return (
      form.story.trim().length >= 100 &&
      form.consentPublish &&
      form.consentAnonymous &&
      form.consentOwnership
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const categoryLabel = CATEGORIES.find((c) => c.value === form.category)?.label ?? "Not specified";
    const subject = encodeURIComponent("New Story Submission — Femi9 Power");
    const body = encodeURIComponent(
      `NEW STORY SUBMISSION\n` +
      `══════════════════════════════\n\n` +
      `Contributor Label:\n${form.contributorLabel || "(Anonymous — please suggest a label)"}\n\n` +
      `Category: ${categoryLabel}\n\n` +
      `One-line summary:\n${form.oneLineSummary || "(Not provided)"}\n\n` +
      `══════════════════════════════\nHER STORY\n══════════════════════════════\n\n` +
      `${form.story}\n\n` +
      `══════════════════════════════\nREFLECTIONS\n══════════════════════════════\n\n` +
      `What I would tell her:\n${form.letterToSelf || "(Not provided)"}\n\n` +
      `What I learned:\n${form.whatYouLearned || "(Not provided)"}\n\n` +
      `══════════════════════════════\nCONTACT (if provided)\n══════════════════════════════\n\n` +
      `Email when published: ${form.contactEmail || "(Not provided)"}\n\n` +
      `Consents: Publish ✓ | Anonymous ✓ | Ownership ✓`
    );
    window.location.href = `mailto:femi9power@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0a0414 0%, #130828 50%, #0a0414 100%)" }}>
        <PageHeader title="Share Your Story" accent="text-violet-400" />
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="text-5xl mb-6">💜</div>
          <h2
            className="text-white font-black text-2xl sm:text-3xl mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            It takes courage to share.
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-3">
            Your story has been sent. We&apos;ll review it with care and reach out within 5 days.
          </p>
          <p className="text-white/35 text-sm leading-relaxed mb-8">
            If your email app didn&apos;t open, you can send your story directly to{" "}
            <a href="mailto:femi9power@gmail.com" className="text-violet-400 underline underline-offset-2">
              femi9power@gmail.com
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/stories"
              className="px-6 py-3 rounded-2xl font-bold text-sm text-black"
              style={{ background: "linear-gradient(90deg, #a78bfa, #8b5cf6)" }}
            >
              Read other stories
            </Link>
            <button
              onClick={() => { setSubmitted(false); setStep("intro"); setForm(EMPTY); }}
              className="px-6 py-3 rounded-2xl font-bold text-sm text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              Submit another story
            </button>
          </div>
        </div>
        <div className="h-20 md:h-0" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #0a0414 0%, #130828 50%, #0a0414 100%)" }}
    >
      <PageHeader title="Share Your Story" accent="text-violet-400" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {step === "intro" ? (
          <>
            {/* Emotional headline */}
            <div className="text-center mb-12">
              <span className="inline-block text-violet-400 text-[10px] font-bold tracking-[0.35em] uppercase mb-5 border border-violet-400/25 px-3 py-1 rounded-full">
                Anonymous Storytelling
              </span>
              <h1
                className="font-black leading-tight mb-5"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  background: "linear-gradient(135deg, #ffffff 0%, #e9d5ff 60%, #fde68a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Your story belongs here.
              </h1>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
                Not the polished version. Not the one you post. The one you carry quietly —
                the one someone else out there desperately needs to read.
              </p>
            </div>

            {/* Trust pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {[
                { icon: "🔒", title: "Fully anonymous", body: "Your name is never published. Only the label you choose — or none at all." },
                { icon: "✍️", title: "Your voice, always", body: "We edit only for clarity. Your words stay yours, in the way you said them." },
                { icon: "💜", title: "Read with care", body: "Every submission is reviewed by a real person, not an algorithm." },
              ].map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}
                >
                  <div className="text-2xl mb-3">{p.icon}</div>
                  <p className="text-white font-bold text-sm mb-1.5">{p.title}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            {/* What kinds of stories */}
            <div className="mb-12">
              <p className="text-white/25 text-[10px] font-bold tracking-[0.3em] uppercase mb-5 text-center">
                Stories we hold here
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "rebuilding after loss", "leaving a marriage", "postpartum truth",
                  "career pivots", "grief without a name", "fertility journeys",
                  "identity after motherhood", "healing quietly", "choosing yourself",
                  "the life you didn't plan", "anxiety no one saw", "starting over at any age",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/45 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pull quote */}
            <div
              className="rounded-2xl p-7 mb-12 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderLeft: "3px solid rgba(167,139,250,0.5)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="text-white/70 text-lg leading-relaxed italic mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;There is no such thing as a story that isn&apos;t big enough.
                If it shaped you, it belongs here.&rdquo;
              </p>
              <p className="text-white/30 text-xs">— Femi9 Power</p>
            </div>

            {/* CTA */}
            <div className="text-center mb-14">
              <button
                onClick={() => setStep("form")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-black transition-all hover:opacity-90 hover:scale-105 mb-4"
                style={{ background: "linear-gradient(90deg, #a78bfa, #8b5cf6)" }}
              >
                I&apos;m ready to share
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="text-white/25 text-xs">Takes about 5–10 minutes. No account needed.</p>
            </div>

            {/* FAQ */}
            <div className="mb-10">
              <p className="text-white/25 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-center">
                Common questions
              </p>
              <div className="space-y-3">
                {FAQ.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-white/75 text-sm font-semibold pr-4">{item.q}</span>
                      <svg
                        viewBox="0 0 10 6"
                        fill="none"
                        className="w-3 h-3 flex-shrink-0 text-white/30 transition-transform duration-200"
                        style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                        aria-hidden
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4">
                        <p className="text-white/45 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* ── FORM ── */
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center mb-8">
              <h2
                className="text-white font-black text-xl sm:text-2xl mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Take your time.
              </h2>
              <p className="text-white/40 text-sm">There&apos;s no timer. No pressure. Just your words.</p>
            </div>

            {/* Q1 */}
            <Field
              label="How would you like to be known?"
              hint={`Leave blank to stay fully anonymous, or write something that feels true — like "A mother who started over" or "A woman in her 40s." This becomes your contributor label.`}
            >
              <input
                type="text"
                value={form.contributorLabel}
                onChange={(e) => set("contributorLabel", e.target.value)}
                placeholder="e.g. A woman who chose herself at 35"
                className={inputClass()}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
            </Field>

            {/* Q2 */}
            <Field label="Which category feels closest?">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputClass("cursor-pointer")}
                style={{ ...inputStyle, colorScheme: "dark" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-gray-900">
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>

            {/* Q3 */}
            <Field
              label="If your story had one sentence, what would it say?"
              hint="Optional. This might become the pull quote — the line that stops someone mid-scroll."
            >
              <input
                type="text"
                value={form.oneLineSummary}
                onChange={(e) => set("oneLineSummary", e.target.value)}
                placeholder="e.g. I was so busy being fine that I forgot what real felt like."
                className={inputClass()}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
            </Field>

            {/* Q4 — main story */}
            <Field
              label="Tell us your story. *"
              hint="There's no right way to begin. Start wherever feels easiest. We ask for at least 100 words — but write as much as you need."
            >
              <textarea
                value={form.story}
                onChange={(e) => set("story", e.target.value)}
                placeholder="Start wherever feels true..."
                rows={10}
                required
                minLength={100}
                className={inputClass("resize-none")}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
              <p className="text-white/20 text-xs mt-1.5 text-right">{form.story.length} characters</p>
            </Field>

            {/* Q5 */}
            <Field
              label="What would you tell her — your past self in the middle of it?"
              hint="Optional. The version of you who couldn't see the other side yet."
            >
              <textarea
                value={form.letterToSelf}
                onChange={(e) => set("letterToSelf", e.target.value)}
                placeholder="I would tell her..."
                rows={4}
                className={inputClass("resize-none")}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
            </Field>

            {/* Q6 */}
            <Field
              label="What has this taught you about who you are?"
              hint="Optional. What do you know now that you didn't then?"
            >
              <textarea
                value={form.whatYouLearned}
                onChange={(e) => set("whatYouLearned", e.target.value)}
                placeholder="It taught me..."
                rows={4}
                className={inputClass("resize-none")}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
            </Field>

            {/* Consent */}
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-2">
                Before you send
              </p>
              {[
                { field: "consentPublish" as const, label: "I give Femi9 Power permission to publish this story, edited only for clarity and never for voice." },
                { field: "consentAnonymous" as const, label: "I understand my story will be shared anonymously, using only the contributor label I provided (or none at all)." },
                { field: "consentOwnership" as const, label: "I confirm this is my own lived experience — my story to tell." },
              ].map(({ field, label }) => (
                <label key={field} className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                        form[field] ? "bg-violet-500" : "bg-white/10"
                      }`}
                      style={{ border: form[field] ? "none" : "1px solid rgba(255,255,255,0.2)" }}
                    >
                      {form[field] && (
                        <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2" aria-hidden>
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={form[field] as boolean}
                    onChange={(e) => set(field, e.target.checked)}
                    className="sr-only"
                  />
                  <span className="text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>

            {/* Optional email */}
            <Field
              label="Notify me when my story is published (optional)"
              hint="We'll send you a link. This email is never stored or shared."
            >
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => set("contactEmail", e.target.value)}
                placeholder="your@email.com"
                className={inputClass()}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
              />
            </Field>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={!canSubmit()}
                className="flex-1 py-4 rounded-2xl font-bold text-sm text-black transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(90deg, #a78bfa, #8b5cf6)" }}
              >
                Send my story 💜
              </button>
              <button
                type="button"
                onClick={() => setStep("intro")}
                className="px-5 py-4 rounded-2xl font-semibold text-sm text-white/40 hover:text-white/70 transition-colors"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                Go back
              </button>
            </div>

            {!canSubmit() && form.story.length > 0 && (
              <p className="text-white/30 text-xs text-center">
                {form.story.length < 100
                  ? `Almost there — ${100 - form.story.length} more words and your story is ready.`
                  : "Please check all three consent boxes to continue."}
              </p>
            )}

            <p className="text-white/15 text-xs text-center pb-4">
              This opens your email app with your story pre-filled. Your words go directly to the author — no third party.
            </p>
          </form>
        )}
      </div>

      <div className="h-20 md:h-0" />
    </div>
  );
}
