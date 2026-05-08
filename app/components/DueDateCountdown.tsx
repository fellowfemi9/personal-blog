"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const DUE_DATE_KEY = "femi9-due-date";

const BABY_SIZES = [
  { week: 4,  size: "poppy seed",  emoji: "🌱" },
  { week: 6,  size: "blueberry",   emoji: "🫐" },
  { week: 8,  size: "raspberry",   emoji: "🍇" },
  { week: 10, size: "strawberry",  emoji: "🍓" },
  { week: 12, size: "lime",        emoji: "🍋" },
  { week: 14, size: "lemon",       emoji: "🍋" },
  { week: 16, size: "avocado",     emoji: "🥑" },
  { week: 18, size: "bell pepper", emoji: "🫑" },
  { week: 20, size: "banana",      emoji: "🍌" },
  { week: 22, size: "papaya",      emoji: "🍈" },
  { week: 24, size: "corn",        emoji: "🌽" },
  { week: 26, size: "cucumber",    emoji: "🥒" },
  { week: 28, size: "eggplant",    emoji: "🍆" },
  { week: 30, size: "coconut",     emoji: "🥥" },
  { week: 32, size: "pineapple",   emoji: "🍍" },
  { week: 34, size: "cantaloupe",  emoji: "🍈" },
  { week: 36, size: "honeydew",    emoji: "🍈" },
  { week: 38, size: "pumpkin",     emoji: "🎃" },
  { week: 40, size: "watermelon",  emoji: "🍉" },
];

const MONTH_GUIDE = [
  { weeksMin: 1,  weeksMax: 9,  label: "Months 1–2", anchor: "1–2" },
  { weeksMin: 9,  weeksMax: 14, label: "Month 3",     anchor: "3"   },
  { weeksMin: 14, weeksMax: 18, label: "Month 4",     anchor: "4"   },
  { weeksMin: 18, weeksMax: 23, label: "Month 5",     anchor: "5"   },
  { weeksMin: 23, weeksMax: 28, label: "Month 6",     anchor: "6"   },
  { weeksMin: 28, weeksMax: 32, label: "Month 7",     anchor: "7"   },
  { weeksMin: 32, weeksMax: 36, label: "Month 8",     anchor: "8"   },
  { weeksMin: 36, weeksMax: 42, label: "Month 9",     anchor: "9"   },
];

function getMonthGuide(weeks: number) {
  return MONTH_GUIDE.find((m) => weeks >= m.weeksMin && weeks < m.weeksMax) ?? null;
}

function getBabySize(weeksPregnant: number) {
  return BABY_SIZES.reduce((prev, curr) =>
    Math.abs(curr.week - weeksPregnant) < Math.abs(prev.week - weeksPregnant) ? curr : prev
  );
}

