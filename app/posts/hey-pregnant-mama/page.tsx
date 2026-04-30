"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type RegularSection = {
  kind?: never;
  id: string;
  title: string;
  emoji: string;
  color: keyof typeof COLORS;
  items: string[];
};

type YogaTrimester = {
  id: string;
  title: string;
  intro: string[];
  avoid: string[];
};

type YogaSection = {
  kind: "yoga";
  id: string;
  title: string;
  emoji: string;
  color: keyof typeof COLORS;
  trimesters: YogaTrimester[];
};

type Section = RegularSection | YogaSection;

const TABS = [
  {
    id: "pregnancy",
    label: "Pregnancy",
    emoji: "🤰",
    sectionIds: ["pregnancy", "yoga", "vaccines", "before-baby"],
  },
  {
    id: "hospital",
    label: "Hospital Stay",
    emoji: "🏥",
    sectionIds: ["hospital-mom", "hospital-baby"],
  },
  {
    id: "after-baby",
    label: "After Baby",
    emoji: "👶",
    sectionIds: ["postpartum", "nursing", "baby", "pumping"],
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SECTIONS: Section[] = [
  {
    id: "pregnancy",
    title: "Pregnancy Reminders",
    emoji: "🤰",
    color: "rose",
    items: [
      "Avoid unpasteurized eggs, dairy, and cheese",
      "Skip raw sprouts or undercooked food (well-cooked sprouts are fine)",
      "Avoid ibuprofen or aspirin — follow your doctor's safe medication list",
      "Avoid skincare with retinol, benzoyl peroxide, hydroquinone, or salicylic acid",
      "Avoid rosemary oil — even topical applications",
      "Use mineral sunscreen instead of chemical sunscreen",
      "Avoid laser treatments during pregnancy",
      "Choose products free of parabens, phthalates, and sulfates",
      "Limit prolonged exposure to essential oils",
      "Hold off on raspberry or peppermint herbal tea until late pregnancy (may stimulate labor)",
      "Avoid lead-based paints (water-based paints are safe for artwork)",
      "Consume baked goods with vanilla extract in moderation (small amounts of alcohol)",
      "Use soy-based nail polish remover; formaldehyde-free polish is safe",
      "Avoid pedicure massages in early pregnancy (pressure on ankles can stimulate labor)",
    ],
  },
  {
    kind: "yoga",
    id: "yoga",
    title: "Yoga During Pregnancy",
    emoji: "🧘",
    color: "violet",
    trimesters: [
      {
        id: "yoga-first",
        title: "First Trimester",
        intro: [
          "During the first trimester, you can maintain your usual physical activity as long as you modify appropriately. Focus on building strength and releasing tension, especially in your low back and hips.",
          "For most pregnant individuals, some yoga poses with forward bends should be all right. Avoid bending forward too fast or bending excessively to the point where you do not feel comfortable.",
        ],
        avoid: [
          "Intense backbends, twists, and excessive forward bends",
          "Strong or forceful abdominal contractions",
          "Inversions (unless you're very experienced)",
          "Jumping, hopping, or bouncing",
          "Hot yoga",
        ],
      },
      {
        id: "yoga-second",
        title: "Second Trimester",
        intro: [
          "During the second trimester, your body starts to produce higher levels of the hormone relaxin. It relaxes your tendons, muscles, and ligaments to prepare your body for birth.",
          "Since this may cause you to become more flexible, be careful not to overstretch. To prevent discomfort and injury, don't go all the way to your edge.",
        ],
        avoid: [
          "Intense backbends, twists, and excessive forward bends",
          "Strong or forceful abdominal contractions",
          "Inversions (unless you're very experienced)",
          "Jumping, hopping, or bouncing",
          "Hot yoga",
          "Lying on your back or your right side",
        ],
      },
      {
        id: "yoga-third",
        title: "Third Trimester",
        intro: [
          "Because your baby is now taking up more space, you may have more difficulty breathing and moving with ease. Take it easy, move gently, and rest as much as you like.",
        ],
        avoid: [
          "Intense backbends, twists, and excessive forward bends",
          "Strong or forceful abdominal contractions",
          "Inversions (unless you're very experienced)",
          "Jumping, hopping, or bouncing",
          "Hot yoga",
          "Lying on your back or your right side",
          "Arm balances",
          "Squats if you're prone to prolapse",
        ],
      },
    ],
  },
  {
    id: "vaccines",
    title: "Vaccines During Pregnancy",
    emoji: "💉",
    color: "violet",
    items: [
      "Tdap (Tetanus, Diphtheria, Pertussis) — recommended between 27–36 weeks of every pregnancy; protects newborn from whooping cough before they can be vaccinated",
      "Flu Shot — recommended during any trimester; flu can be more severe during pregnancy and the antibodies pass to your baby",
      "COVID-19 Vaccine — recommended during pregnancy; helps protect you from severe illness and passes some immunity to your baby",
      "RSV Vaccine (Abrysvo) — recommended between 32–36 weeks (September–January); a single dose protects your newborn from RSV in their first 6 months",
    ],
  },
  {
    id: "before-baby",
    title: "Things to Do Before Baby Comes",
    emoji: "📋",
    color: "rose",
    items: [
      "Research and choose a pediatrician (preferably close to home)",
      "Take childbirth classes offered at the hospital",
      "Do a hospital tour — learn about the labor ward and parking",
      "Reach out to friends for hand-me-downs (babies outgrow things quickly!)",
      "Compare insurance plans and plan to add baby as dependent",
      "Order breast pump before baby arrives (usually covered by insurance)",
      "Set up mini crib or bassinet",
      "Car seat inspection at local highway patrol (often free)",
      "Set up car seat in the car before bringing baby home",
      "Pack hospital bag ~3 weeks in advance",
      "Use hospital baby supplies and bring extras home",
      "Apply for baby's Social Security number and birth certificate at hospital",
    ],
  },
  {
    id: "hospital-mom",
    title: "Hospital Bag — For Mom",
    emoji: "👜",
    color: "pink",
    items: [
      "Birth ball (check if your hospital provides one)",
      "Electric heating pad for pain management",
      "Phone or Bluetooth speaker for music or affirmations",
      "Comfortable slippers",
      "Socks & underwear",
      "Chargers",
      "Toiletry bag — hairbrush, toothbrush, hair ties, deodorant",
      "Hoodie",
      "Peri bottle (hospital will provide)",
      "Snacks and juice for yourself and partner — stay hydrated!",
      "Postpartum undies (hospital will provide disposable supplies)",
      "Nursing tanks or dress for postpartum stay",
      "Nursing bra",
    ],
  },
  {
    id: "hospital-baby",
    title: "Hospital Bag — For Baby",
    emoji: "🍼",
    color: "fuchsia",
    items: [
      "Clothes — inner layer (pre-wash with mild detergent)",
      "Clothes — outer layer (for winter born babies)",
      "Blanket for car seat",
      "Mittens, socks, and beanie",
      "Car seat and base",
      "Cute coming home outfit 🥰",
    ],
  },
  {
    id: "postpartum",
    title: "Postpartum Essentials (First Few Weeks)",
    emoji: "💜",
    color: "purple",
    items: [
      "Sanitary pads — needed for 4–6 weeks; soft cotton pads are best",
      "Mesh or stretch panties — use hospital-provided ones initially",
      "Rubber sheets for bed to protect bedding (grab some from hospital)",
      "Postpartum waistband — wear continuously for the first 40 days",
      "Peri bottle for cleaning — especially important if you have stitches",
      "Healthy snacks for night nursing — nuts, nutri bars. Fennel seed water helps with lactation.",
    ],
  },
  {
    id: "nursing",
    title: "Nursing — Breastfeeding & Pumping",
    emoji: "🤱",
    color: "violet",
    items: [
      "Double electric breast pump (most insurance covers it — check correct flange size)",
      "Hands-free pumping bra + battery pack for travel",
      "Breastmilk storage bottles (Dr. Browns recommended)",
      "Breastmilk storage bags (some insurance provides these free)",
      "Formula as backup — Bobbie organic is a great alternative",
      "Nipple cream — lanolin (hospital) or Earth Mama organic butter",
      "Bottle sterilizer — Papablic set; BPA-free bottles + bottle brush + mild liquid",
      "Firm nursing pillow + rocking chair + step stool for good posture",
    ],
  },
  {
    id: "baby",
    title: "Baby Essentials",
    emoji: "👶",
    color: "pink",
    items: [
      "Bassinet or mini crib (bassinet for first 4–5 months)",
      "Fitted sheets — no loose sheets or blankets",
      "Diapers — ~500 newborn + Size 1 in stock (Pampers Sensitive recommended)",
      "Baby wipes — gentle, chemical-free (Pampers Sensitive)",
      "Changing pad, liner, and changing table with storage",
      "Diaper pail or Diaper Genie",
      "Laundry bag & hypoallergenic detergent",
      "Swaddle blankets or sleep sacks",
      "Muslin burp cloths — keep plenty!",
      "Hooded towels",
      "Baby clothes — onesies, footed pajamas, beanies",
      "White noise machine",
      "Rubber sheet liners",
      "Baby nest with zipper",
      "Grooming kit (Fridababy — nail cutter, filer, nasal aspirator, wax cleaner)",
      "Thermometer — armpit reading; fever = above 99°F",
      "Suction syringe (hospital provides)",
      "Baby Tylenol — consult doctor before giving; strict dosage",
      "Vitamin D drops — must be given, doesn't pass through breast milk",
      "Nasal saline spray — consult doctor for very young infants",
      "Humidifier & Vicks vaporizer",
      "Playpen or portable playard",
      "Baby activity mat (usable from 2 weeks)",
      "Tummy time pillow",
      "Baby bathtub (newborn up to 3 years)",
      "Baby shower gel & shampoo — paraben/phthalate/sulfate-free",
      "Mild body lotion",
      "Diaper bag with travel essentials",
      "High chair for when baby grows",
    ],
  },
  {
    id: "pumping",
    title: "Pumping Strategy",
    emoji: "🕐",
    color: "fuchsia",
    items: [
      "Use a double electric pump for 30 minutes per session — a single electric pump takes twice as long (1 hour) and is less efficient for building supply.",
      "Stay hydrated — keep a water bottle within reach and sip water every 10 minutes while pumping, as hydration directly supports milk production.",
      "Never go more than 3 hours between pumping sessions. Frequent, consistent pumping is what signals your body to produce more milk.",
      "Start every session on the lowest (stimulation) mode for the first 3 minutes to trigger a natural letdown reflex — do not rush this step.",
      "Once letdown occurs, increase to a comfortable expression level and continue pumping for 15 minutes. You should see milk flowing steadily.",
      "In the final 3 minutes, reduce back to low mode before switching off — this helps fully empty the breast and prevents discomfort.",
      "Aim for 9–10 pumping sessions per day, including at least one overnight session, especially during the first weeks when supply is being established.",
      "Follow this full routine consistently for the first 3 days without skipping sessions — consistency in the early days is the single biggest factor in building a strong supply.",
      "By day 4, you should be reaching a minimum of 8 oz per session. If output is lower, consult your lactation consultant — flange size or latch technique may need adjusting.",
      "Download a pump log app to track session times, output per session, and feeding records. Patterns in the data will help you and your consultant troubleshoot effectively.",
    ],
  },
];

const COLORS = {
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    heading: "text-rose-600",
    progress: "bg-rose-400",
    progressBg: "bg-rose-100",
    check: "accent-rose-500",
    badge: "bg-rose-100 text-rose-600",
    avoidBg: "bg-rose-50",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    heading: "text-pink-600",
    progress: "bg-pink-400",
    progressBg: "bg-pink-100",
    check: "accent-pink-500",
    badge: "bg-pink-100 text-pink-600",
    avoidBg: "bg-pink-50",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    heading: "text-purple-600",
    progress: "bg-purple-400",
    progressBg: "bg-purple-100",
    check: "accent-purple-500",
    badge: "bg-purple-100 text-purple-600",
    avoidBg: "bg-purple-50",
  },
  fuchsia: {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    heading: "text-fuchsia-600",
    progress: "bg-fuchsia-400",
    progressBg: "bg-fuchsia-100",
    check: "accent-fuchsia-500",
    badge: "bg-fuchsia-100 text-fuchsia-600",
    avoidBg: "bg-fuchsia-50",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    heading: "text-violet-600",
    progress: "bg-violet-400",
    progressBg: "bg-violet-100",
    check: "accent-violet-500",
    badge: "bg-violet-100 text-violet-600",
    avoidBg: "bg-violet-50",
  },
};

const TAB_STYLES: Record<TabId, { active: string; inactive: string; indicator: string }> = {
  pregnancy: {
    active: "bg-rose-400 text-white shadow-md",
    inactive: "text-rose-400 hover:bg-rose-50",
    indicator: "bg-rose-400",
  },
  hospital: {
    active: "bg-pink-400 text-white shadow-md",
    inactive: "text-pink-400 hover:bg-pink-50",
    indicator: "bg-pink-400",
  },
  "after-baby": {
    active: "bg-fuchsia-400 text-white shadow-md",
    inactive: "text-fuchsia-400 hover:bg-fuchsia-50",
    indicator: "bg-fuchsia-400",
  },
};

const STORAGE_KEY = "hey-pregnant-mama-checks";

function sectionItemCount(section: Section): number {
  if (section.kind === "yoga") return 0;
  return section.items.length;
}

function tabItemCount(tabId: TabId): number {
  const tab = TABS.find((t) => t.id === tabId)!;
  return SECTIONS.filter((s) => tab.sectionIds.includes(s.id as never)).reduce(
    (a, s) => a + sectionItemCount(s),
    0
  );
}

export default function HeyPregnantMama() {
  const [activeTab, setActiveTab] = useState<TabId>("pregnancy");
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

  function resetSection(keys: string[]) {
    setChecked((prev) => {
      const next = { ...prev };
      keys.forEach((k) => { next[k] = false; });
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const totalItems = SECTIONS.reduce((a, s) => a + sectionItemCount(s), 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((totalChecked / totalItems) * 100);

  const currentTab = TABS.find((t) => t.id === activeTab)!;
  const visibleSections = SECTIONS.filter((s) =>
    currentTab.sectionIds.includes(s.id as never)
  );

  function tabCheckedCount(tabId: TabId): number {
    const tab = TABS.find((t) => t.id === tabId)!;
    const sections = SECTIONS.filter((s) => tab.sectionIds.includes(s.id as never));
    let count = 0;
    for (const s of sections) {
      if (s.kind !== "yoga") {
        count += s.items.filter((_, i) => checked[`${s.id}-${i}`]).length;
      }
    }
    return count;
  }

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 text-white px-4 py-14 text-center">
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-semibold px-3 py-2 rounded-xl"
        >
          <span>🏠</span> Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow">
          Hey Pregnant Mama 👋
        </h1>
        <p className="max-w-xl mx-auto text-pink-100 text-base leading-relaxed mb-4">
          Your easy reference for pregnancy, your hospital stay, and the first few months with your baby.
        </p>
        <p className="text-2xl font-bold">You got this!! 💕</p>

        {/* Overall progress */}
        <div className="mt-8 max-w-sm mx-auto bg-white/20 rounded-2xl p-4">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span>Overall progress</span>
            <span>{totalChecked} / {totalItems}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-right text-xs mt-1 text-pink-100">{overallPct}% complete</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-pink-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-1 py-3">
            {TABS.map((tab) => {
              const styles = TAB_STYLES[tab.id];
              const isActive = activeTab === tab.id;
              const tabTotal = tabItemCount(tab.id);
              const tabChecked = tabCheckedCount(tab.id);
              const tabPct = tabTotal > 0 ? Math.round((tabChecked / tabTotal) * 100) : 0;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive ? styles.active : styles.inactive
                  }`}
                >
                  <span className="block text-base leading-none mb-0.5">{tab.emoji}</span>
                  <span className="block leading-tight">{tab.label}</span>
                  {isActive && (
                    <span className="block text-xs font-normal opacity-80 mt-0.5">
                      {tabChecked}/{tabTotal}
                    </span>
                  )}
                  {!isActive && tabChecked > 0 && (
                    <span className="block text-xs font-normal opacity-60 mt-0.5">
                      {tabPct}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {visibleSections.map((section) => {
          const c = COLORS[section.color];

          if (section.kind === "yoga") {
            return (
              <div key={section.id} className={`rounded-2xl border ${c.border} ${c.bg} p-6 mb-6`}>
                <h2 className={`text-lg font-bold flex items-center gap-2 mb-5 ${c.heading}`}>
                  <span>{section.emoji}</span> {section.title}
                </h2>

                <div className="space-y-6">
                  {section.trimesters.map((trimester) => {
                    const hasContent = trimester.intro.length > 0 || trimester.avoid.length > 0;
                    return (
                      <div key={trimester.id}>
                        <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${c.heading}`}>
                          {trimester.title}
                        </h3>
                        {hasContent ? (
                          <>
                            {trimester.intro.map((para, i) => (
                              <p key={i} className="text-sm text-gray-600 leading-relaxed mb-2">
                                {para}
                              </p>
                            ))}
                            {trimester.avoid.length > 0 && (
                              <div className={`mt-3 rounded-xl border ${c.border} ${c.avoidBg} px-4 py-3`}>
                                <p className={`text-xs font-semibold mb-2 ${c.heading}`}>
                                  During the {trimester.title.toLowerCase()}, you should avoid:
                                </p>
                                <ul className="space-y-1.5">
                                  {trimester.avoid.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.progress}`} />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-xs text-gray-400 italic">Content coming soon.</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          const sectionChecked = section.items.filter((_, i) => checked[`${section.id}-${i}`]).length;
          const pct = Math.round((sectionChecked / section.items.length) * 100);
          const allDone = sectionChecked === section.items.length;

          return (
            <div key={section.id} className={`rounded-2xl border ${c.border} ${c.bg} p-6 mb-6`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h2 className={`text-lg font-bold flex items-center gap-2 ${c.heading}`}>
                  <span>{section.emoji}</span> {section.title}
                </h2>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${c.badge}`}>
                  {sectionChecked}/{section.items.length}
                </span>
              </div>

              <div className={`w-full ${c.progressBg} rounded-full h-1.5 mb-4`}>
                <div
                  className={`${c.progress} rounded-full h-1.5 transition-all duration-300`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <ul className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.id}-${i}`;
                  const isChecked = !!checked[key];
                  return (
                    <li key={key}>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(key)}
                          className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 cursor-pointer ${c.check}`}
                        />
                        <span className={`text-sm leading-relaxed transition-colors ${isChecked ? "line-through text-gray-400" : "text-gray-700 group-hover:text-gray-900"}`}>
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex items-center justify-between">
                {allDone ? (
                  <p className={`text-xs font-semibold ${c.heading}`}>All done! 🎉</p>
                ) : (
                  <p className="text-xs text-gray-400">{section.items.length - sectionChecked} remaining</p>
                )}
                {sectionChecked > 0 && (
                  <button
                    onClick={() => resetSection(section.items.map((_, i) => `${section.id}-${i}`))}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Disclaimer */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 mb-6 text-sm text-amber-800 leading-relaxed">
          <p className="font-semibold mb-1">Disclaimer</p>
          The information on this page is based on my personal experience as a mother and is intended for general informational purposes only. It does not constitute medical advice. Always consult your healthcare provider or doctor before making decisions about your pregnancy, postpartum care, or your baby&apos;s health.
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-4xl mb-3">🌷</p>
          <p className="text-gray-400 text-sm mt-1">You are stronger than you know. 💕</p>
          <Link href="/" className="mt-6 inline-block text-sm text-rose-400 hover:text-rose-600 transition-colors">
            ← Back to all posts
          </Link>
          <p className="text-gray-300 text-xs mt-6">&copy; {new Date().getFullYear()} Janane Suresh. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
