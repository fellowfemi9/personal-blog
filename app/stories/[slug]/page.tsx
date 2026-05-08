import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllStories, getStoryBySlug } from "@/lib/stories";
import PageHeader from "@/app/components/PageHeader";

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

export async function generateStaticParams() {
  const stories = getAllStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: `${story.title} — Femi9 Power`,
    description: story.pullQuote,
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const colorClass = CATEGORY_COLORS[story.category] ?? "bg-white/10 text-white/60";

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #0a0414 0%, #130828 60%, #0a0414 100%)" }}
    >
      <PageHeader title="Her Stories" accent="text-violet-400" />

      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Back link */}
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs font-medium transition-colors mb-10"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden>
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All stories
        </Link>

        {/* Category + read time */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
            {story.categoryLabel}
          </span>
          <span className="text-white/25 text-xs">{story.readTime} min read</span>
        </div>

        {/* Title */}
        <h1
          className="font-black text-white leading-tight mb-6"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          }}
        >
          {story.title}
        </h1>

        {/* Contributor */}
        <p className="text-white/30 text-xs tracking-widest uppercase mb-10">
          — {story.contributor}
        </p>

        {/* Pull quote */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-10"
          style={{
            background: "rgba(139,92,246,0.08)",
            borderLeft: "3px solid rgba(167,139,250,0.45)",
          }}
        >
          <p
            className="text-white/75 text-xl sm:text-2xl leading-relaxed italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            &ldquo;{story.pullQuote}&rdquo;
          </p>
        </div>

        {/* Story body — supports flat paragraphs or titled sections */}
        <div className="space-y-6 mb-14">
          {story.sections
            ? story.sections.map((section, si) => (
                <div key={si} className={si > 0 ? "pt-4" : ""}>
                  {section.heading && (
                    <p
                      className="text-white font-bold text-base mb-4"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {section.heading}
                    </p>
                  )}
                  <div className="space-y-5">
                    {section.paragraphs.map((para, pi) => (
                      <p key={pi} className="text-white/65 leading-[1.85] text-base sm:text-lg">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            : story.paragraphs?.map((para, i) => (
                <p key={i} className="text-white/65 leading-[1.85] text-base sm:text-lg">
                  {para}
                </p>
              ))}
        </div>

        {/* Reflection sections */}
        {(story.letterToSelf || story.whatLearned) && (
          <div
            className="rounded-2xl p-6 sm:p-8 space-y-7 mb-12"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {story.letterToSelf && (
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-violet-400/70 mb-3">
                  What I&apos;d tell her
                </p>
                <p
                  className="text-white/55 leading-relaxed text-base italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {story.letterToSelf}
                </p>
              </div>
            )}
            {story.whatLearned && (
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-violet-400/70 mb-3">
                  What I learned
                </p>
                <p className="text-white/55 leading-relaxed text-base">
                  {story.whatLearned}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reader prompt */}
        <div className="text-center mb-12">
          <p
            className="text-white/40 text-sm leading-relaxed mb-6 max-w-md mx-auto italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            If this story moved you — pass it to someone who might need it.
          </p>
          <Link
            href="/stories/share"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-black transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #a78bfa, #8b5cf6)" }}
          >
            Share your own story
          </Link>
        </div>

        {/* Back */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="pt-8">
          <Link
            href="/stories"
            className="text-white/25 hover:text-white/60 text-sm transition-colors"
          >
            ← Read more stories
          </Link>
        </div>
      </article>

      <div className="h-20 md:h-0" />
    </div>
  );
}
