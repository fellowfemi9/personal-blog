"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/app/components/PageHeader";

const TABS = [
  { id: "hospital", label: "Hospital Stay", emoji: "🏥", sectionIds: ["hospital-mom", "hospital-baby"] },
  { id: "after-baby", label: "Postpartum", emoji: "🌸", sectionIds: ["postpartum", "nursing", "baby", "pumping"] },
  { id: "pantry", label: "Pantry", emoji: "🌿", sectionIds: [] },
] as const;

type TabId = (typeof TABS)[number]["id"];

const CHECKLIST_SECTIONS = [
  {
    id: "hospital-mom",
    title: "Hospital Bag — For Mom",
    emoji: "👜",
    color: "pink" as const,
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
    color: "fuchsia" as const,
    items: [
      "Wash ALL baby clothing in a mild, fragrance-free, hypoallergenic detergent before baby wears them — newborn skin is extremely sensitive and reactive to synthetic fragrances and harsh chemicals",
      "Clothes — inner layer (washed in hypoallergenic detergent)",
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
    color: "purple" as const,
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
    color: "violet" as const,
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
    color: "pink" as const,
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
    color: "fuchsia" as const,
    items: [
      "Use a double electric pump for 30 minutes per session — a single electric pump takes twice as long and is less efficient for building supply.",
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

const INGREDIENTS = [
  { name: "Moringa Leaves", tamil: "Murungai Keerai", property: "Nutrient Dense", propertyColor: "bg-emerald-500", benefit: "High iron and calcium content to combat postpartum anemia and bone density loss.", useCase: "Moringa Poriyal: Sautéed with fresh coconut and moong dal." },
  { name: "Garlic", tamil: "Poondu", property: "Galactagogue & Antibacterial", propertyColor: "bg-violet-500", benefit: "Contains sulfur compounds that stimulate prolactin and protect the immune system.", useCase: "Poondu Rasam: A medicinal soup consumed daily during the Stationary Period." },
  { name: "Fenugreek Seeds", tamil: "Vendhayam", property: "Hormonal Regulator", propertyColor: "bg-pink-500", benefit: "Mimics estrogen to trigger milk duct growth and helps regulate blood sugar.", useCase: "Vendhaya Kali: A cooling, dense halwa made with palm jaggery and sesame oil." },
  { name: "Black Pepper", tamil: "Milagu", property: "Bio-Availability Booster", propertyColor: "bg-amber-600", benefit: "Piperine enhances the absorption of other nutrients and clears respiratory pathways.", useCase: "Milagu Jeera Sadam: A simple recovery meal for digestion." },
  { name: "Fennel Seeds", tamil: "Sombu", property: "Antispasmodic", propertyColor: "bg-teal-500", benefit: "Reduces infant colic and adult gas by relaxing digestive muscles.", useCase: "Sombu Water: Infused water sipped throughout the day to support hydration." },
  { name: "Sesame Seeds", tamil: "Ellu", property: "Structural Support", propertyColor: "bg-orange-500", benefit: "Loaded with zinc and healthy fats to support skin elasticity and hormonal balance.", useCase: "Ellu Urundai: A quick-energy Power Ball made with jaggery." },
  { name: "Cumin Seeds", tamil: "Seeragam", property: "Digestive Catalyst", propertyColor: "bg-lime-600", benefit: "Stimulates enzymes that break down proteins, reducing postpartum bloating.", useCase: "Jeera Water: Boiled and cooled water used as a primary hydration source." },
  { name: "Turmeric", tamil: "Manjal", property: "Anti-Inflammatory", propertyColor: "bg-yellow-500", benefit: "Curcumin reduces uterine inflammation and supports functional recovery.", useCase: "Manjal Paal: Warm milk with turmeric and black pepper before bed." },
];

const POWER_CLUSTERS = [
  { number: "1", title: "The Lactation Trigger", subtitle: "The \"Supply\" Sprint", emoji: "🍼", ingredients: "Moringa · Garlic · Fenugreek", workflow: "Consume these consistently between Weeks 2 and 6 when milk supply is establishing its baseline.", bg: "bg-violet-50", border: "border-violet-200", heading: "text-violet-700", badge: "bg-violet-500" },
  { number: "2", title: "The Digestive Defense", subtitle: "The \"Gut\" Security", emoji: "🛡️", ingredients: "Black Pepper · Cumin · Fennel · Ajwain", workflow: "Use these in every meal during the first 14 days (The Stationary Period) to prevent digestive bottlenecks.", bg: "bg-amber-50", border: "border-amber-200", heading: "text-amber-700", badge: "bg-amber-500" },
  { number: "3", title: "The Structural Rebuild", subtitle: "The \"Body\" Patch", emoji: "💪", ingredients: "Ghee · Sesame Seeds · Nuts", workflow: "Focus on these healthy fats to lubricate joints affected by the hormone Relaxin.", bg: "bg-emerald-50", border: "border-emerald-200", heading: "text-emerald-700", badge: "bg-emerald-600" },
];

const COLORS = {
  pink: { bg: "bg-pink-50", border: "border-pink-200", heading: "text-pink-600", progress: "bg-pink-400", progressBg: "bg-pink-100", check: "accent-pink-500", badge: "bg-pink-100 text-pink-600" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", heading: "text-purple-600", progress: "bg-purple-400", progressBg: "bg-purple-100", check: "accent-purple-500", badge: "bg-purple-100 text-purple-600" },
  fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", heading: "text-fuchsia-600", progress: "bg-fuchsia-400", progressBg: "bg-fuchsia-100", check: "accent-fuchsia-500", badge: "bg-fuchsia-100 text-fuchsia-600" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", heading: "text-violet-600", progress: "bg-violet-400", progressBg: "bg-violet-100", check: "accent-violet-500", badge: "bg-violet-100 text-violet-600" },
};

const TAB_STYLES: Record<TabId, { active: string; inactive: string }> = {
  hospital: { active: "bg-pink-400 text-white shadow-md", inactive: "text-pink-400 hover:bg-pink-50" },
  "after-baby": { active: "bg-fuchsia-400 text-white shadow-md", inactive: "text-fuchsia-400 hover:bg-fuchsia-50" },
  pantry: { active: "bg-amber-500 text-white shadow-md", inactive: "text-amber-600 hover:bg-amber-50" },
};

const STORAGE_KEY = "after-baby-checks";
const VALID_TABS_AB: TabId[] = ["hospital", "after-baby", "pantry"];

function TabSync({ onTab }: { onTab: (t: TabId) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    const t = params.get("tab") as TabId;
    if (t && VALID_TABS_AB.includes(t)) onTab(t);
  }, [params, onTab]);
  return null;
}

export default function AfterBaby() {
  const [activeTab, setActiveTab] = useState<TabId>("hospital");
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

  const totalItems = CHECKLIST_SECTIONS.reduce((a, s) => a + s.items.length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((totalChecked / totalItems) * 100);

  function tabSections(tabId: TabId) {
    const tab = TABS.find((t) => t.id === tabId)!;
    return CHECKLIST_SECTIONS.filter((s) => (tab.sectionIds as readonly string[]).includes(s.id));
  }

  function tabItemCount(tabId: TabId) {
    return tabSections(tabId).reduce((a, s) => a + s.items.length, 0);
  }

  function tabCheckedCount(tabId: TabId) {
    return tabSections(tabId).reduce((a, s) => a + s.items.filter((_, i) => checked[`${s.id}-${i}`]).length, 0);
  }

  const visibleSections = activeTab === "pantry" ? [] : tabSections(activeTab);

  if (!loaded) return null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-fuchsia-50 via-purple-50 to-pink-50">
      <PageHeader title="Delivery & Postpartum" accent="text-fuchsia-400" />
      <Suspense fallback={null}>
        <TabSync onTab={setActiveTab} />
      </Suspense>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-400 text-white px-4 py-10 sm:py-14 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow">Delivery &amp; Postpartum 🍼</h1>
        <p className="max-w-xl mx-auto text-fuchsia-100 text-base leading-relaxed mb-2">
          Hospital bags, postpartum recovery, breastfeeding &amp; pumping, and everything your newborn needs.
        </p>
        <Link href="/posts/hey-pregnant-mama" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold transition-colors mb-4">
          ← Still pregnant? Head to Hey Pregnant Mama
        </Link>
        <div className="mt-4 max-w-sm mx-auto bg-white/20 rounded-2xl p-4">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span>Overall progress</span>
            <span>{totalChecked} / {totalItems}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${overallPct}%` }} />
          </div>
          <p className="text-right text-xs mt-1 text-fuchsia-100">{overallPct}% complete</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-14 z-40 bg-white/90 backdrop-blur border-b border-fuchsia-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-1 py-3">
            {TABS.map((tab) => {
              const styles = TAB_STYLES[tab.id];
              const isActive = activeTab === tab.id;
              const tabTotal = tabItemCount(tab.id);
              const tabChecked = tabCheckedCount(tab.id);
              const tabPct = tabTotal > 0 ? Math.round((tabChecked / tabTotal) * 100) : 0;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-all duration-200 ${isActive ? styles.active : styles.inactive}`}>
                  <span className="block text-base leading-none mb-0.5">{tab.emoji}</span>
                  <span className="block leading-tight">{tab.label}</span>
                  {isActive && tabTotal > 0 && <span className="block text-xs font-normal opacity-80 mt-0.5">{tabChecked}/{tabTotal}</span>}
                  {!isActive && tabChecked > 0 && <span className="block text-xs font-normal opacity-60 mt-0.5">{tabPct}%</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* ── CHECKLIST TABS ── */}
        {activeTab !== "pantry" && visibleSections.map((section) => {
          const c = COLORS[section.color];
          const sectionChecked = section.items.filter((_, i) => checked[`${section.id}-${i}`]).length;
          const pct = Math.round((sectionChecked / section.items.length) * 100);
          const allDone = sectionChecked === section.items.length;
          return (
            <div key={section.id} className={`rounded-2xl border ${c.border} ${c.bg} p-6 mb-6`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h2 className={`text-lg font-bold flex items-center gap-2 ${c.heading}`}>
                  <span>{section.emoji}</span> {section.title}
                </h2>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${c.badge}`}>{sectionChecked}/{section.items.length}</span>
              </div>
              <div className={`w-full ${c.progressBg} rounded-full h-1.5 mb-4`}>
                <div className={`${c.progress} rounded-full h-1.5 transition-all duration-300`} style={{ width: `${pct}%` }} />
              </div>
              <ul className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.id}-${i}`;
                  const isChecked = !!checked[key];
                  return (
                    <li key={key}>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" checked={isChecked} onChange={() => toggle(key)} className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 cursor-pointer ${c.check}`} />
                        <span className={`text-sm leading-relaxed transition-colors ${isChecked ? "line-through text-gray-400" : "text-gray-700 group-hover:text-gray-900"}`}>{item}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex items-center justify-between">
                {allDone ? <p className={`text-xs font-semibold ${c.heading}`}>All done! 🎉</p> : <p className="text-xs text-gray-400">{section.items.length - sectionChecked} remaining</p>}
                {sectionChecked > 0 && (
                  <button onClick={() => resetSection(section.items.map((_, i) => `${section.id}-${i}`))} className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2">Reset</button>
                )}
              </div>
            </div>
          );
        })}

        {/* ── PANTRY TAB ── */}
        {activeTab === "pantry" && (
          <div>
            {/* Header */}
            <div className="rounded-2xl overflow-hidden mb-8" style={{ background: "linear-gradient(135deg, #0A0414 0%, #3b1a00 50%, #7c3a00 100%)" }}>
              <div className="px-6 py-8 text-center">
                <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                  The Femi9power Galactagogue Encyclopedia
                </span>
                <h2 className="font-black text-2xl text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  The South Indian Postpartum Power Pantry
                </h2>
                <p className="text-amber-200/70 text-sm max-w-md mx-auto leading-relaxed">
                  Key ingredients categorized by their functional properties, allowing you to manage postpartum depletion with precision.
                </p>
              </div>
            </div>

            {/* Ingredient Cards */}
            <div className="mb-4">
              <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-4">8 Power Ingredients</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {INGREDIENTS.map((ing) => (
                <div key={ing.name} className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
                  <div className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-black text-gray-900 text-base leading-tight">{ing.name}</h3>
                        <p className="text-xs text-amber-600 font-semibold mt-0.5">{ing.tamil}</p>
                      </div>
                      <span className={`text-white text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${ing.propertyColor}`}>
                        {ing.property}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{ing.benefit}</p>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5">
                      <p className="text-xs font-bold text-amber-700 mb-0.5">South Indian Use</p>
                      <p className="text-xs text-amber-800 leading-relaxed">{ing.useCase}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Power Clusters */}
            <div className="mb-4">
              <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-1">Strategic Workflows</p>
              <h3 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Power Clusters
              </h3>
            </div>
            <div className="space-y-4 mb-8">
              {POWER_CLUSTERS.map((cluster) => (
                <div key={cluster.number} className={`rounded-2xl border ${cluster.border} ${cluster.bg} overflow-hidden`}>
                  <div className="flex items-stretch">
                    <div className={`${cluster.badge} flex flex-col items-center justify-center px-4 min-w-[56px] flex-shrink-0`}>
                      <span className="text-white text-xl font-black">{cluster.emoji}</span>
                      <span className="text-white/80 text-xs font-bold mt-1">{cluster.number}</span>
                    </div>
                    <div className="px-5 py-4 flex-1">
                      <h4 className={`font-black text-base ${cluster.heading} mb-0.5`}>{cluster.title}</h4>
                      <p className={`text-xs font-semibold mb-2 ${cluster.heading} opacity-70`}>{cluster.subtitle}</p>
                      <p className="text-xs font-bold text-gray-700 mb-2">Core: <span className="font-normal">{cluster.ingredients}</span></p>
                      <p className="text-sm text-gray-600 leading-relaxed">{cluster.workflow}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 mb-6 text-sm text-amber-800 leading-relaxed">
          <p className="font-semibold mb-1">Disclaimer</p>
          The information on this page is based on personal experience and is intended for general informational purposes only. It does not constitute medical advice. This blog should not be treated as a source of truth — every postpartum journey is different. Always consult your healthcare provider for decisions about your postpartum care and your baby&apos;s health.
          <p className="font-semibold mt-3 mb-1">References</p>
          <ul className="list-disc list-inside space-y-1">
            <li><a href="https://www.healthychildren.org" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">American Academy of Pediatrics — HealthyChildren.org</a></li>
            <li><a href="https://www.cdc.gov/breastfeeding" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">CDC — Breastfeeding</a></li>
            <li><a href="https://www.llli.org" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">La Leche League International</a></li>
            <li><a href="https://www.who.int/health-topics/breastfeeding" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">WHO — Breastfeeding</a></li>
            <li><a href="https://www.healthline.com/health/postpartum-recovery" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">Healthline — Postpartum Recovery</a></li>
          </ul>
        </div>

        <div className="text-center py-8">
          <p className="text-4xl mb-3">🌸</p>
          <p className="text-gray-400 text-sm mt-1">You are doing an incredible job. 💕</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="/posts/hey-pregnant-mama" className="text-sm text-rose-400 hover:text-rose-600 font-semibold transition-colors">← Hey Pregnant Mama</Link>
            <span className="text-gray-300">·</span>
            <Link href="/" className="text-sm text-fuchsia-500 hover:text-fuchsia-700 transition-colors">Home</Link>
          </div>
          <p className="text-gray-300 text-xs mt-6">&copy; {new Date().getFullYear()} Janane Suresh. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
