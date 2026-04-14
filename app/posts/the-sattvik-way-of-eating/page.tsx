"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const SECTIONS = [
  {
    id: "cooking-methods",
    title: "Cooking Methods",
    emoji: "🍲",
    color: "emerald" as const,
    items: [
      "Steamed food is better than fried food",
      "Use clay pots for baking, simmering, roasting, frying — no leaching of metals",
      "Drink water stored in a copper vessel for 6–8 hrs — copper helps iron absorption, energizes thyroid and boosts metabolism",
      "Dry heat cooking (BBQ, grilling, roasting, baking, frying, sautéing, broiling) produces AGE (Advanced Glycation End Products) — excessive AGE causes diabetes, renal disease, neurodegenerative disease and cardiovascular disease",
      "Switch to moist heat cooking at low temperatures to fight AGE",
      "Consume Vitamin C and curcumin to fight AGE",
      "Moderate exercise helps fight AGE",
      "Capturing steam while cooking veggies is important to preserve moisture and nutrients",
      "Don't overcook food — it loses moisture",
      "Don't reheat food repeatedly — increases AGE and dehydrates the food",
    ],
  },
  {
    id: "kitchen-rules",
    title: "Kitchen Rules — Dos & Don'ts",
    emoji: "✅",
    color: "teal" as const,
    items: [
      "Wash and soak veggies before cutting",
      "Consume veggies within 30 mins of cutting",
      "Don't strain soup — drink as is",
      "Don't strain flour before kneading",
      "Don't reuse fried oil — it can be carcinogenic",
      "Don't use a microwave for cooking or reheating",
      "Don't use plastic containers for storing hot food — increases endocrine disruptors",
      "Reusing plastic boxes can increase carcinogens",
      "Non-stick pans and old aluminum vessels can make food carcinogenic",
      "Use measuring spoons for oil, sugar and salt — don't add directly",
      "Average salt intake per day should be 6 grams only",
      "Add salt at the end — boil veggies without salt",
      "Don't add lemon juice while cooking — heat destroys Vitamin C. Add just before serving",
      "Don't add sugar to fruits, juices or shakes",
      "Leftover food, dough, paneer or pulses stored in the fridge are not part of a Sattvik diet — increases GI distress",
      "Do not use refined flour — go for multigrain atta",
      "Don't sieve wheat atta — retain the bran",
      "Fresh ginger is more flavorful than dried ginger",
      "Add mint towards the end of cooking — it loses flavor at high heat",
      "Add lime juice at the end of cooking — do not heat with lemon juice for long",
      "Do not consume honey in hot foods — lukewarm is good to retain its properties",
      "Organic honey is better",
      "Plain walnuts are better than roasted walnuts",
      "Oats must be soaked for a minimum of 10 minutes",
      "Don't soak raw banana after cutting",
      "Cook soy granules well to reduce estrogenic effect",
      "Water used for soaking dal overnight should be discarded to reduce uric acid levels",
      "Don't add baking soda to cook chickpeas",
    ],
  },
  {
    id: "gravies",
    title: "Gravies & Healthy Substitutions",
    emoji: "🥘",
    color: "lime" as const,
    items: [
      "Replace corn flour with nut powder",
      "Include vegetables while cooking with oil and nuts to reduce fat content",
      "Instead of cashew paste in gravy, add watermelon juice for a creamy, low-fat gravy",
      "Use pumpkin seeds, sunflower seeds, watermelon seeds or sesame seeds to add volume to gravy",
      "Use blanched tomatoes for gravy",
      "Coriander with peanuts can be used for gravy",
      "Steamed spinach can be used for gravy",
      "Chickpea flour adds protein and soluble fiber to gravy",
      "Sunflower seeds can be ground and added to recipes for a creamy texture",
      "Dried mango powder can be used instead of chaat masala",
      "Use anchor instead of chaat masala for lower salt content",
      "Sorghum flour is gluten-free and can replace wheat flour — low calorie and good for IBS",
      "Boiled moong dal water can be added to dough preparation",
      "Replace refined flour with sorghum (cholam) — do not over-roast sorghum and barley powder for kanji",
    ],
  },
  {
    id: "vegetables",
    title: "Vegetables & Their Benefits",
    emoji: "🥦",
    color: "green" as const,
    items: [
      "Cluster beans — folic acid and Vitamin C, great for pregnant women; fiber helps with diabetes and weight loss",
      "Peanut/groundnut — prevents gallstones, protects against Alzheimer's, folate for pregnant women, magnesium reduces inflammation. Store in a glass jar; use less oil as they already contain fat",
      "French beans — folate prevents birth defects, antioxidant, good for bone health",
      "Carrots — improves eyesight, prevents constipation, reduces risk of cancer",
      "Black gram — plant-based protein, zinc and potassium; helps digestion, prevents anaemia, improves heart health",
      "Cabbage — best for pitta and kapha dosha. Vitamin C lowers cancer risk, high water content and fiber, lowers cholesterol. Add a pinch of cinnamon while cooking. Don't cover with lid initially — it contains sulfur and may cause bloating. Check for worms hidden in the leaves",
      "Broccoli — reduces cholesterol, lowers BP, reduces cancer risk. Steam but don't overcook. Add salt while steaming to brighten the color",
      "Coriander — reduces cholesterol and blood sugar, high soluble fiber, reduces urinary infection, rich in Vitamin C",
      "Pointed gourd — carbohydrate, Vitamin A and C, reduces cholesterol levels",
      "Bengal gram — plant-based protein, iron, folate, copper; prevents diabetes, rich in saponins (antioxidants)",
      "Turmeric — controls bad cholesterol (LDL), good source of minerals, potassium helps control heart rate and BP. Cook in water or milk — do not add raw turmeric to milk. Add black pepper for better absorption and fat burning",
      "Bitter gourd — fiber-rich, regulates blood sugar, high in Vitamin C and calcium, fights cancer, boosts immunity. Don't rub with salt — it increases sodium levels",
      "Colocasia — reduces BP, rich in fiber, Vitamin C, B, iron, potassium, phosphorus, magnesium. Cook well and remove thick veins from the center of the leaf",
      "Potato — gluten-free, maintains nerve functioning and bone health, improves blood sugar levels, fights toxins. Wash well and steam as a whole",
      "Pumpkin — rich in Vitamin A, C, E, iron, potassium, folate; high water content and fiber",
      "Drumsticks — battles cancer, high fiber, fights heart disease, improves digestion, strengthens bones, boosts immunity, improves kidney, liver and vision",
      "Raw banana — contains starch and pectin for blood sugar control; better digestion, high potassium supports muscle contractions. Don't soak after cutting",
      "Curry leaves — promotes GI health, treats diarrhoea, prevents diabetes, reduces cholesterol, rich in fiber and iron. Dry roast on tawa and add the powder to recipes",
      "Yam — rich in fiber, potassium, manganese; good for bone health, growth, metabolism and heart functioning",
      "Brinjal — high in fiber, manganese, potassium; reduces risk of heart disease and cancer, regulates blood sugar. Do NOT dry roast — reduces nutrients and increases dietary AGE",
      "Cauliflower — rich in flavonoids and antioxidants; prevents cancer, heart disease and neurodegenerative disease; high fiber",
      "Beetroot — raw beet has lower glycemic index than cooked. Beet juice reduces BP, improves metabolism and increases stamina",
      "Methi leaves — increases breast milk supply, aids in weight loss",
      "Bottle gourd — cut fresh and use directly. Do not rub with salt — it increases sodium levels",
    ],
  },
  {
    id: "spices",
    title: "Spices & Condiments",
    emoji: "🌶️",
    color: "amber" as const,
    items: [
      "Mustard oil — rich in monounsaturated fatty acids; omega-3 reduces inflammation and lowers BP; omega-6 reduces cancer and heart disease risk. Eliminates toxins, has Vitamin E",
      "Cumin seeds — beneficial for GI, reproductive, nervous and immune systems. Relieves flatulence, acts as metabolic stimulator. Store in a cool place to retain essential oils",
      "Rock salt — improves digestion; mineral bath relieves sore or cramped muscles",
      "Bay leaves — helps with digestive issues and diarrhoea, regulates glucose and cholesterol levels",
      "Ghee — improves digestion, reduces bowel problems, maintains immune system. Add with turmeric. Over-consumption elevates cholesterol",
      "Grind coriander seeds fresh for maximum absorption of essential oils",
      "Heating and grinding spices activates essential oils",
      "Sauté and temper nuts for a short time on medium flame only",
      "Mustard seeds have anti-microbial effect and help improve immunity — use daily",
      "Cardamom — add to tea to reduce sugar requirement. Is an antidote for both snake and scorpion venom",
      "Clove essential oil helps with arthritis, blisters, boils, burns, sexual dysfunction and morning sickness in pregnancy",
      "Don't consume too much nutmeg — can cause irregular heart palpitations and vomiting",
      "Star anise is an antiviral agent",
      "Sabja seeds are an alternative to chia seeds — reduces inflammation. Soak well for best effects",
      "Basil seeds should be soaked well for best effects",
      "Adding cardamom to tea helps reduce the requirement of sugar",
      "Pigeon pea (toor dal) — soak for 3 hours, discard water to reduce bloating and lower uric acid. Consume in the afternoon",
    ],
  },
  {
    id: "fruits",
    title: "Fruits",
    emoji: "🍎",
    color: "rose" as const,
    items: [
      "Mango — low calorie, rich in Vitamin A, C, B6, iron, calcium, zinc, Vitamin E; promotes healthy skin and hair. Diabetics should not have more than one mango. Don't eat with meals — raises sugar levels",
      "Jaggery — rich in iron, folate; prevents anaemia, treats menstrual problems, rich in zinc and selenium",
      "Yoghurt — rich in calcium, probiotic, reduces BP and cholesterol",
      "Strawberry — has cancer-fighting properties",
      "Watermelon — low GI, safe for diabetics. Don't strain the juice",
      "Pomegranate — consume along with the white rind",
      "Ripe bananas are better for people with diarrhoea",
      "Melons — high in magnesium and act as a sleep inducer",
      "Tomato — raw, cooked and blanched all contain lycopene which acts as an anti-cancer agent",
      "Soaking black raisins and consuming them in the morning reduces constipation. Same for prunes",
      "When storing cut apples, apply lemon juice to avoid discoloration",
    ],
  },
  {
    id: "other",
    title: "Other Wellness Tips",
    emoji: "💡",
    color: "sky" as const,
    items: [
      "Butter should not be heated at high temperature — it has a low smoke point and contains saturated fatty acids",
      "Adding lemon to green leafy vegetables increases iron absorption in the body",
      "Peel cucumber to avoid bitterness",
      "Rock sugar stalks nose bleeds immediately — consuming pieces with water will stop the bleeding",
      "Don't strain soup — drink as is to retain all nutrients",
    ],
  },
];

