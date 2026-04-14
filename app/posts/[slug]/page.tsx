import { getPostBySlug, getAllPostsMeta } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 inline-block"
      >
        ← Back to all posts
      </Link>

      <p className="text-sm text-gray-400 mt-6 mb-2">{post.createdAt}</p>
      <h1 className="text-4xl font-bold mb-10">{post.title}</h1>

      <article className="prose prose-gray max-w-none">
        {paragraphs.map((para, i) => (
          <p key={i} className="mb-4 leading-relaxed text-gray-800 whitespace-pre-wrap">
            {para}
          </p>
        ))}
      </article>
    </main>
  );
}
