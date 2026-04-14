export interface SearchItem {
  id: string;
  text: string;
  section: string;
  sectionEmoji: string;
  post: string;
  postSlug: string;
  postEmoji: string;
}

const SATTVIK_DATA: Omit<SearchItem, "id" | "post" | "postSlug" | "postEmoji">[] = [
  // Cooking Methods
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Steamed food is better than fried food" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Use clay pots for baking, simmering, roasting, frying — no leaching of metals" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Drink water stored in a copper vessel for 6–8 hrs — copper helps iron absorption, energizes thyroid and boosts metabolism" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Dry heat cooking (BBQ, grilling, roasting, baking, frying, sautéing, broiling) produces AGE (Advanced Glycation End Products) — excessive AGE causes diabetes, renal disease, neurodegenerative disease and cardiovascular disease" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Switch to moist heat cooking at low temperatures to fight AGE" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Consume Vitamin C and curcumin to fight AGE" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Moderate exercise helps fight AGE" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Capturing steam while cooking veggies is important to preserve moisture and nutrients" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Don't overcook food — it loses moisture" },
  { section: "Cooking Methods", sectionEmoji: "🍲", text: "Don't reheat food repeatedly — increases AGE and dehydrates the food" },
  // Kitchen Rules
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Wash and soak veggies before cutting" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Consume veggies within 30 mins of cutting" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't strain soup — drink as is" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't strain flour before kneading" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't reuse fried oil — it can be carcinogenic" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't use a microwave for cooking or reheating" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't use plastic containers for storing hot food — increases endocrine disruptors" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Reusing plastic boxes can increase carcinogens" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Non-stick pans and old aluminum vessels can make food carcinogenic" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Use measuring spoons for oil, sugar and salt — don't add directly" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Average salt intake per day should be 6 grams only" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Add salt at the end — boil veggies without salt" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't add lemon juice while cooking — heat destroys Vitamin C. Add just before serving" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't add sugar to fruits, juices or shakes" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Leftover food, dough, paneer or pulses stored in the fridge are not part of a Sattvik diet — increases GI distress" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Do not use refined flour — go for multigrain atta" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't sieve wheat atta — retain the bran" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Fresh ginger is more flavorful than dried ginger" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Add mint towards the end of cooking — it loses flavor at high heat" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Add lime juice at the end of cooking — do not heat with lemon juice for long" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Do not consume honey in hot foods — lukewarm is good to retain its properties" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Organic honey is better" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Plain walnuts are better than roasted walnuts" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Oats must be soaked for a minimum of 10 minutes" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't soak raw banana after cutting" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Cook soy granules well to reduce estrogenic effect" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Water used for soaking dal overnight should be discarded to reduce uric acid levels" },
  { section: "Kitchen Rules", sectionEmoji: "✅", text: "Don't add baking soda to cook chickpeas" },
  // Gravies
  { section: "Gravies & Substitutions", sectionEmoji: "🥘", text: "Replace corn flour with nut powder" },
  { section: "Gravies & Substitutions", sectionEmoji: "🥘", text: "Instead of cashew paste in gravy, add watermelon juice for a creamy, low-fat gravy" },
  { section: "Gravies & Substitutions", sectionEmoji: "🥘", text: "Use pumpkin seeds, sunflower seeds, watermelon seeds or sesame seeds to add volume to gravy" },
  { section: "Gravies & Substitutions", sectionEmoji: "🥘", text: "Chickpea flour adds protein and soluble fiber to gravy" },
  { section: "Gravies & Substitutions", sectionEmoji: "🥘", text: "Sunflower seeds can be ground and added to recipes for a creamy texture" },
  { section: "Gravies & Substitutions", sectionEmoji: "🥘", text: "Dried mango powder can be used instead of chaat masala" },
  { section: "Gravies & Substitutions", sectionEmoji: "🥘", text: "Sorghum flour is gluten-free and can replace wheat flour — low calorie and good for IBS" },
  { section: "Gravies & Substitutions", sectionEmoji: "🥘", text: "Boiled moong dal water can be added to dough preparation" },
  // Vegetables
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Cluster beans — folic acid and Vitamin C, great for pregnant women; fiber helps with diabetes and weight loss" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Peanut/groundnut — prevents gallstones, protects against Alzheimer's, folate for pregnant women, magnesium reduces inflammation" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "French beans — folate prevents birth defects, antioxidant, good for bone health" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Carrots — improves eyesight, prevents constipation, reduces risk of cancer" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Black gram — plant-based protein, zinc and potassium; helps digestion, prevents anaemia, improves heart health" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Cabbage — best for pitta and kapha dosha. Vitamin C lowers cancer risk, high water content and fiber, lowers cholesterol" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Broccoli — reduces cholesterol, lowers BP, reduces cancer risk. Steam but don't overcook" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Coriander — reduces cholesterol and blood sugar, high soluble fiber, reduces urinary infection, rich in Vitamin C" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Pointed gourd — carbohydrate, Vitamin A and C, reduces cholesterol levels" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Bengal gram — plant-based protein, iron, folate, copper; prevents diabetes, rich in saponins (antioxidants)" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Turmeric — controls bad cholesterol (LDL), good source of minerals, potassium helps control heart rate and BP. Add black pepper for better absorption and fat burning" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Bitter gourd — fiber-rich, regulates blood sugar, high in Vitamin C and calcium, fights cancer, boosts immunity" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Colocasia — reduces BP, rich in fiber, Vitamin C, B, iron, potassium, phosphorus, magnesium" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Potato — gluten-free, maintains nerve functioning and bone health, improves blood sugar levels, fights toxins" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Pumpkin — rich in Vitamin A, C, E, iron, potassium, folate; high water content and fiber" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Drumsticks — battles cancer, high fiber, fights heart disease, improves digestion, strengthens bones, boosts immunity, improves kidney, liver and vision" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Raw banana — contains starch and pectin for blood sugar control; better digestion, high potassium supports muscle contractions" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Curry leaves — promotes GI health, treats diarrhoea, prevents diabetes, reduces cholesterol, rich in fiber and iron" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Yam — rich in fiber, potassium, manganese; good for bone health, growth, metabolism and heart functioning" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Brinjal — high in fiber, manganese, potassium; reduces risk of heart disease and cancer, regulates blood sugar" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Cauliflower — rich in flavonoids and antioxidants; prevents cancer, heart disease and neurodegenerative disease; high fiber" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Beetroot — raw beet has lower glycemic index than cooked. Beet juice reduces BP, improves metabolism and increases stamina" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Methi leaves — increases breast milk supply, aids in weight loss" },
  { section: "Vegetables & Their Benefits", sectionEmoji: "🥦", text: "Bottle gourd — cut fresh and use directly. Do not rub with salt — it increases sodium levels" },
  // Spices
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Mustard oil — rich in monounsaturated fatty acids; omega-3 reduces inflammation and lowers BP; omega-6 reduces cancer and heart disease risk" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Cumin seeds — beneficial for GI, reproductive, nervous and immune systems. Relieves flatulence, acts as metabolic stimulator" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Rock salt — improves digestion; mineral bath relieves sore or cramped muscles" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Bay leaves — helps with digestive issues and diarrhoea, regulates glucose and cholesterol levels" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Ghee — improves digestion, reduces bowel problems, maintains immune system. Add with turmeric. Over-consumption elevates cholesterol" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Mustard seeds have anti-microbial effect and help improve immunity — use daily" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Cardamom — add to tea to reduce sugar requirement. Is an antidote for both snake and scorpion venom" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Clove essential oil helps with arthritis, blisters, boils, burns, sexual dysfunction and morning sickness in pregnancy" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Star anise is an antiviral agent" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Sabja seeds are an alternative to chia seeds — reduces inflammation. Soak well for best effects" },
  { section: "Spices & Condiments", sectionEmoji: "🌶️", text: "Pigeon pea (toor dal) — soak for 3 hours, discard water to reduce bloating and lower uric acid. Consume in the afternoon" },
  // Fruits
  { section: "Fruits", sectionEmoji: "🍎", text: "Mango — low calorie, rich in Vitamin A, C, B6, iron, calcium, zinc, Vitamin E; promotes healthy skin and hair. Diabetics should not have more than one mango" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Jaggery — rich in iron, folate; prevents anaemia, treats menstrual problems, rich in zinc and selenium" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Yoghurt — rich in calcium, probiotic, reduces BP and cholesterol" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Strawberry — has cancer-fighting properties" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Watermelon — low GI, safe for diabetics. Don't strain the juice" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Pomegranate — consume along with the white rind" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Ripe bananas are better for people with diarrhoea" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Melons — high in magnesium and act as a sleep inducer" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Tomato — raw, cooked and blanched all contain lycopene which acts as an anti-cancer agent" },
  { section: "Fruits", sectionEmoji: "🍎", text: "Soaking black raisins and consuming in the morning reduces constipation. Same for prunes" },
  // Other
  { section: "Other Wellness Tips", sectionEmoji: "💡", text: "Butter should not be heated at high temperature — it has a low smoke point and contains saturated fatty acids" },
  { section: "Other Wellness Tips", sectionEmoji: "💡", text: "Adding lemon to green leafy vegetables increases iron absorption in the body" },
  { section: "Other Wellness Tips", sectionEmoji: "💡", text: "Rock sugar stops nose bleeds immediately — consuming pieces with water will stop the bleeding" },
];

