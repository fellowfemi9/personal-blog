"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M3 12L12 4l9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    activeColor: "text-amber-400",
    activeDot: "bg-amber-400",
  },
  {
    href: "/posts/hey-pregnant-mama",
    label: "Pregnancy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 13c-3 1-5 3.5-5 6h16c0-2.5-2-5-5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="12" cy="17" rx="3" ry="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    activeColor: "text-rose-400",
    activeDot: "bg-rose-400",
  },
  {
    href: "/stories",
    label: "Stories",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M12 21C12 21 4 16 4 10a8 8 0 0116 0c0 6-8 11-8 11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    activeColor: "text-violet-400",
    activeDot: "bg-violet-400",
  },
  {
    href: "/posts/the-sattvik-way-of-eating",
    label: "Sattvik",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M12 3C9 7 6 10 7 14c1 4 4 6 5 7 1-1 4-3 5-7 1-4-2-7-5-11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    activeColor: "text-emerald-400",
    activeDot: "bg-emerald-400",
  },
  {
    href: "/posts/after-baby",
    label: "Delivery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9.5" cy="11" r="1" fill="currentColor"/>
        <circle cx="14.5" cy="11" r="1" fill="currentColor"/>
        <path d="M9.5 14.5Q12 17 14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M7 7C5 5 3 5 3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 7C19 5 21 5 21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    activeColor: "text-fuchsia-400",
    activeDot: "bg-fuchsia-400",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Spacer — only on mobile/tablet where the nav is shown */}
      <div className="h-20 md:h-0" />

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: "rgba(10, 4, 20, 0.96)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.4)",
        }}
      >
        <div className="max-w-lg mx-auto flex items-stretch">
          {TABS.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all duration-200 relative group"
              >
                {/* Active indicator bar at top */}
                <span
                  className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                    active ? `${tab.activeDot} w-8` : "w-0 bg-transparent"
                  }`}
                />

                {/* Icon */}
                <span
                  className={`transition-all duration-200 ${
                    active
                      ? `${tab.activeColor} scale-110`
                      : "text-white/35 group-hover:text-white/60"
                  }`}
                >
                  {tab.icon}
                </span>

                {/* Label */}
                <span
                  className={`text-[10px] font-semibold tracking-wide transition-all duration-200 ${
                    active
                      ? `${tab.activeColor}`
                      : "text-white/30 group-hover:text-white/55"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
