"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/app/components/PageHeader";
import DueDateCountdown from "@/app/components/DueDateCountdown";

type RegularSection = {
  kind?: never;
  id: string;
  title: string;
  emoji: string;
  color: keyof typeof COLORS;
  items: string[];
};

type DosDontsItem = { label: string; text: string };

type FitnessCategory = {
  id: string;
  title: string;
  emoji: string;
  dos: DosDontsItem[];
  donts: DosDontsItem[];
};

type FitnessSection = {
  kind: "fitness";
  id: string;
  title: string;
  emoji: string;
  intro: string;
  categories: FitnessCategory[];
  redFlags: string[];
  tip: string;
};

type CheatsheetMonth = {
  months: string;
  trimester: "first" | "second" | "third";
  title: string;
  focus: string;
  action: string;
};

type CheatsheetSection = {
  kind: "cheatsheet";
  id: string;
  title: string;
  emoji: string;
  months: CheatsheetMonth[];
};

type DosDontsSection = {
  kind: "dosdonts";
  id: string;
  title: string;
  emoji: string;
  color: keyof typeof COLORS;
  intro: string;
  dos: DosDontsItem[];
  donts: DosDontsItem[];
  note?: string;
};

type Section = RegularSection | FitnessSection | CheatsheetSection | DosDontsSection;

