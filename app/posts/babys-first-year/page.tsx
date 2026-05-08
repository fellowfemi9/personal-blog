"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/app/components/PageHeader";
import BabyAgePopup from "@/app/components/BabyAgePopup";

const TABS = [
  { id: "milestones", label: "Month by Month", emoji: "📅" },
  { id: "feeding",    label: "Feeding",         emoji: "🍼" },
  { id: "sleep",      label: "Sleep",            emoji: "😴" },
  { id: "safety",     label: "Health & Safety",  emoji: "🛡️" },
  { id: "wellbeing",  label: "Wellbeing",         emoji: "💛" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const VALID_TABS: TabId[] = ["milestones", "feeding", "sleep", "safety", "wellbeing"];

const STORAGE_KEY = "babys-first-year-checks";

const TAB_STYLES: Record<TabId, { active: string; inactive: string }> = {
  milestones: { active: "bg-amber-500 text-white shadow-md",    inactive: "text-amber-600 hover:bg-amber-50" },
  feeding:    { active: "bg-orange-500 text-white shadow-md",   inactive: "text-orange-600 hover:bg-orange-50" },
  sleep:      { active: "bg-indigo-500 text-white shadow-md",   inactive: "text-indigo-600 hover:bg-indigo-50" },
  safety:     { active: "bg-red-500 text-white shadow-md",      inactive: "text-red-600 hover:bg-red-50" },
  wellbeing:  { active: "bg-yellow-500 text-white shadow-md",   inactive: "text-yellow-600 hover:bg-yellow-50" },
};

// ── Milestones data (cards, not checkboxes) ─────────────────────────────────
const MONTHS = [
  {
    id: "newborn",
    title: "Newborn",
    range: "0–1 Month",
    emoji: "👶",
    gradient: "from-rose-50 to-pink-100",
    border: "border-rose-200",
    accent: "text-rose-700",
    badge: "bg-rose-100 text-rose-700 border border-rose-200",
    summary: "Mostly sleeping, feeding, crying, and diaper changes. Baby needs food, warmth, sleep, comfort, and physical closeness.",
    highlights: [
      "Irregular sleep, startle reflexes, and cluster feeding are all normal",
      "Feed on demand — breast or formula, 8–12 times per day",
      "Respond to crying promptly — you cannot spoil a newborn",
      "Watch for jaundice (yellowing skin/eyes) — call doctor if concerned",
      "Dehydration sign: fewer than 6 wet diapers per day",
      "Fever in babies under 3 months — call the doctor immediately",
    ],
  },
  {
    id: "1-3mo",
    title: "1–3 Months",
    range: "1–3 Months",
    emoji: "😊",
    gradient: "from-orange-50 to-amber-100",
    border: "border-orange-200",
    accent: "text-orange-700",
    badge: "bg-orange-100 text-orange-700 border border-orange-200",
    summary: "Baby becomes more alert and responsive. Social smiling appears. Head control improves gradually.",
    highlights: [
      "Do tummy time daily — start with 2–3 minutes and build up",
      "Talk, sing, and narrate your day to your baby",
      "Establish a simple calming routine before sleep",
      "Social smiling usually appears — make eye contact and smile back",
      "Sleep may begin consolidating into longer stretches",
      "Begin recognising different cry types (hunger, tired, discomfort)",
    ],
  },
  {
    id: "4-6mo",
    title: "4–6 Months",
    range: "4–6 Months",
    emoji: "🎉",
    gradient: "from-yellow-50 to-lime-100",
    border: "border-yellow-200",
    accent: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    summary: "Major developmental leap: rolling, reaching, laughing, recognising caregivers. Possible sleep regression and teething.",
    highlights: [
      "Rolling, reaching, and laughing emerge",
      "Some babies start solids around 6 months — watch for readiness signs",
      "Readiness: sitting with support, interest in food, loss of tongue-thrust reflex",
      "Sleep regression can happen — it is temporary",
      "Teething may begin: drooling, chewing, fussiness",
      "Focus on sensory play, safe exploration, and reading aloud",
    ],
  },
  {
    id: "6-9mo",
    title: "6–9 Months",
    range: "6–9 Months",
    emoji: "🧩",
    gradient: "from-emerald-50 to-teal-100",
    border: "border-emerald-200",
    accent: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    summary: "Mobility increases: sitting, crawling, pulling up. Separation anxiety appears. Safety becomes critical.",
    highlights: [
      "Sitting independently, crawling, and pulling up develop",
      "Separation anxiety commonly appears — be reassuring, it is normal",
      "Babies become more curious and vocal",
      "Babyproof the home: outlet covers, cabinet locks, secure furniture",
      "Clear choking hazards from floor level",
      "Expand solid food variety and textures; begin a water cup at meals",
    ],
  },
  {
    id: "9-12mo",
    title: "9–12 Months",
    range: "9–12 Months",
    emoji: "🎂",
    gradient: "from-violet-50 to-purple-100",
    border: "border-violet-200",
    accent: "text-violet-700",
    badge: "bg-violet-100 text-violet-700 border border-violet-200",
    summary: "First words, standing, cruising, possible first steps. Strong personality emerges. Baby imitates everything.",
    highlights: [
      "First words, standing, cruising, and sometimes first steps",
      "Babies imitate adults constantly — model what you want them to learn",
      "Personality and communication grow stronger",
      "More finger foods; begin introducing an open or sippy cup",
      "Reduce reliance on bottles gradually over time",
      "Schedule 12-month well-child visit",
    ],
  },
];

// ── Checklist sections for other tabs ───────────────────────────────────────
const SECTIONS: { tab: Exclude<TabId, "milestones">; id: string; title: string; emoji: string; items: string[] }[] = [
  // Feeding
  {
    tab: "feeding", id: "feeding-basics", title: "Breast & Formula Feeding", emoji: "🍼",
    items: [
      "Both breastfeeding and formula feeding are valid — focus on feeding the baby",
      "Learn baby's hunger cues: rooting, sucking motions, hands to mouth",
      "Learn fullness cues: turning away, closing mouth, relaxed hands",
      "Feed the baby, not the clock — follow hunger cues, not a schedule",
      "For breastfeeding: seek a lactation consultant early if needed",
      "For formula: follow preparation instructions precisely",
      "Contact a doctor if baby feeds poorly or isn't gaining weight",
    ],
  },
  {
    tab: "feeding", id: "solids", title: "Introducing Solids (6+ Months)", emoji: "🥣",
    items: [
      "Wait for readiness signs — typically around 6 months",
      "Start with single-ingredient purées or soft mashed foods",
      "Introduce new foods one at a time, 3–5 days apart",
      "Never add honey to food or drinks before age 1 — risk of botulism",
      "Introduce common allergens (peanut, egg, dairy) early and one at a time",
      "Offer water in a cup with solids; breast milk or formula stays primary until age 1",
      "Gagging is normal — choking is an emergency. Know the difference",
    ],
  },
  // Sleep
  {
    tab: "sleep", id: "sleep-reality", title: "Newborn Sleep Reality", emoji: "🌙",
    items: [
      "Newborn sleep is biologically irregular — this is normal, not a problem to fix",
      "Expect frequent waking every 2–3 hours in the early weeks",
      "'Sleeping through the night' varies widely — many babies don't until 6+ months",
      "Cluster feeding in evenings is common and temporary",
      "Rest whenever you can — sleep deprivation affects everything",
    ],
  },
  {
    tab: "sleep", id: "safe-sleep", title: "Safe Sleep Practices", emoji: "🛏️",
    items: [
      "Always place baby on their back to sleep — every sleep, every time",
      "Use a firm, flat sleep surface: crib, bassinet, or play yard",
      "No loose blankets, pillows, bumpers, or stuffed animals in the sleep space",
      "Keep the sleep area smoke-free",
      "Room-share without bed-sharing for at least the first 6 months",
      "Offer a pacifier at sleep time (after breastfeeding is established) — may reduce SIDS risk",
      "Avoid extended sleeping in car seats, swings, or bouncers",
    ],
  },
  {
    tab: "sleep", id: "sleep-routines", title: "Building Sleep Routines", emoji: "⭐",
    items: [
      "Establish a simple, consistent bedtime routine from around 6–8 weeks",
      "A routine might include: bath → feed → song → sleep",
      "Watch for sleepy cues: eye rubbing, yawning, fussiness",
      "Avoid overtiredness — it makes settling harder",
      "Gradually encourage self-settling as baby develops — there is no single right method",
    ],
  },
  // Safety
  {
    tab: "safety", id: "preventive", title: "Preventive Health", emoji: "💉",
    items: [
      "Keep up with the recommended vaccination schedule — discuss with your paediatrician",
      "Attend all well-child visits: newborn, 2 wks, 1 mo, 2, 4, 6, 9, 12 months",
      "Monitor developmental milestones — raise concerns early",
      "Know your paediatrician's after-hours contact and when to go to the ER",
    ],
  },
  {
    tab: "safety", id: "emergency", title: "Emergency Warning Signs — Call Doctor Immediately", emoji: "🚨",
    items: [
      "Fever in any baby under 3 months (≥ 100.4°F / 38°C)",
      "Difficulty breathing or unusual breathing sounds",
      "Extreme lethargy or difficulty waking",
      "Refusal to eat across multiple feedings",
      "Fewer than 6 wet diapers per day (possible dehydration)",
      "Blood in stool or vomit",
      "Inconsolable crying lasting more than 2–3 hours",
    ],
  },
  {
    tab: "safety", id: "home-safety", title: "Home Safety Checklist", emoji: "🏠",
    items: [
      "Install rear-facing car seat correctly before baby arrives — get it inspected",
      "Babyproof before baby becomes mobile (by 6 months)",
      "Secure heavy furniture (bookshelves, dressers) to walls",
      "Keep blind cords, plastic bags, and small objects out of reach",
      "Store medications and cleaning products locked away",
      "Install baby gates at the top and bottom of stairs",
      "Never leave baby unattended near water — even 1–2 inches is dangerous",
      "Learn infant CPR basics — take a class",
    ],
  },
  // Wellbeing
  {
    tab: "wellbeing", id: "emotional", title: "Emotional Development", emoji: "💛",
    items: [
      "Respond to cries consistently — this builds trust, not dependence",
      "Make regular eye contact, smile, and talk directly to baby",
      "Physical affection (holding, skin-to-skin, touch) supports brain development",
      "Crying is communication, not manipulation — try to understand, not just stop it",
      "Narrate your actions and emotions: 'I'm picking you up — I know you're hungry'",
      "Affection, eye contact, and conversation are the most powerful developmental tools",
    ],
  },
  {
    tab: "wellbeing", id: "parenting-reality", title: "Parenting Reality Check", emoji: "❤️",
    items: [
      "Exhaustion in the first year is universal — ask for help without guilt",
      "There is no perfect parent — 'good enough' caregiving is genuinely enough",
      "Postpartum mood changes are very common — seek support if they persist beyond 2 weeks",
      "Relationship stress after baby is extremely common — you are not alone",
      "Accept help from family, friends, or community whenever offered",
      "Lower standards for everything non-essential during this period",
      "Take care of your own mental and physical health — you cannot pour from an empty cup",
    ],
  },
];

function TabSync({ onTab }: { onTab: (t: TabId) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    const t = params.get("tab") as TabId;
    if (t && VALID_TABS.includes(t)) onTab(t);
  }, [params, onTab]);
  return null;
}

export default function BabysFirstYear() {
  const [activeTab, setActiveTab] = useState<TabId>("milestones");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  function toggle(key: string) {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const tabSections = SECTIONS.filter((s) => s.tab === activeTab);

  const tabCheckedCount = (tab: Exclude<TabId, "milestones">) => {
    const secs = SECTIONS.filter((s) => s.tab === tab);
    return secs.reduce((a, s) => a + s.items.filter((_, i) => checked[`${s.id}-${i}`]).length, 0);
  };
  const tabTotalCount = (tab: Exclude<TabId, "milestones">) =>
    SECTIONS.filter((s) => s.tab === tab).reduce((a, s) => a + s.items.length, 0);

  const milestoneTotal   = MONTHS.reduce((a, m) => a + m.highlights.length, 0);
  const milestoneDone    = MONTHS.reduce((a, m) => a + m.highlights.filter((_, i) => checked[`milestone-${m.id}-${i}`]).length, 0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <PageHeader title="Baby's First Year" accent="text-amber-400" />
      <Suspense fallback={null}>
        <TabSync onTab={setActiveTab} />
      </Suspense>
      <BabyAgePopup />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 text-white px-4 py-10 sm:py-14 text-center">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-10 w-80 h-80 bg-white/5 rounded-full" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow relative z-10">
          Baby's First Year 🍼
        </h1>
        <p className="max-w-xl mx-auto text-amber-100 text-base leading-relaxed relative z-10">
          Month-by-month milestones, feeding guidance, sleep practices, safety essentials, and parenting wellbeing — all in one place.
        </p>
        <p className="text-amber-200/70 text-xs mt-2 relative z-10 italic">
          Babies develop at different rates. Milestones are ranges, not strict deadlines.
        </p>
      </div>

      {/* Mobile tab strip */}
      <div className="md:hidden overflow-x-auto flex gap-2 px-4 py-3 bg-white/90 backdrop-blur border-b border-amber-100 sticky top-14 z-40">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
              activeTab === tab.id
                ? TAB_STYLES[tab.id].active + " border-transparent"
                : TAB_STYLES[tab.id].inactive + " border-transparent bg-white"
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 md:flex md:gap-8 md:items-start">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0 sticky top-20">
          <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-amber-100">
              <p className="text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase">Sections</p>
            </div>
            <nav className="py-1">
              {TABS.map((tab, i) => {
                const isActive = activeTab === tab.id;
                const isMilestones = tab.id === "milestones";
                const total = isMilestones ? milestoneTotal : tabTotalCount(tab.id as Exclude<TabId, "milestones">);
                const done  = isMilestones ? milestoneDone  : tabCheckedCount(tab.id as Exclude<TabId, "milestones">);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors text-sm ${
                      isActive
                        ? "bg-amber-50 border-l-4 border-amber-500 text-amber-900 font-semibold"
                        : "text-gray-500 hover:bg-gray-50 border-l-4 border-transparent"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate leading-tight">{tab.label}</p>
                      {total > 0 && (
                        <div className="mt-1 w-full bg-gray-100 rounded-full h-1">
                          <div
                            className="bg-amber-400 h-1 rounded-full transition-all"
                            style={{ width: `${(done / total) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">

          {/* ── MILESTONES TAB ── */}
          {activeTab === "milestones" && (
            <div className="space-y-5">
              {/* Progress banner */}
              {loaded && milestoneTotal > 0 && (
                <div className="bg-white rounded-2xl border border-amber-100 px-5 py-4 flex items-center gap-4 shadow-sm">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1.5">{milestoneDone} of {milestoneTotal} milestones checked</p>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(milestoneDone / milestoneTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-2xl">{milestoneDone === milestoneTotal ? "🎉" : "📅"}</span>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Remember:</strong> Babies develop at different rates. These milestones are ranges, not strict deadlines. Parenting is largely about <em>responding, observing, and adapting</em> — not doing everything perfectly.
                </p>
              </div>

              {MONTHS.map((month) => (
                <div
                  key={month.id}
                  id={month.id}
                  className={`rounded-2xl border ${month.border} overflow-hidden shadow-sm scroll-mt-20`}
                >
                  {/* Month header */}
                  <div className={`bg-gradient-to-r ${month.gradient} px-5 py-4 flex items-center gap-3`}>
                    <span className="text-3xl">{month.emoji}</span>
                    <div>
                      <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-1 ${month.badge}`}>
                        {month.range}
                      </span>
                      <h3
                        className={`font-black text-lg leading-tight ${month.accent}`}
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {month.title}
                      </h3>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white px-5 py-3 border-b border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed italic">{month.summary}</p>
                  </div>

                  {/* Highlights — checkboxes */}
                  <ul className="bg-white divide-y divide-gray-50">
                    {month.highlights.map((h, i) => {
                      const key = `milestone-${month.id}-${i}`;
                      const done = !!checked[key];
                      return (
                        <li key={key}>
                          <label className="flex items-start gap-3 px-5 py-3 cursor-pointer hover:bg-amber-50/40 transition-colors">
                            <span className="mt-0.5 flex-shrink-0">
                              {done ? (
                                <svg viewBox="0 0 20 20" className="w-5 h-5 text-amber-500" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                              ) : (
                                <span className="w-5 h-5 rounded-full border-2 border-amber-200 inline-block" />
                              )}
                            </span>
                            <input type="checkbox" checked={done} onChange={() => toggle(key)} className="sr-only" />
                            <span className={`text-sm leading-relaxed ${done ? "line-through text-gray-400" : "text-gray-700"}`}>
                              {h}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* ── CHECKLIST TABS (feeding / sleep / safety / wellbeing) ── */}
          {activeTab !== "milestones" && (
            <div className="space-y-5">
              {/* Progress banner */}
              {loaded && (() => {
                const total = tabTotalCount(activeTab as Exclude<TabId, "milestones">);
                const done  = tabCheckedCount(activeTab as Exclude<TabId, "milestones">);
                if (total === 0) return null;
                return (
                  <div className="bg-white rounded-2xl border border-amber-100 px-5 py-4 flex items-center gap-4 shadow-sm">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1.5">{done} of {total} items checked</p>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(done / total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-2xl">{done === total ? "✅" : "📋"}</span>
                  </div>
                );
              })()}

              {tabSections.map((section) => (
                <div key={section.id} className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-amber-50 flex items-center gap-3">
                    <span className="text-2xl">{section.emoji}</span>
                    <h3
                      className="font-black text-gray-900 text-base"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {section.title}
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-50">
                    {section.items.map((item, i) => {
                      const key = `${section.id}-${i}`;
                      const done = !!checked[key];
                      return (
                        <li key={key}>
                          <label className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-amber-50/40 transition-colors">
                            <span className="mt-0.5 flex-shrink-0">
                              {done ? (
                                <svg viewBox="0 0 20 20" className="w-5 h-5 text-amber-500" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                              ) : (
                                <span className="w-5 h-5 rounded-full border-2 border-amber-200 inline-block" />
                              )}
                            </span>
                            <input type="checkbox" checked={done} onChange={() => toggle(key)} className="sr-only" />
                            <span className={`text-sm leading-relaxed ${done ? "line-through text-gray-400" : "text-gray-700"}`}>
                              {item}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Core themes reminder */}
          <div className="mt-8 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-2xl px-5 py-5">
            <p className="text-amber-800 font-bold text-sm mb-2">💡 Core Themes</p>
            <ul className="space-y-1.5 text-amber-700 text-sm">
              <li>• Consistency and routines help, but flexibility matters more.</li>
              <li>• The first year is intense physically and emotionally — for both baby and parents.</li>
              <li>• Responsive caregiving builds trust and secure attachment.</li>
              <li>• Parenting is about responding, observing, and adapting — not perfection.</li>
            </ul>
          </div>

          {/* References */}
          <div className="mt-6 bg-white rounded-2xl border border-amber-100 shadow-sm px-5 py-5">
            <p className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-3">References</p>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {[
                { label: "CDC — Learn the Signs. Act Early.", href: "https://www.cdc.gov/ncbddd/actearly/index.html" },
                { label: "AAP — HealthyChildren.org", href: "https://www.healthychildren.org" },
                { label: "Safe to Sleep — Safe Sleep for Babies", href: "https://safetosleep.nichd.nih.gov" },
                { label: "WHO — Infant & Young Child Feeding", href: "https://www.who.int/health-topics/infant-and-young-child-feeding" },
                { label: "La Leche League International", href: "https://www.llli.org" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-800 underline underline-offset-2 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
