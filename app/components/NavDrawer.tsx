"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Motherhood group (shown first in drawer)
const MOTHERHOOD_NAV = [
  {
    id: "pregnancy",
    label: "Pregnancy",
    emoji: "🤰",
    href: "/posts/hey-pregnant-mama",
    iconBg: "rgba(251,113,133,0.18)",
    accentColor: "#fb7185",
    subsections: [
      { label: "Checklist & Reminders", emoji: "📋", href: "/posts/hey-pregnant-mama?tab=checklist" },
      { label: "Month-by-Month Cheatsheet", emoji: "📅", href: "/posts/hey-pregnant-mama?tab=cheatsheet" },
      { label: "Fitness during Pregnancy", emoji: "💪", href: "/posts/hey-pregnant-mama?tab=fitness" },
    ],
  },
  {
    id: "after-baby",
    label: "Delivery & Postpartum",
    emoji: "🏥",
    href: "/posts/after-baby",
    iconBg: "rgba(232,121,249,0.18)",
    accentColor: "#e879f9",
    subsections: [
      { label: "Hospital Stay", emoji: "🏥", href: "/posts/after-baby?tab=hospital" },
      { label: "Postpartum Recovery", emoji: "🌸", href: "/posts/after-baby?tab=after-baby" },
      { label: "Galactagogue Pantry", emoji: "🌿", href: "/posts/after-baby?tab=pantry" },
    ],
  },
  {
    id: "first-year",
    label: "Baby's First Year",
    emoji: "👶",
    href: "/posts/babys-first-year",
    iconBg: "rgba(251,191,36,0.18)",
    accentColor: "#fbbf24",
    subsections: [
      { label: "Month by Month", emoji: "📅", href: "/posts/babys-first-year?tab=milestones" },
      { label: "Feeding Guide",  emoji: "🍼", href: "/posts/babys-first-year?tab=feeding" },
      { label: "Sleep Guide",    emoji: "😴", href: "/posts/babys-first-year?tab=sleep" },
      { label: "Health & Safety",emoji: "🛡️", href: "/posts/babys-first-year?tab=safety" },
      { label: "Parenting Wellbeing", emoji: "💛", href: "/posts/babys-first-year?tab=wellbeing" },
    ],
  },
  {
    id: "travel",
    label: "Traveling with a Newborn",
    emoji: "✈️",
    href: "/posts/traveling-with-a-newborn",
    iconBg: "rgba(56,189,248,0.18)",
    accentColor: "#38bdf8",
    subsections: [
      { label: "Car Ride Checklist", emoji: "🚗", href: "/posts/traveling-with-a-newborn#car" },
      { label: "Flight Checklist", emoji: "✈️", href: "/posts/traveling-with-a-newborn#flight" },
      { label: "Baby Essentials", emoji: "👜", href: "/posts/traveling-with-a-newborn#baby" },
      { label: "Safety Warnings", emoji: "⚠️", href: "/posts/traveling-with-a-newborn#warnings" },
    ],
  },
];

// Separate Sattvik section
const SATTVIK_NAV = [
  {
    id: "sattvik",
    label: "Sattvik Way of Eating",
    emoji: "🌿",
    href: "/posts/the-sattvik-way-of-eating",
    iconBg: "rgba(52,211,153,0.18)",
    accentColor: "#34d399",
    subsections: [
      { label: "Nutrients & Power Foods", emoji: "🥗", href: "/posts/the-sattvik-way-of-eating?tab=nutrients" },
      { label: "Lifestyle Tips & Rules", emoji: "✨", href: "/posts/the-sattvik-way-of-eating?tab=tips" },
    ],
  },
];

const NAV = [...MOTHERHOOD_NAV, ...SATTVIK_NAV];

type Props = {
  variant?: "dark" | "light";
};