const TABS = [
  { id: "checklist",  label: "Checklist & Reminders",    emoji: "📋", sectionIds: ["pregnancy", "vaccines", "before-baby", "dental", "vision"] },
  { id: "cheatsheet", label: "Cheatsheet",                emoji: "📅", sectionIds: ["cheatsheet"] },
  { id: "fitness",    label: "Fitness during Pregnancy",  emoji: "💪", sectionIds: ["fitness"] },
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
    title: "To Do list before you deliver",
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
    kind: "dosdonts",
    id: "dental",
    title: "Pregnancy Dental Checklist",
    emoji: "🦷",
    color: "violet",
    intro: "Maintaining oral health is a vital part of prenatal care. Hormonal changes can lead to increased sensitivity, so being proactive is key.",
    dos: [
      { label: "Inform the staff immediately", text: "Even if you aren't showing, tell the receptionist and the hygienist your due date." },
      { label: "Schedule for the Second Trimester", text: "Aim for weeks 14 through 28. It's typically the 'sweet spot' where nausea has subsided and lying back in the chair is still comfortable." },
      { label: "Bring a small pillow", text: "Placing a pillow under your right hip while lying back can help prevent dizziness by keeping pressure off the vena cava." },
      { label: "Use a soft-bristled brush", text: "If your gums are bleeding (pregnancy gingivitis), a softer brush and gentle flossing are safer than skipping oral hygiene." },
    ],
    donts: [
      { label: "Don't delay urgent work", text: "If you have a toothache or signs of infection, do not wait until after delivery. Infections can be more stressful for the body than the treatment itself." },
      { label: "Don't skip the lead apron", text: "If X-rays are required for an emergency, ensure the office uses a leaded thyroid collar and abdominal drape." },
      { label: "Don't use elective whitening products", text: "High-concentration bleaching agents are best avoided until after you finish breastfeeding." },
    ],
  },
  {
    kind: "dosdonts",
    id: "vision",
    title: "Pregnancy Vision Checklist",
    emoji: "👁️",
    color: "fuchsia",
    intro: "Vision changes are often temporary and related to fluid retention. This checklist focuses on managing comfort until your body returns to its baseline.",
    dos: [
      { label: "Track 'The Big Three'", text: "Be vigilant about shimmering lights, sudden blurriness, or numerous new floaters. These should be reported to an OB-GYN immediately." },
      { label: "Switch to glasses if needed", text: "If fluid retention makes your contacts feel like they don't fit right, give your eyes a break with your frames." },
      { label: "Hydrate for dry eyes", text: "Use preservative-free 'artificial tears' to soothe the dryness caused by shifting hormones." },
      { label: "Wait for the 'Post-Baby Exam'", text: "Schedule your formal vision test for 3 to 6 months after delivery (or after you stop breastfeeding) for the most accurate results." },
    ],
    donts: [
      { label: "Don't buy expensive new lenses", text: "Since your vision may 'snap back' postpartum, buying high-end designer lenses now might be a wasted investment." },
      { label: "Don't ignore headaches", text: "If you are getting frequent headaches along with blurry vision, don't assume it's just 'pregnancy brain' — get your blood pressure checked." },
      { label: "Don't consider corrective surgery", text: "Avoid LASIK or other elective eye surgeries until your hormones and vision have completely stabilized postpartum." },
    ],
    note: "Keep a small 'appointment log' in your phone to note any symptoms you want to mention to your provider during these visits.",
  },
  {
    kind: "cheatsheet",
    id: "cheatsheet",
    title: "Month-by-Month Must-Knows",
    emoji: "📅",
    months: [
      { months: "1–2", trimester: "first", title: "The Foundation", focus: "Neural tube development and hormone surges. Your body is building the baby's brain and spinal cord — the most critical window for folic acid.", action: "Start folic acid / prenatal vitamins immediately. Verify pregnancy with your provider and schedule your first OB visit." },
      { months: "3", trimester: "first", title: "The Shift", focus: "Transitioning into the 2nd Trimester. The placenta takes over hormone production — many women find nausea begins to ease.", action: "Screening tests (NIPT / Nuchal Translucency scan) typically happen now. Discuss genetic screening options with your provider." },
      { months: "4", trimester: "second", title: "Energy Rebound", focus: "Morning sickness usually fades and energy returns. Blood volume increases by up to 50%, putting higher demands on your iron stores.", action: "Focus on iron-rich foods (spinach, lentils, red meat) and pair with vitamin C for absorption. Confirm your anatomy scan is scheduled." },
      { months: "5", trimester: "second", title: "The Quickening", focus: "You may feel first movements (quickening). The baby's ears are developed — they can hear your voice. The anatomy scan gives a full picture of development.", action: "Anatomy scan (mid-pregnancy ultrasound) checks fetal organs, position, and placenta location. A key milestone appointment." },
      { months: "6", trimester: "second", title: "Viability & Glucose", focus: "Baby reaches viability (24 weeks). Your growing uterus puts pressure on your pancreas — this is when gestational diabetes risk is assessed.", action: "Glucose Challenge Test (GCT). If elevated, you'll do the 3-hour Glucose Tolerance Test. Adjust diet proactively regardless of results." },
      { months: "7", trimester: "third", title: "Third Trimester Entry", focus: "Brain and lung development accelerate rapidly. Blood pressure monitoring becomes more important as preeclampsia risk rises.", action: "Learn the warning signs of preeclampsia: sudden swelling, severe headaches, vision changes, upper-right abdominal pain. Report any immediately." },
      { months: "8", trimester: "third", title: "The Cramped Phase", focus: "Less room for movement as baby grows. Baby typically turns head-down (vertex) in preparation for birth. Braxton Hicks contractions become more noticeable.", action: "Finalize your birth plan and hospital bag. Take a hospital tour if you haven't. Install the car seat and have it inspected." },
      { months: "9", trimester: "third", title: "The Finish Line", focus: "Full term begins at 37 weeks. Baby drops lower into the pelvis (lightening), relieving pressure on your lungs but increasing pelvic pressure and bathroom urgency.", action: "GBS (Group B Strep) swab test at 36 weeks. Weekly check-ups begin. Know your hospital's go-time signs: contractions 5 min apart, water breaking, or reduced fetal movement." },
    ],
  },
  {
    kind: "fitness",
    id: "fitness",
    title: "Yoga & Strength Training During Pregnancy",
    emoji: "💪",
    intro: "Maintaining a fitness routine during pregnancy isn't just about physical health — it's about claiming your power and preparing your body for the marathon of labor and the demands of postpartum life. Because your body is navigating significant physiological changes, your training intensity and focus must shift. Here are the essential dos and don'ts for a safe, vibrant prenatal practice.",
    categories: [
      {
        id: "strength",
        title: "Strength Training",
        emoji: "🏋️",
        dos: [
          { label: "Prioritize Compound Movements", text: "Stick to functional moves like squats, lunges, and rows. These strengthen the posterior chain (back, glutes, hamstrings), which helps counteract the forward pull of a growing belly." },
          { label: "Focus on the Pelvic Floor and Core", text: "Learn to engage your deep core (the transverse abdominis) rather than your six-pack muscles. Practice breathing into your lifts — exhale on the exertion to manage intra-abdominal pressure." },
          { label: "Use the Talk Test", text: "You should be able to carry on a brief conversation during your sets. If you're gasping for air, the intensity is too high." },
          { label: "Adjust Your Stance", text: "As your center of gravity shifts, widen your stance during squats and overhead presses to maintain better balance." },
        ],
        donts: [
          { label: "Avoid the Valsalva Maneuver", text: "Never hold your breath while lifting heavy weights. This creates excessive pressure on your pelvic floor and can restrict oxygen to the baby." },
          { label: "Skip Max Effort Days", text: "This isn't the time for a one-rep max. Stick to moderate intensity — higher repetitions (12–15) with lower, controlled weights." },
          { label: "No Unstable Surfaces", text: "Avoid exercises on Bosu balls or single-leg movements that feel wobbly. The hormone relaxin makes your ligaments looser, increasing the risk of joint injury or falls." },
        ],
      },
      {
        id: "yoga-fitness",
        title: "Yoga & Flexibility",
        emoji: "🧘",
        dos: [
          { label: "Utilize Props", text: "Blocks, bolsters, and straps are your best friends. They bring the floor to you and allow you to maintain proper alignment without overstretching." },
          { label: "Focus on Hip Opening", text: "Poses like Cat-Cow, Bound Angle (Baddha Konasana), and supported Squats (Malasana) help keep the pelvis mobile and can relieve lower back tension." },
          { label: "Modify for the Belly", text: "Always move into open twists. Instead of twisting across your body (which compresses the midsection), twist away from your legs to create space for the baby." },
          { label: "Stay Hydrated", text: "Pregnant bodies overheat more easily. Keep your practice in a well-ventilated room and sip water throughout." },
        ],
        donts: [
          { label: "No Hot Yoga", text: "Avoid Bikram or heated environments. Elevated core temperatures are a serious concern for fetal development, especially in the first trimester." },
          { label: "Avoid Flat-Back Poses After 20 Weeks", text: "Lying flat on your back for long periods can compress the vena cava, potentially reducing blood flow to the baby and causing dizziness. Use a side-lying position or a bolster instead." },
          { label: "Don't Overstretch", text: "Relaxin makes you feel more flexible than you actually are. Stay within a normal range of motion rather than pushing for your deepest stretch." },
          { label: "Avoid Deep Inversions", text: "Most should avoid poses where the head is significantly below the heart to prevent dizziness and falls." },
        ],
      },
    ],
    redFlags: [
      "Vaginal bleeding or fluid leakage",
      "Dizziness, lightheadedness, or fainting",
      "Chest pain or heart palpitations",
      "Reduced fetal movement",
      "Calf pain or swelling (which can indicate a blood clot)",
    ],
    tip: "Think of your prenatal workouts as Maintenance & Mobility rather than Performance & Gains. The goal is to feel energized and strong, not depleted.",
  },
];

