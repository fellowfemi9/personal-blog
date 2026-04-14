import fs from "fs";
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

const postsDirectory = path.join(process.cwd(), "posts");
const SUPPORTED_EXTENSIONS = [".pdf", ".txt", ".html"];

export interface PostMeta {
  slug: string;
  title: string;
  fileName: string;
  createdAt: string;
}

export interface Post extends PostMeta {
  content: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.(pdf|txt|html)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function extractContent(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    const buffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(buffer);
    return parsed.text;
  }

  const text = fs.readFileSync(filePath, "utf-8");

  if (ext === ".html") {
    return stripHtml(text);
  }

  return text;
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs
    .readdirSync(postsDirectory)
    .filter((f) =>
      SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase())
    );

  const posts: PostMeta[] = files.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const stats = fs.statSync(filePath);
    return {
      slug: slugify(fileName.replace(/\.(pdf|txt|html)$/i, "")),
      title: titleFromFilename(fileName),
      fileName,
      createdAt: stats.birthtime.toISOString().split("T")[0],
    };
  });

  return posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const meta = await getAllPostsMeta();
  const found = meta.find((p) => p.slug === slug);
  if (!found) return null;

  const filePath = path.join(postsDirectory, found.fileName);
  const content = await extractContent(filePath);

  return { ...found, content };
}