export default function DueDateCountdown() {
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [inputDate, setInputDate] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(DUE_DATE_KEY);
    if (stored) {
      setDueDate(stored);
      setTimeout(() => setShowCountdown(true), 1200);
    } else {
      setTimeout(() => setShowPicker(true), 1500);
    }
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysLeft = dueDate
    ? Math.ceil((new Date(dueDate).getTime() - today.getTime()) / 86400000)
    : null;

  const weeksPregnant =
    daysLeft !== null ? Math.max(0, Math.round(40 - daysLeft / 7)) : null;

  const babyInfo =
    weeksPregnant !== null && weeksPregnant >= 4
      ? getBabySize(weeksPregnant)
      : null;

  const monthGuide =
    weeksPregnant !== null && weeksPregnant > 0
      ? getMonthGuide(weeksPregnant)
      : null;

  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date(today.getTime() + 280 * 86400000)
    .toISOString()
    .split("T")[0];

  function save() {
    if (!inputDate) return;
    localStorage.setItem(DUE_DATE_KEY, inputDate);
    setDueDate(inputDate);
    setShowPicker(false);
    setEditing(false);
    setDismissed(false);
    setTimeout(() => setShowCountdown(true), 300);
  }

  const pickerOpen = showPicker || editing;

  return (
    <>
      {/* ── Due-date picker modal ── */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1a0733 0%, #2d0f55 100%)",
              border: "1px solid rgba(251,191,36,0.3)",
            }}
          >
            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            )}

            <div className="px-6 py-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🍼</div>
                <h2
                  className="text-white font-black text-xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  When is your little one due?
                </h2>
                <p className="text-white/50 text-sm mt-1.5">
                  I'll track your countdown every visit ✨
                </p>
              </div>

              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                min={minDate}
                max={maxDate}
                className="w-full rounded-xl px-4 py-3 text-white bg-white/10 border border-white/20 focus:border-amber-400 focus:outline-none text-sm mb-4"
              />

              <button
                onClick={save}
                disabled={!inputDate}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: inputDate
                    ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                    : "rgba(255,255,255,0.1)",
                  color: inputDate ? "#1a0733" : "rgba(255,255,255,0.3)",
                  cursor: inputDate ? "pointer" : "not-allowed",
                }}
              >
                Save My Due Date ✨
              </button>

              {!editing && (
                <button
                  onClick={() => setShowPicker(false)}
                  className="w-full mt-3 py-2 text-white/35 hover:text-white/60 text-sm transition-colors"
                >
                  Remind me later
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Countdown widget ── */}
      {showCountdown && !dismissed && daysLeft !== null && (
        <div
          className="fixed bottom-24 right-4 z-[9990] w-[250px] rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0733 0%, #2d0f55 100%)",
            border: "1px solid rgba(251,191,36,0.3)",
            transition: "opacity 0.4s, transform 0.4s",
            opacity: showCountdown ? 1 : 0,
            transform: showCountdown ? "translateY(0)" : "translateY(16px)",
          }}
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-2 flex items-start justify-between">
            <div>
              <p className="text-amber-400 text-[9px] font-bold tracking-[0.2em] uppercase mb-0.5">
                Due Date Countdown
              </p>
              {daysLeft > 0 ? (
                <p className="text-white font-black text-2xl leading-none">
                  {daysLeft}
                  <span className="text-white/45 font-normal text-sm ml-1">days to go</span>
                </p>
              ) : (
                <p className="text-white font-black text-lg leading-snug">Today! 🎉</p>
              )}
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/30 hover:text-white/60 transition-colors text-base leading-none mt-0.5 flex-shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="px-4 pb-4">
            {daysLeft > 0 ? (
              <>
                {weeksPregnant !== null && weeksPregnant > 0 && (
                  <p className="text-white/45 text-xs mb-2">
                    ~{weeksPregnant} weeks pregnant
                    {monthGuide && (
                      <span className="text-amber-400/80"> · {monthGuide.label}</span>
                    )}
                  </p>
                )}
                {babyInfo && (
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 mb-2">
                    <span className="text-lg">{babyInfo.emoji}</span>
                    <span className="text-white/55 text-xs leading-snug">
                      Baby is about the size of a{" "}
                      <strong className="text-white/80">{babyInfo.size}</strong>
                    </span>
                  </div>
                )}
                {monthGuide && (
                  <Link
                    href={`/posts/hey-pregnant-mama?tab=cheatsheet#cheatsheet-${monthGuide.anchor}`}
                    className="block text-center text-xs font-semibold py-2 rounded-xl transition-opacity hover:opacity-80"
                    style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}
                  >
                    See {monthGuide.label} checklist →
                  </Link>
                )}
              </>
            ) : (
              <p className="text-white/50 text-xs">Congratulations mama! 🌸</p>
            )}

            <button
              onClick={() => {
                setEditing(true);
                setDismissed(false);
              }}
              className="mt-3 text-amber-400/60 hover:text-amber-400 text-xs transition-colors underline underline-offset-2"
            >
              Change due date
            </button>
          </div>
        </div>
      )}
    </>
  );
}
