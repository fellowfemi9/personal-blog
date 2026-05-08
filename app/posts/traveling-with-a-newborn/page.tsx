"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import PageHeader from "@/app/components/PageHeader";

const STORAGE_KEY = "traveling-newborn-checks";

const CAR_ITEMS = [
  { item: "Window Shades", detail: "Essential for blocking the sun during long stretches of highway driving." },
  { item: "Backseat Mirror", detail: "Allows you to keep an eye on the baby without turning around." },
  { item: "Portable Sound Machine", detail: "Helps maintain a consistent sleep environment despite road noise." },
  { item: "Emergency Kit", detail: "Small bottle of dish soap (for cleaning bottles/parts on the go), extra trash bags for dirty diapers, and a change of clothes for the adults." },
  { item: "Battery-Operated Fan", detail: "Helpful if the car takes a moment to cool down in warmer climates." },
];

const FLIGHT_ITEMS = [
  { item: "Gate-Check Bags", detail: "Protective bags for your stroller and car seat to prevent grease and damage from the cargo hold." },
  { item: "Changing Pad & Extra Wipes", detail: "Airplane bathrooms are cramped — a dedicated, cushioned pad is a lifesaver." },
  { item: "Feedings + 2", detail: "Pack enough formula or breast milk for the trip plus two extra feedings in case of tarmac delays." },
  { item: "Ziploc Bags", detail: "Multiple sizes for containing soiled clothing or leaking bottles." },
  { item: "Nursing Cover or Infinity Scarf", detail: "If you prefer privacy while feeding in tight quarters." },
  { item: "Pacifier Clips", detail: "To prevent pacifiers from falling onto the floor of the plane." },
];

const BABY_ITEMS: { item: string; detail?: string }[] = [
  { item: "Birth certificate", detail: "Keep a digital photo and a physical copy — some airlines require proof of age for lap children." },
  { item: "Breast milk bag with bottles & pump" },
  { item: "Hand sanitizer (alcohol-free)" },
  { item: "Diaper bag" },
  { item: "Insect repellant (baby-safe, DEET-free)" },
  { item: "Sun hat" },
  { item: "Rain cover" },
  { item: "Umbrella" },
  { item: "Change of clothes", detail: "Pack at least 2–3 extra outfits for blowouts and spills." },
  { item: "Blanket" },
  { item: "Towel" },
  { item: "Cash" },
  { item: "Baby travel ear protector", detail: "Helps reduce noise and cabin pressure discomfort on flights." },
  { item: "Travel Bobby pillow" },
  { item: "Suction toys for windows" },
  { item: "Pacifier clips" },
  { item: "Nursing cover" },
  { item: "Car seat gate-check cover for travel" },
  { item: "Collapsible mug" },
  { item: "Travel laundry detergent" },
  { item: "Dish liquid" },
  { item: "Blankets for flight" },
  { item: "Jacket" },
  { item: "Diaper rash cream" },
  { item: "Rubber sheet" },
  { item: "Moisturizer" },
  { item: "Wipes" },
  { item: "Sanitizer" },
  { item: "Diapers" },
  { item: "Medical kit", detail: "Tylenol · Thermometer · Band-Aid · Bulb syringe · Nail cutter · Vitamin drops" },
  { item: "Bottle brush" },
  { item: "Bottles" },
  { item: "Body wash" },
  { item: "Bib" },
  { item: "Socks" },
  { item: "Mittens" },
  { item: "Bath towels" },
  { item: "Onesie / bodysuit" },
  { item: "Baby carrier" },
  { item: "Formula" },
  { item: "Ice pack for bottle" },
];

