import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";
import { getAllStories } from "@/lib/stories";

const CATEGORIES = [
  { label: "All Stories", slug: "all", color: "bg-white/10 text-white/70" },
  { label: "The Becoming", slug: "becoming", color: "bg-violet-500/20 text-violet-300" },
  { label: "In Her Body", slug: "in-her-body", color: "bg-rose-500/20 text-rose-300" },
  { label: "Quiet Battles", slug: "quiet-battles", color: "bg-indigo-500/20 text-indigo-300" },
  { label: "She Built It", slug: "she-built-it", color: "bg-amber-500/20 text-amber-300" },
  { label: "Love & Its Lessons", slug: "love-lessons", color: "bg-pink-500/20 text-pink-300" },
  { label: "The Threshold", slug: "threshold", color: "bg-teal-500/20 text-teal-300" },
  { label: "Raising Them", slug: "raising-them", color: "bg-fuchsia-500/20 text-fuchsia-300" },
  { label: "Reclaimed", slug: "reclaimed", color: "bg-emerald-500/20 text-emerald-300" },
];

const CATEGORY_COLORS: Record<string, string> = {
  becoming: "bg-violet-500/20 text-violet-300",
  "in-her-body": "bg-rose-500/20 text-rose-300",
  "quiet-battles": "bg-indigo-500/20 text-indigo-300",
  "she-built-it": "bg-amber-500/20 text-amber-300",
  "love-lessons": "bg-pink-500/20 text-pink-300",
  threshold: "bg-teal-500/20 text-teal-300",
  "raising-them": "bg-fuchsia-500/20 text-fuchsia-300",
  reclaimed: "bg-emerald-500/20 text-emerald-300",
};

export default function StoriesPage() {
  const allStories = getAllStories();
  const featured = allStories.find((s) => s.featured);
  const rest = allStories.filter((s) => !s.featured);
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #0a0414 0%, #130828 50%, #0a0414 100%)" }}
    >
      <PageHeader title="Her Stories" accent="text-violet-400" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 pt-14 pb-10 text-center">
          <span className="inline-block text-violet-400 text-[10px] font-bold tracking-[0.35em] uppercase mb-4 border border-violet-400/25 px-3 py-1 rounded-full">
            Anonymous Storytelling
          </span>
          <h1
            className="font-black leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #e9d5ff 50%, #fde68a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Real words from real women.
          </h1>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            No names. No filters. No performance. Just honest stories from women
            who lived through something and chose to pass the lantern forward.
          </p>
          <Link
            href="/stories/share"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-black transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(90deg, #a78bfa, #8b5cf6)" }}
          >
            Share Your Story
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Category pills */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.slug}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all ${cat.color}`}
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">

        {allStories.length === 0 ? (
          /* Empty state — shown until first real stories are published */
          <div className="text-center py-20">
            <div className="text-5xl mb-6">✍️</div>
            <h3
              className="text-white font-black text-xl mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The first story is still being written.
            </h3>
            <p className="text-white/35 text-sm leading-relaxed max-w-sm mx-auto mb-8">
              This space is waiting for real women and real words.
              Be the first to share yours.
            </p>
            <Link
              href="/stories/share"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-black transition-all hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #a78bfa, #8b5cf6)" }}
            >
              Share Your Story
            </Link>
          </div>
        ) : (
          <>
            {/* Featured story */}
            {featured && (
              <div className="mb-10">
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-violet-400/70 mb-4">
                  Featured Story
                </p>
                <Link
                  href={`/stories/${featured.slug}`}
                  className="group block rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(109,40,217,0.08) 100%)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                >
                  <div className="p-7 sm:p-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? "bg-white/10 text-white/60"}`}>
                        {featured.categoryLabel}
                      </span>
                      <span className="text-white/25 text-xs">{featured.readTime} min read</span>
                    </div>
                    <h2
                      className="font-black text-white mb-4 group-hover:text-violet-300 transition-colors"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(1.4rem, 3vw, 2rem)",
                      }}
                    >
                      {featured.title}
                    </h2>
                    <p
                      className="text-white/60 text-lg leading-relaxed mb-6 italic"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      &ldquo;{featured.pullQuote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/35 text-xs">— {featured.contributor}</span>
                      <span className="text-violet-400 text-sm font-semibold group-hover:gap-3 flex items-center gap-1.5 transition-all">
                        Read her story
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden>
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Story grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.map((story) => (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className="group block rounded-2xl p-6 transition-all hover:-translate-y-1"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[story.category] ?? "bg-white/10 text-white/60"}`}>
                        {story.categoryLabel}
                      </span>
                      <span className="text-white/20 text-xs">{story.readTime} min</span>
                    </div>
                    <h3
                      className="font-black text-white text-lg leading-snug mb-3 group-hover:text-violet-300 transition-colors"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {story.title}
                    </h3>
                    <p
                      className="text-white/45 text-sm leading-relaxed mb-5 italic"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      &ldquo;{story.pullQuote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/25 text-[11px]">— {story.contributor}</span>
                      <span className="text-white/40 text-xs group-hover:text-violet-400 transition-colors">
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA strip */}
        <div
          className="mt-14 rounded-2xl p-8 sm:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(236,72,153,0.08) 100%)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <p className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Your story matters
          </p>
          <h3
            className="text-white font-black text-xl sm:text-2xl mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Do you have a story inside you?
          </h3>
          <p className="text-white/40 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Someone out there is living what you survived. Sharing yours might be the
            thing that gets them through.
          </p>
          <Link
            href="/stories/share"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-black transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #a78bfa, #8b5cf6)" }}
          >
            Share Your Story
          </Link>
        </div>
      </div>
    </div>
  );
}
