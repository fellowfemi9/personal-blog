"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const DOB_KEY  = "femi9-baby-dob";
const NAME_KEY = "femi9-baby-name";

const STAGES = [
  {
    range: "0–1 Month",
    sectionId: "newborn",
    weeksMin: 0,
    weeksMax: 4,
    emoji: "👶",
    color: "#fb7185",
    bg: "rgba(251,113,133,0.14)",
    highlights: [
      "Irregular sleep and cluster feeding are completely normal",
      "Hold and respond to cries promptly — you cannot spoil a newborn",
      "Tummy time can begin from day one (always supervised)",
    ],
  },
  {
    range: "1–3 Months",
    sectionId: "1-3mo",
    weeksMin: 4,
    weeksMax: 13,
    emoji: "😊",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    highlights: [
      "Social smiling usually appears — make eye contact and smile back",
      "Daily tummy time to build neck and core strength",
      "Talk, sing, and narrate your day — language starts here",
    ],
  },
  {
    range: "4–6 Months",
    sectionId: "4-6mo",
    weeksMin: 13,
    weeksMax: 26,
    emoji: "🎉",
    color: "#ca8a04",
    bg: "rgba(202,138,4,0.12)",
    highlights: [
      "Rolling and reaching emerge — keep tummy time going",
      "Watch for solid food readiness signs around 6 months",
      "Sleep regression can happen around now — it is temporary",
    ],
  },
  {
    range: "6–9 Months",
    sectionId: "6-9mo",
    weeksMin: 26,
    weeksMax: 39,
    emoji: "🧩",
    color: "#059669",
    bg: "rgba(5,150,105,0.12)",
    highlights: [
      "Sitting, crawling, pulling up — babyproof now if not done",
      "Separation anxiety is developmentally normal — stay reassuring",
      "Expand solid foods; introduce a water cup at meals",
    ],
  },
  {
    range: "9–12 Months",
    sectionId: "9-12mo",
    weeksMin: 39,
    weeksMax: 52,
    emoji: "🎂",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.12)",
    highlights: [
      "First words, standing, cruising — encourage all imitation",
      "Offer more finger foods and gradually reduce bottle reliance",
      "Schedule the 12-month well-child visit",
    ],
  },
];

function getStage(ageWeeks: number) {
  return STAGES.find((s) => ageWeeks >= s.weeksMin && ageWeeks < s.weeksMax) ?? null;
}

function calcAge(dob: string): { label: string; ageWeeks: number; ageMonths: number } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birth = new Date(dob);
  const ageDays   = Math.floor((today.getTime() - birth.getTime()) / 86400000);
  const ageWeeks  = Math.floor(ageDays / 7);

  // Full months
  let months =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth());
  if (today.getDate() < birth.getDate()) months--;

  // Remaining days after whole months
  const shifted = new Date(birth);
  shifted.setMonth(birth.getMonth() + months);
  const remDays = Math.floor((today.getTime() - shifted.getTime()) / 86400000);

  let label: string;
  if (ageDays < 0) {
    label = "not born yet";
  } else if (ageWeeks < 4) {
    const w = ageWeeks;
    const d = ageDays - w * 7;
    label =
      w === 0
        ? `${ageDays} day${ageDays !== 1 ? "s" : ""} old`
        : `${w} week${w !== 1 ? "s" : ""}${d > 0 ? `, ${d} day${d !== 1 ? "s" : ""}` : ""} old`;
  } else if (months >= 12) {
    const y = Math.floor(months / 12);
    const m = months % 12;
    label = m > 0
      ? `${y} year${y !== 1 ? "s" : ""}, ${m} month${m !== 1 ? "s" : ""} old`
      : `${y} year${y !== 1 ? "s" : ""} old`;
  } else {
    label =
      remDays > 0
        ? `${months} month${months !== 1 ? "s" : ""}, ${remDays} day${remDays !== 1 ? "s" : ""} old`
        : `${months} month${months !== 1 ? "s" : ""} old`;
  }

  return { label, ageWeeks, ageMonths: months };
}

