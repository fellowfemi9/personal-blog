"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "femi9-comments";

const MOODS = [
  { emoji: "💜", label: "Grateful" },
  { emoji: "🌸", label: "Inspired" },
  { emoji: "🔥", label: "Empowered" },
  { emoji: "🤔", label: "Curious" },
  { emoji: "💡", label: "Request" },
];

type Comment = {
  id: string;
  name: string;
  text: string;
  mood: string;
  date: string;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function initials(name: string): string {
  return name
    .trim()
    .split(" ")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

const AVATAR_COLORS = [
  "bg-rose-400", "bg-fuchsia-500", "bg-violet-500",
  "bg-amber-500", "bg-emerald-500", "bg-sky-500", "bg-pink-500",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [mood, setMood] = useState(MOODS[0].emoji);
  const [submitted, setSubmitted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setComments(JSON.parse(stored));
    } catch {}
  }, []);

  function submit() {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim() || "Anonymous",
      text: text.trim(),
      mood,
      date: new Date().toISOString(),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    setName("");
    setText("");
    setMood(MOODS[0].emoji);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const shown = expanded ? comments : comments.slice(0, 4);

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">

      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-1">Community</p>
          <h2
            className="text-3xl font-black text-gray-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your Voice
          </h2>
        </div>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #7C3AED40, transparent)" }} />
      </div>

      {/* Form card */}
      <div
        className="rounded-3xl overflow-hidden mb-8 shadow-xl"
        style={{ background: "linear-gradient(135deg, #0d0520 0%, #1e0842 55%, #0d0520 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="px-6 pt-6 pb-3">
          <p className="text-amber-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-1">Femi9 Power</p>
          <p className="text-white font-black text-lg leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            How are you feeling? What would you love to see more of?
          </p>
          <p className="text-white/40 text-xs mt-1">Share your thoughts — your voice shapes this space.</p>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Mood picker */}
          <div>
            <p className="text-white/50 text-xs font-semibold mb-2 tracking-wide">Your vibe today</p>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.emoji}
                  onClick={() => setMood(m.emoji)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: mood === m.emoji ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.07)",
                    border: mood === m.emoji ? "1px solid rgba(251,191,36,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    color: mood === m.emoji ? "#fbbf24" : "rgba(255,255,255,0.5)",
                  }}
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            maxLength={40}
            className="w-full rounded-xl px-4 py-3 text-white bg-white/8 border border-white/15 focus:border-amber-400/60 focus:outline-none text-sm placeholder:text-white/25"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {/* Comment */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something — a feeling, a question, a topic you'd love to see covered…"
            maxLength={400}
            rows={3}
            className="w-full rounded-xl px-4 py-3 text-white bg-white/8 border border-white/15 focus:border-amber-400/60 focus:outline-none text-sm placeholder:text-white/25 resize-none"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div className="flex items-center justify-between">
            <span className="text-white/25 text-xs">{text.length}/400</span>
            <button
              onClick={submit}
              disabled={!text.trim()}
              className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
              style={{
                background: text.trim() ? "linear-gradient(90deg, #f59e0b, #fbbf24)" : "rgba(255,255,255,0.1)",
                color: text.trim() ? "#1a0733" : "rgba(255,255,255,0.25)",
                cursor: text.trim() ? "pointer" : "not-allowed",
              }}
            >
              {submitted ? "Posted ✓" : "Share →"}
            </button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">
            {comments.length} {comments.length === 1 ? "voice" : "voices"} from this community
          </p>
          {shown.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex gap-4"
            >
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-black ${avatarColor(c.name)}`}>
                {initials(c.name) || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-sm font-bold text-gray-900">{c.name}</span>
                  <span className="text-base leading-none">{c.mood}</span>
                  <span className="text-gray-300 text-xs">·</span>
                  <span className="text-gray-400 text-xs">{timeAgo(c.date)}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
          {comments.length > 4 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full py-3 rounded-2xl text-sm font-semibold text-violet-600 hover:bg-violet-50 transition-colors border border-violet-100"
            >
              {expanded ? "Show less ↑" : `Show ${comments.length - 4} more ↓`}
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border border-dashed border-gray-200">
          <p className="text-3xl mb-3">💜</p>
          <p className="text-gray-500 text-sm font-medium">Be the first to leave a voice here.</p>
          <p className="text-gray-400 text-xs mt-1">Your words create the community.</p>
        </div>
      )}
    </section>
  );
}