const PREGNANCY_DATA: Omit<SearchItem, "id" | "post" | "postSlug" | "postEmoji">[] = [
  { section: "Pregnancy Reminders", sectionEmoji: "🤰", text: "Avoid unpasteurized eggs, dairy, and cheese" },
  { section: "Pregnancy Reminders", sectionEmoji: "🤰", text: "Skip raw sprouts or undercooked food (well-cooked sprouts are fine)" },
  { section: "Pregnancy Reminders", sectionEmoji: "🤰", text: "Avoid ibuprofen or aspirin — follow your doctor's safe medication list" },
  { section: "Pregnancy Reminders", sectionEmoji: "🤰", text: "Avoid skincare with retinol, benzoyl peroxide, hydroquinone, or salicylic acid" },
  { section: "Pregnancy Reminders", sectionEmoji: "🤰", text: "Avoid rosemary oil — even topical applications" },
  { section: "Pregnancy Reminders", sectionEmoji: "🤰", text: "Use mineral sunscreen instead of chemical sunscreen" },
  { section: "Hospital Bag — For Mom", sectionEmoji: "👜", text: "Birth ball — extremely useful during labor" },
  { section: "Hospital Bag — For Mom", sectionEmoji: "👜", text: "Electric heating pad for pain management" },
  { section: "Hospital Bag — For Mom", sectionEmoji: "👜", text: "Nursing bra — very useful" },
  { section: "Hospital Bag — For Mom", sectionEmoji: "👜", text: "Snacks and juice — stay absolutely hydrated!" },
  { section: "Postpartum Essentials", sectionEmoji: "💜", text: "Fennel seed water helps with lactation" },
  { section: "Postpartum Essentials", sectionEmoji: "💜", text: "Postpartum waistband — wear continuously for first 40 days to support abdomen" },
  { section: "Nursing", sectionEmoji: "🤱", text: "Vitamin D drops must be given to babies — does not pass through breast milk" },
  { section: "Nursing", sectionEmoji: "🤱", text: "Double electric breast pump is ideal — most insurance covers it" },
  { section: "Baby Essentials", sectionEmoji: "👶", text: "Pampers Sensitive diapers recommended — get ~500 newborn + Size 1 in stock" },
  { section: "Baby Essentials", sectionEmoji: "👶", text: "White noise machine helps soothe baby to sleep" },
  { section: "Pumping Strategy", sectionEmoji: "🕐", text: "Pump every less than 3 hours — 9–10 times a day" },
  { section: "Pumping Strategy", sectionEmoji: "🕐", text: "From 4th day — minimum 8 oz per session" },
];