const COLORS = {
  emerald: {
    bg: "bg-emerald-50", border: "border-emerald-200", heading: "text-emerald-700",
    progress: "bg-emerald-400", progressBg: "bg-emerald-100", check: "accent-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  teal: {
    bg: "bg-teal-50", border: "border-teal-200", heading: "text-teal-700",
    progress: "bg-teal-400", progressBg: "bg-teal-100", check: "accent-teal-500",
    badge: "bg-teal-100 text-teal-700",
  },
  lime: {
    bg: "bg-lime-50", border: "border-lime-200", heading: "text-lime-700",
    progress: "bg-lime-400", progressBg: "bg-lime-100", check: "accent-lime-500",
    badge: "bg-lime-100 text-lime-700",
  },
  green: {
    bg: "bg-green-50", border: "border-green-200", heading: "text-green-700",
    progress: "bg-green-500", progressBg: "bg-green-100", check: "accent-green-500",
    badge: "bg-green-100 text-green-700",
  },
  amber: {
    bg: "bg-amber-50", border: "border-amber-200", heading: "text-amber-700",
    progress: "bg-amber-400", progressBg: "bg-amber-100", check: "accent-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  rose: {
    bg: "bg-rose-50", border: "border-rose-200", heading: "text-rose-700",
    progress: "bg-rose-400", progressBg: "bg-rose-100", check: "accent-rose-500",
    badge: "bg-rose-100 text-rose-700",
  },
  sky: {
    bg: "bg-sky-50", border: "border-sky-200", heading: "text-sky-700",
    progress: "bg-sky-400", progressBg: "bg-sky-100", check: "accent-sky-500",
    badge: "bg-sky-100 text-sky-700",
  },
};

