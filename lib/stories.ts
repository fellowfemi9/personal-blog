import fs from "fs";
import path from "path";

const storiesDir = path.join(process.cwd(), "content/stories");

export interface StorySection {
  heading?: string;
  paragraphs: string[];
}

export interface Story {
  slug: string;
  title: string;
  contributor: string;
  category: string;
  categoryLabel: string;
  publishedAt: string;
  pullQuote: string;
  readTime: number;
  featured: boolean;
  paragraphs?: string[];       // simple stories — flat paragraph list
  sections?: StorySection[];   // structured stories — titled sections
  letterToSelf?: string;
  whatLearned?: string;
}

export function getAllStories(): Story[] {
  if (!fs.existsSync(storiesDir)) return [];

  const files = fs.readdirSync(storiesDir).filter((f) => f.endsWith(".json"));

  const stories: Story[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(storiesDir, file), "utf-8");
    return JSON.parse(raw) as Story;
  });

  return stories.sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );
}

export function getStoryBySlug(slug: string): Story | null {
  const stories = getAllStories();
  return stories.find((s) => s.slug === slug) ?? null;
}
