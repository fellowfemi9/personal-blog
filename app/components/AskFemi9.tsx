"use client";

import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "What should I avoid eating during pregnancy?",
  "What vaccines do I need while pregnant?",
  "When should I schedule my dental visit during pregnancy?",
  "How often should I pump breast milk?",
  "What are safe sleep rules for a newborn?",
  "What do I need in my hospital bag?",
  "Can I do yoga while pregnant?",
  "What are galactagogue foods for milk supply?",
  "When should my baby start solids?",
  "What are the car seat safety rules for newborns?",
  "How do I manage dry eyes during pregnancy?",
  "What is the two-hour car seat rule?",
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

export default function AskFemi9() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState("");
  const [error, setError] = useState("");
  const answerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function ask(q: string) {
    const trimmed = q.trim();
    if (!trimmed || loading) return;
    setAsked(trimmed);
    setAnswer("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response body");

      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setAnswer(fullText);
      }
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  function submit() {
    ask(question);
    setQuestion("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  // Scroll answer into view when it starts populating
  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [answer.length > 0]);

  const showAnswer = (answer || loading || error) && asked;

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-1">Ask the Blog</p>
          <h2
            className="text-3xl font-black text-gray-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ask Femi9
          </h2>
        </div>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #7C3AED40, transparent)" }} />
      </div>

      {/* Prompt card */}
      <div
        className="rounded-3xl overflow-hidden shadow-xl mb-6"
        style={{
          background: "linear-gradient(135deg, #0d0520 0%, #1e0842 55%, #0d0520 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="px-6 pt-6 pb-2">
          <p className="text-amber-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-1">Femi9 Power</p>
          <p className="text-white font-black text-lg leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Got a question? Ask away.
          </p>
          <p className="text-white/40 text-xs mt-1 mb-4">
            Answers are sourced from this blog. Medical topics will include a reminder to consult your provider.
          </p>
        </div>

        <div className="px-6 pb-6">
          {/* Textarea */}
          <div className="relative">
            <textarea
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKey}
              placeholder="e.g. What should I pack in my hospital bag?"
              rows={2}
              maxLength={300}
              className="w-full rounded-2xl px-4 py-3.5 pr-14 text-white text-sm resize-none focus:outline-none placeholder:text-white/25 leading-relaxed"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}
            />
            <button
              onClick={submit}
              disabled={!question.trim() || loading}
              className="absolute right-3 bottom-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: question.trim() && !loading
                  ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                  : "rgba(255,255,255,0.08)",
                cursor: question.trim() && !loading ? "pointer" : "not-allowed",
              }}
              aria-label="Send question"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden>
                <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill={question.trim() && !loading ? "#1a0733" : "rgba(255,255,255,0.3)"} />
              </svg>
            </button>
          </div>
          <p className="text-white/20 text-xs mt-1.5 text-right">{question.length}/300 · Enter to send</p>
        </div>
      </div>

      {/* Suggested questions */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Try asking</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setQuestion(""); ask(s); }}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors text-left"
              style={{
                borderColor: "rgba(124,58,237,0.25)",
                background: "rgba(124,58,237,0.06)",
                color: "#7c3aed",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Answer area */}
      {showAnswer && (
        <div
          ref={answerRef}
          className="rounded-3xl overflow-hidden border border-violet-100 bg-white shadow-md"
        >
          {/* Asked question */}
          <div className="px-5 py-4 border-b border-violet-50 bg-violet-50/60 flex items-start gap-3">
            <span className="mt-0.5 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-black">Q</span>
            </span>
            <p className="text-violet-800 text-sm font-semibold leading-snug">{asked}</p>
          </div>

          {/* Answer */}
          <div className="px-5 py-5 flex items-start gap-3">
            <div
              className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }}
            >
              <span className="text-[#1a0733] text-[10px] font-black">F9</span>
            </div>
            <div className="flex-1 min-w-0">
              {loading && !answer && <TypingDots />}
              {answer && (
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {answer}
                  {loading && <TypingDots />}
                </p>
              )}
              {error && (
                <p className="text-rose-500 text-sm">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