export default function BabyAgePopup() {
  const [dob, setDob]         = useState<string | null>(null);
  const [name, setName]       = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [dismissed, setDismissed]   = useState(false);
  const [editing, setEditing]       = useState(false);

  // form state
  const [inputDob, setInputDob]   = useState("");
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    const storedDob  = localStorage.getItem(DOB_KEY);
    const storedName = localStorage.getItem(NAME_KEY) ?? "";
    if (storedDob) {
      setDob(storedDob);
      setName(storedName);
      setTimeout(() => setShowWidget(true), 1800);
    } else {
      setTimeout(() => setShowPicker(true), 2000);
    }
  }, []);

  function save() {
    if (!inputDob) return;
    localStorage.setItem(DOB_KEY, inputDob);
    if (inputName.trim()) localStorage.setItem(NAME_KEY, inputName.trim());
    setDob(inputDob);
    setName(inputName.trim());
    setShowPicker(false);
    setEditing(false);
    setDismissed(false);
    setTimeout(() => setShowWidget(true), 300);
  }

  const today = new Date();
  const maxDob = today.toISOString().split("T")[0];
  const minDob = new Date(today.getTime() - 400 * 86400000).toISOString().split("T")[0];

  const age   = dob ? calcAge(dob) : null;
  const stage = age ? getStage(age.ageWeeks) : null;
  const isFirstYear = age ? age.ageWeeks < 52 && age.ageWeeks >= 0 : false;

  const pickerOpen = showPicker || editing;

  return (
    <>
      {/* ── Picker modal ── */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-[10002] flex items-center justify-center p-4"
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
                <div className="text-5xl mb-3">👶</div>
                <h2
                  className="text-white font-black text-xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Tell me about your baby
                </h2>
                <p className="text-white/50 text-sm mt-1.5">
                  I'll show their age and milestones every visit
                </p>
              </div>

              {/* Baby name (optional) */}
              <label className="block text-white/60 text-xs font-semibold mb-1.5 tracking-wide">
                Baby's name <span className="text-white/30 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="e.g. Aria"
                className="w-full rounded-xl px-4 py-3 text-white bg-white/10 border border-white/20 focus:border-amber-400 focus:outline-none text-sm mb-4 placeholder:text-white/25"
              />

              {/* Date of birth */}
              <label className="block text-white/60 text-xs font-semibold mb-1.5 tracking-wide">
                Date of birth
              </label>
              <input
                type="date"
                value={inputDob}
                onChange={(e) => setInputDob(e.target.value)}
                min={minDob}
                max={maxDob}
                className="w-full rounded-xl px-4 py-3 text-white bg-white/10 border border-white/20 focus:border-amber-400 focus:outline-none text-sm mb-5"
              />

              <button
                onClick={save}
                disabled={!inputDob}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: inputDob
                    ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                    : "rgba(255,255,255,0.1)",
                  color: inputDob ? "#1a0733" : "rgba(255,255,255,0.3)",
                  cursor: inputDob ? "pointer" : "not-allowed",
                }}
              >
                Save Baby Info ✨
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

      {/* ── Age & milestone widget ── */}
      {showWidget && !dismissed && age && (
        <div
          className="fixed bottom-24 left-4 z-[9989] w-[260px] rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0733 0%, #2d0f55 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "opacity 0.4s, transform 0.4s",
            opacity: showWidget ? 1 : 0,
            transform: showWidget ? "translateY(0)" : "translateY(16px)",
          }}
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-2 flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-amber-400 text-[9px] font-bold tracking-[0.2em] uppercase mb-0.5">
                {name ? `${name}'s Milestones` : "Baby's Milestones"}
              </p>
              <p className="text-white font-black text-base leading-snug">
                {age.label}
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/30 hover:text-white/60 transition-colors text-base leading-none mt-0.5 ml-2 flex-shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="px-4 pb-4">
            {isFirstYear && stage ? (
              <>
                {/* Stage badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ background: stage.bg, color: stage.color, border: `1px solid ${stage.color}30` }}
                >
                  <span>{stage.emoji}</span>
                  <span>{stage.range} Stage</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-3">
                  {stage.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-xs leading-snug">
                      <span
                        className="mt-0.5 w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold"
                        style={{ background: stage.bg, color: stage.color }}
                      >
                        {i + 1}
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/posts/babys-first-year?tab=milestones#${stage.sectionId}`}
                  onClick={() => setDismissed(true)}
                  className="block text-center text-xs font-semibold py-2 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: stage.bg, color: stage.color }}
                >
                  View Full Guide →
                </Link>
              </>
            ) : age.ageWeeks >= 52 ? (
              <p className="text-white/50 text-xs mb-3">
                Your baby has completed their first year! 🎉 What an incredible journey.
              </p>
            ) : (
              <p className="text-white/50 text-xs mb-3">
                Date looks like it's in the future — check the date of birth?
              </p>
            )}

            <button
              onClick={() => { setInputDob(dob ?? ""); setInputName(name); setEditing(true); }}
              className="mt-1 text-amber-400/60 hover:text-amber-400 text-xs transition-colors underline underline-offset-2"
            >
              Edit baby info
            </button>
          </div>
        </div>
      )}
    </>
  );
}
