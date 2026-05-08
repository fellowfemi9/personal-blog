import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import NavDrawer from "@/app/components/NavDrawer";
import CommentsSection from "@/app/components/CommentsSection";
import AskFemi9 from "@/app/components/AskFemi9";

const POSTS = [
  {
    href: "/posts/hey-pregnant-mama",
    title: "Hey Pregnant Mama",
    description: "Your guide through pregnancy — month-by-month milestones, safe fitness, yoga by trimester, vaccines, and everything to do before baby arrives.",
    tag: "Pregnancy",
    gradient: "from-rose-600 via-pink-500 to-fuchsia-500",
    tagBg: "bg-rose-50 text-rose-600 border border-rose-200",
    accent: "group-hover:text-rose-600",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <circle cx="20" cy="14" r="7" fill="white" fillOpacity="0.25"/>
        <ellipse cx="20" cy="30" rx="11" ry="8" fill="white" fillOpacity="0.2"/>
        <circle cx="20" cy="14" r="4" fill="white" fillOpacity="0.5"/>
      </svg>
    ),
  },
  {
    href: "/posts/after-baby",
    title: "Delivery & Postpartum",
    description: "Hospital bag checklists, postpartum recovery, breastfeeding & pumping strategy, baby essentials, and your newborn's first months.",
    tag: "Delivery & Postpartum",
    gradient: "from-fuchsia-600 via-purple-500 to-violet-500",
    tagBg: "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200",
    accent: "group-hover:text-fuchsia-600",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <circle cx="20" cy="20" r="10" fill="white" fillOpacity="0.2"/>
        <path d="M14 20 C14 15 26 15 26 20 C26 26 14 26 14 20Z" fill="white" fillOpacity="0.35"/>
        <circle cx="16" cy="18" r="1.5" fill="white" fillOpacity="0.6"/>
        <circle cx="24" cy="18" r="1.5" fill="white" fillOpacity="0.6"/>
        <path d="M16 23 Q20 26 24 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" fillOpacity="0.7"/>
      </svg>
    ),
  },
  {
    href: "/posts/the-sattvik-way-of-eating",
    title: "The Sattvik Way of Eating",
    description: "Ancient Sattvik kitchen wisdom — nutrient guides, cooking methods, and wellness tips for a cleaner, more powerful life.",
    tag: "Nutrition & Wellness",
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
    tagBg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    accent: "group-hover:text-emerald-600",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <path d="M20 6 C14 12 8 18 12 26 C16 34 24 34 28 26 C32 18 26 12 20 6Z" fill="white" fillOpacity="0.3"/>
        <path d="M20 10 C17 15 14 20 16 25 C18 30 22 30 24 25 C26 20 23 15 20 10Z" fill="white" fillOpacity="0.4"/>
      </svg>
    ),
  },
  {
    href: "/posts/traveling-with-a-newborn",
    title: "Traveling with a Newborn",
    description: "The complete power-move guide to domestic travel with a newborn — car and flight packing lists, TSA rules, safety warnings, and pro tips.",
    tag: "Travel & Logistics",
    gradient: "from-sky-600 via-blue-500 to-violet-500",
    tagBg: "bg-sky-50 text-sky-700 border border-sky-200",
    accent: "group-hover:text-sky-600",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <path d="M8 26 L20 10 L32 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" fillOpacity="0.4"/>
        <circle cx="20" cy="28" r="4" fill="white" fillOpacity="0.35"/>
        <path d="M4 30 L36 30" stroke="white" strokeWidth="2" strokeLinecap="round" fillOpacity="0.3"/>
      </svg>
    ),
  },
  {
    href: "/posts/babys-first-year",
    title: "Baby's First Year",
    description: "Month-by-month milestones, feeding guidance, safe sleep practices, health & safety checklists, and parenting wellbeing for your baby's first 12 months.",
    tag: "Baby's First Year",
    gradient: "from-amber-500 via-yellow-400 to-orange-400",
    tagBg: "bg-amber-50 text-amber-700 border border-amber-200",
    accent: "group-hover:text-amber-600",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
        <circle cx="20" cy="16" r="8" fill="white" fillOpacity="0.25"/>
        <circle cx="20" cy="16" r="4" fill="white" fillOpacity="0.45"/>
        <path d="M13 28 C13 24 27 24 27 28" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" fillOpacity="0.4"/>
        <path d="M16 31 C16 29.5 24 29.5 24 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" fillOpacity="0.3"/>
      </svg>
    ),
  },
];

const PILLARS = [
  { label: "Motherhood", color: "bg-rose-500" },
  { label: "Nutrition", color: "bg-emerald-500" },
  { label: "Wellness", color: "bg-violet-500" },
  { label: "Strength", color: "bg-amber-500" },
];

const STATIC_SLUGS = ["hey-pregnant-mama", "after-baby", "the-sattvik-way-of-eating", "traveling-with-a-newborn"];