const NUTRIENT_TABLE = [
  {
    nutrient: "Iron",
    emoji: "🩸",
    color: "red",
    benefit: "Prevents anaemia, boosts energy & oxygen transport",
    foods: [
      { name: "Black Gram", pic: "🫘" },
      { name: "Cluster Beans", pic: "🫛" },
      { name: "Curry Leaves", pic: "🌿" },
      { name: "Drumsticks", pic: "🪴" },
      { name: "Jaggery", pic: "🟫" },
      { name: "Broccoli", pic: "🥦" },
      { name: "Colocasia", pic: "🍃" },
      { name: "Pumpkin", pic: "🎃" },
      { name: "French Beans", pic: "🫘" },
    ],
  },
  {
    nutrient: "Vitamin C",
    emoji: "🍊",
    color: "orange",
    benefit: "Boosts immunity, aids iron absorption, fights free radicals",
    foods: [
      { name: "Broccoli", pic: "🥦" },
      { name: "Bitter Gourd", pic: "🥒" },
      { name: "Cabbage", pic: "🥬" },
      { name: "Cauliflower", pic: "🥦" },
      { name: "Coriander", pic: "🌿" },
      { name: "Cluster Beans", pic: "🫛" },
      { name: "Pumpkin", pic: "🎃" },
      { name: "Strawberry", pic: "🍓" },
      { name: "Colocasia", pic: "🍃" },
    ],
  },
  {
    nutrient: "Fiber",
    emoji: "🌾",
    color: "lime",
    benefit: "Improves digestion, lowers cholesterol, stabilises blood sugar",
    foods: [
      { name: "Cluster Beans", pic: "🫛" },
      { name: "Bitter Gourd", pic: "🥒" },
      { name: "Brinjal", pic: "🍆" },
      { name: "Cabbage", pic: "🥬" },
      { name: "Cauliflower", pic: "🥦" },
      { name: "Drumsticks", pic: "🪴" },
      { name: "Raw Banana", pic: "🍌" },
      { name: "Curry Leaves", pic: "🌿" },
      { name: "Yam", pic: "🍠" },
      { name: "Pumpkin", pic: "🎃" },
      { name: "Pigeon Pea", pic: "🫘" },
    ],
  },
  {
    nutrient: "Plant Protein",
    emoji: "💪",
    color: "green",
    benefit: "Muscle repair, cell growth, sustained energy",
    foods: [
      { name: "Black Gram", pic: "🫘" },
      { name: "Bengal Gram", pic: "🫘" },
      { name: "Chickpea Flour", pic: "🟡" },
      { name: "Peanut", pic: "🥜" },
      { name: "Pigeon Pea", pic: "🫘" },
    ],
  },
  {
    nutrient: "Folate",
    emoji: "🤰",
    color: "pink",
    benefit: "Essential during pregnancy, prevents birth defects, cell growth",
    foods: [
      { name: "Cluster Beans", pic: "🫛" },
      { name: "French Beans", pic: "🫘" },
      { name: "Peanut", pic: "🥜" },
      { name: "Bengal Gram", pic: "🫘" },
      { name: "Mango", pic: "🥭" },
      { name: "Jaggery", pic: "🟫" },
      { name: "Pumpkin", pic: "🎃" },
    ],
  },
  {
    nutrient: "Blood Sugar Control",
    emoji: "🩺",
    color: "blue",
    benefit: "Regulates glucose levels, prevents diabetes spikes",
    foods: [
      { name: "Bitter Gourd", pic: "🥒" },
      { name: "Coriander", pic: "🌿" },
      { name: "Bengal Gram", pic: "🫘" },
      { name: "Brinjal", pic: "🍆" },
      { name: "Raw Banana", pic: "🍌" },
      { name: "Watermelon", pic: "🍉" },
      { name: "Beetroot", pic: "🟣" },
      { name: "Curry Leaves", pic: "🌿" },
      { name: "Potato", pic: "🥔" },
      { name: "Bay Leaves", pic: "🍃" },
    ],
  },
  {
    nutrient: "Cholesterol Reduction",
    emoji: "❤️",
    color: "rose",
    benefit: "Protects heart health, lowers LDL (bad cholesterol)",
    foods: [
      { name: "Coriander", pic: "🌿" },
      { name: "Cabbage", pic: "🥬" },
      { name: "Broccoli", pic: "🥦" },
      { name: "Turmeric", pic: "🟡" },
      { name: "Bitter Gourd", pic: "🥒" },
      { name: "Curry Leaves", pic: "🌿" },
      { name: "Beetroot", pic: "🟣" },
      { name: "Yoghurt", pic: "🥛" },
      { name: "Mustard Oil", pic: "🫙" },
      { name: "Pointed Gourd", pic: "🥒" },
    ],
  },
  {
    nutrient: "Antioxidants",
    emoji: "✨",
    color: "purple",
    benefit: "Fights cancer cells, slows ageing, reduces inflammation",
    foods: [
      { name: "Bengal Gram", pic: "🫘" },
      { name: "Cauliflower", pic: "🥦" },
      { name: "Tomato", pic: "🍅" },
      { name: "Strawberry", pic: "🍓" },
      { name: "Turmeric", pic: "🟡" },
      { name: "Coriander", pic: "🌿" },
      { name: "Mustard Seeds", pic: "🟤" },
      { name: "Drumsticks", pic: "🪴" },
    ],
  },
  {
    nutrient: "Potassium",
    emoji: "⚡",
    color: "yellow",
    benefit: "Regulates BP, heart rate & muscle contractions",
    foods: [
      { name: "Colocasia", pic: "🍃" },
      { name: "Pumpkin", pic: "🎃" },
      { name: "Potato", pic: "🥔" },
      { name: "Yam", pic: "🍠" },
      { name: "Black Gram", pic: "🫘" },
      { name: "Turmeric", pic: "🟡" },
      { name: "Raw Banana", pic: "🍌" },
    ],
  },
  {
    nutrient: "Anti-Inflammatory",
    emoji: "🌊",
    color: "teal",
    benefit: "Reduces body inflammation, supports joint & immune health",
    foods: [
      { name: "Mustard Oil", pic: "🫙" },
      { name: "Sabja Seeds", pic: "🌱" },
      { name: "Turmeric", pic: "🟡" },
      { name: "Peanut", pic: "🥜" },
      { name: "Clove", pic: "🌰" },
      { name: "Star Anise", pic: "⭐" },
      { name: "Broccoli", pic: "🥦" },
    ],
  },
  {
    nutrient: "Calcium & Bone Health",
    emoji: "🦴",
    color: "sky",
    benefit: "Strengthens bones & teeth, supports muscle function",
    foods: [
      { name: "Bitter Gourd", pic: "🥒" },
      { name: "Yoghurt", pic: "🥛" },
      { name: "French Beans", pic: "🫘" },
      { name: "Drumsticks", pic: "🪴" },
      { name: "Colocasia", pic: "🍃" },
      { name: "Yam", pic: "🍠" },
    ],
  },
  {
    nutrient: "Magnesium",
    emoji: "😴",
    color: "indigo",
    benefit: "Promotes sleep, reduces inflammation, supports nerve function",
    foods: [
      { name: "Peanut", pic: "🥜" },
      { name: "Melon", pic: "🍈" },
      { name: "Beetroot", pic: "🟣" },
      { name: "Colocasia", pic: "🍃" },
      { name: "Pumpkin Seeds", pic: "🌰" },
    ],
  },
];