const COLORS = {
  rose: { bg: "bg-rose-50", border: "border-rose-200", heading: "text-rose-600", progress: "bg-rose-400", progressBg: "bg-rose-100", check: "accent-rose-500", badge: "bg-rose-100 text-rose-600", avoidBg: "bg-rose-50" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", heading: "text-pink-600", progress: "bg-pink-400", progressBg: "bg-pink-100", check: "accent-pink-500", badge: "bg-pink-100 text-pink-600", avoidBg: "bg-pink-50" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", heading: "text-purple-600", progress: "bg-purple-400", progressBg: "bg-purple-100", check: "accent-purple-500", badge: "bg-purple-100 text-purple-600", avoidBg: "bg-purple-50" },
  fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", heading: "text-fuchsia-600", progress: "bg-fuchsia-400", progressBg: "bg-fuchsia-100", check: "accent-fuchsia-500", badge: "bg-fuchsia-100 text-fuchsia-600", avoidBg: "bg-fuchsia-50" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", heading: "text-violet-600", progress: "bg-violet-400", progressBg: "bg-violet-100", check: "accent-violet-500", badge: "bg-violet-100 text-violet-600", avoidBg: "bg-violet-50" },
};

const TAB_STYLES: Record<TabId, { active: string; inactive: string }> = {
  checklist:  { active: "bg-rose-400 text-white shadow-md",    inactive: "text-rose-400 hover:bg-rose-50" },
  cheatsheet: { active: "bg-violet-500 text-white shadow-md",  inactive: "text-violet-500 hover:bg-violet-50" },
  fitness:    { active: "bg-emerald-500 text-white shadow-md", inactive: "text-emerald-600 hover:bg-emerald-50" },
};

type PoseTrimester = "All trimesters" | "1st & 2nd" | "2nd & 3rd" | "1st trimester";

type Pose = {
  name: string;
  sanskrit: string;
  src: string;
  alt: string;
  trimester: PoseTrimester;
  benefits: string[];
  tip: string;
};

const TRIMESTER_BADGE: Record<PoseTrimester, string> = {
  "All trimesters": "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "1st & 2nd": "bg-rose-100 text-rose-700 border border-rose-200",
  "2nd & 3rd": "bg-violet-100 text-violet-700 border border-violet-200",
  "1st trimester": "bg-amber-100 text-amber-700 border border-amber-200",
};