export default async function Home() {
  const dynamicPosts = await getAllPostsMeta();
  const dynamicFiltered = dynamicPosts.filter((p) => !STATIC_SLUGS.includes(p.slug));

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#f7f5f9" }}>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/5" style={{ background: "rgba(10, 4, 20, 0.97)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavDrawer />
          <h1
            className="text-2xl md:text-3xl font-black tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background: "linear-gradient(90deg, #FFE566 0%, #FFD700 40%, #F0A820 70%, #FFE566 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 14px rgba(255,210,0,0.5))",
            }}
          >
            Femi9 Power
          </h1>
          <div className="w-32 hidden sm:block" />
        </div>
      </header>

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A0414 0%, #1E0733 20%, #4A1060 45%, #7B1FA2 65%, #AD2C6C 82%, #C2410C 100%)",
          minHeight: "360px",
        }}
      >
        <div className="absolute -top-20 -left-20 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(192,38,211,0.25) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-16 -right-16 w-[440px] h-[440px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.22) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <span className="inline-block text-amber-400 text-xs font-bold tracking-[0.35em] uppercase mb-6 border border-amber-400/30 px-3 py-1 rounded-full">
            Femi9 Power
          </span>
          <h2
            className="font-black leading-[1.05] mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #f0d9ff 50%, #ffd580 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Strong.<br />Curious.<br />Unapologetic.
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
            For women who are many things at once — and refuse to shrink any of them.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {PILLARS.map((p) => (
              <span key={p.label} className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${p.color} bg-opacity-80`}>
                {p.label}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #f7f5f9)" }} />
      </div>

      {/* ── POSTS ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex items-center gap-4 mb-12">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-1">Guides & Stories</p>
            <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              What&apos;s Inside
            </h2>
          </div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #7C3AED40, transparent)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-7">
          {POSTS.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 hover:border-transparent"
            >
              <div className={`relative h-28 bg-gradient-to-br ${post.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 0%, transparent 60%)" }} />
                {post.icon}
              </div>
              <div className="p-7">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${post.tagBg}`}>
                  {post.tag}
                </span>
                <h3
                  className={`text-xl font-black text-gray-900 mb-2 transition-colors ${post.accent}`}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{post.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 border-b-2 border-current pb-0.5 group-hover:gap-3 transition-all">
                  Dive in <span>→</span>
                </span>
              </div>
            </Link>
          ))}

          {dynamicFiltered.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 hover:border-transparent"
            >
              <div className="relative h-28 bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 0%, transparent 60%)" }} />
                <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
                  <rect x="8" y="8" width="24" height="3" rx="1.5" fill="white" fillOpacity="0.5"/>
                  <rect x="8" y="15" width="18" height="3" rx="1.5" fill="white" fillOpacity="0.4"/>
                  <rect x="8" y="22" width="21" height="3" rx="1.5" fill="white" fillOpacity="0.3"/>
                  <rect x="8" y="29" width="14" height="3" rx="1.5" fill="white" fillOpacity="0.25"/>
                </svg>
              </div>
              <div className="p-7">
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 bg-violet-50 text-violet-700 border border-violet-200">
                  {post.createdAt}
                </span>
                <h3
                  className="text-xl font-black text-gray-900 mb-5 group-hover:text-violet-600 transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 border-b-2 border-current pb-0.5 group-hover:gap-3 transition-all">
                  Dive in <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── ASK FEMI9 ── */}
      <div style={{ background: "#f7f5f9" }}>
        <AskFemi9 />
      </div>

      {/* ── COMMENTS ── */}
      <div style={{ background: "#f7f5f9" }}>
        <CommentsSection />
      </div>

      {/* ── MANIFESTO STRIP ── */}
      <div
        className="py-14 text-center px-6"
        style={{ background: "linear-gradient(135deg, #1E0733 0%, #4A1060 50%, #7B1FA2 100%)" }}
      >
        <p
          className="font-black text-2xl md:text-3xl text-white/90 max-w-2xl mx-auto leading-snug"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          &ldquo;You don&apos;t have to choose between ambition and softness. Own both.&rdquo;
        </p>
        <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mt-4">— Femi9 Power</p>
      </div>

      {/* ── CONTACT CTA ── */}
      <div className="py-12 px-4 sm:px-6 text-center" style={{ background: "#0A0414" }}>
        <p className="text-amber-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Get in Touch</p>
        <h3
          className="text-white font-black text-xl sm:text-2xl mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Have a question or story to share?
        </h3>
        <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
          I&apos;d love to hear from you — topic requests, feedback, or just saying hello.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-black transition-all hover:opacity-90 hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(90deg, #fbbf24, #f59e0b)" }}
        >
          ✉️ Contact the Author
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <footer className="py-10 text-center border-t border-white/5" style={{ background: "#0A0414" }}>
        <p
          className="font-black text-xl mb-1"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            background: "linear-gradient(90deg, #FFE566, #FFD700, #F0A820)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Femi9 Power
        </p>
        <p className="text-amber-600/60 text-xs mb-4 tracking-wide">Radiate Strength &amp; Live Powerfully</p>
        <p className="text-white/20 text-xs">&copy; {new Date().getFullYear()} Janane Suresh. All rights reserved.</p>
      </footer>
    </div>
  );
}