const NUTRIENT_COLORS: Record<string, { bg: string; border: string; heading: string; badge: string; dot: string }> = {
  red:    { bg: "bg-red-50",    border: "border-red-200",    heading: "text-red-700",    badge: "bg-red-100 text-red-700",    dot: "bg-red-400" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", heading: "text-orange-700", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  lime:   { bg: "bg-lime-50",   border: "border-lime-200",   heading: "text-lime-700",   badge: "bg-lime-100 text-lime-700",   dot: "bg-lime-400" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  heading: "text-green-700",  badge: "bg-green-100 text-green-700",  dot: "bg-green-500" },
  pink:   { bg: "bg-pink-50",   border: "border-pink-200",   heading: "text-pink-700",   badge: "bg-pink-100 text-pink-700",   dot: "bg-pink-400" },
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   heading: "text-blue-700",   badge: "bg-blue-100 text-blue-700",   dot: "bg-blue-400" },
  rose:   { bg: "bg-rose-50",   border: "border-rose-200",   heading: "text-rose-700",   badge: "bg-rose-100 text-rose-700",   dot: "bg-rose-400" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", heading: "text-purple-700", badge: "bg-purple-100 text-purple-700", dot: "bg-purple-400" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-200", heading: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
  teal:   { bg: "bg-teal-50",   border: "border-teal-200",   heading: "text-teal-700",   badge: "bg-teal-100 text-teal-700",   dot: "bg-teal-400" },
  sky:    { bg: "bg-sky-50",    border: "border-sky-200",    heading: "text-sky-700",    badge: "bg-sky-100 text-sky-700",    dot: "bg-sky-400" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", heading: "text-indigo-700", badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-400" },
};

const STORAGE_KEY = "sattvik-way-checks";

export default function SattvikPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"nutrients" | "tips">("nutrients");

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

  function resetSection(id: string, items: string[]) {
    setChecked((prev) => {
      const next = { ...prev };
      items.forEach((_, i) => { next[`${id}-${i}`] = false; });
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const totalItems = SECTIONS.reduce((a, s) => a + s.items.length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((totalChecked / totalItems) * 100);

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 text-white px-4 py-14 text-center">
        <p className="text-emerald-100 text-sm font-semibold tracking-widest uppercase mb-3">
          Femi9 Power
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow">
          The Sattvik Way of Eating 🌿
        </h1>
        <p className="max-w-xl mx-auto text-emerald-100 text-base leading-relaxed mb-4">
          Ancient wisdom from the Sattvik kitchen — pure, wholesome practices for a healthier, more vibrant life.
        </p>

        {/* Overall progress */}
        <div className="mt-6 max-w-sm mx-auto bg-white/20 rounded-2xl p-4">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span>Tips adopted</span>
            <span>{totalChecked} / {totalItems}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-right text-xs mt-1 text-emerald-100">{overallPct}% adopted</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <Link href="/" className="text-sm text-emerald-600 hover:text-emerald-800 transition-colors mb-6 inline-block">
          ← Back to all posts
        </Link>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white border border-gray-200 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab("nutrients")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "nutrients" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            🥗 Nutrient Guide
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "tips" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            ✅ Tips & Checklist
          </button>
        </div>

        {/* Nutrient Table */}
        {activeTab === "nutrients" && (
          <div>
            <p className="text-sm text-gray-500 mb-6">Foods grouped by their key nutrients — tap any card to explore.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {NUTRIENT_TABLE.map((n) => {
                const c = NUTRIENT_COLORS[n.color];
                return (
                  <div key={n.nutrient} className={`rounded-2xl border ${c.border} ${c.bg} p-5 flex flex-col`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{n.emoji}</span>
                      <div>
                        <h2 className={`font-bold text-base ${c.heading}`}>{n.nutrient}</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">{n.benefit}</p>
                      </div>
                    </div>
                    <div className="mt-auto grid grid-cols-4 gap-2">
                      {n.foods.map((food) => (
                        <div key={food.name} className="flex flex-col items-center bg-white/70 rounded-xl py-3 px-1 text-center border border-white shadow-sm">
                          <span className="text-3xl mb-1">{food.pic}</span>
                          <span className="text-xs text-gray-600 font-medium leading-tight">{food.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer under nutrient tab */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 mt-6 text-sm text-amber-800 leading-relaxed">
              <p className="font-semibold mb-1">Disclaimer</p>
              This guide is based on personal experience and the Sattvik kitchen tradition for general informational purposes only. Always consult your healthcare provider before making significant dietary changes.
            </div>
            <div className="text-center py-8">
              <p className="text-gray-300 text-xs">&copy; {new Date().getFullYear()} Janane Suresh. All rights reserved.</p>
            </div>
          </div>
        )}

        {activeTab === "tips" && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{SECTIONS.map((section) => {
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
                  <p className={`text-xs font-semibold ${c.heading}`}>All adopted! 🎉</p>
                ) : (
                  <p className="text-xs text-gray-400">{section.items.length - sectionChecked} remaining</p>
                )}
                {sectionChecked > 0 && (
                  <button
                    onClick={() => resetSection(section.id, section.items)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          );
        })}</div>}

        {activeTab === "tips" && <>
        {/* Disclaimer */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 mb-6 text-sm text-amber-800 leading-relaxed">
          <p className="font-semibold mb-1">Disclaimer</p>
          The information on this page is based on personal experience and the Sattvik kitchen tradition. It is intended for general informational purposes only and does not constitute medical or nutritional advice. Always consult your healthcare provider before making significant changes to your diet.
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-emerald-600 font-semibold text-lg">Nourish your body. Radiate strength.</p>
          <p className="text-gray-400 text-sm mt-1">Femi9 Power — Live Powerfully. 💚</p>
          <Link href="/" className="mt-6 inline-block text-sm text-emerald-500 hover:text-emerald-700 transition-colors">
            ← Back to all posts
          </Link>
          <p className="text-gray-300 text-xs mt-6">&copy; {new Date().getFullYear()} Janane Suresh. All rights reserved.</p>
        </div>
        </>}
      </div>
    </div>
  );
}