export default function NavDrawer({ variant = "dark" }: Props) {
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>("pregnancy");
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const btnClass =
    variant === "light"
      ? "bg-white/20 hover:bg-white/30 text-white border border-white/10"
      : "bg-white/10 hover:bg-white/15 text-white border border-white/10";

  return (
    <>
      {/* ── Trigger row: Home link + Hamburger ── */}
      <div className="flex items-center gap-1.5">

        {/* 🏠 Home link */}
        <Link
          href="/"
          aria-label="Go to home"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors font-semibold text-sm ${btnClass}`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden>
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-4h2v4h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z" />
          </svg>
          <span className="hidden sm:block">Home</span>
        </Link>

        {/* ☰ Hamburger — opens drawer (hidden on desktop where sidebar is shown) */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors md:hidden ${btnClass}`}
        >
          <svg viewBox="0 0 18 14" fill="none" className="w-4 h-4" aria-hidden>
            <rect y="0"  width="18" height="2" rx="1" fill="currentColor"/>
            <rect y="6"  width="12" height="2" rx="1" fill="currentColor"/>
            <rect y="12" width="18" height="2" rx="1" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(3px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={() => setOpen(false)}
      />

      {/* ── Drawer ── */}
      <div
        className="fixed top-0 left-0 h-[100dvh] z-[9999] flex flex-col overflow-hidden transition-transform duration-300 ease-out"
        style={{
          width: "min(300px, 88vw)",
          background: "linear-gradient(160deg, #0d0520 0%, #160830 55%, #0d0520 100%)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          boxShadow: open ? "6px 0 48px rgba(0,0,0,0.6)" : "none",
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link href="/" onClick={() => setOpen(false)} className="group">
            <p className="text-amber-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-0.5">
              ✦ Femi9 Power
            </p>
            <p
              className="text-white font-black text-lg leading-none group-hover:text-amber-300 transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Home
            </p>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Nav sections — scrollable */}
        <div className="flex-1 overflow-y-auto py-3 px-2">

          {/* Motherhood group label */}
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 px-3 mb-1 mt-1">
            Motherhood
          </p>

          {MOTHERHOOD_NAV.map((section) => {
            const isExpanded = expandedId === section.id;
            return (
              <div key={section.id} className="mb-1">
                <div className="flex items-center rounded-xl transition-colors hover:bg-white/5">
                  <Link
                    href={section.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 flex-1 min-w-0 px-3 py-3"
                  >
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: section.iconBg }}
                    >
                      {section.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm leading-tight">{section.label}</p>
                      <p className="text-white/35 text-xs mt-0.5">{section.subsections.length} sections</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : section.id)}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                    className="p-3 text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
                  >
                    <svg viewBox="0 0 10 6" fill="none" className="w-3 h-3 transition-transform duration-200"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }} aria-hidden>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="overflow-hidden transition-all duration-200"
                  style={{ maxHeight: isExpanded ? "300px" : "0px", opacity: isExpanded ? 1 : 0 }}>
                  <div className="pl-12 pr-3 pb-2 space-y-0.5">
                    {section.subsections.map((sub) => (
                      <Link key={sub.href} href={sub.href} onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5 group">
                        <span className="text-sm w-5 text-center flex-shrink-0">{sub.emoji}</span>
                        <span className="text-white/60 text-sm group-hover:text-white transition-colors leading-tight">{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mx-3 h-px bg-white/5 mt-1" />
              </div>
            );
          })}

          {/* Sattvik section label */}
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 px-3 mb-1 mt-3">
            Wellness
          </p>

          {SATTVIK_NAV.map((section) => {
            const isExpanded = expandedId === section.id;
            return (
              <div key={section.id} className="mb-1">
                <div className="flex items-center rounded-xl transition-colors hover:bg-white/5">
                  <Link
                    href={section.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 flex-1 min-w-0 px-3 py-3"
                  >
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: section.iconBg }}
                    >
                      {section.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm leading-tight">{section.label}</p>
                      <p className="text-white/35 text-xs mt-0.5">{section.subsections.length} sections</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : section.id)}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                    className="p-3 text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
                  >
                    <svg viewBox="0 0 10 6" fill="none" className="w-3 h-3 transition-transform duration-200"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }} aria-hidden>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="overflow-hidden transition-all duration-200"
                  style={{ maxHeight: isExpanded ? "200px" : "0px", opacity: isExpanded ? 1 : 0 }}>
                  <div className="pl-12 pr-3 pb-2 space-y-0.5">
                    {section.subsections.map((sub) => (
                      <Link key={sub.href} href={sub.href} onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5 group">
                        <span className="text-sm w-5 text-center flex-shrink-0">{sub.emoji}</span>
                        <span className="text-white/60 text-sm group-hover:text-white transition-colors leading-tight">{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mx-3 h-px bg-white/5 mt-1" />
              </div>
            );
          })}
        </div>

        {/* Footer — home + contact links */}
        <div
          className="px-5 py-4 flex-shrink-0 space-y-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-white/35 hover:text-white text-sm transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-4h2v4h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z"/>
            </svg>
            Back to Home
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-amber-400/60 hover:text-amber-400 text-sm transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            Contact the Author
          </Link>
        </div>
      </div>
    </>
  );
}