const WARNINGS = [
  {
    id: "carseat",
    title: "Car Seat Safety & Laws",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    bg: "bg-rose-50", border: "border-rose-200", heading: "text-rose-700", icon_bg: "bg-rose-100 text-rose-600",
    points: [
      { label: "Rear-Facing Only", text: "Infants must be in a rear-facing car seat. Ensure the seat is installed at the correct angle — most have a built-in level indicator." },
      { label: "The Two-Hour Rule", text: "Pediatricians recommend newborns do not stay in a car seat for more than two hours at a time to prevent breathing issues and strain on their developing spines. Plan for frequent breaks." },
      { label: "Chest Clip Position", text: "Always ensure the chest clip is at armpit level — never over the stomach or neck." },
    ],
  },
  {
    id: "tsa",
    title: "TSA & FAA Regulations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: "bg-violet-50", border: "border-violet-200", heading: "text-violet-700", icon_bg: "bg-violet-100 text-violet-600",
    points: [
      { label: "3-1-1 Liquid Exception", text: "Breast milk, formula, and infant juice are allowed in quantities larger than 3.4 oz. Declare them at the security checkpoint — they may be subject to additional screening." },
      { label: "Stroller Gate Check", text: "Most airlines allow you to check one stroller and one car seat at the gate for free — they do not count toward your luggage allowance." },
      { label: "Birth Certificate", text: "While most domestic airlines don't require ID for children under 2, some lap-child registrations require proof of age. Keep a digital photo or physical copy handy." },
    ],
  },
  {
    id: "health",
    title: "Health & Environment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    bg: "bg-emerald-50", border: "border-emerald-200", heading: "text-emerald-700", icon_bg: "bg-emerald-100 text-emerald-600",
    points: [
      { label: "Ear Pressure", text: "Babies cannot intentionally pop their ears. Encourage sucking (bottle, breast, or pacifier) during takeoff and landing to prevent pain from pressure changes." },
      { label: "The Blowout Factor", text: "Changes in cabin pressure can trigger explosive diapers — always pack a full change of clothes for the baby in your carry-on, plus a clean shirt for yourself." },
      { label: "Germ Protection", text: "Wipe down the tray table and armrests with sanitizing wipes. Avoid letting the baby touch the seatback pocket — often the germiest part of the plane." },
    ],
  },
  {
    id: "booking",
    title: "Booking Logistics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    bg: "bg-amber-50", border: "border-amber-200", heading: "text-amber-700", icon_bg: "bg-amber-100 text-amber-600",
    points: [
      { label: "Lap Infant vs. Ticketed Seat", text: "Infants under 2 can fly free as a lap child, but the FAA recommends purchasing a separate seat and using a Car Restraint System (CRS/car seat) for the highest level of safety." },
      { label: "Aisle vs. Window", text: "The window seat offers privacy for feeding and a wall to lean against. The aisle lets you walk a fussy baby or reach the bathroom faster — choose based on your baby's temperament." },
    ],
  },
];

type Checked = Record<string, boolean>;

