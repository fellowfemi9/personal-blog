import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import Search from "@/app/components/Search";

const POSTS = [
  {
    href: "/posts/hey-pregnant-mama",
    title: "Hey Pregnant Mama",
    description: "Your complete guide to pregnancy, hospital stay, postpartum recovery & your baby's first months — with interactive checklists.",
    emoji: "🤰",
    tag: "Pregnancy & Motherhood",
    color: "from-rose-500 to-pink-400",
    tagBg: "bg-rose-100 text-rose-700",
    hoverBorder: "hover:border-rose-300",
    hoverShadow: "hover:shadow-rose-100",
  },
  {
    href: "/posts/the-sattvik-way-of-eating",
    title: "The Sattvik Way of Eating",
    description: "Ancient Sattvik kitchen wisdom — nutrient guides, cooking methods, and wellness tips for a cleaner, more powerful life.",
    emoji: "🌿",
    tag: "Nutrition & Wellness",
    color: "from-emerald-500 to-teal-400",
    tagBg: "bg-emerald-100 text-emerald-700",
    hoverBorder: "hover:border-emerald-300",
    hoverShadow: "hover:shadow-emerald-100",
  },
];

export default async function Home() {
  const dynamicPosts = await getAllPostsMeta();
  const dynamicFiltered = dynamicPosts.filter(
    (p) => p.slug !== "hey-pregnant-mama" && p.slug !== "the-sattvik-way-of-eating"
  );

  return (
    <div className="min-h-screen" style={{ background: "#fdf8f3" }}>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/10" style={{ background: "rgba(14, 5, 24, 0.96)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-amber-400/60 text-xs tracking-widest uppercase font-medium hidden sm:block">
              ✦ Women&apos;s Lifestyle
            </span>
          </div>
          <h1
            className="text-2xl md:text-3xl font-black tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background: "linear-gradient(90deg, #FFE566 0%, #FFD700 40%, #F0A820 70%, #FFE566 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 12px rgba(255,210,0,0.45))",
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
          background: "linear-gradient(135deg, #0E0518 0%, #2A0A3E 25%, #5C1A50 55%, #A03010 80%, #C86010 100%)",
          minHeight: "340px",
        }}
      >
        {/* Decorative orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(180,60,180,0.18) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,160,0,0.2) 0%, transparent 70%)", transform: "translate(25%, 35%)" }} />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(120,20,100,0.15) 0%, transparent 70%)", transform: "translate(-50%, -50%)" }} />

        <div className="relative max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left — tagline */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Radiate Strength &amp; Live Powerfully
            </p>
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Your space for wellness, motherhood, nutrition, and living powerfully — all at once, beautifully.
            </p>
            <p className="text-amber-400/50 text-sm mt-4 tracking-wide">
              Work · Family · Me Time · Learning
            </p>
          </div>

          {/* Right — search */}
          <div className="w-full md:w-96 flex-shrink-0">
            <p className="text-amber-300/70 text-xs font-semibold tracking-widest uppercase mb-3 text-center md:text-right">
              Search topics &amp; tips
            </p>
            <Search dark />
          </div>
        </div>
      </div>

      {/* ── POSTS ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold text-amber-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Explore
          </h2>
          <div className="flex-1 h-px bg-amber-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POSTS.map((post) => (
            <Link key={post.href} href={post.href} className={`group block bg-white rounded-3xl border-2 border-amber-100 ${post.hoverBorder} shadow-lg ${post.hoverShadow} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
              <div className={`h-2 w-full bg-gradient-to-r ${post.color}`} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{post.emoji}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${post.tagBg}`}>{post.tag}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-800 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.description}</p>
                <div className="flex items-center gap-2 text-amber-700 text-sm font-semibold">
                  <span>Read more</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}

          {dynamicFiltered.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group block bg-white rounded-3xl border-2 border-amber-100 hover:border-amber-300 shadow-lg hover:shadow-2xl hover:shadow-amber-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-yellow-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">📝</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">{post.createdAt}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-800 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-amber-700 text-sm font-semibold mt-4">
                  <span>Read more</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-10 text-center" style={{ background: "#0E0518" }}>
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
        <p className="text-amber-700 text-xs mb-4">Radiate Strength &amp; Live Powerfully</p>
        <p className="text-amber-900 text-xs">&copy; {new Date().getFullYear()} Janane Suresh. All rights reserved.</p>
      </footer>
    </div>
  );
}