const POSES: Pose[] = [
  {
    name: "Cat-Cow",
    sanskrit: "Marjaryasana–Bitilasana",
    trimester: "All trimesters",
    benefits: ["Relieves pregnancy back pain instantly", "Creates space for baby to shift into optimal position", "Synchronises breath with movement"],
    tip: "8–10 slow rounds. Inhale to arch (cow), exhale to round (cat). Keep wrists under shoulders.",
    src: "/yoga/prenatal-cow.jpeg",
    alt: "Cat-Cow pose",
  },
  {
    name: "Three-Legged Downward Dog",
    sanskrit: "Eka Pada Adho Mukha Svanasana",
    trimester: "All trimesters",
    benefits: ["Lengthens the spine and relieves back compression", "Strengthens arms and legs without belly strain", "Lifts one leg to open the hip and energise the body"],
    tip: "Keep the raised leg strong and squared to the floor. Bend your standing knee generously as the belly grows.",
    src: "/yoga/prenatal-dog.jpeg",
    alt: "Three-Legged Downward Dog pose",
  },
  {
    name: "Warrior I",
    sanskrit: "Virabhadrasana I",
    trimester: "1st & 2nd",
    benefits: ["Strengthens legs, hips, and core — essential for labour", "Builds stamina and focus", "Opens the hip flexors of the back leg"],
    tip: "Widen your stance as belly grows. Keep front knee directly over ankle. Hold 20–30 seconds per side.",
    src: "/yoga/prenatal-warrior-1.jpeg",
    alt: "Warrior I prenatal pose",
  },
  {
    name: "Warrior II",
    sanskrit: "Virabhadrasana II",
    trimester: "1st & 2nd",
    benefits: ["Opens hips and strengthens thighs for childbirth", "Builds the endurance needed for active labour", "Improves body awareness and balance"],
    tip: "Arms parallel to the floor, gaze forward. Take a wider stance than usual to make room for the belly.",
    src: "/yoga/prenatal-warrior-2.jpeg",
    alt: "Warrior II prenatal pose",
  },
  {
    name: "Warrior III",
    sanskrit: "Virabhadrasana III",
    trimester: "1st & 2nd",
    benefits: ["Builds single-leg stability and core strength", "Improves focus and proprioception", "Strengthens glutes and hamstrings for labour support"],
    tip: "Keep a slight bend in the standing knee. Use a wall or chair for balance if needed. Engage the core gently.",
    src: "/yoga/prenatal-warrior-3.jpeg",
    alt: "Warrior III prenatal pose",
  },
  {
    name: "Standing Balance Hold",
    sanskrit: "Utthita Hasta Padangusthasana",
    trimester: "All trimesters",
    benefits: ["Builds single-leg balance and concentration", "Strengthens the standing hip and ankle", "Improves posture as centre of gravity shifts with bump"],
    tip: "Hold a wall or chair for balance. Keep the standing leg slightly bent. Breathe steadily through the hold.",
    src: "/yoga/prenatal-single-leg.jpeg",
    alt: "Standing Balance Hold pose",
  },
  {
    name: "Pigeon Pose",
    sanskrit: "Eka Pada Rajakapotasana",
    trimester: "1st & 2nd",
    benefits: ["Deeply opens the hips and piriformis muscle", "Relieves sciatic nerve pain common in pregnancy", "Stretches hip flexors of the extended back leg"],
    tip: "Place a pillow or bolster under the hip of the bent leg for support. Skip in the 3rd trimester or if advised against hip openers.",
    src: "/yoga/prenatal-pigeon.jpeg",
    alt: "Pigeon pose",
  },
];


const STORAGE_KEY = "hey-pregnant-mama-checks";

function sectionItemCount(section: Section): number {
  if (section.kind === "fitness" || section.kind === "cheatsheet") return 0;
  if (section.kind === "dosdonts") return section.dos.length;
  return section.items.length;
}

function tabItemCount(tabId: TabId): number {
  const tab = TABS.find((t) => t.id === tabId)!;
  return SECTIONS.filter((s) => tab.sectionIds.includes(s.id as never)).reduce((a, s) => a + sectionItemCount(s), 0);
}

const VALID_TABS: TabId[] = ["checklist", "cheatsheet", "fitness"];

function TabSync({ onTab }: { onTab: (t: TabId) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    const t = params.get("tab") as TabId;
    if (t && VALID_TABS.includes(t)) onTab(t);
  }, [params, onTab]);
  return null;
}

