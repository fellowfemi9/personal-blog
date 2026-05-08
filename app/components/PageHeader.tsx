"use client";

import NavDrawer from "./NavDrawer";

type Props = {
  title: string;
  accent?: string; // e.g. "text-rose-400"
};

export default function PageHeader({ title, accent = "text-amber-400" }: Props) {
  return (
    <header
      className="sticky top-0 z-50 h-14 border-b border-white/5"
      style={{ background: "rgba(10,4,20,0.97)", backdropFilter: "blur(16px)" }}
    >
      <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3">
        {/* Left: home + hamburger */}
        <NavDrawer />

        {/* Center: page title */}
        <div className="flex-1 min-w-0 text-center">
          <p className={`text-[9px] font-bold tracking-[0.25em] uppercase ${accent} hidden sm:block leading-none mb-0.5`}>
            Femi9 Power
          </p>
          <p
            className="text-white font-black text-sm leading-tight truncate"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {title}
          </p>
        </div>

        {/* Right: balance spacer — matches NavDrawer width (~112px) */}
        <div className="w-28 flex-shrink-0" />
      </div>
    </header>
  );
}