export default function TravelingWithNewbornPage() {
  const [checked, setChecked] = useState<Checked>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  function toggle(key: string) {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const carDone = CAR_ITEMS.filter((_, i) => checked[`car-${i}`]).length;
  const flightDone = FLIGHT_ITEMS.filter((_, i) => checked[`flight-${i}`]).length;
  const babyDone = BABY_ITEMS.filter((_, i) => checked[`baby-${i}`]).length;
  const totalItems = CAR_ITEMS.length + FLIGHT_ITEMS.length + BABY_ITEMS.length;
  const totalDone = carDone + flightDone + babyDone;
  const overallPct = Math.round((totalDone / totalItems) * 100);

  if (!mounted) return null;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#f7f5f9" }}>
      <PageHeader title="Traveling with a Newborn" accent="text-sky-400" />

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A0414 0%, #1a1060 30%, #2e3a8c 60%, #1a6b8c 85%, #0e7c6b 100%)",
          minHeight: "380px",
        }}
      >
        <div className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-16 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-300 text-xs font-bold tracking-widest uppercase">Power Move Guide</span>
          </div>
          <h1
            className="font-black leading-tight mb-5"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #bfdbfe 50%, #6ee7b7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Traveling with a Newborn
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Traveling with a newborn involves a lot of logistics — but being prepared for both the vehicle and the air can make the experience much smoother. You&apos;ve got this.
          </p>

          {/* Overall progress */}
          <div className="max-w-sm mx-auto bg-white/10 rounded-2xl p-5 border border-white/10">
            <div className="flex justify-between text-sm font-semibold text-white mb-2">
              <span>Packing progress</span>
              <span>{totalDone} / {totalItems}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full h-2.5 transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            {totalDone === totalItems && (
              <p className="text-emerald-400 text-xs font-bold mt-2">All packed — you&apos;re ready to fly! ✈️</p>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #f7f5f9)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 sm:space-y-14">

        {/* ── MASTER PACKING LIST ── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-sky-500 mb-1">The Master Packing List</p>
              <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                What to Pack
              </h2>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #38bdf840, transparent)" }} />
          </div>

          {/* Car + Flight row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            {/* Car Ride */}
            <div id="car" className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-br from-sky-600 to-blue-500 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sky-200 text-xs font-bold tracking-widest uppercase mb-1">Mode of Travel</p>
                  <h3 className="text-white text-lg font-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>For the Car Ride</h3>
                </div>
                <div className="bg-white/15 rounded-xl p-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1m8-11h3l3 5v4h-6V6z" />
                  </svg>
                </div>
              </div>
              <div className="px-1 py-1">
                <div className="flex justify-between text-xs text-sky-600 font-semibold px-5 py-2">
                  <span>{carDone}/{CAR_ITEMS.length} packed</span>
                  <span>{Math.round((carDone / CAR_ITEMS.length) * 100)}%</span>
                </div>
                <div className="mx-5 mb-3 bg-sky-100 rounded-full h-1.5">
                  <div className="bg-sky-500 rounded-full h-1.5 transition-all duration-300" style={{ width: `${Math.round((carDone / CAR_ITEMS.length) * 100)}%` }} />
                </div>
                <ul className="divide-y divide-gray-50">
                  {CAR_ITEMS.map((item, i) => {
                    const key = `car-${i}`;
                    const done = !!checked[key];
                    return (
                      <li key={key}>
                        <label className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-sky-50/50 transition-colors">
                          <input type="checkbox" checked={done} onChange={() => toggle(key)} className="mt-1 w-4 h-4 rounded accent-sky-500 flex-shrink-0 cursor-pointer" />
                          <div>
                            <p className={`text-sm font-bold transition-colors ${done ? "line-through text-gray-300" : "text-gray-800"}`}>{item.item}</p>
                            <p className={`text-xs leading-relaxed mt-0.5 transition-colors ${done ? "text-gray-300" : "text-gray-500"}`}>{item.detail}</p>
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Flight */}
            <div id="flight" className="bg-white rounded-2xl border border-violet-100 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-br from-violet-600 to-fuchsia-500 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-2">
                <div>
                  <p className="text-violet-200 text-xs font-bold tracking-widest uppercase mb-1">Mode of Travel</p>
                  <h3 className="text-white text-lg font-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>For the Flight</h3>
                </div>
                <div className="bg-white/15 rounded-xl p-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
              <div className="px-1 py-1">
                <div className="flex justify-between text-xs text-violet-600 font-semibold px-5 py-2">
                  <span>{flightDone}/{FLIGHT_ITEMS.length} packed</span>
                  <span>{Math.round((flightDone / FLIGHT_ITEMS.length) * 100)}%</span>
                </div>
                <div className="mx-5 mb-3 bg-violet-100 rounded-full h-1.5">
                  <div className="bg-violet-500 rounded-full h-1.5 transition-all duration-300" style={{ width: `${Math.round((flightDone / FLIGHT_ITEMS.length) * 100)}%` }} />
                </div>
                <ul className="divide-y divide-gray-50">
                  {FLIGHT_ITEMS.map((item, i) => {
                    const key = `flight-${i}`;
                    const done = !!checked[key];
                    return (
                      <li key={key}>
                        <label className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-violet-50/50 transition-colors">
                          <input type="checkbox" checked={done} onChange={() => toggle(key)} className="mt-1 w-4 h-4 rounded accent-violet-500 flex-shrink-0 cursor-pointer" />
                          <div>
                            <p className={`text-sm font-bold transition-colors ${done ? "line-through text-gray-300" : "text-gray-800"}`}>{item.item}</p>
                            <p className={`text-xs leading-relaxed mt-0.5 transition-colors ${done ? "text-gray-300" : "text-gray-500"}`}>{item.detail}</p>
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

          </div>

          {/* ── BABY ITEMS — full width ── */}
          <div id="baby" className="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-2">
              <div>
                <p className="text-rose-200 text-xs font-bold tracking-widest uppercase mb-1">Essential Checklist</p>
                <h3 className="text-white text-lg font-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Things to Carry for Baby
                </h3>
              </div>
              <div className="bg-white/15 rounded-xl p-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
                </svg>
              </div>
            </div>

            <div className="px-1 py-1">
              <div className="flex justify-between text-xs text-rose-600 font-semibold px-5 py-2">
                <span>{babyDone}/{BABY_ITEMS.length} packed</span>
                <span>{Math.round((babyDone / BABY_ITEMS.length) * 100)}%</span>
              </div>
              <div className="mx-5 mb-3 bg-rose-100 rounded-full h-1.5">
                <div className="bg-rose-500 rounded-full h-1.5 transition-all duration-300" style={{ width: `${Math.round((babyDone / BABY_ITEMS.length) * 100)}%` }} />
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-gray-50">
                {BABY_ITEMS.map((item, i) => {
                  const key = `baby-${i}`;
                  const done = !!checked[key];
                  return (
                    <li key={key} className="border-b border-gray-50 last:border-b-0 md:odd:border-r md:border-b md:[&:nth-last-child(-n+2)]:border-b-0">
                      <label className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-rose-50/40 transition-colors h-full">
                        <input type="checkbox" checked={done} onChange={() => toggle(key)} className="mt-1 w-4 h-4 rounded accent-rose-500 flex-shrink-0 cursor-pointer" />
                        <div>
                          <p className={`text-sm font-bold transition-colors ${done ? "line-through text-gray-300" : "text-gray-800"}`}>
                            {item.item}
                          </p>
                          {item.detail && (
                            <p className={`text-xs leading-relaxed mt-0.5 transition-colors ${done ? "text-gray-300" : "text-gray-500"}`}>
                              {item.detail}
                            </p>
                          )}
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </section>

        {/* ── WARNINGS ── */}
        <section id="warnings">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-500 mb-1">U.S. Domestic Travel</p>
              <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Essential Warnings
              </h2>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #f4303040, transparent)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WARNINGS.map((w, wi) => (
              <div key={w.id} className={`rounded-2xl border ${w.border} ${w.bg} p-6`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${w.icon_bg}`}>
                    {w.icon}
                  </div>
                  <h3 className={`font-black text-base ${w.heading}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {wi + 1}. {w.title}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {w.points.map((pt) => (
                    <li key={pt.label} className="flex gap-3">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${w.icon_bg.split(" ")[0].replace("100", "400")}`} />
                      <div>
                        <p className={`text-sm font-bold mb-0.5 ${w.heading}`}>{pt.label}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{pt.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── WILDCARD POWER MOVE ── */}
        <section>
          <div
            className="relative rounded-2xl overflow-hidden p-8 text-center"
            style={{ background: "linear-gradient(135deg, #0A0414 0%, #1E0733 40%, #4A1060 100%)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
                Power Move Wildcard
              </span>
              <h3 className="font-black text-2xl text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                The Flight Attendant Trick
              </h3>
              <p className="text-white/65 text-base leading-relaxed max-w-lg mx-auto">
                Pack a small, wrapped treat or a thank-you note for the flight attendants. They are often your best allies when traveling with a newborn — and a little kindness goes a long way when you need a helping hand at 35,000 feet.
              </p>
            </div>
          </div>
        </section>

        {/* ── DISCLAIMER ── */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-800 leading-relaxed">
          <p className="font-semibold mb-1">Disclaimer</p>
          This guide is intended for general informational purposes only and does not constitute medical, legal, or travel advice. This blog should not be treated as a source of truth — always verify current TSA, FAA, and airline-specific policies before travel, as regulations may change. Consult your pediatrician before traveling with a newborn.
          <p className="font-semibold mt-3 mb-1">References</p>
          <ol className="list-decimal list-inside space-y-1">
            <li><a href="https://www.healthline.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">Healthline.com</a></li>
            <li><a href="https://www.tsa.gov/travel/special-procedures" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">TSA — Traveling with Children</a></li>
            <li><a href="https://www.faa.gov/travelers/fly_children" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">FAA — Flying with Children</a></li>
          </ol>
        </div>

        {/* Back link */}
        <div className="text-center pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-violet-500 hover:text-violet-700 font-semibold transition-colors">
            ← Back to all posts
          </Link>
          <p className="text-gray-300 text-xs mt-6">&copy; {new Date().getFullYear()} Janane Suresh. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}