export default function HeyPregnantMama() {
  const [activeTab, setActiveTab] = useState<TabId>("checklist");
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
  const visibleSections = SECTIONS.filter((s) => currentTab.sectionIds.includes(s.id as never));

  function tabCheckedCount(tabId: TabId): number {
    const tab = TABS.find((t) => t.id === tabId)!;
    const sections = SECTIONS.filter((s) => tab.sectionIds.includes(s.id as never));
    let count = 0;
    for (const s of sections) {
      if (s.kind === "dosdonts") {
        count += s.dos.filter((_, i) => checked[`${s.id}-do-${i}`]).length;
      } else if (s.kind !== "fitness" && s.kind !== "cheatsheet") {
        count += s.items.filter((_, i) => checked[`${s.id}-${i}`]).length;
      }
    }
    return count;
  }

  if (!loaded) return null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <PageHeader title="Hey Pregnant Mama" accent="text-rose-400" />

      {/* Tab sync — updates active tab on client-side navigation */}
      <Suspense fallback={null}>
        <TabSync onTab={setActiveTab} />
      </Suspense>

      {/* Due date countdown */}
      <DueDateCountdown />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 text-white px-4 py-10 sm:py-14 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow">Hey Pregnant Mama 👋</h1>
        <p className="max-w-xl mx-auto text-pink-100 text-base leading-relaxed mb-2">
          Your guide through pregnancy — milestones, fitness, yoga, vaccines, and everything to do before baby arrives.
        </p>
        <Link href="/posts/after-baby" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold transition-colors mb-4">
          After baby? Head to Delivery &amp; Postpartum →
        </Link>
        <div className="mt-4 max-w-sm mx-auto bg-white/20 rounded-2xl p-4">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span>Overall progress</span>
            <span>{totalChecked} / {totalItems}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${overallPct}%` }} />
          </div>
          <p className="text-right text-xs mt-1 text-pink-100">{overallPct}% complete</p>
        </div>
      </div>

      {/* Mobile tab strip — visible only on small screens */}
      <div className="md:hidden sticky top-14 z-40 bg-white/90 backdrop-blur border-b border-pink-100 shadow-sm">
        <div className="flex overflow-x-auto gap-1.5 px-3 py-2.5 scrollbar-hide">
          {TABS.map((tab) => {
            const styles = TAB_STYLES[tab.id];
            const isActive = activeTab === tab.id;
            const tabTotal = tabItemCount(tab.id);
            const tabChecked = tabCheckedCount(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${isActive ? styles.active : styles.inactive}`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                {isActive && tabTotal > 0 && (
                  <span className="opacity-75 font-normal">{tabChecked}/{tabTotal}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop + mobile layout */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:flex md:gap-8 md:items-start">

        {/* Desktop sidebar — hidden on mobile */}
        <aside className="hidden md:block w-52 flex-shrink-0 sticky top-20">
          {/* Breadcrumb label */}
          <div className="mb-4 px-1">
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Hey Pregnant Mama</p>
            <div className="mt-1 h-px bg-gradient-to-r from-rose-300 to-transparent" />
          </div>

          {/* Vertical tab list */}
          <nav className="space-y-1">
            {TABS.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const tabTotal = tabItemCount(tab.id);
              const tabChecked = tabCheckedCount(tab.id);
              const tabPct = tabTotal > 0 ? Math.round((tabChecked / tabTotal) * 100) : 0;
              const activeColors: Record<TabId, string> = {
                checklist:  "border-rose-400 bg-rose-50 text-rose-700",
                cheatsheet: "border-violet-500 bg-violet-50 text-violet-700",
                fitness:    "border-emerald-500 bg-emerald-50 text-emerald-700",
              };
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 border-l-4 group ${
                    isActive
                      ? activeColors[tab.id]
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <span className="text-lg leading-none">{tab.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-tight ${isActive ? "" : "group-hover:text-gray-800"}`}>
                      {tab.label}
                    </p>
                    {isActive && tabTotal > 0 && (
                      <div className="mt-1">
                        <div className="flex justify-between text-[10px] mb-0.5 opacity-70">
                          <span>{tabChecked}/{tabTotal}</span>
                          <span>{tabPct}%</span>
                        </div>
                        <div className="w-full bg-white/60 rounded-full h-1">
                          <div
                            className="rounded-full h-1 transition-all duration-300"
                            style={{
                              width: `${tabPct}%`,
                              background: tab.id === "checklist" ? "#f87171" : tab.id === "cheatsheet" ? "#8b5cf6" : "#10b981",
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {!isActive && tabChecked > 0 && (
                      <p className="text-[10px] opacity-50 mt-0.5">{tabPct}% done</p>
                    )}
                  </div>
                  {/* Step number */}
                  <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isActive ? "bg-current/20 opacity-60" : "text-gray-300"
                  }`}>
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Overall progress below sidebar */}
          <div className="mt-6 px-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Overall</span>
              <span>{totalChecked}/{totalItems}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-rose-400 to-fuchsia-400 rounded-full h-1.5 transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">

        {/* Prenatal Yoga Poses — fitness tab, shown first */}
        {activeTab === "fitness" && (
          <div>
            {/* Header */}
            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "linear-gradient(135deg, #3b0764 0%, #6d28d9 60%, #7c3aed 100%)" }}>
              <div className="px-6 py-6 text-white">
                <p className="text-purple-200 text-xs font-bold tracking-widest uppercase mb-2">Femi9 Power · Prenatal Yoga</p>
                <h2 className="font-black text-2xl mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Yoga Poses &amp; Benefits
                </h2>
                <p className="text-purple-100 text-sm leading-relaxed mb-3">
                  Prenatal yoga keeps your body supple, your mind calm, and your baby in optimal position. Each pose below is safe when practised with care — always listen to your body and stop if anything feels uncomfortable.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="bg-emerald-500/80 text-white px-3 py-1 rounded-full">All trimesters</span>
                  <span className="bg-rose-400/80 text-white px-3 py-1 rounded-full">1st &amp; 2nd only</span>
                  <span className="bg-violet-400/80 text-white px-3 py-1 rounded-full">2nd &amp; 3rd only</span>
                </div>
              </div>
            </div>

            {/* Safety note */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-3 mb-6 text-amber-800 text-xs leading-relaxed">
              ⚠️ <strong>Always get clearance from your OB or midwife before starting prenatal yoga.</strong> Avoid poses on your back after 20 weeks, hot yoga, deep twists, and any pose that causes discomfort.
            </div>

            {/* Pose grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {POSES.map((pose) => (
                <div key={pose.name} className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Pose photo — copyright protected */}
                  <div className="w-full overflow-hidden relative" style={{ aspectRatio: "3/4", background: "#0d0521" }}>
                    <img
                      src={pose.src}
                      alt={pose.alt}
                      className="w-full h-full object-contain select-none"
                      draggable={false}
                      style={{ pointerEvents: "none", userSelect: "none", WebkitUserDrag: "none" } as React.CSSProperties}
                    />
                    {/* Transparent overlay blocks right-click & drag */}
                    <div
                      className="absolute inset-0"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    {/* Copyright badge */}
                    <div className="absolute bottom-2 right-2 bg-black/55 text-white/70 text-[9px] font-semibold px-2 py-0.5 rounded-full select-none" style={{ pointerEvents: "none" }}>
                      © Femi9 Power
                    </div>
                  </div>

                  <div className="px-5 py-4">
                    {/* Trimester badge */}
                    <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 ${TRIMESTER_BADGE[pose.trimester]}`}>
                      {pose.trimester}
                    </span>

                    {/* Names */}
                    <h3 className="font-black text-gray-900 text-base leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {pose.name}
                    </h3>
                    <p className="text-purple-400 text-xs italic mb-3">{pose.sanskrit}</p>

                    {/* Benefits */}
                    <ul className="space-y-1 mb-3">
                      {pose.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <span className="text-purple-400 mt-0.5 flex-shrink-0">✦</span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Tip */}
                    <div className="bg-purple-50 border border-purple-100 rounded-lg px-3 py-2 text-xs text-purple-700 leading-relaxed">
                      <strong>Tip:</strong> {pose.tip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleSections.map((section) => {

          if (section.kind === "cheatsheet") {
            const trimesterColors = {
              first: { bg: "bg-rose-50", border: "border-rose-200", badge: "bg-rose-500", label: "1st Trimester", text: "text-rose-700", dot: "bg-rose-400" },
              second: { bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-500", label: "2nd Trimester", text: "text-violet-700", dot: "bg-violet-400" },
              third: { bg: "bg-teal-50", border: "border-teal-200", badge: "bg-teal-600", label: "3rd Trimester", text: "text-teal-700", dot: "bg-teal-500" },
            };
            return (
              <div key={section.id}>
                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-violet-700 mb-1">
                    <span>{section.emoji}</span> {section.title}
                  </h2>
                  <p className="text-sm text-gray-500">A high-level roadmap of your pregnancy milestones and physiological priorities, month by month.</p>
                </div>
                <div className="space-y-4 mb-6">
                  {section.months.map((m) => {
                    const c = trimesterColors[m.trimester];
                    return (
                      <div key={m.months} id={`cheatsheet-${m.months}`} className={`rounded-2xl border ${c.border} ${c.bg} overflow-hidden scroll-mt-24`}>
                        <div className="flex items-stretch">
                          <div className={`${c.badge} flex flex-col items-center justify-center px-4 py-4 min-w-[64px] flex-shrink-0`}>
                            <span className="text-white text-xs font-bold tracking-widest uppercase leading-none mb-1">Mo.</span>
                            <span className="text-white text-2xl font-black leading-none">{m.months}</span>
                          </div>
                          <div className="px-5 py-4 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-xs font-bold uppercase tracking-wide ${c.text}`}>{m.title}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full text-white font-semibold ${c.badge}`}>{c.label}</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">{m.focus}</p>
                            <div className="flex items-start gap-2">
                              <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                              <p className="text-sm font-semibold text-gray-800 leading-relaxed">{m.action}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          if (section.kind === "fitness") {
            return (
              <div key={section.id}>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-emerald-700 mb-3">
                    <span>{section.emoji}</span> {section.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.intro}</p>
                </div>
                {section.categories.map((cat) => (
                  <div key={cat.id} className="mb-6">
                    <h3 className="text-base font-black text-gray-800 flex items-center gap-2 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      <span>{cat.emoji}</span> {cat.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-emerald-200 bg-white overflow-hidden">
                        <div className="bg-emerald-500 px-4 py-3"><span className="text-white font-black text-sm tracking-wide uppercase">✓ The Dos</span></div>
                        <ul className="divide-y divide-emerald-50">
                          {cat.dos.map((item) => (
                            <li key={item.label} className="px-4 py-3.5">
                              <p className="text-sm font-bold text-emerald-700 mb-1">{item.label}</p>
                              <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-rose-200 bg-white overflow-hidden">
                        <div className="bg-rose-500 px-4 py-3"><span className="text-white font-black text-sm tracking-wide uppercase">✕ The Don&apos;ts</span></div>
                        <ul className="divide-y divide-rose-50">
                          {cat.donts.map((item) => (
                            <li key={item.label} className="px-4 py-3.5">
                              <p className="text-sm font-bold text-rose-600 mb-1">{item.label}</p>
                              <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 mb-6">
                  <h3 className="text-base font-black text-red-700 flex items-center gap-2 mb-1">🚨 Severity Red Flags</h3>
                  <p className="text-xs text-red-600 mb-4 font-medium">Stop exercising immediately and consult your healthcare provider if you experience:</p>
                  <ul className="space-y-2.5">
                    {section.redFlags.map((flag) => (
                      <li key={flag} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                        <span className="text-sm text-red-800 font-medium leading-relaxed">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl p-6 mb-6 text-center" style={{ background: "linear-gradient(135deg, #0A0414 0%, #1E0733 50%, #4A1060 100%)" }}>
                  <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">Femi9 Tip</span>
                  <p className="text-white/80 text-sm leading-relaxed max-w-md mx-auto italic">&ldquo;{section.tip}&rdquo;</p>
                </div>
              </div>
            );
          }

          if (section.kind === "dosdonts") {
            const c = COLORS[section.color];
            const doChecked = section.dos.filter((_, i) => checked[`${section.id}-do-${i}`]).length;
            const doPct = Math.round((doChecked / section.dos.length) * 100);
            const allDone = doChecked === section.dos.length;
            return (
              <div key={section.id} className="mb-6">
                {/* Header */}
                <div className={`rounded-2xl border ${c.border} ${c.bg} p-5 mb-4`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className={`text-lg font-bold flex items-center gap-2 ${c.heading}`}>
                      <span>{section.emoji}</span> {section.title}
                    </h2>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${c.badge}`}>{doChecked}/{section.dos.length}</span>
                  </div>
                  <div className={`w-full ${c.progressBg} rounded-full h-1.5 mb-3`}>
                    <div className={`${c.progress} rounded-full h-1.5 transition-all duration-300`} style={{ width: `${doPct}%` }} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.intro}</p>
                </div>

                {/* Dos — checkboxes */}
                <div className="rounded-2xl border border-emerald-200 bg-white overflow-hidden mb-3">
                  <div className="bg-emerald-500 px-4 py-3">
                    <span className="text-white font-black text-sm tracking-wide uppercase">✓ The Dos</span>
                  </div>
                  <ul className="divide-y divide-emerald-50">
                    {section.dos.map((item, i) => {
                      const key = `${section.id}-do-${i}`;
                      const isChecked = !!checked[key];
                      return (
                        <li key={key} className="px-4 py-3.5">
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggle(key)}
                              className="mt-0.5 w-4 h-4 rounded flex-shrink-0 cursor-pointer accent-emerald-500"
                            />
                            <div>
                              <p className={`text-sm font-bold mb-0.5 transition-colors ${isChecked ? "line-through text-gray-400" : "text-emerald-700"}`}>
                                {item.label}
                              </p>
                              <p className={`text-xs leading-relaxed transition-colors ${isChecked ? "text-gray-300" : "text-gray-500"}`}>
                                {item.text}
                              </p>
                            </div>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="px-4 py-3 flex items-center justify-between border-t border-emerald-50">
                    {allDone
                      ? <p className="text-xs font-semibold text-emerald-600">All done! 🎉</p>
                      : <p className="text-xs text-gray-400">{section.dos.length - doChecked} remaining</p>
                    }
                    {doChecked > 0 && (
                      <button
                        onClick={() => resetSection(section.dos.map((_, i) => `${section.id}-do-${i}`))}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Don'ts — informational */}
                <div className="rounded-2xl border border-rose-200 bg-white overflow-hidden mb-3">
                  <div className="bg-rose-500 px-4 py-3">
                    <span className="text-white font-black text-sm tracking-wide uppercase">✕ The Don&apos;ts</span>
                  </div>
                  <ul className="divide-y divide-rose-50">
                    {section.donts.map((item) => (
                      <li key={item.label} className="px-4 py-3.5 flex items-start gap-3">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-rose-500 text-[9px] font-black leading-none">✕</span>
                        </span>
                        <div>
                          <p className="text-sm font-bold text-rose-600 mb-0.5">{item.label}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Blog note */}
                {section.note && (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-2">
                    <span className="text-amber-500 text-base flex-shrink-0 mt-0.5">💡</span>
                    <p className="text-amber-800 text-xs leading-relaxed"><strong>Blog tip:</strong> {section.note}</p>
                  </div>
                )}
              </div>
            );
          }

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

        {/* Food Recall Warning — checklist tab only */}
        {activeTab === "checklist" && (
          <div className="rounded-2xl overflow-hidden mb-6 border border-red-200" style={{ background: "linear-gradient(135deg, #1a0a0a 0%, #3b0f0f 50%, #1f0d1f 100%)" }}>
            {/* Header */}
            <div className="px-6 pt-6 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Food Safety Alert for Pregnant Women
                </h3>
              </div>
              <p className="text-red-200 text-sm leading-relaxed">
                Pregnant women are <strong className="text-red-100">10× more susceptible</strong> to foodborne illness. Bacteria like <em>Salmonella</em> and <em>E. coli</em> can cross the placental barrier and cause miscarriage, premature labour, or stillbirth.
              </p>
            </div>

            {/* Warning content */}
            <div className="px-6 pb-6 space-y-3">
              <div className="bg-white/8 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold text-sm mb-2">📲 Download a Food Recalls App</p>
                <p className="text-red-200 text-sm leading-relaxed mb-3">
                  Stay updated on product recalls in your region. Check recalled brands before buying deli meats, soft cheeses, sprouts, juices, and pre-cut produce — these are highest-risk categories during pregnancy.
                </p>
                <a
                  href="https://apps.apple.com/us/app/food-recalls-alerts/id1508680654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-xs px-4 py-2 rounded-full transition-opacity hover:opacity-90"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Food Recalls &amp; Alerts — App Store
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">🇺🇸 US</p>
                  <p className="text-red-200 text-xs">
                    <strong className="text-white">recalls.gov</strong> — Official FDA &amp; USDA food recall database. Search by product, brand, or state.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">🇨🇦 Canada</p>
                  <p className="text-red-200 text-xs">
                    <strong className="text-white">canada.ca/food-recalls</strong> — Canadian Food Inspection Agency recall alerts.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">🇬🇧 UK</p>
                  <p className="text-red-200 text-xs">
                    <strong className="text-white">food.gov.uk/news-alerts</strong> — Food Standards Agency allergy alerts and recalls.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">🇮🇳 India</p>
                  <p className="text-red-200 text-xs">
                    <strong className="text-white">fssai.gov.in</strong> — FSSAI product recalls and food safety orders.
                  </p>
                </div>
              </div>
              <p className="text-red-400/70 text-xs text-center pt-1">
                Prohibit any recalled product immediately — even if partially used. When in doubt, throw it out.
              </p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 mb-6 text-sm text-amber-800 leading-relaxed">
          <p className="font-semibold mb-1">Disclaimer</p>
          The information on this page is based on my personal experience as a mother and is intended for general informational purposes only. It does not constitute medical advice. This blog should not be treated as a source of truth — every pregnancy is different. Always consult your healthcare provider before making decisions about your pregnancy or your baby&apos;s health.
          <p className="font-semibold mt-3 mb-1">References</p>
          <ul className="list-disc list-inside space-y-1">
            <li><a href="https://www.acog.org" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">American College of Obstetricians and Gynecologists (ACOG)</a></li>
            <li><a href="https://www.cdc.gov/pregnancy" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">CDC — Pregnancy</a></li>
            <li><a href="https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/basics/healthy-pregnancy/hlv-20049471" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">Mayo Clinic — Healthy Pregnancy</a></li>
            <li><a href="https://www.healthline.com/health/pregnancy" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">Healthline — Pregnancy</a></li>
            <li><a href="https://www.whattoexpect.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">What to Expect</a></li>
            <li><a href="https://apps.apple.com/us/app/food-recalls-alerts/id1508680654" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">Food Recalls &amp; Alerts — App Store</a></li>
          </ul>
        </div>

        <div className="text-center py-8">
          <p className="text-4xl mb-3">🌷</p>
          <p className="text-gray-400 text-sm mt-1">You are stronger than you know. 💕</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="/" className="text-sm text-rose-400 hover:text-rose-600 transition-colors">← Home</Link>
            <span className="text-gray-300">·</span>
            <Link href="/posts/after-baby" className="text-sm text-fuchsia-500 hover:text-fuchsia-700 font-semibold transition-colors">Delivery &amp; Postpartum →</Link>
          </div>
          <p className="text-gray-300 text-xs mt-6">&copy; {new Date().getFullYear()} Janane Suresh. All rights reserved.</p>
        </div>
        </div>{/* end flex-1 content */}
      </div>{/* end flex wrapper */}
    </div>
  );
}