const STOP_WORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","have","has","had",
  "do","does","did","will","would","could","should","may","might","shall","can",
  "what","which","who","whom","when","where","why","how","and","but","or","nor",
  "for","so","yet","at","by","in","of","on","to","up","as","if","it","its",
  "this","that","these","those","with","from","into","about","help","helps",
  "good","great","best","better","foods","food","eat","eating","good","i","me",
]);

function buildIndex(): SearchItem[] {
  const sattvik = SATTVIK_DATA.map((item, i) => ({
    ...item,
    id: `sattvik-${i}`,
    post: "The Sattvik Way of Eating",
    postSlug: "/posts/the-sattvik-way-of-eating",
    postEmoji: "🌿",
  }));

  const pregnancy = PREGNANCY_DATA.map((item, i) => ({
    ...item,
    id: `pregnancy-${i}`,
    post: "Hey Pregnant Mama",
    postSlug: "/posts/hey-pregnant-mama",
    postEmoji: "🤰",
  }));

  return [...sattvik, ...pregnancy];
}

export const SEARCH_INDEX = buildIndex();

export function search(query: string): SearchItem[] {
  if (!query.trim()) return [];

  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  if (words.length === 0) return [];

  const scored = SEARCH_INDEX.map((item) => {
    const text = item.text.toLowerCase();
    const section = item.section.toLowerCase();
    let score = 0;
    for (const word of words) {
      if (text.includes(word)) score += 2;
      if (section.includes(word)) score += 1;
    }
    return { item, score };
  });

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r) => r.item);
}
