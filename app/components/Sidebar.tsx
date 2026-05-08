"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MOTHERHOOD = [
  {
    id: "pregnancy",
    label: "Pregnancy",
    emoji: "🤰",
    href: "/posts/hey-pregnant-mama",
    accentColor: "#fb7185",
    iconBg: "rgba(251,113,133,0.15)",
    subsections: [
      { label: "Checklist & Reminders", emoji: "📋", href: "/posts/hey-pregnant-mama?tab=checklist" },
      { label: "Month-by-Month", emoji: "📅", href: "/posts/hey-pregnant-mama?tab=cheatsheet" },
      { label: "Fitness", emoji: "💪", href: "/posts/hey-pregnant-mama?tab=fitness" },
    ],
  },
  {
    id: "after-baby",
    label: "Delivery & Postpartum",
    emoji: "🏥",
    href: "/posts/after-baby",
    accentColor: "#e879f9",
    iconBg: "rgba(232,121,249,0.15)",
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
    accentColor: "#fbbf24",
    iconBg: "rgba(251,191,36,0.15)",
    subsections: [
      { label: "Month by Month", emoji: "📅", href: "/posts/babys-first-year?tab=milestones" },
      { label: "Feeding Guide", emoji: "🍼", href: "/posts/babys-first-year?tab=feeding" },
      { label: "Sleep Guide", emoji: "😴", href: "/posts/babys-first-year?tab=sleep" },
      { label: "Health & Safety", emoji: "🛡️", href: "/posts/babys-first-year?tab=safety" },
      { label: "Parenting Wellbeing", emoji: "💛", href: "/posts/babys-first-year?tab=wellbeing" },
    ],
  },
  {
    id: "travel",
    label: "Traveling with a Newborn",
    emoji: "✈️",
    href: "/posts/traveling-with-a-newborn",
    accentColor: "#38bdf8",
    iconBg: "rgba(56,189,248,0.15)",
    subsections: [
      { label: "Car Ride Checklist", emoji: "🚗", href: "/posts/traveling-with-a-newborn#car" },
      { label: "Flight Checklist", emoji: "✈️", href: "/posts/traveling-with-a-newborn#flight" },
      { label: "Baby Essentials", emoji: "👜", href: "/posts/traveling-with-a-newborn#baby" },
      { label: "Safety Warnings", emoji: "⚠️", href: "/posts/traveling-with-a-newborn#warnings" },
    ],
  },
];

const SATTVIK = {
  id: "sattvik",
  label: "Sattvik Way of Eating",
  emoji: "🌿",
  href: "/posts/the-sattvik-way-of-eating",
  accentColor: "#34d399",
  iconBg: "rgba(52,211,153,0.15)",
  subsections: [
    { label: "Nutrients & Power Foods", emoji: "🥗", href: "/posts/the-sattvik-way-of-eating?tab=nutrients" },
    { label: "Lifestyle Tips & Rules", emoji: "✨", href: "/posts/the-sattvik-way-of-eating?tab=tips" },
  ],
};

function NavItem({
  item,
}: {
  item: typeof MOTHERHOOD[0] | typeof SATTVIK;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);
  const [open, setOpen] = useState(isActive);

  return (
    <div>
      <div className="flex items-center rounded-lg transition-colors hover:bg-white/5">
        <Link
          href={item.href}
          className="flex items-center gap-2.5 flex-1 min-w-0 px-2 py-2"
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{ background: item.iconBg }}
          >
            {item.emoji}
          </span>
          <span
            className="text-xs font-semibold leading-tight truncate transition-colors"
            style={{ color: isActive ? item.accentColor : "rgba(255,255,255,0.65)" }}
          >
            {item.label}
          </span>
        </Link>

        {item.subsections.length > 0 && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 text-white/25 hover:text-white/60 transition-colors flex-shrink-0"
            aria-label={open ? "Collapse" : "Expand"}
          >
            <svg
              viewBox="0 0 10 6"
              fill="none"
              className="w-2.5 h-2.5 transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {open && item.subsections.length > 0 && (
        <div className="pl-9 pr-1 pb-1 space-y-0.5">
          {item.subsections.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors hover:bg-white/5 group"
            >
              <span className="text-xs w-4 text-center flex-shrink-0">{sub.emoji}</span>
              <span className="text-white/45 text-[11px] group-hover:text-white/75 transition-colors leading-tight">
                {sub.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StoryNavLink({ href, label, emoji, accentColor }: { href: string; label: string; emoji: string; accentColor: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors hover:bg-white/5"
    >
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center text-base flex-shrink-0"
        style={{ background: "rgba(167,139,250,0.12)" }}
      >
        {emoji}
      </span>
      <span
        className="text-xs font-semibold leading-tight truncate transition-colors"
        style={{ color: isActive ? accentColor : "rgba(255,255,255,0.65)" }}
      >
        {label}
      </span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 flex-col z-30 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d0520 0%, #130828 60%, #0d0520 100%)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Logo */}
      <div className="px-4 py-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Link href="/" className="group block">
          <p className="text-amber-400 text-[9px] font-bold tracking-[0.3em] uppercase mb-0.5">
            ✦ Femi9 Power
          </p>
          <p
            className="text-white font-black text-base leading-tight group-hover:text-amber-300 transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Home
          </p>
        </Link>
      </div>

      {/* Nav — scrollable */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">

        {/* Motherhood group */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 px-2 mb-2">
            Motherhood
          </p>
          <div className="space-y-0.5">
            {MOTHERHOOD.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mx-2" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Sattvik section */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 px-2 mb-2">
            Wellness
          </p>
          <NavItem item={SATTVIK} />
        </div>

        {/* Divider */}
        <div className="h-px mx-2" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Stories section */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 px-2 mb-2">
            Stories
          </p>
          <div className="space-y-0.5">
            <StoryNavLink href="/stories" label="Browse Stories" emoji="📖" accentColor="#a78bfa" />
            <StoryNavLink href="/stories/share" label="Share Your Story" emoji="✍️" accentColor="#c084fc" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 flex-shrink-0 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <Link
          href="/contact"
          className="flex items-center gap-2 text-amber-400/60 hover:text-amber-400 text-xs font-medium transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden>
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact the Author
        </Link>
        <p className="text-white/15 text-[10px]">© {new Date().getFullYear()} Janane Suresh</p>
      </div>
    </aside>
  );
}
